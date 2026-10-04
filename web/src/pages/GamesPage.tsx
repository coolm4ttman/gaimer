import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { PageHeader } from '../components/PageHeader'
import { games } from '../data/games'

export function GamesPage() {
  return (
    <>
      <PageHeader eyebrow="Games" title="Mod the games you can’t stop playing">
        Gaimer reads each game’s files and works with the mod loaders its community already uses. Pick a game to see what
        you can build.
      </PageHeader>
      <section className="px-6 pb-26 md:pb-40">
        <div className="container-l grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <Link
              key={g.slug}
              to={`/games/${g.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-surface shadow-card transition-shadow hover:shadow-prompt"
            >
              <div className="flex h-40 items-center justify-center bg-muted-surface">
                <img src={g.logo} alt="" className={`${g.logoClass} w-auto max-w-[60%] object-contain`} />
              </div>
              <div className="flex flex-1 flex-col p-6">
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
    </>
  )
}
