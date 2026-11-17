import { ArrowRight, CircleCheck, LogOut, MonitorCheck } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router'
import { LogoIcon } from '../components/Logo'
import { INSTALLER_URL, connected, pending, relay, session, type Account, type Session } from '../lib/account'

// Log in / create an account on the website, then connect GAIMER Desktop from here (like Cursor): GAIMER opens
// /login?device=...&code=..., the person signs in if they aren't, checks the code matches GAIMER's, and presses
// Connect. The emailed sign-in link opens /login?confirm=... (any tab or device). Same parts as the beta page.
const raised = 'shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]'
const field =
  'h-11 w-full rounded-lg bg-white/[0.06] px-3 text-[15px] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)] outline-none transition-shadow placeholder:text-white/35 focus:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.35)]'
const primary =
  'flex w-full items-center justify-center gap-2 rounded-lg download-gradient px-3 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60'
const outline =
  'flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[15px] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.18)] transition-colors hover:bg-white/[0.06]'

function Card({ title, sub, children }: { title: string; sub?: ReactNode; children: ReactNode }) {
  return (
    <div className={`mx-auto mt-12 w-full max-w-[490px] rounded-3xl bg-white/[0.04] p-2 ${raised}`}>
      <div className={`rounded-2xl bg-white/[0.06] p-5 ${raised}`}>
        <h2 className="text-xl/[25px] font-[450] tracking-[-0.2px] text-ink">{title}</h2>
        {sub && <p className="mt-1.5 text-sm/[21px] text-body">{sub}</p>}
        <div className="mt-5">{children}</div>
      </div>
    </div>
  )
}

function Note({ tone = 'ok', children }: { tone?: 'ok' | 'error'; children: ReactNode }) {
  return tone === 'ok' ? (
    <div className="flex items-start gap-2.5 rounded-lg bg-white/[0.06] p-3 text-sm/[21px] text-ink shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]">
      <CircleCheck className="relative top-0.5 size-4 shrink-0 text-[#7ee2a8]" />
      <span>{children}</span>
    </div>
  ) : (
    <p role="alert" className="text-sm/[21px] text-[#ff9aa9]">
      {children}
    </p>
  )
}

function Spinner() {
  return <span className="size-4 animate-spin rounded-full border-2 border-white/25 border-t-white" aria-hidden="true" />
}

// Not signed in: an email, then "check your email" while this tab waits for the link to be used.
function SignIn({ device, code, onSignedIn }: { device?: string; code?: string; onSignedIn: (s: Session) => void }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<ReactNode>('')
  const [busy, setBusy] = useState(false)
  const [waiting, setWaiting] = useState(() => pending.get())

  // wait for the emailed link: this tab polls; another tab finishing it is noticed through storage
  useEffect(() => {
    if (!waiting) return
    let stopped = false
    const tick = async () => {
      const existing = session.get()
      if (existing) return onSignedIn(existing)
      const { status, body } = await relay<{ token?: string; email?: string }>('POST', '/auth/poll', { request: waiting.request, secret: waiting.secret })
      if (stopped) return
      if (status === 200 && body.token) {
        const signedIn = { token: body.token, email: body.email || waiting.email }
        session.set(signedIn)
        pending.set(null)
        return onSignedIn(signedIn)
      }
      if (status === 202 || status === 0) return
      const other = session.get()
      if (other) return onSignedIn(other)
      pending.set(null)
      setWaiting(null)
      setError(body.error || 'The sign-in link expired. Send a new one.')
    }
    const timer = window.setInterval(tick, 2500)
    const onStorage = () => { const s = session.get(); if (s) onSignedIn(s) }
    window.addEventListener('storage', onStorage)
    return () => { stopped = true; window.clearInterval(timer); window.removeEventListener('storage', onStorage) }
  }, [waiting, onSignedIn])

  async function submit(event: FormEvent) {
    event.preventDefault()
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError('Enter a valid email address.')
    setBusy(true)
    const { status, body } = await relay<{ request: string; secret: string }>('POST', '/auth/start', { email: email.trim(), from: 'web' })
    setBusy(false)
    if (status !== 200) {
      if (body.code === 'invite_only') {
        return setError(
          <>
            GAIMER is in a private beta. Got an invite code?{' '}
            <Link to="/beta" className="text-ink underline decoration-white/30 underline-offset-2 hover:decoration-white">Join the beta</Link> first, then come back.
          </>,
        )
      }
      return setError(body.error || 'Something went wrong. Try again.')
    }
    const next = { request: body.request, secret: body.secret, email: email.trim().toLowerCase(), at: Date.now(), device, code }
    pending.set(next)
    setWaiting(next)
  }

  if (waiting) {
    return (
      <Card title="Check your email" sub={<>We sent a sign-in link to <b className="font-medium text-ink">{waiting.email}</b>. Open it on any device; this page carries on by itself.</>}>
        <div className="flex items-center gap-2.5 text-sm/[21px] text-body">
          <Spinner /> Waiting for you to open the link
        </div>
        <button type="button" onClick={() => { pending.set(null); setWaiting(null) }} className={`${outline} mt-5`}>
          Use a different email
        </button>
        <p className="mt-4 text-xs/5 text-subtle">The link works once and expires in 15 minutes. Check your spam folder if it hasn’t arrived.</p>
      </Card>
    )
  }

  return (
    <Card title={device ? 'Sign in to connect GAIMER' : 'Log in or create your account'} sub="No password: we email you a link that signs you in.">
      <form onSubmit={submit} noValidate className="space-y-4">
        <label className="block">
          <span className="text-sm/[21px] text-body">Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" autoFocus placeholder="you@example.com" className={`${field} mt-1.5`} />
        </label>
        {error && <Note tone="error">{error}</Note>}
        <button type="submit" disabled={busy} className={primary}>
          {busy ? 'Sending…' : 'Continue with email'}
          {!busy && <ArrowRight className="size-4" />}
        </button>
      </form>
      <p className="mt-4 text-xs/5 text-subtle">
        During the beta, accounts need an invite. New here? <Link to="/beta" className="text-body underline decoration-white/30 underline-offset-2 hover:text-ink">Join the beta</Link>.
      </p>
      <p className="mt-2 text-xs/5 text-subtle">
        By continuing you agree to the <Link to="/terms" className="text-body underline decoration-white/30 underline-offset-2 hover:text-ink">Terms</Link> and{' '}
        <Link to="/privacy" className="text-body underline decoration-white/30 underline-offset-2 hover:text-ink">Privacy policy</Link>.
      </p>
    </Card>
  )
}

