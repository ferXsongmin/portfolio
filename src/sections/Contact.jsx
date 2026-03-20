import { Github, Linkedin, Youtube, Instagram, Mail, ArrowUp } from 'lucide-react'
import './Contact.css'

const socials = [
  { icon: Github, label: 'Follow on', name: 'GitHub', href: 'https://github.com/ferXsongmin' },
  { icon: Linkedin, label: 'Connect on', name: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'Subscribe on', name: 'YouTube', href: '#' },
  { icon: Instagram, label: 'Follow on', name: 'Instagram', href: 'https://instagram.com/ferxau_' },
]

export default function Contact() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <section id="contact" className="contact">
      {/* Contact Section */}
      <div className="contact__main">
        <div className="contact__left">
          <h2 className="contact__title">CONTACT</h2>
          <p className="contact__sub">Let's chat! I'm ready to help with your project.</p>
          <a href="mailto:your@email.com" className="contact__email">
            <Mail size={16} />
            ferneedevweb@gmail.com
          </a>
        </div>

        <div className="contact__socials">
          {socials.map(s => (
            <a key={s.name} href={s.href} className="contact__social-card" target="_blank" rel="noopener noreferrer">
              <div className="contact__social-icon">
                <s.icon size={22} />
              </div>
              <div>
                <span className="contact__social-label">{s.label}</span>
                <span className="contact__social-name">{s.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <span className="footer__copy">© 2026 FerXWonyoung · ENGINEERED FOR EXCELLENCE</span>
        <button className="footer__top" onClick={scrollTop} aria-label="Back to top">
          <ArrowUp size={18} />
        </button>
      </div>
    </section>
  )
}
