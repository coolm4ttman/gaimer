# GAIMER — Build Spec for Claude Code

> **Provenance:** written by Matt, received 2026-09-14. Body text is verbatim; only the numbered section titles were promoted to markdown headings and the short sub-headings bolded, for navigation. **This is the document to build from.** Layer 1 is the build target; Layers 2 and 3 are context. Companion handoff: `../README.md`.

How to read the tags:

* `[DECIDED]` = Matt has already decided this. Do not relitigate.
* `[PROPOSED]` = my suggestion, open to change.
* `[VERIFY]` = must be checked against live docs/APIs before building on it.

## 0. The big picture (read this first)

GAIMER is not a mod tool. It is a bet on owning the next gaming platform end to end: the creation software, the engine underneath it, and the hardware it runs on. The mod platform is the wedge, not the company.

**The thesis**

`[DECIDED]` The next evolution of gaming is fully immersive. Previous VR products (PSVR2, Oculus) failed because they were bad products, not because demand is absent. The opportunity is open because nobody has shipped a good one, and Matt intends to be the one who does.

**The three layers**

Layer 1 — AI mod-authoring platform (build now). `[DECIDED]` AI modding for big existing games, starting with GTA/FiveM, later Fortnite and others. Entry wedge. Target is non-developers who cannot mod at all today, not existing modders. Positioned as "Lovable for game modding". This layer exists to (a) generate revenue immediately, (b) build the code-generation and validation machinery that Layer 2 is made of, and (c) accumulate a corpus of real user intent-to-working-game-code pairs that nobody else has.

Layer 2 — The AI-native game engine. `[DECIDED]` Use what Layer 1 proves to build a full AI-native engine on O3DE, so developers build games dramatically faster. Stack already scoped: O3DE, TRELLIS, Hunyuan3D, NuiScene, SAGE method. Origin point: the NVIDIA Flux hackathon win, an AI game engine using world models built in under 48 hours. `[DECIDED]` Positioning throughout: GAIMER is the code engine that makes creation fast. We do not sell mods and we do not sell games.

Layer 3 — The hardware / console. `[DECIDED]` A console: a headset in the class of Bigscreen Beyond 2, plus a body-tracking suit and trackpad, sold as one product. `[DECIDED]` Built in-house, not licensed out and not left to someone else. This is firm. The end state is a new gaming platform plus the developer ecosystem that builds for it.

**Business model**

* `[DECIDED]` Token usage cost plus a SaaS fee from everyone making mods.
* `[DECIDED]` We care about creation, not distribution. Users export their mod and upload it to the game's own marketplace, where they can get paid. We stay out of that entirely and take no cut.
* `[DECIDED]` Paid like Lovable. No free tier for hobbyists.

**Why this sequencing matters to the code you write**

Layer 1 is not throwaway. The pieces that carry forward into Layer 2 are the plan representation (§3 step 1), the validation harness pattern (§4), and the failure-memory flywheel (§5). Build those as reusable, game-agnostic services with FiveM as one adapter behind an interface. Do NOT hard-wire FiveM assumptions through the orchestrator. Everything else in Layer 1 is allowed to be disposable.

**Status**

`[DECIDED]` Venture priority is P3, alongside BrickGen. Scope accordingly: this needs to reach a provable milestone on limited time, not become a platform rewrite.

**Scope of the rest of this document**

Layer 1 only. Layers 2 and 3 are context, not build targets. Do not write engine or hardware code.

## 1. What we are building

A web app where a non-developer describes a game mod in plain English and gets back a working, installable mod file.