// Signed in, and GAIMER asked to connect: show its code and connect on a press.
function Connect({ who, device, code, onDone }: { who: Session; device: string; code: string; onDone: () => void }) {
  const [state, setState] = useState<'ask' | 'busy' | 'done'>(() => (connected.get() === device ? 'done' : 'ask'))
  const [error, setError] = useState('')
  // connected from another tab: this one shows it too
  useEffect(() => {
    const onStorage = () => { if (connected.get() === device) setState('done') }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [device])
  async function connect() {
    setState('busy')
    setError('')
    const { status, body } = await relay('POST', '/auth/device/approve', { request: device, userCode: code }, who.token)
    if (status === 200) { connected.set(device); return setState('done') }
    if (status === 401) { session.set(null); onDone(); return }
    setState('ask')
    setError(body.error || 'Something went wrong. Try again.')
  }
  if (state === 'done') {
    return (
      <Card title="GAIMER is connected" sub="Go back to GAIMER: it’s signed in and ready.">
        <Note>Connected to <b className="font-medium">{who.email}</b>. You can close this tab.</Note>
      </Card>
    )
  }
  return (
    <Card title="Connect GAIMER Desktop" sub={<>Signed in as <b className="font-medium text-ink">{who.email}</b>.</>}>
      <p className="text-sm/[21px] text-body">Check this code matches the one GAIMER is showing:</p>
      <p className="mt-3 rounded-lg bg-white/[0.06] py-3 text-center font-mono text-2xl font-semibold tracking-[0.2em] text-ink shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]">{code}</p>
      {error && <div className="mt-4"><Note tone="error">{error}</Note></div>}
      <button type="button" onClick={connect} disabled={state === 'busy'} className={`${primary} mt-5`}>
        <MonitorCheck className="size-4" /> {state === 'busy' ? 'Connecting…' : 'Connect GAIMER'}
      </button>
      <p className="mt-4 text-xs/5 text-subtle">Only connect if you pressed Sign in in GAIMER on your own PC just now.</p>
    </Card>
  )
}

// Signed in, nothing to connect: the account at a glance.
function AccountCard({ who, onSignOut }: { who: Session; onSignOut: () => void }) {
  const [account, setAccount] = useState<Account | null>(null)
  useEffect(() => {
    relay<Account>('GET', '/account', undefined, who.token).then(({ status, body }) => {
      if (status === 401) onSignOut()
      else if (status === 200) setAccount(body)
    })
  }, [who, onSignOut])
  async function signOut() {
    await relay('POST', '/auth/sign-out', {}, who.token)
    session.set(null)
    onSignOut()
  }
  return (
    <Card title="Your account" sub={<>Signed in as <b className="font-medium text-ink">{who.email}</b>.</>}>
      <dl className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-white/[0.06] p-3 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]">
          <dt className="text-xs text-subtle">Plan</dt>
          <dd className="mt-1 text-[15px] text-ink">{account ? account.planName : '…'}</dd>
        </div>
        <div className="rounded-lg bg-white/[0.06] p-3 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]">
          <dt className="text-xs text-subtle">Credits left</dt>
          <dd className="mt-1 text-[15px] text-ink">{account ? Math.round(account.remainingCredits * 10) / 10 : '…'}</dd>
        </div>
      </dl>
      <a href={INSTALLER_URL} className={`${primary} mt-5`}>
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4">
          <path d="M0 0h7.6v7.6H0zM8.4 0H16v7.6H8.4zM0 8.4h7.6V16H0zM8.4 8.4H16V16H8.4z" />
        </svg>
        Download GAIMER for Windows
      </a>
      <p className="mt-4 text-sm/[21px] text-body">In GAIMER, press <b className="font-medium text-ink">Sign in</b>: your browser opens here to connect it.</p>
      <button type="button" onClick={signOut} className={`${outline} mt-5`}>
        <LogOut className="size-4" /> Sign out
      </button>
    </Card>
  )
}

