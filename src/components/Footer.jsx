import React from 'react'
const Footer = () => {
  return (
    <footer className="bg-light text-dark text-center p-3 mt-4" >
      <p><marquee behavior="" direction="left"> His Imperials' Shop. All rights reserved</marquee>© {new Date().getFullYear()}.</p>

      <div>
        <a href="#" className="text-white me-3">Home</a>
        <a href="#" className="text-white me-3">Products</a>
        <a href="#" className="text-white">Contact</a>
      </div>
    </footer>
  )
}

export default Footer