import Header from './components/Header'
import LeftNav from './components/LeftNav'
import RightNav from './components/RightNav'
import Footer from './components/Footer'
import { Navigate, Route, Routes } from 'react-router-dom'
import OrganismusListPage from './pages/OrganismusListPage'
import OrganismusDetailPage from './pages/OrganismusDetailPage'
import AboutPage from './pages/AboutPage'
import { useState, useCallback } from 'react'

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const openMenu = useCallback(() => setMobileNavOpen(true), [])
  const closeMenu = useCallback(() => setMobileNavOpen(false), [])
  const toggleMenu = useCallback(() => setMobileNavOpen(v => !v), [])

  return (
    <div className={`layout${mobileNavOpen ? ' mobile-nav-open' : ''}`}>
      <header className="header">
        <Header onToggleMenu={toggleMenu} />
      </header>

      <aside className={`left-nav${mobileNavOpen ? ' open' : ''}`}>
        <LeftNav mobileOpen={mobileNavOpen} onClose={closeMenu} />
      </aside>

      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/organismus" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/organismus" element={<OrganismusListPage />} />
          <Route path="/organismus/:id" element={<OrganismusDetailPage />} />
        </Routes>
      </main>

      <aside className="right-nav">
        <RightNav />
      </aside>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  )
}
