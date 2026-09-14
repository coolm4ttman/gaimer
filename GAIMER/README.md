# GAIMER — start here

**Read this file first, then `docs/GAIMER_BUILD_SPEC.md`.** This `GAIMER/` folder is the separable home for everything GAIMER-specific inside the O3DE engine fork (repo `coolm4ttman/gaimer`, branch `gaimer-main`). This README exists so that any model or person picking up the work has the full context without access to anyone's private notes.

## What GAIMER is (decided 2026-09-14)

A bet on owning the next gaming platform end to end — three layers (spec §0):

1. **Layer 1 — AI mod-authoring platform. CURRENT BUILD TARGET.** "Lovable for game modding": a non-developer describes a mod in plain English and gets a working, installable mod file. First target FiveM (GTA V). The moat is the headless FXServer validation harness. Full spec: `docs/GAIMER_BUILD_SPEC.md` — tags `[DECIDED]` (do not relitigate) / `[PROPOSED]` / `[VERIFY]` (check live docs before building on it).
2. **Layer 2 — the AI-native game engine on O3DE. DEFERRED.** That is this repo's engine work: fork + build + assets-only rebrand done (Phase 1); engine Phase 2 M0 (build-proof gate) passed 2026-09-13; **engine M1 is NOT to be started.** Plan, research verdicts, M0 results: `docs/PHASE2_PLAN.md`.
3. **Layer 3 — in-house immersive console (headset + body-tracking suit + trackpad). Firm. Not a build target.**

Priority: **P3**, alongside BrickGen — reach a provable milestone on limited time; no platform rewrites. Layer 1 is not throwaway: the plan representation, the validation-harness pattern and the failure-memory flywheel must carry into Layer 2, built game-agnostic with FiveM as one adapter behind an interface.

## Current state (as of 2026-09-14)

- **Engine fork:** O3DE release tag `2605.0` (v2.6.0) → branch `gaimer-main`. Builds on Windows (VS 2022 17.14 / MSVC v143, CMake 4.3.3). Assets-only shell rebrand — zero core C++ edits. Core-edit register: 7 asset swaps, 0 source edits (`docs/upstream-sync.md`). Text branding (titlebar, About) deliberately left as O3DE.
- **Engine Phase 2 M0 — PASSED.** `Projects/GaimerSandbox` (DefaultProject) + `Gems/GaimerAiOrchestration` (PythonToolGem) scaffolded; gem wiring lives only in the project's `project.json` (the project is deliberately *not* registered in `engine.json`). Editor launches to the full UI; Editor-Python/PySide2 proven; the gem's view pane opens as a dock widget. Details and the corrections it forced: `docs/PHASE2_PLAN.md` → "M0 Results".
- **Layer 1:** nothing built yet. No repo decision yet (proposal on the table: rename this fork `gaimer-engine` and make `gaimer` the Layer 1 product repo). The `[VERIFY]` items below are unresolved.
- Earlier history: a separate thin-fork planning repo (`coolm4ttman/gaimer-scaffold`) is archived; its useful docs were migrated into `docs/`.

## Machine-specific facts (this Windows 11 box)

- **Hybrid GPU: AMD Radeon iGPU + NVIDIA RTX 5080.** O3DE's `RHISystem` picks the *first* AMD-or-NVIDIA adapter — the iGPU. **Always launch the Editor via `scripts/launch_editor.ps1`** (it passes `--forceAdapter=nvidia`; `-Smoke` also runs `scripts/editor_smoke_check.py`). A bare `Editor.exe` launch silently renders on the iGPU.
- **Windows Smart App Control was turned OFF** on 2026-09-13 — it had blocked the unsigned `SceneProcessing.Editor.dll` (Code Integrity events 3077/3033). Unsigned local builds need it off; it is one-way.
- **Local GPU inference works only in `C:\Users\Matt\PersonaPlex\venv`** (torch 2.11.0+cu130 nightly, sm_120). System-Python torch is CPU-only; no CUDA toolkit/`nvcc`, no Ollama/llama.cpp/TensorRT. With the Editor open, effective VRAM is ~12–13 GB, not 16. Don't mix CUDA majors (venv is cu130).
- **Build:** in PowerShell, `$env:PATH='C:\Program Files\CMake\bin;'+$env:PATH; $env:LY_3RDPARTY_PATH='C:\o3de-packages'`; engine-centric configure with `-DLY_PROJECTS="AutomatedTesting;<full path>\GAIMER\Projects\GaimerSandbox"`; build targets `Editor` and `GaimerAiOrchestration.Editor` (`--config profile`). Run O3DE `.bat` scripts from PowerShell, not `cmd /c` via bash. See `docs/BUILD_WINDOWS.md`, `docs/upstream-sync.md`.
- Verification without screenshots: loaded modules (`nvwgf2umx.dll` = NVIDIA device, `amdxc64.dll` = AMD), per-process GPU counters, the Code Integrity event log, and `--runpython` result files. Gem-bootstrap `print()` never reaches `Editor.log`; a `--runpython` script's prints appear as `(python_test)`.

