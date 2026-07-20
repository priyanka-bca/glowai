import React, { useState } from 'react';
import { X, Briefcase } from 'lucide-react';

interface CareersModalProps {
  onClose: () => void;
}

interface Job {
  id: string;
  title: string;
  type: string;
  desc: string;
  badge: string;
}

export const CareersModal: React.FC<CareersModalProps> = ({ onClose }) => {
  const [selectedRole, setSelectedRole] = useState<string>('stylist');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const jobs: Job[] = [
    {
      id: 'stylist',
      title: 'AI Fashion Stylist (Internship)',
      type: 'Remote / Part-time',
      desc: 'Help curate outfit outlines and color palettes matching varying face shape & body dimensions.',
      badge: '👗 STYLE'
    },
    {
      id: 'creator',
      title: 'Social Media Creator',
      type: 'Flexible',
      desc: 'Create viral video transitions, reels, and tutorials showing off GlowAI scans on TikTok/Instagram.',
      badge: '🎬 CREATIVE'
    },
    {
      id: 'engineer',
      title: 'AI Vision UI Designer',
      type: 'Remote',
      desc: 'Optimize glassmorphic layouts, vector silhouette styling, and smooth web application transitions.',
      badge: '🎨 TECH'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill out all required fields!');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(5, 3, 10, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '650px',
          padding: '32px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(253, 164, 175, 0.1)', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Briefcase size={22} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }} className="text-gradient-rose">
                Join the GlowAI Team 🌸
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Build the future of digital style intelligence. Apply for open roles below.
              </p>
            </div>

            {/* Job Board Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {jobs.map((job) => {
                const isActive = selectedRole === job.id;
                return (
                  <button
                    key={job.id}
                    onClick={() => setSelectedRole(job.id)}
                    style={{
                      background: isActive ? 'rgba(253, 164, 175, 0.04)' : 'rgba(255,255,255,0.01)',
                      border: isActive ? '1px solid var(--accent-pink)' : '1px solid var(--border-glass)',
                      borderRadius: '10px',
                      padding: '14px 18px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: isActive ? 'var(--accent-pink)' : 'var(--text-primary)' }}>{job.title}</span>
                      <span style={{ fontSize: '0.62rem', background: isActive ? 'rgba(253,164,175,0.15)' : 'rgba(255,255,255,0.05)', color: isActive ? 'var(--accent-pink)' : 'var(--text-muted)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        {job.badge}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{job.type}</span>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>{job.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Short Application Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glow-input"
                    placeholder="e.g. Maya"
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glow-input"
                    placeholder="e.g. maya@example.com"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Portfolio Link / Instagram Handle</label>
                <input
                  type="text"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  className="glow-input"
                  placeholder="e.g. instagram.com/mylookbook or github.com/myprofile"
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', marginTop: '6px' }}>
                Submit Application 🚀
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(74, 222, 128, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
              }}
            >
              🎉
            </div>
            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#4ade80' }}>Application Received!</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px', maxWidth: '300px', margin: '6px auto 0' }}>
                We will review your portfolio links and contact you via email at <strong>{email}</strong>!
              </p>
            </div>
            <button onClick={onClose} className="btn-secondary" style={{ padding: '10px 24px', fontSize: '0.8rem', marginTop: '10px' }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
