import { BadgeCheck, Coins, Rocket } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Proof } from '../components/Proof'

// PLACEHOLDER: creator programme details are illustrative until the programme is defined.
const perks: { title: string; body: string; icon: typeof Rocket }[] = [
  { title: 'Early access', body: 'Try new games and features before anyone else and shape what ships next.', icon: Rocket },
  { title: 'Featured mods', body: 'Get your best work in front of players on our site, socials and streams.', icon: BadgeCheck },
  { title: 'Creator rewards', body: 'Free Pro access and rewards for mods the community loves.', icon: Coins },
]

export function CreatorsPage() {
  return (
    <>
      <PageHeader eyebrow="Creators" title="Built by modders, for modders">
        Meet the creators shipping mods with Gaimer, and join the programme that backs them.
      </PageHeader>
      <section className="px-6">
        <div className="container-l grid gap-3 md:grid-cols-3">
          {perks.map((p) => (
            <article key={p.title} className="rounded-2xl bg-surface p-6 shadow-card">
              <p.icon className="size-5 text-brand-pink" />
              <h2 className="mt-4 text-base/6 font-semibold text-ink">{p.title}</h2>
              <p className="mt-2 text-sm/6 text-body">{p.body}</p>
            </article>
          ))}
        </div>
      </section>
      <Proof />
    </>
  )
}
