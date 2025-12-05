import React from 'react';
import { Link } from 'react-router-dom';

const tips = [
  { title: 'Hydration', text: 'Start your day with a glass of water and carry a bottle.' },
  { title: 'Balanced Meals', text: 'Aim for protein + veggies + whole grains every meal.' },
  { title: 'Sleep', text: '7–8 hours nightly helps recovery and appetite control.' }
];

export default function Home({ user }) {
  return (
    <div>
      <div className="hero">
        <div className="container hero-inner">
          <div className="hero-left">
            <h1>New Year. New Healthy You.</h1>
            <p className="lead">Simple, realistic wellness goals and one-on-one guidance from a dietician.</p>

            <div style={{ marginTop:18 }}>
              {user ? (
                <Link to="/consultation" className="btn">Book a Consultation</Link>
              ) : (
                <>
                  <Link to="/signup" className="btn" style={{ marginRight:12 }}>Get Started</Link>
                  <Link to="/signup" className="btn secondary">Sign Up</Link>
                </>
              )}
            </div>
          </div>

          {/* ---------------- NEW ILLUSTRATION ---------------- */}
          <div className="hero-right" aria-hidden="true">
            <svg
              width="300"
              height="220"
              viewBox="0 0 300 220"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* background card */}
              <rect x="0" y="0" width="300" height="220" rx="16" fill="#F3F8FF" />

              {/* Plate arc */}
              <path
                d="M60 150c0-40 40-70 90-70s90 30 90 70"
                stroke="#0A74DA"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Person head */}
              <circle cx="150" cy="70" r="22" fill="#0A74DA" />

              {/* Person body */}
              <rect
                x="130"
                y="90"
                width="40"
                height="45"
                rx="10"
                fill="#0A74DA"
              />

              {/* Leaf (nutrition symbol) */}
              <path
                d="M210 120c12-18 36-24 54-12 0 0-12 18-30 30s-24 6-24-18z"
                fill="#10B981"
              />

              {/* Leaf highlight stroke */}
              <path
                d="M225 115c6-4 12-2 16 2"
                stroke="#ffffff"
                strokeWidth="2"
                opacity="0.4"
              />
            </svg>
          </div>
          {/* --------------------------------------------------- */}
          
        </div>
      </div>

      {/* Content section */}
      <div className="container" style={{ marginTop:30 }}>
        <h2>Nutrition Tips</h2>
        <div className="card-grid">
          {tips.map((t, i) => (
            <div className="card" key={i}>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </div>
          ))}
        </div>

        <section style={{ marginTop:30 }}>
          <h2>Get a Consultation</h2>
          <p className="lead">Personalized plans and real support — small changes add up.</p>

          {user ? (
            <Link to="/consultation" className="btn">Book Now</Link>
          ) : (
            <Link to="/signup" className="btn">Sign Up to Book</Link>
          )}
        </section>
      </div>
    </div>
  );
}
