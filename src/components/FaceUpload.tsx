import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, AlertCircle, Sparkles } from 'lucide-react';

interface FaceUploadProps {
  onScanComplete: (imageData: string, analysisResults: any) => void;
}

export const FaceUpload: React.FC<FaceUploadProps> = ({ onScanComplete }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const scanSteps = [
    'Scanning facial symmetry landmarks...',
    'Analyzing eye shape & positioning...',
    'Detecting skin undertone & radiance...',
    'Estimating nose and lip volume ratios...',
    'Determining core face shape...',
    'Finalizing scoring dashboard...'
  ];

  // Cycle scanning messages
  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isScanning]);

  // Clean up camera stream
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setCameraError('');
    setImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access camera. Please check permissions or upload a photo instead.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Mirror the image for intuitive selfie view
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImage(dataUrl);
        stopCamera();
        triggerAnalysis(dataUrl);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImage(result);
        stopCamera();
        triggerAnalysis(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerAnalysis = (imgData: string) => {
    setIsScanning(true);
    setScanStep(0);

    // Simulate standard results (randomized slightly to feel dynamic)
    const overallScore = Math.floor(Math.random() * 10) + 85; // 85 to 95
    const symmetry = Math.floor(Math.random() * 8) + 87; // 87 to 95
    const skinTone = ['Warm Golden', 'Cool Rose', 'Neutral Beige', 'Olive'][Math.floor(Math.random() * 4)];
    const faceShape = ['Oval', 'Heart', 'Round', 'Square'][Math.floor(Math.random() * 4)];
    const eyeShape = ['Almond', 'Round', 'Cat-Eye', 'Hooded'][Math.floor(Math.random() * 4)];
    const lipsRatio = ['Full (1:1.2)', 'Classic (1:1.0)', 'Defined Cupid Bow'][Math.floor(Math.random() * 3)];
    const noseAlignment = 'Symmetrical & Balanced';

    const mockAnalysis = {
      overallScore,
      symmetry,
      skinTone,
      faceShape,
      eyeShape,
      lipsRatio,
      noseAlignment
    };

    setTimeout(() => {
      setIsScanning(false);
      onScanComplete(imgData, mockAnalysis);
    }, 4000);
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '960px',
        margin: '0 auto',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        zIndex: 5,
        position: 'relative'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <span
          style={{
            fontSize: '0.85rem',
            color: 'var(--accent-pink)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          AI Analyzer
        </span>
        <h2
          style={{
            fontSize: '2.5rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: 600,
            marginTop: '8px',
            marginBottom: '12px',
          }}
          className="text-gradient-rose"
        >
          Facial Feature Analysis
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
          Capture or upload your portrait to get a detailed scorecard of your facial features. GlowAI checks symmetry, proportions, and shapes.
        </p>
      </div>

      {isScanning ? (
        /* SCANNING INTERFACE */
        <div
          className="glass-panel"
          style={{
            padding: '60px 40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            minHeight: '400px',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '240px',
              height: '320px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid var(--accent-pink)',
              boxShadow: 'var(--shadow-pink)',
            }}
          >
            {image && (
              <img
                src={image}
                alt="Scanning..."
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            {/* Holographic scanner overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(253, 164, 175, 0.05), rgba(253, 164, 175, 0.2))',
                pointerEvents: 'none',
              }}
            />
            {/* The laser scanner line */}
            <div className="scan-line" />
            
            {/* Face framing grid */}
            <div
              style={{
                position: 'absolute',
                top: '15%',
                left: '15%',
                width: '70%',
                height: '70%',
                border: '1px dashed rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <Sparkles size={18} className="text-gradient-rose" /> Analyzing Face Profile
            </h3>
            <p
              style={{
                color: 'var(--text-rose)',
                fontSize: '0.95rem',
                minHeight: '24px',
                fontWeight: 500,
              }}
            >
              {scanSteps[scanStep]}
            </p>
          </div>
        </div>
      ) : (
        /* INPUT & REFERENCE INTERFACE */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '32px',
          }}
          className="desktop-row" // Handles responsive grids via inline styles
        >
          {/* Custom style for responsive flex */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '32px',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {/* Left Box: Capture / Upload */}
            <div
              className="glass-panel"
              style={{
                flex: '1 1 450px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                minHeight: '450px',
                justifyContent: 'center',
              }}
            >
              {isCameraActive ? (
                /* CAMERA VIEWPORT */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="camera-view">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: 'scaleX(-1)' // Mirror selfie preview
                      }}
                    />
                    {/* Face Silhouette overlay guidance */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '55%',
                        height: '70%',
                        border: '2px dashed rgba(253, 164, 175, 0.4)',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={capturePhoto} className="btn-primary" style={{ flex: 1 }}>
                      Capture Photo
                    </button>
                    <button onClick={stopCamera} className="btn-secondary">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* SELECTION STATE */
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    gap: '28px',
                  }}
                >
                  {cameraError && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(244, 63, 94, 0.1)',
                        border: '1px solid rgba(244, 63, 94, 0.2)',
                        padding: '12px',
                        borderRadius: '8px',
                        color: '#fda4af',
                        fontSize: '0.85rem',
                        width: '100%',
                      }}
                    >
                      <AlertCircle size={16} style={{ flexShrink: 0 }} />
                      <span>{cameraError}</span>
                    </div>
                  )}

                  {/* Drag-n-drop mockup / File Upload Panel */}
                  <label
                    style={{
                      width: '100%',
                      height: '220px',
                      border: '2px dashed var(--border-glass)',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      background: 'rgba(255, 255, 255, 0.01)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(253, 164, 175, 0.4)';
                      e.currentTarget.style.background = 'rgba(253, 164, 175, 0.01)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-glass)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.03)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border-glass)',
                      }}
                    >
                      <Upload size={20} color="var(--accent-pink)" />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Upload Portrait Photo</span>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>PNG, JPG or WEBP up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                  </label>

                  <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '12px' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border-glass)' }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border-glass)' }} />
                  </div>

                  {/* Take Photo Button */}
                  <button
                    onClick={startCamera}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '14px',
                    }}
                  >
                    <Camera size={18} /> Use Live Camera
                  </button>
                </div>
              )}
            </div>

            {/* Right Box: Reference Guide */}
            <div
              className="glass-panel"
              style={{
                flex: '1 1 350px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                background: 'linear-gradient(135deg, rgba(20, 16, 30, 0.8) 0%, rgba(10, 8, 15, 0.9) 100%)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                Pose Guidelines Reference
              </h3>
              
              {/* Silhouette SVG Graphic */}
              <div
                style={{
                  height: '180px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-glass)',
                  padding: '12px',
                }}
              >
                <svg width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Face outline grid */}
                  <path d="M60 10 C85 10 95 35 95 70 C95 105 78 125 60 125 C42 125 25 105 25 70 C25 35 35 10 60 10 Z" fill="rgba(253, 164, 175, 0.03)" stroke="rgba(253, 164, 175, 0.25)" strokeWidth="1.5"/>
                  {/* Eyes axis */}
                  <line x1="15" y1="65" x2="105" y2="65" stroke="rgba(253, 164, 175, 0.2)" strokeDasharray="3 3"/>
                  {/* Center vertical axis */}
                  <line x1="60" y1="5" x2="60" y2="135" stroke="rgba(253, 164, 175, 0.2)" strokeDasharray="3 3"/>
                  {/* Face outline dots */}
                  <circle cx="60" cy="10" r="2.5" fill="var(--accent-pink)" />
                  <circle cx="60" cy="125" r="2.5" fill="var(--accent-pink)" />
                  <circle cx="25" cy="70" r="2.5" fill="var(--accent-pink)" />
                  <circle cx="95" cy="70" r="2.5" fill="var(--accent-pink)" />
                  {/* Neck / Shoulders */}
                  <path d="M45 124 C45 135 30 142 15 145 M75 124 C75 135 90 142 105 145" stroke="rgba(253, 164, 175, 0.2)" strokeWidth="1.5"/>
                </svg>
              </div>

              {/* Instructions Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(253, 164, 175, 0.1)', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, flexShrink: 0 }}>1</div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Face Forward directly</strong>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '2px' }}>Align your eyes and nose within the reference lines.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(253, 164, 175, 0.1)', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, flexShrink: 0 }}>2</div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Bright, Neutral Lighting</strong>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '2px' }}>Ensure no harsh side shadows. Standing near a window is best.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(253, 164, 175, 0.1)', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, flexShrink: 0 }}>3</div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Neutral Expression</strong>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '2px' }}>Do not smile or frown. Keep a natural, relaxed face profile.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(253, 164, 175, 0.1)', color: 'var(--accent-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, flexShrink: 0 }}>4</div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Pull Hair Back</strong>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '2px' }}>Expose your cheeks and jawline for accurate shape measurement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