* `[DECIDED]` Target user is people who cannot mod today ("normies"), NOT existing modders. This drives everything: no Lua exposed by default, no config files to hand-edit, no Discord-tutorial energy.
* `[DECIDED]` Positioning: "Lovable for game modding". We are the code engine that makes mod creation fast. We are not a mod marketplace and we never touch distribution.
* `[DECIDED]` First target platform: FiveM (GTA V multiplayer framework). It is the most moddable large-game surface with a scriptable, headless-runnable server.
* `[DECIDED]` Output flow: user generates in GAIMER, exports the file, uploads it to the game's own marketplace/server themselves. We stop at "here is a working artifact".
* `[DECIDED]` Pricing: paid like Lovable. No free tier for hobbyists. Token cost passthrough + SaaS subscription.
* `[DECIDED]` The moat is the headless FXServer validation harness, not the prompt.

**Non-goals for v0**

* No mod hosting, no marketplace, no revenue share.
* No multiplayer/collab editing.
* No asset generation (3D models, textures). Layer 2 problem. v0 composes behaviour from existing game assets only.
* No Fortnite/UEFN. That comes after FiveM works.

## 2. What a "mod" actually is here

On FiveM a mod is a resource: a folder containing

```
my_resource/
  fxmanifest.lua      # metadata, script list, fx_version, game target
  client/*.lua        # runs on each player's client
  server/*.lua        # runs on the server
  stream/*.ydr|ytd    # optional streamed assets (out of scope for v0)
  config.lua          # optional tunables
```

Scripts call natives (the ~7,000 exposed GTA V/CFX functions, e.g. `SetEntityCoords`, `RegisterCommand`, `TriggerServerEvent`). `[VERIFY]` Pull the canonical native list from the Cfx.re natives JSON feed at build time rather than relying on model knowledge; native names, arg counts and client/server availability all matter and the model WILL hallucinate them.

The single biggest correctness risk in this product is hallucinated or wrong-context natives. Design the validator around that first.

## 3. The generate → validate → fix loop

`[DECIDED]` This loop is the product. Spec:

```
user prompt
   │
   ▼
[1] PLAN       LLM produces a structured mod plan (JSON), not code:
               { name, description, triggers[], entities[], commands[],
                 events[], client_behaviour[], server_behaviour[], config[] }
   │
   ▼
[2] RETRIEVE   For every native/API the plan implies, fetch the real
               signature + side from the natives index. Fetch 2-4 nearest
               known-good example resources from the corpus (§5).
   │
   ▼
[3] GENERATE   LLM writes fxmanifest.lua + client/server Lua, with the
               retrieved signatures and examples in context.
   │
   ▼
[4] VALIDATE   Four gates, cheap to expensive, fail fast (§4).
   │
   ▼
[5] FIX        On failure: feed back ONLY the failing gate's structured
               error + the offending lines. Max 3 fix attempts per gate,
               max 8 total. Escalate model tier on attempt 3.
   │
   ▼
[6] PACKAGE    Zip the resource, generate a plain-English install guide
               (where to drop it, what line to add to server.cfg).
```

Rules:

* `[PROPOSED]` Every stage is a separate, logged, replayable step. Persist plan, generated files, each gate's output, each fix diff. This log IS the training data for later fine-tuning. Do not treat it as ephemeral.
* `[PROPOSED]` Never show the user a raw Lua error. Map every validator failure class to a human sentence, or hide it entirely if we self-heal.
* `[PROPOSED]` If we blow the fix budget, fail loudly to the user with a partial artifact and a "what went wrong" in plain words. Do not ship a mod we could not boot.

## 4. The validation harness (build this first)

`[DECIDED]` Headless FXServer is the moat. Four gates:

Gate 1 — Static syntax. `luac -p` (or full `luacheck`) on every `.lua`. Milliseconds. Catches most generation slop.

Gate 2 — Manifest schema. Parse `fxmanifest.lua`. Assert `fx_version`, `game`, every listed script file exists, no file on disk is unlisted. `[VERIFY]` current required manifest keys.

Gate 3 — Native linting. AST-walk the Lua, extract every native call, check against the natives index: does it exist, is the arg count right, is it being called on the correct side (client native called in a server script is the classic failure). This gate is custom and is where most of the engineering value sits.

