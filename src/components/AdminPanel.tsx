import React, { useState } from 'react';
import { Settings, X, RefreshCw, CheckCircle2, Upload } from 'lucide-react';

interface AdminPanelProps {
  esewaNumber: string;
  khaltiNumber: string;
  esewaQrUrl: string;
  khaltiQrUrl: string;
  priceNpr: number;
  priceUsd: number;
  bypassPayment: boolean;
  adsensePubId: string;
  onUpdateSettings: (settings: {
    esewaNumber: string;
    khaltiNumber: string;
    esewaQrUrl: string;
    khaltiQrUrl: string;
    priceNpr: number;
    priceUsd: number;
    bypassPayment: boolean;
    adsensePubId: string;
  }) => void;
  onResetApp: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  esewaNumber,
  khaltiNumber,
  esewaQrUrl,
  khaltiQrUrl,
  priceNpr,
  priceUsd,
  bypassPayment,
  adsensePubId,
  onUpdateSettings,
  onResetApp,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localEsewa, setLocalEsewa] = useState(esewaNumber);
  const [localKhalti, setLocalKhalti] = useState(khaltiNumber);
  const [localEsewaQr, setLocalEsewaQr] = useState(esewaQrUrl);
  const [localKhaltiQr, setLocalKhaltiQr] = useState(khaltiQrUrl);
  const [localPriceNpr, setLocalPriceNpr] = useState(priceNpr);
  const [localPriceUsd, setLocalPriceUsd] = useState(priceUsd);
  const [localBypass, setLocalBypass] = useState(bypassPayment);
  const [localAdsense, setLocalAdsense] = useState(adsensePubId);
  
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      esewaNumber: localEsewa,
      khaltiNumber: localKhalti,
      esewaQrUrl: localEsewaQr,
      khaltiQrUrl: localKhaltiQr,
      priceNpr: Number(localPriceNpr) || 99,
      priceUsd: Number(localPriceUsd) || 0.99,
      bypassPayment: localBypass,
      adsensePubId: localAdsense,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleQrUpload = (type: 'esewa' | 'khalti', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (type === 'esewa') {
          setLocalEsewaQr(base64);
        } else {
          setLocalKhaltiQr(base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearQr = (type: 'esewa' | 'khalti') => {
    if (type === 'esewa') {
      setLocalEsewaQr('');
    } else {
      setLocalKhaltiQr('');
    }
  };

  return (
    <>
      {/* Floating Gear Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(20, 16, 30, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-gold)',
          boxShadow: 'var(--shadow-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9999,
          color: 'var(--primary-gold)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(45deg) scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}
      >
        <Settings size={22} />
      </button>

      {/* Admin Panel Drawer */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            maxWidth: '420px',
            background: 'rgba(10, 8, 16, 0.96)',
            backdropFilter: 'blur(20px)',
            borderLeft: '1px solid var(--border-glass)',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '24px',
              borderBottom: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={18} color="var(--primary-gold)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, fontFamily: 'var(--font-serif)' }}>
                Console Developer Settings
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Scroll Area */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <form onSubmit={handleSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {saved && (
                <div
                  style={{
                    background: 'rgba(74,222,128,0.1)',
                    border: '1px solid rgba(74,222,128,0.2)',
                    color: '#4ade80',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <CheckCircle2 size={16} /> Configurations saved successfully!
                </div>
              )}

              {/* Supporter tip configuration */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Voluntary Supporter Tips
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>NPR Price (Nepal)</label>
                    <input
                      type="number"
                      value={localPriceNpr}
                      onChange={(e) => setLocalPriceNpr(Number(e.target.value))}
                      className="glow-input"
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>USD Price (Global)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={localPriceUsd}
                      onChange={(e) => setLocalPriceUsd(Number(e.target.value))}
                      className="glow-input"
                    />
                  </div>
                </div>
              </div>

              {/* Google AdSense Configuration */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Google AdSense Monetization
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Publisher ID (Optional)</label>
                  <input
                    type="text"
                    value={localAdsense}
                    onChange={(e) => setLocalAdsense(e.target.value)}
                    className="glow-input"
                    placeholder="e.g. ca-pub-xxxxxxxxxxxxxxxxx"
                  />
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '1.3' }}>
                    Leave blank to run pre-styled visual beauty ads (Daraz, Sephora). Paste your real client ID to serve live script units once online.
                  </span>
                </div>
              </div>

              {/* eSewa Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: '#41a124', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>eSewa integration</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>eSewa Receiver Phone/ID</label>
                  <input
                    type="text"
                    value={localEsewa}
                    onChange={(e) => setLocalEsewa(e.target.value)}
                    className="glow-input"
                    placeholder="e.g. 9841234567"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>eSewa QR Code Image</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label
                      className="btn-secondary"
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        fontSize: '0.8rem',
                        padding: '10px',
                        cursor: 'pointer',
                      }}
                    >
                      <Upload size={14} /> Upload QR Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleQrUpload('esewa', e)}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {localEsewaQr && (
                      <button
                        type="button"
                        onClick={() => handleClearQr('esewa')}
                        className="btn-secondary"
                        style={{ padding: '10px', color: '#f43f5e', borderColor: 'rgba(244,63,94,0.2)' }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {localEsewaQr && (
                    <img src={localEsewaQr} alt="eSewa QR preview" style={{ width: '80px', height: '80px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', objectFit: 'contain', background: '#fff', marginTop: '6px' }} />
                  )}
                </div>
              </div>

              {/* Khalti Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: '#5c2d91', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Khalti integration</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Khalti Receiver Phone/ID</label>
                  <input
                    type="text"
                    value={localKhalti}
                    onChange={(e) => setLocalKhalti(e.target.value)}
                    className="glow-input"
                    placeholder="e.g. 9801234567"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Khalti QR Code Image</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label
                      className="btn-secondary"
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        fontSize: '0.8rem',
                        padding: '10px',
                        cursor: 'pointer',
                      }}
                    >
                      <Upload size={14} /> Upload QR Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleQrUpload('khalti', e)}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {localKhaltiQr && (
                      <button
                        type="button"
                        onClick={() => handleClearQr('khalti')}
                        className="btn-secondary"
                        style={{ padding: '10px', color: '#f43f5e', borderColor: 'rgba(244,63,94,0.2)' }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {localKhaltiQr && (
                    <img src={localKhaltiQr} alt="Khalti QR preview" style={{ width: '80px', height: '80px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', objectFit: 'contain', background: '#fff', marginTop: '6px' }} />
                  )}
                </div>
              </div>

              {/* Developer testing triggers */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-pink)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Testing controls</span>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={localBypass}
                    onChange={(e) => setLocalBypass(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--accent-pink)' }}
                  />
                  <span>Bypass Payments (Auto-unlock recommendations)</span>
                </label>
              </div>

              {/* Form buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>
                  Save config
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '12px' }}
                >
                  Close
                </button>
              </div>
            </form>

            {/* Reset App State */}
            <div
              style={{
                padding: '24px',
                borderTop: '1px solid var(--border-glass)',
                background: 'rgba(244, 63, 94, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '0.78rem', color: '#f43f5e', fontWeight: 600 }}>Danger zone</span>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset app? This will clear all onboarding inputs, analysis data, and start the splash loader sequence again.')) {
                    onResetApp();
                    setIsOpen(false);
                  }
                }}
                className="btn-secondary"
                style={{
                  width: '100%',
                  borderColor: 'rgba(244, 63, 94, 0.3)',
                  color: '#fda4af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                }}
              >
                <RefreshCw size={14} /> Factory Reset App Data
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
