import { Check, ChevronDown, ChevronRight, CreditCard, Gamepad2, Info, Layers, Users } from 'lucide-react'
import { useState } from 'react'
import { DOWNLOAD_URL } from '../components/Download'
import { LogoIcon } from '../components/Logo'

// Replica of lovable.dev/pricing (measured at 1440px): 1248px grid of four 300px plan columns; each column is a
// grey rail with a white top card (20px padding) holding name, blurb, price, credits picker and CTA, then two
// meta rows, a rule and the feature list. Below: a ruled FAQ.
// PLACEHOLDER plans, prices and features – set real tiers before launch.

type Feature = string | { text: string; info?: string; strong?: boolean }

interface Plan {
  name: string
  blurb: string
  price?: number // monthly USD at the base credit tier; omit for custom pricing
  credits?: boolean
  cta: string
  href: string
  featured?: boolean
  meta: [typeof Users, string, boolean?][]
  features: Feature[]
}

const plans: Plan[] = [
  {
    name: 'Free',
    blurb: 'Try Gaimer on the game you play the most',
    price: 0,
    cta: 'Download',
    href: DOWNLOAD_URL,
    meta: [
      [CreditCard, 'No credit card needed'],
      [Gamepad2, '1 game'],
    ],
    features: ['Local projects', 'Hot reload', 'Automatic save backups', 'One-click rollback', 'Community support'],
  },
  {
    name: 'Pro',
    blurb: 'For modders shipping mods and updates every week.',
    price: 20,
    credits: true,
    cta: 'Get Pro',
    href: DOWNLOAD_URL,
    featured: true,
    meta: [
      [Gamepad2, 'Every supported game'],
      [Layers, 'Unlimited projects'],
    ],
    features: [
      { text: 'All Free features', strong: true },
      '100 Pro credits',
      { text: 'Credit rollovers', info: 'Unused credits roll over for one month.' },
      'On-demand credit top-ups',
      'Background agents',
      'Load-order conflict checks',
      'One-click packaging',
      'Publish to mod sites',
      'Version history',
      'Email support',
    ],
  },
  {
    name: 'Team',
    blurb: 'For mod teams building and testing together.',
    price: 40,
    credits: true,
    cta: 'Get Team',
    href: DOWNLOAD_URL,
    meta: [
      [Users, 'Unlimited members'],
      [Layers, 'Shared credit pool'],
    ],
    features: [
      { text: 'All Pro features', strong: true },
      '100 Team credits',
      'Shared projects',
      'Roles and permissions',
      { text: 'Private test builds', info: 'Share builds with your team before anyone else can download them.' },
      { text: 'Shared load orders', info: 'Everyone tests against the same set of mods.' },
      'Team asset library',
      'Priority support',
    ],
  },
  {
    name: 'Studio',
    blurb: 'For studios and large teams needing scale and control.',
    cta: 'Book a demo',
    href: '/community',
    meta: [
      [Layers, 'Volume based pricing'],
      [Users, 'Unlimited members'],
    ],
    features: [
      { text: 'All Team features', strong: true },
      'SSO and directory sync',
      'Audit logs',
      'Dedicated build machines',
      'Custom game integrations',
      'Official mod tooling for your game',
      'Named account manager',
      'Custom SLA',
    ],
  },
]

const creditTiers = [100, 200, 400, 800]

