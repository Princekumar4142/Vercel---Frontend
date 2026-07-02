import Footer from '../components/Footer'

export default function AboutFounder() {
  return (
    <>
      <div className="page" style={{ padding: '100px 20px 60px' }}>
        <div className="container" style={{ maxWidth: '860px' }}>

          <div className="card" style={{ marginBottom: '28px', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
              <div
  style={{
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
  }}
>
  <img
    src="/src/assets/founder.png"
    alt="Prince Kumar"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
  />
</div>
              <div>
                <span className="eyebrow">Founder & CEO</span>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
                  Prince Kumar
                </h1>
                <p style={{ color: 'var(--muted2)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '16px' }}>
                  Founder & CEO, TrackMap Innovations Private Limited
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href="https://www.linkedin.com/in/prince-kumar-b74179314" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                    🔗 LinkedIn Profile
                  </a>
                  <a href="mailto:internship@trackmapinnovations.com" className="btn btn-outline btn-sm">
                    📧 Contact
                  </a>
                </div>
              </div>
            </div>
          </div>

        <div className="card" style={{ marginBottom: '28px', padding: '36px' }}>
  <h2
    style={{
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '1.3rem',
      marginBottom: '16px'
    }}
  >
    About Me
  </h2>

  <p
    style={{
      color: 'var(--muted2)',
      lineHeight: 1.8,
      marginBottom: '14px',
      fontSize: '0.95rem'
    }}
  >
    I am Prince Kumar, a final-year Computer Science student and the Founder & CEO of
    TrackMap Innovations Private Limited, a DPIIT-recognized technology startup based
    in Bihar, India. I am passionate about technology, software development, and
    creating innovative digital solutions that solve real-world problems.
  </p>

  <p
    style={{
      color: 'var(--muted2)',
      lineHeight: 1.8,
      marginBottom: '14px',
      fontSize: '0.95rem'
    }}
  >
    Through TrackMap Innovations, my mission is to bridge the gap between academic
    learning and industry requirements by providing students with practical experience,
    real-world projects, and internship opportunities that help them develop valuable
    technical and professional skills.
  </p>

  <p
    style={{
      color: 'var(--muted2)',
      lineHeight: 1.8,
      fontSize: '0.95rem'
    }}
  >
    I believe every student deserves access to quality learning opportunities,
    mentorship, and industry exposure, regardless of their background or location.
    My vision is to build impactful technology solutions while empowering the next
    generation of professionals through innovation, learning, and hands-on experience.
  </p>
</div>

          <div className="card" style={{ marginBottom: '28px', padding: '36px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', marginBottom: '20px' }}>Company Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
              {[
                ['Company Name', 'TrackMap Innovations Private Limited'],
                ['Founded', '2025'],
                ['Headquarters', 'Bihar, India'],
                ['DPIIT Cert. No.', 'DIPP229619'],
                ['CIN', 'U74909BR2025PTC075493'],
                ['Recognition', 'Startup Bihar · MSME · DPIIT'],
                ['Email', 'internship@trackmapinnovations.com'],
                ['LinkedIn', 'Prince Kumar'],
              ].map(([label, value]) => (
                <div key={label} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--muted)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: '28px', textAlign: 'center', border: '1px solid var(--border2)', background: 'rgba(37,99,235,0.03)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '10px' }}>Get In Touch</h3>
            <p style={{ color: 'var(--muted2)', fontSize: '0.9rem', marginBottom: '20px' }}>Have questions or want to collaborate? Feel free to reach out.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:trackmapinnovationspvtltd@gmail.com" className="btn btn-primary">
                📧 trackmapinnovationspvtltd@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/prince-kumar-b74179314" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                🔗 Connect on LinkedIn
              </a>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}