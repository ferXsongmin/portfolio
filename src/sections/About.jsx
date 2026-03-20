import './About.css'

const stats = [
  { number: '2', label: 'Years', sub: 'Experience' },
  { number: '5', label: 'Stacks', sub: 'Mastered' },
  { number: '9', label: 'Projects', sub: 'Completed' },
]

const skills = [
  'React', 'Laravel', 'Vue.js', 'Node.js', 'MySQL',
  'PostgreSQL', 'Docker', 'Linux', 'Nginx', 'Tailwind CSS',
]

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="about__inner">
        {/* Left: Photo placeholder */}
        <div className="about__photo-wrap">
          <div className="about__photo">
            <img
            src="/photo.jpg"
            alt="Your Name"
            className="about__photo-img"
          />
          </div>
          {/* Decorative border */}
          <div className="about__photo-border" />
        </div>

        {/* Right: Content */}
        <div className="about__content">
          <p className="section-label">The Background</p>
          <h2 className="about__name">FerXWonyoung<span className="about__dot">.</span></h2>

          <p className="about__bio">
            I'm an Indonesian-based web developer &amp; frontend developer focused on
            crafting clean &amp; user-friendly experiences. I'm passionate about
            building excellent software that improves the lives of those around me.
          </p>

          {/* Stats */}
          <div className="about__stats">
            {stats.map(s => (
              <div key={s.label} className="about__stat">
                <span className="about__stat-number">{s.number}</span>
                <span className="about__stat-label">{s.label}</span>
                <span className="about__stat-sub">{s.sub}</span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="about__skills">
            <p className="about__skills-label">Tech Stack</p>
            <div className="about__skills-list">
              {skills.map(s => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
