import React, { useState } from 'react';
import { ArrowRight, Droplets, Sparkles, Activity } from 'lucide-react';

interface SkinConcernSetupProps {
  onComplete: (skinType: string) => void;
}

interface SkinItem {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
}

export const SkinConcernSetup: React.FC<SkinConcernSetupProps> = ({ onComplete }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const options: SkinItem[] = [
    {
      id: 'oily',
      name: 'Oily / Glow-prone',
      desc: 'Skin has visible shine, especially in the T-zone (forehead, nose, and chin). Large pore profiles.',
      icon: <Droplets size={24} color="var(--accent-pink)" />
    },
    {
      id: 'dry',
      name: 'Dry / Flaky-prone',
      desc: 'Skin feels tight or dry, especially after cleansing. Prone to scaling or rough patches.',
      icon: <Sparkles size={24} color="var(--primary-gold)" />
    },
    {
      id: 'combination',
      name: 'Combination',
      desc: 'Slight shine in the T-zone with drier cheeks. A common balanced face profile.',
      icon: <Activity size={24} color="#38bdf8" />
    },
    {
      id: 'sensitive',
      name: 'Sensitive',
      desc: 'Prone to temporary redness, itching, or irritation when exposed to new makeup/skincare products.',
      icon: <HeartIcon size={24} />
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected) {
      onComplete(selected);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '40px 24px',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '650px',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
            Skincare Intelligence
          </span>
          <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 600, marginTop: '4px' }} className="text-gradient-rose">
            What is your skin type?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '6px', maxWidth: '400px', margin: '6px auto 0' }}>
            Helps us recommend the correct primer, foundation, and hydration steps in your style blueprint.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          {options.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelected(opt.id)}
                style={{
                  background: isSelected ? 'rgba(253, 164, 175, 0.04)' : 'rgba(255, 255, 255, 0.01)',
                  border: isSelected ? '1px solid var(--accent-pink)' : '1px solid var(--border-glass)',
                  boxShadow: isSelected ? 'var(--shadow-pink)' : 'none',
                  borderRadius: '10px',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'all 0.3s ease',
                  textAlign: 'left',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'var(--border-glass)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
                  }
                }}
              >
                <div style={{ flexShrink: 0 }}>{opt.icon}</div>
                <div>
                  <strong style={{ fontSize: '0.92rem', color: isSelected ? 'var(--accent-pink)' : 'var(--text-primary)' }}>
                    {opt.name}
                  </strong>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>
                    {opt.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '280px' }}>
          <button
            type="submit"
            disabled={!selected}
            className="btn-primary"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: selected ? 1 : 0.5,
              cursor: selected ? 'pointer' : 'not-allowed',
            }}
          >
            Continue Setup <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

// Helper component icon
const HeartIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);
