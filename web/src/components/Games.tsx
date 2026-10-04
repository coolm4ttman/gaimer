import { Link } from 'react-router'
import { games } from '../data/games'

// Lovable's "Trusted by top brands" block, with supported-game logos linking to each game's page.

export function Games() {
  return (
    <section id="games" className="scroll-mt-16 border-b border-black/10 pt-26 lg:pt-0">
      <div className="container-l grid items-center lg:grid-cols-[1fr_352px] lg:gap-16">
        {/* 3 columns x 2 rows; column rules run the full section height, logos sit either side of the middle. */}
        <div className="order-2 grid grid-cols-3 border-black/10 lg:order-1 lg:border-l">
          {games.map((g, i) => (
            <Link
              key={g.slug}
              to={`/games/${g.slug}`}
              className={`flex h-[120px] items-center justify-center border-r border-black/10 px-4 transition-colors hover:bg-black/[0.02] lg:h-[210px] ${
                i < 3 ? 'lg:items-end lg:pb-10' : 'lg:items-start lg:pt-10'
              }`}
            >
              <img src={g.logo} alt={g.name} loading="lazy" className={`${g.logoClass} w-auto max-w-[70%] object-contain`} />
            </Link>
          ))}
        </div>
        <div className="order-1 px-6 pb-16 lg:order-2 lg:px-0 lg:pb-0">
          <h2 className="text-[28px]/[1.1] font-semibold tracking-[-1.12px] text-ink">Built for the games you play</h2>
          <p className="mt-4 text-lg/7 text-body">
            Modders everywhere use Gaimer to build the content their games are missing. Join them today and mod the game
            you can’t stop playing.
          </p>
          <Link
            to="/games"
            className="mt-10 inline-block rounded-md bg-surface px-4 py-[9.5px] text-[13px]/[21px] font-semibold text-ink shadow-button transition-colors hover:bg-black/[0.02]"
          >
            See all games
          </Link>
        </div>
      </div>
    </section>
  )
}
