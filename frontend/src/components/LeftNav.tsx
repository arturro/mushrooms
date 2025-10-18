import { Link } from 'react-router-dom'

export default function LeftNav() {
  return (
    <nav className="side-nav" aria-label="Left Navigation">
      <ul>
        <li><Link to="/organismus">Organismus List</Link></li>
      </ul>
    </nav>
  )
}
