// import { useState, useEffect } from 'react'
// import { Sun, Moon, Download } from 'lucide-react'
// import './Navbar.css'

// const navLinks = ['Home', 'About', 'Resume', 'Gallery', 'Portfolio', 'Contact']

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false)
//   const [isDark,   setIsDark]   = useState(true)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [active,   setActive]   = useState('Home')

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40)
//     window.addEventListener('scroll', onScroll)
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   const scrollTo = (id) => {
//     document.getElementById(id.toLowerCase())
//       ?.scrollIntoView({ behavior: 'smooth' })
//     setActive(id)
//   }

//   const scrollToMobile = (id) => {
//   scrollTo(id)
//   setMenuOpen(false)
// }


//   const toggleTheme = () => {
//     const next = !isDark
//     setIsDark(next)
//     document.documentElement.setAttribute(
//       'data-theme',
//       next ? 'dark' : 'light'
//     )
//   }


//   return (
//     <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
//       <span className="navbar__logo">FerXWonyoung</span>

//       <ul className="navbar__links">
//         {navLinks.map(link => (
//           <li key={link}>
//             <button
//               className={`navbar__link ${active === link ? 'navbar__link--active' : ''}`}
//               onClick={() => scrollTo(link)}
//             >
//               {link}
//               {active === link && <span className="navbar__dot" />}
//             </button>
//           </li>
//         ))}
//       </ul>
      
//       <div className="navbar__actions">
//         <button className="navbar__theme" 
// onClick={toggleTheme}
//  aria-label="Toggle theme">
//           {isDark ? <Sun size={16} /> : <Moon size={16} />}
//         </button>
//         <button className="navbar__cv">
//           <Download size={14} />
//           DOWNLOAD CV
//         </button>
//       </div>
//     </nav>
//   )
// }

import { useState, useEffect } from 'react'
import { Sun, Moon, Download, Menu, X } from 'lucide-react'
import './Navbar.css'

const navLinks = ['Home', 'About', 'Resume', 'Gallery', 'Portfolio', 'Contact']

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [isDark,    setIsDark]    = useState(true)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [active,    setActive]    = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // tutup menu saat scroll
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
  }

  const scrollToMobile = (id) => {
    scrollTo(id)
    setMenuOpen(false)
  }

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.setAttribute(
      'data-theme',
      next ? 'dark' : 'light'
    )
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <span className="navbar__logo">FerXWonyoung</span>

        {/* Desktop links */}
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
          <button className="navbar__theme" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="navbar__cv">
            <Download size={14} />
            DOWNLOAD CV
          </button>

          {/* Hamburger — hanya muncul di mobile via CSS */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}
      >
        {navLinks.map(link => (
          <button
            key={link}
            className={active === link ? 'active' : ''}
            onClick={() => scrollToMobile(link)}
          >
            {link}
          </button>
        ))}

        {/* CV button di dalam mobile menu */}
        <button className="navbar__mobile-cv">
          <Download size={14} />
          Download CV
        </button>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="navbar__backdrop"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}