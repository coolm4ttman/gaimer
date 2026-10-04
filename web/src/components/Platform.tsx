import { Check, FolderTree, GitBranch, Layers, LoaderCircle, Package, Puzzle, Rocket, Shield, SlidersHorizontal } from 'lucide-react'

// "One editor. Endless mods." – three cards with small product mockups. The home page and every game page
// render this with their own copy (see PlatformContent); game pages swap the mockups for a matching picture.
// Card copy is sized so titles fit on one line and bodies run to three lines at desktop width.

export interface PlatformContent {
  heading: string
  intro: string
  idea: { title: string; body: string; prompt: string; steps?: string[] }
  refine: { title: string; body: string; mod: string; detail: string; image?: string }
  stack: { title: string; body: string; rows: string[]; active: number; details?: string[] }
  // Game pages: one picture per card that shows what the card says, used instead of the mockups.
  // `contain` is for cut-out art (transparent PNGs) that shouldn't be cropped.
  images?: { src: string; alt: string; contain?: boolean }[]
}

const homeContent: PlatformContent = {
  heading: 'One editor. Endless mods.',
  intro: 'If you can describe it, you can mod it. Create, test, and ship entire mods and total conversions from scratch.',
  idea: {
    title: 'Describe it. Gaimer builds it.',
    body: 'Describe what you want in plain language and watch Gaimer write real mod code with you, in real time, as you play.',
    prompt: 'Make dragons drop legendary loot in Skyrim',
    steps: ['Read Skyrim.esm · 14 dragon loot lists', 'Wrote DragonLoot.psc · +48 lines', 'Hot-reloading into Skyrim…'],
  },
  refine: {
    title: 'Refine your mod and ship it',
    body: 'Iterate in-game until every detail feels right, then package your mod and start playing it with friends straight away.',
    mod: 'Dragonbone Greatsword',
    detail: 'Legendary drop · 5% chance',
    image: '/games/cards/skyrim-1.jpg',
  },
  stack: {
    title: 'Depend on Gaimer, end to end',
    body: 'Gaimer handles the whole pipeline, from reading game files and mod loaders to save backups, packaging and publishing.',
    rows: ['Game index', 'Assets', 'Mod loaders', 'Save backups', 'Versions', 'Packaging', 'Publish'],
    active: 2,
    details: ['SKSE 2.2.6 detected', 'Address Library installed', '214 mods scanned, 0 conflicts', 'Save backed up 2 min ago'],
  },
}

const stackIcons = [Layers, FolderTree, Puzzle, Shield, GitBranch, Package, Rocket]

