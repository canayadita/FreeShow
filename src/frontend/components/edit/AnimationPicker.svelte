<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import type { AnimationConfig, AnimationType } from "../../../types/animation"
    import { DEFAULT_ANIMATION_CONFIG } from "../../../types/animation"

    export let config: AnimationConfig = { ...DEFAULT_ANIMATION_CONFIG }

    const dispatch = createEventDispatcher<{ change: AnimationConfig }>()

    const ANIMATION_OPTIONS: { value: AnimationType; label: string; icon: string }[] = [
        { value: "none",        label: "Tidak Ada",     icon: "—" },
        { value: "fadeIn",      label: "Fade In",       icon: "✦" },
        { value: "fadeInWords", label: "Fade Per Baris", icon: "✧" },
        { value: "slideUp",     label: "Slide Atas",    icon: "↑" },
        { value: "slideDown",   label: "Slide Bawah",   icon: "↓" },
        { value: "slideLeft",   label: "Slide Kiri",    icon: "←" },
        { value: "slideRight",  label: "Slide Kanan",   icon: "→" },
        { value: "typewriter",  label: "Typewriter",    icon: "✍" },
        { value: "zoomIn",      label: "Zoom In",       icon: "⊕" },
        { value: "zoomOut",     label: "Zoom Out",      icon: "⊖" },
        { value: "bounceIn",    label: "Bounce",        icon: "◎" },
        { value: "glowPulse",   label: "Glow Pulse",    icon: "✺" },
        { value: "wipeLeft",    label: "Wipe Kiri",     icon: "▶" },
        { value: "wipeRight",   label: "Wipe Kanan",    icon: "◀" },
    ]

    function update() {
        dispatch("change", { ...config })
    }

    function selectType(type: AnimationType) {
        config = { ...config, type }
        update()
    }
</script>

<div class="animation-picker">
    <div class="section-title">Animasi Teks</div>

    <div class="anim-grid">
        {#each ANIMATION_OPTIONS as opt}
            <button
                class="anim-btn"
                class:active={config.type === opt.value}
                on:click={() => selectType(opt.value)}
                title={opt.label}
            >
                <span class="anim-icon">{opt.icon}</span>
                <span class="anim-label">{opt.label}</span>
            </button>
        {/each}
    </div>

    {#if config.type !== "none"}
        <div class="anim-params">
            <label>
                <span>Durasi</span>
                <input type="range" min="100" max="2000" step="50" bind:value={config.duration} on:input={update} />
                <span class="val">{config.duration}ms</span>
            </label>

            <label>
                <span>Delay antar baris</span>
                <input type="range" min="0" max="800" step="25" bind:value={config.delay} on:input={update} />
                <span class="val">{config.delay}ms</span>
            </label>

            <label class="checkbox-label">
                <input type="checkbox" bind:checked={config.repeat} on:change={update} />
                <span>Loop (ulangi terus)</span>
            </label>
        </div>
    {/if}
</div>

<style>
    .animation-picker {
        padding: 8px 0;
    }
    .section-title {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        opacity: 0.5;
        margin-bottom: 8px;
    }
    .anim-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4px;
        margin-bottom: 10px;
    }
    .anim-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        padding: 6px 4px;
        border-radius: 6px;
        border: 1px solid transparent;
        background: rgba(255, 255, 255, 0.05);
        cursor: pointer;
        color: inherit;
        transition: all 0.15s;
    }
    .anim-btn:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    .anim-btn.active {
        background: rgba(99, 102, 241, 0.25);
        border-color: #6366f1;
    }
    .anim-icon {
        font-size: 14px;
    }
    .anim-label {
        font-size: 9px;
        text-align: center;
        opacity: 0.8;
    }
    .anim-params {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px;
        background: rgba(255, 255, 255, 0.04);
        border-radius: 6px;
    }
    label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        opacity: 0.8;
    }
    label span:first-child {
        width: 110px;
        flex-shrink: 0;
    }
    .val {
        width: 40px;
        text-align: right;
        font-size: 10px;
        opacity: 0.6;
    }
    input[type="range"] {
        flex: 1;
    }
    .checkbox-label {
        gap: 6px;
    }
</style>
