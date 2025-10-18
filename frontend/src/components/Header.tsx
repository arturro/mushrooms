import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="header-inner">
      <Link to="/" className="brand">🍄 Mushrooms</Link>
      <nav className="top-nav" aria-label="Top Navigation">
        <Link to="/" className="link">Home</Link>
        <Link to="/organismus" className="link">Organismus</Link>
        <Link to="/about" className="link">About</Link>
      </nav>
    </div>
  )
}
