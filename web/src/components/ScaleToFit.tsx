import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

// Lays children out at least `width` wide (wider containers just get the full width) and scales them down to fit narrower containers, so a desktop-sized
// mockup reads as a miniature of the real thing on phones instead of reflowing into a cramped layout.
// `minScale` stops it shrinking further: past that point the content keeps its size and runs off the right edge
// (cropped by whatever clips the parent), like Cursor's hero on phones.
export function ScaleToFit({ width, minScale = 0, children }: { width: number; minScale?: number; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState({ scale: 1, height: 0, inner: width })

  useLayoutEffect(() => {
    const measure = () => {
      if (!outer.current || !inner.current) return
      const available = outer.current.offsetWidth
      const scale = Math.max(minScale, Math.min(1, available / width))
      setBox({ scale, height: inner.current.offsetHeight * scale, inner: Math.max(width, available) })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (outer.current) ro.observe(outer.current)
    if (inner.current) ro.observe(inner.current)
    return () => ro.disconnect()
  }, [width, minScale])

  return (
    <div ref={outer} style={{ height: box.height || undefined }}>
      <div ref={inner} style={{ width: box.inner, transform: `scale(${box.scale})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  )
}
