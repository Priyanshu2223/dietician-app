import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function Dashboard({ user }) {
  const [consults, setConsults] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (!user) return;
    api.get('/consultations/my').then(res => setConsults(res.data)).catch(()=>{});
    api.get('/goals/my').then(res => setGoals(res.data)).catch(()=>{});
  }, [user]);

  if (!user) return <div className="container"><h2>Please sign in</h2></div>;

  return (
    <div className="container">
      <h2>Welcome, {user.name}</h2>

      <section style={{ marginTop:14 }}>
        <h3>Your Consultations</h3>
        {consults.length===0 ? <p className="lead">No consultation requests yet.</p> :
          consults.map(c => <div className="item" key={c._id}>
            <div className="left">
              <div>
                <div style={{ fontWeight:700 }}>{c.message || 'Consultation request'}</div>
                <div className="meta">{new Date(c.createdAt).toLocaleString()}</div>
              </div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div className="meta">{c.preferredDate ? new Date(c.preferredDate).toLocaleDateString() : ''}</div>
            </div>
          </div>)}
        <Link to="/consultation" className="btn">New Consultation</Link>
      </section>

      <section style={{ marginTop:20 }}>
        <h3>Your Goals</h3>
        {goals.length===0 ? <p className="lead">No goals yet.</p> :
          goals.map(g => <div className="item" key={g._id}>
            <div>
              <input type="checkbox" checked={g.completed} readOnly style={{ transform:'scale(1.1)' }} />
              <span style={{ marginLeft:10, fontWeight:600 }}>{g.title}</span>
              <div className="meta" style={{ marginTop:6 }}>{g.targetDate ? `By ${new Date(g.targetDate).toLocaleDateString()}` : ''}</div>
            </div>
            <div className="meta">{new Date(g.createdAt).toLocaleDateString()}</div>
          </div>)}
        <Link to="/goals" className="btn">Manage Goals</Link>
      </section>
    </div>
  );
}
