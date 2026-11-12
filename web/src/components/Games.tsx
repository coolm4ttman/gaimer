import { DARK_LOGOS } from '../data/games'
import { Link } from 'react-router'
import { games } from '../data/games'

// Supported-game logos, boxed like the feature boxes above and sitting on the same dark gradient. The logos are
// shown on a #1A1A1A panel; the all-black logos (Skyrim, Elden Ring, Cyberpunk) are rendered white so they read on it.
// Logos drawn in black; on the dark panel they're shown in white.

export function Games() {
  return (
    <section id="games" className="scroll-mt-16 px-4 py-16 sm:px-6 md:py-32">
      <article className="container-l grid gap-2 rounded-3xl bg-white/[0.04] p-2 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)] lg:grid-cols-[1fr_380px]">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl bg-[#1a1a1a] sm:grid-cols-3">
          {games.map((g, i) => (
            <Link
              key={g.slug}
              to={`/games/${g.slug}`}
              className={`flex h-[120px] items-center justify-center border-white/[0.07] px-4 transition-colors hover:bg-white/[0.03] lg:h-[180px] ${
                i % 3 !== 2 ? 'sm:border-r' : ''
              } ${i < 3 ? 'sm:border-b' : ''} ${i % 2 === 0 ? 'max-sm:border-r' : ''} ${i < 4 ? 'max-sm:border-b' : ''}`}
            >
              <img src={g.logo} alt={g.name} loading="lazy" className={`${g.logoClass} w-auto max-w-[70%] object-contain ${DARK_LOGOS.has(g.slug) ? 'brightness-0 invert' : ''}`} />
            </Link>
          ))}
        </div>
        <div className="flex flex-col justify-center p-6 md:p-10">
          <h2 className="text-[18px]/[1.15] font-semibold tracking-[-0.5px] text-white md:text-[26px]/[1.15] md:tracking-[-0.9px]">Built for the games you play</h2>
          <p className="mt-4 text-base/6 text-white/65">
            Modders everywhere use GAIMER to build the content their games are missing. Join them today and mod the game
            you can’t stop playing.
          </p>
          <Link
            to="/games"
            className="mt-8 inline-block w-fit rounded-lg bg-white/10 px-4 py-2 text-[13px]/[21px] font-semibold text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.2)] transition-colors hover:bg-white/15"
          >
            See all games
          </Link>
        </div>
      </article>
    </section>
  )
}
