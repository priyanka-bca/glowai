import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface BodyTypeSetupProps {
  onComplete: (bodyType: string) => void;
}

interface ShapeItem {
  id: string;
  name: string;
  desc: string;
  svgPath: string; // Dynamic path for styling silhouette
}

export const BodyTypeSetup: React.FC<BodyTypeSetupProps> = ({ onComplete }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const shapes: ShapeItem[] = [
    {
      id: 'hourglass',
      name: 'Hourglass',
      desc: 'Symmetrical bust and hips with a distinctly narrow, defined waist.',
      // Silhouette SVG path representation
      svgPath: 'M35 15 C45 15 48 30 38 42 C30 52 28 58 38 68 C48 78 45 85 35 85 C25 85 22 78 32 68 C42 58 40 52 32 42 C22 30 25 15 35 15 Z'
    },
    {
      id: 'pear',
      name: 'Pear / Triangle',
      desc: 'Shoulders and bust are narrower, with fuller hips and thighs.',
      svgPath: 'M35 15 C42 15 42 30 36 42 C30 54 48 68 48 78 C48 85 45 85 35 85 C25 85 22 85 22 78 C22 68 40 54 34 42 C28 30 28 15 35 15 Z'
    },
    {
      id: 'rectangle',
      name: 'Rectangle / Athletic',
      desc: 'Bust and hips are balanced with a straight, uniform waist line.',
      svgPath: 'M35 15 C44 15 44 32 44 46 C44 60 44 74 42 85 C35 85 35 85 28 85 C26 74 26 60 26 46 C26 32 26 15 35 15 Z'
    },
    {
      id: 'inverted-triangle',
      name: 'Inverted Triangle',
      desc: 'Broad shoulders and bust with narrower hips and waist.',
      svgPath: 'M35 15 C48 15 50 28 42 42 C36 52 35 68 35 85 C35 85 35 85 35 85 C35 68 34 52 28 42 C20 28 22 15 35 15 Z'
    },
    {
      id: 'apple',
      name: 'Apple / Round',
      desc: 'Fuller bust and midsection, balanced shoulders and slender legs.',
      svgPath: 'M35 15 C45 15 48 26 46 42 C44 56 46 72 38 85 C35 85 35 85 32 85 C24 72 26 56 24 42 C22 26 25 15 35 15 Z'
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
          maxWidth: '800px',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
            Style Customization
          </span>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', fontWeight: 600, marginTop: '4px' }} className="text-gradient-rose">
            What is your body silhouette?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '500px', margin: '6px auto 0' }}>
            We match your dress line, necklines, and fashion suggestions specifically to complement your body architecture.
          </p>
        </div>

        {/* Selection Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '16px',
            width: '100%',
          }}
        >
          {shapes.map((shape) => {
            const isSelected = selected === shape.id;
            return (
              <button
                key={shape.id}
                type="button"
                onClick={() => setSelected(shape.id)}
                style={{
                  background: isSelected ? 'rgba(253, 164, 175, 0.04)' : 'rgba(255, 255, 255, 0.01)',
                  border: isSelected ? '1px solid var(--accent-pink)' : '1px solid var(--border-glass)',
                  boxShadow: isSelected ? 'var(--shadow-pink)' : 'none',
                  borderRadius: '12px',
                  padding: '20px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
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
                {/* Silhouette SVG */}
                <div
                  style={{
                    width: '70px',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.04)',
                    padding: '8px',
                  }}
                >
                  <svg width="60" height="90" viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d={shape.svgPath}
                      stroke={isSelected ? 'var(--accent-pink)' : 'var(--text-secondary)'}
                      strokeWidth="1.8"
                      fill={isSelected ? 'rgba(253,164,175,0.15)' : 'none'}
                      style={{ transition: 'all 0.3s' }}
                    />
                  </svg>
                </div>

                <div>
                  <strong style={{ fontSize: '0.9rem', color: isSelected ? 'var(--accent-pink)' : 'var(--text-primary)' }}>
                    {shape.name}
                  </strong>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.3' }}>
                    {shape.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Submit */}
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '280px', marginTop: '10px' }}>
          <button
            type="submit"
            className="btn-primary"
            disabled={!selected}
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
            Confirm Silhouette <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
