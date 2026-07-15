import type { ChildProcess } from "child_process"
import { spawn } from "child_process"
import { ToMain } from "../../types/IPC/ToMain"
import { sendToMain } from "../IPC/main"

export type RtmpData = {
    url?: string
    key?: string
    resolution?: string // e.g. "1920x1080"
    fps?: number
    videoBitrate?: number // kbps
    streaming?: boolean
}

type ActiveStream = {
    process: ChildProcess
    fps: number
    inputSize: { width: number; height: number }
    latestFrame: Buffer | null
    videoTimer: NodeJS.Timeout | null
    audioTimer: NodeJS.Timeout | null
    audioSamplesWritten: number
    startedAt: number
    stopping: boolean
}

const AUDIO_SAMPLE_RATE = 48000
const AUDIO_CHANNELS = 2
const AUDIO_BYTES_PER_SAMPLE = 2 // s16le
const DEFAULT_RTMP_URL = "rtmp://a.rtmp.youtube.com/live2"

export class RtmpSender {
    private static streams: { [outputId: string]: ActiveStream } = {}
    // frames arrive before ffmpeg is ready or between start attempts
    private static pendingData: { [outputId: string]: RtmpData } = {}

    static isActive(outputId: string): boolean {
        return !!this.streams[outputId]
    }

    static anyActive(): boolean {
        return Object.keys(this.streams).length > 0
    }

    static getFfmpegPath(): string | null {
        try {
            // eslint-disable-next-line
            let path: string = require("ffmpeg-static")
            // packaged apps cannot execute binaries inside the asar archive
            path = path.replace("app.asar", "app.asar.unpacked")
            return path
        } catch (err) {
            console.error("RTMP: ffmpeg binary not found!", err)
            return null
        }
    }

    static start(outputId: string, data: RtmpData) {
        if (this.streams[outputId]) return
        this.lastData[outputId] = data

        const url = (data.url || DEFAULT_RTMP_URL).trim().replace(/\/$/, "")
        const key = (data.key || "").trim()
        if (!key) {
            sendToMain(ToMain.TOAST, "RTMP: Stream key is missing!")
            return
        }

        // wait for the first frame so the raw video input size matches the actual output window
        this.pendingData[outputId] = { ...data, url, key }
        console.info("RTMP: waiting for first frame of output " + outputId)
    }

    private static spawnFfmpeg(outputId: string, data: RtmpData, inputSize: { width: number; height: number }) {
        const ffmpegPath = this.getFfmpegPath()
        if (!ffmpegPath) {
            sendToMain(ToMain.TOAST, "RTMP: ffmpeg not found, cannot start stream!")
            delete this.pendingData[outputId]
            return
        }

        const fps = Number(data.fps) || 30
        const resolution = /^\d+x\d+$/.test(data.resolution || "") ? (data.resolution as string) : "1920x1080"
        const videoBitrate = Number(data.videoBitrate) || 4500

        const target = `${data.url}/${data.key}`

        // video: raw BGRA frames on stdin (paced at fps below)
        // audio: raw PCM s16le 48kHz stereo on fd 3 (silence-filled when idle)
        const args = [
            "-hide_banner",
            "-loglevel", "error",

            "-f", "rawvideo",
            "-pix_fmt", "bgra",
            "-s", `${inputSize.width}x${inputSize.height}`,
            "-r", `${fps}`,
            "-i", "pipe:0",

            "-f", "s16le",
            "-ar", `${AUDIO_SAMPLE_RATE}`,
            "-ac", `${AUDIO_CHANNELS}`,
            "-i", "pipe:3",

            "-vf", `scale=${resolution.replace("x", ":")}:force_original_aspect_ratio=decrease:eval=frame,pad=${resolution.replace("x", ":")}:-1:-1:color=black`,
            "-c:v", "libx264",
            "-preset", "veryfast",
            "-tune", "zerolatency",
            "-pix_fmt", "yuv420p",
            "-b:v", `${videoBitrate}k`,
            "-maxrate", `${videoBitrate}k`,
            "-bufsize", `${videoBitrate * 2}k`,
            "-g", `${fps * 2}`,

            "-c:a", "aac",
            "-b:a", "128k",
            "-ar", "44100",

            "-f", "flv",
            target
        ]

        let child: ChildProcess
        try {
            child = spawn(ffmpegPath, args, { stdio: ["pipe", "ignore", "pipe", "pipe"] })
        } catch (err) {
            console.error("RTMP: could not start ffmpeg", err)
            sendToMain(ToMain.TOAST, "RTMP: could not start ffmpeg!")
            delete this.pendingData[outputId]
            return
        }

        const stream: ActiveStream = {
            process: child,
            fps,
            inputSize,
            latestFrame: null,
            videoTimer: null,
            audioTimer: null,
            audioSamplesWritten: 0,
            startedAt: Date.now(),
            stopping: false
        }
        this.streams[outputId] = stream
        delete this.pendingData[outputId]

        let errorOutput = ""
        child.stderr?.on("data", (chunk: Buffer) => {
            errorOutput = (errorOutput + chunk.toString()).slice(-2000)
        })

        child.on("exit", (code) => {
            const stoppedStream = this.streams[outputId]
            const wasStopping = stoppedStream?.stopping
            const silentRestart = stoppedStream?.startedAt === 0
            this.cleanup(outputId)

            if (wasStopping) {
                if (!silentRestart) sendToMain(ToMain.TOAST, "RTMP: stream stopped")
                return
            }

            console.error("RTMP: ffmpeg exited unexpectedly", code, errorOutput)
            const reason = errorOutput.split("\n").filter(Boolean).pop() || `code ${code}`
            sendToMain(ToMain.TOAST, `RTMP: stream stopped unexpectedly! (${reason})`)
        })

        child.on("error", (err) => {
            console.error("RTMP: ffmpeg error", err)
            this.cleanup(outputId)
            sendToMain(ToMain.TOAST, "RTMP: ffmpeg error - " + err.message)
        })

        // pace video at a constant fps, resending the latest frame (output content often only changes on slide change)
        stream.videoTimer = setInterval(() => {
            if (!stream.latestFrame) return
            this.safeWrite(child.stdin, stream.latestFrame)
        }, Math.round(1000 / fps))

        // keep the audio input alive with silence when no app audio is playing
        const silenceInterval = 250 // ms
        stream.audioTimer = setInterval(() => {
            const elapsedMs = Date.now() - stream.startedAt
            const targetSamples = Math.floor((elapsedMs / 1000) * AUDIO_SAMPLE_RATE)
            let missing = targetSamples - stream.audioSamplesWritten
            if (missing < AUDIO_SAMPLE_RATE * 0.05) return // less than 50ms behind - real audio is flowing
            missing = Math.min(missing, AUDIO_SAMPLE_RATE) // never alloc more than 1s at once

            const silence = Buffer.alloc(missing * AUDIO_CHANNELS * AUDIO_BYTES_PER_SAMPLE)
            stream.audioSamplesWritten += missing
            this.safeWrite(this.getAudioPipe(child), silence)
        }, silenceInterval)

        console.info(`RTMP: streaming output ${outputId} to ${data.url} (${resolution}@${fps}, ${videoBitrate}k)`)
        sendToMain(ToMain.TOAST, "RTMP: stream started!")
    }