## Standing rules

- **Golden rule:** minimize edits to O3DE core. All GAIMER-specific work lives in separable modules (this folder, Gems, overlays, config) so upstream O3DE updates merge cleanly. If it can be done via config/overlay/Gem instead of editing core, do that. Any unavoidable core touch is logged in the core-edit register in `docs/upstream-sync.md`.
- **Ask before assuming installed tooling; proactively flag RTX 5080 / Blackwell driver and toolchain issues.**
- Do not relitigate `[DECIDED]` items in the spec. Verify `[VERIFY]` items against live docs/APIs before building on them.
- Licensing obligations (Apache-2.0 + Qt LGPL attribution; model-weight licences — e.g. FLUX.1 *dev* is non-commercial): `docs/LICENSING.md`.

## Docs index

- `docs/GAIMER_BUILD_SPEC.md` — the three-layer thesis + the Layer 1 build spec. **The instructions to build from.**
- `docs/PHASE2_PLAN.md` — Layer 2 (engine) architecture, tech verdicts (Recast adopt; TRELLIS defer; NuiScene defer; SAGE reject-as-dependency; MotionBricks reject), milestones, M0 results & corrections. DEFERRED.
- `docs/upstream-sync.md` — fork/branch model, upstream sync procedure, core-edit register.
- `docs/BUILD_WINDOWS.md`, `docs/REBRAND.md`, `docs/LICENSING.md` — migrated from the archived scaffold; authored against O3DE 2.7.0, so verify `file:line` details against this 2605.0 checkout.
- `scripts/launch_editor.ps1`, `scripts/editor_smoke_check.py` — the correct way to launch and smoke-test the Editor on this machine.
- `branding/` — brand source art (`gaimer_logo_source.png`) and `make_logo_assets.ps1`, which regenerates the 7 swapped engine assets.

## Open `[VERIFY]` items for Layer 1 (unresolved as of 2026-09-14)

1. **Cfx.re / Rockstar terms** on commercial tooling built on FiveM, on automated server instances, and on paid resources (Tebex as the sanctioned route). Do this **before M0** — it decides whether the harness can legally exist at all.
2. Whether a headless FXServer needs a licence key per instance (keymaster), and any limits on automated instances.
3. The canonical Cfx natives JSON feed and its schema; the currently required `fxmanifest.lua` keys.
4. Licences of any corpus resources ingested (permissive only).
5. (Layer 2, later) Hunyuan3D community-licence terms (territorial / MAU restrictions).

## Advice on the table (from the 2026-09-14 review — NOT decided)

- Do legal/platform diligence before M0, not before M4; keep the harness platform-agnostic (Minecraft / Garry's Mod adapters) as the hedge.
- Add QBCore/ESX framework awareness — most target servers run one, and it is the difference between "boots" and "works on my server".
- The real buyer is the server owner/admin, not a player.
- Client-side code cannot execute headlessly (no legitimate headless GTA V client) → wedge on server-authoritative mods; have the M3 eval report server-only vs client-heavy success separately.
- v0 gate 4 = one long-lived FXServer per worker + `restart <resource>` and capture; no snapshot pools, Firecracker or Temporal until the eval number says the product is real.
- "Game-agnostic" = **one** adapter interface `{ apiIndex, harness, packager }`, not N-target orchestration. The durable cross-layer asset is intent→plan pairs (tag them target-agnostically); plan→code pairs are per-target.
- Layer 1 needs its own repo, separate from this engine fork.
