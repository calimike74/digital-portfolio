import {
  FileSpreadsheet,
  Clock,
  MessageSquareX,
  MousePointerClick,
  UserX,
  Bot,
  EyeOff,
  RefreshCw,
  Sliders,
  GraduationCap,
  TrendingUp,
  DollarSign,
  Users,
  Shield,
  Lightbulb,
  MessageCircle,
  Zap,
} from "lucide-react";

const COLORS = {
  bg: "#f5f4f2",
  navy: "#1a1a2e",
  accent: "#FF6B35",
  accentLight: "rgba(255, 107, 53, 0.08)",
  accentMid: "rgba(255, 107, 53, 0.15)",
  white: "#ffffff",
  muted: "#6b7280",
  border: "rgba(26, 26, 46, 0.08)",
};

function ProblemItem({ icon: Icon, text }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 16,
      padding: "16px 0",
    }}>
      <div style={{
        flexShrink: 0,
        width: 40,
        height: 40,
        borderRadius: 10,
        background: "rgba(255, 107, 53, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Icon size={20} color={COLORS.accent} />
      </div>
      <p style={{
        fontSize: 17,
        lineHeight: 1.6,
        color: COLORS.navy,
        paddingTop: 8,
      }}>{text}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, before, after }) {
  return (
    <div style={{
      background: COLORS.white,
      borderRadius: 16,
      padding: "32px 28px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
      border: `1px solid ${COLORS.border}`,
      display: "flex",
      flexDirection: "column",
      gap: 16,
    }}>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: COLORS.accentLight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Icon size={24} color={COLORS.accent} />
      </div>
      <h3 style={{
        fontSize: 20,
        fontWeight: 600,
        color: COLORS.navy,
        lineHeight: 1.3,
      }}>{title}</h3>
      <p style={{
        fontSize: 16,
        lineHeight: 1.65,
        color: COLORS.muted,
      }}>{description}</p>
      {before && after && (
        <div style={{
          marginTop: 4,
          padding: "14px 18px",
          background: COLORS.bg,
          borderRadius: 10,
          fontSize: 14,
          lineHeight: 1.6,
        }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <span style={{ color: "#d4543a", fontWeight: 600 }}>Before:</span>
            <span style={{ color: COLORS.muted }}>{before}</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ color: "#2d8a4e", fontWeight: 600 }}>After:</span>
            <span style={{ color: COLORS.navy }}>{after}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function StatItem({ value, label }) {
  return (
    <div style={{ textAlign: "center", padding: "24px 16px" }}>
      <div style={{
        fontSize: 36,
        fontWeight: 700,
        color: COLORS.accent,
        lineHeight: 1.1,
        marginBottom: 8,
      }}>{value}</div>
      <div style={{
        fontSize: 14,
        color: COLORS.muted,
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}>{label}</div>
    </div>
  );
}

function ValueCard({ icon: Icon, title, description }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 20,
      padding: "24px 0",
    }}>
      <div style={{
        flexShrink: 0,
        width: 44,
        height: 44,
        borderRadius: 11,
        background: COLORS.accentLight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Icon size={22} color={COLORS.accent} />
      </div>
      <div>
        <h4 style={{
          fontSize: 18,
          fontWeight: 600,
          color: COLORS.navy,
          marginBottom: 6,
        }}>{title}</h4>
        <p style={{
          fontSize: 16,
          lineHeight: 1.6,
          color: COLORS.muted,
        }}>{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      {/* ── Hero ── */}
      <section style={{
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, #2d2b55 100%)`,
        padding: "80px 24px 72px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle decorative circle */}
        <div style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255, 107, 53, 0.06)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          bottom: -60,
          left: -40,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(255, 107, 53, 0.04)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
          <div style={{
            display: "inline-block",
            padding: "6px 16px",
            background: "rgba(255, 107, 53, 0.15)",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.accent,
            letterSpacing: "0.03em",
            marginBottom: 24,
            textTransform: "uppercase",
          }}>
            Digital Lead Portfolio
          </div>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700,
            color: COLORS.white,
            lineHeight: 1.15,
            marginBottom: 20,
            letterSpacing: "-0.02em",
          }}>
            AI-Powered Music Technology Education
          </h1>
          <p style={{
            fontSize: "clamp(17px, 2.5vw, 20px)",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.6,
            maxWidth: 560,
            margin: "0 auto",
          }}>
            How one teacher built a complete learning platform using AI tools
          </p>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "72px 24px 56px",
      }}>
        <h2 style={{
          fontSize: 14,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: COLORS.accent,
          marginBottom: 12,
        }}>The Challenge</h2>
        <h3 style={{
          fontSize: "clamp(24px, 3.5vw, 32px)",
          fontWeight: 700,
          color: COLORS.navy,
          lineHeight: 1.25,
          marginBottom: 32,
          letterSpacing: "-0.01em",
        }}>
          Every teacher knows these problems
        </h3>
        <ProblemItem
          icon={FileSpreadsheet}
          text="Grades tracked across disconnected spreadsheets that nobody else can access"
        />
        <ProblemItem
          icon={Clock}
          text="Hours spent manually marking every question for every student, every week"
        />
        <ProblemItem
          icon={MessageSquareX}
          text="Students waiting days for feedback, by which point they've moved on"
        />
        <ProblemItem
          icon={MousePointerClick}
          text="No way for students to practise exam-style questions interactively"
        />
        <ProblemItem
          icon={UserX}
          text="Unconscious bias when you recognise handwriting or know who's struggling"
        />
      </section>

      {/* ── Divider ── */}
      <div style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "0 24px",
      }}>
        <div style={{
          height: 1,
          background: `linear-gradient(to right, transparent, ${COLORS.border}, transparent)`,
        }} />
      </div>

      {/* ── The Solution ── */}
      <section style={{
        maxWidth: 1080,
        margin: "0 auto",
        padding: "64px 24px",
      }}>
        <div style={{ maxWidth: 720, marginBottom: 40 }}>
          <h2 style={{
            fontSize: 14,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: COLORS.accent,
            marginBottom: 12,
          }}>What Was Built</h2>
          <h3 style={{
            fontSize: "clamp(24px, 3.5vw, 32px)",
            fontWeight: 700,
            color: COLORS.navy,
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}>
            A complete platform, built by one teacher
          </h3>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          gap: 24,
        }}>
          <FeatureCard
            icon={Bot}
            title="AI-Powered Marking"
            description="AI marks multiple-choice questions, calculations, and written responses against official mark schemes. Students get instant, structured feedback instead of waiting days."
            before="Mark 30 papers by hand over a weekend"
            after="AI marks and gives feedback in seconds"
          />
          <FeatureCard
            icon={EyeOff}
            title="Blind Marking"
            description="Anonymous student IDs hide identity during marking, removing unconscious bias. The system reveals who wrote what only after marks are finalised."
            before="Recognise handwriting, adjust expectations"
            after="Mark the work, not the student"
          />
          <FeatureCard
            icon={RefreshCw}
            title="Live Data Sync"
            description="Grades entered in a spreadsheet automatically appear in the student portal. Marks submitted online sync back to the spreadsheet. Two-way, zero clicks."
            before="Copy marks between 3 different systems"
            after="Enter once, available everywhere"
          />
          <FeatureCard
            icon={Sliders}
            title="Interactive Learning Tools"
            description="14 interactive resources where students learn by doing — building synth patches, shaping EQ curves, hearing compression in real time. Not videos. Not PDFs. Real tools."
            before="Watch a video, hope they remember"
            after="Build it, hear it, understand it"
          />
          <FeatureCard
            icon={GraduationCap}
            title="Student Revision Hub"
            description="AI-marked quizzes across 6 topics with progress tracking. Students see exactly what they know and what they need to work on, with targeted feedback on every answer."
            before="Revise everything and hope for the best"
            after="Focus on what you actually need to learn"
          />
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{
        background: COLORS.white,
        borderTop: `1px solid ${COLORS.border}`,
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <div style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "16px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 8,
        }}>
          <StatItem value="4" label="Live Websites" />
          <StatItem value="14" label="Interactive Tools" />
          <StatItem value="3" label="AI Marking Systems" />
          <StatItem value="6" label="Revision Topics" />
          <StatItem value="~6 weeks" label="Build Time" />
        </div>
      </section>

      {/* ── The Approach ── */}
      <section style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "72px 24px",
      }}>
        <h2 style={{
          fontSize: 14,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: COLORS.accent,
          marginBottom: 12,
        }}>The Approach</h2>
        <h3 style={{
          fontSize: "clamp(24px, 3.5vw, 32px)",
          fontWeight: 700,
          color: COLORS.navy,
          lineHeight: 1.25,
          marginBottom: 32,
          letterSpacing: "-0.01em",
        }}>
          Built with AI, not an engineering team
        </h3>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}>
          {[
            {
              icon: MessageCircle,
              text: "Built using Claude Code — an AI coding assistant you talk to in plain English",
            },
            {
              icon: Zap,
              text: "Describe what you want. The AI writes the code. Test it with students. Refine.",
            },
            {
              icon: Users,
              text: "No engineering team. No funding. One teacher who knows their subject.",
            },
            {
              icon: Lightbulb,
              text: "If you know your domain deeply, AI can help you build the tools your students need.",
            },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              background: COLORS.white,
              borderRadius: 12,
              padding: "20px 24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              border: `1px solid ${COLORS.border}`,
            }}>
              <item.icon
                size={20}
                color={COLORS.accent}
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <p style={{
                fontSize: 17,
                lineHeight: 1.6,
                color: COLORS.navy,
              }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "0 24px",
      }}>
        <div style={{
          height: 1,
          background: `linear-gradient(to right, transparent, ${COLORS.border}, transparent)`,
        }} />
      </div>

      {/* ── What This Means for Schools ── */}
      <section style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "72px 24px",
      }}>
        <h2 style={{
          fontSize: 14,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: COLORS.accent,
          marginBottom: 12,
        }}>The Bigger Picture</h2>
        <h3 style={{
          fontSize: "clamp(24px, 3.5vw, 32px)",
          fontWeight: 700,
          color: COLORS.navy,
          lineHeight: 1.25,
          marginBottom: 36,
          letterSpacing: "-0.01em",
        }}>
          What this means for schools
        </h3>

        <ValueCard
          icon={TrendingUp}
          title="Scalability"
          description="This system could serve an entire department, not just one teacher. The same platform handles any subject with exam-style questions and mark schemes."
        />
        <ValueCard
          icon={DollarSign}
          title="Cost"
          description="Running costs less than a single textbook set per year. No expensive licenses, no per-seat fees, no procurement process."
        />
        <ValueCard
          icon={Users}
          title="Data-Driven Insights"
          description="Real-time visibility for teachers, students, parents, and leadership. No more waiting until parents' evening to spot a struggling student."
        />
        <ValueCard
          icon={Shield}
          title="Fairness & Equity"
          description="Blind marking and consistent AI feedback reduce bias and improve equity. Every student gets the same quality of feedback, regardless of who marks their work."
        />
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: `1px solid ${COLORS.border}`,
        padding: "40px 24px",
        textAlign: "center",
      }}>
        <p style={{
          fontSize: 15,
          color: COLORS.muted,
          marginBottom: 8,
        }}>
          Mike Lehnert
        </p>
        <p style={{ fontSize: 13, color: COLORS.muted }}>
          <a
            href="https://claude.ai/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: COLORS.accent,
              textDecoration: "underline",
              textDecorationColor: "rgba(255, 107, 53, 0.3)",
              textUnderlineOffset: 3,
            }}
          >
            Built with Claude Code
          </a>
          {" "}&middot; {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
