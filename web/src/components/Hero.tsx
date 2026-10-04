import { DownloadButton } from './Download'
import { HeroVideo } from './HeroVideo'

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden px-6 [@media(max-height:400px)]:justify-start [@media(max-height:400px)]:pt-24"
    >
      <HeroVideo />
      <div className="relative z-10 flex w-full flex-col items-center text-center [text-shadow:0_2px_20px_rgb(0_0_0/0.45)]">
        <img
          src="/brand/logo-light.webp"
          alt="Gaimer"
          className="mb-8 h-14 w-auto drop-shadow-[0_4px_24px_rgb(0_0_0/0.35)] md:h-20"
        />
        <h1 className="max-w-[720px] text-[32px]/[1.1] font-semibold tracking-[-1.28px] text-balance text-white md:text-5xl/[1.1] md:tracking-[-1.92px]">
          Gaimer is your AI mod builder for the games you love.
        </h1>
        <p className="mt-4 mb-8 max-w-[520px] text-base/6 text-white/85 text-pretty md:text-lg/7">
          Mod any game, add new mechanics, or build entire worlds, just by describing them.
        </p>
        <DownloadButton />
      </div>
    </section>
  )
}
