// "Coming soon" tag for games GAIMER doesn't support yet (data/games.ts `comingSoon`). Same pill as the
// pricing page's badges.
export function ComingSoonBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`rounded-full bg-white/[0.1] px-2 py-0.5 text-[11px]/4 font-medium whitespace-nowrap text-white/75 ${className}`}>
      Coming soon
    </span>
  )
}
