import { useState, useEffect } from 'react'
import api from '../context/api'

const TABS = ['All', 'Pending', 'Payment Submitted', 'Approved', 'Rejected']

export default function AdminDashboard() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('All')
  const [selected, setSelected] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [search, setSearch] = useState('')
  const [adminNote, setAdminNote] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState({})
  const [certFile, setCertFile] = useState(null) // ✅ NEW

  const fetchApps = async () => {
    setLoading(true)
    try {
      const res = await api.get('/applications')
      setApps(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchApps() }, [])

  const filtered = apps.filter(a => {
    const matchTab =
      activeTab === 'All' ? true :
      activeTab === 'Pending' ? (a.paymentStatus === 'pending' && a.status === 'pending') :
      activeTab === 'Payment Submitted' ? a.paymentStatus === 'submitted' :
      activeTab === 'Approved' ? a.status === 'approved' :
      activeTab === 'Rejected' ? a.status === 'rejected' : true
    const q = search.toLowerCase()
    const matchSearch = !q || a.fullName?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q) || a.certificateId?.toLowerCase().includes(q)
    return matchTab && matchSearch
  })

  const stats = {
    total: apps.length,
    pending: apps.filter(a => a.paymentStatus === 'pending').length,
    submitted: apps.filter(a => a.paymentStatus === 'submitted').length,
    approved: apps.filter(a => a.status === 'approved').length,
    rejected: apps.filter(a => a.status === 'rejected').length,
  }

  const doApprove = async (id) => {
    setActionLoading(true)
    try {
      const res = await api.put(`/applications/${id}/approve`, { adminNote })
      setMsg('✅ ' + res.data.message)
      fetchApps(); setSelected(null)
    } catch (err) { setMsg('❌ ' + (err.response?.data?.message || 'Error')) }
    finally { setActionLoading(false) }
  }

  const doReject = async (id) => {
    setActionLoading(true)
    try {
      await api.put(`/applications/${id}/reject`, { adminNote })
      setMsg('✅ Application rejected.')
      fetchApps(); setSelected(null)
    } catch (err) { setMsg('❌ Error') }
    finally { setActionLoading(false) }
  }

  const doDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return
    try {
      await api.delete(`/applications/${id}`)
      setMsg('✅ Deleted successfully.')
      fetchApps(); setSelected(null)
    } catch { setMsg('❌ Error') }
  }

  const doUpdate = async (id) => {
    setActionLoading(true)
    try {
      await api.put(`/applications/${id}`, editData)
      setMsg('✅ Updated successfully.')
      fetchApps(); setEditMode(false); setSelected(null)
    } catch { setMsg('❌ Error') }
    finally { setActionLoading(false) }
  }

  // ✅ NEW - Certificate upload function
  const doUploadCertificate = async (id) => {
    if (!certFile) return
    setActionLoading(true)
    try {
      const formData = new FormData()
      formData.append('certificate', certFile)
      await api.put(`/applications/${id}/upload-certificate`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setMsg('✅ Certificate uploaded successfully!')
      fetchApps()
      setCertFile(null)
      // Refresh selected
      const res = await api.get(`/applications/${id}`)
      setSelected(res.data.data)
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.message || 'Upload failed'))
    } finally {
      setActionLoading(false)
    }
  }

  const openDetail = (app) => {
    setSelected(app); setAdminNote(app.adminNote || '')
    setEditData({ ...app }); setEditMode(false); setMsg('')
    setCertFile(null)
  }

  return (
    <div className="dash-page">
      <div className="container">
        <div className="dash-header">
          <h1>🛠️ Admin Dashboard</h1>
          <p>Manage all internship applications from here.</p>
        </div>

        {msg && <div className={`alert ${msg.startsWith('✅') ? 'alert-success' : 'alert-error'}`}>{msg}</div>}

        {/* Stats */}
        <div className="admin-stats">
          {[['Total Applications', stats.total, 'var(--blue-light)'], ['Payment Pending', stats.pending, 'var(--yellow)'], ['Payment Submitted', stats.submitted, 'var(--accent)'], ['Approved', stats.approved, 'var(--green)'], ['Rejected', stats.rejected, 'var(--red)']].map(([l, c, color]) => (
            <div key={l} className="card admin-stat-card">
              <div className="num" style={{ color }}>{c}</div>
              <div className="lbl">{l}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '18px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className={`btn btn-sm ${activeTab === t ? 'btn-primary' : 'btn-outline'}`}>{t}</button>
            ))}
          </div>
          <input placeholder="🔍 Search name, email, certificate ID..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding: '9px 14px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '9px', color: 'var(--text)', fontSize: '0.85rem', outline: 'none', minWidth: '220px' }} />
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}><div className="spinner" style={{ margin: '0 auto' }}></div></div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th><th>Name</th><th>Email</th><th>Domain</th><th>College</th>
                  <th>Payment</th><th>Status</th><th>Certificate ID</th><th>Cert File</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={10} style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>No applications found</td></tr>
                ) : filtered.map((a, i) => (
                  <tr key={a._id}>
                    <td style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>{i + 1}</td>
                    <td style={{ fontWeight: 600 }}>{a.fullName}</td>
                    <td style={{ color: 'var(--muted2)', fontSize: '0.8rem' }}>{a.email}</td>
                    <td style={{ fontSize: '0.82rem' }}>{a.domain}</td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--muted2)' }}>{a.college}</td>
                    <td><span className={`badge badge-${a.paymentStatus}`}>{a.paymentStatus}</span></td>
                    <td><span className={`badge badge-${a.status}`}>{a.status}</span></td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent)' }}>{a.certificateId || '—'}</td>
                    <td>
                      {a.certificateFile
                        ? <span style={{ color: 'var(--green)', fontSize: '0.78rem', fontWeight: 600 }}>✅ Uploaded</span>
                        : <span style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>—</span>
                      }
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="btn btn-sm btn-outline" onClick={() => openDetail(a)}>View</button>
                        <button className="btn btn-sm btn-danger" onClick={() => doDelete(a._id)}>Del</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* DETAIL MODAL */}
        {selected && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={e => { if (e.target === e.currentTarget) setSelected(null) }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '660px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem' }}>
                  {editMode ? '✏️ Edit Application' : '📋 Application Detail'}
                </h3>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '1.4rem', cursor: 'pointer' }}>✕</button>
              </div>

              {msg && <div className={`alert ${msg.startsWith('✅') ? 'alert-success' : 'alert-error'}`}>{msg}</div>}

              {!editMode ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 20px', marginBottom: '18px' }}>
                    {[['Full Name', selected.fullName], ['Email', selected.email], ['Phone', selected.phone], ['College', selected.college], ['Branch', selected.branch], ['Semester', selected.semester], ['Reg. No.', selected.regNo], ['Domain', selected.domain], ['UTR ID', selected.utrId || '—'], ['Payment Status', selected.paymentStatus], ['Application Status', selected.status], ['Certificate ID', selected.certificateId || '—'], ['Applied On', new Date(selected.createdAt).toLocaleDateString('en-IN')]].map(([l, v]) => (
                      <div key={l} style={{ padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
                        <p style={{ fontSize: '0.68rem', color: 'var(--muted)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</p>
                        <p style={{ fontSize: '0.85rem', fontWeight: 500 }}>{v}</p>
                      </div>
                    ))}
                  </div>

                  {selected.whyJoin && (
                    <div style={{ marginBottom: '14px', padding: '12px', background: 'var(--bg2)', borderRadius: '10px' }}>
                      <p style={{ fontSize: '0.68rem', color: 'var(--muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Motivation</p>
                      <p style={{ fontSize: '0.85rem' }}>{selected.whyJoin}</p>
                    </div>
                  )}

                  {selected.paymentScreenshot && (
                    <div style={{ marginBottom: '14px' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--muted2)', marginBottom: '8px' }}>Payment Screenshot:</p>
                      <a href={selected.paymentScreenshot} target="_blank" rel="noopener noreferrer">
                        <img src={selected.paymentScreenshot} alt="Payment" style={{ maxWidth: '100%', borderRadius: '10px', border: '1px solid var(--border)' }} />
                      </a>
                    </div>
                  )}

                  {/* ✅ NEW - Certificate Upload Section */}
                  <div style={{ marginBottom: '16px', padding: '16px', background: 'var(--bg2)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '12px' }}>
                      🎓 Upload Certificate File
                    </h4>
                    {selected.certificateFile ? (
                      <div className="alert alert-success" style={{ marginBottom: '10px', fontSize: '0.82rem' }}>
                        ✅ Certificate already uploaded. Upload again to replace.
                      </div>
                    ) : (
                      <div className="alert alert-warn" style={{ marginBottom: '10px', fontSize: '0.82rem' }}>
                        ⚠️ No certificate uploaded yet for this student.
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={e => setCertFile(e.target.files[0])}
                      style={{ width: '100%', padding: '8px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', marginBottom: '10px', fontSize: '0.85rem' }}
                    />
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '10px' }}>
                      Accepted: PDF, JPG, PNG — Max 10MB
                    </p>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => doUploadCertificate(selected._id)}
                      disabled={actionLoading || !certFile}
                    >
                      {actionLoading ? '⏳ Uploading...' : '📤 Upload Certificate'}
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Admin Note</label>
                    <input type="text" value={adminNote} onChange={e => setAdminNote(e.target.value)} placeholder="Add approval or rejection note..." />
                  </div>

                  <div className="action-btns" style={{ marginTop: '14px' }}>
                    {selected.paymentStatus === 'submitted' && selected.status === 'pending' && (
                      <button className="btn btn-success" onClick={() => doApprove(selected._id)} disabled={actionLoading}>
                        {actionLoading ? '...' : '✅ Approve & Issue Certificate'}
                      </button>
                    )}
                    {selected.status === 'pending' && (
                      <button className="btn btn-danger" onClick={() => doReject(selected._id)} disabled={actionLoading}>❌ Reject</button>
                    )}
                    <button className="btn btn-outline" onClick={() => setEditMode(true)}>✏️ Edit</button>
                    <button className="btn btn-danger" onClick={() => doDelete(selected._id)}>🗑️ Delete</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-row">
                    {[['fullName','Full Name'],['email','Email'],['phone','Phone'],['college','College'],['branch','Branch'],['semester','Semester'],['regNo','Reg No'],['domain','Domain']].map(([f, l]) => (
                      <div key={f} className="form-group">
                        <label>{l}</label>
                        <input type="text" value={editData[f] || ''} onChange={e => setEditData({ ...editData, [f]: e.target.value })} />
                      </div>
                    ))}
                  </div>
                  <div className="action-btns" style={{ marginTop: '14px' }}>
                    <button className="btn btn-primary" onClick={() => doUpdate(selected._id)} disabled={actionLoading}>
                      {actionLoading ? '...' : '💾 Save Changes'}
                    </button>
                    <button className="btn btn-outline" onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}