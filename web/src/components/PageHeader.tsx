import type { ReactNode } from 'react'
import { Glow } from './Glow'

// Shared top section for the inner pages: same type scale as the home sections, with a soft brand glow.
export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden px-6 pt-36 pb-20 md:pt-44 md:pb-28">
      <Glow className="opacity-50 [&>div]:animate-none" />
      <div className="relative z-10 container-l">
        <p className="text-sm font-medium text-subtle">{eyebrow}</p>
        <h1 className="mt-2 max-w-[720px] text-[32px]/[1.1] font-semibold tracking-[-1.28px] text-balance text-ink md:text-5xl/[1.1] md:tracking-[-1.92px]">
          {title}
        </h1>
        {children && <div className="mt-4 max-w-[560px] text-base/6 text-body md:text-lg/7">{children}</div>}
      </div>
    </section>
  )
}
