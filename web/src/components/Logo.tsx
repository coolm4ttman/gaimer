import { Link } from 'react-router'

export function LogoIcon({ className = 'size-8' }: { className?: string }) {
  return <img src="/brand/icon.svg" alt="" className={`${className} object-contain`} />
}

// Nav logo: the pixel controller icon on its own (also the favicon).
export function Logo({ className = 'size-9' }: { className?: string }) {
  return (
    <Link to="/" aria-label="Gaimer home" className="flex shrink-0 items-center">
      <LogoIcon className={className} />
    </Link>
  )
}
