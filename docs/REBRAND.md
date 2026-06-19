# GAIMER — Editor Shell Rebrand Surface

**Status:** planning / located only. Nothing here is built or patched yet (Phase 1a).
**Engine reference:** O3DE `2.7.0` (from `engine.json`), inspected at a shallow clone.
All paths below are **relative to the O3DE engine root**.

## TL;DR — the honest finding

O3DE provides **no config/overlay hook for branding the *editor tool shell*** (window
title, Qt application name, splash image, editor `.ico`). These are **compiled into the
`Editor` binary** — via hardcoded C++ strings and Qt resource (`.qrc`) / Windows resource
(`.rc`) files. So a "zero core-edit" rebrand of the **editor** is **not achievable**.

However, the **shipped game (GameLauncher) brands entirely from the project** — its
executable name, window/app icon, and product name come from the GAIMER **project**, with
**no engine edits at all**.

**Conclusion → two-bucket strategy:**

| Bucket | Where it lives | Core edits? |
| --- | --- | --- |
| **A. Runtime game branding** | GAIMER **project** repo (this repo) | **None** |
| **B. Editor shell branding** | Thin engine-fork branch (`gaimer/rebrand`) | Minimal, isolated |

Bucket B is precisely why the [thin engine fork](../MAINTENANCE.md) exists. Keep B as small
as possible; do everything you can in Bucket A.

---

## Bucket A — Project-side (NO engine edits)

These live in the GAIMER **project** (eventually under `Project/` in this repo) and need
**zero** changes to the engine fork.

| What | Mechanism | Notes |
| --- | --- | --- |
| GameLauncher exe name | `${project_name}.GameLauncher` — driven by project name | `Code/LauncherUnified/launcher_generator.cmake:170` |
| Game window/app product name | `project.json` `display_name` + `LY_PROJECT_NAME` define | `launcher_generator.cmake:179` |
| **Windows game icon** | `<project>/Gem/Resources/GameSDK.ico` (fallback `<project>/Resources/GameSDK.ico`) | `Code/LauncherUnified/Platform/Windows/launcher_project_windows.cmake:9` — **project-side override, no core edit** |
| Windows launcher `.rc` | generated from `Launcher.rc.in` using the project icon | `Code/LauncherUnified/Platform/Windows/Launcher.rc.in:10` |
| macOS / iOS app icon | `${project_name}AppIcon` asset catalog in the project | `launcher_project_mac.cmake:38`, `launcher_project_ios.cmake:39` |
| Editor title bar **suffix** | project name shows as the title's pre/post segment automatically | see Bucket B title format |

> Place GAIMER's runtime brand assets under `branding/launcher/` in this repo and have the
> project reference/copy them. The default O3DE launcher icon being replaced is
> `Code/LauncherUnified/Resources/GameSDK.ico` (engine default) — overridden per-project as above.

---

## Bucket B — Editor shell (thin engine-fork patches on `gaimer/rebrand`)

Minimal, isolated changes. Split into **code edits** (3 strings) and **asset swaps**
(replace image/icon files in place — no code change).

### B1. Code edits (string changes — keep tiny and well-commented)

| # | What | File : line | Current value | Patch type |
| --- | --- | --- | --- | --- |
| 1 | Qt application name | `Code/Editor/Core/QtEditorApplication.cpp:237` | `setApplicationName("O3DE Editor")` | 1-line string |
| 2 | Editor window title | `Code/Editor/CryEdit.cpp:3107` | `tr("O3DE Editor [%1]")` | 1-line string |
| 3 | Splash / About copyright line | `Code/Editor/CryEdit.cpp:762` (`FormatRichTextCopyrightNotice()`) | `"Copyright %1 Contributors to the Open 3D Engine Project"` | **append** GAIMER line, **do not remove** O3DE line (see [LICENSING.md §6](../LICENSING.md)) |

The window title is assembled in `CCryEditApp::SetEditorWindowTitle(...)`
(`CryEdit.cpp:3100`): `"O3DE Editor [version]"` + ` - <pre>` + ` - <post>`, where the
project/level names are the pre/post segments. Patching #2 gives `"GAIMER Editor [version] - <Project> - <Level>"`.

> Each edited file **must** get the "modified from O3DE" header notice — see
> [LICENSING.md §3](../LICENSING.md). These three edits are the entire editor *code* rebrand.

### B2. Asset swaps (replace files in place — no code edit)

The code references these by fixed resource path, so swapping the **file contents** rebrands
them without touching code. Keep GAIMER-authored replacements in `branding/editor/` in this
repo and copy them over the engine paths as a build/setup step (documented in MAINTENANCE.md).

| What | Engine path | Wired via |
| --- | --- | --- |
| Splash background | `Code/Editor/splashscreen_background.png` | `Code/Editor/StartupLogoDialog.qrc` → `StartupLogoDialog.cpp:36` (`:/StartupLogoDialog/splashscreen_background.png`) |
| Splash gradient | `Code/Editor/splashscreen_background_gradient.jpg` | same `.qrc` |
| Editor app icon | `Code/Editor/res/o3de_editor.ico` | editor resources / `.rc` |
| Legacy editor icon | `Code/Editor/res/CryEdit.ico` | `Code/Editor/res/CryEdit.rc2` |
| Editor version strings | `Code/Editor/EditorVersion.rc` | Windows VERSIONINFO (product/company name) |

> Replacing a `.qrc`-referenced PNG/JPG or an `.ico` of the same name and dimensions is the
> lowest-risk change — the build picks it up with no code change. Match original dimensions
> to avoid layout surprises.

### B3. Optional / later

- `EditorVersion.rc` VERSIONINFO fields (CompanyName, ProductName) → "GAIMER".
- Any remaining hardcoded `"O3DE Editor"` strings surfaced by:
  `grep -rIn "O3DE Editor" Code` (also appears in `AzToolsFramework` action-context labels —
  cosmetic, lower priority).

---

## How to keep Bucket B patches separable

1. Author replacement assets in **this repo** under `branding/editor/`.
2. Keep the **3 code edits** as the *only* commits on the engine fork's `gaimer/rebrand`
   branch (one commit, easy to rebase per O3DE release).
3. Export those commits as patch files into `engine-patches/` here (`git format-patch`) so the
   rebrand is reproducible and reviewable even outside the engine repo.
4. Re-verify the 3 line numbers after each upstream sync — they drift between releases. Use the
   string, not the line number, as the source of truth.

## Re-locate after an upstream bump (copy-paste)

```bash
# from the engine fork root:
grep -rIn 'setApplicationName("O3DE Editor")' Code/Editor/Core/QtEditorApplication.cpp
grep -rIn 'O3DE Editor \[%1\]'                 Code/Editor/CryEdit.cpp
grep -rIn 'Contributors to the Open 3D Engine Project' Code/Editor/CryEdit.cpp
ls Code/Editor/splashscreen_background*.* Code/Editor/res/o3de_editor.ico Code/Editor/res/CryEdit.ico
```
