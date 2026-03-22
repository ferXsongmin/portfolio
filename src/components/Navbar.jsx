import { useState, useEffect, useRef } from 'react'
import { Sun, Moon, Download, Menu, X, User, Play } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = ['Home', 'Resume', 'Gallery', 'Portfolio', 'Contact']

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [isDark,       setIsDark]       = useState(true)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [active,       setActive]       = useState('Home')
  const [aboutOpen,    setAboutOpen]    = useState(false)
  const aboutRef = useRef(null)

  const navigate = useNavigate()
  const location = useLocation()
  const isVideoPage = location.pathname === '/video'

  useEffect(() => {
    // threshold 10 — navbar jadi solid hampir seketika saat scroll
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // tutup dropdown saat klik di luar
  useEffect(() => {
    const onClick = (e) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setAboutOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // scroll spy
  useEffect(() => {
    if (isVideoPage) return
    const allLinks = [...navLinks, 'About']
    const observers = allLinks.map(link => {
      const el = document.getElementById(link.toLowerCase())
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(link) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [isVideoPage, location.pathname])

  const scrollTo = (id) => {
    if (isVideoPage) {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id.toLowerCase())
          ?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(id.toLowerCase())
        ?.scrollIntoView({ behavior: 'smooth' })
    }
    setActive(id)
  }

  const scrollToMobile = (id) => {
    scrollTo(id)
    setMenuOpen(false)
  }

  const goToVideo = () => {
    navigate('/video')
    setActive('Video')
    setAboutOpen(false)
    setMenuOpen(false)
  }

  const goToAbout = () => {
    scrollTo('About')
    setAboutOpen(false)
    setMenuOpen(false)
  }

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
  }

  const isAboutActive = active === 'About' || isVideoPage

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <span className="navbar__logo" onClick={() => scrollTo('home')}>
          FerXWonyoung
        </span>

        {/* Desktop links */}
        <ul className="navbar__links">
          <li key="Home">
            <button
              className={`navbar__link ${active === 'Home' && !isVideoPage ? 'navbar__link--active' : ''}`}
              onClick={() => scrollTo('Home')}
            >
              Home
              {active === 'Home' && !isVideoPage && <span className="navbar__dot" />}
            </button>
          </li>

          {/* About dengan dropdown */}
          <li ref={aboutRef} className="navbar__dropdown-wrap">
            <button
              className={`navbar__link ${isAboutActive ? 'navbar__link--active' : ''}`}
              onClick={() => setAboutOpen(!aboutOpen)}
            >
              About
              {isAboutActive && <span className="navbar__dot" />}
            </button>

            {/* Dropdown */}
            <div className={`navbar__dropdown ${aboutOpen ? 'navbar__dropdown--open' : ''}`}>
              <div className="navbar__dropdown-arrow" />
              <button className="navbar__dropdown-item" onClick={goToAbout}>
                <User size={14} />
                About Me
              </button>
              <button className="navbar__dropdown-item" onClick={goToVideo}>
                <Play size={14} />
                My Bini
              </button>
            </div>
          </li>

          {navLinks.filter(l => l !== 'Home').map(link => (
            <li key={link}>
              <button
                className={`navbar__link ${active === link && !isVideoPage ? 'navbar__link--active' : ''}`}
                onClick={() => scrollTo(link)}
              >
                {link}
                {active === link && !isVideoPage && <span className="navbar__dot" />}
              </button>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button className="navbar__theme" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="navbar__cv">
            <Download size={14} />
            DOWNLOAD CV
          </button>
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <button
          className={active === 'Home' && !isVideoPage ? 'active' : ''}
          onClick={() => scrollToMobile('Home')}
        >
          Home
        </button>

        {/* About group di mobile */}
        <div className="navbar__mobile-group">
          <span className="navbar__mobile-group-label">About</span>
          <button onClick={goToAbout}>
            <User size={13} /> About Me
          </button>
          <button
            className={isVideoPage ? 'active' : ''}
            onClick={goToVideo}
          >
            <Play size={13} /> My Fineshyt
          </button>
        </div>

        {navLinks.filter(l => l !== 'Home').map(link => (
          <button
            key={link}
            className={active === link && !isVideoPage ? 'active' : ''}
            onClick={() => scrollToMobile(link)}
          >
            {link}
          </button>
        ))}

        <button className="navbar__mobile-cv">
          <Download size={14} />
          Download CV
        </button>
      </div>

      {menuOpen && (
        <div className="navbar__backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </>
  )
}