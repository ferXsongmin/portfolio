import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

        bar.style.width   = pct + '%'
        bar.style.opacity = scrollTop > 10 ? '1' : '0'   // hilang di top
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div ref={barRef} style={{
    position:   'fixed',
    top:        0,
    left:       0,
    height:     '2px',
    width:      '0%',
    background: 'white',
    opacity:    0,
    zIndex:     9999,
    boxShadow:  '0 0 10px rgba(255,255,255,0.6)',
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
  }} />
}   