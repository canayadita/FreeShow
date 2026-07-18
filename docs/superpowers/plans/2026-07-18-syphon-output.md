# Syphon Output (macOS) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** On macOS, publish an output's video as a Syphon server so OBS can capture the FreeShow output locally with low latency.

**Architecture:** Reuse the existing capture pipeline (like NDI/RTMP): a new `"syphon"` capture channel feeds the captured BGRA frame to a mac-only `SyphonSender` that wraps the `node-syphon` native addon. A per-output "Enable Syphon" toggle (macOS only) drives capture via the same `shouldBeCaptured` mechanism NDI uses.

**Tech Stack:** Electron 37, `node-syphon` (native addon), TypeScript, vitest.

---

## File Structure

- `src/types/Output.ts` — add `syphon`, `syphonName` fields.
- `src/electron/syphon/SyphonSender.ts` (new) — node-syphon wrapper, mac-guarded.
- `src/electron/syphon/syphonRouting.ts` (new) — pure `shouldSendSyphon(output, platform)` decision.
- `src/electron/syphon/syphonRouting.test.ts` (new) — vitest.
- `src/electron/capture/helpers/CaptureTransmitter.ts` — `"syphon"` channel + case.
- `src/electron/capture/helpers/CaptureLifecycle.ts` — add `"syphon"` to the stop-channels list.
- `src/frontend/components/helpers/output.ts` — `shouldBeCaptured` adds `syphon`.
- `src/frontend/components/settings/tabs/Outputs.svelte` — mac-only toggle.
- `config/building/electron-builder.yaml` — asarUnpack node-syphon.
- `package.json` — add `node-syphon`.
- `public/lang/en.json`, `public/lang/id_ID.json` — toggle label.

---

## Task 0: GATE — verify node-syphon builds, loads & publishes

**Do not proceed past this task if it fails. If it fails, stop and report — macOS falls back to NDI.**

- [ ] **Step 1: Install the addon**

Run: `npm install node-syphon@^1.5.0`
Expected: installs without error.

- [ ] **Step 2: Rebuild for Electron's ABI**

Run: `npx electron-rebuild -f -w node-syphon` (or `npm run postinstall` which runs `electron-builder install-app-deps`)
Expected: builds the native binary for the local Electron/arch without error.

- [ ] **Step 3: Record the actual API surface**

Run: `cat node_modules/node-syphon/index.d.ts 2>/dev/null || ls node_modules/node-syphon` and read the README.
Note the exact server class + publish method (in node-syphon 1.x this is typically `SyphonServerMetal` / `SyphonMetalServer` with a `publishImageData(buffer, SyphonImageFormat, width, height, ...)` and `dispose()` — confirm the real names). Write the confirmed API names into Task 3 before implementing.

- [ ] **Step 4: Smoke-test publishing a frame**

Create a throwaway `/tmp/syphon-smoke.js` that requires `node-syphon`, creates a server named "FreeShowTest", and publishes one solid-color BGRA buffer (e.g. 320x180), then keeps the process alive for 20s:

```js
const syphon = require("node-syphon")
// adjust class/method names to the confirmed API from Step 3
const server = new syphon.SyphonServerMetal("FreeShowTest")
const w = 320, h = 180
const buf = Buffer.alloc(w * h * 4)
for (let i = 0; i < buf.length; i += 4) { buf[i] = 0; buf[i+1] = 0; buf[i+2] = 255; buf[i+3] = 255 }
setInterval(() => server.publishImageData(buf, syphon.SyphonImageFormat.BGRA8, w, h, 0, 0, w, h, false), 100)
console.log("publishing… open a Syphon client (e.g. Simple Client / OBS Syphon)")
```

Run: `./node_modules/.bin/electron /tmp/syphon-smoke.js` (must run under Electron, not plain node, to match the ABI)
Expected: a Syphon client (OBS "Syphon Client" source, or Syphon Simple Client) shows a red frame named "FreeShowTest".

- [ ] **Step 5: Commit the dependency**

```bash
git add package.json package-lock.json
git commit -m "chore(syphon): add node-syphon dependency (verified builds + publishes)"
```

---

## Task 1: Types

**Files:**
- Modify: `src/types/Output.ts` (near `ndi?: boolean`, line ~25)

- [ ] **Step 1: Add fields**

```ts
    syphon?: boolean // macOS: publish this output as a Syphon server
    syphonName?: string // optional publish name (default: output name)
```

- [ ] **Step 2: Lint**

Run: `npx eslint -c config/linting/eslint.electron.json --ext .ts src/types/Output.ts`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/Output.ts
git commit -m "feat(syphon): add syphon output type fields"
```

---

## Task 2: Pure routing helper (TDD)

**Files:**
- Create: `src/electron/syphon/syphonRouting.ts`
- Test: `src/electron/syphon/syphonRouting.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest"
import { shouldSendSyphon } from "./syphonRouting"

