import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, ExternalLink, Play, Award } from 'lucide-react';

interface PaymentModalProps {
  onClose: () => void;
  onPaymentSuccess: () => void;
  priceNpr: number;
  priceUsd: number;
  esewaNumber: string;
  khaltiNumber: string;
  esewaQrUrl: string;
  khaltiQrUrl: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  onClose,
  onPaymentSuccess,
  priceNpr,
  priceUsd,
  esewaNumber,
  khaltiNumber,
  esewaQrUrl,
  khaltiQrUrl,
}) => {
  // Support options: 'select' (choice grid), 'ad' (watching ad), 'gateway' (checkout form)
  const [stage, setStage] = useState<'select' | 'ad' | 'gateway'>('select');
  const [selectedPriceNpr, setSelectedPriceNpr] = useState(priceNpr);
  const [selectedPriceUsd, setSelectedPriceUsd] = useState(priceUsd);

  // Simulated ad watch states
  const [adTimer, setAdTimer] = useState(10);
  const [adFinished, setAdFinished] = useState(false);

  // Gateway method
  const [activeMethod, setActiveMethod] = useState<'esewa' | 'khalti' | 'card'>('esewa');
  const [payViaPortal, setPayViaPortal] = useState(false);
  const [portalStep, setPortalStep] = useState<'login' | 'otp' | 'processing'>('login');
  const [portalUsername, setPortalUsername] = useState('');
  const [portalPassword, setPortalPassword] = useState('');
  const [portalOtp, setPortalOtp] = useState('');
  const [transactionId, setTransactionId] = useState('');

  // Card States
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  // Ad player timer countdown
  useEffect(() => {
    if (stage !== 'ad' || adTimer <= 0) {
      if (adTimer === 0) setAdFinished(true);
      return;
    }
    const thread = setTimeout(() => {
      setAdTimer((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(thread);
  }, [stage, adTimer]);

  const handleChooseAd = () => {
    setAdTimer(10);
    setAdFinished(false);
    setStage('ad');
  };

  const handleChooseCoffee = () => {
    setSelectedPriceNpr(99);
    setSelectedPriceUsd(0.99);
    setStage('gateway');
  };

  const handleChooseVip = () => {
    setSelectedPriceNpr(499);
    setSelectedPriceUsd(4.99);
    setStage('gateway');
  };

  const handleAdFinishConfirm = () => {
    onPaymentSuccess();
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (activeMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
        setError('Please fill in all credit card details.');
        return;
      }
    } else {
      if (!transactionId.trim()) {
        setError('Please enter the Transaction ID / Ref ID to verify.');
        return;
      }
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onPaymentSuccess();
    }, 2000);
  };

  const handlePortalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (portalStep === 'login') {
      if (!portalUsername || !portalPassword) {
        setError('Please fill in your payment credentials.');
        return;
      }
      setPortalStep('otp');
    } else if (portalStep === 'otp') {
      if (!portalOtp) {
        setError('Please enter the One-Time Verification code.');
        return;
      }
      setPortalStep('processing');
      setTimeout(() => {
        onPaymentSuccess();
      }, 2500);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(5, 3, 10, 0.9)',
        backdropFilter: 'blur(12px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '32px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close Button */}
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

        {/* STAGE 1: CHOICE SELECTION */}
        {stage === 'select' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
                Support GlowAI
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', fontWeight: 600, marginTop: '4px' }} className="text-gradient-rose">
                Support the Developers 💖
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Choose how you want to support us. All options unlock the voluntary supporter status!
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
              {/* Option A: Watch Ad */}
              <button
                onClick={handleChooseAd}
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)';
                  e.currentTarget.style.background = 'rgba(56,189,248,0.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-glass)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                }}
              >
                <div style={{ fontSize: '2.2rem', width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(56,189,248,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  📺
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '0.95rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Watch a Video Ad <span style={{ fontSize: '0.65rem', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px' }}>FREE</span>
                  </strong>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>
                    Support us for free! Watch a short 10-second beauty ad to generate server fund revenue.
                  </p>
                </div>
              </button>

              {/* Option B: Coffee */}
              <button
                onClick={handleChooseCoffee}
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(229,193,88,0.4)';
                  e.currentTarget.style.background = 'rgba(229,193,88,0.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-glass)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                }}
              >
                <div style={{ fontSize: '2.2rem', width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(229,193,88,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ☕
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--primary-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Buy Us a Coffee <span style={{ fontSize: '0.65rem', background: 'rgba(229,193,88,0.15)', color: 'var(--primary-gold)', padding: '2px 8px', borderRadius: '4px' }}>NPR 99</span>
                  </strong>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>
                    Voluntary donation to buy our developer team a warm cup of coffee and support the platform.
                  </p>
                </div>
              </button>

              {/* Option C: VIP Sponsor */}
              <button
                onClick={handleChooseVip}
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(253,164,175,0.4)';
                  e.currentTarget.style.background = 'rgba(253,164,175,0.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-glass)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                }}
              >
                <div style={{ fontSize: '2.2rem', width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(253,164,175,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  👑
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Become a VIP Sponsor <span style={{ fontSize: '0.65rem', background: 'rgba(253,164,175,0.15)', color: 'var(--accent-pink)', padding: '2px 8px', borderRadius: '4px' }}>NPR 499</span>
                  </strong>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>
                    Premium support! Unlocks an elegant gold highlight badge on your profile scorecard report.
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: MOCK AD PLAYER */}
        {stage === 'ad' && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {!adFinished ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px 0' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(56,189,248,0.1)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                  <Play size={20} className="animate-pulse" />
                </div>
                
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Serving Sponsored Ad Video</h4>
                
                {/* Simulated ad visual */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    borderRadius: '12px',
                    background: '#000',
                    border: '1px solid var(--border-glass)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="/makeup_latte.png"
                    alt="Sponsored Makeup Ad"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                  />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <span style={{ fontSize: '0.65rem', background: 'rgba(0,0,0,0.7)', color: 'var(--primary-gold)', padding: '4px 10px', borderRadius: '4px', fontWeight: 600 }}>
                      DARAZ BEAUTY EXCLUSIVE
                    </span>
                    <strong style={{ fontSize: '1rem', color: '#fff', marginTop: '6px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Latte Cosmetics & Gloss Kits</strong>
                    <span style={{ fontSize: '0.7rem', color: '#ccc', marginTop: '2px' }}>Use promo code GLOWAI for 15% off</span>
                  </div>
                  
                  {/* Countdown overlay */}
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem' }}>
                    Ad ends in: {adTimer}s
                  </div>
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  This ad helps us cover API hosting expenses. Thank you for your patience! 🌸
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', padding: '20px 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(74, 222, 128, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                  📺
                </div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#4ade80' }}>Ad Watched Successfully!</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '320px', margin: '4px auto 0' }}>
                    Thank you! You just generated NPR 10 in ad support for GlowAI. Your voluntary supporter status has been activated!
                  </p>
                </div>
                
                <button
                  onClick={handleAdFinishConfirm}
                  className="btn-primary"
                  style={{ width: '100%', maxWidth: '240px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  Confirm Support <Award size={14} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* STAGE 3: GATEWAY CHECKOUT SCREEN */}
        {stage === 'gateway' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                Secure Payment
              </span>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 600, fontFamily: 'var(--font-serif)' }}>
                Donate NPR {selectedPriceNpr} 🌸
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Your contributions keep the symmetry model free for all creators.
              </p>
            </div>

            {/* Methods Tab */}
            {!payViaPortal && (
              <div
                style={{
                  display: 'flex',
                  border: '1px solid var(--border-glass)',
                  background: 'rgba(255,255,255,0.01)',
                  padding: '3px',
                  borderRadius: '10px',
                  gap: '4px',
                }}
              >
                {['esewa', 'khalti', 'card'].map((method) => {
                  const isActive = activeMethod === method;
                  return (
                    <button
                      key={method}
                      onClick={() => {
                        setActiveMethod(method as any);
                        setError('');
                      }}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        background: isActive ? 'var(--rose-gold-gradient)' : 'transparent',
                        color: isActive ? '#000' : 'var(--text-secondary)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {method}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Main Form content */}
            {!payViaPortal ? (
              <form onSubmit={handleVerifyPayment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {error && (
                  <div style={{ color: '#fda4af', background: 'rgba(244,63,94,0.1)', padding: '10px', borderRadius: '6px', fontSize: '0.78rem' }}>
                    {error}
                  </div>
                )}

                {activeMethod === 'esewa' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ background: 'rgba(65, 161, 36, 0.05)', border: '1px solid rgba(65, 161, 36, 0.2)', padding: '12px 16px', borderRadius: '10px', fontSize: '0.82rem', color: '#86efac', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <strong>eSewa Manual Scan Transfer:</strong>
                      <span>Pay to ID: <strong>{esewaNumber}</strong></span>
                    </div>

                    {esewaQrUrl && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Scan QR in eSewa App</span>
                        <img src={esewaQrUrl} alt="eSewa QR" style={{ width: '150px', height: '150px', objectFit: 'contain', background: '#fff', borderRadius: '8px', border: '2px solid #fff' }} />
                      </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Transaction Ref ID *</label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="glow-input"
                        placeholder="Paste ref code from eSewa statement"
                        required
                      />
                    </div>
                  </div>
                )}

                {activeMethod === 'khalti' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ background: 'rgba(92, 45, 145, 0.05)', border: '1px solid rgba(92, 45, 145, 0.2)', padding: '12px 16px', borderRadius: '10px', fontSize: '0.82rem', color: '#c4b5fd', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <strong>Khalti Manual Scan Transfer:</strong>
                      <span>Pay to ID: <strong>{khaltiNumber}</strong></span>
                    </div>

                    {khaltiQrUrl && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Scan QR in Khalti App</span>
                        <img src={khaltiQrUrl} alt="Khalti QR" style={{ width: '150px', height: '150px', objectFit: 'contain', background: '#fff', borderRadius: '8px', border: '2px solid #fff' }} />
                      </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Transaction Ref ID *</label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="glow-input"
                        placeholder="Paste ref code from Khalti statement"
                        required
                      />
                    </div>
                  </div>
                )}

                {activeMethod === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Cardholder Name</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="glow-input"
                        placeholder="John Doe"
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="glow-input"
                        placeholder="4111 2222 3333 4444"
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="glow-input"
                          placeholder="12/28"
                        />
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="glow-input"
                          placeholder="***"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  <button type="submit" className="btn-primary" disabled={isVerifying} style={{ width: '100%', padding: '12px' }}>
                    {isVerifying ? 'Verifying payment ref...' : `Verify Support Receipt`}
                  </button>

                  {activeMethod !== 'card' && (
                    <button
                      type="button"
                      onClick={() => {
                        setPayViaPortal(true);
                        setPortalStep('login');
                        setError('');
                      }}
                      className="btn-secondary"
                      style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                      Pay via Secure Gateway Portal <ExternalLink size={14} />
                    </button>
                  )}
                </div>
              </form>
            ) : (
              /* SECURE GUEST PORTAL REDIRECT SIMULATION */
              <div
                style={{
                  background: activeMethod === 'esewa' ? '#41a124' : '#5c2d91',
                  borderRadius: '12px',
                  padding: '24px',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '12px', marginBottom: '16px' }}>
                  <strong style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {activeMethod === 'esewa' ? 'eSewa Secure Checkout' : 'Khalti Payment Checkout'}
                  </strong>
                  <button onClick={() => setPayViaPortal(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.8rem' }}>
                    Back
                  </button>
                </div>

                {portalStep === 'login' && (
                  <form onSubmit={handlePortalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {error && <div style={{ color: '#fda4af', fontSize: '0.78rem', background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '4px' }}>{error}</div>}
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.72rem', color: '#e2e8f0' }}>eSewa / Khalti User ID (Mobile/Email)</label>
                      <input
                        type="text"
                        value={portalUsername}
                        onChange={(e) => setPortalUsername(e.target.value)}
                        placeholder="e.g. 9841000000"
                        style={{ width: '100%', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '10px', color: '#fff', outline: 'none' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.72rem', color: '#e2e8f0' }}>Wallet Password / MPIN</label>
                      <input
                        type="password"
                        value={portalPassword}
                        onChange={(e) => setPortalPassword(e.target.value)}
                        placeholder="••••••"
                        style={{ width: '100%', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '10px', color: '#fff', outline: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '6px' }}>
                      <span>Payable Amount:</span>
                      <strong>NPR {selectedPriceNpr}.00 (${selectedPriceUsd.toFixed(2)})</strong>
                    </div>

                    <button type="submit" style={{ background: '#fff', color: activeMethod === 'esewa' ? '#41a124' : '#5c2d91', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', marginTop: '10px' }}>
                      Log In & Pay Securely
                    </button>
                  </form>
                )}

                {portalStep === 'otp' && (
                  <form onSubmit={handlePortalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {error && <div style={{ color: '#fda4af', fontSize: '0.78rem', background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '4px' }}>{error}</div>}
                    
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '6px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShieldCheck size={16} /> A 6-digit OTP verification code has been sent to your mobile.
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.72rem', color: '#e2e8f0' }}>Enter OTP Code</label>
                      <input
                        type="text"
                        value={portalOtp}
                        onChange={(e) => setPortalOtp(e.target.value)}
                        placeholder="e.g. 123456"
                        maxLength={6}
                        style={{ width: '100%', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '10px', color: '#fff', outline: 'none', letterSpacing: '6px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 700 }}
                      />
                    </div>

                    <button type="submit" style={{ background: '#fff', color: activeMethod === 'esewa' ? '#41a124' : '#5c2d91', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>
                      Verify OTP & Confirm Support
                    </button>
                  </form>
                )}

                {portalStep === 'processing' && (
                  <div style={{ textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    <strong>Authorizing payment on gateway...</strong>
                    <span style={{ fontSize: '0.75rem', color: '#e2e8f0' }}>Please do not close this modal or refresh.</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Back to selector */}
            {!payViaPortal && (
              <button
                onClick={() => setStage('select')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  alignSelf: 'center',
                }}
              >
                Back to Support Options
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
