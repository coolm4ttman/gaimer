import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'

// Replica of lovable.dev's Resources mega-menu (measured at 1440px): 826px cream panel, 20px radius, raised ring
// shadow; a lighter left pane with a 12px label and a 2-column list of 240px links (16px/480 title, 12px muted
// line, 7/12/9 padding, 10px radius); a right "Announcement" column with a 220x124 image, 14px/480 title and
// "Learn more". Used in the nav dropdown and on /resources.
// PLACEHOLDER: these pages don't exist yet; every link points back to /resources.

const resourceLinks: { title: string; line: string; to: string }[] = [
  { title: 'Blog', line: 'Ideas, updates, stories.', to: '/resources' },
  { title: 'Mod loaders', line: 'Connect the tools you already use.', to: '/resources' },
  { title: 'Guides', line: 'Learn as you mod.', to: '/resources' },
  { title: 'Academy', line: 'Learn to mod with Gaimer.', to: '/resources' },
  { title: 'Templates', line: 'Start from a working mod.', to: '/resources' },
  { title: 'Docs', line: 'Everything under the hood.', to: '/resources' },
  { title: 'Changelog', line: 'What’s new in Gaimer.', to: '/resources' },
  { title: 'Creator stories', line: 'See what modders have built.', to: '/creators' },
]

const announcement = {
  image: '/games/cards/elden-ring-2.jpg',
  title: 'Hot reload now works with Elden Ring: tune boss fights without restarting the game',
  to: '/games/elden-ring',
}

const raised = 'shadow-[0_0_0_1px_#fff,0_0_0_2px_rgb(119_119_113/0.16),0_8px_24px_-8px_rgb(0_0_0/0.12)]'

export function ResourcesPanel({ onNavigate, className = '' }: { onNavigate?: () => void; className?: string }) {
  return (
    <div className={`flex w-[826px] max-w-full rounded-[20px] bg-cream p-px max-md:flex-col ${raised} ${className}`}>
      <div className="flex-1 rounded-[19px] bg-page p-5 shadow-[0_0_0_1px_rgb(0_0_0/0.04)]">
        <div className="px-3 text-xs/4 text-[rgb(95_95_93)]">Resources</div>
        <ul className="mt-3 grid gap-0.5 sm:grid-cols-2">
          {resourceLinks.map((r) => (
            <li key={r.title}>
              <Link
                to={r.to}
                onClick={onNavigate}
                className="block rounded-[10px] px-3 pt-[7px] pb-[9px] transition-colors hover:bg-black/[0.04]"
              >
                <div className="text-base/6 font-[480] text-[oklch(0.1_0_0)]">{r.title}</div>
                <div className="text-xs/4 text-[rgb(95_95_93)]">{r.line}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Link to={announcement.to} onClick={onNavigate} className="group block w-full p-5 md:w-[272px]">
        <div className="text-xs/4 text-[rgb(95_95_93)]">Announcement</div>
        <img src={announcement.image} alt="" className="mt-4 h-[124px] w-full rounded-lg object-cover md:w-[220px]" />
        <div className="mt-4 text-sm/5 font-[480] text-[oklch(0.1_0_0)]">{announcement.title}</div>
        <span className="mt-2 inline-flex items-center gap-1 text-sm/5 font-[480] text-[rgb(95_95_93)] group-hover:text-ink">
          Learn more <ChevronRight className="size-3.5" />
        </span>
      </Link>
    </div>
  )
}
