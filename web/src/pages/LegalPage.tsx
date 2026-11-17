import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { PageHeader } from '../components/PageHeader'

// Terms of use and privacy policy. Written from what GAIMER actually does (gaimer-platform: relay/schema.sql for
// what the account service stores, relay/src for the services it calls, platform-api/problem-report.mjs for
// problem reports). Keep them in step when that changes.
// PLACEHOLDER: OPERATOR, CONTACT_EMAIL and GOVERNING_LAW need the real details before these pages go live.
const OPERATOR = '[Operator legal name and address]'
const CONTACT_EMAIL = '[contact email]'
const GOVERNING_LAW = '[country]'
const UPDATED = '17 November 2026'

type Section = { title: string; body: ReactNode }

const a = 'text-ink underline underline-offset-4 hover:opacity-70'
const Mail = () => <span className="font-medium text-ink">{CONTACT_EMAIL}</span>

function LegalPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: ReactNode; sections: Section[] }) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title}>
        {intro}
        <p className="mt-3 text-sm text-subtle">Last updated {UPDATED}</p>
      </PageHeader>
      <section className="px-6 pb-24">
        <div className="container-l">
          <div className="max-w-[720px] divide-y divide-black/[0.08]">
            {sections.map((s, i) => (
              <article key={s.title} className="py-8 first:pt-0">
                <h2 className="text-lg/7 font-semibold tracking-[-0.36px] text-ink">
                  <span className="mr-2 text-subtle tabular-nums">{i + 1}.</span>
                  {s.title}
                </h2>
                <div className="mt-3 space-y-3 text-[15px]/7 text-body [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5">{s.body}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

const privacy: Section[] = [
  {
    title: 'Who we are',
    body: (
      <p>
        GAIMER is run by {OPERATOR} (“GAIMER”, “we”, “us”). We decide how the personal data described here is used. Questions about it go
        to <Mail />.
      </p>
    ),
  },
  {
    title: 'What stays on your PC',
    body: (
      <p>
        GAIMER Desktop builds, checks and runs your mods on your own computer. Your projects, mod files, chat history in the app and your
        game files stay there. We don’t upload them, apart from the parts that go to the AI when you ask GAIMER to do something (section 4)
        and a problem report if you choose to send one (section 3).
      </p>
    ),
  },
  {
    title: 'What we collect',
    body: (
      <ul>
        <li>
          <b className="font-medium text-ink">Your account:</b> your email address, when you joined, your plan and your credit balance.
        </li>
        <li>
          <b className="font-medium text-ink">Signing in:</b> sign-in requests with the time and the IP address they came from, kept to
          stop abuse. We never ask for or store a password.
        </li>
        <li>
          <b className="font-medium text-ink">Beta invites:</b> which invite code you used, and the IP addresses of attempts, so codes
          can’t be guessed.
        </li>
        <li>
          <b className="font-medium text-ink">Usage:</b> for each AI request, the time, the model, how much text went in and out, and the
          credits it used. We don’t keep the content of your requests on our servers.
        </li>
        <li>
          <b className="font-medium text-ink">Payments:</b> if you buy a plan or credits, Stripe handles the payment. We receive a
          confirmation and a customer reference, never your card number.
        </li>
        <li>
          <b className="font-medium text-ink">Problem reports:</b> only when you press Report a problem and send it: your message, your
          GAIMER version, the result of the app’s setup check, details of recent builds and short extracts of the app’s logs. Before
          anything leaves your PC we remove your Windows user name, email addresses and keys.
        </li>
        <li>
          <b className="font-medium text-ink">This website:</b> no analytics, advertising or tracking cookies. When you sign in, your
          browser keeps your session in its own storage so you stay signed in.
        </li>
      </ul>
    ),
  },
  {
    title: 'What goes to the AI',
    body: (
      <>
        <p>
          When you ask GAIMER to build, change or test a mod, it sends what the AI needs to do that: your request, your chat messages about
          the mod, the mod’s code and scene, and, during automatic play tests, screenshots of the game. These go through our service to
          OpenRouter, which passes them to the AI model provider that runs the model (currently Z.ai’s GLM models).
        </p>
        <p>
          We identify you to OpenRouter only by an anonymous ID, never your email. We don’t use your requests or mods to train AI models.
          The AI providers handle the content under their own terms and privacy policies.
        </p>
      </>
    ),
  },
  {
    title: 'Why we use it',
    body: (
      <ul>
        <li>To run GAIMER for you: your account, signing in, credits and the AI work you ask for (needed to provide the service you signed up for).</li>
        <li>To keep it secure and stop abuse, and to fix problems you report (our legitimate interest in a working, safe service).</li>
        <li>To keep payment records the law requires.</li>
      </ul>
    ),
  },
  {
    title: 'Who we share it with',
    body: (
      <>
        <p>We don’t sell your data or use it for advertising. We share it only with the services that run GAIMER for us:</p>
        <ul>
          <li>Cloudflare: hosts our account service and its database.</li>
          <li>Vercel: hosts this website.</li>
          <li>Resend: sends sign-in emails.</li>
          <li>OpenRouter and the AI model providers it uses: carry out the AI requests (section 4).</li>
          <li>Stripe: takes payments.</li>
        </ul>
        <p>
          Some of these process data outside your country, including in the United States. Where the law requires it, they do so under
          standard safeguards such as the European Commission’s standard contractual clauses. We’d also share data if the law required it.
        </p>
      </>
    ),
  },
  {
    title: 'How long we keep it',
    body: (
      <p>
        We keep your account and usage records while you have an account, and payment records for as long as the law requires. Sign-in
        requests and invite code attempts, with the IP addresses they came from, are deleted after 30 days. Problem reports are kept until the
        problem is dealt with. If you ask us to delete your account, we delete your data except what the law makes us keep.
      </p>
    ),
  },
  {
    title: 'Your rights',
    body: (
      <>
        <p>
          You can ask for a copy of your data, ask us to correct or delete it, ask us to send it to you in a portable form, or object to how
          we use it. Email <Mail /> from the address on your account. We’ll answer within a month.
        </p>
        <p>If you’re unhappy with how we handle your data, you can complain to the data protection authority where you live.</p>
      </>
    ),
  },
  {
    title: 'Age',
    body: <p>GAIMER is for adults. It isn’t meant for anyone under 18, and we don’t knowingly collect data about children.</p>,
  },
  {
    title: 'Changes',
    body: (
      <p>
        If we change this policy, we’ll update the date at the top. If a change matters to how your data is used, we’ll tell you by email
        before it applies.
      </p>
    ),
  },
]

const terms: Section[] = [
  {
    title: 'These terms',
    body: (
      <p>
        These terms are an agreement between you and {OPERATOR} (“GAIMER”, “we”, “us”) for using GAIMER Desktop, gaimer.dev and the GAIMER
        account service. By creating an account or using GAIMER you agree to them. Our{' '}
        <Link to="/privacy" className={a}>
          privacy policy
        </Link>{' '}
        explains how we handle your data.
      </p>
    ),
  },
  {
    title: 'GAIMER is in beta',
    body: (
      <p>
        GAIMER is an early version. Features will change, things will sometimes break, and mods it makes may not work as you hoped. Keep
        your own copies of anything important. Beta access is by invite, and we can end the beta or change what’s in it.
      </p>
    ),
  },
  {
    title: 'Your account',
    body: (
      <ul>
        <li>You must be 18 or over.</li>
        <li>An account is for one person. Keep access to your email safe, because it is how you sign in.</li>
        <li>Invite codes are for the people they were given to. We can turn off a code that’s being shared around.</li>
      </ul>
    ),
  },
  {
    title: 'Credits and plans',
    body: (
      <ul>
        <li>AI work in GAIMER uses credits. The app shows how many you have.</li>
        <li>Free and beta credits have no cash value, can’t be transferred, and may expire or change.</li>
        <li>
          Paid plans and credit packs are charged through Stripe at the price shown when you buy. Plans renew until you cancel. Your legal
          rights to refunds aren’t affected.
        </li>
      </ul>
    ),
  },
  {
    title: 'Games and other companies',
    body: (
      <>
        <p>
          GAIMER isn’t made by, affiliated with or endorsed by Rockstar Games, Take-Two Interactive or Cfx.re (FiveM). Grand Theft Auto,
          FiveM and their logos belong to their owners.
        </p>
        <p>
          You need your own legal copy of the game, and FiveM, to use GAIMER. When you play, share, sell or run a server with mods you made,
          you must follow the game’s and FiveM’s own terms, including their rules on servers and selling content.
        </p>
      </>
    ),
  },
  {
    title: 'What you make',
    body: (
      <>
        <p>
          Your requests and the mods GAIMER makes for you are yours, as far as the law allows. You let us process them only to run GAIMER for
          you, including sending them to the AI as the privacy policy describes.
        </p>
        <p>You are responsible for what you make and share. Don’t use GAIMER to make or share anything that:</p>
        <ul>
          <li>is illegal, or harasses, threatens or exploits people;</li>
          <li>copies other people’s work without permission;</li>
          <li>is a cheat or exploit for other people’s servers or online games, or contains malware.</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Using the service fairly',
    body: (
      <p>
        Don’t try to get around credit limits or invites, share your account, overload or attack the service, or use our AI access for
        anything other than GAIMER.
      </p>
    ),
  },
  {
    title: 'AI can be wrong',
    body: (
      <p>
        GAIMER checks every mod it builds, but AI-made mods can still have mistakes, and GAIMER’s answers about your mod can be wrong. Try
        mods yourself before you share or sell them.
      </p>
    ),
  },
  {
    title: 'Ending things',
    body: (
      <p>
        You can stop using GAIMER at any time and ask us to delete your account. We can suspend or close an account that breaks these terms.
        If we close an account by mistake or without good reason, we’ll put it right.
      </p>
    ),
  },
  {
    title: 'Our responsibility',
    body: (
      <>
        <p>
          We provide GAIMER “as is” during the beta and can’t promise it will always be available or error-free. As far as the law allows,
          we aren’t responsible for indirect losses, such as lost profits or lost work, or for what you do with the mods you make.
        </p>
        <p>
          Nothing in these terms limits responsibility that the law doesn’t allow to be limited, such as for death or personal injury caused
          by negligence, for fraud, or your rights as a consumer.
        </p>
      </>
    ),
  },
  {
    title: 'Changes and the law',
    body: (
      <p>
        If we change these terms, we’ll update the date at the top and tell you by email about anything important before it applies. These
        terms are governed by the law of {GOVERNING_LAW}. Questions go to <Mail />.
      </p>
    ),
  },
]

export function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy policy"
      intro="What GAIMER collects, why, and who it shares it with. Your mods and projects stay on your PC."
      sections={privacy}
    />
  )
}

export function TermsPage() {
  return <LegalPage eyebrow="Terms" title="Terms of use" intro="The rules for using GAIMER during the beta, in plain English." sections={terms} />
}
