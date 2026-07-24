<script lang="ts">
    import { createEventDispatcher, onDestroy, onMount } from "svelte"
    import type { MediaStyle } from "../../../types/Main"
    import { media } from "../../stores"
    import { enableSubtitle, encodeFilePath, isVideoSupported } from "../helpers/media"
    import { AudioAnalyser } from "../../audio/audioAnalyser"

    export let path: string
    export let video: HTMLVideoElement | null = null
    export let videoData: any
    export let videoTime: number
    export let startAt = 0

    export let mediaStyle: MediaStyle = {}
    export let animationStyle = ""
    export let mirror = false
    export let volume = 1

    let dispatch = createEventDispatcher()

    // values for deciding whether we need the blurred video overlay
    let container: HTMLDivElement | null = null
    let containerAspect: number | null = null
    let videoAspect: number | null = null
    let perfectFit = false

    onMount(() => {
        if (!container) return

        const w = container.clientWidth
        const h = container.clientHeight
        containerAspect = w && h ? w / h : null
    })

    let hasLoaded = false
    function loaded() {
        hasLoaded = true
        dispatch("loaded", true)
    }

    // Pingback after 30 playing seconds on videos where tracking is required
    let pingbackTime = 0
    let pingbackInterval: NodeJS.Timeout | null = null
    $: if (path && !mirror) setupPingback()
    function setupPingback() {
        pingbackTime = 0
        if (pingbackInterval) clearInterval(pingbackInterval)

        pingbackInterval = setInterval(() => {
            if (videoData.paused) return

            pingbackTime++
            if (pingbackTime < 30) return

            if (pingbackInterval) clearInterval(pingbackInterval)
            sendPingback()
        }, 1000)
    }
    function sendPingback() {
        const pingbackUrl = $media[path]?.pingbackUrl
        if (!pingbackUrl) return

        console.log(`[Provider] Sending pingback after 30s playback:`, { url: pingbackUrl, method: "GET", path: path })
        fetch(pingbackUrl, { method: "GET", mode: "no-cors" })
            .then(() => console.log(`[Provider] Pingback sent successfully to: ${pingbackUrl}`))
            .catch((error) => {
                console.error(`[Provider] Pingback failed:`, error)
            })
    }

    onDestroy(() => {
        if (endInterval) clearInterval(endInterval)
        if (pingbackInterval) clearInterval(pingbackInterval)

        const cleanupVideo = (el: HTMLVideoElement | null | undefined) => {
            if (!el) return
            try {
                el.pause()
                el.removeAttribute("src")
                el.load()
            } catch (e) {
                console.error("Error cleaning up video element:", e)
            }
        }

        cleanupVideo(video)
        cleanupVideo(blurVideo)
    })

    // custom end time
    $: endTime = (mediaStyle.toTime || 0) - (mediaStyle.fromTime || 0) > 0 ? mediaStyle.toTime : 0 // || videoData.duration
    let endInterval: NodeJS.Timeout | null = null
    $: if (endTime && !mirror && !endInterval) endInterval = setInterval(checkIfEnded, 1000 * playbackRate)
    function checkIfEnded() {
        if (!videoTime || !endTime) return
        if (videoTime >= endTime) {
            // custom end time (toTime): native <video loop> only restarts at the file's natural
            // end, so a manual reset is still needed when looping within a trimmed range
            if (videoData.loop) videoTime = mediaStyle.fromTime || 0
            else dispatch("ended")
        }
    }

    function playing() {
        if (!hasLoaded || mirror) return
        hasLoaded = false

        // has custom start time
        if ((Math.max(startAt, mediaStyle.fromTime || 0) || 0) === 0) return

        // go to custom start time
        videoData.paused = true
        setTimeout(() => {
            videoTime = Math.max(startAt, mediaStyle.fromTime || 0) || 0
            videoData.paused = false
            startAt = 0
        }, 50)
    }

    $: playbackRate = Number(mediaStyle.speed) || 1
    $: if (video) video.preservesPitch = true

    $: isVideoSupported(path)

    $: subtitle = $media[path]?.subtitle
    $: tracks = $media[path]?.tracks || []
    $: if (video && subtitle !== undefined) updateSubtitles()
    // don't change rapidly
    let subtitleChange: NodeJS.Timeout | null = null
    function updateSubtitles() {
        if (subtitleChange) clearTimeout(subtitleChange)
        subtitleChange = setTimeout(() => {
            if (subtitle !== undefined && video) enableSubtitle(video, subtitle)
            subtitleChange = null
        }, 20)
    }

    $: mediaStyleString = `width: 100%;height: 100%;object-fit: ${mediaStyle.fit === "blur" ? "contain" : mediaStyle.fit || "contain"};filter: ${mediaStyle.filter || ""};transform: scale(${mediaStyle.flipped ? "-1" : "1"}, ${mediaStyle.flippedY ? "-1" : "1"});`
    $: mediaStyleBlurString = `position: absolute;filter: ${mediaStyle.filter || ""} blur(${mediaStyle.fitOptions?.blurAmount ?? 6}px) opacity(${mediaStyle.fitOptions?.blurOpacity || 0.3});object-fit: cover;width: 100%;height: 100%;transform: scale(${mediaStyle.flipped ? "-1" : "1"}, ${mediaStyle.flippedY ? "-1" : "1"});`

    let blurVideo: HTMLVideoElement | null = null
    $: if (blurVideo && (videoTime < blurVideo.currentTime - 0.1 || videoTime > blurVideo.currentTime + 0.1)) blurVideo.currentTime = videoTime
    $: if (!videoData.paused && blurVideo?.paused) blurVideo.play()
    $: blurPausedState = videoData.paused

    // update computed aspects and determine whether the blurred video is necessary
    $: videoAspect = video && video.videoWidth && video.videoHeight ? video.videoWidth / video.videoHeight : null
    // 1% tolerance
    $: perfectFit = containerAspect && videoAspect ? Math.abs(containerAspect - videoAspect) <= 0.01 : false

    // some videos don't like high playback speed (above 5.9)
    // https://issues.chromium.org/issues/40167938

    // Looping is handled purely by the native <video loop> attribute (see below), the same
    // approach the media player in VideoShow.svelte uses — it loops seamlessly with no freeze.
    // The old SoftLoopManager crossfade was removed: it seeked the visible video element at the
    // loop point, and that seek was itself a ~0.5s frame freeze the crossfade never reliably hid.
    $: if (video) {
        video.volume = volume
        video.loop = videoData.loop || false
        AudioAnalyser.setSourceVolume(path, volume)
    }

    function handleEnded() {
        // With native loop the browser restarts the video itself and `ended` never fires while
        // looping; this only runs when loop is off, to clear the media / trigger next-after-media.
        dispatch("ended")
    }
</script>

<div bind:this={container} style="display: flex;width: 100%;height: 100%;place-content: center;{animationStyle}">
    {#if mediaStyle.fit === "blur" && !perfectFit}
        <video class="media" style={mediaStyleBlurString} src={encodeFilePath(path)} bind:playbackRate bind:this={blurVideo} bind:paused={blurPausedState} muted loop={videoData.loop || false} />
    {/if}
    <!-- native loop = seamless, no freeze (same as VideoShow.svelte's player) -->
    <video class="media" style={mediaStyleString} bind:this={video} on:loadedmetadata={loaded} on:playing={playing} on:ended={handleEnded} on:error bind:playbackRate bind:currentTime={videoTime} bind:paused={videoData.paused} bind:duration={videoData.duration} muted={mirror ? true : (videoData.muted ?? true)} src={encodeFilePath(path)} autoplay loop={videoData.loop} {volume}>
        <!-- bind:volume={audioVolume} -->
        {#each tracks as track}
            <track label={track.name} srclang={track.lang} kind="subtitles" src="data:text/vtt;charset=utf-8,{encodeURI(track.vtt)}" />
        {/each}
    </video>
</div>
