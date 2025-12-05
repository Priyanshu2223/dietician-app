import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function ConsultationForm({ user }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', preferredDate: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  if (!user) return <div className="container"><h2>Please login to book a consultation.</h2></div>;

  const submit = async e => {
    e.preventDefault();
    try {
      await api.post('/consultations', form);
      setMsg('Consultation request submitted.');
      setTimeout(()=>navigate('/dashboard'), 1000);
    } catch (err) {
      setMsg('Failed to submit.');
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Book Consultation</h2>
        <form onSubmit={submit}>
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Full name" required />
          <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" type="email" required />
          <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone" />
          <input value={form.preferredDate} onChange={e=>setForm({...form, preferredDate:e.target.value})} placeholder="Preferred date (YYYY-MM-DD)" />
          <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} placeholder="Message" />
          <button className="btn" type="submit">Submit</button>
        </form>
        {msg && <p style={{ marginTop:12 }}>{msg}</p>}
      </div>
    </div>
  );
}
