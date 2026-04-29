import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-note">His Imperials' Shop. All rights reserved © {new Date().getFullYear()}.</p>

      <div className="footer-links">
        <Link to="/" className="footer-link">Home</Link>
        <Link to="/about" className="footer-link">About</Link>
        <Link to="/chat" className="footer-link">Contact</Link>
      </div>
    </footer>
  )
}

export default Footer