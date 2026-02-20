'use client';

import { useRef, useEffect, useState } from 'react';
import {
  EyeOff, Brain, RefreshCw, Users,
  Upload, Settings, Sparkles,
  Check, ArrowRight, Mail,
} from 'lucide-react';

// ─── Reveal hook (matches portfolio pattern) ───

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Stat counter animation ───

function AnimatedStat({ value, suffix = '', visible }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [visible, value]);
  return <>{count}{suffix}</>;
}

// ─── Page ───

export default function MarkWisePage() {
  const [painRef, painVisible] = useReveal();
  const [featRef, featVisible] = useReveal();
  const [howRef, howVisible] = useReveal();
  const [pricingRef, pricingVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  return (
    <main>

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section style={{
        background: 'var(--bg-void)',
        padding: '120px 16px 80px',
        textAlign: 'center',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: '#d95000',
            marginBottom: 24,
          }}>AI-Powered Marking for Teachers</p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 900,
            color: '#1a1a1a',
            textTransform: 'uppercase',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: 32,
          }}>MarkWise</h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
            lineHeight: 1.6,
            color: '#555',
            maxWidth: 580,
            margin: '0 auto 48px',
          }}>
            Upload your class. Configure your mark scheme. Let AI handle the marking
            you don&apos;t have time for &mdash; with blind marking built in.
          </p>

          <div style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <a href="#waitlist" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 32px',
              background: '#d95000',
              color: '#fff',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              fontWeight: 500,
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              transition: 'background 0.2s ease-out',
              border: 'none',
              cursor: 'pointer',
            }}>
              Join the Waitlist
              <ArrowRight size={16} strokeWidth={2} />
            </a>
            <a href="#how-it-works" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 32px',
              background: 'transparent',
              color: '#1a1a1a',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              fontWeight: 500,
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease-out',
            }}>
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PAIN POINT — Stats
          ═══════════════════════════════════════════ */}
      <section style={{
        background: '#ffffff',
        padding: '80px 16px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: -60,
          left: 0,
          right: 0,
          height: 60,
          background: 'linear-gradient(to bottom, #f0eeeb, #ffffff)',
          pointerEvents: 'none',
        }} />

        <div ref={painRef} style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#d95000',
            marginBottom: 16,
            opacity: painVisible ? 1 : 0,
            transform: painVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s var(--ease-out)',
          }}>The Problem</p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            fontWeight: 900,
            color: '#1a1a1a',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 48,
            opacity: painVisible ? 1 : 0,
            transform: painVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s var(--ease-out) 0.1s',
          }}>Marking doesn&apos;t scale</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 32,
          }}>
            {[
              { value: 50, suffix: '+', label: 'hours per week for the average UK teacher' },
              { value: 31, suffix: '%', label: 'of that time spent on marking and admin' },
              { value: 6, suffix: 'hrs', label: 'you could save per assessment cycle' },
            ].map((stat, i) => (
              <div key={i} style={{
                opacity: painVisible ? 1 : 0,
                transform: painVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s var(--ease-out) ${0.2 + i * 0.15}s`,
              }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                  fontWeight: 900,
                  color: '#d95000',
                  lineHeight: 1,
                  marginBottom: 8,
                }}>
                  <AnimatedStat value={stat.value} suffix={stat.suffix} visible={painVisible} />
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  color: '#777',
                  lineHeight: 1.5,
                }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES — The 4 pillars
          ═══════════════════════════════════════════ */}
      <section style={{
        background: '#ffffff',
        padding: '20px 16px 80px',
      }}>
        <div ref={featRef} style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#d95000',
            marginBottom: 16,
            opacity: featVisible ? 1 : 0,
            transform: featVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s var(--ease-out)',
          }}>What Makes It Different</p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            fontWeight: 900,
            color: '#1a1a1a',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 48,
            opacity: featVisible ? 1 : 0,
            transform: featVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s var(--ease-out) 0.1s',
          }}>Built by a teacher, for teachers</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                icon: EyeOff,
                bold: 'Blind marking as standard',
                rest: ' \u2014 anonymous student IDs remove unconscious bias. You mark the work, not the name.',
              },
              {
                icon: Brain,
                bold: 'AI marks what it can',
                rest: ' \u2014 MCQs, calculations, and keyword questions are marked instantly against your mark scheme. You focus on the questions that need a human.',
              },
              {
                icon: RefreshCw,
                bold: 'Live two-way sync',
                rest: ' \u2014 marks entered in the app or your spreadsheet converge into one source of truth. No more copy-pasting between systems.',
              },
              {
                icon: Users,
                bold: 'Department-ready from day one',
                rest: ' \u2014 shared data across teachers, consistent marking standards, and a single view of student progress for leadership.',
              },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                background: 'rgba(0,0,0,0.03)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px',
                border: '1px solid var(--border-subtle)',
                opacity: featVisible ? 1 : 0,
                transform: featVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: `all 0.5s var(--ease-out) ${0.2 + i * 0.1}s`,
              }}>
                <div style={{
                  flexShrink: 0, width: 40, height: 40,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(217, 80, 0, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <item.icon size={20} color="#d95000" strokeWidth={1.5} />
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.6,
                  color: '#1a1a1a',
                }}>
                  <span style={{ fontWeight: 700 }}>{item.bold}</span>
                  <span style={{ fontWeight: 400, color: '#666' }}>{item.rest}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS — 3 steps
          ═══════════════════════════════════════════ */}
      <section id="how-it-works" style={{
        background: 'var(--bg-void)',
        padding: '80px 16px',
      }}>
        <div ref={howRef} style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#d95000',
            marginBottom: 16,
            opacity: howVisible ? 1 : 0,
            transform: howVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s var(--ease-out)',
          }}>How It Works</p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            fontWeight: 900,
            color: '#1a1a1a',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 48,
            opacity: howVisible ? 1 : 0,
            transform: howVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s var(--ease-out) 0.1s',
          }}>Three steps to smarter marking</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              {
                icon: Upload,
                num: '01',
                title: 'Upload your class',
                desc: 'Import a CSV of your students \u2014 or start fresh. Student identities are anonymised automatically for blind marking.',
              },
              {
                icon: Settings,
                num: '02',
                title: 'Configure your mark scheme',
                desc: 'Set up MCQ answers, keyword lists, mark allocations, and grading boundaries. Templates available for common exam boards.',
              },
              {
                icon: Sparkles,
                num: '03',
                title: 'Mark and review',
                desc: 'AI handles the mechanical marking. You review flagged responses, add feedback where it matters, and export results.',
              },
            ].map((step, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 24,
                alignItems: 'flex-start',
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '32px 28px',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                opacity: howVisible ? 1 : 0,
                transform: howVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s var(--ease-out) ${0.2 + i * 0.15}s`,
              }}>
                <div style={{
                  flexShrink: 0, width: 48, height: 48,
                  borderRadius: 'var(--radius-lg)',
                  background: '#d95000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: '#ffffff',
                  }}>{step.num}</span>
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.375rem',
                    fontWeight: 700,
                    color: '#1a1a1a',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}>{step.title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: '#666',
                  }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING
          ═══════════════════════════════════════════ */}
      <section style={{
        background: '#ffffff',
        padding: '80px 16px',
      }}>
        <div ref={pricingRef} style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#d95000',
            marginBottom: 16,
            textAlign: 'center',
            opacity: pricingVisible ? 1 : 0,
            transform: pricingVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s var(--ease-out)',
          }}>Pricing</p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            fontWeight: 900,
            color: '#1a1a1a',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 48,
            textAlign: 'center',
            opacity: pricingVisible ? 1 : 0,
            transform: pricingVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s var(--ease-out) 0.1s',
          }}>Less than a textbook set</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}>
            {/* Free tier */}
            <div style={{
              background: 'rgba(0,0,0,0.02)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px 28px',
              border: '1px solid var(--border-subtle)',
              opacity: pricingVisible ? 1 : 0,
              transform: pricingVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s var(--ease-out) 0.2s',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#999',
                marginBottom: 12,
              }}>Starter</p>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                fontWeight: 900,
                color: '#1a1a1a',
                lineHeight: 1,
                marginBottom: 4,
              }}>Free</p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#999',
                marginBottom: 28,
              }}>Try it with one class</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['1 class, up to 30 students', 'MCQ auto-marking', 'Blind marking', 'CSV export'].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Check size={16} color="#d95000" strokeWidth={2} />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      color: '#555',
                    }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro tier */}
            <div style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '36px 28px',
              border: '2px solid #d95000',
              position: 'relative',
              opacity: pricingVisible ? 1 : 0,
              transform: pricingVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s var(--ease-out) 0.3s',
            }}>
              <div style={{
                position: 'absolute',
                top: -12,
                left: 28,
                background: '#d95000',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                fontWeight: 500,
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>Most Popular</div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#d95000',
                marginBottom: 12,
              }}>Teacher</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#1a1a1a',
                  lineHeight: 1,
                }}>&pound;9.99</p>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: '#999',
                }}>/month</span>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#999',
                marginBottom: 28,
              }}>or &pound;79/year (save 34%)</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Unlimited classes',
                  'AI marking (MCQ + keyword + written)',
                  'Blind marking',
                  'Live spreadsheet sync',
                  'Student feedback reports',
                ].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Check size={16} color="#d95000" strokeWidth={2} />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      color: '#555',
                    }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Department tier */}
            <div style={{
              background: 'rgba(0,0,0,0.02)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px 28px',
              border: '1px solid var(--border-subtle)',
              opacity: pricingVisible ? 1 : 0,
              transform: pricingVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s var(--ease-out) 0.4s',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#999',
                marginBottom: 12,
              }}>Department</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#1a1a1a',
                  lineHeight: 1,
                }}>&pound;249</p>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: '#999',
                }}>/year</span>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#999',
                marginBottom: 28,
              }}>Up to 6 teachers</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Everything in Teacher',
                  'Shared department data',
                  'Cross-teacher analytics',
                  'Priority support',
                  'Custom mark scheme templates',
                ].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Check size={16} color="#d95000" strokeWidth={2} />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      color: '#555',
                    }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — Waitlist
          ═══════════════════════════════════════════ */}
      <section id="waitlist" style={{
        background: 'var(--bg-void)',
        padding: '80px 16px',
      }}>
        <div ref={ctaRef} style={{
          maxWidth: 600,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#d95000',
            marginBottom: 16,
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s var(--ease-out)',
          }}>Early Access</p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            fontWeight: 900,
            color: '#1a1a1a',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 20,
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s var(--ease-out) 0.1s',
          }}>Get on the list</h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            lineHeight: 1.7,
            color: '#666',
            marginBottom: 40,
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s var(--ease-out) 0.2s',
          }}>
            MarkWise launches soon. Join the waitlist to get early access and shape the
            product with your feedback. Free for early adopters.
          </p>

          <a
            href="mailto:markwise@mikelehnert.com?subject=MarkWise%20Waitlist&body=I%27d%20like%20early%20access%20to%20MarkWise.%0A%0ASubject%20I%20teach%3A%20%0AExam%20board%3A%20%0ASchool%3A%20"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '16px 36px',
              background: '#d95000',
              color: '#fff',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 500,
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              transition: 'background 0.2s ease-out',
              border: 'none',
              cursor: 'pointer',
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'all 0.6s var(--ease-out) 0.3s',
            }}
          >
            <Mail size={18} strokeWidth={1.5} />
            Join the Waitlist
          </a>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: '#aaa',
            marginTop: 20,
            opacity: ctaVisible ? 1 : 0,
            transition: 'opacity 0.6s var(--ease-out) 0.4s',
          }}>No spam. Just early access and product updates.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer style={{
        background: '#d95000',
        padding: '48px 16px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 900,
          color: '#ffffff',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginBottom: 12,
          letterSpacing: '-0.02em',
        }}>MarkWise</p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          marginBottom: 20,
        }}>
          AI-powered marking &middot; Built by a teacher
        </p>
        <div style={{
          width: 40,
          height: 2,
          background: 'rgba(255, 255, 255, 0.3)',
          margin: '0 auto 16px',
          borderRadius: 1,
        }} />
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'rgba(255, 255, 255, 0.4)',
        }}>
          A{' '}
          <a
            href="/"
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(255, 255, 255, 0.3)',
              textUnderlineOffset: 4,
            }}
          >Mike Lehnert</a>
          {' '}project &middot; {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
