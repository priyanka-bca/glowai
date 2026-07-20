import React, { useState } from 'react';
import { ArrowRight, User } from 'lucide-react';

interface NameSetupProps {
  onComplete: (nickname: string) => void;
}

export const NameSetup: React.FC<NameSetupProps> = ({ onComplete }) => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError('Please tell us what to call you!');
      return;
    }
    if (nickname.length > 25) {
      setError('Name is too long. Please keep it under 25 characters.');
      return;
    }
    onComplete(nickname.trim());
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '24px',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
          textAlign: 'center',
        }}
      >
        {/* Animated Icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--rose-gold-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-pink)',
            animation: 'float 3s infinite ease-in-out',
          }}
        >
          <User size={32} color="#000" />
        </div>

        {/* Text Details */}
        <div>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 600,
              fontFamily: 'var(--font-serif)',
              marginBottom: '10px',
            }}
            className="text-gradient-rose"
          >
            What should we call you?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>
            We personalize your style recommendations, scorecard charts, and dashboard based on your preference.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && (
            <div style={{ color: '#fda4af', fontSize: '0.8rem', background: 'rgba(244, 63, 94, 0.1)', padding: '8px', borderRadius: '6px' }}>
              {error}
            </div>
          )}

          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder="Your nickname (e.g., Eva , John)"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError('');
              }}
              className="glow-input"
              style={{ textAlign: 'center', fontSize: '1.1rem', letterSpacing: '0.5px' }}
              maxLength={30}
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px',
              fontWeight: 600,
            }}
          >
            Let's Glow <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
