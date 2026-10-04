import createGlobe from 'cobe'
import { useCallback, useEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'

// Draggable cobe globe with mod-activity pills anchored to each marker (CSS anchor positioning).
// PLACEHOLDER locations and mods – swap for real activity data before launch.

interface ModMarker {
  id: string
  location: [number, number]
  status: 'Building' | 'Shipped'
  game: string
  mod: string
}

const defaultMarkers: ModMarker[] = [
  { id: 'sf', location: [37.78, -122.44], status: 'Building', game: 'GTA V', mod: 'Grappling hook' },
  { id: 'london', location: [51.51, -0.13], status: 'Shipped', game: 'Skyrim', mod: 'Dragon loot tables' },
  { id: 'tokyo', location: [35.68, 139.65], status: 'Building', game: 'Elden Ring', mod: 'Co-op revive' },
  { id: 'paris', location: [48.86, 2.35], status: 'Building', game: 'Cyberpunk 2077', mod: 'Netrunner perks' },
  { id: 'sydney', location: [-33.87, 151.21], status: 'Shipped', game: 'Minecraft', mod: 'Co-op base building' },
  { id: 'nyc', location: [40.71, -74.01], status: 'Shipped', game: 'Red Dead 2', mod: 'Stamina rebalance' },
]

export function Globe({
  markers = defaultMarkers,
  className = '',
  speed = 0.003,
}: {
  markers?: ModMarker[]
  className?: string
  speed?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)
  const handlePointerDown = useCallback((e: ReactPointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerup', handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId = 0
    let ro: ResizeObserver | null = null
    let phi = 0

    function init() {
      const width = canvas!.offsetWidth
      if (width === 0 || globe) return
      const g = createGlobe(canvas!, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.2,
        dark: 0,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 10,
        baseColor: [0.95, 0.95, 0.95],
        markerColor: [1, 0.235, 0.44], // brand pink #ff3c70
        glowColor: [0.94, 0.93, 0.91],
        markerElevation: 0.01,
        markers: markers.map((m) => ({ location: m.location, size: 0.02, id: m.id })),
        arcs: [],
        arcColor: [0.9, 0.3, 0.3],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.7,
      })
      globe = g
      const animate = () => {
        if (!isPausedRef.current) phi += speed
        g.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
        })
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => (canvas!.style.opacity = '1'))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro?.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      ro?.disconnect()
      cancelAnimationFrame(animationId)
      globe?.destroy()
    }
  }, [markers, speed])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        className="size-full cursor-grab rounded-full opacity-0 transition-opacity duration-[1.2s] [touch-action:none]"
      />
      {markers.map((m) => (
        <div
          key={m.id}
          className="pointer-events-none absolute mb-2 flex items-center gap-1.5 rounded bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] px-2.5 py-1.5 whitespace-nowrap shadow-[0_4px_12px_rgb(0_0_0/0.25)] transition-[opacity,filter] duration-400"
          style={{
            positionAnchor: `--cobe-${m.id}`,
            bottom: 'anchor(top)',
            left: 'anchor(center)',
            translate: '-50% 0',
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
          } as CSSProperties}
        >
          {m.status === 'Building' ? (
            <span className="size-2 animate-[live-pulse_1.5s_ease-in-out_infinite] rounded-full bg-brand-amber shadow-[0_0_8px_var(--color-brand-amber)]" />
          ) : (
            <span className="size-2 rounded-full bg-emerald-400" />
          )}
          <span
            className={`font-mono text-[0.65rem] font-semibold tracking-[0.1em] uppercase ${
              m.status === 'Building' ? 'text-brand-amber' : 'text-emerald-400'
            }`}
          >
            {m.status}
          </span>
          <span className="border-l border-white/20 pl-1.5 text-[0.7rem] text-white/80">
            <span className="hidden text-white/50 sm:inline">{m.game} ·</span> {m.mod}
          </span>
        </div>
      ))}
    </div>
  )
}
