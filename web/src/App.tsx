import { useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
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

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
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
