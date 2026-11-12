import { ArrowUp, Box, Check, Code2, Copy, Eye, FileCode2, Lightbulb, Play, Plus, RotateCcw, ShieldCheck, Trash2, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'

// Hero product shot: a faithful rebuild of GAIMER Desktop (gaimer-platform's FxDK overlay). Layout and chrome follow
// docs/evidence/unseen-v62/scene-inspector.png and unseen-v90/final-pass/fxdk-project.png; the Agent thread follows
// desktop-overlay/.../fxcode/AgentChat.tsx (user card, "Thought for", phases, Saved-version change card, credits footer,
// composer with "Test in GTA"). The viewport is the real in-game frame from the v90 capture; chrome is HTML so it stays
// sharp. Scene items, tools and the Visual/Code tabs are clickable.

const PROJECT = 'Create A Food Truck Business The Player Stocks I…'

// The refinement turn from the food-truck project, laid out the way AgentChat renders a finished edit.
const turn = {
  instruction: 'Add a beach selling spot with lights and bins, a combo meal and a rush-hour bonus.',
  thought: '12s',
  phases: [
    { label: 'Reading your project', steps: 3, time: '0:06' },
    { label: 'Editing the mod', steps: 5, time: '0:41' },
    { label: 'Testing on a FiveM server', steps: 2, time: '0:38' },
  ],
  version: 'v3',
  files: [
    ['server.lua', 38, 6],
    ['client.lua', 52, 3],
    ['world.fxworld', 6, 0],
  ] as [string, number, number][],
  scene: { added: 'String Light ×4', changed: 'Supplier Stall' },
  time: '1m 25s',
  credits: 25,
}

// Scene objects. The supplier stall's transform and events match the capture; the others are illustrative.
const scene: { name: string; id: string; pos: [number, number, number]; rot: number }[] = [
  { name: 'Ingredient Supplier Stall', id: 'supplier-stall', pos: [196, -932, 30.6], rot: 0 },
  { name: 'Beach String Light 1', id: 'beach-stringlight-1', pos: [-1612.4, -1078.2, 13.0], rot: 50 },
  { name: 'Beach String Light 2', id: 'beach-stringlight-2', pos: [-1605.9, -1071.6, 13.0], rot: 50 },
  { name: 'Beach String Light 3', id: 'beach-stringlight-3', pos: [-1599.3, -1065.1, 13.0], rot: 50 },
  { name: 'Beach String Light 4', id: 'beach-stringlight-4', pos: [-1592.8, -1058.5, 13.0], rot: 50 },
  { name: 'Beach Bin 1', id: 'beach-bin-1', pos: [-1618.0, -1086.4, 12.4], rot: 0 },
  { name: 'Beach Bin 2', id: 'beach-bin-2', pos: [-1588.1, -1051.7, 12.4], rot: 0 },
]

// Real generated resource from gaimer-platform (docs/evidence/unseen-v41/food_truck), first lines of each file.
const files: Record<string, string[]> = {
  'client.lua': [
    'local supplier = vec3(1227.6, -3301.8, 5.5)',
    'local sellZones = {',
    '    vec3(-1037.4, -2731.8, 20.2),',
    '    vec3(-1686.2, -1066.7, 13.0),',
    '}',
    'local truckSpawn = vec4(1227.6, -3301.8, 5.5, 90.0)',
    "local truckModel = joaat('benson')",
    "local useCommand = 'foodtruckuse'",
    'local customers = {}',
    'local state = { ingredients = 0, burgers = 0, drinks = 0, money = 0 }',
  ],
  'fxmanifest.lua': [
    "fx_version 'cerulean'",
    "game 'gta5'",
    '',
    "server_script 'server.lua'",
    "client_script 'client.lua'",
    "client_script 'gaimer-components-client.lua'",
    "server_script 'gaimer-components-server.lua'",
    '',
    "lua54 'yes'",
  ],
  'gaimer-components-client.lua': ['-- GAIMER typed components (client)'],
  'gaimer-components-server.lua': ['-- GAIMER typed components (server)'],
  'gaimer.components.json': ['{ "components": [ … ] }'],
  'server.lua': [
    "local json = json or require('json')",
    'local CONFIG = {',
    '    ingredientPack = 5,',
    '    burgerPerCook = 1,',
    '    purchasePrice = 250,',
    '    salePrice = 125,',
    '    sellRadius = 18.0,',
    '    supplierRadius = 4.0,',
    "    truckModel = joaat('benson'),",
    '    truckSpawn = vector4(1227.6, -3301.8, 5.5, 90.0),',
  ],
  'world.fxworld': ['-- Native FxDK scene: 9 objects (supplier stall, string lights, bins…)'],
}

const tools = [
  ['Move', '1'],
  ['Rotate', '2'],
  ['Scale', '3'],
] as const

// Colours from AgentChat.module.scss: bg #0f0f13, surface #16161c, text #ecebe8, soft #b9b8c0, muted #80808c,
// faint #5c5c66, violet #8b5cf6, pink #ff3c70, green #4ccf8b, red #ff5d6c.
function AgentPanel() {
  const added = turn.files.reduce((n, f) => n + f[1], 0)
  const removed = turn.files.reduce((n, f) => n + f[2], 0)
  return (
    <aside className="flex w-[268px] shrink-0 flex-col border-r border-white/[0.07] bg-[#0f0f13] text-[#ecebe8]">
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-3 py-2 text-[10.5px]">
        <span className="font-medium text-[#ecebe8]">Agent</span>
        <span className="text-[#5c5c66]">Components</span>
        <Plus className="ml-auto size-3 text-[#5c5c66]" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden px-3 pt-2.5 text-[10.5px]/[1.55] [mask-image:linear-gradient(to_bottom,black_92%,transparent)]">
        <div className="rounded-lg border border-white/[0.07] bg-[#16161c] px-2.5 py-2 text-[#ecebe8]">
          <p>{turn.instruction}</p>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[10px] text-[#80808c]">
          <Lightbulb className="size-3 text-[#5c5c66]" /> Thought for {turn.thought}
        </div>
        {turn.phases.map((p) => (
          <div key={p.label} className="flex min-h-[20px] items-center gap-2 text-[#b9b8c0]">
            <Check className="size-3 text-[#4ccf8b]" />
            <span className="flex-1 truncate">{p.label}</span>
            <span className="text-[9.5px] text-[#5c5c66]">{p.steps} steps</span>
            <span className="text-[9px] text-[#5c5c66] tabular-nums">{p.time}</span>
          </div>
        ))}
        <p className="mt-1 text-[#d3d2d8]">
          Added a beach spot with string lights and bins, a <strong className="font-semibold text-[#ecebe8]">combo meal</strong> on G and a{' '}
          <strong className="font-semibold text-[#ecebe8]">rush-hour bonus</strong> from 18:00 to 21:00.
        </p>
        <div className="mt-2 overflow-hidden rounded-lg border border-white/[0.07] bg-[#16161c]">
          <div className="flex items-center gap-1.5 border-b border-white/[0.07] bg-gradient-to-b from-[#4ccf8b]/[0.06] to-transparent px-2.5 py-1.5">
            <span className="flex items-center gap-1 text-[10px] font-semibold text-[#4ccf8b]">
              <ShieldCheck className="size-3" /> Saved {turn.version}
            </span>
            <span className="flex-1 truncate text-[9px] text-[#80808c]">Tested on FiveM</span>
            <span className="flex gap-1.5 font-mono text-[9px] font-semibold tabular-nums">
              <b className="text-[#4ccf8b]">+{added}</b>
              <b className="text-[#ff5d6c]">−{removed}</b>
            </span>
          </div>
          <div className="flex flex-wrap gap-1 px-2.5 pt-2 text-[9px] whitespace-nowrap">
            <span className="flex items-center gap-1 rounded bg-[#4ccf8b]/15 px-1.5 py-0.5 text-[#4ccf8b]">
              <Box className="size-2.5" /> Added {turn.scene.added}
            </span>
            <span className="flex items-center gap-1 rounded bg-[#8b5cf6]/15 px-1.5 py-0.5 text-[#c4b0ff]">
              <Box className="size-2.5" /> Changed {turn.scene.changed}
            </span>
          </div>
          <ul className="py-1">
            {turn.files.map(([path, a, r]) => (
              <li key={path} className="flex items-center gap-1.5 px-2.5 py-0.5 text-[#b9b8c0]">
                <FileCode2 className="size-3 text-[#5c5c66]" />
                <span className="flex-1 truncate text-[10px]">{path}</span>
                <span className="flex gap-1.5 font-mono text-[9px] font-semibold tabular-nums">
                  {a ? <b className="text-[#4ccf8b]">+{a}</b> : null}
                  {r ? <b className="text-[#ff5d6c]">−{r}</b> : null}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2.5 border-t border-white/[0.07] px-2.5 py-1.5 text-[9px] text-[#5c5c66]">
            <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.06] px-2 py-0.5 text-[9.5px] text-[#b9b8c0]">
              <RotateCcw className="size-2.5" /> Undo
            </span>
            <span className="ml-auto">{turn.time}</span>
            <span>{turn.credits} credits</span>
          </div>
        </div>
      </div>
      <div className="m-2.5 rounded-xl border border-[#8b5cf6]/55 bg-[#16161c] shadow-[0_0_0_3px_rgb(139_92_246/0.14)]">
        <div className="px-2.5 pt-2 text-[10.5px] text-[#5c5c66]">Describe a change, or ask a question</div>
        <div className="flex items-center gap-1.5 px-2.5 pt-2 pb-1.5 whitespace-nowrap">
          <span className="flex min-w-0 items-center gap-1.5 text-[9px] text-[#5c5c66]">
            <span className="size-1.5 shrink-0 rounded-full bg-[#4ccf8b]" /> <span className="truncate">GAIMER · High reasoning</span>
          </span>
          <span className="ml-auto flex shrink-0 items-center gap-0.5 rounded-md border border-white/[0.18] px-1 py-0.5 text-[8.5px] text-[#ecebe8]">
            <Play className="size-2" /> Test in GTA
          </span>
          <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#8b5cf6] to-[#ff3c70]">
            <ArrowUp className="size-3 text-white" />
          </span>
        </div>
      </div>
    </aside>
  )
}

function Viewport({ tool, onTool }: { tool: string; onTool: (t: string) => void }) {
  return (
    <div className="relative min-w-0 flex-1 overflow-hidden bg-black">
      <img src="/app/viewport-beach.jpg" alt="GTA V at the beach running a GAIMER food-truck mod" className="size-full object-cover object-left" />
      <div className="absolute top-1.5 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-lg whitespace-nowrap bg-[#141416]/95 p-0.5 text-[10px] text-white/70 shadow-[0_0_0_1px_rgb(255_255_255/0.08)]">
        <span className="px-2 py-1">+ Add</span>
        {tools.map(([name, key]) => (
          <button
            key={name}
            onClick={() => onTool(name)}
            className={`flex items-center gap-1 rounded-md px-2 py-1 transition-colors ${tool === name ? 'bg-[#5b3ee6] text-white' : 'hover:bg-white/10'}`}
          >
            {name} <span className="text-[8px] text-white/40">{key}</span>
          </button>
        ))}
        <span className="hidden px-2 py-1 xl:inline">Global</span>
        <span className="hidden items-center gap-1 px-2 py-1 text-white/35 2xl:flex">
          <kbd className="rounded bg-white/10 px-1 text-[8px]">Esc</kbd> Release mouse
        </span>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: number }) {
  return (
    <span className="flex flex-1 items-center justify-between rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9px] text-white/80">
      <span className="text-white/35">{label}</span>
      {value}
    </span>
  )
}

function Inspector({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  const item = scene[selected]
  return (
    <aside className="flex w-[210px] shrink-0 flex-col overflow-hidden border-l border-white/[0.07] bg-[#141416] text-white">
      <div className="flex items-start justify-between px-3 pt-2.5">
        <div>
          <div className="text-[8px] tracking-[0.15em] text-white/35 uppercase">Inspector</div>
          <div className="text-[11px] font-medium text-white/90">{item.name}</div>
        </div>
        <X className="size-3 text-white/40" />
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-1.5 px-3 text-[10px] text-white/70">
        <span className="flex items-center justify-center gap-1 rounded-md bg-white/[0.06] py-1">
          <Copy className="size-2.5" /> Duplicate
        </span>
        <span className="flex items-center justify-center gap-1 rounded-md bg-white/[0.06] py-1">
          <Trash2 className="size-2.5" /> Delete
        </span>
      </div>
      <div className="mt-3 px-3 text-[8px] tracking-[0.15em] text-white/35 uppercase">Scene</div>
      <ul className="mt-1 px-1.5">
        {scene.map((s, i) => (
          <li key={s.id}>
            <button
              onClick={() => onSelect(i)}
              className={`w-full rounded-md px-1.5 py-1 text-left transition-colors ${i === selected ? 'bg-white/[0.08] shadow-[inset_2px_0_0_#5b3ee6]' : 'hover:bg-white/[0.04]'}`}
            >
              <div className="text-[10px] text-white/85">{s.name}</div>
              <div className="font-mono text-[8px] text-white/30">{s.id}</div>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-2 border-t border-white/[0.07] px-3 pt-2.5 text-[10px]">
        <div className="text-white/45">Transform &amp; position</div>
        {(
          [
            ['Position', item.pos],
            ['Rotation', [0, 0, item.rot]],
            ['Scale', [1, 1, 1]],
          ] as const
        ).map(([label, v]) => (
          <div key={label} className="mt-1.5">
            <div className="text-[9.5px] text-white/70">{label}</div>
            <div className="mt-0.5 flex gap-1">
              <Field label="x" value={v[0]} />
              <Field label="y" value={v[1]} />
              <Field label="z" value={v[2]} />
            </div>
          </div>
        ))}
        <div className="mt-2.5 text-white/45">Events</div>
        <div className="mt-1 text-[9.5px] text-white/70">Created</div>
        <div className="mt-0.5 truncate rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[8.5px] text-white/75">gaimer:scene:{item.id}:created</div>
      </div>
    </aside>
  )
}

const LUA_KEYWORDS = new Set(['local', 'function', 'end', 'if', 'then', 'else', 'elseif', 'return', 'for', 'in', 'do', 'while', 'repeat', 'until', 'not', 'and', 'or', 'nil', 'true', 'false'])
const TOKEN = /(--.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w.]*)(?=\s*\()|([A-Za-z_]\w*)|([{}()[\],=<>+\-*/])/g

// Tiny tokenizer: comments, strings, numbers, keywords, calls, names and punctuation.
function highlight(line: string) {
  const out: ReactNode[] = []
  let last = 0
  for (const m of line.matchAll(TOKEN)) {
    if (m.index > last) out.push(line.slice(last, m.index))
    const [text, comment, str, num, call, name] = m
    const color = comment
      ? '#6a9955'
      : str
        ? '#ce9178'
        : num
          ? '#b5cea8'
          : call
            ? '#dcdcaa'
            : name
              ? LUA_KEYWORDS.has(name)
                ? '#c586c0'
                : '#9cdcfe'
              : '#d4d4d4'
    out.push(
      <span key={m.index} style={{ color }}>
        {text}
      </span>,
    )
    last = m.index + text.length
  }
  if (last < line.length) out.push(line.slice(last))
  return out
}

function CodeView() {
  const [file, setFile] = useState('server.lua')
  return (
    <div className="flex min-w-0 flex-1 bg-[#0e0e10]">
      <ul className="w-[190px] shrink-0 border-r border-white/[0.07] p-2 text-[10.5px]">
        <li className="px-2 pb-1.5 text-[8.5px] tracking-[0.15em] text-white/35 uppercase">Files</li>
        {Object.keys(files).map((f) => (
          <li key={f}>
            <button
              onClick={() => setFile(f)}
              className={`flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left ${f === file ? 'bg-[#ff4d1a]/15 text-[#ff6a3d]' : 'text-white/75 hover:bg-white/[0.05]'}`}
            >
              <FileCode2 className="size-3 shrink-0" /> <span className="truncate">{f}</span>
            </button>
          </li>
        ))}
      </ul>
      <pre className="flex-1 overflow-hidden p-3 font-mono text-[10.5px]/[17px] text-white/80">
        <div className="mb-2 text-white/35">{file}</div>
        {files[file].map((line, i) => (
          <div key={i} className="flex gap-3 whitespace-pre">
            <span className="w-4 shrink-0 text-right text-white/25 select-none">{i + 1}</span>
            <span>{highlight(line)}</span>
          </div>
        ))}
      </pre>
    </div>
  )
}

export function AppWindow() {
  const [tab, setTab] = useState<'visual' | 'code'>('visual')
  const [tool, setTool] = useState('Move')
  const [selected, setSelected] = useState(0)

  return (
    <div className="overflow-hidden rounded-xl bg-[#0e0e10] text-left text-white shadow-[0_0_0_1px_rgb(0_0_0/0.25),0_30px_60px_-20px_rgb(0_0_0/0.5)]">
      <div className="flex h-9 items-center gap-3 border-b border-white/[0.07] bg-[#111113] px-3 text-[10.5px]">
        <span className="flex items-center gap-1.5 font-semibold tracking-wide text-white">
          <img src="/brand/icon.svg" alt="" className="size-4" /> GAIMER
        </span>
        <span className="block max-w-[260px] truncate text-white/50">/ {PROJECT}</span>
        <span className="flex rounded-md bg-white/[0.06] p-0.5">
          {(
            [
              ['visual', Eye, 'Visual'],
              ['code', Code2, 'Code'],
            ] as const
          ).map(([id, Icon, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1 rounded px-2 py-0.5 transition-colors ${tab === id ? 'bg-white/15 text-white' : 'text-white/45 hover:text-white/80'}`}
            >
              <Icon className="size-2.5" /> {label}
            </button>
          ))}
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="hidden items-center gap-1.5 rounded-md bg-white/[0.05] py-0.5 pr-1 pl-2 text-white/30 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.07)] xl:flex">
            Run mod command <span className="rounded bg-white/[0.07] px-1.5 text-white/50">Run</span>
          </span>
          <span className="text-white/40">Live</span>
          <span className="rounded-md bg-white/[0.07] px-2 py-0.5 text-white/75">Undo</span>
          <span className="rounded-md bg-white/[0.07] px-2 py-0.5 text-white/75">Redo</span>
          <span className="rounded-md bg-[#5b3ee6] px-2 py-0.5 text-white">Play</span>
          <span className="download-gradient rounded-md px-2 py-0.5 text-white">Export</span>
        </span>
      </div>
      <div className="flex h-[520px]">
        <AgentPanel />
        {tab === 'visual' ? (
          <>
            <Viewport tool={tool} onTool={setTool} />
            <Inspector selected={selected} onSelect={setSelected} />
          </>
        ) : (
          <CodeView />
        )}
      </div>
    </div>
  )
}
