# GAIMER — Maintenance, Fork & Upstream-Sync Strategy

How GAIMER tracks Open 3D Engine (O3DE) while keeping our changes separable and our merge
pain low. Read this before adding remotes, syncing a new O3DE release, or deciding where a
change should live.

---

## 1. Repo topology

GAIMER uses a **thin engine fork + separate product repo** model. Two repositories:

```
┌─────────────────────────────┐      references / builds against      ┌──────────────────────────┐
│  gaimer-engine (fork)       │  <----------------------------------  │  gaimer (this repo)      │
│  fork of o3de/o3de          │                                       │  Project + Gems +        │
│  - vanilla mirror on `main` │                                       │  branding + docs         │
│  - ONLY rebrand patches     │                                       │  THE REAL VALUE          │
│    on `gaimer/rebrand`      │                                       │  zero engine code here   │
└─────────────────────────────┘                                       └──────────────────────────┘
            │  upstream
            ▼
   o3de/o3de (read-only upstream)
```

**Why this split (vs. a full hard fork):**

- 95%+ of GAIMER's value lives in **Gems and a Project** that O3DE is explicitly designed to
  host *outside* the engine tree. Keeping them in their own repo means they are **not entangled
  with engine history** and survive engine version bumps untouched.
- The engine fork carries the **smallest possible diff** (a handful of editor-rebrand lines +
  asset swaps — see [docs/REBRAND.md](docs/REBRAND.md)), so pulling a new O3DE release is a
  **rebase of one topic branch**, not a merge of thousands of conflicting files.
- If we ever need *zero* engine fork, the rebrand bucket is the only thing blocking it — and it
  is documented and isolated.

> **Alternative models considered** (recorded so we can revisit):
> - *Vanilla engine, zero fork* — cleanest sync, but cannot rebrand the editor shell (those
>   strings/resources are compiled in). Viable only if you accept the stock O3DE editor chrome.
> - *Full hard fork* — maximum control, but every O3DE release becomes a large merge with high
>   conflict surface. Rejected for our "value in Gems, minimize core edits" constraint.

---

## 2. Remotes

### `gaimer` (this repo)

```bash
# origin = the GAIMER product repo (created Phase 1a)
git remote add origin https://github.com/coolm4ttman/gaimer.git
```

This repo has **no `upstream`** — it does not track O3DE. It depends on a *built/registered*
engine, not on engine source.

### `gaimer-engine` (the fork)

The repo `https://github.com/coolm4ttman/gaimer-engine` exists but is **empty** — it is a
*fresh* repo (not a GitHub fork), seeded from a full O3DE clone the first time (see §2b). Day-to-day:

```bash
git clone https://github.com/coolm4ttman/gaimer-engine.git
cd gaimer-engine
git remote add upstream https://github.com/o3de/o3de.git
git remote set-url --push upstream DISABLED   # never push to upstream by accident
git fetch upstream --tags
```

- **`origin`** → `coolm4ttman/gaimer-engine` (our fork; we push here).
- **`upstream`** → `o3de/o3de` (read-only; we only fetch).

### 2b. First-time seeding of `gaimer-engine` (run ONCE, on a machine with disk + bandwidth)

The Mac was deliberately not used for this (shallow inspection clone only). Do it on the
Windows build box or any machine with ~20 GB free:

```bash
# 1. Full clone of the pinned O3DE release (NOT development — see §3 pinning policy)
git clone https://github.com/o3de/o3de.git gaimer-engine
cd gaimer-engine
git lfs install && git lfs pull
git checkout <pinned-o3de-release-tag-or-branch>   # detach/branch from the chosen release

# 2. Repoint origin to OUR empty repo; keep o3de as upstream
git remote rename origin upstream
git remote set-url --push upstream DISABLED
git remote add origin https://github.com/coolm4ttman/gaimer-engine.git

# 3. Create the branch structure (§3): pristine mirror, rebrand topic, integration
git branch -f main HEAD                # pristine mirror @ the pinned release
git checkout -b gaimer/rebrand main    # apply the 3 editor-string edits here (see docs/REBRAND.md)
#   ... make the rebrand commit(s) ...
git checkout -b gaimer/integration main
git merge --ff-only gaimer/rebrand

# 4. Push all three branches to our fork
git push -u origin main gaimer/rebrand gaimer/integration

# 5. Record the pin back in the gaimer repo
#    -> engine-patches/PINNED_O3DE.txt  (ref + sha + toolchain)
#    -> git format-patch main..gaimer/rebrand -o <gaimer>/engine-patches/
```

---

## 3. Branch structure (engine fork)

| Branch | Purpose | Update rule |
| --- | --- | --- |
| `main` | **Pristine mirror** of a pinned O3DE release. No GAIMER changes ever. | Fast-forward only, from `upstream`. |
| `gaimer/rebrand` | The **only** GAIMER engine changes: the 3 editor strings + asset swaps. | Rebased onto `main` after each sync. Keep to 1–2 commits. |
| `gaimer/integration` | What we actually build: `main` + `gaimer/rebrand`. | Rebuilt after each sync (reset to `main`, replay rebrand). |

