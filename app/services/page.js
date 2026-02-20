export const metadata = {
  title: 'Services | Mike Lehnert — AI in Education Consulting',
  description: 'CPD workshops, department pilots, implementation support, and bespoke tool development for UK secondary schools integrating AI into teaching.',
};

const SERVICES = [
  {
    title: 'CPD Workshops',
    description: 'Half-day or full-day sessions introducing your staff to practical AI tools for teaching. No abstract theory — every activity uses real classroom scenarios with tools participants take away and use immediately.',
    includes: ['Hands-on AI tool walkthroughs', 'Marking automation demonstration', 'Interactive resource creation', 'Follow-up resource pack'],
    audience: 'Teaching staff, department heads, senior leadership',
  },
  {
    title: 'Department Pilots',
    description: 'A structured 6-week pilot with one department, building a working AI-assisted workflow from scratch. Includes weekly check-ins, tool configuration, and a final report showing measurable impact on marking time and student feedback quality.',
    includes: ['Initial needs assessment', 'Custom tool setup and configuration', 'Weekly coaching sessions', 'Impact report with data'],
    audience: 'Individual departments ready to trial AI integration',
  },
  {
    title: 'Implementation Support',
    description: 'For schools that want to move beyond a single department. I help design the rollout plan, train key staff, and build the infrastructure so AI tools scale across the school without becoming another abandoned initiative.',
    includes: ['Cross-department rollout strategy', 'Staff training programme', 'Data integration planning', 'Ongoing technical support'],
    audience: 'Schools committed to whole-school AI adoption',
  },
  {
    title: 'Bespoke Tool Development',
    description: 'Custom educational tools built to your exact specification — grading dashboards, interactive learning resources, revision platforms, or assessment hubs. Built with modern web technologies and designed for your curriculum.',
    includes: ['Requirements workshop', 'Iterative development with feedback', 'Student and teacher user testing', 'Deployment and documentation'],
    audience: 'Schools or MATs needing custom solutions',
  },
];

export default function ServicesPage() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        background: '#f0eeeb',
        padding: '80px 20px 60px',
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
          }}>Services</p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#1a1a1a',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 24,
          }}>How I work with schools</h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            lineHeight: 1.8,
            color: '#555',
            maxWidth: 560,
          }}>
            From a single CPD session to a full implementation programme — practical AI integration grounded in 20 years of classroom experience.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section style={{ padding: '60px 20px 80px' }}>
        <div style={{
          maxWidth: 720,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}>
          {SERVICES.map((service, i) => (
            <div key={i} style={{
              background: '#ffffff',
              border: '1px solid var(--border-subtle, rgba(0,0,0,0.08))',
              borderRadius: 'var(--radius-lg, 12px)',
              padding: '32px 28px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 900,
                color: '#d95000',
                lineHeight: 1,
                display: 'block',
                marginBottom: -2,
              }}>{String(i + 1).padStart(2, '0')}</span>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1a1a1a',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                marginBottom: 16,
              }}>{service.title}</h2>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#555',
                marginBottom: 20,
              }}>{service.description}</p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                marginBottom: 16,
              }}>
                {service.includes.map((item, j) => (
                  <span key={j} style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: '#d95000',
                    background: 'rgba(217, 80, 0, 0.08)',
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-md, 8px)',
                    letterSpacing: '0.02em',
                  }}>{item}</span>
                ))}
              </div>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: '#888',
              }}>
                <strong style={{ color: '#666' }}>For:</strong> {service.audience}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: '#1a1a1a',
        padding: '60px 20px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 900,
          color: '#ffffff',
          textTransform: 'uppercase',
          lineHeight: 1.05,
          marginBottom: 16,
        }}>Ready to get started?</h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.6)',
          marginBottom: 32,
          maxWidth: 480,
          margin: '0 auto 32px',
          lineHeight: 1.7,
        }}>
          Tell me about your school and what you need. Every engagement starts with a conversation.
        </p>
        <a href="/#contact" style={{
          display: 'inline-block',
          padding: '14px 32px',
          background: '#d95000',
          borderRadius: 'var(--radius-md, 8px)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: '#ffffff',
          textDecoration: 'none',
          letterSpacing: '0.02em',
        }}>Get in Touch</a>
      </section>

      {/* Back link */}
      <div style={{
        padding: '32px 20px',
        maxWidth: 720,
        margin: '0 auto',
      }}>
        <a href="/" style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: '#d95000',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}>&larr; Back to home</a>
      </div>
    </main>
  );
}
