import { Features } from '../components/Features'
import { Games } from '../components/Games'
import { Hero } from '../components/Hero'
import { Platform } from '../components/Platform'
import { Proof } from '../components/Proof'
import { Stats } from '../components/Stats'

export function HomePage() {
  return (
    <>
      <Hero />
      <Platform />
      <Features />
      <Games />
      <Proof />
      <Stats />
    </>
  )
}
