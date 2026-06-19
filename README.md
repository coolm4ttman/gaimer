# GAIMER

GAIMER is a game engine product built on **[Open 3D Engine (O3DE)](https://github.com/o3de/o3de)**.
Its value lives in **separable Gems and a Project**, with the engine kept as a **thin fork** that
carries only the minimal editor-shell rebrand.

> **Phase 1a — scaffolding only.** This repo currently contains the fork/sync strategy, the
> located rebrand surface, licensing obligations, and the Windows build checklist. **No engine
> is built here.** The engine builds later on the Windows / RTX 5080 box.

## Read these first

| Doc | What it covers |
| --- | --- |
| [MAINTENANCE.md](MAINTENANCE.md) | Repo topology, remotes, branch structure, **upstream-sync workflow**. |
| [docs/REBRAND.md](docs/REBRAND.md) | The **located** rebrand surface — project-side (no core edit) vs. thin-fork patches. |
| [LICENSING.md](LICENSING.md) | Apache-2.0 / MIT terms and the **attribution obligations** we must preserve. |
| [BUILD_WINDOWS.md](BUILD_WINDOWS.md) | Full prerequisite + build checklist for the RTX 5080 box. |

## Repos

- **`gaimer`** (this repo) — [github.com/coolm4ttman/gaimer](https://github.com/coolm4ttman/gaimer) — Project + Gems + branding assets + docs. The real product.
- **`gaimer-engine`** — [github.com/coolm4ttman/gaimer-engine](https://github.com/coolm4ttman/gaimer-engine) — thin fork of `o3de/o3de`; only the editor rebrand lives there. Seed it per [MAINTENANCE.md §2b](MAINTENANCE.md) before the first build.

## Layout

```
branding/      GAIMER editor + launcher brand assets
docs/          design & planning docs (REBRAND.md, …)
engine-patches/  exported rebrand patches + PINNED_O3DE.txt (engine version pin)
Project/       the GAIMER O3DE project (later phase)
Gems/          GAIMER Gems — the real value (later phases)
```

Built on Open 3D Engine. O3DE and Open 3D Engine are trademarks of their respective owners;
see [LICENSING.md](LICENSING.md).
