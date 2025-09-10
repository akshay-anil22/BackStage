import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut } from 'lucide-react';

/**
 * A responsive navbar with a three-part layout: Brand (left), Navigation (center), and Actions (right).
 */
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'Change Password', to: '/change-password' },
  ];
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };
  const getNavLinkClass = ({ isActive }) =>
    `px-3 py-2 text-black rounded-md text-2xl font-mourand transition-colors duration-200 ${
      isActive
        ? 'bg-black/10' // Active state with a subtle background
        : 'hover:bg-black/5'
    }`;
  
  const getMobileNavLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-mourand transition-colors duration-200 ${
      isActive
        ? 'bg-black text-white'
        : 'text-gray-800 hover:bg-black/5'
    }`;

  return (
    <nav className="bg-accent backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left Section: Brand */}
          <div className="flex-shrink-0">
            <Link to="/dashboard" className="text-5xl font-mourand text-black">
              BackStage
            </Link>
          </div>

          {/* Center Section: Main Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink key={link.name} to={link.to} className={getNavLinkClass}>
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right Section: Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
             <Link to="/create" className="inline-flex items-center gap-2 py-2 px-4 border-2 border-black font-mourand text-xl rounded-lg text-black bg-accent hover:bg-[#FDE047]  transition-colors">
                <PlusCircle size={20} />
                Create Event
            </Link>
            <button onClick={handleLogout} className="inline-flex items-center gap-2 py-2 px-4  font-mourand text-2xl rounded-lg text-black bg-transparent hover:bg-black/10 transition-colors">
                <LogOut size={24} />
                Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close Icon */}
              <svg className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white/20`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.to} className={getMobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </NavLink>
          ))}
        </div>
        <div className="pt-3 pb-3 border-t border-black/20">
          <div className="px-2 space-y-2">
             <Link to="/create" onClick={() => setIsMobileMenuOpen(false)} className="block text-center font-mourand text-lg rounded-lg text-black bg-[#FDE047] hover:bg-[#FACC15] px-3 py-2">Create Event</Link>
             <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-center font-mourand text-lg rounded-lg text-black bg-transparent hover:bg-black/10 px-3 py-2 border-2 border-black">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