const faqs: [string, string][] = [
  ['What is Gaimer and how does it work?', 'Gaimer is a desktop app that reads your game, writes mod code from a plain description and hot-reloads it into the running game, with backups before anything changes.'],
  ['What is a credit?', 'Credits are what Gaimer uses when its agents build, test or fix a mod for you. Bigger jobs, like updating dozens of mods after a patch, use more credits than a small tweak.'],
  ['Do credits expire?', 'On paid plans, unused monthly credits roll over for one month. Free plan credits refresh each month and don’t roll over.'],
  ['What happens to my mods if my subscription ends?', 'Nothing. Your projects and the mods you built stay on your machine and keep working. You just move back to the Free plan’s limits.'],
  ['Can I cancel at any time?', 'Yes. You can cancel from your account settings and keep your paid features until the end of the billing period.'],
  ['Do you charge per seat?', 'Pro is for one person. Team and Studio include unlimited members who share one pool of credits.'],
  ['Who owns the mods I build?', 'You do. Everything Gaimer writes for you is yours to change, share and publish, within each game’s own modding rules.'],
  ['Which games are supported?', 'Gaimer supports a growing list of games, including GTA V, Minecraft, Skyrim, Cyberpunk 2077, Elden Ring and Red Dead Redemption 2.'],
  ['Do you offer a student discount?', 'Yes. Verified students get up to 50% off Gaimer Pro.'],
]

// Lovable's outlined button: transparent fill, hairline border, 8px radius.
const outline =
  'block w-full rounded-lg px-2.5 py-1.5 text-center text-sm/[21px] text-[oklch(0.1_0_0)] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.15)] transition-colors hover:bg-black/[0.03]'
// Lovable's raised card shadow (white inner ring, faint grey outer ring, soft drop).
const raised =
  'shadow-[0_0_0_1px_#fff,0_0_0_2px_rgb(119_119_113/0.16),0_1px_2px_rgb(0_0_0/0.04),0_4px_12px_-4px_rgb(0_0_0/0.06)]'

function FeatureRow({ f }: { f: Feature }) {
  const item = typeof f === 'string' ? { text: f } : f
  return (
    <li className="flex gap-2 text-sm/[21px] text-[oklch(0.1_0_0)]">
      <Check className="relative top-0.5 size-4 shrink-0" />
      <span className={`flex items-center gap-1 ${item.strong ? 'font-[450]' : ''}`}>
        {item.text}
        {item.info && (
          <span title={item.info} className="cursor-help text-subtle">
            <Info className="size-3.5" />
          </span>
        )}
      </span>
    </li>
  )
}

