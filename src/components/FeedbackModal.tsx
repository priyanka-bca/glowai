import React, { useState } from 'react';
import { X, Heart, MessageSquare } from 'lucide-react';

interface FeedbackModalProps {
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a heart rating!');
      return;
    }
    // Simulate API submit
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
          maxWidth: '460px',
          padding: '32px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
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
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(253, 164, 175, 0.1)', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <MessageSquare size={22} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }} className="text-gradient-rose">
                Share Your Feedback
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                We love hearing from you! Tell us how we can improve your GlowAI experience.
              </p>
            </div>

            {/* Heart Rating */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Rate your experience</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = star <= rating;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Heart
                        size={28}
                        color={active ? 'var(--accent-rose)' : 'var(--text-muted)'}
                        fill={active ? 'var(--accent-rose)' : 'none'}
                        style={{ filter: active ? 'drop-shadow(0 0 4px var(--accent-rose))' : 'none' }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comments Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Comments or Suggestions</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="What did you like? What features would you like to see next?"
                required
                style={{
                  width: '100%',
                  height: '110px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '10px',
                  padding: '12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  resize: 'none',
                  outline: 'none',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-pink)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-glass)'}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px' }}>
              Send Feedback 🌸
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
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
              🌸
            </div>
            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#4ade80' }}>Feedback Submitted!</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px', maxWidth: '300px', margin: '6px auto 0' }}>
                Thank you so much! Your inputs help us calibrate the AI model and dress recommendation rules.
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
