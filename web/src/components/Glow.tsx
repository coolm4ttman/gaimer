// The banded "dome" gradient that sits behind Lovable's hero and closing CTA,
// re-coloured to the GAIMER palette (violet → pink → orange → amber).
export function Glow({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute -inset-x-[10%] -top-[5%] -bottom-[5%] animate-glow blur-[48px]"
        style={{
          background: [
            'radial-gradient(ellipse 34% 58% at 50% 30%, var(--color-page) 0%, var(--color-page) 45%, transparent 100%)',
            'linear-gradient(180deg, var(--color-page) 0%, var(--color-page) 16%, #b98cff 32%, var(--color-brand-violet) 44%, #e45bd0 58%, var(--color-brand-pink) 70%, var(--color-brand-orange) 82%, var(--color-brand-amber) 100%)',
          ].join(','),
        }}
      />
    </div>
  )
}
