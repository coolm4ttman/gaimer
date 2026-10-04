import { ArrowRight, CalendarDays, MessageCircle, Search, Users } from 'lucide-react'
import { useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { Faq } from '../components/Faq'
import { Globe } from '../components/Globe'

// Replica of lovable.dev/community (measured at 1440px): cream hero with pill, 80/72 title, 20px subtitle,
// two buttons and a scatter of tilted "polaroid" photos; a 36px statement with inline icon chips and three
// tilted join cards; events intro with a stats row; events finder; a wall of member avatars; a partner block
// over a soft glow; and the boxed FAQ on cream.
// PLACEHOLDER: links, stats, events, members and FAQ answers – replace with real community data.

const DISCORD_URL = '#'

const filled =
  'inline-flex items-center rounded-lg bg-brand px-2.5 py-1.5 text-sm/[21px] text-white transition-opacity hover:opacity-90'
const outline =
  'inline-flex items-center rounded-lg px-2.5 py-1.5 text-sm/[21px] text-[oklch(0.1_0_0)] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.15)] transition-colors hover:bg-black/[0.03]'
const lift = 'shadow-[0_0_0_1px_rgb(0_0_0/0.04),0_2px_4px_rgb(0_0_0/0.04),0_12px_32px_-8px_rgb(0_0_0/0.12)]'

// Hero photos: [left, top, width, height, rotate] relative to the 1120px content box, as measured.
const photos: [string, string, number, number, number, number, number][] = [
  ['/games/cards/gta-v-2.jpg', 'A police chase in GTA V', -15, 16, 357, 280, -3],
  ['/games/heroes/minecraft.jpg', 'Friends exploring a Minecraft world', 410, 0, 344, 429, -6],
  ['/games/cards/skyrim-2.jpg', 'Exploring Whiterun in Skyrim', 807, 37, 253, 318, 4],
  ['/games/cards/elden-ring-2.jpg', 'A dragon fight in Elden Ring', 109, 339, 353, 274, 2],
  ['/games/cards/red-dead-redemption-2-2.jpg', 'Riders at sunset in Red Dead Redemption 2', 668, 353, 361, 285, -4],
]

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className={`mx-1 inline-flex size-9 -translate-y-1 items-center justify-center rounded-2xl bg-page align-middle text-subtle ${lift}`}>
      {children}
    </span>
  )
}

const joinCards: { title: string; cta: string; href: string; style: string }[] = [
  { title: 'Join IRL', cta: 'Explore events', href: '#events', style: 'lg:translate-y-16 lg:-rotate-2' },
  { title: 'Join online', cta: 'Join our Discord', href: DISCORD_URL, style: 'lg:translate-y-4 lg:rotate-1' },
  { title: 'Become a community leader', cta: 'Apply to programs', href: '#events', style: 'lg:-translate-y-8 lg:rotate-3' },
]

const stats = [
  ['00K+', 'Discord members'],
  ['000+', 'Community leaders'],
  ['000+', 'Events hosted globally'],
  ['00+', 'Countries with ambassadors'],
]

type EventType = 'Modding jam' | 'Workshop' | 'Meetup' | 'Online'
const events: { month: string; title: string; date: string; place: string; type: EventType; img: string }[] = [
  { month: 'October 2026', title: 'Skyrim Modding Jam', date: 'October 10 – October 12, 2026', place: 'Online', type: 'Online', img: '/games/cards/skyrim-1.jpg' },
  { month: 'October 2026', title: 'London Mod Night', date: 'October 16, 2026', place: 'London, United Kingdom', type: 'Meetup', img: '/games/cards/cyberpunk-2077-3.jpg' },
  { month: 'October 2026', title: 'Minecraft Mod Workshop', date: 'October 22, 2026', place: 'Berlin, Germany', type: 'Workshop', img: '/games/heroes/minecraft.jpg' },
  { month: 'November 2026', title: 'GTA V Story Mod Jam', date: 'November 6 – November 8, 2026', place: 'Los Angeles, United States', type: 'Modding jam', img: '/games/cards/gta-v-1.jpg' },
  { month: 'November 2026', title: 'Elden Ring Boss Rework Weekend', date: 'November 14 – November 15, 2026', place: 'Online', type: 'Online', img: '/games/cards/elden-ring-1.jpg' },
  { month: 'November 2026', title: 'Red Dead Frontier Jam', date: 'November 21, 2026', place: 'Austin, United States', type: 'Modding jam', img: '/games/cards/red-dead-redemption-2-1.jpg' },
]
const eventTypes: ('All' | EventType)[] = ['All', 'Modding jam', 'Workshop', 'Meetup', 'Online']

