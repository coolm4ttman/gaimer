import { ChevronDown, Globe } from 'lucide-react'
import { Link } from 'react-router'
import { DownloadButton } from './Download'
import { Glow } from './Glow'
import { LogoIcon } from './Logo'

// Footer links that have a page so far; the rest are placeholders.
const routes: Record<string, string> = {
  Creators: '/creators',
  Pricing: '/pricing',
  'Supported games': '/games',
  Learn: '/resources',
  Guides: '/resources',
  Templates: '/resources',
  Support: '/resources',
  Discord: '/community',
  Reddit: '/community',
  'X / Twitter': '/community',
  YouTube: '/community',
  Twitch: '/community',
}

const columns: { title: string; links: string[] }[] = [
  { title: 'Company', links: ['Careers', 'Press & media', 'Creators', 'Security', 'Trust center', 'Partnerships'] },
  {
    title: 'Product',
    links: ['Pricing', 'Student discount', 'Mod builder', 'Total conversions', 'UI overhauls', 'Hot reload', 'Mod loaders', 'Download app', 'Changelog', 'Status'],
  },
  { title: 'Resources', links: ['Learn', 'Templates', 'Guides', 'Supported games', 'MCP server', 'Videos', 'Blog', 'Support', 'Sitemap'] },
  {
    title: 'Legal',
    links: ['Privacy policy', 'Cookie settings', 'Terms of service', 'Modding policy', 'DMCA policy', 'Accessibility', 'Report abuse', 'Report security concerns'],
  },
  { title: 'Community', links: ['Become a partner', 'Affiliates', 'Code of conduct', 'Discord', 'Reddit', 'X / Twitter', 'YouTube', 'Twitch'] },
]

export function Footer() {
  return (
    <div id="cta" className="relative scroll-mt-16 overflow-hidden pb-20">
      <Glow />
      <div className="relative z-10 flex flex-col items-center px-6 pt-8 text-center">
        <h1 className="text-lg/7 text-body">AI Mod Builder</h1>
        <h2 className="mt-1 text-[28px]/[1.1] font-semibold tracking-[-1.12px] text-ink-strong md:text-4xl/[1.1] md:tracking-[-1.44px]">
          Ready to bring your mod to life?
        </h2>
        <div className="mt-9">
          <DownloadButton />
        </div>
      </div>

      <div className="relative z-10 mt-[72px] px-2 md:px-20">
        <footer className="mx-auto max-w-[1280px] rounded-2xl border border-footer-border bg-footer p-6 sm:p-8 md:p-14">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr]">
            <div className="flex flex-col justify-between gap-8">
              <Link to="/" aria-label="Gaimer home">
                <LogoIcon className="size-8" />
              </Link>
              <button className="hidden w-fit items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-xs text-ink shadow-button lg:flex">
                <Globe className="size-3.5" /> EN <ChevronDown className="size-3" />
              </button>
            </div>
            <nav className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
              {columns.map((c) => (
                <div key={c.title}>
                  <h3 className="text-sm/5 font-semibold text-ink">{c.title}</h3>
                  <ul className="mt-4 space-y-[11px]">
                    {c.links.map((l) => (
                      <li key={l}>
                        <Link to={routes[l] ?? '/'} className="text-sm/[21px] text-subtle transition-colors hover:text-ink">
                          {l}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </footer>
      </div>
    </div>
  )
}
