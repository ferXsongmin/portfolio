import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import './Gallery.css'

const photos = [
  // {
  //   id: 1,
  //   title: 'Graduation Moment',
  //   desc: 'Graduation moment with a GPA of 3.63 after 3.5 years of study (2022–2025).',
  //   placeholder: '🎓',
  // },
  // {
  //   id: 2,
  //   title: 'Teaching Assistant – Class B',
  //   desc: 'Moment with practical students of Class B at KH. Bahaudin Mudhary University.',
  //   placeholder: '👨‍🏫',
  // },
  // {
  //   id: 3,
  //   title: 'Teaching Assistant – Class D',
  //   desc: 'Practical session with Class D at KH. Bahaudin Mudhary University (AY 2024/2025).',
  //   placeholder: '📚',
  // },
  // {
  //   id: 4,
  //   title: 'Innovation Award',
  //   desc: '3rd Place winner at Sumenep Regency Regional Innovation Award 2024.',
  //   placeholder: '🏆',
  // },
  // {
  //   id: 5,
  //   title: 'Hackathon Team',
  //   desc: 'Working with the team during a 24-hour hackathon sprint.',
  //   placeholder: '💻',
  // },
  // {
  //   id: 6,
  //   title: 'Conference',
  //   desc: 'Attending a developer conference on modern web technologies.',
  //   placeholder: '🎤',
  // },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  const openLightbox = (idx) => setLightbox(idx)
  const closeLightbox = () => setLightbox(null)
  const prev = () => setLightbox((lightbox - 1 + photos.length) % photos.length)
  const next = () => setLightbox((lightbox + 1) % photos.length)

  return (
    <section id="gallery" className="gallery section">
      <div className="gallery__header">
        <p className="section-label">Moments</p>
        <h2 className="section-title">Photo Gallery<span style={{color:'rgba(255,255,255,0.3)'}}>.</span></h2>
        <div className="section-divider" />
      </div>

      <div className="gallery__grid">
        {photos.map((photo, idx) => (
          <div
            key={photo.id}
            className="gallery__card"
            onClick={() => openLightbox(idx)}
          >
            <div className="gallery__img">
              <span className="gallery__placeholder">{photo.placeholder}</span>
              <div className="gallery__overlay">
                <span className="gallery__zoom">View</span>
              </div>
            </div>
            <div className="gallery__info">
              <h3 className="gallery__title">{photo.title}</h3>
              <p className="gallery__desc">{photo.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox__close" onClick={closeLightbox}><X size={20} /></button>
          <button className="lightbox__prev" onClick={e => { e.stopPropagation(); prev() }}>
            <ChevronLeft size={24} />
          </button>
          <div className="lightbox__content" onClick={e => e.stopPropagation()}>
            <div className="lightbox__img">
              <span className="lightbox__placeholder">{photos[lightbox].placeholder}</span>
            </div>
            <div className="lightbox__meta">
              <h3>{photos[lightbox].title}</h3>
              <p>{photos[lightbox].desc}</p>
            </div>
          </div>
          <button className="lightbox__next" onClick={e => { e.stopPropagation(); next() }}>
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  )
}
