import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

// PLACEHOLDER stories: structure mirrors Lovable's customer carousel. Replace with real creator stories.
const stories = [
  {
    team: 'NIGHTFALL',
    intro: 'A two-person team rebuilt survival horror inside an open-world RPG over a single weekend.',
    quote: '“We described the mechanic and had it running in-game before lunch. That never happens.”',
    stats: [
      ['48h', 'from idea to release'],
      ['0', 'lines written by hand'],
      ['#1', 'trending mod that week'],
    ],
    person: 'Creator name',
    role: 'Mod author',
  },
  {
    team: 'PIXELFORGE',
    intro: 'A first-time modder shipped a full co-op mode for their favourite farming game.',
    quote: '“I’d never written a line of C#. Gaimer read the game, explained it, and built it with me.”',
    stats: [
      ['3 days', 'to a working co-op build'],
      ['12', 'mechanics added'],
      ['4.9★', 'average community rating'],
    ],
    person: 'Creator name',
    role: 'First-time modder',
  },
  {
    team: 'IRONCLAD',
    intro: 'A veteran mod team moved their whole pipeline to Gaimer and doubled their release cadence.',
    quote: '“Hot reload alone changed how we work. We iterate inside the game now, not around it.”',
    stats: [
      ['2×', 'faster release cadence'],
      ['30+', 'mods maintained'],
      ['0', 'broken saves since'],
    ],
    person: 'Creator name',
    role: 'Lead modder',
  },
]

type Story = (typeof stories)[number]

function TeamMark({ name, className = '' }: { name: string; className?: string }) {
  return <span className={`font-mono font-bold tracking-[0.2em] ${className}`}>{name}</span>
}

function StoryCard({ s, className = '' }: { s: Story; className?: string }) {
  return (
    <article className={`flex flex-col rounded-2xl bg-muted-surface px-6 pt-8 pb-6 md:px-10 md:pt-10 md:pb-8 ${className}`}>
      <TeamMark name={s.team} className="text-xl text-ink" />
      <div className="mt-12 grid flex-1 items-end gap-8 md:grid-cols-[1fr_180px] md:gap-10">
        <div>
          <p className="text-sm/6 text-body">{s.intro}</p>
          <blockquote className="mt-6 border-l border-ink/60 pl-5 text-xl/7 font-[480] text-[oklch(0.3_0.001_107)] md:text-2xl/8">
            {s.quote}
          </blockquote>
        </div>
        <dl className="space-y-4">
          {s.stats.map(([v, l]) => (
            <div key={l}>
              <dd className="text-[32px]/[1.1] font-[480] tracking-[-1px] text-ink">{v}</dd>
              <dt className="mt-1 text-xs text-body">{l}</dt>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="brand-gradient size-12 rounded-lg" />
          <div>
            <div className="text-sm text-ink">{s.person}</div>
            <div className="text-xs text-body">{s.role}</div>
          </div>
        </div>
        <a href="#cta" className="inline-flex items-center gap-2 rounded-md bg-surface px-3 py-2 text-[13px] font-semibold shadow-button">
          Read story <ArrowRight className="size-3.5" />
        </a>
      </div>
    </article>
  )
}

// Centred, endless carousel: the active story (720px) sits in the middle of the page with 304px tiles queued
// either side. `pos` counts up forever and wraps onto the stories, so it loops in both directions.
const ACTIVE_W = 720
const TILE_W = 304
const GAP = 8
const CARD_H = 528
const TILE_H = 400
const SPAN = 4 // tiles rendered each side; the outer ones sit off-screen so new tiles slide in from the edge
const AUTOPLAY_MS = 6000

const wrap = (k: number, n: number) => ((k % n) + n) % n

// Left edge of the slot `off` places away from the centre, relative to the page's centre line.
function slotX(off: number) {
  if (off === 0) return -ACTIVE_W / 2
  if (off > 0) return ACTIVE_W / 2 + GAP + (off - 1) * (TILE_W + GAP)
  return -ACTIVE_W / 2 - GAP - TILE_W + (off + 1) * (TILE_W + GAP)
}

function useIsLg() {
  const query = '(min-width: 1024px)'
  const [lg, setLg] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setLg(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return lg
}

export function Proof() {
  const [pos, setPos] = useState(0)
  const [paused, setPaused] = useState(false)
  const isLg = useIsLg()
  const n = stories.length

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setPos((p) => p + 1), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused])

  const slots = Array.from({ length: SPAN * 2 + 1 }, (_, k) => pos - SPAN + k)

  return (
    <section
      id="proof"
      className="scroll-mt-16 overflow-hidden pt-26 pb-13 md:pt-40 md:pb-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="px-6 text-center">
        <h2 className="text-[28px]/[1.1] font-semibold tracking-[-1.12px] text-ink md:text-4xl/[1.1] md:tracking-[-1.44px]">
          The proof is in the mods
        </h2>
        <p className="mx-auto mt-4 max-w-[420px] text-base/6 text-body">
          These creators built the mods they always wanted with Gaimer. Now their communities play them every day.
        </p>
        <a href="#cta" className="mt-8 inline-flex items-center gap-1.5 py-2.5 text-sm font-[480] text-ink hover:opacity-70">
          See all creator stories <ChevronRight className="size-3.5" />
        </a>
      </div>

      {isLg ? (
        <div className="relative mt-16 h-[528px]" aria-live="polite">
          {slots.map((abs) => {
            const off = abs - pos
            const s = stories[wrap(abs, n)]
            const active = off === 0
            // Box grows/shrinks and slides; the full card is laid out at its final 720px width inside it and
            // simply revealed (clipped), so text never re-wraps mid-animation. Tiles sit vertically centred.
            return (
              <div
                key={abs}
                className="absolute top-0 left-1/2 overflow-hidden rounded-2xl bg-muted-surface transition-[transform,width,height] duration-500 ease-out motion-reduce:transition-none"
                style={{
                  width: active ? ACTIVE_W : TILE_W,
                  height: active ? CARD_H : TILE_H,
                  transform: `translate(${slotX(off)}px, ${active ? 0 : (CARD_H - TILE_H) / 2}px)`,
                }}
              >
                <div
                  className={`absolute inset-y-0 left-0 w-[720px] transition-opacity duration-300 ${active ? 'opacity-100 delay-200' : 'pointer-events-none opacity-0'}`}
                  aria-hidden={!active}
                >
                  <StoryCard s={s} className="h-[528px]" />
                </div>
                <button
                  onClick={() => setPos(abs)}
                  aria-label={`Show story: ${s.team}`}
                  tabIndex={active ? -1 : 0}
                  className={`absolute inset-0 flex items-center justify-center text-2xl text-ink/80 transition-opacity duration-300 hover:bg-black/[0.03] ${
                    active ? 'pointer-events-none opacity-0' : 'opacity-100'
                  }`}
                >
                  <TeamMark name={s.team} />
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="mt-16 px-6">
          <StoryCard key={pos} s={stories[wrap(pos, n)]} className="mx-auto max-w-[720px] animate-[fade-in_400ms_ease-out]" />
        </div>
      )}

      <div className="mt-10 flex justify-center gap-3">
        <button
          onClick={() => setPos((p) => p - 1)}
          aria-label="Previous story"
          className="flex size-[46px] items-center justify-center rounded-md bg-surface shadow-button"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          onClick={() => setPos((p) => p + 1)}
          aria-label="Next story"
          className="flex size-[46px] items-center justify-center rounded-md bg-surface shadow-button"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  )
}
