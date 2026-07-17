<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import type {
        AnimationConfig,
        AnimationType,
        BackgroundAnimation,
        BackgroundAnimationType,
        BlendMode,
        DecorationType,
    } from "../../../types/animation"
    import { DEFAULT_ANIMATION_CONFIG, DEFAULT_BACKGROUND_ANIMATION } from "../../../types/animation"

    export let config: AnimationConfig = { ...DEFAULT_ANIMATION_CONFIG }

    const dispatch = createEventDispatcher<{ change: AnimationConfig; openPresets: void }>()

    const ANIMATION_OPTIONS: { value: AnimationType; label: string; icon: string }[] = [
        { value: "none",        label: "None",     icon: "—" },
        { value: "fadeIn",      label: "Fade In",       icon: "✦" },
        { value: "fadeInWords", label: "Fade Per Line", icon: "✧" },
        { value: "slideUp",     label: "Slide Up",    icon: "↑" },
        { value: "slideDown",   label: "Slide Down",   icon: "↓" },
        { value: "slideLeft",   label: "Slide Left",    icon: "←" },
        { value: "slideRight",  label: "Slide Right",   icon: "→" },
        { value: "typewriter",  label: "Typewriter",    icon: "✍" },
        { value: "zoomIn",      label: "Zoom In",       icon: "⊕" },
        { value: "zoomOut",     label: "Zoom Out",      icon: "⊖" },
        { value: "bounceIn",    label: "Bounce",        icon: "◎" },
        { value: "glowPulse",   label: "Glow Pulse",    icon: "✺" },
        { value: "wipeLeft",    label: "Wipe Left",     icon: "▶" },
        { value: "wipeRight",   label: "Wipe Right",    icon: "◀" },
        { value: "popIn",       label: "Pop Spring",    icon: "✹" },
        { value: "flipIn",      label: "Flip 3D",       icon: "▱" },
        { value: "blurIn",      label: "Blur In",       icon: "◌" },
        { value: "trackingIn",  label: "Tracking",      icon: "⟷" },
        { value: "glitchIn",    label: "Glitch In",     icon: "▓" },
        { value: "shakeIn",     label: "Shake In",   icon: "↯" },
        { value: "dropBounce",  label: "Drop Bounce",   icon: "⬇" },
        { value: "elastic",     label: "Elastic",       icon: "⟳" },
        { value: "rollIn",      label: "Roll In",    icon: "↺" },
        { value: "tada",        label: "Tada!",         icon: "🎉" },
        { value: "comicPop",    label: "Comic Pop",     icon: "💥" },
        { value: "kapow",       label: "KAPOW!",        icon: "⚡" },
        { value: "rubberBand",  label: "Rubber Band",   icon: "⌀" },
        { value: "slingshot",   label: "Slingshot",     icon: "↠" },
        { value: "lightSpeed",  label: "Light Speed",   icon: "»" },
        { value: "jackInBox",   label: "Jack in Box",   icon: "🎁" },
        { value: "neonFlash",   label: "Neon Flash",    icon: "⬥" },
    ]

    const BACKGROUND_OPTIONS: { value: BackgroundAnimationType; label: string; icon: string }[] = [
        { value: "none",         label: "None",    icon: "—" },
        { value: "breathe",      label: "Breathe",      icon: "❍" },
        { value: "shimmer",      label: "Shimmer",      icon: "✧" },
        { value: "float",        label: "Float",        icon: "↕" },
        { value: "sway",         label: "Sway",         icon: "↻" },
        { value: "rainbow",      label: "Rainbow",      icon: "🌈" },
        { value: "blurPulse",    label: "Blur Pulse",   icon: "▒" },
        { value: "shadowGrow",   label: "Shadow Grow",  icon: "◉" },
        { value: "letterDance",  label: "Letter Dance", icon: "✦" },
        { value: "neon",         label: "Neon",         icon: "⚡" },
        { value: "flicker",      label: "Flicker",      icon: "✺" },
        { value: "wave",         label: "Wave",         icon: "∿" },
        { value: "colorCycle",   label: "Color Cycle",  icon: "●" },
        { value: "gradientSweep", label: "Gradient",    icon: "◧" },
        { value: "glitch",       label: "Glitch",       icon: "▓" },
        { value: "chromatic",    label: "Chromatic",    icon: "◑" },
        { value: "shake",        label: "Shake",        icon: "↯" },
        { value: "bounce",       label: "Bounce",       icon: "⬍" },
        { value: "pulse",        label: "Pulse",        icon: "◎" },
        { value: "swing",        label: "Swing",        icon: "↺" },
        { value: "heartbeat",    label: "Heartbeat",    icon: "♥" },
        { value: "jello",        label: "Jello",        icon: "◈" },
        { value: "spin",         label: "Spin",         icon: "⟳" },
        { value: "electric",     label: "Electric",     icon: "⚡" },
        { value: "disco",        label: "Disco",        icon: "🎵" },
        { value: "earthquake",   label: "Earthquake",        icon: "≋" },
        { value: "pendulum",     label: "Pendulum",     icon: "⊛" },
        { value: "rubbery",      label: "Rubbery",      icon: "⌀" },
        { value: "sparkle",      label: "Sparkle",      icon: "✨" },
        { value: "comicVibrate", label: "Comic Vibrate",  icon: "💢" },
    ]

    const BLEND_MODE_OPTIONS: { value: BlendMode; label: string }[] = [
        { value: "normal",       label: "Normal" },
        { value: "multiply",     label: "Multiply" },
        { value: "screen",       label: "Screen" },
        { value: "overlay",      label: "Overlay" },
        { value: "darken",       label: "Darken" },
        { value: "lighten",      label: "Lighten" },
        { value: "color-dodge",  label: "Color Dodge" },
        { value: "color-burn",   label: "Color Burn" },
        { value: "hard-light",   label: "Hard Light" },
        { value: "soft-light",   label: "Soft Light" },
        { value: "difference",   label: "Difference" },
        { value: "exclusion",    label: "Exclusion" },
        { value: "hue",          label: "Hue" },
        { value: "saturation",   label: "Saturation" },
        { value: "color",        label: "Color" },
        { value: "luminosity",   label: "Luminosity" },
    ]

    const DECORATION_OPTIONS: { value: DecorationType; label: string; icon: string }[] = [
        { value: "none",          label: "None",     icon: "—" },
        { value: "underline",     label: "Underline",   icon: "▁" },
        { value: "underlineWavy", label: "Wavy Underline",    icon: "﹏" },
        { value: "highlight",     label: "Highlight",       icon: "▮" },
        { value: "box",           label: "Box",         icon: "▭" },
        { value: "circle",        label: "Circle",     icon: "◯" },
        { value: "rays",          label: "Burst / Rays", icon: "✳" },
        { value: "splash",        label: "Splash Dots",   icon: "⁘" },
        { value: "speedLines",    label: "Speed Lines",   icon: "≡" },
    ]

    // Derive a complete background config with defaults so the UI never
    // has to deal with undefined fields.
    $: background = {
        ...DEFAULT_BACKGROUND_ANIMATION,
        ...(config.background || {}),
    } as BackgroundAnimation

    function update() {
        dispatch("change", { ...config, background: { ...background } })
    }

    function selectType(type: AnimationType) {
        config = { ...config, type }
        update()
    }

    function selectBgType(type: BackgroundAnimationType) {
        background = { ...background, type }
        update()
    }

    function toggleBg() {
        background = { ...background, enabled: !background.enabled }
        update()
    }

    $: decoration = config.decoration || { type: "none" as DecorationType, color: "#FFD54F" }

    function selectDecoType(type: DecorationType) {
        config = { ...config, decoration: { ...decoration, type } }
        update()
    }

    function setDecoColor(e: any) {
        config = { ...config, decoration: { ...decoration, color: e.target?.value || "#FFD54F" } }
        update()
    }
