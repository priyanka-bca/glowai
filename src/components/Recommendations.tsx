import React, { useState } from 'react';
import { Palette, Scissors, ShoppingBag, Heart, Sparkles, Copy, Check } from 'lucide-react';
import { AdSenseBanner } from './AdSenseBanner';

interface RecommendationsProps {
  faceShape: string;
  skinTone: string;
  bodyType: string;
  skinType: string;
  adsensePubId: string;
}

export const Recommendations: React.FC<RecommendationsProps> = ({ faceShape, skinTone, bodyType, skinType, adsensePubId }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Tailored recommendation logic based on Face Shape, Skin Tone, Body Type, and Skin Type
  const getStyleRecommendations = () => {
    // 1. Color Palette mapping based on Skin Tone
    let paletteName = 'Warm Autumn';
    let colors = ['#8A3A1B', '#D07B3C', '#E5A93B', '#8C6C30', '#565A36', '#2F3C28'];
    let paletteDesc = 'Warm, rich earth tones that complement your golden undertones.';

    if (skinTone.toLowerCase().includes('cool') || skinTone.toLowerCase().includes('rose')) {
      paletteName = 'Cool Winter';
      colors = ['#1D2A44', '#7C1C47', '#C8102E', '#3D0C5A', '#007A87', '#101010'];
      paletteDesc = 'Vibrant, high-contrast jewel tones that harmonize with your pink undertones.';
    } else if (skinTone.toLowerCase().includes('neutral')) {
      paletteName = 'Soft Summer';
      colors = ['#5F7D95', '#A7B7C5', '#D2B48C', '#8A6D88', '#B190A6', '#4E5368'];
      paletteDesc = 'Muted, dusty mid-tones that flatter your balanced, neutral temperature.';
    } else if (skinTone.toLowerCase().includes('olive')) {
      paletteName = 'Deep Autumn';
      colors = ['#4A1525', '#7D1C2A', '#D4AF37', '#63513D', '#2B422B', '#1E1E1E'];
      paletteDesc = 'Deep, saturated shades highlighting the golden-green cast of olive skin.';
    }

    // 2. Hairstyle mapping based on Face Shape
    let hairstyles = {
      title: 'Butterfly Layers & Curtain Bangs',
      desc: 'Soft layers around the cheekbones balance your face width, while curtain bangs frame the forehead gently.',
      tips: ['Adds volume at the mid-face level', 'Curtain bangs soften the jawline', 'Avoid straight, heavy bangs']
    };

    if (faceShape.toLowerCase().includes('oval')) {
      hairstyles = {
        title: 'Blunt Textured Bob / Long Waves',
        desc: 'Since your face is naturally balanced, long, loose waves with a center part or a blunt collarbone bob will highlight your symmetry.',
        tips: ['Complements balanced proportions', 'Middle-part waves create flow', 'Avoid styles that add too much height']
      };
    } else if (faceShape.toLowerCase().includes('round')) {
      hairstyles = {
        title: 'Shag Cut with Wispy Bangs',
        desc: 'A shag cut with volume at the crown elongated your face shape, while textured, wispy bangs frame the temples.',
        tips: ['Crown volume elongates profile', 'Face-framing vertical strands', 'Avoid flat chin-length bobs']
      };
    } else if (faceShape.toLowerCase().includes('square')) {
      hairstyles = {
        title: 'Side-Swept Bangs & Soft Curls',
        desc: 'Soft, voluminous curls diffuse the sharp lines of a square jaw, while side-swept bangs break up the forehead geometry.',
        tips: ['Soft curls round out corners', 'Asymmetrical parts break symmetry', 'Avoid straight, blunt fringes']
      };
    }

    // 3. Makeup Look mapping based on Skin Type
    let primerAdvice = 'Apply a glowing hydrating primer to add deep moisture.';
    let productDetails = [
      { name: 'Hydrating Glow Primer', price: 'NPR 1,200', link: '#' },
      { name: 'Bronze Glow Tint', price: 'NPR 1,850', link: '#' },
      { name: 'Nude Honey Lip Gloss Set', price: 'NPR 950', link: '#' }
    ];

    if (skinType === 'oily') {
      primerAdvice = 'Apply a pore-blurring, mattifying primer to control excess oil and shine throughout the day.';
      productDetails[0] = { name: 'Matte Oil-Control Primer', price: 'NPR 1,400', link: '#' };
    } else if (skinType === 'dry') {
      primerAdvice = 'Apply a rich, hyaluronic acid hydrating primer to prevent makeup dry spots.';
      productDetails[0] = { name: 'Ultra Hydrating Primer', price: 'NPR 1,350', link: '#' };
    } else if (skinType === 'combination') {
      primerAdvice = 'Dab a matte primer on your forehead/nose (T-zone) and a hydrating primer on your dry cheeks.';
      productDetails[0] = { name: 'Dual Balance Primer Kit', price: 'NPR 1,600', link: '#' };
    } else if (skinType === 'sensitive') {
      primerAdvice = 'Use a soothing, fragrance-free mineral primer containing cica/aloe to prevent redness.';
      productDetails[0] = { name: 'Calming Mineral Primer (Cica)', price: 'NPR 1,500', link: '#' };
    }

    let makeupLook = {
      name: 'Sun-Kissed Latte Makeup',
      desc: 'Monochromatic warm bronze tones, contouring the outer face contour and a gloss nude lip.',
      steps: [
        primerAdvice,
        'Use a lightweight bronzing tint instead of heavy foundation.',
        'Contour the jaw and forehead, extending up to the temples.',
        'Blend warm gold shimmer on the eyelids and a smudge of brown liner.',
        'Finish with a brown lip liner and warm honey lip gloss.'
      ],
      products: productDetails
    };

    if (paletteName === 'Cool Winter') {
      makeupLook = {
        name: 'Clean Girl Soft Glam',
        desc: 'Fresh dewy skin, defined brows, soft rosy blush, and a berry-stained lip highlight.',
        steps: [
          primerAdvice,
          'Conceal blemishes lightly, keeping natural skin visible.',
          'Brush brows upward using a clear styling gel.',
          'Dab liquid pink blush onto the high points of cheeks.',
          'Apply a cherry lip stain and coat with clear gloss.'
        ],
        products: [
          { name: 'Dewy Skin Serum Mist', price: 'NPR 1,500', link: '#' },
          { name: 'Dewy Liquid Blush (Rose)', price: 'NPR 1,100', link: '#' },
          { name: 'Berry Cherry Lip Stain', price: 'NPR 980', link: '#' }
        ]
      };
    }

    // 4. Dress recommendation based on Face Shape AND Body Type
    let dresses = {
      necklines: 'Sweetheart, V-Neck, & Scoop Neck',
      rule: 'Draw vertical lines down the chest to soft-focus jaw tapers.',
      dressTypes: 'Wrap Dresses & A-Line Silhouettes',
      desc: 'Wrap dresses pull attention to the waist and flare out, which perfectly balances the upper-face width of heart shapes.',
      affiliateLink: 'Shop Heart-Shape Outfits on Daraz'
    };

    // Body shape specific adjustments
    let bodyDesc = 'Wrap dresses, belted outfits, and fitted sheath silhouettes to highlight your balanced symmetry.';
    
    if (bodyType === 'pear') {
      bodyDesc = 'A-line silhouettes, empire waist cuts, and wide boatneck tops to balance your shoulders with your hips.';
      dresses.dressTypes = 'Empire Waist & A-Line Flare';
    } else if (bodyType === 'rectangle') {
      bodyDesc = 'Belted sheath dresses, ruffled details, and tiered skirts to add curvature, dimension, and waist definition.';
      dresses.dressTypes = 'Belted Wrap & Tiered Peplum';
    } else if (bodyType === 'inverted-triangle') {
      bodyDesc = 'Deep V-neck wrap dresses, peplum tops, and flared bottom styles that create volume at the hip level.';
      dresses.dressTypes = 'Peplum Flare & Wide-Leg Jumpsuit';
    } else if (bodyType === 'apple') {
      bodyDesc = 'Empire line dresses, flowing shift outlines, and vertical tunic styles that elevate your waistline.';
      dresses.dressTypes = 'Vertical Shift & Empire Maxi';
    }

    if (faceShape.toLowerCase().includes('oval')) {
      dresses = {
        necklines: 'Boatneck, Off-the-Shoulder, & Halter',
        rule: 'Oval shapes can wear almost any neckline, but off-the-shoulder cuts highlight collarbones beautifully.',
        dressTypes: dresses.dressTypes === 'Wrap Dresses & A-Line Silhouettes' ? 'Satin Slip Dresses & Column Silhouettes' : dresses.dressTypes,
        desc: `Pair these necklines with ${bodyDesc.toLowerCase()}`,
        affiliateLink: 'Shop Oval-Shape Outfits on Daraz'
      };
    } else if (faceShape.toLowerCase().includes('round')) {
      dresses = {
        necklines: 'Square, Queen Anne, & Deep V-Neck',
        rule: 'Wide square and vertical v-necks structure and frame round face profiles.',
        dressTypes: dresses.dressTypes === 'Wrap Dresses & A-Line Silhouettes' ? 'Structured Blazer Outfits & Shift Silhouettes' : dresses.dressTypes,
        desc: `Pair these necklines with ${bodyDesc.toLowerCase()}`,
        affiliateLink: 'Shop Round-Shape Outfits on Daraz'
      };
    } else if (faceShape.toLowerCase().includes('square')) {
      dresses = {
        necklines: 'Round Scoop, Cowl Neck, & Sweetheart',
        rule: 'Soft curved necklines contrast and soften a structured jawline outline.',
        dressTypes: dresses.dressTypes === 'Wrap Dresses & A-Line Silhouettes' ? 'Structured Blazer Outfits & Shift Silhouettes' : dresses.dressTypes,
        desc: `Pair these necklines with ${bodyDesc.toLowerCase()}`,
        affiliateLink: 'Shop Square-Shape Outfits on Daraz'
      };
    } else {
      dresses.desc = `Pair these necklines with ${bodyDesc.toLowerCase()}`;
    }

    return { paletteName, colors, paletteDesc, hairstyles, makeupLook, dresses };
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const data = getStyleRecommendations();

  // Helper: Vector Silhouette SVG Path mapping
  const getBodySvgPath = () => {
    switch (bodyType) {
      case 'hourglass':
        return 'M35 15 C45 15 48 30 38 42 C30 52 28 58 38 68 C48 78 45 85 35 85 C25 85 22 78 32 68 C42 58 40 52 32 42 C22 30 25 15 35 15 Z';
      case 'pear':
        return 'M35 15 C42 15 42 30 36 42 C30 54 48 68 48 78 C48 85 45 85 35 85 C25 85 22 85 22 78 C22 68 40 54 34 42 C28 30 28 15 35 15 Z';
      case 'rectangle':
        return 'M35 15 C44 15 44 32 44 46 C44 60 44 74 42 85 C35 85 35 85 28 85 C26 74 26 60 26 46 C26 32 26 15 35 15 Z';
      case 'inverted-triangle':
        return 'M35 15 C48 15 50 28 42 42 C36 52 35 68 35 85 C35 85 35 85 35 85 C35 68 34 52 28 42 C20 28 22 15 35 15 Z';
      case 'apple':
        return 'M35 15 C45 15 48 26 46 42 C44 56 46 72 38 85 C35 85 35 85 32 85 C24 72 26 56 24 42 C22 26 25 15 35 15 Z';
      default:
        return 'M35 15 C45 15 48 30 38 42 C30 52 28 58 38 68 C48 78 45 85 35 85 C25 85 22 78 32 68 C42 58 40 52 32 42 C22 30 25 15 35 15 Z';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* 1. COLOR THEORY PALETTE */}
      <div className="glass-panel" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(253, 164, 175, 0.1)', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Palette size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
              Color Analysis: {data.paletteName}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{data.paletteDesc}</p>
          </div>
        </div>

        {/* Color Swatch Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '12px', minHeight: '80px', marginTop: '16px' }}>
          {data.colors.map((hex) => (
            <button
              key={hex}
              onClick={() => copyToClipboard(hex)}
              style={{
                background: hex,
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                height: '80px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.65rem',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {copiedColor === hex ? <Check size={10} color="#4ade80" /> : <Copy size={10} />}
                <span>{hex}</span>
              </div>
            </button>
          ))}
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
          💡 Click any color block to copy hex codes for lipstick or clothes matching.
        </p>
      </div>

      {/* HAIRSTYLE & MAKEUP SECTION (WITH ARTISTIC VECTOR DIAGRAMS) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* 2. HAIRSTYLES */}
        <div
          className="glass-panel"
          style={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '28px',
          }}
        >
          {/* Vector Schematic illustration instead of photo */}
          <div
            style={{
              flex: '1 1 240px',
              maxWidth: '300px',
              aspectRatio: '3/4',
              borderRadius: '12px',
              background: 'linear-gradient(180deg, rgba(253, 164, 175, 0.05) 0%, rgba(229, 193, 88, 0.02) 100%)',
              border: '1px solid var(--border-glass)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              padding: '20px',
            }}
          >
            <span style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '0.62rem', color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
              Schematic
            </span>

            {/* Hair Flow Vector Graphic */}
            <svg width="150" height="200" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer glowing hair boundary */}
              <path d="M50 15 C10 15 5 70 12 110 C20 80 40 50 50 50 C60 50 80 80 88 110 C95 70 90 15 50 15 Z" fill="rgba(253,164,175,0.03)" stroke="rgba(253, 164, 175, 0.25)" strokeWidth="1.5" />
              {/* Head structure */}
              <path d="M50 35 C38 35 30 45 30 60 C30 75 38 85 50 85 C62 85 70 75 70 60 C70 45 62 35 50 35 Z" fill="rgba(255,255,255,0.02)" stroke="var(--primary-gold)" strokeWidth="1" />
              {/* Layer flows */}
              <path d="M25 45 C35 48 40 40 50 43 C60 40 65 48 75 45" stroke="var(--accent-pink)" strokeWidth="1" strokeDasharray="2 2" />
              <path d="M18 70 C30 75 35 68 50 72 C65 68 70 75 82 70" stroke="var(--accent-pink)" strokeWidth="1" />
              <path d="M12 95 C25 100 35 90 50 95 C65 90 75 100 88 95" stroke="var(--accent-pink)" strokeWidth="1.2" />
              {/* Crown pointer */}
              <circle cx="50" cy="15" r="3.5" fill="var(--primary-gold)" />
              <line x1="50" y1="15" x2="50" y2="35" stroke="var(--primary-gold)" strokeWidth="0.8" strokeDasharray="2 2" />
            </svg>
          </div>

          {/* Texts & tips */}
          <div style={{ flex: '2 1 350px', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(253, 164, 175, 0.1)', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Scissors size={20} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>Hairstyle Match</h3>
            </div>

            <div className="glass-panel-light" style={{ padding: '20px', border: '1px solid rgba(229,193,88,0.1)' }}>
              <h4 style={{ color: 'var(--primary-gold)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '6px' }}>
                {data.hairstyles.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {data.hairstyles.desc}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>Styling Rules:</span>
              <ul style={{ paddingLeft: '20px', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {data.hairstyles.tips.map((tip, idx) => (
                  <li key={idx} style={{ listStyleType: 'disc' }}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Google AdSense / Referral Monetized Ad slot 3: Native banner */}
        <AdSenseBanner publisherId={adsensePubId} slotId="native_banner_recommendations" format="native" />

        {/* 3. MAKEUP TYPE */}
        <div
          className="glass-panel"
          style={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap-reverse',
            gap: '28px',
          }}
        >
          {/* Texts & steps */}
          <div style={{ flex: '2 1 350px', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(253, 164, 175, 0.1)', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={20} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>Makeup Blueprint</h3>
            </div>

            <div className="glass-panel-light" style={{ padding: '20px' }}>
              <h4 style={{ color: 'var(--accent-pink)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '6px' }}>
                {data.makeupLook.name}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {data.makeupLook.desc}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>Application Steps:</span>
              <ol style={{ paddingLeft: '20px', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.makeupLook.steps.map((step, idx) => (
                  <li key={idx} style={{ listStyleType: 'decimal' }}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Affiliate Link Store Panel */}
            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px', marginTop: '4px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px' }}>
                Recommended products (Affiliate links)
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                {data.makeupLook.products.map((prod, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid var(--border-glass)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-primary)' }}>{prod.name}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--accent-pink)', marginLeft: '8px', fontWeight: 600 }}>{prod.price}</span>
                    </div>
                    <button
                      onClick={() => alert(`Redirecting to Daraz Store Affiliate Link for ${prod.name}`)}
                      style={{
                        background: 'rgba(253, 164, 175, 0.08)',
                        border: '1px solid rgba(253, 164, 175, 0.2)',
                        color: 'var(--text-rose)',
                        fontSize: '0.75rem',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <ShoppingBag size={12} /> Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vector Schematic illustration instead of photo */}
          <div
            style={{
              flex: '1 1 240px',
              maxWidth: '300px',
              aspectRatio: '3/4',
              borderRadius: '12px',
              background: 'linear-gradient(180deg, rgba(229, 193, 88, 0.04) 0%, rgba(20, 16, 30, 0.8) 100%)',
              border: '1px solid var(--border-glass)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              padding: '20px',
            }}
          >
            <span style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '0.62rem', color: 'var(--primary-gold)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
              Mapping Zones
            </span>

            {/* Makeup Blueprint Face Map Graphic */}
            <svg width="150" height="200" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Neck & chin base */}
              <path d="M38 100 C38 115 62 115 62 100 Z" fill="rgba(255,255,255,0.01)" stroke="var(--border-glass)" />
              {/* Face silhouette */}
              <path d="M50 25 C30 25 24 45 24 70 C24 95 38 105 50 105 C62 105 76 95 76 70 C76 45 70 25 50 25 Z" fill="rgba(255,255,255,0.02)" stroke="var(--border-glass)" strokeWidth="1.2" />
              
              {/* Dynamic Eyeshadow Zone (colored matching palette color 1) */}
              <ellipse cx="38" cy="55" rx="7" ry="4" fill={data.colors[1]} style={{ opacity: 0.4 }} />
              <ellipse cx="62" cy="55" rx="7" ry="4" fill={data.colors[1]} style={{ opacity: 0.4 }} />
              
              {/* Eyeline curves */}
              <path d="M32 55 Q38 52 44 55" stroke="var(--text-primary)" strokeWidth="1" />
              <path d="M56 55 Q62 52 68 55" stroke="var(--text-primary)" strokeWidth="1" />
              
              {/* Cheek Blush highlight zones (colored matching palette color 2) */}
              <ellipse cx="32" cy="72" rx="6" ry="7" fill={data.colors[2]} style={{ opacity: 0.3, filter: 'blur(1px)' }} />
              <ellipse cx="68" cy="72" rx="6" ry="7" fill={data.colors[2]} style={{ opacity: 0.3, filter: 'blur(1px)' }} />

              {/* Lips layout mapping (colored matching palette color 0) */}
              <path d="M42 88 Q50 82 58 88 Q50 94 42 88 Z" fill={data.colors[0]} style={{ opacity: 0.85 }} stroke="var(--text-primary)" strokeWidth="0.5" />
              
              {/* Guide Lines */}
              <line x1="50" y1="25" x2="50" y2="105" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
            </svg>
          </div>
        </div>

      </div>

      {/* 4. DRESS & WARDROBE RECOMMENDATIONS (WITH ARTISTIC BODY DIAGRAM) */}
      <div
        className="glass-panel"
        style={{
          padding: '32px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '28px',
        }}
      >
        {/* Vector Diagnostic Illustration of Body Line Fit */}
        <div
          style={{
            flex: '1 1 240px',
            maxWidth: '300px',
            aspectRatio: '3/4',
            borderRadius: '12px',
            background: 'linear-gradient(180deg, rgba(20, 16, 30, 0.9) 0%, rgba(253, 164, 175, 0.03) 100%)',
            border: '1px solid var(--border-glass)',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '20px',
          }}
        >
          <span style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '0.62rem', color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
            Anatomy Line
          </span>

          {/* SVG Silhouette representation overlayed with wrap guides */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <svg width="120" height="200" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Core head */}
              <circle cx="35" cy="8" r="4.5" fill="rgba(255,255,255,0.03)" stroke="var(--border-glass)" strokeWidth="1" />
              {/* Dynamic Body Shape Path */}
              <path
                d={getBodySvgPath()}
                fill="rgba(253, 164, 175, 0.04)"
                stroke="var(--accent-pink)"
                strokeWidth="1.5"
              />
              
              {/* Golden Highlight Guideline Zones representing Neckline & Wrap dress cuts */}
              {/* Neckline highlight */}
              <path d="M29 23 L35 30 L41 23" stroke="var(--primary-gold)" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="35" cy="30" r="1.5" fill="var(--primary-gold)" />

              {/* Waist wrap line */}
              <path d="M28 50 Q35 53 42 50" stroke="var(--primary-gold)" strokeWidth="1.5" strokeDasharray="2 1.5" />
              <path d="M26 50 H44" stroke="var(--primary-gold)" strokeWidth="0.8" />
              
              {/* Flaired bottom wrap outline */}
              <path d="M25 68 Q35 72 45 68" stroke="var(--primary-gold)" strokeWidth="1" />
            </svg>
            <span style={{ fontSize: '0.65rem', background: 'rgba(229,193,88,0.1)', color: 'var(--primary-gold)', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
              {bodyType} outline fit
            </span>
          </div>
        </div>

        {/* Texts & grids */}
        <div style={{ flex: '2 1 350px', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(253, 164, 175, 0.1)', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={20} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
              Tailored Wardrobe Dress Recommendations
            </h3>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            CUSTOM BALANCED FOR: <strong style={{ color: 'var(--accent-pink)', textTransform: 'uppercase' }}>{bodyType} Body Shape</strong> + <strong style={{ color: 'var(--primary-gold)', textTransform: 'uppercase' }}>{faceShape} Face shape</strong> + <strong style={{ color: '#38bdf8', textTransform: 'uppercase' }}>{skinType} Skin Profile</strong>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Neckline */}
            <div className="glass-panel-light" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-pink)', fontWeight: 600, textTransform: 'uppercase' }}>Recommended Necklines</span>
              <strong style={{ fontSize: '0.98rem', color: 'var(--text-primary)' }}>{data.dresses.necklines}</strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                {data.dresses.rule}
              </p>
            </div>

            {/* Outfit Style */}
            <div className="glass-panel-light" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--primary-gold)', fontWeight: 600, textTransform: 'uppercase' }}>Silhouette Fit</span>
              <strong style={{ fontSize: '0.98rem', color: 'var(--text-primary)' }}>{data.dresses.dressTypes}</strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                {data.dresses.desc}
              </p>
            </div>
          </div>

          {/* Affiliate Shop Outfits Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(229,193,88,0.04) 0%, rgba(253,164,175,0.04) 100%)',
              border: '1px dashed var(--border-gold)',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '8px'
            }}
          >
            <div>
              <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Match Your Body Lines with Premium Outfits</strong>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Browse outfit styles on Daraz catalog curated by designers for {bodyType} silhouettes.
              </p>
            </div>
            <button
              onClick={() => alert(`Redirecting to Daraz Store Outfit Affiliate Link for ${bodyType} body shape`)}
              className="btn-primary"
              style={{
                background: 'var(--gold-gradient)',
                color: '#000',
                padding: '8px 16px',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <ShoppingBag size={12} /> Shop Outfits
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
