// GAIMER is in a private beta: the beta page (pages/BetaPage.tsx) takes an invite code and an email, then gives
// the download.
export const DOWNLOAD_URL = '/beta'

// GAIMER runs on Windows only (it needs GTA V), so every download button says Windows.

function WindowsLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M0 0h7.6v7.6H0zM8.4 0H16v7.6H8.4zM0 8.4h7.6V16H0zM8.4 8.4H16V16H8.4z" />
    </svg>
  )
}

// lg: hero/CTA button ("Download for Windows"); sm: nav-sized. `full` adds the platform name at the small size.
export function DownloadButton({ size = 'lg', full = false, className = '' }: { size?: 'sm' | 'lg'; full?: boolean; className?: string }) {
  const label = size === 'lg' || full ? 'Download for Windows' : 'Download'
  return (
    <a
      href={DOWNLOAD_URL}
      className={`download-gradient inline-flex items-center rounded-lg text-white transition-opacity hover:opacity-90 ${
        size === 'lg' ? 'gap-2 px-4 py-2.5 text-[15px] font-medium' : 'gap-1.5 px-2.5 py-1.5 text-sm/[21px]'
      } ${className}`}
    >
      <WindowsLogo className={size === 'lg' ? 'size-4' : 'size-3.5'} />
      {label}
    </a>
  )
}