</script>

<div class="animation-picker">
    <div class="section-title section-flex">
        <span>Text Animation</span>
        <button
            class="preset-btn"
            on:click={() => dispatch("openPresets")}
            title="Pick typography preset + animation"
        >
            <span class="preset-icon">✦</span>
            <span>Template Preset</span>
        </button>
    </div>

    <div class="section-title" style="margin-top: 6px;">Main Animation (Entrance)</div>

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
                <span>Duration</span>
                <input type="range" min="100" max="2000" step="50" bind:value={config.duration} on:input={update} />
                <span class="val">{config.duration}ms</span>
            </label>

            <label>
                <span>Delay between lines</span>
                <input type="range" min="0" max="800" step="25" bind:value={config.delay} on:input={update} />
                <span class="val">{config.delay}ms</span>
            </label>

            <label class="checkbox-label">
                <input type="checkbox" bind:checked={config.repeat} on:change={update} />
                <span>Loop (repeat)</span>
            </label>
        </div>
    {/if}

    <!-- ====== Background / Blend Animation ====== -->
    <div class="divider"></div>

    <div class="section-title section-flex">
        <span>Background Animation (Blend)</span>
        <label class="mini-toggle" title="Enable / disable background animation">
            <input type="checkbox" checked={background.enabled} on:change={toggleBg} />
            <span class="switch"></span>
        </label>
    </div>

    {#if background.enabled}
        <div class="anim-grid anim-grid-bg">
            {#each BACKGROUND_OPTIONS as opt}
                <button
                    class="anim-btn"
                    class:active={background.type === opt.value}
                    on:click={() => selectBgType(opt.value)}
                    title={opt.label}
                >
                    <span class="anim-icon">{opt.icon}</span>
                    <span class="anim-label">{opt.label}</span>
                </button>
            {/each}
        </div>

        {#if background.type !== "none"}
            <div class="anim-params">
                <label>
                    <span>Loop Duration</span>
                    <input type="range" min="200" max="6000" step="100" bind:value={background.duration} on:input={update} />
                    <span class="val">{background.duration}ms</span>
                </label>

                <label>
                    <span>Delay between lines</span>
                    <input type="range" min="0" max="800" step="25" bind:value={background.delay} on:input={update} />
                    <span class="val">{background.delay}ms</span>
                </label>

                <label>
                    <span>Start after</span>
                    <input type="range" min="0" max="3000" step="50" bind:value={background.startDelay} on:input={update} />
                    <span class="val">{background.startDelay}ms</span>
                </label>

                <label>
                    <span>Opacity</span>
                    <input type="range" min="0" max="100" step="1" bind:value={background.opacity} on:input={update} />
                    <span class="val">{background.opacity}%</span>
                </label>

                <label>
                    <span>Transparency</span>
                    <input type="range" min="0" max="100" step="1" bind:value={background.transparency} on:input={update} />
                    <span class="val">{background.transparency}%</span>
                </label>

                <label>
                    <span>Blend Mode</span>
                    <select bind:value={background.blendMode} on:change={update} class="blend-select">
                        {#each BLEND_MODE_OPTIONS as bm}
                            <option value={bm.value}>{bm.label}</option>
                        {/each}
                    </select>
                </label>

                <label class="checkbox-label">
                    <input type="checkbox" bind:checked={background.loop} on:change={update} />
                    <span>Loop (repeat)</span>
                </label>
            </div>
        {/if}
    {:else}
        <p class="hint">Enable to combine two animations: the entrance animation + a continuously running background/loop animation.</p>
    {/if}

    <!-- ====== Hand-drawn Decoration ====== -->
    <div class="divider"></div>

    <div class="section-title">Decoration (after text appears)</div>

    <div class="anim-grid">
        {#each DECORATION_OPTIONS as opt}
            <button
                class="anim-btn"
                class:active={decoration.type === opt.value}
                on:click={() => selectDecoType(opt.value)}
                title={opt.label}
            >
                <span class="anim-icon">{opt.icon}</span>
                <span class="anim-label">{opt.label}</span>
            </button>
        {/each}
    </div>

    {#if decoration.type !== "none"}
        <div class="anim-params">
            <label>
                <span>Decoration color</span>
                <input type="color" value={decoration.color || "#FFD54F"} on:input={setDecoColor} />
                <span class="val">{decoration.color || "#FFD54F"}</span>
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
    .section-flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .section-flex span:first-child {
        opacity: 0.5;
    }
    .preset-btn {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 4px 10px;
        border-radius: 14px;
        border: 1px solid rgba(37, 99, 235, 0.4);
        background: rgba(37, 99, 235, 0.12);
        color: inherit;
        font-size: 10px;
        cursor: pointer;
        transition: all 0.15s;
        opacity: 1;
        text-transform: none;
        letter-spacing: normal;
    }
    .preset-btn:hover {
        background: rgba(37, 99, 235, 0.25);
        border-color: #2563eb;
    }
    .preset-icon {
        font-size: 11px;
        color: #2563eb;
    }
    .divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.08);
        margin: 14px 0 10px;
    }
    .hint {
        font-size: 10px;
        opacity: 0.45;
        font-style: italic;
        margin: 4px 0 0;
        line-height: 1.4;
    }
    .anim-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4px;
        margin-bottom: 10px;
    }
    .anim-grid-bg {
        grid-template-columns: repeat(3, 1fr);
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
        background: rgba(37, 99, 235, 0.25);
        border-color: #2563eb;
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
        width: 48px;
        text-align: right;
        font-size: 10px;
        opacity: 0.6;
        flex-shrink: 0;
    }
    input[type="range"] {
        flex: 1;
    }
    .checkbox-label {
        gap: 6px;
    }
    .blend-select {
        flex: 1;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        color: inherit;
        padding: 3px 6px;
        font-size: 11px;
        cursor: pointer;
    }
    .blend-select:focus {
        outline: 1px solid #2563eb;
    }

    /* mini toggle switch */
    .mini-toggle {
        position: relative;
        display: inline-block;
        width: 32px;
        height: 18px;
        margin: 0;
        flex-shrink: 0;
        cursor: pointer;
        opacity: 1;
    }
    .mini-toggle input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .mini-toggle .switch {
        position: absolute;
        inset: 0;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 18px;
        transition: 0.2s;
    }
    .mini-toggle .switch::before {
        content: "";
        position: absolute;
        width: 14px;
        height: 14px;
        left: 2px;
        top: 2px;
        background: white;
        border-radius: 50%;
        transition: 0.2s;
    }
    .mini-toggle input:checked + .switch {
        background: #2563eb;
    }
    .mini-toggle input:checked + .switch::before {
        transform: translateX(14px);
    }
</style>
