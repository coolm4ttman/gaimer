// TODO: point at the real installers once there are some (one per platform).
export const DOWNLOAD_URL = '#cta'

type Os = 'windows' | 'mac'

// Visitors on a Mac get the macOS label and Apple logo; everyone else gets Windows. Phones and tablets can't
// run the desktop app, so they get Windows too (iPads report "MacIntel", so rule out touch screens).
function detectOs(): Os {
  if (typeof navigator === 'undefined') return 'windows'
  const mac = /Mac/i.test(navigator.platform || navigator.userAgent) && navigator.maxTouchPoints < 2
  return mac ? 'mac' : 'windows'
}

function WindowsLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M0 0h7.6v7.6H0zM8.4 0H16v7.6H8.4zM0 8.4h7.6V16H0zM8.4 8.4H16V16H8.4z" />
    </svg>
  )
}

// Apple logo (Simple Icons, CC0).
function AppleLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  )
}

// lg: hero/CTA button ("Download for Windows"); sm: nav-sized. `full` adds the platform name at the small size.
export function DownloadButton({ size = 'lg', full = false, className = '' }: { size?: 'sm' | 'lg'; full?: boolean; className?: string }) {
  const os = detectOs()
  const label = size === 'lg' || full ? `Download for ${os === 'mac' ? 'macOS' : 'Windows'}` : 'Download'
  const Logo = os === 'mac' ? AppleLogo : WindowsLogo
  return (
    <a
      href={DOWNLOAD_URL}
      className={`download-gradient inline-flex items-center rounded-lg text-white transition-opacity hover:opacity-90 ${
        size === 'lg' ? 'gap-2 px-4 py-2.5 text-[15px] font-medium' : 'gap-1.5 px-2.5 py-1.5 text-sm/[21px]'
      } ${className}`}
    >
      <Logo className={size === 'lg' ? 'size-4' : 'size-3.5'} />
      {label}
    </a>
  )
}
