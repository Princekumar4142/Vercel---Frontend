import { useState } from 'react'
import axios from 'axios'
import Footer from '../components/Footer'
// import logo from '../assets/logo.png'

export default function VerifyCertificate() {
  const [certId, setCertId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!certId.trim()) return
    setLoading(true); setError(''); setResult(null)
    try {
      const res = await axios.get(`https://vercel-backend-533t.onrender.com/api/verify-cert?certId=${encodeURIComponent(certId.trim())}`)
      setResult(res.data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Certificate not found or invalid.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="verify-page page">
        <div className="verify-box">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="eyebrow">Certificate Verification</span>
            <h1 className="section-title">Verify Your Certificate</h1>
            <p style={{ color: 'var(--muted2)', marginTop: '8px', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Enter your Certificate ID to instantly verify its authenticity.
            </p>
          </div>

          <div className="card" style={{ marginBottom: '24px' }}>
            <form onSubmit={handleVerify}>
              <div className="form-group">
                <label>Certificate ID</label>
                <input
                  type="text"
                  placeholder="e.g. TMI/INT/2026/01"
                  value={certId}
                  onChange={e => setCertId(e.target.value)}
                  required
                  style={{ fontFamily: 'monospace', letterSpacing: '0.05em', fontSize: '1rem' }}
                />
                <p className="form-hint">The Certificate ID is printed at the top of your certificate.</p>
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? '🔍 Verifying...' : '🔍 Verify Certificate'}
              </button>
            </form>
          </div>

          {error && (
            <div className="card" style={{ border: '2px solid rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.03)', textAlign: 'center', padding: '32px' }}>
              <div style={{ fontSize: '2.8rem', marginBottom: '12px' }}>❌</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#f87171', marginBottom: '8px' }}>Invalid Certificate</h3>
              <p style={{ color: 'var(--muted2)', fontSize: '0.875rem' }}>{error}</p>
            </div>
          )}

          {result && (
            <div className="cert-result">
              {/* <img src={logo} alt="TrackMap Logo" className="c-logo"
              style={{ width: '80px', height: '80px',  objectFit: 'contain', display: "block", margin: "0 auto 20px",borderRadius: "50%", background: "var(--bg)", padding: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}
              /> */}
              <div className="cert-check">🎓</div>

              <h3>✅ Certificate Verified!</h3>
              <p style={{ color: 'var(--muted2)', fontSize: '0.85rem' }}>
                This certificate was officially issued by TrackMap Innovations Pvt. Ltd.
              </p>
              <div className="cert-details">
                {[
                  ['Student Name', result.fullName],
                  ['College', result.college],
                  ['Branch', result.branch],
                  ['Semester', result.semester],
                  ['Internship Domain', result.domain],
                  ['Certificate ID', result.certificateId],
                  ['Issue Date', new Date(result.issuedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })],
                ].map(([label, val]) => (
                  <div key={label} className="cert-row">
                    <span>{label}</span>
                    <span style={label === 'Certificate ID' ? { fontFamily: 'monospace', color: 'var(--accent)' } : {}}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '18px', padding: '12px', background: 'rgba(16,185,129,0.06)', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.15)', fontSize: '0.78rem', color: '#34d399', textAlign: 'center', lineHeight: 1.6 }}>
                🏛️ Issued by TrackMap Innovations Pvt. Ltd.<br />
                DPIIT No: DIPP229619 · CIN: U74909BR2025PTC075493
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
