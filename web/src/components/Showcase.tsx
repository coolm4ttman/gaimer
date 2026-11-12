import { ArrowUp, Check, Code2, Copy, Download, Eye, FileArchive, FileCode2, Lightbulb, MessageCircleQuestion, Play, Plus, RotateCcw, ShieldCheck, Trash2 } from 'lucide-react'
import { useState, type ReactNode } from 'react'

// Cursor-style feature boxes under the hero (same dark gradient runs behind both). Each box pairs copy with a square
// panel of game art holding a working slice of GAIMER Desktop. Sides alternate. The UI reuses the real app's chrome
// and wording (gaimer-platform AgentChat, the FiveM verifier and builder ready card, FxDK transform tools and
// Inspector, saved versions and Export mod). Viewports are real captures from gaimer-platform's evidence; results in
// the verifier log come from its acceptance report, with an illustrative log format.

export const panel = 'rounded-xl bg-[#0f0f13] text-[#ecebe8] shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_30px_60px_-20px_rgb(0_0_0/0.65)]'
export const card = 'rounded-lg border border-white/[0.07] bg-[#16161c]'

export function Bar({ title, tab }: { title: string; tab?: 'visual' | 'code' }) {
  return (
    <div className="flex h-8 items-center gap-2 border-b border-white/[0.07] bg-[#111113] px-3 text-[10px]">
      <img src="/brand/icon.svg" alt="" className="size-3.5" />
      <span className="font-semibold tracking-wide">GAIMER</span>
      <span className="truncate text-white/45">/ {title}</span>
      {tab && (
        <span className="ml-auto flex shrink-0 rounded-md bg-white/[0.06] p-0.5">
          <span className={`flex items-center gap-1 rounded px-1.5 py-0.5 ${tab === 'visual' ? 'bg-white/15' : 'text-white/45'}`}>
            <Eye className="size-2.5" /> Visual
          </span>
          <span className={`flex items-center gap-1 rounded px-1.5 py-0.5 ${tab === 'code' ? 'bg-white/15' : 'text-white/45'}`}>
            <Code2 className="size-2.5" /> Code
          </span>
        </span>
      )}
    </div>
  )
}

function Composer() {
  return (
    <div className="m-3 rounded-xl border border-[#8b5cf6]/55 bg-[#16161c] shadow-[0_0_0_3px_rgb(139_92_246/0.14)]">
      <div className="px-3 pt-2 text-[11px] text-[#5c5c66]">Describe a change, or ask a question</div>
      <div className="flex items-center gap-2 px-3 pt-2 pb-2 whitespace-nowrap">
        <span className="flex items-center gap-1.5 text-[9.5px] text-[#5c5c66]">
          <span className="size-1.5 rounded-full bg-[#4ccf8b]" /> GAIMER · High reasoning
        </span>
        <span className="ml-auto flex items-center gap-1 rounded-md border border-white/[0.18] px-1.5 py-0.5 text-[9.5px]">
          <Play className="size-2" /> Test in GTA
        </span>
        <span className="flex size-5 items-center justify-center rounded-md bg-gradient-to-br from-[#8b5cf6] to-[#ff3c70]">
          <ArrowUp className="size-3 text-white" />
        </span>
      </div>
    </div>
  )
}

