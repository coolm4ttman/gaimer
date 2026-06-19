# GAIMER — Windows Build Checklist (RTX 5080 box)

The full engine-fork + project build that we deliberately do **not** do on the Mac. Run this
on the Windows / RTX 5080 machine. Work top-to-bottom; the **Troubleshooting** table at the
end maps the most likely failures to fixes.

> Engine reference: O3DE `2.7.0` (`engine.json`). Always confirm the **latest stable O3DE
> release branch/tag** and the supported toolchain versions in the official
> [O3DE System Requirements](https://o3de.org/docs/welcome-guide/requirements/) before
> starting — O3DE pins specific compiler/CMake versions and they change between releases.

---

## 0. Hardware / capacity reality check

| Resource | Minimum | Recommended for GAIMER | Why |
| --- | --- | --- | --- |
| **RAM** | 16 GB | **32–64 GB** | Linking the Editor + Atom is memory-hungry; parallel (`/m`) link steps OOM on 16 GB. |
| **Disk (free)** | 80 GB | **200–250 GB free, SSD/NVMe** | Source (~10–15 GB) + 3rd-party packages (tens of GB) + build output for `profile` **and** `debug` configs (each very large) + Asset Processor cache. |
| **Pagefile** | — | **system-managed, ≥ 32 GB allowed** | Backstop against link-time OOM. |
| **GPU** | DX12 / Vulkan capable | RTX 5080 (Blackwell) ✓ | Atom renderer needs DX12 feature level; RTX 5080 exceeds it. See §6 driver cautions. |
| **CPU** | 4 cores | 8+ cores | Build time scales with cores; first full build is long regardless. |

> Put the source tree, the build folder, and the 3rd-party package folder on a **fast NVMe**
> with short paths (e.g. `C:\o3de`, `C:\o3de-packages`). Avoid deep nested paths — see long-path
> note in §1.

---

## 1. Pre-flight (Windows config)

- [ ] **Windows 10 (recent) or Windows 11**, fully updated.
- [ ] **Enable long paths** (O3DE has deep paths; this prevents a class of build failures):
  - Group Policy / registry: `HKLM\SYSTEM\CurrentControlSet\Control\FileSystem\LongPathsEnabled = 1`
  - Git: `git config --system core.longpaths true`
- [ ] **Exclude build dirs from Microsoft Defender / AV** (real-time scanning of thousands of
  obj/pdb files destroys build speed and occasionally locks files mid-link). Exclude the source,
  build, and 3rd-party folders.
- [ ] **Disable OneDrive sync** on the source/build folders (file locks + path issues).

---

## 2. Install prerequisites

- [ ] **Visual Studio 2022** (Community is fine). Confirm the **specific 17.x version O3DE
  supports for your chosen release** — do not assume "latest VS works"; O3DE sometimes lags the
  newest VS toolset.
  - Workloads: **Desktop development with C++** and **Game development with C++**.
  - Components: **MSVC v143 build tools (x64/x86)**, **Windows 10/11 SDK** (a version O3DE
    supports), **C++ ATL**, **C++ profiling tools**.
  - If the newest VS toolset breaks the build, install the **known-good MSVC toolset version**
    via the VS Installer's *Individual components* and pin it (see Troubleshooting → toolset).
- [ ] **CMake ≥ 3.24** (use a recent 3.2x; **Release Candidate builds are not supported**).
  Ensure `cmake` is on `PATH`. Verify: `cmake --version`.
- [ ] **Git** (latest) and **Git LFS** — O3DE's repo uses LFS. After install:
  `git lfs install`.
- [ ] **Do NOT rely on system Python.** O3DE provisions its **own** Python via
  `python\get_python.bat`. (System Python only matters for unrelated tooling.)
- [ ] **(Optional) Wwise SDK** — only if you use the Wwise audio gem. Skip for first build.
- [ ] **Latest NVIDIA driver for RTX 5080** — see §6 before first editor launch.

---

## 3. Clone the engine fork + this project

```bat
:: 3rd-party package cache (writable, short path, NOT inside the source tree)
mkdir C:\o3de-packages

:: Engine FORK (not o3de/o3de directly) — build from gaimer/integration
:: NOTE: if gaimer-engine is still EMPTY, seed it first per MAINTENANCE.md §2b, then continue.
git clone https://github.com/coolm4ttman/gaimer-engine.git C:\gaimer-engine
cd C:\gaimer-engine
git remote add upstream https://github.com/o3de/o3de.git
git checkout gaimer/integration         :: = pinned O3DE release + rebrand patch
git lfs install & git lfs pull

:: The GAIMER product repo (project + gems + branding)
git clone https://github.com/coolm4ttman/gaimer.git C:\gaimer
```

- [ ] Confirm the engine pin matches `C:\gaimer\engine-patches\PINNED_O3DE.txt`.
- [ ] If `gaimer-engine` is empty, complete **MAINTENANCE.md §2b (first-time seeding)** before building.

### 3b. Apply branding asset swaps (Bucket B2)

Copy GAIMER editor brand assets from the product repo onto the engine fork **before**
building (these are file replacements, not code — see [docs/REBRAND.md](docs/REBRAND.md)):

```bat
copy /Y C:\gaimer\branding\editor\splashscreen_background.png          C:\gaimer-engine\Code\Editor\
copy /Y C:\gaimer\branding\editor\splashscreen_background_gradient.jpg C:\gaimer-engine\Code\Editor\
copy /Y C:\gaimer\branding\editor\o3de_editor.ico                      C:\gaimer-engine\Code\Editor\res\
```

> The 3 editor **code** edits are already baked into `gaimer/rebrand`/`gaimer/integration`.
> The asset swaps above are kept out of the fork on purpose so they live with the brand assets.
> (In a later phase, automate this copy as a CMake/pre-build step.)

---

## 4. Register the engine & configure

```bat
cd C:\gaimer-engine
:: provision O3DE's own python (first run downloads it)
python\get_python.bat

:: register this engine build
scripts\o3de.bat register --this-engine

:: register the GAIMER project (added in a later phase; skip if Project/ is still empty)
scripts\o3de.bat register --project-path C:\gaimer\Project
```

Configure the solution (engine + project), pointing at the 3rd-party cache:

```bat
cmake -B C:\gaimer-engine\build\windows -S C:\gaimer-engine ^
      -G "Visual Studio 17 2022" ^
      -DLY_3RDPARTY_PATH=C:\o3de-packages
```

- [ ] First configure **downloads tens of GB** of 3rd-party packages — expect a long wait and
  watch for network/AV interruptions (see Troubleshooting).
- [ ] No trailing slashes on `LY_3RDPARTY_PATH`.

---

## 5. Build

Build the Editor + the GAIMER GameLauncher in `profile` (use `profile` first; it's far faster
and smaller than `debug`):

```bat
:: Editor (engine tool)
cmake --build C:\gaimer-engine\build\windows --target Editor --config profile -- /m

:: GAIMER game launcher (once Project/ exists; target name = <ProjectName>.GameLauncher)
cmake --build C:\gaimer-engine\build\windows --target GAIMER.GameLauncher --config profile -- /m
```

- [ ] First full build is **long** (tens of minutes to hours depending on cores). This is normal.
- [ ] If linking OOMs, drop parallelism for the failing link (see Troubleshooting → OOM).
- Build configs: `profile` (dev default), `debug` (heavy, for debugging only), `release` (ship).

---

## 6. RTX 5080 (Blackwell) — driver & toolchain cautions

The 5080 is a **very new GPU**; treat driver/runtime as a first-class risk.

- [ ] **Install the latest NVIDIA driver** that explicitly supports RTX 50-series (Blackwell) —
  the launch-era driver branch or newer (R570+). An older driver may not enumerate the GPU
  correctly → Atom falls back to a software/null device or fails device creation.
- [ ] **Game Ready vs Studio driver:** either works; Studio tends to be more stable for tooling.
- [ ] **DX12 is the default RHI on Windows** and is the safest path on a brand-new GPU. If you
  hit Vulkan device-creation or validation crashes, **force DX12** rather than debugging Vulkan
  on day-one Blackwell support.
- [ ] **PhysX 5 GPU acceleration (CUDA):** GPU rigid-body/cloth uses CUDA kernels. The PhysX
  runtime bundled with the engine release may **predate Blackwell (sm_120)** and lack matching
  GPU binaries → GPU sim errors or silent CPU fallback. For first bring-up, **run PhysX on CPU**
  and treat GPU PhysX as a separate validation task once a Blackwell-aware PhysX runtime is in.
- [ ] **Ray-traced Atom features** (e.g. DiffuseProbeGrid, ray-traced reflections) need DXR; the
  5080 supports it, but confirm the driver exposes it and keep these features off during initial
  smoke testing to isolate variables.
- [ ] If the GPU is newer than the toolchain expects, **shader compilation (DXC) is CPU-side and
  unaffected** — rendering issues will be at device-creation/runtime, not build time.

---

## 7. Smoke test (verify rebrand + engine)

- [ ] Launch the Editor:
  `C:\gaimer-engine\build\windows\bin\profile\Editor.exe`
- [ ] **Window title** reads **"GAIMER Editor [version]"** (not "O3DE Editor"). ← rebrand B1 #2
- [ ] **Splash** shows the GAIMER artwork. ← rebrand B2
- [ ] **Taskbar / exe icon** is the GAIMER editor icon. ← rebrand B2
- [ ] **Help → About** shows GAIMER **and retains the O3DE attribution line**
  (see [LICENSING.md §6](LICENSING.md)). ← rebrand B1 #3
- [ ] GAIMER project loads; a level opens; viewport renders on the 5080 (DX12).
- [ ] GameLauncher exe is named `GAIMER.GameLauncher.exe` with the GAIMER game icon. ← Bucket A

---

## 8. Most likely failure points → fixes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| CMake configure fails immediately | CMake too old / RC version / not on PATH | Install supported CMake ≥ 3.24 (no RC); reopen shell. |
| Configure can't find compiler / wrong toolset | Unsupported VS 17.x or missing MSVC v143 | Install the **O3DE-supported** VS2022 version + MSVC v143; pin toolset with `-T v143,version=<known-good>` if newest breaks. |
| 3rd-party download stalls/fails during configure | Network, proxy, or AV blocking package fetch | Re-run configure (resumable); add AV exclusion; set a corporate proxy if needed; verify `C:\o3de-packages` is writable. |
| `get_python.bat` fails | AV/proxy blocking Python download | Add exclusion / configure proxy; re-run; check disk space. |
| Build fails with path-too-long / file-not-found deep in tree | Windows long paths disabled | Enable `LongPathsEnabled=1` + `git config --system core.longpaths true`; use a short source path. |
| Link step dies / `LNK1102 out of memory` / machine swaps to death | RAM exhausted by parallel links | Lower parallelism (`-- /m:2`), increase pagefile, close other apps, build fewer targets at once. |
| Builds are absurdly slow / random file-lock errors | Defender scanning build dir, or OneDrive sync | Exclude source/build/packages from Defender; disable OneDrive on those folders. |
| Git checkout missing binary assets / shows pointer files | Git LFS not installed/pulled | `git lfs install` then `git lfs pull`. |
| Editor launches but viewport is black / device creation fails | RTX 5080 driver too old, or Vulkan day-one issue | Update to latest Blackwell-capable NVIDIA driver; force **DX12** RHI. |
| PhysX GPU errors / instability | PhysX CUDA runtime predates Blackwell (sm_120) | Run PhysX on **CPU** for now; revisit GPU PhysX with a Blackwell-aware runtime. |
| Title still says "O3DE Editor" after build | Built `main`/upstream instead of `gaimer/integration`, or rebrand patch didn't apply | `git checkout gaimer/integration`; re-verify the 3 strings (REBRAND.md re-locate block); rebuild. |
| Splash/icon unchanged | Asset swap (§3b) not done before build | Copy `branding/editor/*` onto the engine fork and rebuild (resources are compiled in). |
| Out of disk mid-build | Underestimated footprint | Free space / move to a 200 GB+ NVMe; build only `profile` first, skip `debug`. |

---

## 9. After a successful build

- Record the working toolchain versions (VS, MSVC toolset, CMake, NVIDIA driver) in
  `engine-patches/PINNED_O3DE.txt` alongside the engine ref — so this box is reproducible.
- Re-run the [LICENSING.md](LICENSING.md) distribution checklist before sharing any binary.
