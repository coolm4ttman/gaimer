import { Link } from 'react-router'

export function LogoIcon({ className = 'size-8' }: { className?: string }) {
  return <img src="/brand/icon.svg" alt="" className={`${className} object-contain`} />
}

// Nav lockup (pixel controller + GAIMER wordmark). `onDark` uses the white-lettered version for dark backgrounds;
// otherwise the same lockup with brand-purple letters.
// `white` renders the whole lockup (icon included) in solid white.
export function Logo({ onDark = false, white = false }: { onDark?: boolean; white?: boolean }) {
  return (
    <Link to="/" aria-label="GAIMER home" className="flex shrink-0 items-center">
      <img
        src={onDark ? '/brand/logo-on-dark.webp' : '/brand/logo-on-light.webp'}
        alt="GAIMER"
        className={`h-7 w-auto ${white ? 'brightness-0 invert' : ''}`}
      />
    </Link>
  )
}
