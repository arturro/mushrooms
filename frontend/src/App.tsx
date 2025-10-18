import Header from './components/Header'
import LeftNav from './components/LeftNav'
import RightNav from './components/RightNav'
import Footer from './components/Footer'
import { Navigate, Route, Routes } from 'react-router-dom'
import OrganismusListPage from './pages/OrganismusListPage'
import OrganismusDetailPage from './pages/OrganismusDetailPage'
import AboutPage from './pages/AboutPage'

export default function App() {
  return (
    <div className="layout">
      <header className="header">
        <Header />
      </header>

      <aside className="left-nav">
        <LeftNav />
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
