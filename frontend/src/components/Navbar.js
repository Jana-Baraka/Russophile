

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include' 
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate('/'); 
      } else {
        alert(data.message || 'Logout failed');
      }
    } catch (err) {
      alert('Error logging out');
      console.error(err);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Login</Link>
      <Link to="/register" className="nav-link">Register</Link>
      <Link to="/lessons" className="nav-link">Lessons</Link>
      <Link to="/admin" className="nav-link">Admin</Link>
      <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
