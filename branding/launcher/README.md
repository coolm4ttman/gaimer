# GAIMER launcher (game) brand assets (Bucket A — no engine edit)

The shipped game brands entirely from the **project** — no engine fork changes. Author the
game icon here and have the GAIMER project reference it.

| File to author here | Used as |
| --- | --- |
| `GameSDK.ico` | Windows game icon — placed at `<project>/Gem/Resources/GameSDK.ico` (or `<project>/Resources/GameSDK.ico`); picked up by `launcher_project_windows.cmake`. |
| macOS/iOS `AppIcon` set | `${project_name}AppIcon` asset catalog in the project. |

The game's **product/exe name** comes from the project name + `project.json` `display_name`
— set those when the Project is created in a later phase. See
[docs/REBRAND.md](../../docs/REBRAND.md) Bucket A.
