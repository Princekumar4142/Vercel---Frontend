import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../context/api'
import qrImage from '../assets/qr.jpeg'
import whatsappQR from '../assets/whatsapp_qr.jpeg'

export default function Payment() {
  const { appId } = useParams()
  const navigate = useNavigate()
  const [utrId, setUtrId] = useState('')
  const [screenshot, setScreenshot] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!utrId.trim()) return setError('Transaction ID (UTR) is required.')
    setLoading(true); setError('')
    const formData = new FormData()
    formData.append('utrId', utrId)
    if (screenshot) formData.append('screenshot', screenshot)
    try {
      await api.post(`/applications/${appId}/payment`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setSuccess(true)
      setTimeout(() => navigate('/dashboard'), 60000)
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="page" style={{ padding: '90px 20px 60px' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>

          {/* Success Message */}
          <div className="card" style={{ marginBottom: '24px', padding: '36px' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>✅</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: '10px', fontSize: '1.5rem' }}>
              Payment Submitted!
            </h2>
            <p style={{ color: 'var(--muted2)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Our team will verify your payment within 24 hours. Once verified, your certificate will be issued automatically.
            </p>
            <p style={{ color: 'var(--accent)', marginTop: '12px', fontSize: '0.85rem' }}>
              Redirecting to dashboard in 60 seconds...
            </p>
          </div>

          {/* WhatsApp Group QR */}
          <div className="card" style={{ padding: '28px', border: '1px solid rgba(37,211,102,0.3)', background: 'rgba(37,211,102,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.5rem' }}>💬</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: '#25d366' }}>
                Join Our WhatsApp Group
              </h3>
            </div>
            <p style={{ color: 'var(--muted2)', fontSize: '0.85rem', marginBottom: '20px', lineHeight: 1.6 }}>
              Join our official WhatsApp group to receive your certificate details, updates, and all important announcements.
            </p>
            <img
              src={whatsappQR}
              alt="WhatsApp Group QR Code"
              style={{
                width: '220px', height: '220px',
                objectFit: 'cover',
                borderRadius: '16px',
                border: '3px solid rgba(37,211,102,0.4)',
                margin: '0 auto',
                display: 'block'
              }}
            />
            <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '14px' }}>
              📱 Open WhatsApp → Camera → Scan this QR code to join
            </p>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="payment-page">
      <div className="container">
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <span className="eyebrow">Step 2 of 2</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,4vw,2rem)', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Complete Your Payment
          </h1>
          <p style={{ color: 'var(--muted2)', fontSize: '0.9rem' }}>Scan the QR code below and submit your transaction details.</p>
        </div>

        <div className="payment-grid">
          {/* QR CODE */}
          <div className="card qr-card">
            <span className="eyebrow" style={{ marginBottom: '16px', display: 'block' }}>📱 Scan & Pay</span>
            <img src={qrImage} alt="PhonePe QR Code" />
            <div className="qr-amount">₹199</div>
            <p style={{ color: 'var(--muted2)', fontSize: '0.85rem' }}>One-time Program Registration Fee</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '6px' }}>
              Pay using PhonePe, Google Pay, Paytm, or any UPI app
            </p>
            <div style={{ marginTop: '18px', padding: '14px', background: 'var(--bg2)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted2)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Account Name</p>
              <p style={{ fontWeight: 700, fontSize: '1rem' }}>PRINCE KUMAR</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '3px' }}>TrackMap Innovations Pvt. Ltd.</p>
            </div>
          </div>

          {/* PAYMENT FORM */}
          <div className="card">
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '18px', fontSize: '1.05rem' }}>
              💳 Enter Payment Details
            </h3>

            {error && <div className="alert alert-error">❌ {error}</div>}

            <div className="alert alert-info">
              ℹ️ After payment, find the 12-digit UTR/Transaction ID in your UPI app's transaction history and enter it below.
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>UTR / Transaction ID *</label>
                <input
                  type="text"
                  placeholder="e.g. 512345678901"
                  value={utrId}
                  onChange={e => setUtrId(e.target.value)}
                  required
                  style={{ fontFamily: 'monospace', letterSpacing: '0.04em' }}
                />
                <p className="form-hint">Open your UPI app → Transaction History → Copy the 12-digit UTR number</p>
              </div>
              <div className="form-group">
                <label>Payment Screenshot *</label>
                <input type="file" accept="image/*" onChange={e => setScreenshot(e.target.files[0])} required style={{ padding: '10px' }} />
                <p className="form-hint">JPG/PNG, max 5MB — helps speed up verification</p>
              </div>
              <div className="alert alert-warn">
                ⚠️ Submitting an incorrect UTR may result in application rejection. Please double-check before submitting.
              </div>
              <button type="submit" className="btn btn-accent btn-full" disabled={loading}>
                {loading ? '⏳ Submitting...' : '✅ Submit Payment Details'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}