import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Footer from '../components/Footer'
import certSample from '../assets/certificate_sample.png'

const highlights = [
  { icon: '🎯', title: 'Hands-On Experience', desc: 'Work on real company projects and build a strong portfolio that stands out to recruiters.' },
  { icon: '📜', title: 'DPIIT Recognized Certificate', desc: 'Receive a government-recognized internship certificate backed by Startup Bihar, MSME & DPIIT.' },
  { icon: '👨‍💼', title: 'Expert Mentorship', desc: 'Get guided by industry professionals every step of the way during your internship.' },
  { icon: '💼', title: 'PPO Opportunity', desc: 'Top-performing interns are offered full-time positions at TrackMap Innovations.' },
  { icon: '🌐', title: '100% Online & Flexible', desc: 'Work from anywhere — no commute, no fixed timings, fully remote and beginner-friendly.' },
  { icon: '🚀', title: 'Resume Booster', desc: 'Add a recognized internship to your resume and gain the edge in placements and job interviews.' },
  { icon: '🤝',
    title: 'Team Collaboration',
    desc: 'Collaborate with mentors and fellow interns using Git, GitHub, and modern industry workflows.'
  },
  {
    icon: '📈',
    title: 'Career Support',
    desc: 'Receive resume reviews, interview guidance, and career tips to boost your placement opportunities.'
  }
]

const domains = [
  { icon: '🖥️', title: 'Frontend Development', tags: ['React', 'CSS', 'JavaScript'] },
  { icon: '⚙️', title: 'Backend Development', tags: ['Node.js', 'Express', 'MongoDB'] },
  { icon: '🌐', title: 'Full Stack Development', tags: ['MERN Stack', 'REST API'] },
  { icon: '🎨', title: 'UI/UX Design', tags: ['Figma', 'Prototyping'] },
  { icon: '📊', title: 'Data Analytics', tags: ['Python', 'Power BI'] },
  { icon: '📣', title: 'Digital Marketing', tags: ['SEO', 'Social Media'] },
]

export default function Home() {
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    revealRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const ref = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el) }

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-orb1"></div>
        <div className="hero-orb2"></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Internship Program 2026
          </div>
          <h1 className="hero-title">
            Launch Your Career with<br />
            <span className="grad">TrackMap Innovations</span>
          </h1>
          <p className="hero-sub">
            Gain real-world experience, earn a DPIIT-recognized certificate,
            and take your first step toward a successful tech career — 100% online.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">Get Started →</Link>
            <Link to="/roles" className="btn btn-outline">Explore Roles</Link>
          </div>
          <div className="hero-stats">
            {[['50+','Interns Placed'],['15+','Open Domains'],['STARTUP BIHAR','RECOGNIZED'],['DPIIT','Recognized']].map(([n,l]) => (
              <div key={l} className="stat">
                <div className="stat-num">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* WHY TRACKMAP */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal" ref={ref}>
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="section-title">Everything You Need to <span className="grad-text">Grow</span></h2>
            <p className="section-sub">We believe the best learning happens through real work. That's what we deliver.</p>
          </div>
          <div className="highlights-grid">
            {highlights.map((h, i) => (
              <div key={i} className="card highlight-card card-hover reveal" ref={ref}>
                <span className="highlight-icon">{h.icon}</span>
                <h4>{h.title}</h4>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* DOMAINS PREVIEW */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="section-head reveal" ref={ref}>
            <span className="eyebrow">Open Domains</span>
            <h2 className="section-title">Find Your <span className="grad-text">Perfect Role</span></h2>
            <p className="section-sub">Choose from 15+ internship domains across technology, design, and business.</p>
          </div>
          <div className="roles-grid">
            {domains.map((d, i) => (
              <div key={i} className="card role-card card-hover reveal" ref={ref}>
                <div className="role-icon">{d.icon}</div>
                <h3>{d.title}</h3>
                <div className="tags">{d.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                <p className="role-meta">📅 3 Months &nbsp;·&nbsp; 💻 Online &nbsp;&nbsp; </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/roles" className="btn btn-outline">View All 15+ Roles →</Link>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* CERTIFICATE */}
      <section className="section cert-sample-section">
        <div className="container">
          <div className="section-head reveal" ref={ref}>
            <span className="eyebrow">Certificate</span>
            <h2 className="section-title">DPIIT <span className="grad-text">Recognized Certificate</span></h2>
            <p className="section-sub">Backed by Startup Bihar, MSME & DPIIT — add it to your resume and stand out.</p>
          </div>
          <div className="reveal" ref={ref}>
            <img src={certSample} alt="Certificate Sample" className="cert-sample-img" />
          </div>
          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link to="/verify" className="btn btn-outline">Verify a Certificate</Link>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* CTA */}
      <section style={{ padding: '72px 20px' }}>
        <div className="container">
          <div className="reveal" ref={ref} style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(6,182,212,0.06))', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '20px', padding: '56px 32px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: 800, marginBottom: '14px', letterSpacing: '-0.02em' }}>
              Ready to Begin Your Journey? 🚀
            </h2>
            <p style={{ color: 'var(--muted2)', marginBottom: '28px', maxWidth: '460px', margin: '0 auto 28px', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Limited seats available. Register now and start your professional internship journey.
            </p>
            <Link to="/register" className="btn btn-accent">Register Now →</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
