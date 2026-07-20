import { useState, useEffect } from 'react';
import { SplashLoader } from './components/SplashLoader';
import { NameSetup } from './components/NameSetup';
import { BodyTypeSetup } from './components/BodyTypeSetup';
import { SkinConcernSetup } from './components/SkinConcernSetup';
import { FaceUpload } from './components/FaceUpload';
import { ScorecardDashboard } from './components/ScorecardDashboard';
import { Recommendations } from './components/Recommendations';
import { PaymentModal } from './components/PaymentModal';
import { AdminPanel } from './components/AdminPanel';
import { RefreshCw, Sparkles } from 'lucide-react';

interface Analysis {
  overallScore: number;
  symmetry: number;
  skinTone: string;
  faceShape: string;
  eyeShape: string;
  lipsRatio: string;
  noseAlignment: string;
}

function App() {
  // Onboarding & Scan States (No login required)
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState<string | null>(null);
  const [bodyType, setBodyType] = useState<string | null>(null);
  const [skinType, setSkinType] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  
  // Tabs & Tip Modal
  const [activeTab, setActiveTab] = useState<'scorecard' | 'recommendations'>('scorecard');
  const [showPayment, setShowPayment] = useState(false);
  const [hasPaid, setHasPaid] = useState(false); // Used for voluntary donations

  // Admin Configurations (Persisted in LocalStorage)
  const [esewaNumber, setEsewaNumber] = useState('9841234567');
  const [khaltiNumber, setKhaltiNumber] = useState('9801234567');
  const [esewaQrUrl, setEsewaQrUrl] = useState('');
  const [khaltiQrUrl, setKhaltiQrUrl] = useState('/khalti_qr.png');
  const [priceNpr, setPriceNpr] = useState(99); // Voluntary Tip NPR 99
  const [priceUsd, setPriceUsd] = useState(0.99); // Voluntary Tip USD 0.99
  const [bypassPayment, setBypassPayment] = useState(false);
  const [adsensePubId, setAdsensePubId] = useState('');

  // Load States from LocalStorage
  useEffect(() => {
    // 1. Nickname load
    const savedName = localStorage.getItem('glowai_nickname');
    if (savedName) {
      setNickname(savedName);
    }

    // 2. Body Type load
    const savedBody = localStorage.getItem('glowai_bodytype');
    if (savedBody) {
      setBodyType(savedBody);
    }

    // 3. Skin Type load
    const savedSkin = localStorage.getItem('glowai_skintype');
    if (savedSkin) {
      setSkinType(savedSkin);
    }

    // 4. Scan Photo & Analysis load
    const savedPhoto = localStorage.getItem('glowai_photo');
    const savedAnalysis = localStorage.getItem('glowai_analysis');
    if (savedPhoto && savedAnalysis) {
      setPhoto(savedPhoto);
      setAnalysis(JSON.parse(savedAnalysis));
    }

    // 5. Supporter paid status
    const paidStatus = localStorage.getItem('glowai_has_paid');
    if (paidStatus === 'true') {
      setHasPaid(true);
    }

    // 6. Admin Settings load
    const savedAdmin = localStorage.getItem('glowai_admin_settings');
    if (savedAdmin) {
      const parsed = JSON.parse(savedAdmin);
      setEsewaNumber(parsed.esewaNumber || '9841234567');
      setKhaltiNumber(parsed.khaltiNumber || '9801234567');
      setEsewaQrUrl(parsed.esewaQrUrl || '');
      setKhaltiQrUrl(parsed.khaltiQrUrl || '/khalti_qr.png');
      setPriceNpr(parsed.priceNpr || 99);
      setPriceUsd(parsed.priceUsd || 0.99);
      setBypassPayment(parsed.bypassPayment || false);
      setAdsensePubId(parsed.adsensePubId || '');
    }
  }, []);

  // Update Settings handler
  const handleUpdateAdminSettings = (settings: {
    esewaNumber: string;
    khaltiNumber: string;
    esewaQrUrl: string;
    khaltiQrUrl: string;
    priceNpr: number;
    priceUsd: number;
    bypassPayment: boolean;
    adsensePubId: string;
  }) => {
    setEsewaNumber(settings.esewaNumber);
    setKhaltiNumber(settings.khaltiNumber);
    setEsewaQrUrl(settings.esewaQrUrl);
    setKhaltiQrUrl(settings.khaltiQrUrl);
    setPriceNpr(settings.priceNpr);
    setPriceUsd(settings.priceUsd);
    setBypassPayment(settings.bypassPayment);
    setAdsensePubId(settings.adsensePubId);

    localStorage.setItem('glowai_admin_settings', JSON.stringify(settings));
  };

  // Reset application reports (logs out and clears profile onboarding)
  const handleResetApp = () => {
    localStorage.removeItem('glowai_nickname');
    localStorage.removeItem('glowai_bodytype');
    localStorage.removeItem('glowai_skintype');
    localStorage.removeItem('glowai_photo');
    localStorage.removeItem('glowai_analysis');
    localStorage.removeItem('glowai_has_paid');
    
    // Clear React states
    setNickname(null);
    setBodyType(null);
    setSkinType(null);
    setPhoto(null);
    setAnalysis(null);
    setHasPaid(false);
    setActiveTab('scorecard');
    setShowPayment(false);
    setLoading(true);
  };

  const handleNicknameSetup = (name: string) => {
    setNickname(name);
    localStorage.setItem('glowai_nickname', name);
  };

  const handleBodyTypeSetup = (type: string) => {
    setBodyType(type);
    localStorage.setItem('glowai_bodytype', type);
  };

  const handleSkinTypeSetup = (type: string) => {
    setSkinType(type);
    localStorage.setItem('glowai_skintype', type);
  };

  const handleScanComplete = (photoData: string, scanAnalysis: Analysis) => {
    setPhoto(photoData);
    setAnalysis(scanAnalysis);
    localStorage.setItem('glowai_photo', photoData);
    localStorage.setItem('glowai_analysis', JSON.stringify(scanAnalysis));
    setActiveTab('scorecard');
  };

  const handlePaymentSuccess = () => {
    setHasPaid(true);
    localStorage.setItem('glowai_has_paid', 'true');
    setShowPayment(false);
  };

  const handleRestartScan = () => {
    localStorage.removeItem('glowai_photo');
    localStorage.removeItem('glowai_analysis');
    setPhoto(null);
    setAnalysis(null);
    setActiveTab('scorecard');
  };

  // 1. Splash Loader
  if (loading) {
    return <SplashLoader onComplete={() => setLoading(false)} />;
  }

  // 2. Name Setup Screen
  if (!nickname) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NameSetup onComplete={handleNicknameSetup} />
        <AdminPanel
          esewaNumber={esewaNumber}
          khaltiNumber={khaltiNumber}
          esewaQrUrl={esewaQrUrl}
          khaltiQrUrl={khaltiQrUrl}
          priceNpr={priceNpr}
          priceUsd={priceUsd}
          bypassPayment={bypassPayment}
          adsensePubId={adsensePubId}
          onUpdateSettings={handleUpdateAdminSettings}
          onResetApp={handleResetApp}
        />
      </div>
    );
  }

  // 3. Body Type Setup Screen
  if (!bodyType) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <BodyTypeSetup onComplete={handleBodyTypeSetup} />
        <AdminPanel
          esewaNumber={esewaNumber}
          khaltiNumber={khaltiNumber}
          esewaQrUrl={esewaQrUrl}
          khaltiQrUrl={khaltiQrUrl}
          priceNpr={priceNpr}
          priceUsd={priceUsd}
          bypassPayment={bypassPayment}
          adsensePubId={adsensePubId}
          onUpdateSettings={handleUpdateAdminSettings}
          onResetApp={handleResetApp}
        />
      </div>
    );
  }

  // 4. Skin Type Setup Screen
  if (!skinType) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <SkinConcernSetup onComplete={handleSkinTypeSetup} />
        <AdminPanel
          esewaNumber={esewaNumber}
          khaltiNumber={khaltiNumber}
          esewaQrUrl={esewaQrUrl}
          khaltiQrUrl={khaltiQrUrl}
          priceNpr={priceNpr}
          priceUsd={priceUsd}
          bypassPayment={bypassPayment}
          adsensePubId={adsensePubId}
          onUpdateSettings={handleUpdateAdminSettings}
          onResetApp={handleResetApp}
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* GLOW NAVBAR HEADER */}
      <header
        style={{
          background: 'rgba(9, 7, 15, 0.85)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--border-glass)',
          position: 'sticky',
          top: 0,
          zIndex: 99,
          padding: '16px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M50 15C53.3333 30 65 38.3333 80 40C65 43.3333 58.3333 55 50 85C41.6667 55 35 43.3333 20 40C35 38.3333 46.6667 30 50 15Z"
                fill="url(#nav-logo-grad)"
              />
              <defs>
                <linearGradient id="nav-logo-grad" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fda4af" />
                  <stop offset="100%" stopColor="#ca8a04" />
                </linearGradient>
              </defs>
            </svg>
            <h1
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '3px',
                fontFamily: 'var(--font-serif)',
              }}
              className="text-gradient-rose"
            >
              GLOWAI
            </h1>
          </div>

          {/* User Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--rose-gold-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  color: '#000',
                  fontSize: '0.8rem',
                }}
              >
                {nickname.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                {nickname}
              </span>
            </div>

            {photo && (
              <button
                onClick={handleRestartScan}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.85rem',
                  padding: '6px 12px',
                  borderRadius: '6px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-pink)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'none';
                }}
              >
                <RefreshCw size={14} /> New Scan
              </button>
            )}

            <button
              onClick={handleResetApp}
              style={{
                background: 'none',
                border: 'none',
                color: '#fda4af',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
              }}
            >
              Reset Report
            </button>
          </div>
        </div>
      </header>

      {/* CORE VIEW ROUTER */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {!photo || !analysis ? (
          /* SCANNER STEP */
          <FaceUpload onScanComplete={handleScanComplete} />
        ) : (
          /* DASHBOARD STEP */
          <ScorecardDashboard
            nickname={nickname}
            photoData={photo}
            analysis={analysis}
            hasPaid={hasPaid || bypassPayment}
            onUnlockClick={() => setShowPayment(true)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            adsensePubId={adsensePubId}
          >
            <Recommendations faceShape={analysis.faceShape} skinTone={analysis.skinTone} bodyType={bodyType} skinType={skinType} adsensePubId={adsensePubId} />
          </ScorecardDashboard>
        )}
      </main>

      {/* Footer Branding */}
      <footer
        style={{
          textAlign: 'center',
          padding: '24px 20px',
          borderTop: '1px solid var(--border-glass)',
          background: 'rgba(9, 7, 15, 0.4)',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          marginTop: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
          <Sparkles size={12} color="var(--primary-gold)" /> GlowAI Beauty & Style Intelligence
        </div>
        <span>© {new Date().getFullYear()} GlowAI Platform. All rights reserved.</span>
      </footer>

      {/* VOLUNTARY TIP MODAL */}
      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          onPaymentSuccess={handlePaymentSuccess}
          priceNpr={priceNpr}
          priceUsd={priceUsd}
          esewaNumber={esewaNumber}
          khaltiNumber={khaltiNumber}
          esewaQrUrl={esewaQrUrl}
          khaltiQrUrl={khaltiQrUrl}
        />
      )}

      {/* FLOATING ADMIN/DEV PANEL SETTINGS */}
      <AdminPanel
        esewaNumber={esewaNumber}
        khaltiNumber={khaltiNumber}
        esewaQrUrl={esewaQrUrl}
        khaltiQrUrl={khaltiQrUrl}
        priceNpr={priceNpr}
        priceUsd={priceUsd}
        bypassPayment={bypassPayment}
        adsensePubId={adsensePubId}
        onUpdateSettings={handleUpdateAdminSettings}
        onResetApp={handleResetApp}
      />
    </div>
  );
}

export default App;
