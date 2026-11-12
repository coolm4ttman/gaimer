import { useEffect, useState } from 'react'

// High-resolution game key art behind the hero app window (Steam 2x library art, 2560px), crossfading every few
// seconds. `focus` keeps each image's subject in frame when the wide art is cropped to the panel.
const ART: { src: string; focus: string }[] = [
  { src: '/games/backdrops/elden-ring.jpg', focus: '50% 50%' },
  { src: '/games/backdrops/gta-v.jpg', focus: '62% 30%' },
  { src: '/games/backdrops/red-dead-redemption-2.jpg', focus: '68% 40%' },
  { src: '/games/backdrops/cyberpunk-2077.jpg', focus: '62% 40%' },
]
const INTERVAL_MS = 6000

export function HeroBackdrop() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((n) => (n + 1) % ART.length), INTERVAL_MS)
    return () => clearInterval(t)
  }, [])

  return (
    <div aria-hidden="true" className="absolute inset-0">
      {ART.map((a, k) => (
        <img
          key={a.src}
          src={a.src}
          alt=""
          loading={k === 0 ? 'eager' : 'lazy'}
          decoding="async"
          style={{ objectPosition: a.focus }}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-[1500ms] ${k === i ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  )
}
