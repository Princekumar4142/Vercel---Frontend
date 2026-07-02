import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const roles = [
  { icon: '🖥️', title: 'Frontend Developer', desc: 'Build beautiful, responsive user interfaces using modern frameworks like React.js.', tags: ['React', 'HTML/CSS', 'JavaScript', 'Tailwind'] },
  { icon: '⚙️', title: 'Backend Developer', desc: 'Develop robust server-side logic and RESTful APIs using Node.js and Express.', tags: ['Node.js', 'Express', 'MongoDB', 'REST API'] },
  { icon: '🌐', title: 'Full Stack Developer', desc: 'Work across the entire stack — from UI design to database management — using MERN.', tags: ['MERN Stack', 'Git', 'Deployment', 'APIs'] },
  { icon: '🎨', title: 'UI/UX Designer', desc: 'Design intuitive, user-friendly interfaces and prototypes using modern design tools.', tags: ['Figma', 'Wireframing', 'Prototyping', 'User Research'] },
  { icon: '📊', title: 'Data Analyst', desc: 'Extract actionable insights from data to support business decisions using analytics tools.', tags: ['Python', 'Excel', 'Power BI', 'SQL'] },
  { icon: '📣', title: 'Digital Marketing', desc: 'Plan and execute digital campaigns across social media, SEO, and content platforms.', tags: ['SEO', 'Social Media', 'Content', 'Analytics'] },
  { icon: '🤖', title: 'Machine Learning', desc: 'Work on ML models, data preprocessing, and AI-powered applications.', tags: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas'] },
  { icon: '☁️', title: 'Cloud Computing', desc: 'Learn and work with cloud infrastructure, deployment pipelines, and DevOps practices.', tags: ['AWS', 'Docker', 'CI/CD', 'Linux'] },
  { icon: '🔐', title: 'Cybersecurity', desc: 'Explore ethical hacking, vulnerability assessment, and network security fundamentals.', tags: ['Networking', 'Kali Linux', 'Ethical Hacking', 'OWASP'] },
  { icon: '📱', title: 'Android Development', desc: 'Build native Android applications using Java or Kotlin for real-world use cases.', tags: ['Java', 'Kotlin', 'Android Studio', 'Firebase'] },
  { icon: '🍎', title: 'iOS Development', desc: 'Develop iOS applications using Swift and Apple development ecosystem.', tags: ['Swift', 'Xcode', 'UIKit', 'SwiftUI'] },
  { icon: '🗄️', title: 'Database Management', desc: 'Design, manage, and optimize databases for high-performance applications.', tags: ['MySQL', 'MongoDB', 'PostgreSQL', 'Redis'] },
  { icon: '🎬', title: 'Video Editing', desc: 'Create and edit professional video content for marketing, social media, and promotions.', tags: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'] },
  { icon: '✍️', title: 'Content Writing', desc: 'Write engaging blogs, articles, and web copy that drives traffic and builds brand authority.', tags: ['SEO Writing', 'Copywriting', 'Blogging', 'Research'] },
  { icon: '📈', title: 'Business Development', desc: 'Support growth strategy, client outreach, and partnership development for the company.', tags: ['Sales', 'CRM', 'Communication', 'Strategy'] },
]

export default function Roles() {
  return (
    <>
      <div className="page">
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Open Positions</span>
              <h1 className="section-title">Internship Domains <span className="grad-text">2025</span></h1>
              <p className="section-sub">Choose from 15+ domains across tech, design, and business. All roles are 100% online.</p>
            </div>

            <div className="roles-grid">
              {roles.map((r, i) => (
                <div key={i} className="card role-card card-hover">
                  <div className="role-icon">{r.icon}</div>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                  <div className="tags">{r.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                  <p className="role-meta">📅 3 Months &nbsp;·&nbsp; 💻 Online &nbsp;&nbsp;</p>
                </div>
              ))}

              {/* Other / Custom Role Card */}
              <div className="card role-card card-hover" style={{ border: '1px dashed rgba(99,102,241,0.3)', background: 'rgba(37,99,235,0.03)' }}>
                <div className="role-icon">✨</div>
                <h3>Other / Custom Domain</h3>
                <p>Don't see your domain? No problem — choose "Other" in the application form and specify your area of interest.</p>
                <div className="tags">
                  <span className="tag" style={{ background: 'rgba(6,182,212,0.1)', borderColor: 'rgba(6,182,212,0.2)', color: 'var(--accent)' }}>Custom</span>
                  <span className="tag" style={{ background: 'rgba(6,182,212,0.1)', borderColor: 'rgba(6,182,212,0.2)', color: 'var(--accent)' }}>Any Field</span>
                </div>
                <p className="role-meta">📅 3 Months &nbsp;·&nbsp; 💻 Online &nbsp;&nbsp;</p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <p style={{ color: 'var(--muted2)', marginBottom: '18px', fontSize: '0.9rem' }}>
                Interested in any of these roles? Create an account and submit your application.
              </p>
              <Link to="/register" className="btn btn-primary">Apply Now →</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