// 1. A full Agent thread: earlier turn, then GAIMER asking before it builds.
function AskVisual() {
  const options = ['18:00 to 21:00', 'Lunch, 12:00 to 14:00', 'Both']
  const [pick, setPick] = useState<number | null>(null)
  return (
    <div className={`${panel} flex h-full flex-col overflow-hidden text-[11px]/[1.55]`}>
      <Bar title="Food Truck Business" />
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-3 py-1.5 text-[10px]">
        <span className="font-medium">Agent</span>
        <span className="text-[#5c5c66]">Components</span>
        <Plus className="ml-auto size-3 text-[#5c5c66]" />
      </div>
      <div className="flex-1 space-y-2.5 overflow-hidden p-3">
        <div className={`${card} px-2.5 py-2`}>Create a food-truck business with a supplier, a selling spot and cooking.</div>
        <div className="flex items-center gap-2 text-[10px] text-[#80808c]">
          <Check className="size-3 text-[#4ccf8b]" /> Built and tested · Saved v1
        </div>
        <p className="text-[#d3d2d8]">The truck is stocked at the supplier, cooks burgers on G and sells at the marked spot.</p>
        <div className={`${card} px-2.5 py-2`}>Add a rush-hour bonus to the food truck.</div>
        <div className="flex items-center gap-2 text-[10px] text-[#80808c]">
          <Lightbulb className="size-3 text-[#5c5c66]" /> Thought for 6s
        </div>
        <div className="rounded-lg border border-[#8b5cf6]/40 bg-[#8b5cf6]/[0.08] p-2.5">
          <div className="flex items-center gap-1.5 font-medium">
            <MessageCircleQuestion className="size-3.5 text-[#c4b0ff]" /> When should rush hour run?
          </div>
          <p className="mt-1 text-[10px] text-[#80808c]">I can raise every sale by 1.5× during a time window.</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {options.map((o, i) => (
              <button
                key={o}
                onClick={() => setPick(i)}
                className={`rounded-md px-2 py-1 text-[10.5px] transition-colors ${pick === i ? 'bg-[#8b5cf6] text-white' : 'bg-white/[0.07] text-[#b9b8c0] hover:bg-white/[0.12]'}`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
        <div className="text-[10px] text-[#80808c]">
          {pick === null ? 'Reply below and GAIMER will continue.' : `Got it: ${options[pick]}. Building the change…`}
        </div>
      </div>
      <Composer />
    </div>
  )
}

// 2. The verifier run: phases with timings, the server log, what passed, then the builder's ready card.
function VerifyVisual() {
  const phases: [string, string][] = [
    ['Designing your mod', '0:04'],
    ['Writing the code', '0:31'],
    ['Starting a test server…', '0:12'],
    ['Running your mod on FiveM', '0:38'],
  ]
  const log = [
    ['12:04:51', '[HARNESS]', 'food_truck_business loaded'],
    ['12:04:53', '[GAIMER]', 'scene ready · 9 objects'],
    ['12:05:02', '[GAIMER]', 'cook blocked · no ingredients'],
    ['12:05:09', '[GAIMER]', 'supplier stocked · ingredients=5 drinks=5'],
    ['12:05:21', '[GAIMER]', 'city sale · burger paid $15'],
    ['12:05:33', '[GAIMER]', 'combo served · paid $42 (rush hour 1.5×)'],
  ]
  const passed = ['Compile + verify', 'Native FxDK scene', 'Supplier + city', 'Combo + rush hour']
  return (
    <div className={`${panel} flex h-full flex-col overflow-hidden text-[11px]/[1.55]`}>
      <Bar title="Food Truck Business" />
      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden p-3">
        <ul>
          {phases.map(([p, t]) => (
            <li key={p} className="flex min-h-[20px] items-center gap-2 text-[#b9b8c0]">
              <Check className="size-3 text-[#4ccf8b]" />
              <span className="flex-1">{p}</span>
              <span className="text-[9.5px] text-[#5c5c66] tabular-nums">{t}</span>
            </li>
          ))}
        </ul>
        <div className="rounded-lg bg-black/55 p-2.5 font-mono text-[9.5px]/[1.75] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]">
          {log.map(([time, tag, text]) => (
            <div key={time} className="truncate">
              <span className="text-white/30">{time}</span> <span className="text-[#c4b0ff]">{tag}</span> <span className="text-[#b9b8c0]">{text}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {passed.map((p) => (
            <span key={p} className="flex items-center gap-1.5 rounded-md bg-[#4ccf8b]/[0.08] px-2 py-1 text-[10px] text-[#4ccf8b]">
              <Check className="size-3" /> {p}
            </span>
          ))}
        </div>
        <div className="mt-auto rounded-lg border border-[#4ccf8b]/30 bg-[#4ccf8b]/[0.07] p-2.5">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex size-5 items-center justify-center rounded-full bg-[#4ccf8b] text-[#0f0f13]">
              <Check className="size-3" />
            </span>
            Your mod is ready
            <span className="ml-auto text-[9.5px] font-normal text-[#80808c]">Tested on FiveM</span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5 text-[10px]">
            <span className="flex items-center justify-center gap-1 rounded-md bg-[#ff4d1a] py-1 text-white">
              <Eye className="size-3" /> Visual editor
            </span>
            <span className="flex items-center justify-center gap-1 rounded-md bg-white/[0.08] py-1">
              <Code2 className="size-3" /> Edit code
            </span>
            <span className="flex items-center justify-center gap-1 rounded-md bg-white/[0.08] py-1">
              <Download className="size-3" /> Export
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 3. The world editor: real viewport, transform tools, scene hierarchy and Inspector.
function EditorVisual() {
  const tools = ['Move', 'Rotate', 'Scale'] as const
  const [tool, setTool] = useState<(typeof tools)[number]>('Move')
  const scene = ['Impound gate', 'Police barrier', 'Tow drop-off marker', 'Dispatch desk', 'Floodlight 1']
  const [sel, setSel] = useState(1)
  const values: Record<(typeof tools)[number], number[]> = { Move: [409.2, -1623.5, 29.3], Rotate: [0, 0, 32], Scale: [1, 1, 1] }
  return (
    <div className={`${panel} flex h-full flex-col overflow-hidden text-[10.5px]`}>
      <Bar title="Tow Truck Job" tab="visual" />
      <div className="relative min-h-0 flex-1 bg-black">
        <img src="/app/viewport-impound.jpg" alt="The GTA impound lot open in GAIMER's world editor" loading="lazy" className="size-full object-cover" />
        <div className="absolute top-2 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-lg bg-[#141416]/95 p-0.5 whitespace-nowrap text-white/70 shadow-[0_0_0_1px_rgb(255_255_255/0.08)]">
          <span className="px-2 py-1">+ Add</span>
          {tools.map((t, i) => (
            <button
              key={t}
              onClick={() => setTool(t)}
              className={`flex items-center gap-1 rounded-md px-2 py-1 transition-colors ${tool === t ? 'bg-[#5b3ee6] text-white' : 'hover:bg-white/10'}`}
            >
              {t} <span className="text-[8px] text-white/40">{i + 1}</span>
            </button>
          ))}
        </div>
        <div className="absolute right-[13%] bottom-[9%] h-[30%] w-[36%] rounded-sm outline-2 outline-offset-2 outline-[#8b5cf6]">
          <span className="absolute -top-6 left-0 rounded bg-[#8b5cf6] px-1.5 py-0.5 text-[9px] whitespace-nowrap text-white">{scene[sel]}</span>
          <span className="absolute top-1/2 left-1/2 h-px w-14 -translate-y-1/2 bg-[#ff5d6c]" />
          <span className="absolute top-1/2 left-1/2 h-14 w-px -translate-x-1/2 -translate-y-full bg-[#4ccf8b]" />
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1.15fr] border-t border-white/[0.07]">
        <ul className="border-r border-white/[0.07] p-2">
          <li className="px-1.5 pb-1 text-[8.5px] tracking-[0.15em] text-white/35 uppercase">Scene</li>
          {scene.map((s, i) => (
            <li key={s}>
              <button
                onClick={() => setSel(i)}
                className={`w-full truncate rounded px-1.5 py-1 text-left ${i === sel ? 'bg-white/[0.08] shadow-[inset_2px_0_0_#5b3ee6]' : 'text-white/75 hover:bg-white/[0.04]'}`}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
        <div className="space-y-2 p-2.5">
          <div className="text-[8.5px] tracking-[0.15em] text-white/35 uppercase">Inspector</div>
          {(['Move', 'Rotate', 'Scale'] as const).map((t) => (
            <div key={t}>
              <div className={tool === t ? 'text-white' : 'text-white/55'}>{t === 'Move' ? 'Position' : t === 'Rotate' ? 'Rotation' : 'Scale'}</div>
              <div className="mt-0.5 flex gap-1">
                {values[t].map((v, i) => (
                  <span key={i} className="flex flex-1 justify-between rounded bg-white/[0.06] px-1 py-0.5 font-mono text-[9px] text-white/80">
                    <span className="text-white/35">{'xyz'[i]}</span>
                    {v}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
            <span className="flex items-center justify-center gap-1 rounded-md bg-white/[0.06] py-1 text-white/70">
              <Copy className="size-2.5" /> Duplicate
            </span>
            <span className="flex items-center justify-center gap-1 rounded-md bg-white/[0.06] py-1 text-white/70">
              <Trash2 className="size-2.5" /> Delete
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 4. Saved versions: pick one to see its files, restore it, test it, export it.
function ShipVisual() {
  const versions: { v: string; label: string; when: string; files: [string, number, number][]; diff: [string, string][] }[] = [
    { v: 'v4', label: 'Rush-hour bonus 18:00 to 21:00', when: 'now', files: [['server.lua', 22, 4], ['client.lua', 9, 1]], diff: [['-', 'local payout = CONFIG.salePrice'], ['+', 'local hour = GetClockHours()'], ['+', 'local rush = hour >= 18 and hour < 21'], ['+', 'local payout = CONFIG.salePrice * (rush and 1.5 or 1)']] },
    { v: 'v3', label: 'Beach spot and combo meal', when: '12 min ago', files: [['server.lua', 38, 6], ['client.lua', 52, 3], ['world.fxworld', 6, 0]], diff: [['+', 'sellZones = {'], ['+', '    vector3(-1037.4, -2731.8, 20.2),'], ['+', '    vector3(-1686.2, -1066.7, 13.0),'], ['+', '},']] },
    { v: 'v2', label: 'Second selling spot', when: '40 min ago', files: [['server.lua', 31, 2], ['world.fxworld', 10, 0]], diff: [['-', 'sellRadius = 12.0,'], ['+', 'sellRadius = 18.0,'], ['+', 'supplierRadius = 4.0,']] },
    { v: 'v1', label: 'Food-truck business', when: '1 hr ago', files: [['server.lua', 148, 0], ['client.lua', 164, 0]], diff: [['+', 'local CONFIG = {'], ['+', '    ingredientPack = 5,'], ['+', '    purchasePrice = 250,'], ['+', '    salePrice = 125,']] },
  ]
  const [view, setView] = useState(0)
  const [live, setLive] = useState(0)
  const current = versions[view]
  return (
    <div className={`${panel} flex h-full flex-col overflow-hidden text-[11px]/[1.55]`}>
      <Bar title="Food Truck Business" tab="code" />
      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden p-3">
        <div className="text-[9px] tracking-[0.15em] text-[#5c5c66] uppercase">Versions</div>
        <ul className="space-y-1.5">
          {versions.map((ver, i) => (
            <li key={ver.v}>
              <button
                onClick={() => setView(i)}
                className={`flex w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left transition-colors ${
                  i === view ? 'border-[#8b5cf6]/50 bg-[#8b5cf6]/[0.08]' : 'border-white/[0.07] bg-[#16161c] hover:bg-white/[0.04]'
                }`}
              >
                <ShieldCheck className={`size-3.5 shrink-0 ${i === live ? 'text-[#4ccf8b]' : 'text-[#5c5c66]'}`} />
                <span className="min-w-0 flex-1 truncate">
                  Saved {ver.v} <span className="text-[#80808c]">· {ver.label}</span>
                </span>
                <span className="shrink-0 text-[9.5px] text-[#5c5c66]">{i === live ? 'Live' : ver.when}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className={`${card} overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-white/[0.07] px-2.5 py-1.5 text-[10px] text-[#80808c]">
            Changes in {current.v}
            {view !== live && (
              <button onClick={() => setLive(view)} className="flex items-center gap-1 rounded-md bg-white/[0.07] px-1.5 py-0.5 text-[#b9b8c0] hover:bg-white/[0.12]">
                <RotateCcw className="size-2.5" /> Restore {current.v}
              </button>
            )}
          </div>
          <ul className="py-1">
            {current.files.map(([path, a, r]) => (
              <li key={path} className="flex items-center gap-1.5 px-2.5 py-0.5 text-[#b9b8c0]">
                <FileCode2 className="size-3 text-[#5c5c66]" />
                <span className="flex-1 truncate text-[10.5px]">{path}</span>
                <span className="flex gap-1.5 font-mono text-[9.5px] font-semibold">
                  {a ? <b className="text-[#4ccf8b]">+{a}</b> : null}
                  {r ? <b className="text-[#ff5d6c]">−{r}</b> : null}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/[0.07] bg-black/40 px-2.5 py-1.5 font-mono text-[9.5px]/[1.7]">
            {current.diff.map(([mark, line], i) => (
              <div key={i} className={`truncate whitespace-pre ${mark === '+' ? 'text-[#4ccf8b]' : 'text-[#ff5d6c]'}`}>
                {mark} {line}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2">
          <span className="flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.18] py-2">
            <Play className="size-3" /> Test in GTA
          </span>
          <span className="download-gradient flex items-center justify-center gap-1.5 rounded-lg py-2 text-white">
            <Download className="size-3" /> Export mod
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#80808c]">
          <FileArchive className="size-3.5" /> food-truck-{versions[live].v}.zip · the exact files that passed
        </div>
      </div>
    </div>
  )
}

const rows: { title: string; body: string; art: string; focus?: string; visual: ReactNode }[] = [
  {
    title: 'Describe it. GAIMER asks first.',
    body: 'Tell GAIMER what you want in plain English. When something is unclear it asks instead of guessing, then plans the change and builds it.',
    art: '/games/backdrops/elden-ring.jpg',
    visual: <AskVisual />,
  },
  {
    title: 'Tested on a real server before you see it',
    body: 'Every change runs on a licensed FiveM test server first. If something breaks, GAIMER fixes it and tests again, so what you open already works.',
    art: '/games/backdrops/gta-v.jpg',
    focus: '70% 30%',
    visual: <VerifyVisual />,
  },
  {
    title: 'Edit the world, not just the code',
    body: 'Open your mod in the native GTA world editor. Select anything, then move, rotate or scale it with real gizmos while GAIMER keeps the code in sync.',
    art: '/games/backdrops/red-dead-redemption-2.jpg',
    focus: '72% 40%',
    visual: <EditorVisual />,
  },
  {
    title: 'Play it, undo it, ship it',
    body: 'Every change is a saved version you can undo. Test in GTA with one click, then export the exact resource that passed.',
    art: '/games/backdrops/cyberpunk-2077.jpg',
    focus: '66% 40%',
    visual: <ShipVisual />,
  },
]

export function Showcase() {
  return (
    <section id="how-it-works" className="scroll-mt-16 px-4 py-16 sm:px-6 md:py-32">
      <div className="container-l space-y-6">
        {rows.map((r, i) => (
          <article key={r.title} className="grid gap-2 rounded-3xl bg-white/[0.04] p-2 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)] lg:grid-cols-2">
            <div className={`flex flex-col justify-center p-6 md:p-10 ${i % 2 ? 'lg:order-2' : ''}`}>
              <h2 className="text-[18px]/[1.15] font-semibold tracking-[-0.5px] text-balance text-white md:text-[26px]/[1.15] md:tracking-[-0.9px]">{r.title}</h2>
              <p className="mt-4 max-w-[420px] text-base/6 text-white/65">{r.body}</p>
            </div>
            <div className="relative h-[600px] overflow-hidden rounded-2xl lg:aspect-square lg:h-auto">
              <img src={r.art} alt="" aria-hidden="true" loading="lazy" style={{ objectPosition: r.focus ?? '50% 50%' }} className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-3 sm:inset-[7%]">{r.visual}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
