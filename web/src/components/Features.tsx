import { Archive, Cpu, Gamepad2, History, Monitor, Puzzle, Search, Share2, ShieldCheck, Zap } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

function PanelGlow() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-violet/35 via-brand-pink/10 to-transparent" />
  )
}

const glass = 'rounded-xl bg-[#232326]/95 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08),0_20px_40px_-12px_rgb(0_0_0/0.6)] backdrop-blur'

// Hot reload: the running game with a code change landing in it.
function HotReloadVisual() {
  return (
    <div className="relative flex h-full items-center justify-center px-6">
      <PanelGlow />
      <div className="relative w-full max-w-[460px] rounded-2xl p-[1.5px] [background:linear-gradient(180deg,var(--color-brand-violet),var(--color-brand-pink))] shadow-[0_0_60px_-10px_var(--color-brand-pink)]">
        <div className="overflow-hidden rounded-[15px] bg-[#1c1c1f]">
          <div className="flex items-center gap-1.5 px-3 py-2">
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
            <span className="mx-auto flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-0.5 text-[10px] text-white/60">
              <span className="size-1.5 rounded-full bg-emerald-400" /> SkyrimSE.exe · live
            </span>
          </div>
          <div className="relative aspect-[16/9]">
            <img src="/games/cards/skyrim-1.jpg" alt="Skyrim running with a mod loaded" className="size-full object-cover" />
            <div className="absolute top-3 left-3 rounded-md border border-brand-amber/70 bg-black/65 px-2.5 py-1.5 text-white shadow-[0_0_20px_-4px_var(--color-brand-amber)]">
              <div className="text-[8px] tracking-[0.2em] text-brand-amber uppercase">Legendary</div>
              <div className="font-serif text-[12px]">Dragonbone Greatsword</div>
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute bottom-8 left-1/2 w-[300px] -translate-x-1/2 p-3 font-mono text-[10.5px] text-white/80 ${glass}`}>
        <div className="flex items-center justify-between text-white/50">
          <span>scripts/DragonLoot.psc</span>
          <span className="text-emerald-400">+3 −1</span>
        </div>
        <div className="mt-2 space-y-0.5">
          <div className="rounded bg-rose-500/15 px-1.5 text-rose-300">− float dropChance = 0.02</div>
          <div className="rounded bg-emerald-500/15 px-1.5 text-emerald-300">+ float dropChance = 0.05</div>
        </div>
        <div className="mt-2 flex items-center gap-1.5 font-sans text-[11px] text-brand-amber">
          <Zap className="size-3" /> Reloaded in 0.8s · no restart
        </div>
      </div>
    </div>
  )
}

// Mod loaders: the real community tooling for each supported game, all connected.
function LoadersVisual() {
  const loaders: [string, string][] = [
    ['Script Hook V', 'GTA V'],
    ['Fabric', 'Minecraft'],
    ['NeoForge', 'Minecraft'],
    ['SKSE', 'Skyrim'],
    ['REDmod', 'Cyberpunk 2077'],
    ['Cyber Engine Tweaks', 'Cyberpunk 2077'],
    ['ModEngine 2', 'Elden Ring'],
    ['ScriptHookRDR2', 'Red Dead 2'],
  ]
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-6 px-6">
      <PanelGlow />
      <div className="brand-gradient relative flex size-16 items-center justify-center rounded-2xl shadow-[0_0_40px_-6px_var(--color-brand-pink)]">
        <img src="/brand/icon.svg" alt="" className="size-9 brightness-0 invert" />
      </div>
      <ul className="relative grid w-full max-w-[460px] grid-cols-2 gap-2">
        {loaders.map(([name, game]) => (
          <li key={name} className="flex items-center gap-2.5 rounded-lg bg-white/[0.05] px-3 py-2 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.07)]">
            <span className="size-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_rgb(52_211_153)]" />
            <span className="min-w-0">
              <span className="block truncate font-mono text-[11px] text-white/90">{name}</span>
              <span className="block truncate text-[10px] text-white/45">{game}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Game index: what Gaimer has read from the install, and a search across it.
function IndexVisual() {
  const counts: [string, string, number][] = [
    ['Papyrus scripts', '12,408', 100],
    ['Plugin records', '486,211', 100],
    ['Meshes and textures', '31,950', 100],
    ['Installed mods', '214', 72],
  ]
  return (
    <div className="relative flex h-full items-center justify-center px-6">
      <PanelGlow />
      <div className={`relative w-full max-w-[440px] p-4 ${glass}`}>
        <div className="flex items-center justify-between text-[11px] text-white/60">
          <span className="flex items-center gap-1.5">
            <Gamepad2 className="size-3.5" /> Skyrim Special Edition
          </span>
          <span className="text-brand-amber">Indexing… 92%</span>
        </div>
        <ul className="mt-4 space-y-3">
          {counts.map(([label, n, pct]) => (
            <li key={label}>
              <div className="flex justify-between text-[11px]">
                <span className="text-white/70">{label}</span>
                <span className="font-mono text-white">{n}</span>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-white/10">
                <div className="brand-gradient-x h-full rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-5 rounded-lg bg-black/30 p-2.5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]">
          <div className="flex items-center gap-2 text-[11px] text-white/80">
            <Search className="size-3.5 text-white/40" /> dragon loot
          </div>
          <ul className="mt-2 space-y-1 font-mono text-[10px] text-white/55">
            <li>LItemDragonBonesLoot · leveled list · Skyrim.esm</li>
            <li>DragonActorScript.OnDeath · script · Dawnguard</li>
            <li>dragonboneGreatsword.nif · mesh · Update.esm</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Safe and reversible: every change is a checkpoint you can roll back to.
function SafeVisual() {
  const steps: [string, string, boolean?][] = [
    ['Raised legendary drop chance to 5%', 'now', true],
    ['Added weighted loot table', '4 min ago'],
    ['Save backed up · Dragonborn_142.ess', '6 min ago'],
    ['Conflict check · 214 mods, 0 conflicts', '6 min ago'],
  ]
  return (
    <div className="relative flex h-full items-center justify-center px-6">
      <PanelGlow />
      <div className={`relative w-full max-w-[440px] p-4 ${glass}`}>
        <div className="flex items-center gap-1.5 text-[11px] text-white/60">
          <History className="size-3.5" /> Dragon loot tables · history
        </div>
        <ol className="relative mt-4 space-y-3 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-white/15">
          {steps.map(([label, when, current]) => (
            <li key={label} className="relative flex items-center gap-3">
              <span className={`relative z-10 size-[15px] shrink-0 rounded-full border-2 ${current ? 'border-brand-amber bg-brand-amber/30' : 'border-white/30 bg-[#232326]'}`} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] text-white/90">{label}</span>
                <span className="block text-[10px] text-white/45">{when}</span>
              </span>
              {!current && <span className="shrink-0 rounded-md bg-white/10 px-2 py-1 text-[10px] text-white/80">Restore</span>}
            </li>
          ))}
        </ol>
        <div className="mt-4 flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-2 text-[11px] text-emerald-300">
          <ShieldCheck className="size-3.5" /> Your original game files are never modified
        </div>
      </div>
    </div>
  )
}

// Works anywhere: build on the desktop app, get the build on your phone, share it with your squad.
function AnywhereVisual() {
  return (
    <div className="relative flex h-full items-end justify-center gap-5 px-6">
      <PanelGlow />
      <div className="relative mb-[-30px] w-[420px] max-w-[70%] overflow-hidden rounded-t-xl bg-[#1c1c1f] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2 text-[10px] text-white/50">
          <img src="/brand/icon.svg" alt="" className="size-3" /> Gaimer
        </div>
        <img src="/games/cards/cyberpunk-2077-3.jpg" alt="" className="aspect-[16/10] w-full object-cover opacity-90" />
        <div className="space-y-1.5 p-3 pb-10">
          <div className="text-[11px] text-white/85">Netrunner perk tree</div>
          <div className="h-1 rounded-full bg-white/10">
            <div className="brand-gradient-x h-full w-full rounded-full" />
          </div>
          <div className="text-[10px] text-emerald-300">Build ready · v0.4.2</div>
        </div>
      </div>
      <div className="relative mb-[-16px] w-[150px] rounded-[26px] bg-[#1c1c1f] p-2.5 shadow-[0_0_0_1.5px_var(--color-brand-violet)]">
        <div className="mx-auto mb-3 h-3 w-12 rounded-full bg-black/60" />
        <div className="rounded-xl bg-white/[0.07] p-2.5">
          <div className="flex items-center gap-1.5 text-[9px] text-white/50">
            <img src="/brand/icon.svg" alt="" className="size-3" /> Gaimer · now
          </div>
          <div className="mt-1 text-[11px] text-white/90">Build ready to test</div>
          <div className="text-[10px] text-white/55">Netrunner perk tree v0.4.2</div>
        </div>
        <div className="mt-2 flex items-center justify-center gap-1 rounded-lg bg-white/10 py-1.5 text-[10px] text-white/85">
          <Share2 className="size-3" /> Share with squad
        </div>
        <div className="h-16" />
      </div>
    </div>
  )
}

const features: { title: string; body: string; icon: typeof Cpu; visual: ReactNode }[] = [
  {
    title: 'Hot reload, handled',
    body: 'Gaimer compiles and injects your changes into the running game. No restarts. Your mods and saves stay yours. Always.',
    icon: Zap,
    visual: <HotReloadVisual />,
  },
  {
    title: 'Your mod loader, connected',
    body: 'Connect to the tooling your game’s community already uses. No boilerplate to write or maintain.',
    icon: Puzzle,
    visual: <LoadersVisual />,
  },
  {
    title: 'Every game, indexed',
    body: 'Scripts, records, meshes and existing mods are indexed so every change fits how the game actually works.',
    icon: Gamepad2,
    visual: <IndexVisual />,
  },
  {
    title: 'Safe and reversible, as standard',
    body: 'Automatic save backups, conflict checks and one-click rollback for every single change.',
    icon: Archive,
    visual: <SafeVisual />,
  },
  {
    title: 'Works wherever, whenever',
    body: 'Build on desktop, check progress from your phone, and share builds with your squad from anywhere.',
    icon: Monitor,
    visual: <AnywhereVisual />,
  },
]

export function Features() {
  const [active, setActive] = useState(0)
  const panels = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    panels.current.forEach((p) => p && io.observe(p))
    return () => io.disconnect()
  }, [])

  return (
    <section id="features" className="scroll-mt-16 px-2">
      <div className="mx-auto max-w-[1216px] rounded-2xl bg-dark px-6 py-26 shadow-dark-section md:px-12 md:py-40">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[518px_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-[28px]/[1.1] font-semibold tracking-[-1.12px] text-white md:text-4xl/[1.1] md:tracking-[-1.44px]">
              For modding and beyond
            </h2>
            <p className="mt-4 text-lg/7 text-dark-body">
              Gaimer runs locally against your actual game install, so you can build mods that really work.
            </p>
            <ul className="mt-14 hidden lg:block">
              {features.map((f, i) => (
                <li key={f.title} className="border-b border-white/10">
                  <button
                    onClick={() => panels.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                    className="w-full pt-4 pb-2 text-left text-base/6 text-white"
                  >
                    {f.title}
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${active === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-3 text-sm/6 text-dark-body">{f.body}</p>
                      <div className="brand-gradient-x mb-[-1px] h-0.5 w-full" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            {features.map((f, i) => (
              <div key={f.title}>
                <div
                  ref={(el) => {
                    panels.current[i] = el
                  }}
                  data-i={i}
                  className="relative h-[360px] overflow-hidden rounded-xl bg-black/5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1)] md:h-[500px]"
                >
                  {f.visual}
                </div>
                <div className="mt-4 lg:hidden">
                  <h3 className="flex items-center gap-2 font-semibold text-white">
                    <f.icon className="size-4" /> {f.title}
                  </h3>
                  <p className="mt-1 text-sm/6 text-dark-body">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

