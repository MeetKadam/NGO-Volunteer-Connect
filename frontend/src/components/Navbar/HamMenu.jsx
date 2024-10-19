import React from 'react'
import "../Navbar/HamMenu.css"
import { Link } from "react-router-dom"

function HamMenu() {
  return (
    <div>
      <div id="menuToggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu">
          <Link to="home"><a href="/"><li>Home</li></a></Link>
          <Link to="about"><a href="/"><li>About</li></a></Link>
          <Link to="contact"><a href="/"><li>Contact</li></a></Link>
        </ul>
      </div>
    </div>
  )
}

export default HamMenu