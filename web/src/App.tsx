import { useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { ShaderBackground } from './components/ui/mesh-drift-shader'
import { isDarkRoute } from './lib/darkRoutes'
import { CommunityPage } from './pages/CommunityPage'
import { CreatorsPage } from './pages/CreatorsPage'
import { GamePage } from './pages/GamePage'
import { GamesPage } from './pages/GamesPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PricingPage } from './pages/PricingPage'
import { ResourcesPage } from './pages/ResourcesPage'

// Start each new page at the top (in-page #anchors still scroll as usual).
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Dark pages: each section's gradient runs the opposite way to the one before. The footer carries on the pattern,
// so it needs the direction after the page's last section.
function footerGradient(pathname: string) {
  if (!isDarkRoute(pathname)) return ''
  return 'theme-dark grad-down'
}

// Site palette for the shader: black, the gradient purple, the button violet and a deep purple.
const SHADER_COLOURS = ['#000000', '#514786', '#6664aa', '#2b2450']

function Layout() {
  const { pathname } = useLocation()
  // Dark pages get a black page background too, so nothing light shows behind the nav or on overscroll.
  const dark = isDarkRoute(pathname)
  useEffect(() => {
    document.body.style.backgroundColor = dark ? '#000' : ''
  }, [dark])
  return (
    <>
      <ScrollToTop />
      {/* Dark pages: one animated mesh behind everything; the grad-down/grad-up sections fade it in and out. */}
      {/* Sized to the large viewport (100lvh) so the phone address bar showing and hiding doesn't resize the canvas,
          which would clear it and flicker. */}
      {dark && (
        <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-lvh">
          <ShaderBackground colors={SHADER_COLOURS} hue={0} />
        </div>
      )}
      <Nav />
      <main>
        <Outlet />
      </main>
      <div className={footerGradient(pathname)}>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="games/:slug" element={<GamePage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="creators" element={<CreatorsPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
