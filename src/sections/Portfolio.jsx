import { useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import './Portfolio.css'

const categories = ['All', 'Web App', 'Mobile', 'Tool', 'API']

const projects = [
  // {
  //   id: 1,
  //   title: 'Inventory Management System',
  //   desc: 'Web-based inventory system with damage & repair monitoring for a government department. Built with Laravel & MySQL.',
  //   tags: ['LARAVEL', 'MYSQL', 'FULLSTACK'],
  //   category: 'Web App',
  //   emoji: '📦',
  //   year: '2025',
  // },
  // {
  //   id: 2,
  //   title: 'E-Commerce Platform',
  //   desc: 'Regional e-commerce platform aimed at boosting local MSME economy. Won 3rd place in Regional Innovation Award.',
  //   tags: ['LARAVEL', 'VUE.JS', 'TAILWIND'],
  //   category: 'Web App',
  //   emoji: '🛍️',
  //   year: '2024',
  // },
  // {
  //   id: 3,
  //   title: 'Network Operations Dashboard',
  //   desc: 'Real-time NOC dashboard for monitoring network assets and devices for Communication Department.',
  //   tags: ['REACT', 'NODE.JS', 'SOCKET.IO'],
  //   category: 'Web App',
  //   emoji: '🌐',
  //   year: '2025',
  // },
  // {
  //   id: 4,
  //   title: 'CLI Task Manager',
  //   desc: 'Command-line tool for managing tasks and projects. Supports Markdown export and team sync.',
  //   tags: ['NODE.JS', 'CLI', 'BASH'],
  //   category: 'Tool',
  //   emoji: '⚡',
  //   year: '2024',
  // },
  // {
  //   id: 5,
  //   title: 'RESTful API Boilerplate',
  //   desc: 'Production-ready Laravel API boilerplate with authentication, rate limiting, and comprehensive documentation.',
  //   tags: ['LARAVEL', 'REST API', 'SANCTUM'],
  //   category: 'API',
  //   emoji: '🔌',
  //   year: '2024',
  // },
  // {
  //   id: 6,
  //   title: 'Personal Portfolio',
  //   desc: 'This portfolio website — built with React + Vite, featuring smooth animations and a clean dark aesthetic.',
  //   tags: ['REACT', 'VITE', 'CSS'],
  //   category: 'Web App',
  //   emoji: '🚀',
  //   year: '2026',
  // },
]

export default function Portfolio() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <section id="portfolio" className="portfolio section">
      <div className="portfolio__header">
        <p className="section-label">My Work</p>
        <h2 className="section-title">Portfolio<span style={{color:'rgba(255,255,255,0.3)'}}>.</span></h2>
        <div className="section-divider" />
      </div>

      {/* Filter */}
      <div className="portfolio__filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`portfolio__filter-btn ${active === cat ? 'portfolio__filter-btn--active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="portfolio__grid">
        {filtered.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-card__thumb">
              <span className="project-card__emoji">{project.emoji}</span>
              <span className="project-card__year">{project.year}</span>
            </div>
            <div className="project-card__body">
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.desc}</p>
              <div className="project-card__tags">
                {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="project-card__actions">
              <button className="project-card__btn">
                <Github size={14} /> Code
              </button>
              <button className="project-card__btn project-card__btn--primary">
                <ExternalLink size={14} /> Live Demo
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