    private static getAudioPipe(child: ChildProcess) {
        return child.stdio[3] as NodeJS.WritableStream | null
    }

    private static safeWrite(pipe: NodeJS.WritableStream | null | undefined, buffer: Buffer) {
        if (!pipe || (pipe as any).destroyed) return
        try {
            pipe.write(buffer)
        } catch (err) {
            // stream is closing - exit handler will clean up
        }
    }

    static sendFrame(outputId: string, frame: Buffer, size: { width: number; height: number }) {
        const stream = this.streams[outputId]

        if (!stream) {
            // first frame decides the raw input size
            const pending = this.pendingData[outputId]
            if (pending) this.spawnFfmpeg(outputId, pending, size)
            return
        }

        // window size changed - restart with the new input size (rare)
        if (size.width !== stream.inputSize.width || size.height !== stream.inputSize.height) {
            const data = { ...this.pendingDataFromStream(outputId) }
            this.stop(outputId, true)
            this.pendingData[outputId] = data
            return
        }

        stream.latestFrame = frame
    }

    private static lastData: { [outputId: string]: RtmpData } = {}
    private static pendingDataFromStream(outputId: string): RtmpData {
        return this.lastData[outputId] || {}
    }

    static sendAudio(buffer: Buffer, { sampleRate, channelCount }: { sampleRate: number; channelCount: number }) {
        if (sampleRate !== AUDIO_SAMPLE_RATE || channelCount !== AUDIO_CHANNELS) return

        Object.values(this.streams).forEach((stream) => {
            if (stream.stopping) return
            stream.audioSamplesWritten += buffer.length / (AUDIO_CHANNELS * AUDIO_BYTES_PER_SAMPLE)
            this.safeWrite(this.getAudioPipe(stream.process), buffer)
        })
    }

    static stop(outputId: string, silent = false) {
        delete this.pendingData[outputId]

        const stream = this.streams[outputId]
        if (!stream) return

        stream.stopping = true
        if (silent) stream.startedAt = 0 // suppress the "stopped" toast on internal restarts

        // stop feeding immediately so ffmpeg can flush & exit
        if (stream.videoTimer) clearInterval(stream.videoTimer)
        if (stream.audioTimer) clearInterval(stream.audioTimer)
        stream.videoTimer = null
        stream.audioTimer = null

        try {
            stream.process.stdin?.end()
            this.getAudioPipe(stream.process)?.end?.()
        } catch (err) {
            // already closed
        }

        // force kill if ffmpeg does not flush & exit in time
        setTimeout(() => {
            if (this.streams[outputId]) {
                try {
                    stream.process.kill("SIGKILL")
                } catch (err) {
                    // already dead
                }
                this.cleanup(outputId)
            }
        }, 3000)
    }

    static stopAll() {
        Object.keys(this.streams).forEach((id) => this.stop(id))
        this.pendingData = {}
    }

    private static cleanup(outputId: string) {
        const stream = this.streams[outputId]
        if (!stream) return

        if (stream.videoTimer) clearInterval(stream.videoTimer)
        if (stream.audioTimer) clearInterval(stream.audioTimer)
        delete this.streams[outputId]
    }
}
