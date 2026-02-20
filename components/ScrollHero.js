'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

function ChapterVideo({ src, poster, active, title }) {
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
      preload="metadata"
      poster={poster}
      aria-label={`Demo video showing ${title || 'tool demonstration'}`}
      title={title || 'Tool demonstration'}
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
    desc: 'Teachers spend evenings and weekends marking papers that could be assessed in minutes. AI marks multiple-choice, calculations, and written responses against official mark schemes — giving students immediate directive feedback (Hattie) instead of a five-day wait that delays the corrective cycle identified by Wiliam & Black.',
    before: 'A weekend lost to marking 30 papers',
    after: '16 students marked in one afternoon',
    videoSrc: '/ai-marking.mp4',
    posterSrc: '/ai-marking-poster.jpg',
  },
  {
    num: '02',
    title: 'Blind Marking',
    desc: 'Bloom\u2019s Two Sigma research found teachers treat students unequally, with some receiving encouragement while others are largely ignored. Anonymous student IDs remove that bias entirely — marks are finalised before identities are revealed. Students noticed the difference, reporting that their marks felt fairer across the board.',
    before: 'Recognise handwriting, adjust expectations',
    after: 'Mark the work, not the student',
    videoSrc: '/blind-marking.mp4',
    posterSrc: '/blind-marking-poster.jpg',
  },
  {
    num: '03',
    title: 'Live Data Sync',
    desc: 'Most departments keep grades in three or more disconnected systems — spreadsheets, portals, mark books. Bloom identified that responsive teaching requires immediate access to performance data. This two-way sync means grades entered anywhere appear everywhere automatically, enabling the data-driven decisions that mastery learning depends on.',
    before: 'Copy marks between 3 different systems',
    after: 'Enter once, available everywhere',
    videoSrc: '/live-data-sync.mp4',
    posterSrc: '/live-data-sync-poster.jpg',
  },
  {
    num: '04',
    title: 'Interactive Tools',
    desc: 'Craik & Lockhart\u2019s Levels of Processing research shows that how material is processed matters more than the intention to learn. These 14 interactive tools force deep semantic processing — students build synth patches, shape EQ curves, and hear compression in real time, combining Paivio\u2019s dual coding (visual + auditory) with hands-on application.',
    before: 'Watch a video, hope they remember',
    after: 'Hear it, shape it, understand it',
    videoSrc: '/interactive-tools.mp4',
    posterSrc: '/interactive-tools-poster.jpg',
  },
  {
    num: '05',
    title: 'Revision Hub',
    desc: 'Dunlosky et al. rated practice testing and distributed practice as the two highest-utility learning techniques. AI-marked quizzes across 6 topics implement both — retrieval practice with spaced intervals, showing students exactly where their gaps are. As Rosenshine prescribed: begin each session with review of what came before.',
    before: 'Revise everything and hope for the best',
    after: 'Focus on what you actually need to learn',
    videoSrc: '/revision-hub.mp4',
    posterSrc: '/revision-hub-poster.jpg',
  },
];

