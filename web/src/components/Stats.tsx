import { useEffect, useState } from 'react'
import { Globe } from './Globe'

// PLACEHOLDER numbers – replace with real metrics before launch.
const stats = [
  ['Mods built every week', '00,000'],
  ['Games supported', '000+'],
  ['Hours of modding saved', '0.0 million'],
]

export function Stats() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % stats.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="overflow-x-clip px-6 py-30">
      <div className="container-l grid items-center gap-16 lg:grid-cols-[minmax(0,480px)_1fr] lg:gap-12">
        <div>
          <h2 className="text-[28px]/[1.1] font-semibold tracking-[-1.12px] text-ink md:text-4xl/[1.1] md:tracking-[-1.44px]">
            Millions of players, more mods
          </h2>
          <p className="mt-4 text-lg/7 text-body">
            Modders across the world use Gaimer every day to build the content their games are missing. Join them now and
            turn “someone should mod this” into today.
          </p>
          <dl className="mt-10 space-y-5">
            {stats.map(([label, value], i) => (
              <div key={label} className={`transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-45'}`}>
                <dt className="text-sm/5 text-body">{label}</dt>
                <dd className="mt-0.5 text-[40px]/[1.1] font-[480] tracking-[-1.44px] text-ink md:text-5xl/[1.1]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mx-auto w-full max-w-[600px]">
          <Globe />
        </div>
      </div>
    </section>
  )
}
