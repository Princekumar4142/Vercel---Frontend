import Footer from '../components/Footer'
import logo from '../assets/logo.jpeg'

const highlights = [
  { icon: '🎯', title: 'Real Project Experience', desc: 'Work on actual company projects — not dummy tasks. Build a portfolio that employers trust.' },
  { icon: '👨‍💼', title: 'Industry Mentorship', desc: 'Learn directly from experienced professionals who guide you through every challenge.' },
  { icon: '📜', title: 'DPIIT Recognized Certificate', desc: 'Receive a government-backed certificate recognized by Startup Bihar, MSME & DPIIT.' },
  { icon: '💼', title: 'Pre-Placement Offer', desc: 'Outstanding interns are shortlisted for full-time roles at TrackMap Innovations.' },
  { icon: '🌐', title: 'Fully Remote & Flexible', desc: 'Work from anywhere in India. No fixed hours, no commute — complete flexibility.' },
  { icon: '💰', title: 'Most Affordable Program', desc: 'This is one of the most affordable certified internship programs in India.' },
]

export default function About() {
  return (
    <>
      <div className="page">
        <section style={{ padding: '100px 20px 60px', textAlign: 'center' }}>
          <div className="container">
            <span className="eyebrow">About Us</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(1.8rem,5vw,3rem)' }}>
              TrackMap Innovations<br />
              <span className="grad-text">Private Limited</span>
            </h1>
            <p style={{ color: 'var(--muted2)', maxWidth: '580px', margin: '16px auto 0', fontSize: '1rem', lineHeight: 1.8 }}>
              A technology-driven startup building innovative digital solutions — and empowering the next generation of professionals through real-world internship experience.
            </p>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="about-grid">
              <div>
                <span className="eyebrow">Our Mission</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,3vw,1.9rem)', fontWeight: 800, marginBottom: '18px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                  Learn. Build. Grow.
                </h2>
                <p style={{ color: 'var(--muted2)', marginBottom: '14px', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  At TrackMap Innovations, we believe every student deserves access to professional experience — regardless of their college, city, or background. Our internship program is designed to bridge the gap between academic learning and industry expectations.
                </p>
                <p style={{ color: 'var(--muted2)', marginBottom: '14px', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  You'll work on live projects alongside our team, get mentored by experts, and earn a certificate that truly reflects your work — not just participation.
                </p>
                <div style={{ padding: '16px', background: 'var(--bg2)', borderRadius: '12px', border: '1px solid var(--border)', marginTop: '20px' }}>
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted2)', marginBottom: '6px' }}>Company Credentials</p>
                  <p style={{ fontSize: '0.875rem' }}>DPIIT Cert. No: <strong style={{ color: 'var(--text)' }}>DIPP229619</strong></p>
                  <p style={{ fontSize: '0.875rem', marginTop: '4px' }}>CIN: <strong style={{ color: 'var(--text)' }}>U74909BR2025PTC075493</strong></p>
                </div>
              </div>
              <div className="highlight-list">
                {highlights.map((h, i) => (
                  <div key={i} className="highlight-item">
                    <span className="hi-icon">{h.icon}</span>
                    <div>
                      <div className="hi-title">{h.title}</div>
                      <div className="hi-desc">{h.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
