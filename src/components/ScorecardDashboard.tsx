import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { AdSenseBanner } from './AdSenseBanner';
import { FeedbackModal } from './FeedbackModal';
import { CareersModal } from './CareersModal';

interface ScorecardDashboardProps {
  nickname: string;
  photoData: string;
  analysis: {
    overallScore: number;
    symmetry: number;
    skinTone: string;
    faceShape: string;
    eyeShape: string;
    lipsRatio: string;
    noseAlignment: string;
  };
  hasPaid: boolean; 
  onUnlockClick: () => void; 
  activeTab: 'scorecard' | 'recommendations';
  setActiveTab: (tab: 'scorecard' | 'recommendations') => void;
  adsensePubId: string;
  children?: React.ReactNode;
}

export const ScorecardDashboard: React.FC<ScorecardDashboardProps> = ({
  nickname,
  photoData,
  analysis,
  hasPaid,
  onUnlockClick,
  activeTab,
  setActiveTab,
  adsensePubId,
  children
}) => {
  // Modal toggle states
  const [showFeedback, setShowFeedback] = useState(false);
  const [showCareers, setShowCareers] = useState(false);

  // Dynamically derive detailed scores based on overall scan values
  const eyesScore = ((analysis.overallScore - 1) / 10).toFixed(1);
  const eyebrowsScore = ((analysis.overallScore + 2) / 10).toFixed(1);
  const noseScore = ((analysis.overallScore + 1) / 10).toFixed(1);
  const lipsScore = ((analysis.overallScore - 3) / 10).toFixed(1);

  const intercanthalScore = ((analysis.symmetry + 1) / 10).toFixed(1);
  const nasalWidthScore = ((analysis.symmetry + 2) / 10).toFixed(1);
  const lipAlignScore = ((analysis.symmetry - 1) / 10).toFixed(1);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 16px 80px 16px',
        zIndex: 5,
        position: 'relative',
      }}
    >
      {/* Top Welcome Header */}
      <div
        className="glass-panel"
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          marginBottom: '24px',
          gap: '16px',
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
            Facial Symmetry Report
          </span>
          <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', fontWeight: 600, marginTop: '2px' }}>
            Hey, <span className="text-gradient-rose" style={{ fontWeight: 700 }}>{nickname}</span>! ✨
          </h2>
        </div>

        {/* Tab Selector */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-glass)',
            padding: '3px',
            borderRadius: '10px',
          }}
        >
          <button
            onClick={() => setActiveTab('scorecard')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '0.85rem',
              transition: 'all 0.3s ease',
              background: activeTab === 'scorecard' ? 'var(--rose-gold-gradient)' : 'transparent',
              color: activeTab === 'scorecard' ? '#000' : 'var(--text-secondary)',
            }}
          >
            Symmetry Scorecard
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '0.85rem',
              transition: 'all 0.3s ease',
              background: activeTab === 'recommendations' ? 'var(--rose-gold-gradient)' : 'transparent',
              color: activeTab === 'recommendations' ? '#000' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Style Recommendations
          </button>
        </div>
      </div>

      {/* Google AdSense / Referral Monetized Ad slot 1: Leaderboard */}
      <AdSenseBanner publisherId={adsensePubId} slotId="leaderboard_banner" format="horizontal" />
      <div style={{ height: '20px' }} />

      {activeTab === 'scorecard' ? (
        /* SCORECARD TAB WITH REFERENCE GRID LAYOUT */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Main Grid: Left Portrait + Right SVG Diagrams */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {/* LEFT COLUMN: face photo overlay and proportions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* ANALYSIS PHOTO CARD */}
              <div
                className="glass-panel"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                    🔍 ANALYSIS
                  </span>
                </div>

                {/* Relative container for landmark overlay */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '3/4',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-glass)',
                  }}
                >
                  <img
                    src={photoData}
                    alt="Facial landmark scan"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Symmetry Grid Overlay Lines */}
                  <div style={{ position: 'absolute', top: '10%', bottom: '15%', left: '50%', width: '1px', background: 'rgba(253, 164, 175, 0.45)', borderLeft: '1px dashed var(--accent-pink)' }} />
                  <div style={{ position: 'absolute', top: '35%', left: '15%', right: '15%', height: '1px', background: 'rgba(253, 164, 175, 0.35)' }} />
                  <div style={{ position: 'absolute', top: '45%', left: '15%', right: '15%', height: '1px', background: 'rgba(253, 164, 175, 0.35)' }} />
                  <div style={{ position: 'absolute', top: '60%', left: '25%', right: '25%', height: '1px', background: 'rgba(253, 164, 175, 0.35)' }} />
                  <div style={{ position: 'absolute', top: '72%', left: '25%', right: '25%', height: '1px', background: 'rgba(253, 164, 175, 0.35)' }} />

                  {/* Landmark Dots */}
                  <div style={{ position: 'absolute', top: '22%', left: '50%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  <div style={{ position: 'absolute', top: '35%', left: '50%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  <div style={{ position: 'absolute', top: '35%', left: '26%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  <div style={{ position: 'absolute', top: '35%', left: '74%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  <div style={{ position: 'absolute', top: '35%', left: '79%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  
                  <div style={{ position: 'absolute', top: '45%', left: '33%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  <div style={{ position: 'absolute', top: '45%', left: '50%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  <div style={{ position: 'absolute', top: '45%', left: '67%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  
                  <div style={{ position: 'absolute', top: '53%', left: '50%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  <div style={{ position: 'absolute', top: '60%', left: '50%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  <div style={{ position: 'absolute', top: '60%', left: '44%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  <div style={{ position: 'absolute', top: '60%', left: '56%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  
                  <div style={{ position: 'absolute', top: '69%', left: '50%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  <div style={{ position: 'absolute', top: '72%', left: '50%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  <div style={{ position: 'absolute', top: '72%', left: '40%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  <div style={{ position: 'absolute', top: '72%', left: '60%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />
                  
                  <div style={{ position: 'absolute', top: '82%', left: '50%', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px #38bdf8' }} />

                  {/* Circular gauge overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(9, 7, 15, 0.85)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      border: '1px solid var(--border-glass)',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '100px',
                    }}
                  >
                    <div style={{ position: 'relative', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="56" height="56" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgba(255,255,255,0.06)"
                          strokeWidth="3.5"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                          fill="none"
                          stroke="url(#gauge-grad-dash)"
                          strokeDasharray={`${analysis.overallScore}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="gauge-grad-dash" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#4ade80" />
                            <stop offset="100%" stopColor="#0ea5e9" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div style={{ position: 'absolute', fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                        {analysis.overallScore}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.62rem', color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '6px', fontWeight: 600 }}>
                      HIGH SYMMETRY
                    </span>
                  </div>
                </div>
              </div>

              {/* KEY PROPORTIONS CARD */}
              <div
                className="glass-panel"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                  ⚖️ Key Proportions
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Intercanthal Distance */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Intercanthal Distance</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{intercanthalScore}/10</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${Number(intercanthalScore) * 10}%`,
                          background: 'linear-gradient(90deg, #1d4ed8, #10b981)',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>

                  {/* Nasal Width */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Nasal Width Ratio</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{nasalWidthScore}/10</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${Number(nasalWidthScore) * 10}%`,
                          background: 'linear-gradient(90deg, #1d4ed8, #10b981)',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>

                  {/* Lip Alignment */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Lip Horizontal Alignment</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{lipAlignScore}/10</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${Number(lipAlignScore) * 10}%`,
                          background: 'linear-gradient(90deg, #1d4ed8, #10b981)',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: SVG diagrams for facial features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* 1. EYES DIAGRAM CARD */}
              <div
                className="glass-panel"
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  minHeight: '130px',
                }}
              >
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>👁️</span>
                    <strong style={{ fontSize: '0.95rem', letterSpacing: '0.5px' }}>EYES</strong>
                  </div>
                  
                  <div style={{ position: 'relative', width: '100%', maxWidth: '240px', height: '70px', display: 'flex', alignItems: 'center' }}>
                    <svg width="100" height="45" viewBox="0 0 100 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 22 C35 0 65 0 95 22 C65 44 35 44 5 22 Z" stroke="rgba(253, 164, 175, 0.45)" strokeWidth="1.5" />
                      <circle cx="50" cy="22" r="16" stroke="rgba(253, 164, 175, 0.3)" strokeWidth="1" fill="none"/>
                      <circle cx="50" cy="22" r="11" fill="var(--rose-gold)"/>
                      <circle cx="50" cy="22" r="5" fill="#000"/>
                      <path d="M50 8 L50 2" stroke="var(--primary-gold)" strokeWidth="0.8"/>
                      <path d="M50 36 L50 42" stroke="var(--primary-gold)" strokeWidth="0.8"/>
                      <path d="M5 22 L1 22" stroke="var(--primary-gold)" strokeWidth="0.8"/>
                    </svg>
                    <div style={{ position: 'absolute', top: '-1px', left: '75px', fontSize: '0.62rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Pupil-to-Lid Balance</div>
                    <div style={{ position: 'absolute', bottom: '0px', left: '15px', fontSize: '0.62rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Inner Canthus Align</div>
                    <div style={{ position: 'absolute', bottom: '-4px', left: '110px', fontSize: '0.62rem', color: 'var(--text-muted)' }}>Iris Symmetry</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>{eyesScore}/10</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Iris Symmetry</span>
                </div>
              </div>

              {/* 2. EYEBROWS DIAGRAM CARD */}
              <div
                className="glass-panel"
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  minHeight: '130px',
                }}
              >
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>✨</span>
                    <strong style={{ fontSize: '0.95rem', letterSpacing: '0.5px' }}>EYEBROWS</strong>
                  </div>
                  
                  <div style={{ position: 'relative', width: '100%', maxWidth: '240px', height: '70px', display: 'flex', alignItems: 'center' }}>
                    <svg width="110" height="40" viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 28 C25 22 45 10 70 8 C88 8 98 18 102 24 C88 20 68 14 45 16 C25 18 12 28 10 28 Z" fill="rgba(229, 193, 88, 0.15)" stroke="var(--primary-gold)" strokeWidth="1.2"/>
                      <path d="M70 8 L70 2" stroke="var(--accent-pink)" strokeWidth="0.8" strokeDasharray="1.5 1.5"/>
                      <path d="M102 24 L106 24" stroke="var(--accent-pink)" strokeWidth="0.8"/>
                    </svg>
                    <div style={{ position: 'absolute', top: '0px', left: '42px', fontSize: '0.62rem', color: 'var(--text-muted)' }}>Arch Placement</div>
                    <div style={{ position: 'absolute', bottom: '2px', left: '10px', fontSize: '0.62rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Brow Length-to-Face Ratio</div>
                    <div style={{ position: 'absolute', top: '16px', left: '110px', fontSize: '0.62rem', color: 'var(--text-muted)' }}>Tail Gradient</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>{eyebrowsScore}/10</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Arch Balance</span>
                </div>
              </div>

              {/* 3. NOSE DIAGRAM CARD */}
              <div
                className="glass-panel"
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  minHeight: '130px',
                }}
              >
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>👃</span>
                    <strong style={{ fontSize: '0.95rem', letterSpacing: '0.5px' }}>NOSE</strong>
                  </div>
                  
                  <div style={{ position: 'relative', width: '100%', maxWidth: '240px', height: '70px', display: 'flex', alignItems: 'center' }}>
                    <svg width="70" height="48" viewBox="0 0 70 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30 4 L30 36 C30 42 22 44 22 44 M40 4 L40 36 C40 42 48 44 48 44" stroke="rgba(253, 164, 175, 0.4)" strokeWidth="1.2"/>
                      <path d="M22 44 C26 46 44 46 48 44" stroke="rgba(253, 164, 175, 0.6)" strokeWidth="1.5" fill="none"/>
                      <circle cx="35" cy="40" r="4.5" stroke="var(--primary-gold)" strokeWidth="1" fill="none"/>
                    </svg>
                    <div style={{ position: 'absolute', top: '8px', left: '46px', fontSize: '0.62rem', color: 'var(--text-muted)' }}>Straight Bridge</div>
                    <div style={{ position: 'absolute', bottom: '6px', left: '60px', fontSize: '0.62rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Nostril Contour</div>
                    <div style={{ position: 'absolute', top: '18px', left: '1px', fontSize: '0.62rem', color: 'var(--text-muted)' }}>Base Alignment</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>{noseScore}/10</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Bridge Analysis</span>
                </div>
              </div>

              {/* 4. LIPS DIAGRAM CARD */}
              <div
                className="glass-panel"
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  minHeight: '130px',
                }}
              >
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>👄</span>
                    <strong style={{ fontSize: '0.95rem', letterSpacing: '0.5px' }}>LIPS</strong>
                  </div>
                  
                  <div style={{ position: 'relative', width: '100%', maxWidth: '240px', height: '70px', display: 'flex', alignItems: 'center' }}>
                    <svg width="100" height="42" viewBox="0 0 100 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 20 C20 12 35 10 50 16 C65 10 80 12 90 20 C75 22 65 22 50 20 C35 22 25 22 10 20 Z" fill="rgba(244, 63, 94, 0.15)" stroke="var(--accent-rose)" strokeWidth="1.2"/>
                      <path d="M10 20 C25 36 75 36 90 20 C75 20 65 20 50 20 C35 20 25 20 10 20 Z" fill="rgba(244, 63, 94, 0.1)" stroke="var(--accent-rose)" strokeWidth="1.2"/>
                    </svg>
                    <div style={{ position: 'absolute', top: '-1px', left: '60px', fontSize: '0.62rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Cupid Bow Definition</div>
                    <div style={{ position: 'absolute', bottom: '0px', left: '5px', fontSize: '0.62rem', color: 'var(--text-muted)' }}>Upper-to-Lower Ratio</div>
                    <div style={{ position: 'absolute', bottom: '4px', left: '110px', fontSize: '0.62rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Iris Alignment</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>{lipsScore}/10</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Volume Ratio</span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Grid: Shape Analysis + Breakdown + Summary Profile + Square Ad */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Shape Analysis */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', alignSelf: 'flex-start', fontWeight: 600 }}>
                👤 Shape Analysis
              </span>

              <div style={{ width: '90px', height: '110px', background: 'rgba(255,255,255,0.02)', borderRadius: '50% 50% 45% 45%', border: '2px dashed var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginTop: '10px' }}>
                <svg width="70" height="90" viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M35 10 C50 10 58 24 58 48 C58 72 47 80 35 80 C23 80 12 72 12 48 C12 24 20 10 35 10 Z" stroke="var(--primary-gold)" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <line x1="20" y1="42" x2="50" y2="42" stroke="rgba(255,255,255,0.2)"/>
                  <circle cx="28" cy="42" r="1.5" fill="var(--accent-pink)"/>
                  <circle cx="42" cy="42" r="1.5" fill="var(--accent-pink)"/>
                </svg>
              </div>

              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--primary-gold)' }}>{analysis.faceShape.toUpperCase()} SHAPE</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Score out of 10</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>9.5/10</div>
              </div>
            </div>

            {/* Feature Breakdown */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                📊 Feature Breakdown
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center', height: '100%' }}>
                {/* Eyes */}
                <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-glass)' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>EYES</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{analysis.eyeShape} shape symmetry</div>
                  </div>
                  <div style={{ background: 'rgba(74,222,128,0.1)', padding: '2px 8px', borderRadius: '4px', color: '#4ade80', fontSize: '0.78rem', fontWeight: 600 }}>{eyesScore}/10</div>
                </div>

                {/* Eyebrows */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-glass)' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>EYEBROWS</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Density & arch balance</div>
                  </div>
                  <div style={{ background: 'rgba(74,222,128,0.1)', padding: '2px 8px', borderRadius: '4px', color: '#4ade80', fontSize: '0.78rem', fontWeight: 600 }}>{eyebrowsScore}/10</div>
                </div>

                {/* Lips */}
                <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>LIPS</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Volume ratio & cupid bow</div>
                  </div>
                  <div style={{ background: 'rgba(74,222,128,0.1)', padding: '2px 8px', borderRadius: '4px', color: '#4ade80', fontSize: '0.78rem', fontWeight: 600 }}>{lipsScore}/10</div>
                </div>
              </div>
            </div>

            {/* Summary Profile */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                📋 Summary Profile
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', justifyContent: 'center', height: '100%' }}>
                <p>
                  Overall harmonic balance and key proportions show high symmetrical indexes. The placement of your {analysis.eyeShape} eyes and {analysis.faceShape} structural outline are balanced.
                </p>
                <p style={{ fontStyle: 'italic', color: 'var(--accent-pink)', fontWeight: 500 }}>
                  Key structural traits are balanced for harmonious face results.
                </p>
              </div>
            </div>

            {/* Google AdSense / Referral Monetized Ad slot 2: Square */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '220px' }}>
              <AdSenseBanner publisherId={adsensePubId} slotId="square_banner" format="square" />
            </div>

          </div>

          {/* Optional Support Tip Panel */}
          <div
            className="glass-panel"
            style={{
              background: 'linear-gradient(135deg, rgba(253, 164, 175, 0.04) 0%, rgba(229, 193, 88, 0.02) 100%)',
              padding: '24px',
              textAlign: 'center',
              border: '1px solid var(--border-glass)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              marginTop: '12px',
            }}
          >
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Heart size={16} color="var(--accent-rose)" fill="var(--accent-rose)" /> GlowAI is 100% Free & Open
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '4px', maxWidth: '500px', margin: '4px auto 0' }}>
                We believe beauty intelligence should be accessible to everyone. If our recommendations helped you find your style, consider supporting our development with a small voluntary tip!
              </p>
            </div>
            
            <button
              onClick={onUnlockClick}
              className="btn-secondary"
              style={{
                borderColor: 'rgba(253, 164, 175, 0.3)',
                color: 'var(--text-rose)',
                padding: '8px 24px',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {hasPaid ? 'Thank You For Your Support! ❤️' : 'Support / Donate to GlowAI ☕'}
            </button>
          </div>

          {/* Careers & Feedback Hub Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              marginTop: '8px',
            }}
          >
            {/* Feedback Card */}
            <button
              onClick={() => setShowFeedback(true)}
              className="glass-panel"
              style={{
                padding: '20px 24px',
                cursor: 'pointer',
                textAlign: 'left',
                border: '1px solid var(--border-glass)',
                background: 'rgba(255,255,255,0.01)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.3s ease',
                width: '100%',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(253, 164, 175, 0.3)';
                e.currentTarget.style.background = 'rgba(253, 164, 175, 0.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-glass)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
              }}
            >
              <div style={{ fontSize: '1.8rem', background: 'rgba(253, 164, 175, 0.1)', width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                💬
              </div>
              <div>
                <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>Share Feedback</strong>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.3' }}>
                  Have feature ideas? Tell our developer team!
                </p>
              </div>
            </button>

            {/* Careers Card */}
            <button
              onClick={() => setShowCareers(true)}
              className="glass-panel"
              style={{
                padding: '20px 24px',
                cursor: 'pointer',
                textAlign: 'left',
                border: '1px solid var(--border-glass)',
                background: 'rgba(255,255,255,0.01)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.3s ease',
                width: '100%',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(229, 193, 88, 0.3)';
                e.currentTarget.style.background = 'rgba(229, 193, 88, 0.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-glass)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
              }}
            >
              <div style={{ fontSize: '1.8rem', background: 'rgba(229, 193, 88, 0.1)', width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                💼
              </div>
              <div>
                <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>Join the Team (Careers)</strong>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.3' }}>
                  We are hiring AI Stylists and Media Creators!
                </p>
              </div>
            </button>
          </div>
        </div>
      ) : (
        /* RECOMMENDATIONS TAB - FULLY UNLOCKED AND FREE BY DEFAULT */
        <div>
          {children}
        </div>
      )}

      {/* Feedback Overlay Modal */}
      {showFeedback && (
        <FeedbackModal onClose={() => setShowFeedback(false)} />
      )}

      {/* Careers Overlay Modal */}
      {showCareers && (
        <CareersModal onClose={() => setShowCareers(false)} />
      )}
    </div>
  );
};
