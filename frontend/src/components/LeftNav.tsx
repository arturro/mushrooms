import { Link } from 'react-router-dom'

export default function LeftNav({ mobileOpen, onClose }: { mobileOpen?: boolean; onClose?: () => void }) {
  const handleClick = () => {
    if (mobileOpen && onClose) onClose()
  }
  return (
    <nav className="side-nav" aria-label="Left Navigation" onClick={handleClick}>
      <ul>
        <li><Link to="/organismus">Organismus List</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  )
}
