'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function ChapterVideo({ src, active }) {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);
  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="auto"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

const CHAPTERS = [
  {
    num: '01',
    title: 'AI-Powered Marking',
    desc: 'AI marks multiple-choice questions, calculations, and written responses against official mark schemes. Students get instant, structured feedback instead of waiting days.',
    before: 'Mark 30 papers by hand over a weekend',
    after: 'AI marks and gives feedback in seconds',
    videoSrc: '/ai-marking.mp4',
  },
  {
    num: '02',
    title: 'Blind Marking',
    desc: 'Anonymous student IDs hide identity during marking, removing unconscious bias. The system reveals who wrote what only after marks are finalised.',
    before: 'Recognise handwriting, adjust expectations',
    after: 'Mark the work, not the student',
    videoSrc: '/blind-marking.mp4',
  },
  {
    num: '03',
    title: 'Live Data Sync',
    desc: 'Grades entered in a spreadsheet automatically appear in the student portal. Marks submitted online sync back to the spreadsheet. Two-way, zero clicks.',
    before: 'Copy marks between 3 different systems',
    after: 'Enter once, available everywhere',
    videoSrc: '/live-data-sync.mp4',
  },
  {
    num: '04',
    title: 'Interactive Tools',
    desc: '14 interactive resources where students learn by doing — building synth patches, shaping EQ curves, hearing compression in real time. Not videos. Not PDFs. Real tools.',
    before: 'Watch a video, hope they remember',
    after: 'Build it, hear it, understand it',
    videoSrc: '/interactive-tools.mp4',
  },
  {
    num: '05',
    title: 'Revision Hub',
    desc: 'AI-marked quizzes across 6 topics with progress tracking. Students see exactly what they know and what they need to work on, with targeted feedback on every answer.',
    before: 'Revise everything and hope for the best',
    after: 'Focus on what you actually need to learn',
    videoSrc: '/revision-hub.mp4',
  },
];

