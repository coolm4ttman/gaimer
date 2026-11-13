import { Check, FileCode2, Lightbulb, Plus, Sparkles } from 'lucide-react'
import type { GameShowcase as Content } from '../data/gameShowcase'
import { DownloadButton } from './Download'
import { Bar, card, panel } from './Showcase'

// Game-page sections (the home page covers how GAIMER works in general):
// 1. Example mods for this game: what you'd type and what GAIMER makes.
// 2. How GAIMER fits this game's toolchain: language, framework, testing, output and install.

const box = 'rounded-3xl bg-white/[0.04] p-2 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]'

export function GameIdeas({ name, content: c }: { name: string; content: Content }) {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-28">
      <div className="container-l">
        <h2 className="text-[28px]/[1.1] font-semibold tracking-[-1.12px] text-white md:text-4xl/[1.1] md:tracking-[-1.44px]">
          What you can build in {name}
        </h2>
        <p className="mt-4 max-w-[560px] text-base/6 text-white/65 md:text-lg/7">{c.intro}</p>
        {/* One boxed row per idea, sides alternating: copy on one side, the game screenshot with GAIMER's chat (the
            prompt, then this game's build and test steps) on the other. Same format as the toolchain box below. */}
        <div className="mt-10 space-y-6 md:mt-14">
          {c.ideas.map((idea, i) => {
            const steps = [
              `Writing ${c.toolchain.rows[0][1].split(',')[0]}`,
              `${c.toolchain.rows[2][0]} ${c.toolchain.rows[2][1].replace(/^A /, 'a ')}`,
              'Saved v1 · ready to export',
            ]
            return (
              <article key={idea.prompt} className={`${box} grid gap-2 lg:grid-cols-2`}>
                <div className={`flex flex-col justify-center p-6 md:p-10 ${i % 2 ? 'lg:order-2' : ''}`}>
                  <span className="w-fit rounded-full bg-white/[0.08] px-2.5 py-0.5 text-xs text-white/70">{idea.tag}</span>
                  <h3 className="mt-4 text-[22px]/[1.15] font-semibold tracking-[-0.7px] text-balance text-white md:text-[28px]/[1.15] md:tracking-[-1px]">
                    {idea.prompt.replace(/\.$/, '')}
                  </h3>
                  <p className="mt-4 max-w-[440px] text-base/6 text-white/65">{idea.result}</p>
                </div>
                {/* Square art panel (as on the home page) holding a full-height slice of the GAIMER app. */}
                <div className="relative h-[440px] overflow-hidden sm:h-[560px] rounded-2xl lg:aspect-square lg:h-auto">
                  <img
                    src={idea.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    style={{ objectPosition: idea.focus ?? '50% 50%' }}
                    className={`absolute inset-0 size-full ${idea.contain ? 'bg-gradient-to-b from-[#9fd3ff] to-[#d8f0c8] object-contain pt-6' : 'object-cover'}`}
                  />
                  <div className="absolute inset-x-3 bottom-3 sm:inset-[7%]">
                    <div className={`${panel.replace('bg-[#0f0f13] ', '')} flex flex-col overflow-hidden bg-[#0f0f13]/80 sm:h-full text-[11.5px]/[1.55] backdrop-blur`}>
                      <Bar title={`${idea.tag} mod`} />
                      <div className="flex items-center gap-3 border-b border-white/[0.07] px-3 py-1.5 text-[10px]">
                        <span className="font-medium">Agent</span>
                        <span className="text-[#5c5c66]">Components</span>
                        <Plus className="ml-auto size-3 text-[#5c5c66]" />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 overflow-hidden p-3">
                        <div className={`${card.replace(' bg-[#16161c]', '')} bg-[#16161c]/80 px-2.5 py-2`}>{idea.prompt}</div>
                        <div className="flex items-center gap-2 text-[10px] text-[#80808c]">
                          <Lightbulb className="size-3 text-[#5c5c66]" /> Thought for 6s
                        </div>
                        <ul className="space-y-1.5 text-[#b9b8c0]">
                          {steps.map((step) => (
                            <li key={step} className="flex items-center gap-2">
                              <Check className="size-3 shrink-0 text-[#4ccf8b]" /> {step}
                            </li>
                          ))}
                        </ul>
                        <p className="hidden text-[#d3d2d8] sm:block">{idea.result}</p>
                        <div className="rounded-lg border border-[#4ccf8b]/30 bg-[#4ccf8b]/[0.07] p-2.5">
                          <div className="flex items-center gap-2 font-medium">
                            <span className="flex size-5 items-center justify-center rounded-full bg-[#4ccf8b] text-[#0f0f13]">
                              <Check className="size-3" />
                            </span>
                            Built and tested
                            <span className="ml-auto text-[9.5px] font-normal text-[#80808c]">Saved v1</span>
                          </div>
                        </div>
                        <div className="mt-auto hidden sm:block">
                          <div className="text-[9px] tracking-[0.15em] text-[#5c5c66] uppercase">Files</div>
                          <ul className="mt-1.5 grid grid-cols-2 gap-1.5">
                            {c.toolchain.files.map((f) => (
                              <li key={f} className="flex items-center gap-1.5 truncate rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[10px] text-white/70">
                                <FileCode2 className="size-3 shrink-0 text-white/35" />
                                <span className="truncate">{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="m-3 mt-0 hidden rounded-xl sm:block border border-[#8b5cf6]/55 bg-[#16161c]/80 px-3 py-2 text-[11px] text-[#5c5c66] shadow-[0_0_0_3px_rgb(139_92_246/0.14)]">
                        Describe a change, or ask a question
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function GameToolchain({ name, hero, content: c }: { name: string; hero: string; content: Content }) {
  const t = c.toolchain
  return (
    <section className="px-4 py-16 sm:px-6 md:py-28">
      <div className="container-l">
        <article className={`${box} grid gap-2 lg:grid-cols-2`}>
          <div className="flex flex-col justify-center p-6 md:p-10">
            <h2 className="text-[24px]/[1.15] font-semibold tracking-[-0.8px] text-balance text-white md:text-[32px]/[1.15] md:tracking-[-1.1px]">
              How GAIMER works with {name}
            </h2>
            <p className="mt-4 max-w-[440px] text-base/6 text-white/65">{t.body}</p>
            <DownloadButton size="sm" full className="mt-8 w-fit" />
          </div>
          <div className="relative overflow-hidden rounded-2xl p-4 sm:p-[7%]">
            <img src={hero} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 size-full object-cover" />
            <div className="relative rounded-xl bg-[#0f0f13]/80 text-[#ecebe8] shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_30px_60px_-20px_rgb(0_0_0/0.65)] backdrop-blur">
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3 text-xs">
                <Sparkles className="size-3.5 text-[#c4b0ff]" /> {name} toolchain
              </div>
              <dl className="divide-y divide-white/[0.06] px-4">
                {t.rows.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[96px_1fr] gap-3 py-2.5 text-sm/5">
                    <dt className="text-white/45">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="border-t border-white/[0.07] px-4 py-3">
                <div className="text-[10px] tracking-[0.15em] text-white/35 uppercase">Example project</div>
                <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {t.files.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 truncate rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-white/75">
                      <FileCode2 className="size-3 shrink-0 text-white/35" />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
