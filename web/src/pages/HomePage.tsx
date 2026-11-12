import { Games } from '../components/Games'
import { Hero } from '../components/Hero'
import { Proof } from '../components/Proof'
import { Showcase } from '../components/Showcase'

export function HomePage() {
  return (
    <>
      {/* Dark home page: each section's gradient runs the opposite way to the one before (black to purple, purple to
          black, ...), continuing into the footer (see App's Layout). */}
      <div className="theme-dark">
        <div className="grad-down">
          <Hero />
        </div>
        <div className="grad-up">
          <Showcase />
        </div>
        <div className="grad-down">
          <Games />
        </div>
        <div className="grad-up">
          <Proof />
        </div>
      </div>
    </>
  )
}
