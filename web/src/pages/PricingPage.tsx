import { Check, ChevronDown, ChevronRight, CreditCard, Gamepad2, RefreshCw, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { DOWNLOAD_URL } from '../components/Download'
import { LogoIcon } from '../components/Logo'

// Mirrors GAIMER's real plans (gaimer-platform relay/src/pricing.js and the desktop app's PlansDialog): Free with
// daily credits, Pro with a monthly-credits picker, and one-off credit packs for Pro members. Prices in USD, monthly
// only. Keep in step with pricing.js when it changes.
const DAILY_CREDITS = 5
const FREE_MONTHLY_CAP = 30
const proTiers = [
  { credits: 100, price: 25 },
  { credits: 200, price: 50 },
  { credits: 400, price: 100 },
  { credits: 800, price: 200 },
]
const packs = [
  { credits: 50, price: 15 },
  { credits: 100, price: 30 },
  { credits: 250, price: 75 },
]

// Plan and credit facts from gaimer-platform (relay/src/pricing.js, PlansDialog); kept game- and OS-neutral.
const faqs: [string, string][] = [
  [
    'What is GAIMER and how does it work?',
    'GAIMER is a desktop app for modding the games you play. Describe a mod and GAIMER writes it, tests it in the game, opens it in the visual editor so you can tweak it, and lets you export the finished project.',
  ],
  [
    'What do I need to run GAIMER?',
    'A PC (Mac coming soon) with the game you want to mod installed. GAIMER sets up the modding tools that game needs on first run.',
  ],
  [
    'Which games are supported?',
    'GTA V, Minecraft, Skyrim, Cyberpunk 2077, Elden Ring and Red Dead Redemption 2, with more on the way.',
  ],
  [
    'What is a credit?',
    'Credits are used when GAIMER builds, changes or play-tests your mod. A typical change uses 1 to 2 credits; a play-test about 10.',
  ],
  [
    'How do the free daily credits work?',
    `Every account gets ${DAILY_CREDITS} free credits a day, which expire at the end of the day (UTC). On Free you can use up to ${FREE_MONTHLY_CAP} of them a month; on Pro you get them every day on top of your monthly credits.`,
  ],
  [
    'Do credits expire?',
    'Unused Pro credits roll over for one more month. Credit packs never expire and are used after your plan’s credits. Daily free credits expire at the end of each day.',
  ],
  [
    'What are credit packs?',
    `One-off top-ups for Pro members when you run low: ${packs.map((p) => `${p.credits} credits for $${p.price}`).join(', ')}. No subscription.`,
  ],
  [
    'Can I export my mod’s code on Free?',
    'Exporting your mod’s code is part of Pro. On Free you can build and change mods in chat and open them in the visual editor.',
  ],
  [
    'Where are my projects stored?',
    'On your computer. Projects stay in your local GAIMER folder and are kept even if you uninstall the app.',
  ],
  [
    'What happens to my mods if my subscription ends?',
    'Your projects stay on your computer. You move back to the Free plan’s daily credits, and exporting code needs Pro again.',
  ],
  [
    'Can I cancel at any time?',
    'Yes. Payments open securely in your browser, and you can cancel or change plan any time from Billing in the app.',
  ],
]

// Outlined button: transparent fill, hairline border, 8px radius.
const outline =
  'block w-full rounded-lg px-2.5 py-[7.5px] text-center text-sm/[21px] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.18)] transition-colors hover:bg-white/[0.06]'
const primary =
  'block w-full rounded-lg download-gradient px-2.5 py-[7.5px] text-center text-sm/[21px] text-white transition-opacity hover:opacity-90'
// Hairline ring used by the home page boxes.
const raised = 'shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]'

function Badge({ children, accent = false }: { children: string; accent?: boolean }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${accent ? 'download-gradient text-white' : 'bg-white/[0.08] text-body'}`}
    >
      {children}
    </span>
  )
}

// One plan: a boxed column with the top card (name, blurb, price, picker, CTA), meta rows and the feature list.
function PlanColumn({
  name,
  badge,
  blurb,
  price,
  priceNote,
  picker,
  extra,
  cta,
  meta,
  features,
}: {
  name: string
  badge?: { text: string; accent?: boolean }
  blurb: string
  price: React.ReactNode
  priceNote: string
  picker: React.ReactNode
  extra?: React.ReactNode
  cta: React.ReactNode
  meta: [typeof Check, string][]
  features: string[]
}) {
  return (
    <div className={`flex flex-col rounded-3xl bg-white/[0.04] p-2 ${raised}`}>
      <div className={`rounded-2xl bg-white/[0.06] p-5 ${raised}`}>
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl/[25px] font-[450] tracking-[-0.2px] text-ink">{name}</h3>
          {badge && <Badge accent={badge.accent}>{badge.text}</Badge>}
        </div>
        <p className="mt-1.5 text-sm/[21px] text-body">{blurb}</p>
        <div className="mt-4 h-10">{price}</div>
        <p className="mt-1 h-[21px] text-sm/[21px] text-subtle">{priceNote}</p>
        <div className="mt-5">{picker}</div>
        <p className="mt-3 min-h-[42px] text-xs/5 text-body">{extra}</p>
        <div className="mt-4">{cta}</div>
      </div>
      <div className="px-3 pt-6 pb-4">
        <ul className="space-y-2">
          {meta.map(([Icon, text]) => (
            <li key={text} className="flex items-center gap-2 text-sm/[21px] text-ink">
              <Icon className="size-4 shrink-0 text-subtle" /> {text}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-white/[0.08] px-3 pt-4 pb-3">
        <ul className="space-y-2">
          {features.map((f) => (
            <li key={f} className="flex gap-2 text-sm/[21px] text-ink">
              <Check className="relative top-0.5 size-4 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const bigPrice = 'text-4xl/[39.6px] font-[450] tracking-[-0.9px] text-ink'
const pickerBox =
  'flex h-8 w-full items-center rounded-lg bg-white/[0.06] px-2.5 text-sm/[21px] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]'

function Plans() {
  const [tier, setTier] = useState(0)
  const pro = proTiers[tier]
  return (
    <div className="mx-auto mt-12 grid max-w-[1000px] items-start gap-4 md:grid-cols-3">
      <PlanColumn
        name="Free"
        blurb="Try GAIMER and build your first mods."
        price={<p className={bigPrice}>$0</p>}
        priceNote="/ month"
        picker={<div className={pickerBox}>{DAILY_CREDITS} credits every day</div>}
        extra={`Up to ${FREE_MONTHLY_CAP} credits in a month.`}
        cta={
          <a href={DOWNLOAD_URL} className={outline}>
            Download
          </a>
        }
        meta={[
          [CreditCard, 'No credit card needed'],
          [Gamepad2, 'Every supported game'],
        ]}
        features={[
          `${DAILY_CREDITS} credits every day`,
          `Up to ${FREE_MONTHLY_CAP} credits a month`,
          'Build and change mods in chat',
          'Open them in the visual editor',
        ]}
      />
      <PlanColumn
        name="Pro"
        badge={{ text: 'Most popular', accent: true }}
        blurb="For building and shipping mods regularly."
        price={<p className={bigPrice}>${pro.price}</p>}
        priceNote="/ month"
        picker={
          <label className="relative block">
            <span className="sr-only">Monthly credits for Pro</span>
            <select
              value={tier}
              onChange={(e) => setTier(Number(e.target.value))}
              className={`${pickerBox} appearance-none pr-8 outline-none [&>option]:bg-[#16161c]`}
            >
              {proTiers.map((t, i) => (
                <option key={t.credits} value={i}>
                  {t.credits} monthly credits
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-subtle" />
          </label>
        }
        extra={
          <>
            <b className="font-medium text-ink">+ {DAILY_CREDITS} free credits every day.</b> That’s {DAILY_CREDITS * 30} more
            in a 30-day month.
          </>
        }
        cta={
          <a href={DOWNLOAD_URL} className={primary}>
            Get Pro
          </a>
        }
        meta={[
          [Sparkles, `${pro.credits} credits every month`],
          [RefreshCw, 'Unused credits roll over'],
        ]}
        features={[
          'Everything in Free',
          `${pro.credits} credits every month`,
          `${DAILY_CREDITS} free credits every day, all month`,
          'Unused credits roll over for a month',
          'Credit packs when you run low',
          'Export your mod’s code',
        ]}
      />
      <PlanColumn
        name="Credit packs"
        badge={{ text: 'Pro only' }}
        blurb="Top up whenever you run low."
        price={
          <p className={bigPrice}>
            <span className="mr-1.5 text-sm font-normal tracking-normal text-subtle">from</span>${packs[0].price}
          </p>
        }
        priceNote="one-off"
        picker={
          <div className="grid grid-cols-3 gap-1.5">
            {packs.map((p) => (
              <div key={p.credits} className={`${pickerBox} h-auto flex-col items-start justify-center px-2 py-1.5`}>
                <span className="text-xs text-body">{p.credits} credits</span>
                <b className="font-medium">${p.price}</b>
              </div>
            ))}
          </div>
        }
        extra="Buy packs from the app once you’re on Pro."
        cta={
          <a href={DOWNLOAD_URL} className={outline}>
            Download
          </a>
        }
        meta={[
          [CreditCard, 'One-off payment'],
          [Sparkles, 'No subscription'],
        ]}
        features={['Used after your plan’s credits', 'Never expire', 'One-off payment, no subscription']}
      />
    </div>
  )
}

function PricingFaq() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="grad-up px-4 pt-24 pb-26 md:pb-40">
      <h2 className="text-center text-[28px]/[1.25] font-[480] text-ink md:text-4xl/[45px]">
        Frequently asked questions
      </h2>
      <div className="mx-auto mt-20 max-w-[896px]">
        {faqs.map(([q, a], i) => {
          const isOpen = open === i
          return (
            <div key={q} className="border-b border-white/[0.08]">
              <h3>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left text-lg/[27px] font-[480] text-ink md:text-xl/[30px]"
                >
                  {q}
                  <ChevronRight
                    className={`size-5 shrink-0 text-subtle transition-transform duration-200 motion-reduce:transition-none ${isOpen ? '-rotate-90' : 'rotate-90'}`}
                  />
                </button>
              </h3>
              <div
                className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <p className="pb-4 text-base/6 text-ink">{a}</p>
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
  return (
    <div className="theme-dark">
      <div className="grad-down px-4 pt-32 pb-24">
        <div className="mx-auto max-w-[1280px]">
          <header className="flex flex-col items-center text-center">
            <h1 className="flex items-center gap-3 text-3xl/[45px] font-[480] text-ink">
              <LogoIcon className="size-9" /> Pricing
            </h1>
            <p className="mt-4 text-base/6 text-body">Start for free. Upgrade when your mods need more power.</p>
          </header>
          <h2 className="sr-only">Plans</h2>
          <Plans />
          <p className="mt-6 text-center text-xs text-subtle">
            Prices in US dollars. Payments open securely in your browser, and you can cancel any time from Billing.
          </p>
        </div>
      </div>
      <PricingFaq />
    </div>
  )
}
