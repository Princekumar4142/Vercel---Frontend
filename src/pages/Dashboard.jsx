import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../context/api'
import whatsappQR from '../assets/whatsapp_qr.jpeg'

function AppCard({ app }) {
  const step = app.status === 'approved' ? 4 : app.paymentStatus === 'verified' ? 3 : app.paymentStatus === 'submitted' ? 2 : 1

  return (
    <div className="card" style={{ marginBottom: '20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem' }}>{app.domain}</h3>
          <p style={{ color: 'var(--muted2)', fontSize: '0.8rem', marginTop: '2px' }}>
            Applied on {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <span className={`badge badge-${app.status}`}>{app.status.toUpperCase()}</span>
      </div>

      {/* Progress Steps */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        {[
          { n: 1, label: 'Submitted' },
          { n: 2, label: 'Payment' },
          { n: 3, label: 'Verified' },
          { n: 4, label: 'Certificate' },
        ].map((s, i) => (
          <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', margin: '0 auto 6px',
                background: step >= s.n ? 'linear-gradient(135deg,var(--blue),var(--accent))' : 'var(--card2)',
                border: step >= s.n ? 'none' : '2px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.75rem',
                color: step >= s.n ? 'white' : 'var(--muted)',
                transition: 'all 0.3s'
              }}>
                {step > s.n ? '✓' : s.n}
              </div>
              <p style={{ fontSize: '0.62rem', color: step >= s.n ? 'var(--accent)' : 'var(--muted)', fontWeight: step >= s.n ? 600 : 400 }}>
                {s.label}
              </p>
            </div>
            {i < 3 && (
              <div style={{
                height: '2px', flex: 1, margin: '0 3px 18px',
                background: step > s.n ? 'linear-gradient(90deg,var(--blue),var(--accent))' : 'var(--border)',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Status Alerts */}
      {app.status === 'approved' && (
        <div className="alert alert-success" style={{ marginBottom: '16px' }}>
          🎉 Approved! Certificate ID: <strong style={{ fontFamily: 'monospace' }}>{app.certificateId}</strong>
        </div>
      )}
      {app.status === 'rejected' && (
        <div className="alert alert-error" style={{ marginBottom: '16px' }}>
          ❌ Rejected. {app.adminNote || 'Please contact support.'}
        </div>
      )}
      {app.paymentStatus === 'submitted' && app.status === 'pending' && (
        <div className="alert alert-warn" style={{ marginBottom: '16px' }}>
          ⏳ Payment verification in progress. You will receive an update within 24 hours.
        </div>
      )}
      {app.paymentStatus === 'pending' && (
        <div className="alert alert-info" style={{ marginBottom: '16px' }}>
          💳 Payment pending. <Link to={`/payment/${app._id}`} style={{ color: 'var(--accent)', fontWeight: 600 }}>Pay Now →</Link>
        </div>
      )}

      {/* Full Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', marginBottom: '16px' }}>
        {[
          ['Full Name', app.fullName],
          ['Email', app.email],
          ['Phone', app.phone],
          ['College', app.college],
          ['Branch', app.branch],
          ['Semester', app.semester],
          ['Reg. No.', app.regNo],
          ['Domain', app.domain],
          ['UTR ID', app.utrId || '—'],
          ['Payment Status', app.paymentStatus],
          ['Applied On', new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })],
        ].map(([label, value]) => (
          <div key={label} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--muted)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {label}
            </p>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, wordBreak: 'break-word' }}>{value || '—'}</p>
          </div>
        ))}
      </div>

      {/* Certificate Section */}
      {app.certificateIssued && (
        <div style={{ padding: '16px', background: 'rgba(16,185,129,0.06)', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.2)', marginBottom: '14px' }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--muted2)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Certificate ID</p>
          <p style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1rem', color: 'var(--accent)', letterSpacing: '0.04em', marginBottom: '12px' }}>
            {app.certificateId}
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {/* ✅ Download button - only shows when certificate file is uploaded */}
            {app.certificateFile ? (
              <a
                href={`/uploads/${app.certificateFile}`}
                download={`Certificate_${app.fullName}_${app.domain}${app.certificateFile.substring(app.certificateFile.lastIndexOf('.'))}`}
                className="btn btn-success btn-sm"
              >
                ⬇️ Download Certificate
              </a>
            ) : (
              <span style={{ fontSize: '0.8rem', color: 'var(--muted)', padding: '7px 0' }}>
                ⏳ Certificate file will be available soon...
              </span>
            )}
            <Link to="/verify" className="btn btn-outline btn-sm">
              🔍 Verify Certificate
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [showWAQR, setShowWAQR] = useState(false)

  useEffect(() => {
    api.get('/applications/my')
      .then(res => setApps(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>

  return (
    <div className="dash-page">
      <div className="container">
        <div className="dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1>👋 Hello, {user?.fullName}!</h1>
            <p>Track all your internship applications below.</p>
          </div>
          {apps.length > 0 && (
            <Link to="/apply" className="btn btn-primary btn-sm">+ Apply for Another Domain</Link>
          )}
        </div>

        {/* WhatsApp Group Card */}
        <div className="card" style={{ marginBottom: '24px', padding: '20px', border: '1px solid rgba(37,211,102,0.25)', background: 'rgba(37,211,102,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '2rem' }}>💬</span>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#25d366', marginBottom: '4px' }}>
                Join Our WhatsApp Group
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted2)' }}>
                Get certificate updates, announcements and support directly on WhatsApp.
              </p>
            </div>
            <button
              onClick={() => setShowWAQR(!showWAQR)}
              style={{ background: '#25d366', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', whiteSpace: 'nowrap', fontFamily: 'var(--font-body)' }}>
              {showWAQR ? '✕ Hide QR' : '📱 Show QR Code'}
            </button>
          </div>
          {showWAQR && (
            <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(37,211,102,0.15)' }}>
              <img src={whatsappQR} alt="WhatsApp Group QR Code"
                style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '14px', border: '3px solid rgba(37,211,102,0.4)', display: 'block', margin: '0 auto' }} />
              <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '12px' }}>
                📱 Open WhatsApp → Camera → Scan this QR code to join the group
              </p>
            </div>
          )}
        </div>

        {apps.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '56px 24px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📝</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '10px' }}>No Applications Yet</h3>
            <p style={{ color: 'var(--muted2)', marginBottom: '24px', fontSize: '0.9rem' }}>
              You haven't applied for an internship yet. Get started today!
            </p>
            <Link to="/apply" className="btn btn-primary">Apply Now →</Link>
          </div>
        )}

        {apps.map(app => <AppCard key={app._id} app={app} />)}
      </div>
    </div>
  )
}