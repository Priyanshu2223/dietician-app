import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setErr('');
    try {
      const res = await api.post('/auth/login', form);
      onLogin(res.data.token);
      navigate('/dashboard');
    } catch (error) {
      setErr(error.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="container">
      <div className="form-card" style={{ maxWidth:420 }}>
        <h2>Log In</h2>
        <form onSubmit={submit}>
          <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} required />
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} required />
          <div style={{ display:'flex', gap:8, alignItems:'center', marginTop:8 }}>
            <button className="btn" type="submit">Log In</button>
            <button type="button" className="btn secondary" onClick={() => navigate('/signup')}>Create account</button>
          </div>
          {err && <p className="error">{err}</p>}
        </form>
      </div>
    </div>
  );
}
