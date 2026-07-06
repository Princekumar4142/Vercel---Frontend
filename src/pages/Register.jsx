import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../context/api'
import logo from '../assets/logo.jpeg'

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    setLoading(true); setError('')
    try {
      const res = await api.post('/auth/register', {
        fullName: form.fullName, email: form.email,
        phone: form.phone, password: form.password
      })
      login(res.data.user, res.data.token)
      navigate('/apply')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value })

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={logo} alt="TrackMap" />
          <h2>Create Your Account</h2>
          <p>Join TrackMap Internship Program — ₹199 only</p>
        </div>

        {error && <div className="alert alert-error">❌ {error}</div>}

        <form onSubmit={handleSubmit}>
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
              <input type="tel" placeholder="9876543210" value={form.phone} onChange={set('phone')} required />
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    cursor: 'pointer', color: 'var(--muted2)',
                    fontSize: '1.1rem', padding: '0'
                  }}
                >
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
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    cursor: 'pointer', color: 'var(--muted2)',
                    fontSize: '1.1rem', padding: '0'
                  }}
                >
                  {showConfirm ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? '⏳ Creating account...' : 'Create Account →'}
          </button>
        </form>

        <div className="auth-switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  )
}