describe("shouldSendSyphon", () => {
    it("true only on macOS when the output has syphon enabled", () => {
        expect(shouldSendSyphon({ syphon: true }, "darwin")).toBe(true)
    })
    it("false on non-macOS even when enabled", () => {
        expect(shouldSendSyphon({ syphon: true }, "win32")).toBe(false)
        expect(shouldSendSyphon({ syphon: true }, "linux")).toBe(false)
    })
    it("false when disabled/missing", () => {
        expect(shouldSendSyphon({ syphon: false }, "darwin")).toBe(false)
        expect(shouldSendSyphon({}, "darwin")).toBe(false)
    })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run test:unit -- syphonRouting`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement**

```ts
export function shouldSendSyphon(output: { syphon?: boolean }, platform: NodeJS.Platform): boolean {
    return platform === "darwin" && !!output?.syphon
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm run test:unit -- syphonRouting`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/electron/syphon/syphonRouting.ts src/electron/syphon/syphonRouting.test.ts
git commit -m "feat(syphon): pure platform routing helper with tests"
```

---

## Task 3: SyphonSender wrapper (macOS)

**Files:**
- Create: `src/electron/syphon/SyphonSender.ts`
- Reference: the confirmed node-syphon API from Task 0 Step 3.

- [ ] **Step 1: Implement the wrapper**

Use the API names confirmed in Task 0. Lazy-load `node-syphon` only on macOS so Windows/Linux never require it:

```ts
import type { NativeImage } from "electron"

type Server = { publishImageData: (...args: any[]) => void; dispose?: () => void }

export class SyphonSender {
    private static servers: { [id: string]: Server } = {}
    private static syphon: any = null

    private static load(): any {
        if (process.platform !== "darwin") return null
        if (!this.syphon) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                this.syphon = require("node-syphon")
            } catch (err) {
                console.error("Syphon: failed to load node-syphon", err)
                this.syphon = null
            }
        }
        return this.syphon
    }

    static sendFrame(id: string, name: string, image: NativeImage) {
        const syphon = this.load()
        if (!syphon || !image) return
        const size = image.getSize()
        if (!size.width || !size.height) return

        let server = this.servers[id]
        if (!server) {
            try {
                server = new syphon.SyphonServerMetal(name || "FreeShow")
                this.servers[id] = server
            } catch (err) {
                console.error("Syphon: failed to create server", err)
                return
            }
        }

        try {
            // BGRA8 matches Electron/Chromium capture output (no pixel conversion needed)
            server.publishImageData(image.toBitmap(), syphon.SyphonImageFormat.BGRA8, size.width, size.height, 0, 0, size.width, size.height, false)
        } catch (err) {
            console.error("Syphon: publish failed", err)
        }
    }

    static stop(id: string) {
        const server = this.servers[id]
        if (!server) return
        try {
            server.dispose?.()
        } catch {
            // ignore
        }
        delete this.servers[id]
    }
}
```

If Task 0 revealed different class/method/enum names, adjust `SyphonServerMetal`, `publishImageData`, and `SyphonImageFormat.BGRA8` accordingly.

- [ ] **Step 2: Lint**

Run: `npx eslint -c config/linting/eslint.electron.json --ext .ts src/electron/syphon/SyphonSender.ts`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/electron/syphon/SyphonSender.ts
git commit -m "feat(syphon): SyphonSender node-syphon wrapper (mac-guarded)"
```

---

## Task 4: Wire into the capture pipeline

**Files:**
- Modify: `src/electron/capture/helpers/CaptureTransmitter.ts` (channel list ~line 49, `sendFrameToChannel` switch ~line 219)
- Modify: `src/electron/capture/helpers/CaptureLifecycle.ts` (stop-channels list ~line 194)

- [ ] **Step 1: Import SyphonSender + shouldSendSyphon**

Add near the other imports in `CaptureTransmitter.ts`:

```ts
import { SyphonSender } from "../../syphon/SyphonSender"
```

- [ ] **Step 2: Add "syphon" to the channel keys**

In `CaptureTransmitter.ts`, change the channel keys array (currently `["ndi", "blackmagic", "server", "stage", "webrtc", "rtmp"]`) to include `"syphon"`:

```ts
        const channelKeys = ["ndi", "blackmagic", "server", "stage", "webrtc", "rtmp", "syphon"]
```

- [ ] **Step 3: Handle the "syphon" case in sendFrameToChannel**

In the `switch (key)` inside `sendFrameToChannel`, add before `default`/end:

```ts
            case "syphon":
                this.sendBufferToSyphon(captureId, image)
                break
```

And add the method (near `sendBufferToRtmp`):

```ts
    // SYPHON (macOS → OBS)
    static sendBufferToSyphon(outputId: string, image: NativeImage) {
        const output = OutputHelper.getOutput(outputId)
        const name = output?.syphonName || output?.name || "FreeShow"
        SyphonSender.sendFrame(outputId, name, image)
    }
```

- [ ] **Step 4: Stop the Syphon server on capture stop**

In `CaptureLifecycle.ts`, add `"syphon"` to the channels array at line ~194:

```ts
        const channels = ["ndi", "blackmagic", "server", "stage", "webrtc", "rtmp", "syphon"]
```

Ensure `CaptureHelper.Transmitter.stopChannel(id, "syphon")` calls `SyphonSender.stop(id)` — in `CaptureTransmitter.stopChannel`, add: if the channel key is `"syphon"`, call `SyphonSender.stop(captureId)` (locate `stopChannel` and add the branch).

- [ ] **Step 5: Lint**

Run: `npx eslint -c config/linting/eslint.electron.json --ext .ts src/electron/capture/helpers/CaptureTransmitter.ts src/electron/capture/helpers/CaptureLifecycle.ts`
Expected: no new errors (baseline-compared).

- [ ] **Step 6: Commit**

```bash
git add src/electron/capture/helpers/CaptureTransmitter.ts src/electron/capture/helpers/CaptureLifecycle.ts
git commit -m "feat(syphon): route capture frames to Syphon + stop on capture end"
```

---

## Task 5: Enable capture + settings toggle

**Files:**
- Modify: `src/frontend/components/helpers/output.ts` (`shouldBeCaptured` ~line 691)
- Modify: `src/frontend/components/settings/tabs/Outputs.svelte`

- [ ] **Step 1: Add syphon to the captures object**

In `shouldBeCaptured`'s `captures` object, add:

```ts
        syphon: !!output.syphon,
```

- [ ] **Step 2: Add the mac-only toggle**

In `Outputs.svelte`, find the "Enable NDI" toggle. Directly after it, add a Syphon toggle guarded by macOS. Use the existing OS check in that file (grep for `os`, `getOS`, or `$os`); if none, import `import { os } from "../../../stores"` and guard with `{#if $os === "mac"}`. Mirror the NDI toggle's structure, binding `output.syphon` and calling the same update+`shouldBeCaptured` path NDI uses. Example shape (adapt to the file's existing toggle component):

```svelte
{#if $os === "mac"}
    <MaterialToggleSwitch label="settings.enable_syphon" checked={output?.syphon || false} on:change={(e) => setSyphon(e.detail)} />
{/if}
```

with a handler that sets `output.syphon` on the output and calls `shouldBeCaptured(outputId)` (mirror how the NDI toggle persists + refreshes capture in this file).

- [ ] **Step 3: Add labels**

`public/lang/en.json` (settings section): `"enable_syphon": "Enable Syphon (OBS)"`.
`public/lang/id_ID.json` (settings section): `"enable_syphon": "Aktifkan Syphon (OBS)"`.

- [ ] **Step 4: Validate JSON + lint**

Run: `node -e "JSON.parse(require('fs').readFileSync('public/lang/en.json'));JSON.parse(require('fs').readFileSync('public/lang/id_ID.json'));console.log('OK')"`
Run: `npx eslint -c config/linting/eslint.frontend.json --ext .ts src/frontend/components/helpers/output.ts` and `npx eslint -c config/linting/eslint.svelte.js --ext .svelte src/frontend/components/settings/tabs/Outputs.svelte`
Expected: `OK`, no new errors.

- [ ] **Step 5: Commit**

```bash
git add src/frontend/components/helpers/output.ts src/frontend/components/settings/tabs/Outputs.svelte public/lang/en.json public/lang/id_ID.json
git commit -m "feat(syphon): mac-only Enable Syphon toggle + capture wiring"
```

---

## Task 6: Bundling

**Files:**
- Modify: `config/building/electron-builder.yaml` (mac `asarUnpack`)

- [ ] **Step 1: Unpack the native binary**

In `electron-builder.yaml`, the `mac.asarUnpack` list already contains `**/node_modules/macadam/**/*.node`. Add:

```yaml
        - "**/node_modules/node-syphon/**/*.node"
```

- [ ] **Step 2: Commit**

```bash
git add config/building/electron-builder.yaml
git commit -m "chore(syphon): asarUnpack node-syphon native binary"
```

---

## Task 7: Build + manual verification

- [ ] **Step 1: Unit tests**

Run: `npm run test:unit`
Expected: all pass (incl. syphonRouting).

- [ ] **Step 2: Full build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Package DMG (local test)**

Run: `npx electron-builder --config config/building/electron-builder.yaml --mac dmg --arm64 --publish never`
Expected: DMG created.

- [ ] **Step 4: Manual OBS test**
  - Install the DMG, open FreeShow+.
  - Settings → Outputs → enable **Syphon (OBS)** on the output.
  - Show a slide (so the output is capturing).
  - In OBS (macOS) add a **Syphon Client** source → pick the "FreeShow" server → the live output appears.
  - Disable the toggle → the Syphon source goes away.

## Self-review notes

- Spec coverage: gate/verify (T0), types (T1), routing helper (T2), sender (T3), pipeline wiring + stop (T4), capture enable + toggle + labels (T5), bundling (T6), build/verify (T7). ✓
- Names consistent: `output.syphon`/`syphonName`, `shouldSendSyphon`, `SyphonSender.sendFrame/stop`, channel `"syphon"`, label `settings.enable_syphon`.
- Native-addon risk isolated to T0 (the gate) and T3; T3's exact node-syphon API is confirmed in T0 Step 3 before coding. Non-mac safety: `SyphonSender` lazy-requires only on darwin; routing helper excludes non-darwin; electron-builder unpacks only for mac.
