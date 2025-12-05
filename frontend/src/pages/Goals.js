import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Goals({ user }) {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!user) return;
    api.get('/goals/my').then(res => setGoals(res.data)).catch(()=>{});
  }, [user]);

  if (!user) return <div className="container"><h2>Please login to manage goals.</h2></div>;

  const addGoal = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/goals', { title, targetDate });
      setGoals([res.data, ...goals]);
      setTitle(''); setTargetDate('');
      setMsg('Goal added');
      setTimeout(()=>setMsg(''), 1200);
    } catch (err) {
      setMsg('Failed to add');
    }
  };

  const toggle = async id => {
    try {
      const res = await api.put(`/goals/${id}/toggle`);
      setGoals(goals.map(g=> g._id===id ? res.data : g));
    } catch {}
  };

  const remove = async id => {
    try {
      await api.delete(`/goals/${id}`);
      setGoals(goals.filter(g=>g._id !== id));
    } catch {}
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Your Goals</h2>
        <form onSubmit={addGoal}>
          <input placeholder="Goal title" value={title} onChange={e=>setTitle(e.target.value)} required />
          <input placeholder="Target date (YYYY-MM-DD)" value={targetDate} onChange={e=>setTargetDate(e.target.value)} />
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn" type="submit">Add Goal</button>
            <button type="button" className="btn secondary" onClick={()=>{ setTitle(''); setTargetDate(''); }}>Clear</button>
          </div>
        </form>
        {msg && <p className="meta" style={{ marginTop:10 }}>{msg}</p>

        }
        <div style={{ marginTop:20 }}>
          {goals.map(g => (
            <div className="item" key={g._id}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <input type="checkbox" checked={g.completed} onChange={()=>toggle(g._id)} style={{ transform:'scale(1.05)' }} />
                <div>
                  <div style={{ fontWeight:700 }}>{g.title}</div>
                  <div className="meta">{g.targetDate ? `By ${new Date(g.targetDate).toLocaleDateString()}` : ''}</div>
                </div>
              </div>
              <div>
                <button className="small" onClick={()=>remove(g._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
