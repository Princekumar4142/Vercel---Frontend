import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../context/api'
import logo from '../assets/logo.jpeg'

export default function Register() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value })

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    setLoading(true); setError(''); setSuccess('')
    try {
      await api.post('/auth/send-otp', { email: form.email })
      setSuccess(`OTP sent to ${form.email}. Check your inbox!`)
      setStep(2)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await api.post('/auth/verify-otp', { email: form.email, otp })
      const res = await api.post('/auth/register', {
        fullName: form.fullName, email: form.email,
        phone: form.phone, password: form.password
      })
      login(res.data.user, res.data.token)
      navigate('/apply')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setLoading(true); setError(''); setSuccess('')
    try {
      await api.post('/auth/send-otp', { email: form.email })
      setSuccess('OTP resent successfully!')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={logo} alt="TrackMap" />
          <h2>{step === 1 ? 'Create Your Account' : 'Verify Your Email'}</h2>
          <p>{step === 1 ? 'Join TrackMap Internship Program — ₹199 only' : `OTP sent to ${form.email}`}</p>
        </div>

        {error && <div className="alert alert-error">❌ {error}</div>}
        {success && <div className="alert alert-success">✅ {success}</div>}

        {step === 1 ? (
          <form onSubmit={handleSendOtp}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Prince Kumar" value={form.fullName} onChange={set('fullName')} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="prince@gmail.com" value={form.email} onChange={set('email')} required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="1234567890" value={form.phone} onChange={set('phone')} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 characters"
                    value={form.password}
                    onChange={set('password')}
                    required
                    style={{ paddingRight: '44px' }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted2)', fontSize: '1.1rem', padding: '0' }}>
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={set('confirmPassword')}
                    required
                    style={{ paddingRight: '44px' }}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted2)', fontSize: '1.1rem', padding: '0' }}>
                    {showConfirm ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? '⏳ Sending OTP...' : 'Send OTP →'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyAndRegister}>
            <div className="form-group">
              <label>Enter 6-digit OTP</label>
              <input
                type="text"
                placeholder="_ _ _ _ _ _"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                maxLength={6}
                required
                style={{ fontSize: '1.4rem', letterSpacing: '0.3em', textAlign: 'center', fontWeight: 700 }}
              />
              <p className="form-hint">Check your email inbox (and spam folder)</p>
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? '⏳ Verifying...' : '✅ Verify & Create Account'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '14px' }}>
              <button type="button" onClick={handleResend} disabled={loading}
                style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
                Didn't receive OTP? Resend
              </button>
            </div>
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <button type="button" onClick={() => { setStep(1); setOtp(''); setError(''); setSuccess('') }}
                style={{ background: 'none', border: 'none', color: 'var(--muted2)', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
                ← Change Email
              </button>
            </div>
          </form>
        )}

        <div className="auth-switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  )
}
