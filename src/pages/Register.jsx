import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../context/api'
import logo from '../assets/logo.jpeg'

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [step, setStep] = useState(1) // 1 = details, 2 = otp verification
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const { login } = useAuth()
  const navigate = useNavigate()

  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value })

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone)

  // countdown for "resend OTP"
  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setInterval(() => setResendTimer((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [resendTimer])

  const validateDetails = () => {
    if (!form.fullName.trim()) {
      setError('Please enter your full name.')
      return false
    }
    if (!validateEmail(form.email)) {
      setError('Please enter a valid email address.')
      return false
    }
    if (!validatePhone(form.phone)) {
      setError('Please enter a valid 10-digit Indian mobile number.')
      return false
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return false
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return false
    }
    return true
  }

  // Step 1 -> send OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault()
    setError(''); setInfo('')
    if (!validateDetails()) return

    setLoading(true)
    try {
      await api.post('/auth/send-otp', { email: form.email })
      setInfo(`OTP sent to ${form.email}. It is valid for 5 minutes.`)
      setStep(2)
      setResendTimer(30)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Resend OTP from step 2
  const handleResendOtp = async () => {
    if (resendTimer > 0) return
    setError(''); setInfo('')
    setLoading(true)
    try {
      await api.post('/auth/send-otp', { email: form.email })
      setInfo(`A new OTP was sent to ${form.email}.`)
      setResendTimer(30)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Step 2 -> verify OTP, then create the account
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault()
    setError(''); setInfo('')
    if (!otp || otp.length !== 6) {
      return setError('Please enter the 6-digit OTP sent to your email.')
    }

    setLoading(true)
    try {
      await api.post('/auth/verify-otp', { email: form.email, otp })

      const res = await api.post('/auth/register', {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password
      })
      login(res.data.user, res.data.token)
      navigate('/apply')
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleEditDetails = () => {
    setStep(1)
    setOtp('')
    setError(''); setInfo('')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={logo} alt="TrackMap" />
          <h2>Create Your Account</h2>
          <p>Join TrackMap Internship Program</p>
        </div>

        {error && <div className="alert alert-error">❌ {error}</div>}
        {info && !error && <div className="alert alert-info">✅ {info}</div>}

        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Rahul Kumar" value={form.fullName} onChange={set('fullName')} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="9876543210" value={form.phone} onChange={set('phone')} maxLength={10} required />
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
                    {showPassword ? '👁️' : '🙈'}
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
                    {showConfirm ? '👁️' : '🙈'}
                  </button>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? '⏳ Sending OTP...' : 'Send OTP →'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyAndRegister}>
            <div className="form-group">
              <label>Enter OTP sent to {form.email}</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="6-digit code"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                required
                autoFocus
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? '⏳ Verifying...' : 'Verify & Create Account →'}
            </button>

            <div className="auth-switch" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendTimer > 0 || loading}
                style={{ background: 'none', border: 'none', color: 'var(--muted2)', cursor: resendTimer > 0 ? 'default' : 'pointer' }}
              >
                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
              </button>
              <button type="button" onClick={handleEditDetails} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted2)' }}>
                Edit details
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