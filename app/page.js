'use client';

import { useRef, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import {
  MessageCircle, Zap, Users, Lightbulb,
  TrendingUp, DollarSign, Shield, Linkedin, Mail,
} from 'lucide-react';
import ScrollHero from '@/components/ScrollHero';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9375rem',
    color: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.2s ease-out',
  };

  return (
    <section style={{
      background: '#1a1a1a',
      padding: '80px 16px',
    }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.6875rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#d95000',
          marginBottom: 16,
          textAlign: 'center',
        }}>Get in Touch</p>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 5vw, 3rem)',
          fontWeight: 900,
          color: '#ffffff',
          textTransform: 'uppercase',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          marginBottom: 20,
          textAlign: 'center',
        }}>Interested in what AI<br />can do for your school?</h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.0625rem',
          lineHeight: 1.7,
          color: 'rgba(255, 255, 255, 0.6)',
          marginBottom: 40,
          textAlign: 'center',
        }}>
          Whether it&apos;s a half-day workshop, a department pilot, or just a conversation about where to start
        </p>

        {status === 'sent' ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            background: 'rgba(217, 80, 0, 0.1)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(217, 80, 0, 0.2)',
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: 8,
            }}>Message sent</p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: 'rgba(255, 255, 255, 0.6)',
            }}>I&apos;ll get back to you soon</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <input
                type="text"
                placeholder="Your name"
                required
                value={form.name}
                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'rgba(217, 80, 0, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
              />
              <input
                type="email"
                placeholder="Your email"
                required
                value={form.email}
                onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'rgba(217, 80, 0, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
              />
            </div>
            <textarea
              placeholder="Tell me about your school and what you're looking for"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
              style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(217, 80, 0, 0.5)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
            />
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '14px 32px',
                  background: status === 'sending' ? '#a03800' : '#d95000',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  cursor: status === 'sending' ? 'wait' : 'pointer',
                  letterSpacing: '0.02em',
                  transition: 'background 0.2s ease-out, transform 0.2s ease-out',
                }}
                onMouseEnter={(e) => { if (status !== 'sending') { e.currentTarget.style.background = '#c44800'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                onMouseLeave={(e) => { e.currentTarget.style.background = status === 'sending' ? '#a03800' : '#d95000'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Mail size={18} strokeWidth={1.5} />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              <a
                href="https://www.linkedin.com/in/michael-lehnert-9a784790/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '14px 24px',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  transition: 'border-color 0.2s ease-out, color 0.2s ease-out',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'; e.currentTarget.style.color = '#ffffff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'; }}
              >
                <Linkedin size={18} strokeWidth={1.5} />
                LinkedIn
              </a>
            </div>
            {status === 'error' && (
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: '#ef4444',
              }}>Something went wrong. Please try again or connect on LinkedIn</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

const WaveformScene = dynamic(() => import('@/components/WaveformScene'), {
  ssr: false,
  loading: () => (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: '#f0eeeb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 120,
        height: 2,
        background: 'linear-gradient(90deg, transparent, #d95000, transparent)',
        borderRadius: 1,
        animation: 'pulse 2s ease-in-out infinite',
      }} />
    </div>
  ),
});

// ─── Reveal hook for Act 4 sections ───

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

// ─── Page ───

export default function Home() {
  const [approachRef, approachVisible] = useReveal();
  const [bigPicRef, bigPicVisible] = useReveal();

  return (
    <main>
      {/* ═══════════════════════════════════════════
          ACTS 1-3 — Pinned scroll hero
          ═══════════════════════════════════════════ */}
      <ScrollHero>
        {(progress) => <WaveformScene progress={progress} />}
      </ScrollHero>

      {/* ═══════════════════════════════════════════
          ACT 4: THE VISION — Normal scroll, unpinned
          ═══════════════════════════════════════════ */}

      {/* The Approach */}
      <section style={{
        background: '#ffffff',
        padding: '80px 16px',
        position: 'relative',
      }}>
        {/* Top gradient transition from void to surface */}
        <div style={{
          position: 'absolute',
          top: -80,
          left: 0,
          right: 0,
          height: 80,
          background: 'linear-gradient(to bottom, #f0eeeb, #ffffff)',
          pointerEvents: 'none',
        }} />

        <div ref={approachRef} style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#d95000',
            marginBottom: 16,
            opacity: approachVisible ? 1 : 0,
            transform: approachVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s var(--ease-out)',
          }}>The Approach</p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            fontWeight: 900,
            color: '#1a1a1a',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 48,
            opacity: approachVisible ? 1 : 0,
            transform: approachVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s var(--ease-out) 0.1s',
          }}>Built with AI, not an engineering team</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: MessageCircle, bold: 'Built using Claude Code', rest: ' — a conversational AI coding assistant. You describe what the tool should do in plain English, and it writes production-ready code' },
              { icon: Zap, bold: 'Rapid iteration with real students', rest: ' — build a prototype in the morning, test it in the afternoon lesson, refine based on what actually happened in the room' },
              { icon: Users, bold: 'No engineering team, no budget, no procurement', rest: ' — just one classroom teacher who understands the problems students face every day' },
              { icon: Lightbulb, bold: 'Domain expertise is the superpower', rest: ' — AI handles the code, but knowing which pedagogical problems to solve and how students learn is what makes the tools effective' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                background: 'rgba(0,0,0,0.03)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px',
                border: '1px solid var(--border-subtle)',
                opacity: approachVisible ? 1 : 0,
                transform: approachVisible ? 'translateY(0)' : 'translateY(16px)',
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
                  fontSize: '1.125rem',
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

      {/* The Bigger Picture */}
      <section style={{
        background: '#ffffff',
        padding: '60px 16px 80px',
      }}>
        <div ref={bigPicRef} style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#d95000',
            marginBottom: 16,
            opacity: bigPicVisible ? 1 : 0,
            transform: bigPicVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s var(--ease-out)',
          }}>The Bigger Picture</p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            fontWeight: 900,
            color: '#1a1a1a',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 32,
            opacity: bigPicVisible ? 1 : 0,
            transform: bigPicVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s var(--ease-out) 0.1s',
          }}>What this means for schools</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                icon: TrendingUp,
                title: 'Scalability',
                bold: 'Serve an entire department, not just one teacher',
                rest: ' — the same platform handles any subject with exam-style questions and mark schemes',
              },
              {
                icon: DollarSign,
                title: 'Cost',
                bold: 'Less than a single textbook set per year',
                rest: ' — no expensive licenses, no per-seat fees, no procurement process',
              },
              {
                icon: Users,
                title: 'Data-Driven Insights',
                bold: 'Real-time visibility for everyone',
                rest: ' — teachers, students, parents and leadership see progress instantly, not at parents\' evening',
              },
              {
                icon: Shield,
                title: 'Fairness & Equity',
                bold: 'Blind marking removes unconscious bias',
                rest: ' — consistent AI feedback means every student gets the same quality, regardless of who marks their work',
              },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 24,
                padding: '28px 24px',
                borderRadius: 'var(--radius-lg)',
                opacity: bigPicVisible ? 1 : 0,
                transform: bigPicVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: `all 0.5s var(--ease-out) ${0.2 + i * 0.1}s`,
              }}>
                <div style={{
                  flexShrink: 0, width: 48, height: 48,
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(217, 80, 0, 0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <item.icon size={22} color="#d95000" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.375rem',
                    fontWeight: 700,
                    color: '#1a1a1a',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}>{item.title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.0625rem',
                    lineHeight: 1.7,
                  }}>
                    <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{item.bold}</span>
                    <span style={{ fontWeight: 400, color: '#666' }}>{item.rest}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — Let's Talk (Resend contact form)
          ═══════════════════════════════════════════ */}
      <div id="contact">
        <ContactSection />
      </div>

      {/* ═══════════════════════════════════════════
          ABOUT — Bio section for E-E-A-T
          ═══════════════════════════════════════════ */}
      <section style={{
        background: '#f0eeeb',
        padding: '80px 16px',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#d95000',
            marginBottom: 16,
          }}>About</p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            fontWeight: 900,
            color: '#1a1a1a',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 32,
          }}>Mike Lehnert</h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            lineHeight: 1.8,
            color: '#333',
            marginBottom: 20,
          }}>
            Music technology teacher. AI tool builder. Helping educators figure out what actually works.
          </p>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            lineHeight: 1.8,
            color: '#555',
            marginBottom: 20,
          }}>
            After 20 years in the classroom — in schools, at Leeds Conservatoire, as a Pearson examiner — I started using generative AI seriously about three years ago. More recently, I&apos;ve been building tools with Claude Code, Obsidian, Gemini, and NotebookLM. My approach is to use multiple AI systems rather than locking into one — different tools for different jobs.
          </p>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            lineHeight: 1.8,
            color: '#555',
            marginBottom: 20,
          }}>
            I&apos;ve built an Obsidian vault system for organising teaching materials, developed grading and feedback tools, and created interactive resources for A-Level Music Technology. I&apos;ve documented this work on YouTube to help other educators explore what&apos;s possible.
          </p>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            lineHeight: 1.8,
            color: '#555',
            marginBottom: 20,
          }}>
            What I&apos;ve found is that AI works best when it walks alongside you as a teaching assistant — not doing the work for you, but helping with the repetitive stuff so you can focus on actual teaching.
          </p>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            lineHeight: 1.8,
            color: '#555',
            marginBottom: 32,
          }}>
            Schools need help figuring this out. Most AI advice is either too abstract or comes from people who haven&apos;t been in a classroom recently. I&apos;m still teaching daily, so I know what actually works and what doesn&apos;t.
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 24,
          }}>
            {[
              { label: 'MIE Expert', href: 'https://education.microsoft.com/en-us' },
              { label: 'Apple Certified Teacher', href: 'https://education.apple.com' },
              { label: 'Pearson Examiner', href: 'https://qualifications.pearson.com/en/about-us/qualification-brands/edexcel.html' },
              { label: '20 Years Teaching', href: null },
            ].map((tag) => {
              const style = {
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#d95000',
                background: 'rgba(217, 80, 0, 0.08)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                letterSpacing: '0.02em',
                textDecoration: 'none',
              };
              return tag.href ? (
                <a key={tag.label} href={tag.href} target="_blank" rel="noopener noreferrer" style={style}>
                  {tag.label}
                </a>
              ) : (
                <span key={tag.label} style={style}>{tag.label}</span>
              );
            })}
          </div>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            color: '#888',
            fontStyle: 'italic',
            marginBottom: 24,
          }}>
            Open to consulting, training, and collaboration with schools ready to integrate AI properly.
          </p>

          <a
            href="https://www.linkedin.com/in/michael-lehnert-9a784790/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect on LinkedIn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 20px',
              background: 'rgba(217, 80, 0, 0.08)',
              border: '1px solid rgba(217, 80, 0, 0.15)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#d95000',
              textDecoration: 'none',
              transition: 'background 0.2s ease-out',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(217, 80, 0, 0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(217, 80, 0, 0.08)'}
          >
            <Linkedin size={18} strokeWidth={1.5} />
            Connect on LinkedIn
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER — Bold lime editorial punch
          ═══════════════════════════════════════════ */}
      <footer style={{
        background: '#d95000',
        padding: '60px 16px',
        textAlign: 'center',
        position: 'relative',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          fontWeight: 900,
          color: '#ffffff',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginBottom: 16,
          letterSpacing: '-0.02em',
        }}>Michael Lehnert</p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.7)',
          letterSpacing: '0.04em',
        }}>
          Music Technology &middot; A-Level &middot; Digital Innovation
        </p>
        <a
          href="https://www.linkedin.com/in/michael-lehnert-9a784790/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 24,
            width: 48,
            height: 48,
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            color: '#ffffff',
            textDecoration: 'none',
            transition: 'background 0.2s ease-out',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
        >
          <Linkedin size={20} strokeWidth={1.5} />
        </a>
        <div style={{
          width: 40,
          height: 2,
          background: 'rgba(255, 255, 255, 0.3)',
          margin: '32px auto 16px',
          borderRadius: 1,
        }} />
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'rgba(255, 255, 255, 0.5)',
          letterSpacing: '0.02em',
        }}>
          <a
            href="https://claude.ai/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(255, 255, 255, 0.3)',
              textUnderlineOffset: 4,
            }}
          >
            Built with Claude Code
          </a>
          {' '}&middot;{' '}
          <a
            href="/services"
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(255, 255, 255, 0.3)',
              textUnderlineOffset: 4,
            }}
          >
            Services
          </a>
          {' '}&middot;{' '}
          <a
            href="/privacy"
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(255, 255, 255, 0.3)',
              textUnderlineOffset: 4,
            }}
          >
            Privacy
          </a>
          {' '}&middot; {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