function PlanColumn({ plan, yearly }: { plan: Plan; yearly: boolean }) {
  const [tier, setTier] = useState(0)
  const monthly = plan.price === undefined ? undefined : plan.price * (creditTiers[tier] / 100)
  // Yearly billing: two months free.
  const shown = monthly === undefined ? undefined : yearly ? Math.round((monthly * 10) / 12) : monthly

  return (
    <div className={`flex flex-col rounded-2xl bg-[oklch(0.9699_0_107)] ${raised}`}>
      <div className={`rounded-2xl bg-[oklch(0.9999_0_107)] p-5 ${raised}`}>
        <h3 className="text-xl/[25px] font-[450] tracking-[-0.2px] text-[oklch(0.1_0_0)]">{plan.name}</h3>
        <p className="mt-1.5 min-h-[42px] text-sm/[21px] text-[oklch(0.1_0_0)]">{plan.blurb}</p>
        <div className="mt-4 h-10">
          {shown === undefined ? (
            <p className="pt-1 text-xl/[30px] text-subtle">Custom pricing</p>
          ) : (
            <p className="text-4xl/[39.6px] font-[450] tracking-[-0.9px] text-[oklch(0.1_0_0)]">${shown}</p>
          )}
        </div>
        <p className="mt-1 h-[21px] text-sm/[21px] text-subtle">
          {shown !== undefined && (yearly && shown > 0 ? '/ month, billed yearly' : '/ month')}
        </p>
        <div className="mt-5 h-8">
          {plan.credits && (
            <label className="relative block">
              <span className="sr-only">Monthly credits for {plan.name}</span>
              <select
                value={tier}
                onChange={(e) => setTier(Number(e.target.value))}
                className="h-8 w-full appearance-none rounded-lg bg-white/80 pr-8 pl-2.5 text-sm/[21px] text-[oklch(0.1_0_0)] shadow-[inset_0_1px_0_rgb(0_0_0/0.08),inset_0_-1px_0_rgb(0_0_0/0.16),0_0_0_1px_rgb(0_0_0/0.08)] outline-none"
              >
                {creditTiers.map((c, i) => (
                  <option key={c} value={i}>
                    {c} monthly credits
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-subtle" />
            </label>
          )}
        </div>
        <a
          href={plan.href}
          className={`mt-6 ${
            plan.featured
              ? 'block w-full rounded-lg bg-brand px-2.5 py-[7.5px] text-center text-sm/[21px] text-white transition-opacity hover:opacity-90'
              : `${outline} py-[7.5px]`
          }`}
        >
          {plan.cta}
        </a>
      </div>
      <div className="px-5 pt-8 pb-4">
        <ul className="space-y-2">
          {plan.meta.map(([Icon, text]) => (
            <li key={text} className="flex items-center gap-2 text-sm/[21px] text-[oklch(0.1_0_0)]">
              <Icon className="size-4 shrink-0 text-subtle" /> {text}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-[oklch(0.866_0_107/0.4)] px-5 pt-4 pb-5">
        <ul className="space-y-2">
          {plan.features.map((f) => (
            <FeatureRow key={typeof f === 'string' ? f : f.text} f={f} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function PricingFaq() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="mt-28">
      <h2 className="text-center text-[28px]/[1.25] font-[480] text-ink md:text-4xl/[45px]">Frequently asked questions</h2>
      <div className="mx-auto mt-20 max-w-[896px]">
        {faqs.map(([q, a], i) => {
          const isOpen = open === i
          return (
            <div key={q} className="border-b border-[oklch(0.866_0_107/0.4)]">
              <h3>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left text-lg/[27px] font-[480] text-[oklch(0.1_0_0)] md:text-xl/[30px]"
                >
                  {q}
                  <ChevronRight
                    className={`size-5 shrink-0 text-subtle transition-transform duration-200 motion-reduce:transition-none ${isOpen ? '-rotate-90' : 'rotate-90'}`}
                  />
                </button>
              </h3>
              <div className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="pb-4 text-base/6 text-[oklch(0.1_0_0)]">{a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function PricingPage() {
  const [yearly, setYearly] = useState(false)

  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-32 pb-26 md:pb-40">
      <header className="flex flex-col items-center text-center">
        <h1 className="flex items-center gap-3 text-3xl/[45px] font-[480] text-[oklch(0.1_0_0)]">
          <LogoIcon className="size-9" /> Pricing
        </h1>
        <p className="mt-4 text-base/6 text-[rgb(95_95_93)]">Start for free. Upgrade when your mods need more power.</p>
        <div
          role="group"
          aria-label="Billing period"
          className="mt-9 flex h-10 items-center gap-0.5 rounded-full bg-[oklch(0.5674_0.009_106.68/0.04)] p-1 shadow-[inset_0_2px_2px_-1px_rgb(0_0_0/0.04),inset_0_4px_4px_-2px_rgb(0_0_0/0.04)]"
        >
          {[false, true].map((y) => (
            <button
              key={String(y)}
              onClick={() => setYearly(y)}
              aria-pressed={yearly === y}
              className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-sm/[21px] text-[oklch(0.1_0_0)] transition-colors ${
                yearly === y ? 'bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_1px_2px_rgb(0_0_0/0.08)]' : 'hover:bg-black/[0.03]'
              }`}
            >
              {y ? 'Yearly' : 'Monthly'}
              {y && <span className="font-medium text-brand-violet">2 months free</span>}
            </button>
          ))}
        </div>
      </header>

      <h2 className="sr-only">Plans</h2>
      <div className="mx-auto mt-6 grid max-w-[1248px] items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((p) => (
          <PlanColumn key={p.name} plan={p} yearly={yearly} />
        ))}
      </div>

      <PricingFaq />
    </div>
  )
}