export default function ScrollHero({ children }) {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(-1);
  const [act, setAct] = useState(1);
  const isMobile = useIsMobile();

  // ── Intro animation — masked line reveal ──
  useEffect(() => {
    const introTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    introTl.to('.hero-label', {
      opacity: 1,
      duration: 0.6,
      delay: 0.5,
    });

    introTl.to('.hero-line', {
      y: '0%',
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
    }, '-=0.3');

    introTl.to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, '-=0.5');

    introTl.to('.hero-scroll-hint', {
      opacity: 1,
      duration: 0.6,
    }, '-=0.3');

    return () => introTl.kill();
  }, []);

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

        if (p < 0.07) {
          setAct(1);
          setActiveChapter(-1);
        } else if (p < 0.80) {
          setAct(2);
          const chapterProgress = (p - 0.07) / 0.73;
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
    const chapterStart = 0.07 + (index / 5) * 0.73;
    const chapterEnd = 0.07 + ((index + 1) / 5) * 0.73;
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
          filter: contentActive ? 'blur(6px)' : 'blur(2px)',
          opacity: contentActive ? (isMobile ? 0.2 : 0.35) : 0.7,
          transform: contentActive
            ? (isMobile ? 'scale(1.05)' : 'translateX(12%) scale(1.02)')
            : 'translateX(0) scale(1)',
        }}>
          {typeof children === 'function' ? children(progress) : children}
        </div>

        {/* Act 1: The Hook — masked line reveal */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: isMobile ? '0 20px' : '0 60px',
          opacity: act === 1 ? 1 : 0,
          pointerEvents: act === 1 ? 'auto' : 'none',
          transition: 'opacity 0.6s ease-out',
        }}>
          <p className="hero-label" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#d95000',
            marginBottom: 24,
            opacity: 0,
          }}>AI in Education</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? 'clamp(2.5rem, 10vw, 3.5rem)' : 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 700,
            color: '#1a1a1a',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            marginBottom: 32,
            maxWidth: 900,
          }}>
            {['AI-Powered Music', 'Technology', 'Education'].map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'clip', position: 'relative', paddingBottom: '0.1em' }}>
                <span className="hero-line" style={{ display: 'block', transform: 'translateY(110%)' }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero-subtitle" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 2vw, 1.0625rem)',
            color: '#555',
            maxWidth: 560,
            lineHeight: 1.7,
            opacity: 0,
            transform: 'translateY(20px)',
          }}>
            Edtech consulting for UK secondary schools — AI marking, interactive tools, and data systems built by a classroom teacher
          </p>
          <a
            href="#contact"
            className="hero-scroll-hint"
            style={{
              display: 'inline-block',
              marginTop: 28,
              padding: '14px 32px',
              background: '#d95000',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: '#ffffff',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              opacity: 0,
              transition: 'background 0.2s ease-out, transform 0.2s ease-out',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#c44800'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#d95000'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Get in Touch
          </a>
          <div className="hero-scroll-hint" style={{
            position: 'absolute',
            bottom: 40,
            fontFamily: 'var(--font-body)',
            fontSize: '0.625rem',
            color: 'rgba(0, 0, 0, 0.35)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            opacity: 0,
          }}>
            Scroll to explore
          </div>
        </div>

        {/* Corner label — title shrinks into top-left during Act 1→2 transition */}
        {(() => {
          // Transition zone: progress 0.10 → 0.18
          const t = Math.max(0, Math.min(1, (progress - 0.03) / 0.06));
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
                AI in Education
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
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center',
              justifyContent: isMobile ? 'center' : 'flex-start',
              opacity,
              pointerEvents: opacity > 0 ? 'auto' : 'none',
              transition: 'opacity 0.15s ease-out',
              padding: isMobile ? '60px 20px 20px' : 0,
              gap: isMobile ? 16 : 0,
            }}>
              {/* Text content */}
              <div style={{
                flex: isMobile ? '0 0 auto' : '0 0 45%',
                padding: isMobile ? 0 : '40px 40px 40px 80px',
                maxWidth: isMobile ? '100%' : 520,
                transform: `translateY(${opacity < 0.5 ? 20 : 0}px)`,
                transition: 'transform 0.4s ease-out',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 900,
                  color: '#d95000',
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: -6,
                }}>{chapter.num}</span>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: isMobile ? '1.5rem' : 'clamp(1.5rem, 3.5vw, 2.5rem)',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  marginBottom: isMobile ? 10 : 16,
                }}>{chapter.title}</h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: isMobile ? '0.8125rem' : '0.9375rem',
                  color: '#555',
                  lineHeight: 1.6,
                  marginBottom: isMobile ? 12 : 20,
                  display: isMobile ? '-webkit-box' : 'block',
                  WebkitLineClamp: isMobile ? 4 : 'unset',
                  WebkitBoxOrient: 'vertical',
                  overflow: isMobile ? 'hidden' : 'visible',
                }}>{chapter.desc}</p>

                {/* Before / After */}
                <div style={{
                  padding: isMobile ? '12px 16px' : '16px 20px',
                  background: 'rgba(255,255,255,0.7)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  fontFamily: 'var(--font-body)',
                  fontSize: isMobile ? '0.75rem' : '0.8125rem',
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

              {/* Video demo */}
              <div style={{
                flex: isMobile ? '1 1 0' : 1,
                minHeight: isMobile ? 0 : 'auto',
                height: isMobile ? 'auto' : '70%',
                padding: isMobile ? 0 : '0 60px 0 20px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '100%',
                  height: isMobile ? '100%' : '100%',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-subtle)',
                  background: 'rgba(255,255,255,0.5)',
                  position: 'relative',
                  boxShadow: 'var(--shadow-lg)',
                  aspectRatio: isMobile ? '16/10' : 'auto',
                }}>
                  <ChapterVideo src={chapter.videoSrc} poster={chapter.posterSrc} active={opacity > 0.5} title={chapter.title} />
                  {/* Bottom gradient to hide baked-in video text */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: isMobile ? 80 : 120,
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
            padding: isMobile ? '28px 20px' : '40px 48px',
            maxWidth: 960,
            width: isMobile ? 'calc(100% - 40px)' : '100%',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#d95000',
              marginBottom: isMobile ? 20 : 32,
              textAlign: 'center',
            }}>The Numbers</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
              gap: isMobile ? 20 : 32,
            }}>
              {[
                { value: '80%', label: 'Less Marking Time' },
                { value: '5→0', label: 'Day Feedback Wait' },
                { value: '14', label: 'Interactive Tools' },
                { value: '0', label: 'Bias in Marking' },
                { value: '1', label: 'Teacher. No Dev Team' },
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

        {/* Chapter Nav — left sidebar (hidden on mobile) */}
        {!isMobile && (
          <ChapterNavInline progress={progress} activeChapter={activeChapter} visible={act === 2} />
        )}

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
    <nav aria-label="Feature sections" style={{
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
                height: `${i < activeChapter ? 100 : i === activeChapter ? Math.min(100, Math.max(0, ((progress - 0.07 - i * 0.146) / 0.146) * 100)) : 0}%`,
                background: '#d95000',
                transition: 'height 0.15s linear',
              }} />
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
