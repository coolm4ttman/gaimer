# GAIMER ↔ O3DE Upstream Sync Workflow

How to pull updates from upstream O3DE into the GAIMER fork while keeping our
changes intact and merges clean. This is a Phase 1 deliverable.

> **Golden rule:** minimize edits to O3DE *core*. All GAIMER-specific work lives
> in separable modules (Gems / overlays / config) under `GAIMER/` or as external
> Gems, so upstream updates merge with little or no conflict. Every edit to an
> existing O3DE file is future merge-conflict debt — record it (see
> [Core-edit register](#core-edit-register)) and prefer a separable alternative.

---

## Repo layout & remotes

| | |
|---|---|
| Engine fork (working copy) | `C:\Users\Matt\gaimer\o3de` |
| GAIMER-specific content | `C:\Users\Matt\gaimer\o3de\GAIMER\` (this folder) |
| `origin` | `https://github.com/coolm4ttman/o3de.git` (our fork) |
| `upstream` | `https://github.com/o3de/o3de.git` (canonical O3DE) |
| Working branch | `gaimer-main` |
| Current baseline | O3DE stable release tag **`2605.0`** (26.05 / v2.6.0) |

Verify at any time:
```powershell
cd C:\Users\Matt\gaimer\o3de
git remote -v            # origin = our fork, upstream = o3de/o3de
git branch --show-current # gaimer-main
git describe --tags       # baseline tag the branch derives from
```

---

## Branch model

- `gaimer-main` is our integration branch. It is based on an O3DE **stable
  release tag**, not on `upstream/development`.
- We track O3DE's **release tags** (e.g. `2605.0` → next `26xx.x`), not the
  moving `development` tip. Release tags are reproducible and the documented,
  supported build target.
- GAIMER feature work branches off `gaimer-main` and merges back via PRs into
  our fork. Keep GAIMER changes inside `GAIMER/` or in external Gems wherever
  possible.

---

## Routine sync procedure (adopt a new O3DE release)

Run when a newer stable O3DE release tag is published.

1. **Make sure the working tree is clean** and current work is committed/pushed:
   ```powershell
   cd C:\Users\Matt\gaimer\o3de
   git status
   ```

2. **Fetch upstream, including tags:**
   ```powershell
   git fetch upstream --tags
   ```

3. **Identify the newest stable release tag** (O3DE uses `YYMM.patch`):
   ```powershell
   git tag -l | Sort-Object { [version]($_ -replace '^(\d+)\.(\d+).*','$1.$2') } | Select-Object -Last 10
   ```
   Pick the highest `YYMM.patch` (e.g. `2610.0`). Avoid release-candidate tags.

4. **Create a sync branch off our current integration branch** (never sync
   directly on `gaimer-main` — keep it landable):
   ```powershell
   git checkout gaimer-main
   git pull origin gaimer-main          # make sure local matches our fork
   git checkout -b sync/o3de-<NEWTAG>   # e.g. sync/o3de-2610.0
   ```

5. **Merge the new release tag in:**
   ```powershell
   git merge <NEWTAG>                   # e.g. git merge 2610.0
   ```
   - We **merge** (not rebase) release tags into our integration branch so the
     shared history stays stable and already-pushed commits aren't rewritten.
   - If conflicts appear, they should be confined to any files we edited in
     core. Resolve per the [conflict guidance](#resolving-conflicts) below.

6. **Re-bootstrap & rebuild** (3rd-party deps and the bundled Python can change
   between releases — see [Rebuild & verify](#rebuild--verify)).

7. **Verify** the Editor + a GameLauncher build and launch (the Phase 1
   launch/play check), then open a PR from `sync/o3de-<NEWTAG>` →
   `gaimer-main` in our fork for review before landing.

---

## Resolving conflicts

- **Inside `GAIMER/` or our Gems:** ours wins by definition — these files don't
  exist upstream, so conflicts here are rare and indicate something was placed
  in core by mistake.
- **In an O3DE core file:** this is the debt the golden rule exists to prevent.
  For each such conflict:
  1. Take upstream's version of the surrounding code.
  2. Re-apply the GAIMER change *minimally*, and check the
     [Core-edit register](#core-edit-register) to confirm it's still needed.
  3. Strongly consider moving the change out of core (into an overlay, a
     setreg/registry override, or a Gem) so the conflict never recurs.
- Never resolve a conflict by blindly discarding upstream changes — that silently
  reverts engine fixes. Understand both sides.

---

## Rebuild & verify after a sync

Environment notes for this machine (see also the project memory):

- Run O3DE `.bat`/`.cmd` scripts from **PowerShell**, not `cmd /c` via bash.
- Ensure CMake is on PATH for the session:
  ```powershell
  $env:PATH = 'C:\Program Files\CMake\bin;' + $env:PATH
  ```

Steps:
```powershell
cd C:\Users\Matt\gaimer\o3de
$env:PATH = 'C:\Program Files\CMake\bin;' + $env:PATH
$env:LY_3RDPARTY_PATH = 'C:\o3de-packages'

# 1. Re-bootstrap bundled Python + pip requirements (safe to re-run)
.\python\get_python.bat

# 2. Re-configure (re-resolves 3rd-party packages; cached if unchanged)
cmake -B build/windows -S . -G "Visual Studio 17 2022" `
      -DLY_3RDPARTY_PATH=C:\o3de-packages -DLY_PROJECTS=AutomatedTesting

# 3. Rebuild the key targets
cmake --build build/windows --target Editor AutomatedTesting.GameLauncher `
      --config profile -- /m

# 4. Reprocess assets (recompiles shaders for the GPU — watch for RTX 5080 issues)
.\build\windows\bin\profile\AssetProcessorBatch.exe --project-path C:\Users\Matt\gaimer\o3de\AutomatedTesting

# 5. Launch & confirm it renders/plays
.\build\windows\bin\profile\AutomatedTesting.GameLauncher.exe +LoadLevel levels/defaultlevel/defaultlevel.spawnable
```

If a sync brings a newer CMake-minimum or toolchain requirement, update the
build prerequisites accordingly (current baseline: VS 2022 17.14 / MSVC v143,
CMake 4.3.3, Windows 11 SDK 10.0.26100).

---

## Core-edit register

Track every unavoidable modification to an **existing O3DE file** here. Anything
not listed should live under `GAIMER/` or in a Gem. Keep this short — a growing
list is a signal to push changes back out into separable modules.

| Date | File (core) | Why it couldn't be a Gem/overlay | Re-apply notes on sync |
|------|-------------|----------------------------------|------------------------|
| 2026-06-22 | `Code/Editor/o3de_logo.svg` | Compiled into the Editor binary via `StartupLogoDialog.qrc`; O3DE has no runtime override for the Editor's own splash logo. | Re-copy from `GAIMER/branding/gaimer_logo.svg`. |
| 2026-06-22 | `Code/Editor/splashscreen_background.png` | Compiled into the Editor binary via `StartupLogoDialog.qrc`. | Re-copy from `GAIMER/branding/splashscreen_background.png`. |
| 2026-06-22 | `Code/Editor/res/o3de_editor.ico` | App/window icon embedded via Win32 resource `EditorCryEdit.rc`. | Re-copy from `GAIMER/branding/gaimer_editor.ico`. |
| 2026-06-22 | `Code/Tools/ProjectManager/Resources/ProjectManager-Icon.svg` | Compiled into Project Manager via `ProjectManager.qrc`. | Re-copy from `GAIMER/branding/gaimer_mark_256.svg`. |
| 2026-06-22 | `Code/Tools/ProjectManager/Resources/ProjectManager-Icon.ico` | App/window icon embedded via Win32 resource `ProjectManager.rc`. | Re-copy from `GAIMER/branding/gaimer_pm.ico`. |
| 2026-06-22 | `Code/Tools/ProjectManager/Resources/o3de.svg` | Header mark compiled into Project Manager via `ProjectManager.qrc`. | Re-copy from `GAIMER/branding/gaimer_mark_38x32.svg`. |
| 2026-06-22 | `Code/Tools/ProjectManager/Resources/o3de_desktop.svg` | Desktop-shortcut mark compiled into Project Manager via `ProjectManager.qrc`. | Re-copy from `GAIMER/branding/gaimer_mark_32x32.svg`. |

> These seven are **binary/resource swaps only — no source-code edits**. The canonical GAIMER art lives in the separable `GAIMER/branding/` folder; the rows above just mark where it's copied into core for the build to pick it up. Merge conflicts here are unlikely (they only occur if upstream also re-arts the same file) and are resolved by re-running the copy. All seven assets are regenerated from the single hand-supplied logo art `GAIMER/branding/gaimer_logo_source.png` (mascot + GAIMER/AI wordmark, transparent bg) by running `GAIMER/branding/make_logo_assets.ps1`, which emits the black splash, the SVG-wrapped logo, and the mascot-on-black tile icons/SVGs. Text branding (Editor titlebar, About dialog, etc.) was intentionally **left as O3DE** to keep core source untouched per the golden rule.

---

## Quick reference

```powershell
# See how far behind upstream development we are (informational)
git fetch upstream
git log --oneline gaimer-main..upstream/development | Measure-Object -Line

# List release tags newest-first
git fetch upstream --tags
git tag -l | Sort-Object { [version]($_ -replace '^(\d+)\.(\d+).*','$1.$2') } | Select-Object -Last 10
```
