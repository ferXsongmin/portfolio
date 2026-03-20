import './Resume.css'
import { FaGraduationCap } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";

const education = [
  {
    title: 'Universitas Islam Riau',
    // role: 'Bachelor of Informatics',
    desc: 'Thesis: Design and Development of a Web-Based Inventory Management Information System with Monitoring of Damage and Repair.',
    tags: ['INFORMATICS', 'WEB DEVELOPMENT', 'FULLSTACK', 'GPA 3.xx'],
  },
  {
    title: 'SMA NEGERI 1 TAPUNG HULU',
    // role: 'Sosial Science',
    desc: 'Studied software engineering fundamentals, programming logic, and web development basics.',
    tags: ['PROGRAMMING', 'SOFTWARE ENGINEERING'],
  },
]

const experience = [
  // {
  //   period: 'FEB 2025 – JUL 2025',
  //   title: 'Department of Communication and Informatics',
  //   role: 'IT Internship Staff',
  //   desc: 'Developed an Inventory Information System for the Department, specifically for the Network Operation Center (NOC) unit, to support asset management.',
  //   tags: ['LARAVEL', 'NETWORK', 'NOC', 'FULLSTACK'],
  // },
  // {
  //   period: 'OCT 2024 – PRESENT',
  //   title: 'Your Community / Org',
  //   role: 'Lead Instructor',
  //   desc: 'Leading technical training sessions covering modern web development practices and frameworks for community members.',
  //   tags: ['TEACHING', 'LEADERSHIP', 'WEB DEV'],
  // },
  // {
  //   period: 'SEP 2024',
  //   title: 'Regional Innovation Award',
  //   role: '3rd Place Winner',
  //   desc: 'Awarded 3rd Place in Regional Innovation Award (Community Category) with an e-commerce platform aimed at boosting local MSME economy.',
  //   tags: ['AWARD', 'INNOVATION', 'E-COMMERCE', 'LARAVEL'],
  // },
  // {
  //   period: 'SEP 2025 – JAN 2026',
  //   title: 'Universitas KH. Bahaudin Mudhary',
  //   role: 'Teaching Assistant – Software Engineering',
  //   desc: 'Guided students in the Software Engineering course, focusing on SDLC, Agile methodologies, and UML.',
  //   tags: ['TEACHING ASSISTANT', 'DSA', 'ALGORITHM'],
  // },
]

function TimelineItem({ item }) {
  return (
    <div className="timeline-item">
      <div className="timeline-dot" />
      <div className="timeline-card">
        <div className="timeline-period">
          <span className="timeline-icon"></span>
          {item.period}
        </div>
        <h3 className="timeline-title">{item.title}</h3>
        <p className="timeline-role">{item.role}</p>
        <p className="timeline-desc">{item.desc}</p>
        <div className="timeline-tags">
          {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Resume() {
  return (
    <section id="resume" className="resume section">
      <div className="resume__header">
        <p className="section-label">My Background</p>
        <h2 className="section-title">Resume<span style={{color:'rgba(255,255,255,0.3)'}}>.</span></h2>
        <div className="section-divider" />
      </div>

      <div className="resume__columns">
        <div className="resume__col">
          <div className="resume__col-header">
            <div className="resume__col-icon"> <FaGraduationCap /></div>
            <div>
              <h3 className="resume__col-title">EDUCATION</h3>
              <p className="resume__col-sub">ACADEMIC JOURNEY</p>
            </div>
          </div>
          <div className="timeline">
            {education.map((item, i) => (
              <TimelineItem key={i} item={item} />
            ))}
          </div>
        </div>

        <div className="resume__col">
          <div className="resume__col-header">
            <div className="resume__col-icon"><FaBriefcase />
            </div>
            <div>
              <h3 className="resume__col-title">EXPERIENCE</h3>
              <p className="resume__col-sub">PROFESSIONAL PATH</p>
            </div>
          </div>
          <div className="timeline">
            {experience.map((item, i) => (
              <TimelineItem key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
