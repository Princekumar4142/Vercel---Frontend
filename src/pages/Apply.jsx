import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../context/api'

const domains = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'UI/UX Designer',
  'Data Analyst',
  'Digital Marketing',
  'Machine Learning',
  'Cloud Computing',
  'Cybersecurity',
  'Android Development',
  'iOS Development',
  'Database Management',
  'Video Editing',
  'Content Writing',
  'Business Development',
  'Other (Specify Below)',
]

const branches = [
  'Computer Science Engineering',
  'CSE(Cyber Security)',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'VLSI Design',
  'MBA / Management',
  'BCA',
  'MCA',
  'B.Sc / M.Sc',
  'B.Com / M.Com',
  'Arts / Humanities',
  'B.Tech (Other)',
  'Diploma',
  'Other',
]

const semesters = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'Graduated']

const durations = [
  '2 Weeks',
  '4 Weeks (1 Month)',
  '6 Weeks (1.5 Months)',
  '8 Weeks (2 Months)',
  '12 Weeks (3 Months)',
  '6 Months',
  'Other (Specify Below)',
]

export default function Apply() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: '',
    college: '',
    branch: '',
    customBranch: '',
    semester: '',
    regNo: '',
    domain: '',
    customDomain: '',
    duration: '',
    customDuration: '',
    whyJoin: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.branch === 'Other' && !form.customBranch.trim()) {
      return setError('Please specify your branch in the "Other Branch" field.')
    }
    if (form.domain === 'Other (Specify Below)' && !form.customDomain.trim()) {
      return setError('Please specify your domain in the "Other Domain" field.')
    }
    if (form.duration === 'Other (Specify Below)' && !form.customDuration.trim()) {
      return setError('Please specify your internship duration in the "Other Duration" field.')
    }
    setLoading(true); setError('')
    try {
      const submitData = {
        ...form,
        branch: form.branch === 'Other' ? form.customBranch : form.branch,
        domain: form.domain === 'Other (Specify Below)' ? form.customDomain : form.domain,
        duration: form.duration === 'Other (Specify Below)' ? form.customDuration : form.duration,
      }
      const res = await api.post('/applications', submitData)
      navigate(`/payment/${res.data.data._id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page" style={{ padding: '90px 20px 60px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <span className="eyebrow">Step 1 of 2</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,4vw,2rem)', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Internship Application Form
          </h1>
          <p style={{ color: 'var(--muted2)', fontSize: '0.9rem' }}>
            Fill in accurate details — this information will appear on your certificate.
          </p>
        </div>

        {error && <div className="alert alert-error">❌ {error}</div>}

        <div className="card">
          <form onSubmit={handleSubmit}>

            {/* Personal Info */}
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '16px' }}>
              👤 Personal Information
            </p>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name (as per records) *</label>
                <input type="text" placeholder="Rahul Kumar" value={form.fullName} onChange={set('fullName')} required />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" placeholder="rahul@gmail.com" value={form.email} onChange={set('email')} required />
              </div>
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" placeholder="1234567890" value={form.phone} onChange={set('phone')} required />
            </div>

            <hr className="divider" style={{ margin: '22px 0' }} />

            {/* Academic Info */}
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '16px' }}>
              🎓 Academic Information
            </p>
            <div className="form-group">
              <label>College / University Name *</label>
              <input type="text" placeholder="e.g. Your College Name" value={form.college} onChange={set('college')} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Branch / Department *</label>
                <select value={form.branch} onChange={set('branch')} required>
                  <option value="">-- Select Branch --</option>
                  {branches.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Current Semester *</label>
                <select value={form.semester} onChange={set('semester')} required>
                  <option value="">-- Semester --</option>
                  {semesters.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Show custom branch input if "Other" selected */}
            {form.branch === 'Other' && (
              <div className="form-group">
                <label>Specify Your Branch *</label>
                <input
                  type="text"
                  placeholder="e.g. Chemical Engineering, Biotechnology, etc."
                  value={form.customBranch}
                  onChange={set('customBranch')}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Enrollment / Registration Number *</label>
              <input type="text" placeholder="Your university registration number" value={form.regNo} onChange={set('regNo')} required />
              <p className="form-hint">This will be printed on your certificate.</p>
            </div>

            <hr className="divider" style={{ margin: '22px 0' }} />

            {/* Internship Details */}
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '16px' }}>
              💻 Internship Details
            </p>
            <div className="form-group">
              <label>Internship Domain *</label>
              <select value={form.domain} onChange={set('domain')} required>
                <option value="">-- Select Your Domain --</option>
                {domains.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>

            {/* Show custom domain input if "Other" selected */}
            {form.domain === 'Other (Specify Below)' && (
              <div className="form-group">
                <label>Specify Your Domain *</label>
                <input
                  type="text"
                  placeholder="e.g. Blockchain Development, Game Design, etc."
                  value={form.customDomain}
                  onChange={set('customDomain')}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Internship Duration *</label>
              <select value={form.duration} onChange={set('duration')} required>
                <option value="">-- Select Duration --</option>
                {durations.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>

            {/* Show custom duration input if "Other" selected */}
            {form.duration === 'Other (Specify Below)' && (
              <div className="form-group">
                <label>Specify Duration *</label>
                <input
                  type="text"
                  placeholder="e.g. 5 weeks, 45 days, etc."
                  value={form.customDuration}
                  onChange={set('customDuration')}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Why do you want to join? (Optional)</label>
              <textarea placeholder="Tell us about your goals, motivation, or any relevant projects..." value={form.whyJoin} onChange={set('whyJoin')} />
            </div>

            <div className="alert alert-info">
              ℹ️ After submitting this form, you'll be directed to complete the ₹699 payment.
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? '⏳ Submitting...' : 'Submit Application → Proceed to Payment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
