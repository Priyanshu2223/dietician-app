import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setErr('');
    try {
      const res = await api.post('/auth/signup', form);
      onSignup(res.data.token);
      navigate('/dashboard');
    } catch (error) {
      setErr(error.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Sign Up</h2>
        <form onSubmit={submit}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
          <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} required />
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} required />
          <div style={{ display:'flex', gap:8, alignItems:'center', marginTop:8 }}>
            <button className="btn" type="submit">Sign Up</button>
            <button type="button" className="btn secondary" onClick={() => navigate('/login')}>Already have account</button>
          </div>
          {err && <p className="error">{err}</p>}
        </form>
      </div>
    </div>
  );
}
