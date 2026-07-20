import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, Check, X } from 'lucide-react';

interface AuthProps {
  onAuthSuccess: (user: { email: string; isGoogle: boolean; name?: string }) => void;
}

export const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Google Sign-in Mock State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Password strength checks (for signup)
  const [strengthScore, setStrengthScore] = useState(0);
  const [checks, setChecks] = useState({
    length: false,
    number: false,
    special: false,
    case: false
  });

  useEffect(() => {
    if (isLogin) return;
    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasCase = /[a-z]/.test(password) && /[A-Z]/.test(password);

    setChecks({
      length: hasLength,
      number: hasNumber,
      special: hasSpecial,
      case: hasCase
    });

    let score = 0;
    if (hasLength) score += 25;
    if (hasNumber) score += 25;
    if (hasSpecial) score += 25;
    if (hasCase) score += 25;
    setStrengthScore(score);
  }, [password, isLogin]);

  const handleGeneratePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let generated = '';
    // Ensure we satisfy all checks
    generated += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
    generated += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
    generated += '0123456789'[Math.floor(Math.random() * 10)];
    generated += '!@#$%^&*()'[Math.floor(Math.random() * 10)];
    
    for (let i = 0; i < 8; i++) {
      generated += chars[Math.floor(Math.random() * chars.length)];
    }
    // Shuffle
    generated = generated.split('').sort(() => 0.5 - Math.random()).join('');
    setPassword(generated);
    setShowPassword(true);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!isLogin && strengthScore < 75) {
      setError('Please use a stronger password that meets requirements.');
      return;
    }

    // Success simulation
    onAuthSuccess({ email, isGoogle: false });
  };

  const handleGoogleLogin = (googleName: string, googleEmail: string) => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      setShowGoogleModal(false);
      onAuthSuccess({ 
        email: googleEmail, 
        isGoogle: true, 
        name: googleName 
      });
    }, 1500);
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
          maxWidth: '440px',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <h2
            style={{ fontSize: '2rem', fontWeight: 600, fontFamily: 'var(--font-serif)', marginBottom: '8px' }}
            className="text-gradient-rose"
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {isLogin ? 'Enter your credentials to access GlowAI' : 'Sign up to explore personalized beauty intelligence'}
          </p>
        </div>

        {/* Tab Selection */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '4px',
            borderRadius: '10px',
            border: '1px solid var(--border-glass)',
          }}
        >
          <button
            onClick={() => { setIsLogin(true); setError(''); }}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              background: isLogin ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              color: isLogin ? '#fff' : 'var(--text-secondary)',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            Log In
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(''); }}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              background: !isLogin ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              color: !isLogin ? '#fff' : 'var(--text-secondary)',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && (
            <div
              style={{
                background: 'rgba(244, 63, 94, 0.1)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                borderRadius: '8px',
                padding: '12px',
                color: '#fda4af',
                fontSize: '0.85rem',
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}

          {/* Email field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glow-input"
                style={{ paddingLeft: '44px' }}
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Password</label>
              {!isLogin && (
                <button
                  type="button"
                  onClick={handleGeneratePassword}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-pink)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontWeight: 500,
                  }}
                >
                  <Sparkles size={12} /> Suggest Strong
                </button>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glow-input"
                style={{ paddingLeft: '44px', paddingRight: '44px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Password Strength Checklist (Signup Only) */}
          {!isLogin && password.length > 0 && (
            <div
              className="glass-panel-light"
              style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Strength Meter Bar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Password Strength:</span>
                  <span
                    style={{
                      fontWeight: 600,
                      color:
                        strengthScore <= 25
                          ? '#f43f5e'
                          : strengthScore <= 50
                          ? '#fb923c'
                          : strengthScore <= 75
                          ? '#facc15'
                          : '#4ade80',
                    }}
                  >
                    {strengthScore <= 25
                      ? 'Weak'
                      : strengthScore <= 50
                      ? 'Fair'
                      : strengthScore <= 75
                      ? 'Good'
                      : 'Excellent'}
                  </span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${strengthScore}%`,
                      borderRadius: '2px',
                      background:
                        strengthScore <= 25
                          ? '#f43f5e'
                          : strengthScore <= 50
                          ? '#fb923c'
                          : strengthScore <= 75
                          ? '#facc15'
                          : '#4ade80',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>
              </div>

              {/* Requirement Checkmarks */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: checks.length ? '#4ade80' : 'var(--text-muted)' }}>
                  {checks.length ? <Check size={12} /> : <X size={12} />} Min 8 characters
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: checks.number ? '#4ade80' : 'var(--text-muted)' }}>
                  {checks.number ? <Check size={12} /> : <X size={12} />} Contains digit
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: checks.special ? '#4ade80' : 'var(--text-muted)' }}>
                  {checks.special ? <Check size={12} /> : <X size={12} />} Special symbol
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: checks.case ? '#4ade80' : 'var(--text-muted)' }}>
                  {checks.case ? <Check size={12} /> : <X size={12} />} Upper & Lowercase
                </div>
              </div>
            </div>
          )}

          {/* Action button */}
          <button type="submit" className="btn-primary" style={{ padding: '14px', fontSize: '0.95rem' }}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-glass)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-glass)' }} />
        </div>

        {/* Social Button */}
        <button
          onClick={() => setShowGoogleModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-glass)',
            borderRadius: '8px',
            padding: '12px',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            e.currentTarget.style.borderColor = 'var(--border-glass)';
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google Account
        </button>
      </div>

      {/* Simulated Google Authentication Modal Popup */}
      {showGoogleModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '380px',
              padding: '28px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: '#0d0a16',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Sign in with Google</span>
              </div>
              <button
                onClick={() => setShowGoogleModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0' }}>
              Select an account to sign in to <strong style={{ color: 'var(--accent-pink)' }}>GlowAI</strong>
            </p>

            {isGoogleLoading ? (
              <div
                style={{
                  height: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '3px solid rgba(253, 164, 175, 0.1)',
                    borderTopColor: 'var(--accent-pink)',
                    borderRadius: '50%',
                    animation: 'scan-laser 1s infinite linear',
                  }}
                />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Connecting securely...</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Account 1 */}
                <button
                  onClick={() => handleGoogleLogin('Aayush Shrestha', 'aayush.shrestha@gmail.com')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.borderColor = 'var(--border-glass)';
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                    }}
                  >
                    AS
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Aayush Shrestha</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>aayush.shrestha@gmail.com</div>
                  </div>
                </button>

                {/* Account 2 */}
                <button
                  onClick={() => handleGoogleLogin('Priyanka Ghimire', 'priyanka.ghimire@outlook.com')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.borderColor = 'var(--border-glass)';
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                    }}
                  >
                    PG
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Priyanka Ghimire</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>priyanka.ghimire@outlook.com</div>
                  </div>
                </button>

                {/* Add account option */}
                <button
                  onClick={() => handleGoogleLogin('Guest User', 'guest.glowai@gmail.com')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  Use another mock account
                </button>
              </div>
            )}
            
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              To continue, Google will share your name, email address, and profile picture with GlowAI.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
