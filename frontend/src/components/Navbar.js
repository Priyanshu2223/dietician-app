import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar({ user, onLogout }) {
  return (
    <div className="nav">
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <Logo size={36} />
          <div style={{ display:'flex', flexDirection:'column', lineHeight:1 }}>
            <span className="brand">Dietician</span>
            <span style={{ fontSize:12, color:'#6b7280', marginTop:2 }}>Health & Wellness</span>
          </div>
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/consultation">Consultation</Link>
        <Link to="/goals">Goals</Link>

        {user ? (
          <>
            <span style={{ color:'#111827', fontSize:15, marginLeft:6 }}>{user.name}</span>
            <button className="link-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
          </>
        )}
      </div>
    </div>
  );
}
