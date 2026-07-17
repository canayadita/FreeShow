<script lang="ts">
    import { onDestroy, onMount } from "svelte"
    import type { SequenceCue } from "../../../types/Show"
    import { AudioPlayer } from "../../audio/audioPlayer"
    import { activeShow, showsCache } from "../../stores"
    import { audioExtensions } from "../../values/extensions"
    import { history } from "../helpers/history"
    import MaterialButton from "../inputs/MaterialButton.svelte"
    import MaterialFilePicker from "../inputs/MaterialFilePicker.svelte"
    import MaterialNumberInput from "../inputs/MaterialNumberInput.svelte"
    import { addCue } from "./sequenceCues"
    import { jumpToShowSlide } from "./sequenceOutput"
    import { SequencePlayer } from "./SequencePlayer"

    $: showId = $activeShow?.id || ""

    let cues: SequenceCue[] = []
    let audioPath = ""
    let duration = 0
    let recording = false
    let auto = true
    let nudgeSeconds = 5
    let currentSlideIndex = 0

    // exposed for Task 6 (record cue on slide advance)
    export function markCue() {
        if (!recording || !audioPath) return
        const t = AudioPlayer.getTime(audioPath) * 1000
        cues = addCue(cues, { time: Math.round(t), slideIndex: currentSlideIndex })
    }

    const player = new SequencePlayer((index) => {
        if (auto) jumpToShowSlide(showId, index)
    })

    onMount(() => {
        const seq = $showsCache[showId]?.sequence
        if (seq) {
            cues = seq.cues || []
            audioPath = seq.audioPath || ""
            duration = seq.duration || 0
        }
        player.setCues(cues)
        player.setDuration(duration)
    })
    onDestroy(() => player.stop())

    // keep the player in sync with edits
    $: player.setCues(cues)
    $: player.setDuration(duration)

    function startRecording() {
        if (!audioPath) return
        cues = []
        currentSlideIndex = 0
        recording = true
        AudioPlayer.play(audioPath)
    }
    function stopRecording() {
        recording = false
        AudioPlayer.stop(audioPath)
        const audioDuration = AudioPlayer.getAudio(audioPath)?.duration
        duration = audioDuration ? Math.round(audioDuration * 1000) : (cues.at(-1)?.time || 0) + 2000
        save()
    }

    function play() {
        player.play()
    }
    function pause() {
        player.pause()
    }
    function stop() {
        player.stop()
    }
    function nudge(sign: number) {
        player.nudge(sign * nudgeSeconds)
    }

    function deleteCue(i: number) {
        cues = cues.filter((_c, index) => index !== i)
    }

    function save() {
        if (!showId) return
        const data = { cues, audioPath, duration }
        history({ id: "UPDATE", newData: { key: "sequence", data }, oldData: { id: showId }, location: { page: "show", id: "show_key" } })
    }

    function fmt(ms: number) {
        const s = Math.floor(ms / 1000)
        return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
    }
</script>

<div class="sequence">
    <h3>Song Sequence</h3>

    <MaterialFilePicker label="MP3 (untuk rekam)" value={audioPath} filter={{ name: "Audio", extensions: audioExtensions }} allowEmpty on:change={(e) => (audioPath = e.detail)} />

    <!-- RECORD -->
    <div class="row">
        {#if !recording}
            <MaterialButton icon="record" variant="outlined" disabled={!audioPath} on:click={startRecording}>Rekam</MaterialButton>
        {:else}
            <MaterialButton icon="stop" variant="contained" on:click={stopRecording}>Stop Rekam</MaterialButton>
            <MaterialButton icon="add" variant="outlined" on:click={markCue}>Tandai slide sekarang</MaterialButton>
        {/if}
    </div>

    <!-- LIVE -->
    <div class="row">
        <MaterialButton icon="play" variant="contained" disabled={!cues.length} on:click={play}>Play</MaterialButton>
        <MaterialButton icon="pause" variant="outlined" on:click={pause}>Pause</MaterialButton>
        <MaterialButton icon="stop" variant="outlined" on:click={stop}>Stop</MaterialButton>
        <MaterialButton icon={auto ? "check" : "close"} variant={auto ? "contained" : "outlined"} on:click={() => (auto = !auto)}>{auto ? "Auto" : "Manual"}</MaterialButton>
    </div>

    <!-- NUDGE -->
    <div class="row">
        <MaterialButton variant="outlined" on:click={() => nudge(-1)}>− {nudgeSeconds}s</MaterialButton>
        <MaterialNumberInput label="Nudge (detik)" value={nudgeSeconds} min={1} max={60} step={1} scrub on:change={(e) => (nudgeSeconds = e.detail)} />
        <MaterialButton variant="outlined" on:click={() => nudge(1)}>+ {nudgeSeconds}s</MaterialButton>
    </div>

    <!-- CUES -->
    <div class="cues">
        <div class="cues-head">
            <span>{cues.length} cue</span>
            <MaterialButton icon="save" variant="outlined" on:click={save}>Simpan</MaterialButton>
        </div>
        {#each cues as cue, i}
            <div class="cue">
                <span>{fmt(cue.time)}</span>
                <span>slide {cue.slideIndex + 1}</span>
                <MaterialButton icon="delete" on:click={() => deleteCue(i)} />
            </div>
        {/each}
    </div>
</div>

<style>
    .sequence {
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-width: 420px;
    }
    .row {
        display: flex;
        gap: 8px;
        align-items: center;
    }
    .cues {
        display: flex;
        flex-direction: column;
        gap: 4px;
        max-height: 240px;
        overflow-y: auto;
    }
    .cues-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        opacity: 0.8;
    }
    .cue {
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 4px 8px;
        background-color: var(--primary-darker);
        border-radius: 6px;
    }
    .cue span:first-child {
        min-width: 52px;
    }
</style>
