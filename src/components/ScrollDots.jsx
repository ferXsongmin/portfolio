import { useState, useEffect } from 'react'
import './ScrollDots.css'

const sections = [
  { id: 'home',      label: 'Home'      },
  { id: 'about',     label: 'About'     },
  { id: 'resume',    label: 'Resume'    },
  { id: 'gallery',   label: 'Gallery'   },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact',   label: 'Contact'   },
]

export default function ScrollDots() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="scroll-dots">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          className={`dot-row ` + (active === id ? 'dot-row--active' : '')}
          onClick={() => scrollTo(id)}
          aria-label={label}
        >
          <span className="dot-label">{label}</span>
          <span className="dot-pip" />
        </button>
      ))}
    </nav>
  )
}