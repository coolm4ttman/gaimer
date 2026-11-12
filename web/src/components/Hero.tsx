import { ArrowRight } from 'lucide-react'
import { BorderBeam } from 'border-beam'
import { AppWindow } from './AppWindow'

// border-beam's colour layers are sized in pixels for small cards, so on a window this big they shrink to dots.
// These overrides rescale them to the window: a bright colourful stroke and a matching inner glow.
const BEAM_COLOURS = 'rgb(40 140 255), rgb(100 70 255), rgb(240 50 180), rgb(255 50 100), rgb(255 120 40)'
const BEAM_CSS = `
[data-beam="{id}"][data-active]::after {
  padding: 1.5px;
  background: conic-gradient(from var(--beam-angle-{id}), transparent 0%, transparent 45%, ${BEAM_COLOURS}, transparent 95%);
  opacity: calc(var(--beam-opacity-{id}) * 0.95);
}
[data-beam="{id}"][data-active]::before {
  background: conic-gradient(from var(--beam-angle-{id}), transparent 0%, transparent 45%, ${BEAM_COLOURS}, transparent 95%);
  box-shadow: none;
  opacity: calc(var(--beam-opacity-{id}) * 0.35);
}
[data-beam="{id}"][data-active] [data-beam-bloom] {
  padding: 2px;
  opacity: calc(var(--beam-opacity-{id}) * 0.6);
}
`
import { DownloadButton } from './Download'
import { HeroBackdrop } from './HeroBackdrop'

// cursor.com / zed.dev-style hero: short left-aligned pitch with the download CTA, then the app itself as the
// product shot, sitting on a softened piece of game art the way Cursor uses a painted landscape.
export function Hero() {
  return (
    <section id="top" className="px-6 pt-32 pb-10 md:pt-36 md:pb-16">
      <div className="container-l">
        <h1 className="font-inter text-[32px]/[1.1] font-semibold tracking-[-1.28px] text-white md:text-5xl/[1.1] md:tracking-[-1.92px]">
          <span className="md:block">GAIMER is your AI mod builder</span> <span className="md:block">for the games you love</span>
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <DownloadButton />
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2.5 text-[15px] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.2)] transition-colors hover:bg-white/15"
          >
            See how it works <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-2xl p-4 sm:p-12 md:mt-16 lg:p-20">
          <HeroBackdrop />
          {/* Animated glow riding the app window's border (border-beam, libraries.dev/beam). */}
          <BorderBeam size="md" colorVariant="colorful" duration={6} theme="dark" css={BEAM_CSS} className="relative">
            <AppWindow />
          </BorderBeam>
        </div>
      </div>
    </section>
  )
}