export function LoginPage() {
  const [params, setParams] = useSearchParams()
  const [who, setWho] = useState<Session | null>(() => session.get())
  const [confirmState, setConfirmState] = useState<'none' | 'busy' | 'elsewhere' | 'error'>(() => (params.get('confirm') ? 'busy' : 'none'))
  const [confirmError, setConfirmError] = useState('')
  const started = useRef(false)
  const stored = pending.get()
  const device = params.get('device') || stored?.device || undefined
  const code = params.get('code') || stored?.code || undefined

  const signedIn = useCallback((s: Session) => setWho(s), [])
  const signedOut = useCallback(() => setWho(null), [])

  // opened from the sign-in email: confirm the link, then finish here if this browser started the sign-in
  useEffect(() => {
    const confirm = params.get('confirm')
    if (!confirm || started.current) return
    started.current = true
    relay('POST', '/auth/confirm-json', { code: confirm }).then(({ status, body }) => {
      const next = new URLSearchParams(params)
      next.delete('confirm')
      if (stored?.device && !next.get('device')) { next.set('device', stored.device); if (stored.code) next.set('code', stored.code) }
      setParams(next, { replace: true })
      if (status !== 200) { setConfirmState('error'); setConfirmError(body.error || 'That sign-in link didn’t work. Ask for a new one.'); return }
      // this browser has the waiting sign-in: SignIn below finishes it; otherwise it was started on another device
      setConfirmState(pending.get() || session.get() ? 'none' : 'elsewhere')
    })
  }, [params, setParams, stored])

  let body: ReactNode
  if (confirmState === 'busy') body = <Card title="Signing you in…"><div className="flex items-center gap-2.5 text-sm/[21px] text-body"><Spinner /> One moment</div></Card>
  else if (confirmState === 'elsewhere') body = <Card title="You’re signed in" sub="Go back to where you asked to sign in (GAIMER or the other browser tab): it carries on by itself."><Note>You can close this tab.</Note></Card>
  else if (confirmState === 'error' && !who) body = <><Card title="That link didn’t work" sub={confirmError}><button type="button" onClick={() => setConfirmState('none')} className={primary}>Send a new link</button></Card></>
  else if (!who) body = <SignIn device={device} code={code} onSignedIn={signedIn} />
  else if (device && code) body = <Connect who={who} device={device} code={code} onDone={signedOut} />
  else body = <AccountCard who={who} onSignOut={signedOut} />

  return (
    // Fills the window above the footer bar and centres the card in it, below the nav (as the beta page).
    <div className="theme-dark flex min-h-[calc(100svh-110px)] flex-col">
      <div className="grad-down flex flex-1 flex-col justify-center px-4 pt-24 pb-10">
        <div className="mx-auto w-full max-w-[1000px]">
          <header className="flex flex-col items-center text-center">
            <h1 className="flex items-center gap-3 text-3xl/[45px] font-[480] text-ink">
              <LogoIcon className="size-9" /> {device && who ? 'Connect GAIMER' : who ? 'Account' : 'Log in'}
            </h1>
          </header>
          {body}
        </div>
      </div>
    </div>
  )
}
