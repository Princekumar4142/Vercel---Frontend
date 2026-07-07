import Footer from '../components/Footer'

export default function Disclaimer() {
  return (
    <>
      <div className="page" style={{ padding: '100px 20px 60px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card" style={{ padding: '40px' }}>
            <span className="eyebrow">Legal</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>
              Disclaimer
            </h1>
            <p style={{ color: 'var(--muted2)', fontSize: '0.85rem', marginBottom: '32px' }}>
              Last updated: July 2025
            </p>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '8px' }}>1. General Disclaimer</h3>
              <p style={{ color: 'var(--muted2)', lineHeight: 1.8, fontSize: '0.9rem' }}>The information provided on this website is for general informational purposes only. We make no representations or warranties about the completeness or accuracy of the information.</p>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '8px' }}>2. Internship Program</h3>
              <p style={{ color: 'var(--muted2)', lineHeight: 1.8, fontSize: '0.9rem' }}>Participation in the internship does not constitute employment or guarantee placement or job offers.</p>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '8px' }}>3. Certificate</h3>
              <p style={{ color: 'var(--muted2)', lineHeight: 1.8, fontSize: '0.9rem' }}>The certificate is recognized under DPIIT registration DIPP229619. Acceptance may vary across organizations. TrackMap Innovations does not guarantee acceptance by any third party.</p>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '8px' }}>4. Payment Disclaimer</h3>
              <p style={{ color: 'var(--muted2)', lineHeight: 1.8, fontSize: '0.9rem' }}>The registration fee is non-refundable. Payments made to incorrect UPI IDs are not the responsibility of the company. Always verify payment details before completing any transaction.</p>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '8px' }}>5. Results & Outcomes</h3>
              <p style={{ color: 'var(--muted2)', lineHeight: 1.8, fontSize: '0.9rem' }}>Individual outcomes may vary based on personal effort and skill level. We do not guarantee any specific career outcome or placement.</p>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '8px' }}>6. Changes to Information</h3>
              <p style={{ color: 'var(--muted2)', lineHeight: 1.8, fontSize: '0.9rem' }}>TrackMap Innovations reserves the right to change program details, fees, and terms at any time without prior notice.</p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '8px' }}>7. Contact</h3>
              <p style={{ color: 'var(--muted2)', lineHeight: 1.8, fontSize: '0.9rem' }}>For questions: trackmapinnovationspvtltd@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