Rule of thumb: **if a change can live in the `gaimer` repo (Project/Gem/branding asset), it
must not go in the engine fork.** The engine fork is for things that are physically impossible
to do otherwise (the compiled-in editor strings).

### Pinning policy

- Track O3DE **release / `stabilization/<YYMM>` branches or release tags**, **not**
  `development`. Development moves daily and will churn the rebrand patch constantly.
- Record the exact pinned ref in `engine-patches/PINNED_O3DE.txt` in this repo (e.g. the tag
  and commit SHA) so the Windows build box and the Mac agree on a version.
- Current inspected version: **O3DE 2.7.0** (`engine.json`). Confirm the latest stable release
  branch/tag before the first real build.

---

## 4. Upstream sync workflow (pulling a new O3DE release)

Run in the **`gaimer-engine`** repo. This is a **rebase**, not a merge — it keeps the rebrand
as a clean tip and makes conflicts (if any) obvious and tiny.

```bash
# 0. Make sure rebrand assets/patches in the `gaimer` repo are committed first.

# 1. Refresh upstream
git fetch upstream --tags

# 2. Update the pristine mirror to the new release (choose tag/branch deliberately)
git checkout main
git merge --ff-only <new-o3de-release-tag>     # e.g. a stabilization tag; FF-only = stays pristine

# 3. Rebase the rebrand patch onto the new mirror
git checkout gaimer/rebrand
git rebase main
#    -> if conflicts: they will ONLY be in the ~3 rebrand files. Resolve, keep BOTH the
#       O3DE copyright notice and the GAIMER modification (see LICENSING.md §3/§6), continue.

# 4. Re-verify the rebrand still lands where expected (line numbers drift):
grep -rIn 'setApplicationName("O3DE Editor")' Code/Editor/Core/QtEditorApplication.cpp || echo "string moved/changed -> update patch"
grep -rIn 'O3DE Editor \[%1\]'                 Code/Editor/CryEdit.cpp                  || echo "string moved/changed -> update patch"

# 5. Rebuild integration = main + rebrand
git checkout gaimer/integration
git reset --hard main
git merge --ff-only gaimer/rebrand    # or: git rebase, your call — keep it linear

# 6. Re-export patches into the gaimer repo for reproducibility
git format-patch main..gaimer/rebrand -o /path/to/gaimer/engine-patches/

# 7. Update the pin
echo "<new-tag>  <sha>" > /path/to/gaimer/engine-patches/PINNED_O3DE.txt

# 8. Push fork branches
git push origin main gaimer/rebrand gaimer/integration
```

Then, on the build box, re-run the engine build and a smoke test (editor launches, GAIMER
title/splash show, GAIMER project loads).

### Conflict-minimization principles

- **Keep the rebrand patch microscopic.** Every extra engine line = a future conflict.
- **Edit by string, locate by string.** Line numbers drift; the literal strings rarely do.
- **Never reformat surrounding code** in a rebrand commit — touch only the bytes you must.
- **Asset swaps over code edits** wherever possible (replacing a same-named `.png`/`.ico`
  produces *zero* source diff and never conflicts).
- **Prefer project-side branding** — anything in [Bucket A](docs/REBRAND.md) never enters the
  fork and so can never conflict.

---

## 5. This repo's branch structure (`gaimer`)

| Branch | Purpose |
| --- | --- |
| `main` | Stable; always builds against the pinned engine. |
| `feature/*` | Per-feature work (a new Gem, a project change), squash-merged to `main`. |

Tag releases here (`v0.1`, …) and record the engine pin used for each tag.

---

## 6. Where does a change go? (decision rule)

```
Is it the editor window title / app name / splash / editor icon?
   └─ YES → engine fork, gaimer/rebrand  (Bucket B — keep it to the 3 strings + asset files)
   └─ NO  → does it change engine C++/build logic in a way a Gem cannot?
               └─ YES → STOP. Reconsider. Almost nothing should. If truly unavoidable,
                        it goes on gaimer/rebrand with a written justification + LICENSING.md §3 header.
               └─ NO  → this repo (a Gem, the Project, or a branding asset). Default answer.
```

---

## 7. Attribution upkeep (tie-in)

Every sync touches engine files — re-confirm the [LICENSING.md](LICENSING.md) checklist each
time: O3DE copyright headers intact, modified-file notices present, license files shipped,
on-screen O3DE attribution retained alongside GAIMER branding.

---

## 8. Repo layout (this repo)

```
gaimer/
├── MAINTENANCE.md          # this file
├── BUILD_WINDOWS.md        # build the engine fork + project on the RTX 5080 box
├── LICENSING.md            # attribution / license obligations
├── docs/REBRAND.md         # located rebrand surface (Bucket A / Bucket B)
├── branding/
│   ├── editor/             # GAIMER editor splash + .ico (copied onto engine fork at setup)
│   └── launcher/           # GAIMER game icon (GameSDK.ico) — project-side, no engine edit
├── engine-patches/         # git format-patch output + PINNED_O3DE.txt (engine ref pin)
├── Project/                # the GAIMER O3DE project (added in a later phase)
└── Gems/                   # GAIMER Gems — the real value (added in later phases)
```
