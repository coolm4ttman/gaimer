# GAIMER — Licensing & Attribution Obligations

GAIMER is a derivative of **Open 3D Engine (O3DE)**. This file records the license
terms we inherit and the **concrete obligations we must preserve** in source and in
any distributed binaries. Read this before changing any engine-side file, touching a
copyright header, or shipping a build.

> This is engineering guidance, not legal advice. Before any public distribution,
> have these obligations reviewed by counsel.

---

## 1. What license O3DE is under

O3DE is **dual-licensed**, at your option:

- **Apache License, Version 2.0** — `LICENSE_APACHE2.TXT` (the default)
- **MIT License** — `LICENSE_MIT.TXT` (your option)

(Confirmed from the cloned repo: `LICENSE.txt`, `LICENSE_APACHE2.TXT`, `LICENSE_MIT.TXT`
at the engine root. Engine version cloned: **2.7.0**, per `engine.json`.)

All upstream contributions are made under **both** licenses. GAIMER will operate under
**Apache-2.0** (the stricter of the two on attribution), which automatically satisfies MIT.

There is **no `NOTICE` file** at the O3DE root, so the Apache-2.0 §4(d) "NOTICE file"
propagation rule does not currently apply — **but** per-file copyright headers still must
be preserved (see §3). If upstream adds a `NOTICE` file in a future release, we must start
carrying it.

---

## 2. Apache-2.0 obligations (the ones that bind us)

When we **redistribute** O3DE-derived code or binaries (source *or* compiled), Apache-2.0 §4 requires:

1. **Include the license.** Ship a copy of the Apache-2.0 license with any distribution
   (source or binary). Keep `LICENSE_APACHE2.TXT` (and `LICENSE_MIT.TXT`, `LICENSE.txt`)
   in the engine fork; include them in installer/zip artifacts.
2. **Mark modified files.** Any O3DE source file we change must carry a **prominent notice
   stating that we changed it** (see the header template in §3). This is non-negotiable and
   is the single rule most likely to be violated during rebranding.
3. **Preserve existing notices.** Retain **all** copyright, patent, trademark, and
   attribution notices in the source we received — i.e. do **not** delete the
   `Copyright (c) Contributors to the Open 3D Engine Project` headers. You may *add* your own;
   you may not *remove* theirs.
4. **Propagate NOTICE contents** if/when a `NOTICE` file exists upstream (see §1).

Apache-2.0 also **does not grant trademark rights** (§6) — see §4.

---

## 3. Source-file rules (engine fork)

**Never strip the upstream header.** Every O3DE source file begins with:

```
/*
 * Copyright (c) Contributors to the Open 3D Engine Project.
 * For complete copyright and license terms please see the LICENSE at the root of this distribution.
 *
 * SPDX-License-Identifier: Apache-2.0 OR MIT
 *
 */
```

When **we modify** an upstream file (e.g. a rebrand patch), keep that header and add a
change notice beneath it, e.g.:

```
/*
 * Copyright (c) Contributors to the Open 3D Engine Project.
 * SPDX-License-Identifier: Apache-2.0 OR MIT
 *
 * Modifications (c) 2026 GAIMER / <your legal entity>.
 * This file was modified from its original O3DE form: <one-line what/why>.
 */
```

For **brand-new** files we author (Gems, project code), use a clean GAIMER header — these
are our own work and need no O3DE notice, but should still declare a license
(Apache-2.0 recommended for compatibility, or your chosen proprietary terms for Gems that
do not derive from O3DE source).

---

## 4. Trademark — directly affects rebranding

Apache-2.0 grants **no trademark license**. "Open 3D Engine", "O3DE", and the O3DE logo are
marks of the O3DE Foundation / Linux Foundation, governed by the O3DE trademark policy.

Practical rules for the rebrand:

- ✅ **Rebrand the product UI to GAIMER.** Changing the editor title, splash, icons, and app
  name to GAIMER is fine and is exactly what the rebrand patch set does.
- ✅ **Nominative use is allowed.** You may factually state "GAIMER is built on Open 3D Engine"
  / "Powered by O3DE", following the O3DE trademark guidelines.
- ❌ **Do not imply endorsement** by the O3DE Foundation, and do not present GAIMER as an
  official O3DE product.
- ⚠️ **Do not remove O3DE marks from *source* notices.** Removing the brand from the *UI* is
  fine; removing copyright/attribution notices from *source headers* is a §4 violation
  (these are separate things — see §3).

---

## 5. Copyleft / third-party components (watch list)

O3DE pulls in third-party software under their own terms. `LICENSE.txt` explicitly flags
**copyleft** dependencies, most importantly:

- **Qt Toolkit — LGPL v3** (with O3DE's patched fork at `github.com/o3de/qt5`). LGPL means:
  if we distribute binaries that link Qt, we must allow the user to **relink against a
  modified Qt** (typically satisfied by dynamic linking + offering the Qt source / our build
  scripts), and we must provide the corresponding Qt source or a written offer for it.
- **Other 3P components** are SPDX-tagged and tracked at
  `github.com/o3de/3p-package-source`. Each carries its own license; compliance is our
  responsibility per the third-party clause in `LICENSE.txt`.

Action item for a real release: generate a third-party license manifest from the 3P
packages actually linked into the GAIMER build and ship it in the installer.

---

## 6. On-screen attribution we inherit

The editor splash and About dialog render a copyright string built in code
(`Code/Editor/CryEdit.cpp` → `FormatRichTextCopyrightNotice()`):
`"Copyright %1 Contributors to the Open 3D Engine Project"`.

When rebranding the splash/About (see [docs/REBRAND.md](docs/REBRAND.md)), you may add a
GAIMER copyright line, but **retain an O3DE attribution line** (consistent with §3/§4). The
cleanest approach: show *both* — "GAIMER © 2026 …" and "Built on Open 3D Engine — © Contributors
to the Open 3D Engine Project".

---

## 7. Checklist before any GAIMER distribution

- [ ] `LICENSE_APACHE2.TXT`, `LICENSE_MIT.TXT`, `LICENSE.txt` present in the engine fork and in artifacts.
- [ ] Every modified upstream file carries the "modified from O3DE" notice (§3).
- [ ] No upstream copyright/attribution header has been deleted.
- [ ] `NOTICE` file (if upstream has added one) is carried and propagated.
- [ ] Third-party / Qt LGPL obligations satisfied (source offer + relink path for Qt).
- [ ] On-screen O3DE attribution retained alongside GAIMER branding (§6).
- [ ] No implied O3DE Foundation endorsement; trademark guidelines followed (§4).
