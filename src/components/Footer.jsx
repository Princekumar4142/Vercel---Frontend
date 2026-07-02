import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpeg'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logo} alt="TrackMap" />
        TrackMap Innovations Pvt. Ltd.
      </div>

      {/* <ul className="footer-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/roles">Roles</Link></li>
        <li><Link to="/verify">Verify Certificate</Link></li>
        <li><Link to="/register">Apply Now</Link></li>
      </ul> */}

      <ul className="footer-links" style={{ marginTop: '4px' }}>
        <li><Link to="/about-founder">About Us</Link></li>
        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
        <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
        <li><Link to="/disclaimer">Disclaimer</Link></li>
      </ul>

      <p style={{ marginTop: '12px' }}>
        📧 trackmapinnovationspvtltd@gmail.com &nbsp;|&nbsp; DPIIT No: DIPP229619 &nbsp;|&nbsp; CIN: U74909BR2025PTC075493
      </p>
      <p style={{ marginTop: '6px' }}>
        © {new Date().getFullYear()} TrackMap Innovations Private Limited. All rights reserved.
      </p>
    </footer>
  )
}