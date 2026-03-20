import { useState, useEffect } from 'react'
import { Sun, Moon, Download } from 'lucide-react'
import './Navbar.css'

const navLinks = ['Home', 'About', 'Resume', 'Gallery', 'Portfolio', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <span className="navbar__logo">FerXWonyoung</span>

      <ul className="navbar__links">
        {navLinks.map(link => (
          <li key={link}>
            <button
              className={`navbar__link ${active === link ? 'navbar__link--active' : ''}`}
              onClick={() => scrollTo(link)}
            >
              {link}
              {active === link && <span className="navbar__dot" />}
            </button>
          </li>
        ))}
      </ul>

      <div className="navbar__actions">
        <button className="navbar__theme" onClick={() => setIsDark(!isDark)} aria-label="Toggle theme">
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className="navbar__cv">
          <Download size={14} />
          DOWNLOAD CV
        </button>
      </div>
    </nav>
  )
}
