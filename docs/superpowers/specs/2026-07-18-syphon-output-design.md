# Syphon Output (macOS) — share the output to OBS

Date: 2026-07-18
Status: Approved (design)

## Goal

On macOS, publish an output's video as a **Syphon** server so OBS (and other
Syphon clients) can pick it up locally with low latency, GPU-friendly, no
network. Windows and Linux are out of scope — they already reach OBS via the
existing **NDI** output.

## Key decisions (from brainstorming)

- macOS only. A "Enable Syphon" toggle appears per output in Settings → Outputs,
  shown **only on macOS**. Windows/Linux keep using NDI (no new code).
- Reuse the existing capture pipeline (same pattern as NDI/RTMP): a new
  `"syphon"` capture channel feeds the captured BGRA frame to a `SyphonSender`.
- Critical dependency: the `node-syphon` native addon must build & bundle with
  our Electron (37) on arm64/x64, like the existing `grandiose`/`macadam`
  addons. **Task 0 of the plan verifies this before anything else.** If it can't
  be made reliable, macOS falls back to NDI (feature still whole).

## Non-Goals

- Windows (Spout) and Linux — use NDI.
- True zero-copy GPU texture sharing (hard from Electron) — we publish the
  existing CPU BGRA frame, which is fine for OBS.
- Audio (Syphon is video only).

## Data model

`src/types/Output.ts` — add to the output type (next to `ndi?: boolean`):

```ts
    syphon?: boolean // macOS: publish this output as a Syphon server
    syphonName?: string // optional publish name (default: output name)
```

Persisted with the output settings exactly like `ndi`.

## Components & flow

### 1. Settings UI (macOS only)

In the Outputs settings (`src/frontend/components/settings/tabs/Outputs.svelte`),
add an "Enable Syphon" toggle guarded by `os === "mac"` (or `getOS()`), mirroring
the "Enable NDI" toggle. Toggling sets `output.syphon` and calls the same
capture-refresh path NDI uses.

### 2. Enable capture

`src/frontend/components/helpers/output.ts` — in `shouldBeCaptured`, add to the
`captures` object:

```ts
        syphon: !!output.syphon, // macOS only; ignored by non-mac electron
```

This sends `CAPTURE` with `captures.syphon`, the same mechanism NDI uses.

### 3. Electron capture channel

- `src/electron/capture/helpers/CaptureTransmitter.ts` — add `"syphon"` to the
  channel key list and a `case "syphon"` in `sendFrameToChannel` that calls
  `SyphonSender.sendFrame(captureId, image)`. Reuses the already-throttled frame
  loop (no new timing).
- The `CAPTURE` handler that registers/removes channels (CaptureLifecycle /
  CaptureHelper) treats `syphon` like `ndi`: start the sender when enabled, stop
  when disabled.

### 4. SyphonSender (new, macOS)

`src/electron/syphon/SyphonSender.ts` wraps `node-syphon`:

- `sendFrame(id, image)`: lazily create a Syphon **metal/IOSurface** server named
  from `syphonName || output name`; publish the frame (BGRA buffer + size).
- `stop(id)`: destroy the server.
- Guarded so it is a no-op on non-macOS (the module only loads `node-syphon` when
  `process.platform === "darwin"`), so Windows/Linux builds never touch it.

### 5. Bundling

- Add `node-syphon` to dependencies; `asarUnpack` its native binary in
  `electron-builder.yaml` (like `grandiose`/`macadam`); it rebuilds via
  `electron-builder install-app-deps` / `@electron/rebuild` for mac arch.
- Mac-only native dep: it must not break Windows/Linux CI builds (import guarded
  by platform; electron-builder only rebuilds it for mac).

## Behaviour / edge cases

- Toggle only visible on macOS; on other OSes the field is simply unused.
- Enabling Syphon starts screen capture for that output (same toast as NDI).
- OBS: add a "Syphon Client" source → pick the "FreeShow" server.
- If `node-syphon` fails to load at runtime, log and no-op (don't crash output).

## Files touched

- `src/types/Output.ts` — `syphon`, `syphonName` fields.
- `src/frontend/components/settings/tabs/Outputs.svelte` — mac-only toggle.
- `src/frontend/components/helpers/output.ts` — `shouldBeCaptured` adds `syphon`.
- `src/electron/capture/helpers/CaptureTransmitter.ts` — `"syphon"` channel + case.
- `src/electron/capture/helpers/CaptureLifecycle.ts` (or CaptureHelper) — start/stop on CAPTURE.
- `src/electron/syphon/SyphonSender.ts` (new) — node-syphon wrapper (mac-guarded).
- `config/building/electron-builder.yaml` — asarUnpack node-syphon.
- `package.json` — add `node-syphon`.
- `public/lang/en.json`, `public/lang/id_ID.json` — toggle label.

## Verification

- **Task 0 (gate):** `npm i node-syphon` then `npx electron-rebuild` (or
  `electron-builder install-app-deps`) succeeds for the local arm64 Electron; a
  tiny script publishes a test frame visible to a Syphon client. If this fails,
  stop and reconsider (fallback to NDI).
- Unit-test the pure routing decision (a helper `shouldSendSyphon(output, os)`).
- Build DMG arm64; in-app: enable Syphon on an output; in OBS add a Syphon Client
  source and confirm the FreeShow output appears live.
