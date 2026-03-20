import { useEffect, useState } from 'react'
import { Github, Linkedin, Youtube, Instagram, Download, ArrowRight } from 'lucide-react'
import './Hero.css'

const roles = [
  'FULLSTACK DEVELOPER',
  'SYSTEM ADMIN',
  'LINUX ENTHUSIAST',
  'UI / UX DESIGNER',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const full = roles[roleIndex]
    let i = typing ? displayed.length : displayed.length

    if (typing) {
      if (displayed.length < full.length) {
        const t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 60)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
        return () => clearTimeout(t)
      } else {
        setRoleIndex((roleIndex + 1) % roles.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, roleIndex])

  return (
    <section id="home" className="hero grid-bg">
      {/* Spotlight glow */}
      <div className="hero__glow" />
      <div className="grid-fade" />


      {/* Side scroll dots
      <div className="hero__scroll-dots">
        {[0,1,2,3].map(i => (
          <span key={i} className={`scroll-dot ${i === 0 ? 'scroll-dot--active' : ''}`} />
        ))}
      </div> */}
        
      <div className="hero__content">
        <p className="hero__greeting">Hello, I'm</p>

        <h1 className="hero__title">
          <span className="hero__typed">{displayed}</span>
          <span className="hero__cursor">|</span>
        </h1>

        <p className="hero__sub">
          Fullstack Developer &amp; Linux Enthusiast.<br />
          Turning complex problems into elegant, high-performance web solutions.
        </p>

        <div className="hero__actions">
          <button className="btn btn--light">
            <ArrowRight size={16} />
            View Portfolio
          </button>
          <button className="btn btn--dark">
            <Download size={16} />
            Download CV
          </button>
        </div>

        <div className="hero__socials">
          <a href="#" className="social-btn" aria-label="GitHub"><Github size={18} /></a>
          <a href="#" className="social-btn" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href="#" className="social-btn" aria-label="YouTube"><Youtube size={18} /></a>
          <a href="#" className="social-btn" aria-label="Instagram"><Instagram size={18} /></a>
        </div>
      </div>
    </section>
  )
}