export default function ScrollHero({ children }) {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(-1);
  const [act, setAct] = useState(1);

  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      pin: pinRef.current,
      start: 'top top',
      end: '+=350%',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);

        if (p < 0.15) {
          setAct(1);
          setActiveChapter(-1);
        } else if (p < 0.80) {
          setAct(2);
          const chapterProgress = (p - 0.15) / 0.65;
          const chapter = Math.min(4, Math.floor(chapterProgress * 5));
          setActiveChapter(chapter);
        } else {
          setAct(3);
          setActiveChapter(4);
        }
      },
    });

    return () => trigger.kill();
  }, { scope: containerRef });

  const contentActive = act === 2 || act === 3;

  const getChapterOpacity = (index) => {
    if (act !== 2) return 0;
    const chapterStart = 0.15 + (index / 5) * 0.65;
    const chapterEnd = 0.15 + ((index + 1) / 5) * 0.65;
    const fadeIn = 0.025;
    const fadeOut = 0.025;

    if (progress < chapterStart || progress > chapterEnd) return 0;
    if (progress < chapterStart + fadeIn) return (progress - chapterStart) / fadeIn;
    if (progress > chapterEnd - fadeOut) return (chapterEnd - progress) / fadeOut;
    return 1;
  };

  return (
    <div ref={containerRef}>
      <div
        ref={pinRef}
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          background: '#f0eeeb',
        }}
      >
        {/* 3D Scene */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          transition: 'filter 0.8s ease-out, opacity 0.8s ease-out, transform 0.8s ease-out',
          filter: contentActive ? 'blur(1px)' : 'blur(0px)',
          opacity: contentActive ? 0.5 : 1,
          transform: contentActive ? 'translateX(12%) scale(1.02)' : 'translateX(0) scale(1)',
        }}>
          {typeof children === 'function' ? children(progress) : children}
        </div>

        {/* Act 1: The Hook */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
          opacity: act === 1 ? 1 : 0,
          pointerEvents: act === 1 ? 'auto' : 'none',
          transition: 'opacity 0.6s ease-out',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#d95000',
            marginBottom: 24,
          }}>Digital Lead Portfolio</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontWeight: 900,
            color: '#1a1a1a',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            maxWidth: 900,
          }}>
            AI-Powered Music Technology Education
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 2vw, 1.125rem)',
            color: '#555',
            maxWidth: 900,
            marginTop: 24,
            lineHeight: 1.7,
            background: 'rgba(240, 238, 235, 0.75)',
            backdropFilter: 'blur(12px)',
            padding: '12px 32px',
            borderRadius: 'var(--radius-md)',
          }}>
            How one teacher built a complete learning platform using AI tools — no engineering team, no funding, no code experience
          </p>
          <div style={{
            position: 'absolute',
            bottom: 40,
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            color: '#bbb',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
          }}>
            Scroll to explore
          </div>
        </div>

        {/* Corner label — title shrinks into top-left during Act 1→2 transition */}
        {(() => {
          // Transition zone: progress 0.10 → 0.18
          const t = Math.max(0, Math.min(1, (progress - 0.10) / 0.08));
          const cornerOpacity = act >= 2 ? 1 : t;
          const cornerScale = 1 - t * 0.5; // font shrinks as it moves
          // Interpolate position: center → top-left
          const x = t * -1; // vw-based offset handled by transform
          const y = t * -1;
          return (
            <div style={{
              position: 'absolute',
              top: 28,
              left: 32,
              zIndex: 6,
              opacity: cornerOpacity,
              pointerEvents: 'none',
              transform: `translate(${(1 - t) * 40}%, ${(1 - t) * 60}%)`,
              transition: act >= 2 ? 'opacity 0.3s ease-out' : 'none',
            }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: `${0.75 + (1 - t) * 0.5}rem`,
                fontWeight: 700,
                color: '#d95000',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
              }}>
                AI-Powered Education
              </p>
            </div>
          );
        })()}

        {/* Act 2: The Build — chapters */}
        {CHAPTERS.map((chapter, i) => {
          const opacity = getChapterOpacity(i);
          return (
            <div key={i} style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              opacity,
              pointerEvents: opacity > 0 ? 'auto' : 'none',
              transition: 'opacity 0.15s ease-out',
            }}>
              {/* Left: text content */}
              <div style={{
                flex: '0 0 45%',
                padding: '40px 40px 40px 80px',
                maxWidth: 520,
                transform: `translateY(${opacity < 0.5 ? 20 : 0}px)`,
                transition: 'transform 0.4s ease-out',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 900,
                  color: 'rgba(217, 80, 0, 0.12)',
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: -6,
                }}>{chapter.num}</span>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  marginBottom: 16,
                }}>{chapter.title}</h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  color: '#555',
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}>{chapter.desc}</p>

                {/* Before / After */}
                <div style={{
                  padding: '16px 20px',
                  background: 'rgba(255,255,255,0.7)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  lineHeight: 1.6,
                  backdropFilter: 'blur(8px)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                    <span style={{
                      color: '#ef4444',
                      fontWeight: 600,
                      fontSize: '0.6875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      flexShrink: 0,
                      width: 48,
                    }}>Before</span>
                    <span style={{ color: '#888' }}>{chapter.before}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{
                      color: '#d95000',
                      fontWeight: 600,
                      fontSize: '0.6875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      flexShrink: 0,
                      width: 48,
                    }}>After</span>
                    <span style={{ color: '#333' }}>{chapter.after}</span>
                  </div>
                </div>
              </div>

              {/* Right: video demo */}
              <div style={{
                flex: 1,
                height: '70%',
                padding: '0 60px 0 20px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-subtle)',
                  background: 'rgba(255,255,255,0.5)',
                  position: 'relative',
                  boxShadow: 'var(--shadow-lg)',
                }}>
                  <ChapterVideo src={chapter.videoSrc} active={opacity > 0.5} />
                  {/* Bottom gradient to hide baked-in video text */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 120,
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(10,10,20,0.6) 40%, rgba(10,10,20,1) 75%)',
                    pointerEvents: 'none',
                  }} />
                  {/* Live Demo badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 12,
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.625rem',
                    color: '#d95000',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    background: 'rgba(255,255,255,0.85)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 1,
                  }}>
                    Live Demo
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Act 3: The Proof — Stats */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: act === 3 ? Math.min(1, (progress - 0.80) / 0.05) : 0,
          pointerEvents: act === 3 ? 'auto' : 'none',
          transition: 'opacity 0.3s ease-out',
        }}>
          <div style={{
            background: 'rgba(240, 238, 235, 0.8)',
            backdropFilter: 'blur(16px)',
            borderRadius: 'var(--radius-xl)',
            padding: '40px 48px',
            maxWidth: 960,
            width: '100%',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#d95000',
              marginBottom: 32,
              textAlign: 'center',
            }}>The Numbers</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 32,
            }}>
              {[
                { value: '4', label: 'Live Websites' },
                { value: '14', label: 'Interactive Tools' },
                { value: '3', label: 'AI Systems' },
                { value: '6', label: 'Revision Topics' },
                { value: '~6wk', label: 'Build Time' },
              ].map((stat, i) => (
                <div key={i} style={{
                  textAlign: 'center',
                  transform: `translateY(${act === 3 ? 0 : 30}px)`,
                  transition: `transform 0.6s ease-out ${i * 0.1}s`,
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    color: '#1a1a1a',
                    lineHeight: 1,
                    marginBottom: 8,
                  }}>{stat.value}</div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    color: '#666',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chapter Nav — left sidebar */}
        <ChapterNavInline progress={progress} activeChapter={activeChapter} visible={act === 2} />

        {/* Scroll progress bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 2,
          background: '#d95000',
          width: `${progress * 100}%`,
          zIndex: 10,
        }} />
      </div>
    </div>
  );
}

function ChapterNavInline({ progress, activeChapter, visible }) {
  return (
    <div style={{
      position: 'absolute',
      left: 24,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 5,
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.5s ease-out',
      pointerEvents: 'none',
    }}>
      {[1, 2, 3, 4, 5].map((num, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: i === activeChapter ? 600 : 400,
            color: i === activeChapter ? '#d95000' : '#ccc',
            letterSpacing: '0.05em',
            transition: 'color 0.3s ease-out',
            padding: '8px 0',
          }}>
            {String(num).padStart(2, '0')}
          </span>
          {i < 4 && (
            <div style={{
              width: 1,
              height: 24,
              background: '#e0ddd8',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${i < activeChapter ? 100 : i === activeChapter ? Math.min(100, Math.max(0, ((progress - 0.15 - i * 0.13) / 0.13) * 100)) : 0}%`,
                background: '#d95000',
                transition: 'height 0.15s linear',
              }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
