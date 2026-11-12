import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { PageHeader } from '../components/PageHeader'
import { DARK_LOGOS, games } from '../data/games'

export function GamesPage() {
  return (
    <div className="theme-dark">
      <div className="grad-down">
        <PageHeader eyebrow="Games" wide title="Mod the games you can’t stop playing">
          GAIMER reads each game’s files and works with the mod loaders its community already uses. Pick a game to see
          what you can build.
        </PageHeader>
      </div>
      <section className="grad-up px-6 pt-4 pb-26 md:pb-40">
        <div className="container-l grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <Link
              key={g.slug}
              to={`/games/${g.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white/[0.04] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)] p-2 transition-colors hover:bg-white/[0.07]"
            >
              <div className="flex h-40 items-center justify-center rounded-2xl bg-[#1a1a1a]">
                <img
                  src={g.logo}
                  alt=""
                  className={`${g.logoClass} w-auto max-w-[60%] object-contain ${DARK_LOGOS.has(g.slug) ? 'brightness-0 invert' : ''}`}
                />
              </div>
              <div className="flex flex-1 flex-col p-4 pt-5">
                <h2 className="text-base/6 font-semibold text-ink">{g.name}</h2>
                <p className="mt-2 flex-1 text-sm/6 text-body">{g.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-[480] text-ink group-hover:opacity-70">
                  Mod {g.short} <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
