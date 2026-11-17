// The GAIMER account on the website: sign-in by emailed link (the email opens /login?confirm=...), the session
// kept in this browser, and connecting GAIMER Desktop (gaimer-platform relay/src/auth.js and device-auth.js).
export const RELAY = 'https://gaimer-relay.gaimer.workers.dev'
export const INSTALLER_URL = 'https://gaimer-updates.gaimer.workers.dev/latest'

const SESSION_KEY = 'gaimer.session'
const PENDING_KEY = 'gaimer.pendingSignIn'
const CONNECTED_KEY = 'gaimer.connectedDevice'

export type Session = { token: string; email: string }
// A sign-in waiting for its emailed link, kept so the tab the link opens in can finish it too, along with the
// GAIMER Desktop connect it was started for (if any).
export type Pending = { request: string; secret: string; email: string; at: number; device?: string; code?: string }
export type Account = { email: string; planName: string; paid: boolean; remainingCredits: number; dailyLeft: number; topupCredits: number }

function read<T>(key: string): T | null {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') as T | null
  } catch {
    return null
  }
}
function write(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // private browsing without storage: the session lasts as long as the page
  }
}

export const session = {
  get: () => read<Session>(SESSION_KEY),
  set: (value: Session | null) => write(SESSION_KEY, value),
}
export const pending = {
  get: () => {
    const value = read<Pending>(PENDING_KEY)
    return value && Date.now() - value.at < 15 * 60 * 1000 ? value : null
  },
  set: (value: Pending | null) => write(PENDING_KEY, value),
}

// the GAIMER Desktop connect a tab finished, so the other open tabs show it as done too
export const connected = {
  get: () => read<string>(CONNECTED_KEY),
  set: (request: string) => write(CONNECTED_KEY, request),
}

export async function relay<T = Record<string, unknown>>(method: string, path: string, body?: unknown, token?: string) {
  let response: Response
  try {
    response = await fetch(`${RELAY}${path}`, {
      method,
      headers: { ...(body === undefined ? {} : { 'content-type': 'application/json' }), ...(token ? { authorization: `Bearer ${token}` } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    return { status: 0, body: { error: 'GAIMER couldn’t be reached. Check your connection and try again.' } as T & { error?: string; code?: string } }
  }
  const parsed = (await response.json().catch(() => ({}))) as T & { error?: string; code?: string }
  return { status: response.status, body: parsed }
}
