import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.jpeg'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-logo" onClick={close}>
          <img src={logo} alt="TrackMap Logo" />
          <div className="nav-logo-text">
            <span>TrackMap Innovations</span>
            <span>Private Limited</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/roles">Roles</NavLink></li>
          <li><NavLink to="/verify">Verify Certificate</NavLink></li>
          {!user ? (
            <>
              <li><NavLink to="/login" className="nav-btn-outline btn btn-sm">Login</NavLink></li>
              <li><NavLink to="/register" className="nav-btn btn btn-sm">Apply Now</NavLink></li>
            </>
          ) : user.role === 'admin' ? (
            <>
              <li><NavLink to="/admin" className="nav-btn btn btn-sm">Admin Panel</NavLink></li>
              <li><button onClick={handleLogout} className="btn btn-sm btn-outline">Logout</button></li>
            </>
          ) : (
            <>
              <li><NavLink to="/dashboard" className="nav-btn btn btn-sm">My Dashboard</NavLink></li>
              <li><button onClick={handleLogout} className="btn btn-sm btn-outline">Logout</button></li>
            </>
          )}
        </ul>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
          <span style={{ opacity: menuOpen ? 0 : 1 }}></span>
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={close}>Home</Link>
        <Link to="/about" onClick={close}>About</Link>
        <Link to="/roles" onClick={close}>Internship Roles</Link>
        <Link to="/verify" onClick={close}>Verify Certificate</Link>
        {!user ? (
          <>
            <Link to="/login" className="mob-outline" onClick={close}>Login</Link>
            <Link to="/register" className="mob-primary" onClick={close}>Apply Now →</Link>
          </>
        ) : user.role === 'admin' ? (
          <>
            <Link to="/admin" className="mob-primary" onClick={close}>Admin Panel</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="mob-primary" onClick={close}>My Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </>
  )
}
