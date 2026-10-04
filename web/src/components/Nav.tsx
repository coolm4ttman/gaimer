import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { games } from '../data/games'
import { DownloadButton } from './Download'
import { Logo } from './Logo'
import { ResourcesPanel } from './ResourcesPanel'

// Plain links after the Games and Resources menus (the mobile menu also lists Resources).
const links: { label: string; to: string }[] = [
  { label: 'Community', to: '/community' },
  { label: 'Pricing', to: '/pricing' },
]
const mobileLinks = [{ label: 'Resources', to: '/resources' }, ...links]

// Lovable-style Resources mega-menu; opens on hover or click, closes on Escape, outside click or navigation.
function ResourcesMenu({ tone }: { tone: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onClick)
    }
  }, [open])

  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(true)}
        className={`flex items-center gap-1 px-1.5 py-1 text-[15px] leading-6 transition-[opacity,color] hover:opacity-60 ${tone}`}
      >
        Resources <ChevronDown className={`size-3.5 opacity-70 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        // pt-2 bridges the gap so the menu stays open while the pointer moves onto it.
        <div className="absolute top-full left-[-110px] pt-2">
          <ResourcesPanel onNavigate={() => setOpen(false)} />
        </div>
      )}
    </li>
  )
}

function GamesMenu({ tone }: { tone: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onClick)
    }
  }, [open])

  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        aria-expanded={open}
        aria-haspopup="true"
        // Hover already opens it on desktop, so a click only ever opens (Escape or clicking away closes).
        onClick={() => setOpen(true)}
        className={`flex items-center gap-1 px-1.5 py-1 text-[15px] leading-6 transition-[opacity,color] hover:opacity-60 ${tone}`}
      >
        Games <ChevronDown className={`size-3.5 opacity-70 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        // pt-2 bridges the gap so the menu stays open while the pointer moves onto it.
        <div className="absolute top-full left-0 pt-2">
          <div className="w-[300px] rounded-xl bg-surface p-2 shadow-prompt">
            <ul>
              {games.map((g) => (
                <li key={g.slug}>
                  <Link to={`/games/${g.slug}`} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-black/[0.04]">
                    <span className="flex h-8 w-14 shrink-0 items-center justify-center rounded-md bg-muted-surface">
                      <img src={g.logo} alt="" className="max-h-5 w-auto max-w-[44px] object-contain" />
                    </span>
                    <span className="text-sm text-ink">{g.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/games"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-between rounded-lg border-t border-black/5 px-2 pt-3 pb-2 text-sm font-medium text-ink hover:opacity-70"
            >
              All supported games <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      )}
    </li>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Over the dark hero video (home page only), until the nav picks up its light background.
  const onVideo = pathname === '/' && !scrolled && !open
  const tone = onVideo ? 'text-white' : 'text-ink'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
        scrolled || open ? 'bg-page/80 backdrop-blur-md' : ''
      }`}
    >
      <div className="container-l flex h-16 items-center justify-between px-6 min-[1168px]:px-0">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-[14px]">
              <GamesMenu tone={tone} />
              <ResourcesMenu tone={tone} />
              {links.map((l) => (
                <li key={l.label}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `flex items-center px-1.5 py-1 text-[15px] leading-6 transition-[opacity,color] hover:opacity-60 ${tone} ${
                        isActive ? 'font-medium' : ''
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="#cta"
            className={`rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
              onVideo
                ? 'text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.35)] hover:bg-white/10'
                : 'text-ink shadow-[inset_0_0_0_1px_rgb(0_0_0/0.15)] hover:bg-black/5'
            }`}
          >
            Log in
          </a>
          <DownloadButton size="sm" />
        </div>
        <button className={`p-2 lg:hidden ${tone}`} onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="h-[calc(100dvh-4rem)] overflow-y-auto bg-page px-6 pb-8 lg:hidden">
          <ul className="flex flex-col py-2">
            <li className="border-b border-black/5 py-4">
              <Link to="/games" onClick={() => setOpen(false)} className="block text-lg">
                Games
              </Link>
              <ul className="mt-2 space-y-1 pl-3">
                {games.map((g) => (
                  <li key={g.slug}>
                    <Link to={`/games/${g.slug}`} onClick={() => setOpen(false)} className="block py-1.5 text-base text-body">
                      {g.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {mobileLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} onClick={() => setOpen(false)} className="block border-b border-black/5 py-4 text-lg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-2 gap-2">
            <a href="#cta" onClick={() => setOpen(false)} className="rounded-lg py-2.5 text-center shadow-[inset_0_0_0_1px_rgb(0_0_0/0.15)]">
              Log in
            </a>
            <DownloadButton size="sm" className="justify-center py-2.5" />
          </div>
        </div>
      )}
    </header>
  )
}
