import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Apply from './pages/Apply'
import Payment from './pages/Payment'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import VerifyCertificate from './pages/VerifyCertificate'
import About from './pages/About'
import Roles from './pages/Roles'
import AboutFounder from './pages/AboutFounder'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import Disclaimer from './pages/Disclaimer'

function ProtectedRoute({ children, adminRequired = false }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loader"><div className="spinner"></div></div>
  if (!user) return <Navigate to="/login" />
  if (adminRequired && user.role !== 'admin') return <Navigate to="/dashboard" />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyCertificate />} />
        <Route path="/apply" element={<ProtectedRoute><Apply /></ProtectedRoute>} />
        <Route path="/payment/:appId" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute adminRequired><AdminDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/about-founder" element={<AboutFounder />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms-conditions" element={<TermsConditions />} />
<Route path="/disclaimer" element={<Disclaimer />} />
      </Routes>
    </BrowserRouter>
  )
}
