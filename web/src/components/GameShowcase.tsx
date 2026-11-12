import { ArrowUp, Check, Download, FileArchive, FileCode2, Lightbulb, MessageCircleQuestion, Play, Plus } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import type { GameShowcase as Content } from '../data/gameShowcase'
import { Bar, card, panel } from './Showcase'

// Game-page version of the home page's feature boxes: same layout and app chrome, filled with each game's own
// toolchain (see data/gameShowcase.ts). Panel art comes from the game's card and hero images.

const KEYWORDS: Record<Content['code']['lang'], string[]> = {
  lua: ['local', 'function', 'end', 'if', 'then', 'else', 'and', 'or', 'not', 'return', 'nil', 'true', 'false'],
  java: ['public', 'private', 'class', 'extends', 'final', 'return', 'boolean', 'new', 'this', 'void'],
  papyrus: ['Scriptname', 'extends', 'Property', 'Auto', 'Event', 'EndEvent', 'If', 'EndIf', 'Float', 'Actor', 'LeveledItem', 'GlobalVariable'],
  redscript: ['protected', 'cb', 'func', 'ref', 'if', 'return', 'this', 'Bool'],
  csv: ['ID', 'Name'],
  cpp: ['int', 'float', 'const', 'return', 'static_cast'],
}

// Small tokenizer: comments, strings, numbers, keywords and calls, coloured like VS Code's dark theme.
function highlight(line: string, lang: Content['code']['lang']) {
  const comment = lang === 'lua' ? '--' : lang === 'papyrus' || lang === 'csv' ? ';' : '//'
  const at = line.indexOf(comment)
  const code = at >= 0 ? line.slice(0, at) : line
  const parts: ReactNode[] = []
  const re = /("[^"]*"|'[^']*'|@\w+|\b\d+(?:\.\d+)?f?\b|\b[A-Za-z_]\w*\b(?=\s*\()|\b[A-Za-z_]\w*\b)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(code))) {
    if (m.index > last) parts.push(code.slice(last, m.index))
    const t = m[0]
    const colour = /^["']/.test(t)
      ? '#ce9178'
      : t.startsWith('@')
        ? '#dcdcaa'
        : /^\d/.test(t)
          ? '#b5cea8'
          : KEYWORDS[lang].includes(t)
            ? '#569cd6'
            : code.slice(m.index + t.length).trimStart().startsWith('(')
              ? '#dcdcaa'
              : /^[A-Z]/.test(t)
                ? '#4ec9b0'
                : '#9cdcfe'
    parts.push(
      <span key={m.index} style={{ color: colour }}>
        {t}
      </span>,
    )
    last = m.index + t.length
  }
  if (last < code.length) parts.push(code.slice(last))
  if (at >= 0)
    parts.push(
      <span key="c" style={{ color: '#6a9955' }}>
        {line.slice(at)}
      </span>,
    )
  return parts
}

function Composer({ testIn }: { testIn: string }) {
  return (
    <div className="m-3 rounded-xl border border-[#8b5cf6]/55 bg-[#16161c] shadow-[0_0_0_3px_rgb(139_92_246/0.14)]">
      <div className="px-3 pt-2 text-[11px] text-[#5c5c66]">Describe a change, or ask a question</div>
      <div className="flex items-center gap-2 px-3 pt-2 pb-2 whitespace-nowrap">
        <span className="flex items-center gap-1.5 text-[9.5px] text-[#5c5c66]">
          <span className="size-1.5 rounded-full bg-[#4ccf8b]" /> GAIMER · High reasoning
        </span>
        <span className="ml-auto flex items-center gap-1 rounded-md border border-white/[0.18] px-1.5 py-0.5 text-[9.5px]">
          <Play className="size-2" /> {testIn}
        </span>
        <span className="flex size-5 items-center justify-center rounded-md bg-gradient-to-br from-[#8b5cf6] to-[#ff3c70]">
          <ArrowUp className="size-3 text-white" />
        </span>
      </div>
    </div>
  )
}

