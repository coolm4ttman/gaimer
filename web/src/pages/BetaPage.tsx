import { ArrowRight, CircleCheck } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router'
import { LogoIcon } from '../components/Logo'

// The private beta: an invite code and an email invite that email (GAIMER's relay, relay/src/invite-codes.js in
// gaimer-platform), then the download and the first steps. Built from the pricing page's parts so it matches.
const REDEEM_URL = 'https://gaimer-relay.gaimer.workers.dev/beta/redeem'

const raised = 'shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]'
const field =
  'h-11 w-full rounded-lg bg-white/[0.06] px-3 text-[15px] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)] outline-none transition-shadow placeholder:text-white/35 focus:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.35)]'
const primary =
  'flex w-full items-center justify-center gap-2 rounded-lg download-gradient px-3 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60'

type Joined = { email: string; credits?: number; already?: boolean; download: string }

function JoinForm({ onJoined }: { onJoined: (joined: Joined) => void }) {
  const [params] = useSearchParams()
  const [code, setCode] = useState(params.get('code') || '')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (params.get('code')) emailRef.current?.focus()
  }, [params])

  async function submit(event: FormEvent) {
    event.preventDefault()
    setError('')
    if (!code.trim()) return setError('Enter your invite code.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError('Enter a valid email address.')
    setBusy(true)
    try {
      const response = await fetch(REDEEM_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code, email }),
      })
      const body = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(body.error || 'Something went wrong. Try again.')
      onJoined(body as Joined)
    } catch (caught) {
      setError(caught instanceof Error && caught.message !== 'Failed to fetch' ? caught.message : 'GAIMER couldn’t be reached. Check your connection and try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <label className="block">
        <span className="text-sm/[21px] text-body">Invite code</span>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder="FRIENDS"
          className={`${field} mt-1.5 font-mono tracking-[0.12em] uppercase placeholder:tracking-[0.12em]`}
        />
      </label>
      <label className="block">
        <span className="text-sm/[21px] text-body">Your email</span>
        <input
          ref={emailRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="you@example.com"
          className={`${field} mt-1.5`}
        />
      </label>
      {error && (
        <p role="alert" className="text-sm/[21px] text-[#ff9aa9]">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className={primary}>
        {busy ? 'Checking your code…' : 'Get GAIMER'}
        {!busy && <ArrowRight className="size-4" />}
      </button>
      <p className="text-xs/5 text-subtle">Your email is how you sign in to GAIMER. We don’t use it for anything else.</p>
    </form>
  )
}

function Joined({ joined }: { joined: Joined }) {
  const next = [
    <>
      Have <b className="font-medium text-ink">GTA V Legacy</b> (not Enhanced) and{' '}
      <a href="https://fivem.net" target="_blank" rel="noopener" className="text-ink underline decoration-white/30 underline-offset-2 hover:decoration-white">
        FiveM
      </a>{' '}
      installed, and open FiveM once.
    </>,
    <>
      If Windows says <b className="font-medium text-ink">“Windows protected your PC”</b>, click More info, then Run anyway. We’re still getting the
      installer signed.
    </>,
    <>
      Create your account with <b className="font-medium text-ink">{joined.email}</b> (button below), then open GAIMER and press{' '}
      <b className="font-medium text-ink">Sign in</b>: your browser connects it.
    </>,
    <>
      Something broken? Use <b className="font-medium text-ink">Report a problem</b> in GAIMER’s account menu. Every report is read.
    </>,
  ]
  return (
    <div>
      <div className="flex items-start gap-2.5 rounded-lg bg-white/[0.06] p-3 text-sm/[21px] text-ink shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]">
        <CircleCheck className="relative top-0.5 size-4 shrink-0 text-[#7ee2a8]" />
        <span>
          {joined.already
            ? `${joined.email} is already in the beta.`
            : `${joined.email} is invited${joined.credits ? `, with ${joined.credits} beta credits to spend` : ''}.`}
        </span>
      </div>
      <a href={joined.download} className={`${primary} mt-4`}>
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4">
          <path d="M0 0h7.6v7.6H0zM8.4 0H16v7.6H8.4zM0 8.4h7.6V16H0zM8.4 8.4H16V16H8.4z" />
        </svg>
        Download GAIMER for Windows
      </a>
      <Link
        to="/login"
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[15px] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.18)] transition-colors hover:bg-white/[0.06]"
      >
        Create your account <ArrowRight className="size-4" />
      </Link>
      <ol className="mt-6 space-y-3">
        {next.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm/[21px] text-body">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-white/[0.08] text-xs font-medium text-ink">{i + 1}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function BetaPage() {
  const [joined, setJoined] = useState<Joined | null>(null)
  return (
    // Fills the window above the footer bar (about 110px with its gap) and centres the invite in it, below the nav.
    <div className="theme-dark flex min-h-[calc(100svh-110px)] flex-col">
      <div className="grad-down flex flex-1 flex-col justify-center px-4 pt-24 pb-10">
        <div className="mx-auto max-w-[1000px]">
          <header className="flex flex-col items-center text-center">
            <span className="rounded-full bg-white/[0.08] px-2.5 py-0.5 text-xs font-medium text-body">Private beta · by invite</span>
            <h1 className="mt-4 flex items-center gap-3 text-3xl/[45px] font-[480] text-ink">
              <LogoIcon className="size-9" /> Join the beta
            </h1>
            <p className="mt-4 max-w-[760px] text-base/6 text-body">
              <span className="block">Describe a GTA V mod or a whole FiveM server, and GAIMER builds it, checks it and lets you play it.</span>
              <span className="block">Enter your invite code to get the download.</span>
            </p>
          </header>

          <div className={`mx-auto mt-12 max-w-[490px] rounded-3xl bg-white/[0.04] p-2 ${raised}`}>
            <div className={`rounded-2xl bg-white/[0.06] p-5 ${raised}`}>
              <h2 className="text-xl/[25px] font-[450] tracking-[-0.2px] text-ink">{joined ? 'You’re in' : 'Your invite'}</h2>
              <p className="mt-1.5 mb-5 text-sm/[21px] text-body">
                {joined ? 'Download GAIMER and follow these steps.' : 'Got a code from us or a friend? Enter it with your email.'}
              </p>
              {joined ? <Joined joined={joined} /> : <JoinForm onJoined={setJoined} />}
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-subtle">GAIMER is an independent tool, not affiliated with Rockstar Games or Cfx.re.</p>
        </div>
      </div>
    </div>
  )
}
