import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

// Replica of lovable.dev/product-managers' FAQ (measured at 1440px): centred 576px column, 48/52.8 semibold title,
// 40px gap, then 8px-spaced rows (16px radius, 1px warm border, page background). Question 18/27 weight 480 with
// 12px 16px padding and a chevron that points down when closed; answer 16/24 muted with 0 16px 12px padding.
export function Faq({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="px-6 py-24">
      <div className="mx-auto flex max-w-[576px] flex-col">
        <h2 className="text-center text-[32px]/[1.1] font-semibold tracking-[-1.2px] text-[oklch(0.1_0_0)] md:text-5xl/[52.8px]">
          Frequently asked questions
        </h2>
        <div className="mt-10 flex flex-col gap-2">
          {items.map(([q, a], i) => {
            const isOpen = open === i
            return (
              <div key={q} className="rounded-2xl border border-footer-border bg-page">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-lg/[27px] font-[480] text-[oklch(0.1_0_0)]"
                  >
                    {q}
                    <ChevronRight
                      className={`size-5 shrink-0 text-subtle transition-transform duration-200 motion-reduce:transition-none ${isOpen ? '-rotate-90' : 'rotate-90'}`}
                    />
                  </button>
                </h3>
                <div className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="px-4 pb-3 text-base/6 text-[rgb(95_95_93)]">{a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
