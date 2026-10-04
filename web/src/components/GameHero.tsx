import { DownloadButton } from './Download'
import type { Game } from '../data/games'

// Replica of lovable.dev/product-managers' hero (measured at 1440px): 690px cream band under the nav,
// 80/72 bold title, 20px subtitle (max 512px), small button. The game's logo finishes the title
// ("Build mods for" + logo). Lovable's dotted side pattern is swapped for the game's key art, with a circular
// cream fade behind the copy (700px radius: the solid cream runs past the 690px height, so the art shows at the sides).
export function GameHero({ game }: { game: Game }) {
  return (
    <section className="relative mt-16 mb-10 flex min-h-[560px] items-center justify-center overflow-hidden bg-cream px-4 py-24 md:h-[690px]">
      <img src={game.hero} alt="" className="absolute inset-0 size-full object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_700px_at_50%_50%,var(--color-cream)_0%,var(--color-cream)_65%,rgb(247_244_237/0.6)_86%,transparent_100%)]"
      />
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="flex flex-col items-center text-[44px]/[44px] font-bold tracking-[-2px] text-[oklch(0.1_0_0)] md:text-[80px]/[72px] md:tracking-[-4px]">
          Build mods for
          <img
            src={game.logo}
            alt={game.name}
            className={`mt-6 w-[280px] object-contain drop-shadow-[0_2px_12px_rgb(247_244_237/0.9)] md:w-[420px] ${game.heroLogoClass ?? 'h-[80px] md:h-[110px]'}`}
          />
        </h1>
        <p className="mt-6 max-w-[512px] text-xl/[25px] font-[480] tracking-[-0.5px] text-ink">
          It’s never been easier to build mods for {game.short}. Describe what you want and Gaimer writes it, tests it
          and hot-reloads it into your game.
        </p>
        <DownloadButton size="sm" full className="mt-8" />
      </div>
    </section>
  )
}