function AskVisual({ c }: { c: Content }) {
  const [pick, setPick] = useState<number | null>(null)
  const a = c.ask
  return (
    <div className={`${panel} flex h-full flex-col overflow-hidden text-[11px]/[1.55]`}>
      <Bar title={c.project} />
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-3 py-1.5 text-[10px]">
        <span className="font-medium">Agent</span>
        <span className="text-[#5c5c66]">Components</span>
        <Plus className="ml-auto size-3 text-[#5c5c66]" />
      </div>
      <div className="flex-1 space-y-2.5 overflow-hidden p-3">
        <div className={`${card} px-2.5 py-2`}>{a.earlier}</div>
        <div className="flex items-center gap-2 text-[10px] text-[#80808c]">
          <Check className="size-3 text-[#4ccf8b]" /> Built and tested · Saved v1
        </div>
        <p className="text-[#d3d2d8]">{a.earlierResult}</p>
        <div className={`${card} px-2.5 py-2`}>{a.request}</div>
        <div className="flex items-center gap-2 text-[10px] text-[#80808c]">
          <Lightbulb className="size-3 text-[#5c5c66]" /> Thought for 5s
        </div>
        <div className="rounded-lg border border-[#8b5cf6]/40 bg-[#8b5cf6]/[0.08] p-2.5">
          <div className="flex items-center gap-1.5 font-medium">
            <MessageCircleQuestion className="size-3.5 text-[#c4b0ff]" /> {a.question}
          </div>
          <p className="mt-1 text-[10px] text-[#80808c]">{a.hint}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {a.options.map((o, i) => (
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
          {pick === null ? 'Reply below and GAIMER will continue.' : `Got it: ${a.options[pick]}. Building the change…`}
        </div>
      </div>
      <Composer testIn={c.testIn} />
    </div>
  )
}

function TestVisual({ c }: { c: Content }) {
  const t = c.test
  return (
    <div className={`${panel} flex h-full flex-col overflow-hidden text-[11px]/[1.55]`}>
      <Bar title={c.project} />
      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden p-3">
        <ul>
          {t.phases.map(([p, time]) => (
            <li key={p} className="flex min-h-[20px] items-center gap-2 text-[#b9b8c0]">
              <Check className="size-3 text-[#4ccf8b]" />
              <span className="flex-1">{p}</span>
              <span className="text-[9.5px] text-[#5c5c66] tabular-nums">{time}</span>
            </li>
          ))}
        </ul>
        <div className="rounded-lg bg-black/55 p-2.5 font-mono text-[9.5px]/[1.75] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]">
          {t.log.map(([tag, text]) => (
            <div key={text} className="truncate">
              <span className="text-[#c4b0ff]">{tag}</span> <span className="text-[#b9b8c0]">{text}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {t.passed.map((p) => (
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
            <span className="ml-auto text-[9.5px] font-normal text-[#80808c]">{t.badge}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CodeVisual({ c }: { c: Content }) {
  const k = c.code
  return (
    <div className={`${panel} flex h-full flex-col overflow-hidden text-[11px]/[1.55]`}>
      <Bar title={c.project} tab="code" />
      <div className="flex min-h-0 flex-1">
        <ul className="w-[30%] shrink-0 border-r border-white/[0.07] p-2">
          <li className="px-1.5 pb-1 text-[8.5px] tracking-[0.15em] text-white/35 uppercase">Files</li>
          {k.files.map((f, i) => (
            <li
              key={f}
              className={`flex items-center gap-1.5 truncate rounded px-1.5 py-1 text-[10px] ${i === k.active ? 'bg-white/[0.08] shadow-[inset_2px_0_0_#5b3ee6]' : 'text-white/70'}`}
            >
              <FileCode2 className="size-3 shrink-0 text-[#5c5c66]" />
              <span className="truncate">{f}</span>
            </li>
          ))}
        </ul>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="border-b border-white/[0.07] px-3 py-1.5 text-[10px] text-[#80808c]">{k.files[k.active]}</div>
          <pre className="overflow-hidden p-3 font-mono text-[9.5px]/[1.75] text-[#d4d4d4]">
            {k.snippet.split('\n').map((line, i) => (
              <div key={i} className="flex gap-2.5">
                <span className="w-3 shrink-0 text-right text-white/20 select-none">{i + 1}</span>
                <span className="min-w-0 break-words whitespace-pre-wrap">{highlight(line, k.lang)}</span>
              </div>
            ))}
          </pre>
        </div>
      </div>
      <Composer testIn={c.testIn} />
    </div>
  )
}

function ShipVisual({ c }: { c: Content }) {
  const s = c.ship
  const versions = ['v3 · now', 'v2 · 14 min ago', 'v1 · 1 hr ago']
  return (
    <div className={`${panel} flex h-full flex-col overflow-hidden text-[11px]/[1.55]`}>
      <Bar title={c.project} />
      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden p-3">
        <div className="text-[9px] tracking-[0.15em] text-[#5c5c66] uppercase">Versions</div>
        <ul className="space-y-1.5">
          {versions.map((v, i) => (
            <li
              key={v}
              className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 ${i === 0 ? 'border-[#8b5cf6]/50 bg-[#8b5cf6]/[0.08]' : 'border-white/[0.07] bg-[#16161c] text-[#80808c]'}`}
            >
              <Check className={`size-3.5 ${i === 0 ? 'text-[#4ccf8b]' : 'text-[#5c5c66]'}`} /> Saved {v}
            </li>
          ))}
        </ul>
        <div className={`${card} overflow-hidden`}>
          <div className="flex items-center gap-2 border-b border-white/[0.07] px-2.5 py-1.5 text-[10px]">
            <FileArchive className="size-3.5 text-[#c4b0ff]" /> {s.output}
          </div>
          <ul className="py-1">
            {s.contents.map((f) => (
              <li key={f} className="flex items-center gap-1.5 truncate px-2.5 py-0.5 font-mono text-[9.5px] text-[#b9b8c0]">
                <FileCode2 className="size-3 shrink-0 text-[#5c5c66]" /> {f}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[9px] tracking-[0.15em] text-[#5c5c66] uppercase">Install</div>
          <ol className="mt-1.5 space-y-1 text-[10.5px] text-[#b9b8c0]">
            {s.install.map((step, i) => (
              <li key={step} className="flex gap-2">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[9px]">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2">
          <span className="flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.18] py-2">
            <Play className="size-3" /> {c.testIn}
          </span>
          <span className="download-gradient flex items-center justify-center gap-1.5 rounded-lg py-2 text-white">
            <Download className="size-3" /> Export mod
          </span>
        </div>
      </div>
    </div>
  )
}

export function GameShowcase({ slug, name, content: c }: { slug: string; name: string; content: Content }) {
  const ext = slug === 'minecraft' ? 'png' : 'jpg'
  const rows = [
    { title: 'Describe it. GAIMER asks first.', body: c.ask.body, art: `/games/cards/${slug}-1.${ext}`, visual: <AskVisual c={c} /> },
    { title: c.test.title, body: c.test.body, art: `/games/cards/${slug}-2.${ext}`, visual: <TestVisual c={c} /> },
    { title: c.code.title, body: c.code.body, art: `/games/cards/${slug}-3.${ext}`, visual: <CodeVisual c={c} /> },
    { title: c.ship.title, body: c.ship.body, art: `/games/heroes/${slug}.jpg`, visual: <ShipVisual c={c} /> },
  ]
  return (
    <section className="px-4 py-16 sm:px-6 md:py-32">
      <div className="container-l">
        <h2 className="max-w-[640px] text-[28px]/[1.1] font-semibold tracking-[-1.12px] text-white md:text-4xl/[1.1] md:tracking-[-1.44px]">
          How GAIMER mods {name}
        </h2>
        <div className="mt-10 space-y-6 md:mt-14">
          {rows.map((r, i) => (
            <article key={r.title} className="grid gap-2 rounded-3xl bg-white/[0.04] p-2 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)] lg:grid-cols-2">
              <div className={`flex flex-col justify-center p-6 md:p-10 ${i % 2 ? 'lg:order-2' : ''}`}>
                <h3 className="text-[18px]/[1.15] font-semibold tracking-[-0.5px] text-balance text-white md:text-[26px]/[1.15] md:tracking-[-0.9px]">{r.title}</h3>
                <p className="mt-4 max-w-[420px] text-base/6 text-white/65">{r.body}</p>
              </div>
              <div className="relative h-[560px] overflow-hidden rounded-2xl lg:aspect-square lg:h-auto">
                <img src={r.art} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-3 sm:inset-[7%]">{r.visual}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
