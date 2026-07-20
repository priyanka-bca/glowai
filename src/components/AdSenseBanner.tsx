import React, { useEffect } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface AdSenseBannerProps {
  publisherId: string;
  slotId: string;
  format: 'horizontal' | 'square' | 'native';
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ publisherId, slotId, format }) => {
  
  // Real AdSense script loader for production
  useEffect(() => {
    if (publisherId && slotId) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense script error:', e);
      }
    }
  }, [publisherId, slotId]);

  // If Publisher ID is not configured yet, show a gorgeous high-conversion mock ad
  if (!publisherId) {
    if (format === 'horizontal') {
      return (
        <div
          className="glass-panel-light"
          style={{
            width: '100%',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px dashed rgba(229, 193, 88, 0.3)',
            background: 'linear-gradient(90deg, rgba(229,193,88,0.03) 0%, rgba(253,164,175,0.03) 100%)',
            borderRadius: '12px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ad Badge */}
          <span style={{ position: 'absolute', top: '4px', right: '12px', fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Sponsored Ad
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--gold-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
              <Sparkles size={18} />
            </div>
            <div>
              <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Sephora Beauty Fest: Up to 40% Off Cosmetics</strong>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Explore top-rated foundations, lip shades, and skincare kits. Free shipping globally.</p>
            </div>
          </div>

          <button
            onClick={() => alert('Redirecting to Sephora Ad Deal (Monetized click)')}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border-glass)',
              color: 'var(--primary-gold)',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '8px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Shop Deal <ArrowUpRight size={12} />
          </button>
        </div>
      );
    }

    if (format === 'square') {
      return (
        <div
          className="glass-panel-light"
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            border: '1px dashed rgba(253, 164, 175, 0.3)',
            background: 'rgba(253, 164, 175, 0.01)',
            borderRadius: '12px',
            height: '100%',
            minHeight: '220px',
            position: 'relative',
          }}
        >
          <span style={{ position: 'absolute', top: '6px', right: '12px', fontSize: '0.55rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Sponsored
          </span>

          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(253,164,175,0.1)', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
            <Sparkles size={20} />
          </div>

          <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>Daraz Fashion Week</strong>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '180px', lineHeight: '1.4' }}>
            NPR 500 flat discount voucher on modern summer dresses.
          </p>

          <button
            onClick={() => alert('Redirecting to Daraz Ad Deal (Monetized click)')}
            className="btn-primary"
            style={{
              padding: '8px 16px',
              fontSize: '0.75rem',
              marginTop: '14px',
              background: 'var(--rose-gold-gradient)',
              color: '#000',
            }}
          >
            Claim Voucher
          </button>
        </div>
      );
    }

    // Native inline style
    return (
      <div
        className="glass-panel-light"
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '16px',
          border: '1px dashed var(--border-glass)',
          borderRadius: '10px',
          background: 'rgba(255,255,255,0.01)',
        }}
      >
        <div style={{ width: '44px', height: '44px', borderRadius: '6px', background: 'rgba(56,189,248,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
          💆‍♀️
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.6rem', background: 'rgba(229,193,88,0.1)', color: 'var(--primary-gold)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>SPONSORED</span>
            <strong style={{ fontSize: '0.85rem' }}>Tranquility Spa (Kathmandu)</strong>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Special 25% discount on full body therapy & facial glowing routines for GlowAI users.
          </p>
        </div>
        <button
          onClick={() => alert('Redirecting to Spa booking referral link')}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-primary)',
            fontSize: '0.72rem',
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Book Now
        </button>
      </div>
    );
  }

  // Render actual AdSense tag once Publisher ID is provided
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0', width: '100%', overflow: 'hidden' }}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'center',
        }}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