// Prompt in, agent working: the request and the first steps Gaimer takes.
function IdeaVisual({ prompt, steps = [] }: { prompt: string; steps?: string[] }) {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute top-10 left-8 h-[200px] w-[420px] rounded-[32px] bg-gradient-to-r from-brand-violet/40 via-brand-pink/30 to-brand-amber/20 blur-xl" />
      <div className="absolute top-6 right-6 left-6 rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_20px_40px_-12px_rgb(0_0_0/0.2)]">
        <div className="ml-auto w-fit max-w-[90%] rounded-xl bg-black/[0.05] px-3 py-2 text-[12.5px]/5 text-ink">{prompt}</div>
        <ul className="mt-3 space-y-1.5">
          {steps.map((step, i) => {
            const last = i === steps.length - 1
            return (
              <li key={step} className={`flex items-center gap-2 text-[11.5px] ${last ? 'font-medium text-brand-violet' : 'text-subtle'}`}>
                {last ? <LoaderCircle className="size-3.5 animate-spin" /> : <Check className="size-3.5 text-emerald-600" />}
                {step}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

// In-game check: the mod running, with the one value you're tuning and the ship button.
function RefineVisual({ mod, detail, image }: { mod: string; detail: string; image?: string }) {
  return (
    <div className="relative h-full overflow-hidden bg-[#1c1c1f]">
      {image && <img src={image} alt="" className="absolute inset-0 size-full object-cover" />}
      <div className="absolute top-4 left-4 rounded-md border border-brand-amber/70 bg-black/65 px-2.5 py-1.5 text-white shadow-[0_0_20px_-4px_var(--color-brand-amber)]">
        <div className="text-[8px] tracking-[0.2em] text-brand-amber uppercase">Legendary</div>
        <div className="font-serif text-[12px]">{mod}</div>
      </div>
      <div className="absolute right-4 bottom-4 left-4 rounded-xl bg-surface/95 p-3 shadow-[0_8px_24px_-8px_rgb(0_0_0/0.4)] backdrop-blur">
        <div className="flex items-center justify-between text-[11px] text-ink">
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="size-3.5 text-subtle" /> Drop chance
          </span>
          <span className="font-mono">5%</span>
        </div>
        <div className="relative mt-2 h-1 rounded-full bg-black/10">
          <div className="brand-gradient-x h-full w-[35%] rounded-full" />
          <span className="absolute top-1/2 left-[35%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.2)]" />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10.5px] text-subtle">{detail}</span>
          <span className="download-gradient flex items-center gap-1 rounded-md px-2 py-1 text-[10.5px] text-white">
            <Package className="size-3" /> Package mod
          </span>
        </div>
      </div>
    </div>
  )
}

// The pipeline, with the selected step's live status filled in.
function StackVisual({ rows, active, details = [] }: { rows: string[]; active: number; details?: string[] }) {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-brand-orange/25 to-transparent" />
      <div className="absolute top-6 right-0 bottom-0 left-6 flex gap-3">
        <ul className="w-36 shrink-0 space-y-1 pt-2 text-[11px]">
          {rows.map((label, i) => {
            const Icon = stackIcons[i % stackIcons.length]
            return (
              <li
                key={label}
                className={`flex items-center gap-2 rounded-md px-2 py-1 ${i === active ? 'bg-black/5 font-medium text-ink' : 'text-subtle'}`}
              >
                <Icon className="size-3.5 shrink-0" /> <span className="truncate">{label}</span>
              </li>
            )
          })}
        </ul>
        <div className="flex-1 rounded-tl-xl bg-surface p-3 shadow-[0_0_0_1px_rgb(0_0_0/0.06)]">
          <div className="text-[11px] font-medium text-ink">{rows[active]}</div>
          <ul className="mt-2.5 space-y-2">
            {details.map((d) => (
              <li key={d} className="flex items-start gap-1.5 text-[10.5px]/4 text-subtle">
                <Check className="mt-px size-3 shrink-0 text-emerald-600" /> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function Platform({ content = homeContent }: { content?: PlatformContent }) {
  const { heading, intro, idea, refine, stack, images } = content
  const cards = [
    { title: idea.title, body: idea.body, visual: <IdeaVisual prompt={idea.prompt} steps={idea.steps} /> },
    { title: refine.title, body: refine.body, visual: <RefineVisual mod={refine.mod} detail={refine.detail} image={refine.image} /> },
    { title: stack.title, body: stack.body, visual: <StackVisual rows={stack.rows} active={stack.active} details={stack.details} /> },
  ]

  return (
    <section id="platform" className="scroll-mt-16 px-6 py-26 md:py-40">
      <div className="container-l">
        <h2 className="text-[28px]/[1.1] font-semibold tracking-[-1.12px] text-ink md:text-4xl/[1.1] md:tracking-[-1.44px]">{heading}</h2>
        <p className="mt-4 max-w-[412px] text-base/6 text-body">{intro}</p>
        <div className="mt-17 grid gap-3 md:grid-cols-3">
          {cards.map((c, i) => (
            <article key={c.title} className="flex flex-col overflow-hidden rounded-2xl bg-surface shadow-card md:min-h-[425px]">
              <div className="relative h-[230px] overflow-hidden md:h-[273px]">
                {images?.[i] ? (
                  <img
                    src={images[i].src}
                    alt={images[i].alt}
                    loading="lazy"
                    className={`size-full ${images[i].contain ? 'bg-gradient-to-b from-[#9fd3ff] to-[#d8f0c8] object-contain pt-4' : 'object-cover'}`}
                  />
                ) : (
                  c.visual
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-base/6 font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm/6 text-body">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
