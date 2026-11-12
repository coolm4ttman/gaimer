import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DARK_LOGOS, games } from '../data/games'

// CONCEPT stories: fictional creators, quotes and numbers for this concept site.
const stories = [
  {
    game: 'skyrim',
    intro: 'A solo modder rebuilt Skyrim as a survival horror game over one weekend, with dragons that hunt by sound.',
    quote: '“I described the mechanic and had it running in-game before lunch. That never happens.”',
    stats: [
      ['48h', 'from idea to release'],
      ['14', 'mechanics added'],
      ['220k', 'downloads'],
    ],
    person: 'Maya Okafor',
    role: 'Solo modder, Skyrim',
  },
  {
    game: 'minecraft',
    intro: 'A first-time modder shipped a full co-op base-building mode for Minecraft in three days.',
    quote: '“I’d never written a line of Java. GAIMER read the game, explained it, and built it with me.”',
    stats: [
      ['3 days', 'from idea to release'],
      ['12', 'mechanics added'],
      ['85k', 'downloads'],
    ],
    person: 'Leo Brandt',
    role: 'Solo modder, Minecraft',
  },
  {
    game: 'cyberpunk-2077',
    intro: 'A long-time Cyberpunk 2077 modder moved their whole workflow to GAIMER and now ships twice as often.',
    quote: '“Hot reload alone changed how I work. I iterate inside the game now, not around it.”',
    stats: [
      ['5 days', 'from idea to release'],
      ['21', 'mechanics added'],
      ['310k', 'downloads'],
    ],
    person: 'Sam Whitlock',
    role: 'Solo modder, Cyberpunk 2077',
  },
]

type Story = (typeof stories)[number]

// Logo of the game the story's mod was built for. Black logos turn white on the dark home page.
function GameMark({ slug, className = '' }: { slug: string; className?: string }) {
  const game = games.find((g) => g.slug === slug)!
  const invert = DARK_LOGOS.has(slug) ? 'in-[.theme-dark]:brightness-0 in-[.theme-dark]:invert' : ''
  return <img src={game.logo} alt={game.name} className={`w-auto object-contain ${invert} ${className}`} />
}

function StoryCard({ s, className = '' }: { s: Story; className?: string }) {
  return (
    <article className={`flex flex-col rounded-2xl bg-muted-surface px-6 pt-8 pb-6 md:px-10 md:pt-10 md:pb-8 ${className}`}>
      <GameMark slug={s.game} className="h-9 max-w-[220px] self-start object-left" />
      <div className="mt-6 grid items-start gap-8 md:grid-cols-[1fr_180px] md:gap-10">
        <div>
          <p className="text-sm/6 text-body">{s.intro}</p>
          <blockquote className="mt-6 border-l border-ink/60 pl-5 text-xl/7 font-[480] text-ink/90 md:text-2xl/8">
            {s.quote}
          </blockquote>
        </div>
        <dl className="grid grid-cols-3 gap-3 md:block md:space-y-4">
          {s.stats.map(([v, l]) => (
            <div key={l}>
              <dd className="text-[22px]/[1.1] font-[480] tracking-[-0.6px] text-ink md:text-[32px]/[1.1] md:tracking-[-1px]">{v}</dd>
              <dt className="mt-1 text-xs text-body">{l}</dt>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="download-gradient flex size-12 items-center justify-center rounded-lg font-semibold text-white">
            {s.person
              .split(' ')
              .map((w) => w[0])
              .join('')}
          </div>
          <div>
            <div className="text-sm text-ink">{s.person}</div>
            <div className="text-xs text-body">{s.role}</div>
          </div>
        </div>
        <a href="#cta" className="inline-flex shrink-0 items-center gap-2 rounded-md bg-surface px-3 py-2 text-[13px] whitespace-nowrap font-semibold text-ink shadow-button">
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
const CARD_H = 410
const TILE_H = 320
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
      className="scroll-mt-16 overflow-hidden pt-16 pb-13 md:pt-40 md:pb-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="px-6 text-center">
        <h2 className="text-[28px]/[1.1] font-semibold tracking-[-1.12px] text-ink md:text-4xl/[1.1] md:tracking-[-1.44px]">
          The proof is in the mods
        </h2>
        <p className="mx-auto mt-4 max-w-[420px] text-base/6 text-body">
          These creators built the mods they always wanted with GAIMER. Now their communities play them every day.
        </p>
        <a href="#cta" className="mt-8 inline-flex items-center gap-1.5 py-2.5 text-sm font-[480] text-ink hover:opacity-70">
          See all creator stories <ChevronRight className="size-3.5" />
        </a>
      </div>

      {isLg ? (
        <div className="relative mt-16 h-[410px]" aria-live="polite">
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
                  <StoryCard s={s} className="h-[410px]" />
                </div>
                <button
                  onClick={() => setPos(abs)}
                  aria-label={`Show story: ${games.find((g) => g.slug === s.game)!.short}`}
                  tabIndex={active ? -1 : 0}
                  className={`absolute inset-0 flex items-center justify-center text-2xl text-ink/80 transition-opacity duration-300 hover:bg-ink/[0.04] ${
                    active ? 'pointer-events-none opacity-0' : 'opacity-100'
                  }`}
                >
                  <GameMark slug={s.game} className="max-h-14 max-w-[70%]" />
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
          className="flex size-[46px] items-center justify-center rounded-md bg-surface text-ink shadow-button transition-colors hover:bg-ink/[0.08]"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          onClick={() => setPos((p) => p + 1)}
          aria-label="Next story"
          className="flex size-[46px] items-center justify-center rounded-md bg-surface text-ink shadow-button transition-colors hover:bg-ink/[0.08]"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  )
}
