// Deep clone helper. The result is frequently sent over Electron IPC, which
// structured-clones the payload — so the returned value MUST itself be
// structured-cloneable. structuredClone throws on functions/class instances;
// when that happens we fall back to a JSON-safe deep clone (which drops the
// non-cloneable bits) instead of returning the original un-cloneable object.
// Returning the original caused "An object could not be cloned." on save,
// silently preventing shows from being written to disk.
export function clone<T>(object: T): T {
    if (object === null || typeof object !== "object") return object

    try {
        return structuredClone(object)
    } catch {
        try {
            return JSON.parse(JSON.stringify(object))
        } catch {
            return object
        }
    }
}