Gate 4 — Live boot. Spin a containerised FXServer, mount the generated resource, `ensure` it, capture console output for a fixed window (`[PROPOSED]` 30s), assert: resource reaches `started`, no Lua runtime errors, no `SCRIPT ERROR`, no unhandled event warnings. Then run a scripted smoke test if the plan declared commands/events (fire them via an RCON/console harness resource and assert expected output).

Implementation notes:

* `[PROPOSED]` One warm pool of FXServer containers, snapshot-restored between runs, so gate 4 is seconds not minutes. Cold-booting a server per generation will kill both margin and UX.
* `[PROPOSED]` FXServer is Linux-native, so a plain Docker image works. Artifacts come from the Cfx.re build server. `[VERIFY]` licensing/redistribution terms for running FXServer at scale as a service, and whether a server key is required per instance.
* Client-side scripts cannot be truly executed headlessly (that needs a real GTA V client). Cover them with gates 1-3 plus a Lua sandbox that stubs client natives and asserts the script loads and its event handlers register without error. `[PROPOSED]` Be honest in the product about the client-side confidence gap rather than pretending gate 4 covers it.

## 5. Knowledge layer

* Natives index. Scraped/ingested from the Cfx.re natives data, normalised into `{ name, hash, params[], return, side, game, docs_url }`. Refreshed on a schedule. Drives both retrieval and gate 3.
* Example corpus. `[PROPOSED]` A curated set of small, known-good open-source resources, each labelled with what it demonstrates (command registration, blips, vehicle spawning, persistence, UI/NUI). Retrieval is by capability, not text similarity. `[VERIFY]` licence of anything ingested; only use permissively licensed resources.
* Failure memory. `[PROPOSED]` Every validator failure and its successful fix is stored as a pair. Retrieve these into the generate step. This is the flywheel: the platform gets measurably better per generation and a competitor starting fresh has none of it.

## 6. Proposed stack

All `[PROPOSED]` unless noted:

* Frontend: Next.js + TypeScript, streaming UI showing the loop stages live (users tolerate 60-90s if they can see it working).
* Orchestrator: Python or TS service running the loop as a durable state machine (Temporal or a simple Postgres-backed job runner). Must survive restarts mid-generation.
* Validator service: Go or Python, owns the container pool.
* Sandbox: Firecracker or gVisor-isolated containers. Generated code is untrusted; assume it will eventually be adversarial.
* Storage: Postgres for runs/plans/artifacts metadata, S3-compatible for the zips, pgvector for the corpus.
* Models: big model for PLAN, cheaper fast model for GENERATE, escalate on repeat failure. Meter tokens per run from day one, because pricing depends on it.

## 7. Build order

* M0 — Harness. Docker FXServer boots, loads a hand-written resource, console captured and parsed. No AI. Nothing else matters until this works.
* M1 — Natives index + gate 3. Lint a deliberately broken hand-written resource and catch every planted error.
* M2 — Loop, CLI only. Prompt in, validated zip out, full run log. No UI.
* M3 — Eval set. `[PROPOSED]` 50 real user-style prompts, scored on first-pass and post-fix success. This is the number that decides whether the product is real. Track it weekly.
* M4 — Web app + auth + billing.

## 8. Open questions / needs a decision

1. Platform terms. `[VERIFY]` Cfx.re is Rockstar-owned. Check current terms on commercial tooling built on FiveM, on automated server instances, and on paid resources (Tebex is the sanctioned monetisation route `[VERIFY]`). Get this answered before M4, not after.
2. Client-side confidence. Do we ship mods whose client code was never truly executed? What do we tell the user?
3. Asset scope. v0 says behaviour-only. A lot of what normies want ("a custom car") is assets. Where is the line, and does it undercut the wedge?
4. Distribution promise. We stay out of distribution, but if the user cannot get their mod onto a server, the value is unrealised. Minimum we owe them: a plain-English install guide, `[PROPOSED]` maybe a one-click test server.
5. Priority. GAIMER is currently P3. Confirm whether M0-M2 are getting real time before scoping M4.