// Member wall: rows of 3/4 above the title and 4/3 below, offset like the original.
// PLACEHOLDER stock portraits (randomuser.me) – replace with real members, with their permission, before launch.
const members = Array.from({ length: 14 }, (_, i) => `/community/member-${i + 1}.jpg`)

const faqs: [string, string][] = [
  ['How do I join the Gaimer community?', 'Join our Discord to chat with other modders straight away, or find an event near you and come along in person.'],
  ['Do I need to be technical to get involved?', 'No. Plenty of members have never written code. If you can describe the mod you want, you’ll fit right in.'],
  ['How do I find or host a Gaimer event?', 'Browse upcoming events on this page. To host your own, apply through the form and we’ll help with the rest.'],
  ['What happens at a modding jam?', 'Teams pick a game and a theme, build a mod over a day or a weekend, then show it off. Everyone plays everyone else’s mods at the end.'],
  ['Can I be part of more than one community program?', 'Yes. Many community leaders also run events or take part in the creator programme.'],
  ['Do I need to speak English to take part?', 'No. There are channels and events in many languages, run by members around the world.'],
  ['What does it cost?', 'Joining the community and coming to events is free.'],
  ['I have a question that isn’t listed here.', 'Ask in the Discord help channel and someone from the team or the community will get back to you.'],
]

