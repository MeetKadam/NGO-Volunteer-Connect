import React from 'react';
import { Link } from "react-router-dom";
import Icon from '../Icons/NGO.png';
import { BiSearch } from "react-icons/bi";
import "../Navbar/Navbar.css";
import ScrollToTop from './scrollToTop';
import HamMenu from "./HamMenu";
import { useAuth } from '../../store/auth';
import { Sidebar, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { isLoggedIn } = useAuth();
  console.log("login or not ", isLoggedIn);

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='ham-menu'>
          <HamMenu />
        </div>
        <div className='img-container' style={{ marginTop: '0.5rem', marginLeft: '1.5rem', display: 'flex', alignItems: 'center' }}>
          <img src={Icon} style={{ width: '2.8rem', height: '2.8rem' }} alt="Samuhik Seva Logo" />
          <Link to={'/'} style={{ fontSize: '1.4rem', fontWeight: '500', paddingTop: '4px', color: 'black', textDecoration: 'none' }}>Samuhik Seva</Link>
        </div>
        <div className='center-buttons'>
          <div className="dropdown">
            <button className='dropbtn'>
              <Link to="/" style={{textDecoration:'none', color:'black', fontSize:'1rem',marginLeft:'0.5rem'}}> Home </Link>
            </button>
          </div>
          <div className="dropdown">
            <button className='dropbtn' style={{ color:'black', fontSize:'1rem',marginLeft:'0.5rem'}}>
            <Link to="/about" style={{textDecoration:'none', color:'black', fontSize:'1rem',marginLeft:'0.5rem'}}> About </Link>
            </button>
            
          </div>
          <div className="dropdown">
            <button className='dropbtn' style={{ color:'black', fontSize:'1rem',marginLeft:'0.5rem'}}>
              Features <ChevronDown size={16} />
            </button>
            <div className="dropdown-content">
              <Link to="/posts">Posts</Link>
              <Link to="/feedback">Feedback</Link>
              <Link to="/ngo/NGOMap">Maps</Link>
              <Link to="/ml">NPRS</Link>

            </div>
          </div>
          <div className="dropdown">
            
              <Link to="/events" style={{textDecoration:'none', color:'black', fontSize:'1rem',marginLeft:'0.5rem'}}> Events </Link>
            
          </div>
          
            <Link to="/community"style={{textDecoration:'none', color:'black', fontSize:'1rem',marginLeft:'0.5rem'}}> Community </Link>
          
          
            <Link to="/contact"style={{textDecoration:'none', color:'black', fontSize:'1rem',marginLeft:'0.5rem'}}> Contact </Link>
          
          {isLoggedIn ? (
            
              <Link to="/logout"style={{textDecoration:'none', color:'black', fontSize:'1rem',marginLeft:'0.5rem'}}> Logout </Link>
            
          ) : (
            
              <Link to="/signupin"style={{textDecoration:'none', color:'black', fontSize:'1rem',marginLeft:'0.5rem'}}> SignInUp </Link>
            
          )}
        </div>

        <div className='right-buttons'>
          <button id='donate-btn'>
            <Link to="/donation"> Donate Now </Link>
          </button>
          <button id='search-nav'>
            <BiSearch size={20} />
          </button>
          
        </div>
      </div>
      <ScrollToTop />
    </nav>
  );
}
