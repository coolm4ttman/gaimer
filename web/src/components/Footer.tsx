import { ArrowRight } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { isDarkRoute } from '../lib/darkRoutes'
import { DownloadButton } from './Download'
import { HeroBackdrop } from './HeroBackdrop'
import { Logo } from './Logo'

// One-line footer: full logo and a handful of links.
// PLACEHOLDER: Privacy points home until a privacy page exists.
const links: [string, string][] = [
  ['How it works', '/#how-it-works'],
  ['Games', '/games'],
  ['Pricing', '/pricing'],
  ['Privacy', '/'],
]

const YEAR = new Date().getFullYear()

export function Footer() {
  const dark = isDarkRoute(useLocation().pathname)
  return (
    <div id="cta" className="relative scroll-mt-16 overflow-hidden pt-[92px] pb-[30px]">
      {/* Closing call to action: a boxed panel over the rotating game art, matching the hero. */}
      <div className="relative z-10 px-2 md:px-20">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-t-3xl">
          <HeroBackdrop />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgb(0_0_0/0.82)_0%,rgb(0_0_0/0.55)_60%,rgb(0_0_0/0.25)_100%)]"
          />
          <div className="relative flex flex-col items-center px-6 py-[130px] text-center md:py-[162px]">
            <h2 className="text-balance text-[32px]/[1.1] font-semibold tracking-[-1.28px] text-white md:text-5xl/[1.1] md:tracking-[-1.92px]">
              Ready to bring your mod to life?
            </h2>
            <p className="mt-4 max-w-[440px] text-base/6 text-white/70 md:text-lg/7">
              Describe your first mod in minutes. Free to start, with 5 credits every day.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <DownloadButton />
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-[15px] font-medium text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.18)] backdrop-blur-md transition-colors hover:bg-white/15"
              >
                See pricing <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-2 md:px-20">
        <footer className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 rounded-b-3xl border border-t-0 border-footer-border bg-footer px-6 py-6 md:flex-row md:px-10">
          <Logo onDark={dark} />
          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
              {links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-sm/[21px] text-subtle transition-colors hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs text-subtle">© {YEAR} GAIMER</p>
        </footer>
      </div>
    </div>
  )
}
