import Footer from '../components/Footer'

export default function PrivacyPolicy() {
  return (
    <>
      <div className="page" style={{ padding: '100px 20px 60px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card" style={{ padding: '40px' }}>
            <span className="eyebrow">Legal</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>
              Privacy Policy
            </h1>
            <p style={{ color: 'var(--muted2)', fontSize: '0.85rem', marginBottom: '32px' }}>
              Last updated: July 2025 &nbsp;|&nbsp; TrackMap Innovations Private Limited
            </p>
            {[
              { title: '1. Information We Collect', content: 'We collect personal information that you voluntarily provide when registering for our internship program. This includes your full name, email address, phone number, college name, branch, semester, enrollment/registration number, and payment transaction details (UTR ID and payment screenshot). We do not collect any sensitive financial information such as bank account numbers or card details.' },
              { title: '2. How We Use Your Information', content: 'The information collected is used solely for the purpose of processing your internship application, verifying your payment, issuing your internship certificate, and communicating important updates related to your internship. We do not use your information for any marketing purposes without your consent.' },
              { title: '3. Data Storage & Security', content: 'Your data is securely stored on our servers and is accessible only to authorized personnel. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.' },
              { title: '4. Sharing of Information', content: 'We do not sell, trade, or rent your personal information to third parties. Your data may be shared with regulatory authorities only if required by law.' },
              { title: '5. Payment Information', content: 'Payments are processed via UPI (PhonePe, Google Pay, Paytm, etc.). We only collect the UTR/Transaction ID and an optional payment screenshot for verification purposes. We do not store any sensitive payment credentials.' },
              { title: '6. Your Rights', content: 'You have the right to access, correct, or request deletion of your personal data at any time by contacting us at internship@trackmapinnovations.com. We will respond within 7 working days.' },
              { title: '7. Cookies', content: 'Our website may use cookies to improve user experience. These are small files stored on your browser and do not contain any personally identifiable information.' },
              { title: '8. Changes to This Policy', content: 'We reserve the right to update this Privacy Policy at any time. Continued use of our platform after changes constitutes your acceptance of the revised policy.' },
              { title: '9. Contact Us', content: 'If you have any questions, please contact us at: internship@trackmapinnovations.com' },
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