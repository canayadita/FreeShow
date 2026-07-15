import { getRandomVerse, getTodayVerse, type BibleVerse } from "./bibleVerses"

export type { BibleVerse }

/** Returns the verse of the day (same verse all day, changes each day). */
export function getVOTD(): BibleVerse {
    return getTodayVerse()
}

/** Returns a random verse (different every call). */
export function getRandomBibleVerse(): BibleVerse {
    return getRandomVerse()
}

let rotationTimer: ReturnType<typeof setInterval> | null = null

/**
 * Starts auto-rotating verse every `intervalMs` ms.
 * Calls `callback` immediately with the first verse, then on each interval.
 * Returns a stop function.
 */
export function startVerseRotation(callback: (verse: BibleVerse) => void, intervalMs = 60 * 60 * 1000): () => void {
    callback(getRandomVerse())

    if (rotationTimer) clearInterval(rotationTimer)
    rotationTimer = setInterval(() => {
        callback(getRandomVerse())
    }, intervalMs)

    return () => {
        if (rotationTimer) {
            clearInterval(rotationTimer)
            rotationTimer = null
        }
    }
}