function EventsFinder() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<(typeof eventTypes)[number]>('All')
  const shown = useMemo(
    () => events.filter((e) => (type === 'All' || e.type === type) && e.title.toLowerCase().includes(query.trim().toLowerCase())),
    [query, type],
  )
  const months = [...new Set(shown.map((e) => e.month))]

  return (
    <div className="grid overflow-hidden rounded-2xl bg-[oklch(0.9699_0_107)] lg:h-[700px] lg:grid-cols-[1fr_400px]">
      <div className="relative flex items-center justify-center p-8">
        <Globe className="w-full max-w-[560px]" />
      </div>
      <div className="flex min-h-0 flex-col bg-cream p-6 lg:my-3 lg:mr-3 lg:rounded-xl">
        <h3 className="text-[28px]/[1.1] font-semibold tracking-[-0.8px] text-[oklch(0.1_0_0)]">Events</h3>
        <label className="relative mt-5 block">
          <span className="sr-only">Search events</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="h-9 w-full rounded-lg bg-page pr-3 pl-9 text-sm shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)] outline-none placeholder:text-subtle focus:shadow-[inset_0_0_0_1px_rgb(0_0_0/0.3)]"
          />
        </label>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {eventTypes.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              aria-pressed={type === t}
              className={`rounded-full px-3 py-1 text-xs/5 transition-colors ${
                type === t ? 'bg-[oklch(0.1_0_0)] text-white' : 'bg-black/[0.05] text-[oklch(0.1_0_0)] hover:bg-black/10'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
          {months.length === 0 && <p className="py-6 text-sm text-subtle">No events match that search yet.</p>}
          {months.map((m) => (
            <div key={m}>
              <h4 className="mt-4 mb-2 text-base font-semibold text-[oklch(0.1_0_0)]">{m}</h4>
              <ul className="space-y-2">
                {shown
                  .filter((e) => e.month === m)
                  .map((e) => (
                    <li key={e.title} className="flex gap-3 rounded-xl bg-page p-2.5 shadow-[0_0_0_1px_rgb(0_0_0/0.05)]">
                      <img src={e.img} alt="" loading="lazy" className="size-14 shrink-0 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-sm font-medium text-[oklch(0.1_0_0)]">{e.title}</p>
                          <span className="shrink-0 rounded-md bg-black/[0.05] px-1.5 py-0.5 text-[11px] text-[oklch(0.1_0_0)]">{e.type}</span>
                        </div>
                        <p className="truncate text-xs/5 text-subtle">{e.date}</p>
                        <p className="truncate text-xs/5 text-subtle">{e.place}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MemberRow({ ids }: { ids: string[] }) {
  return (
    <div className="flex justify-center gap-8 md:gap-[192px]">
      {ids.map((src) => (
        <img key={src} src={src} alt="Community member" loading="lazy" className="size-16 rounded-2xl object-cover md:size-28" />
      ))}
    </div>
  )
}

export function CommunityPage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-cream px-4 pt-[180px] pb-24 lg:h-[1280px] lg:pb-0">
        <div className="flex flex-col items-center text-center">
          <a
            href={DISCORD_URL}
            className={`inline-flex items-center gap-1.5 rounded-full bg-page px-3 py-2 text-sm/[21px] font-[480] text-[oklch(0.1_0_0)] ${lift}`}
          >
            Join the community <ArrowRight className="size-3.5" />
          </a>
          <h1 className="mt-8 text-[44px]/[44px] font-bold tracking-[-2px] text-[oklch(0.1_0_0)] md:text-[80px]/[72px] md:tracking-[-4px]">
            <span className="block">Welcome to the</span>
            <span className="block">Gaimer community</span>
          </h1>
          <p className="mt-8 max-w-[672px] text-xl/[25px] font-[480] tracking-[-0.5px] text-[rgb(95_95_93)]">
            Mod alongside thousands of players, creators and tinkerers. Whether it’s your first mod or your fiftieth,
            there’s a place for you here.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <a href="#events" className={filled}>
              Browse events
            </a>
            <a href={DISCORD_URL} className={outline}>
              Join Gaimer on Discord
            </a>
          </div>
        </div>

        {/* Polaroid scatter (desktop) / simple grid (mobile) */}
        <div className="relative mx-auto mt-[126px] hidden h-[640px] max-w-[1120px] lg:block">
          {photos.map(([src, alt, x, y, w, h, r]) => (
            <figure
              key={src}
              className={`absolute rounded-2xl bg-page p-2 ${lift}`}
              style={{ left: x, top: y, width: w, height: h, transform: `rotate(${r}deg)` } as CSSProperties}
            >
              <img src={src} alt={alt} loading="lazy" className="size-full rounded-lg object-cover" />
            </figure>
          ))}
        </div>
        <div className="mx-auto mt-16 grid max-w-[560px] grid-cols-2 gap-4 lg:hidden">
          {photos.slice(0, 4).map(([src, alt, , , , , r]) => (
            <figure key={src} className={`rounded-2xl bg-page p-1.5 ${lift}`} style={{ transform: `rotate(${r / 2}deg)` }}>
              <img src={src} alt={alt} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
            </figure>
          ))}
        </div>
      </section>

      {/* Statement + join cards */}
      <section className="px-4 pt-32 pb-24">
        <p className="mx-auto max-w-[600px] text-[28px]/[40px] font-[480] text-[oklch(0.1_0_0)] md:text-4xl/[49.5px]">
          Connect with 00K+{' '}
          <Chip>
            <Users className="size-4" />
          </Chip>{' '}
          <span className="text-black/35">
            modders online or in person. Get real-time help, share what you’re building,{' '}
            <Chip>
              <CalendarDays className="size-4" />
            </Chip>{' '}
            join a modding jam{' '}
            <Chip>
              <MessageCircle className="size-4" />
            </Chip>{' '}
            or host your own, whether it’s your first mod or your hundredth.
          </span>
        </p>
        <div className="mx-auto mt-16 grid max-w-[960px] gap-4 sm:grid-cols-3 lg:gap-0">
          {joinCards.map((c) => (
            <div key={c.title} className={`flex min-h-[232px] flex-col justify-between rounded-3xl bg-page p-8 ${lift} ${c.style}`}>
              <h2 className="max-w-[180px] text-3xl/[33px] font-semibold tracking-[-0.75px] text-[oklch(0.1_0_0)]">{c.title}</h2>
              <a href={c.href} className={`mt-8 w-fit ${filled}`}>
                {c.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Events intro + stats */}
      <section className="bg-cream px-4 py-24">
        <p className="mx-auto max-w-[672px] text-center text-xl/[27.5px] font-[480] tracking-[-0.5px] text-[rgb(95_95_93)]">
          <span className="text-[oklch(0.1_0_0)]">Modding jams, game nights, workshops.</span>
          <br />
          Every event is different, but they all share the same energy: a room full of people shipping mods that
          actually work. Events are run by community members, with support from Gaimer.
        </p>
        <dl className="mx-auto mt-16 grid max-w-[1120px] grid-cols-2 gap-y-10 md:grid-cols-4">
          {stats.map(([v, l], i) => (
            <div key={l} className={`text-center ${i > 0 ? 'md:border-l md:border-black/10' : ''}`}>
              <dd className="text-[40px]/[1.1] font-[480] tracking-[-1px] text-[oklch(0.1_0_0)] md:text-5xl/[1.1]">{v}</dd>
              <dt className="mt-2 text-base text-[rgb(95_95_93)]">{l}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Events finder */}
      <section id="events" className="scroll-mt-16 px-4 py-24 md:py-32">
        <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <h2 className="text-[32px]/[1.1] font-semibold tracking-[-1.2px] text-balance text-[oklch(0.1_0_0)] md:text-5xl/[52.8px]">
            Join or host a Gaimer community event near you
          </h2>
          <a href={DISCORD_URL} className={`mt-8 ${filled}`}>
            Apply here
          </a>
        </div>
        <div className="mx-auto mt-16 max-w-[1120px]">
          <EventsFinder />
        </div>
      </section>

      {/* Member wall */}
      <section className="overflow-hidden px-4 py-24">
        <div className="space-y-6 md:space-y-12">
          <MemberRow ids={members.slice(0, 3)} />
          <MemberRow ids={members.slice(3, 7)} />
        </div>
        <h2 className="mx-auto my-16 max-w-[576px] text-center text-[32px]/[1.1] font-semibold tracking-[-1.2px] text-[oklch(0.1_0_0)] md:my-24 md:text-5xl/[52.8px]">
          Real modders, real community, real mods
        </h2>
        <div className="space-y-6 md:space-y-12">
          <MemberRow ids={members.slice(7, 11)} />
          <MemberRow ids={members.slice(11, 14)} />
        </div>
      </section>

      {/* Partner */}
      <section className="relative overflow-hidden px-4 py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(255_60_112/0.35),rgb(123_63_228/0.25)_45%,transparent_70%)] blur-3xl"
        />
        <div className="relative mx-auto flex max-w-[1120px] flex-col items-center text-center">
          <h2 className="text-[32px]/[1.1] font-semibold tracking-[-1.2px] text-[oklch(0.1_0_0)] md:text-5xl/[52.8px]">Partner with Gaimer</h2>
          <p className="mt-10 max-w-[512px] text-lg/[27px] text-[rgb(95_95_93)]">
            Partnerships are for studios, mod platforms, creators and educators who want to work with Gaimer formally.
            If you run a modding community, make content, teach game development or want official mod support for your
            game, talk to our partnerships team.
          </p>
          <a href={DISCORD_URL} className={`mt-8 ${filled}`}>
            Explore partnerships
          </a>
        </div>
      </section>

      <div className="bg-cream">
        <Faq items={faqs} />
      </div>
    </>
  )
}
