<script lang="ts">
    import { getRandomBibleVerse, type BibleVerse } from "./votd"

    let currentVerse: BibleVerse = getRandomBibleVerse()
    let tickerKey = 0
    let animDuration = 60 // seconds — recalculated per verse

    // pixels per second — lower = slower
    const SPEED = 80

    function onTickerEnd() {
        currentVerse = getRandomBibleVerse()
        tickerKey += 1
    }

    let tickerEl: HTMLElement | null = null

    function measureAndAnimate(node: HTMLElement) {
        tickerEl = node
        const contentWidth = node.scrollWidth
        const wrapWidth = node.parentElement?.clientWidth ?? window.innerWidth
        // total travel: content starts off-screen right, ends off-screen left
        const totalPx = contentWidth + wrapWidth
        animDuration = Math.round(totalPx / SPEED)
        node.style.animationDuration = `${animDuration}s`
        return {}
    }
</script>

<section class="verse-bar">
    <div class="ticker-wrap">
        {#key tickerKey}
            <div
                class="ticker-content"
                use:measureAndAnimate
                on:animationend={onTickerEnd}
            >
                <span class="ref">{currentVerse.ref}</span>
                <span class="sep"> &nbsp;·&nbsp; </span>
                <span class="text-id">{currentVerse.id}</span>
                <span class="sep"> &nbsp;&nbsp;|&nbsp;&nbsp; </span>
                <span class="ref-secondary">{currentVerse.refEn}</span>
                <span class="sep"> &nbsp;·&nbsp; </span>
                <span class="text-secondary">{currentVerse.en}</span>
                <span class="sep"> &nbsp;&nbsp;|&nbsp;&nbsp; </span>
                <span class="ref-secondary">{currentVerse.refFr}</span>
                <span class="sep"> &nbsp;·&nbsp; </span>
                <span class="text-secondary">{currentVerse.fr}</span>
                <span class="sep"> &nbsp;&nbsp;|&nbsp;&nbsp; </span>
                <span class="ref-secondary">{currentVerse.refEs}</span>
                <span class="sep"> &nbsp;·&nbsp; </span>
                <span class="text-secondary">{currentVerse.es}</span>
                <span class="spacer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
        {/key}
    </div>
</section>

<style>
    .verse-bar {
        width: 100%;
        flex-shrink: 0;
        background: var(--primary-darkest);
        border-top: 2px solid;
        border-image: linear-gradient(90deg, var(--secondary) 0%, #ef4684 100%) 1;
        padding: 5px 0;
        overflow: hidden;
    }

    .ticker-wrap {
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        height: 22px;
    }

    .ticker-content {
        display: inline-flex;
        align-items: center;
        white-space: nowrap;
        will-change: transform;
        animation: ticker linear forwards;
        /* duration set via JS after measure */
        animation-duration: 60s;
    }

    @keyframes ticker {
        0% {
            transform: translateX(100vw);
        }
        100% {
            transform: translateX(-100%);
        }
    }

    .ref {
        font-size: 0.75em;
        font-weight: 700;
        color: var(--secondary);
    }

    .ref-secondary {
        font-size: 0.72em;
        font-weight: 600;
        opacity: 0.45;
    }

    .sep {
        opacity: 0.25;
        font-size: 0.72em;
    }

    .text-id {
        font-size: 0.8em;
        opacity: 0.92;
    }

    .text-secondary {
        font-size: 0.74em;
        opacity: 0.42;
        font-style: italic;
    }

    .spacer {
        display: inline-block;
    }
</style>
