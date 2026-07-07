import Footer from '../components/Footer'

export default function TermsConditions() {
  return (
    <>
      <div className="page" style={{ padding: '100px 20px 60px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card" style={{ padding: '40px' }}>
            <span className="eyebrow">Legal</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>
              Terms & Conditions
            </h1>
            <p style={{ color: 'var(--muted2)', fontSize: '0.85rem', marginBottom: '32px' }}>
              Last updated: July 2025 &nbsp;|&nbsp; TrackMap Innovations Private Limited
            </p>
            {[
              { title: '1. Acceptance of Terms', content: 'By registering for the TrackMap Innovations Internship Program, you agree to be bound by these Terms & Conditions. If you do not agree, please do not proceed with the registration.' },
              { title: '2. Program Overview', content: 'TrackMap Innovations offers a 3-month online internship program for students across all branches and colleges in India. The program is available in 15+ domains and is 100% online and flexible.' },
              { title: '3. Registration & Eligibility', content: 'The program is open to all currently enrolled students or recent graduates. Participants must provide accurate and complete information during registration.' },
              { title: '4. Program Fee', content: 'A one-time non-refundable registration fee of ₹199 is required to confirm your enrollment. The fee must be paid via UPI and the UTR/Transaction ID must be submitted for verification.' },
              { title: '5. Refund Policy', content: 'The registration fee is strictly non-refundable once payment has been verified and the internship has commenced.' },
              { title: '6. Certificate Issuance', content: 'Upon successful completion and payment verification, a DPIIT-recognized internship certificate will be issued. Certificates can be verified online through our certificate verification portal.' },
              { title: '7. Code of Conduct', content: 'Participants must maintain professional conduct. Any misconduct, plagiarism, or ethical violation may result in immediate termination without refund or certificate.' },
              { title: '8. Intellectual Property', content: 'Any work created during the internship remains the intellectual property of TrackMap Innovations Private Limited unless explicitly stated otherwise.' },
              { title: '9. Limitation of Liability', content: 'TrackMap Innovations shall not be liable for any indirect or consequential damages. Our total liability shall not exceed the registration fee paid.' },
              { title: '10. Governing Law', content: 'These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bihar, India.' },
              { title: '11. Contact', content: 'For queries, contact us at: trackmapinnovationspvtltd@gmail.com' },
            ].map((item) => (
              <div key={item.title} style={{ marginBottom: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ color: 'var(--muted2)', lineHeight: 1.8, fontSize: '0.9rem' }}>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
