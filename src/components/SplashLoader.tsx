import React, { useEffect, useState } from 'react';

interface SplashLoaderProps {
  onComplete: () => void;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const loadingTexts = [
    'Initializing GlowAI Vision Engine...',
    'Calibrating lighting & contrast ratios...',
    'Loading facial symmetry intelligence...',
    'Perfecting your custom style recommendations...'
  ];

  useEffect(() => {
    // Cycle text messages every 800ms
    const textInterval = setInterval(() => {
      setStep((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
    }, 800);

    // Fade out start at 3.2 seconds, complete at 3.6 seconds
    const fadeTimeout = setTimeout(() => {
      setIsFading(true);
    }, 3200);

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 3600);

    return () => {
      clearInterval(textInterval);
      clearTimeout(fadeTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(circle at center, #1b122c 0%, #06040a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'opacity 0.4s ease-out',
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? 'none' : 'all',
      }}
    >
      {/* Floating Glowing Aura Behind Logo */}
      <div
        style={{
          position: 'absolute',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(253, 164, 175, 0.12) 0%, rgba(229, 193, 88, 0.04) 50%, transparent 70%)',
          animation: 'pulse-glow 3s infinite ease-in-out',
          zIndex: 1,
        }}
      />

      {/* Styled GlowAI Logo */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'float 4s infinite ease-in-out',
          zIndex: 2,
        }}
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: 'drop-shadow(0 0 15px rgba(253, 164, 175, 0.6))',
            marginBottom: '20px'
          }}
        >
          {/* Logo Icon: Stylized Glowing Lotus / Face shape */}
          <path
            d="M50 15C53.3333 30 65 38.3333 80 40C65 43.3333 58.3333 55 50 85C41.6667 55 35 43.3333 20 40C35 38.3333 46.6667 30 50 15Z"
            fill="url(#logo-grad)"
          />
          <path
            d="M50 28C51.6667 37 58.3333 42 68 43C58.3333 45 55 52 50 70C45 52 41.6667 45 32 43C41.6667 42 48.3333 37 50 28Z"
            fill="url(#logo-grad-inner)"
            opacity="0.8"
          />
          <defs>
            <linearGradient id="logo-grad" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="50%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <linearGradient id="logo-grad-inner" x1="32" y1="28" x2="68" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#fda4af" />
            </linearGradient>
          </defs>
        </svg>

        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '8px',
            margin: '0 0 8px 8px',
            fontFamily: 'var(--font-serif)',
          }}
          className="text-gradient-rose"
        >
          GLOWAI
        </h1>
        <p
          style={{
            fontSize: '0.85rem',
            letterSpacing: '4px',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Beauty Intelligence
        </p>
      </div>

      {/* Loading Steps & Bar */}
      <div
        style={{
          marginTop: '60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          width: '280px',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            minHeight: '20px',
            transition: 'all 0.3s ease',
          }}
        >
          {loadingTexts[step]}
        </span>
        
        {/* Progress Bar Container */}
        <div
          style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${((step + 1) / loadingTexts.length) * 100}%`,
              background: 'var(--rose-gold-gradient)',
              boxShadow: '0 0 10px rgba(253, 164, 175, 0.8)',
              transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
