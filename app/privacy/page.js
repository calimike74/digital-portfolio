export const metadata = {
  title: 'Privacy Policy | Mike Lehnert',
  description: 'Privacy policy for lehnert-consulting.vercel.app — how we handle contact form data.',
};

export default function PrivacyPage() {
  return (
    <main style={{ background: '#f0eeeb', minHeight: '100vh' }}>
      <div style={{
        maxWidth: 680,
        margin: '0 auto',
        padding: '80px 20px',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.6875rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#d95000',
          marginBottom: 16,
        }}>Legal</p>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 900,
          color: '#1a1a1a',
          textTransform: 'uppercase',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          marginBottom: 48,
        }}>Privacy Policy</h1>

        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.0625rem',
          lineHeight: 1.8,
          color: '#333',
        }}>
          <p style={{ marginBottom: 16 }}>
            <strong>Last updated:</strong> February 2026
          </p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.375rem',
            fontWeight: 700,
            color: '#1a1a1a',
            marginTop: 40,
            marginBottom: 12,
          }}>What data we collect</h2>
          <p style={{ marginBottom: 16 }}>
            When you submit the contact form on this site, we collect your name, email address, and message content. No other personal data is collected. This site does not use cookies or tracking scripts.
          </p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.375rem',
            fontWeight: 700,
            color: '#1a1a1a',
            marginTop: 40,
            marginBottom: 12,
          }}>How we use it</h2>
          <p style={{ marginBottom: 16 }}>
            Your contact form submission is used solely to respond to your enquiry. We do not share your data with third parties, use it for marketing, or sell it.
          </p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.375rem',
            fontWeight: 700,
            color: '#1a1a1a',
            marginTop: 40,
            marginBottom: 12,
          }}>Email processing</h2>
          <p style={{ marginBottom: 16 }}>
            Contact form submissions are delivered via <a href="https://resend.com" target="_blank" rel="noopener noreferrer" style={{ color: '#d95000', textDecoration: 'underline', textUnderlineOffset: 4 }}>Resend</a>, a transactional email service. Resend processes your data in accordance with their privacy policy and GDPR obligations.
          </p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.375rem',
            fontWeight: 700,
            color: '#1a1a1a',
            marginTop: 40,
            marginBottom: 12,
          }}>Data storage and retention</h2>
          <p style={{ marginBottom: 16 }}>
            Your contact form data is stored as an email in our inbox. We retain it only as long as necessary to respond to your enquiry and maintain a record of our correspondence.
          </p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.375rem',
            fontWeight: 700,
            color: '#1a1a1a',
            marginTop: 40,
            marginBottom: 12,
          }}>Your rights</h2>
          <p style={{ marginBottom: 16 }}>
            Under UK GDPR, you have the right to:
          </p>
          <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
            <li style={{ marginBottom: 8 }}>Request access to the personal data we hold about you</li>
            <li style={{ marginBottom: 8 }}>Request correction or deletion of your data</li>
            <li style={{ marginBottom: 8 }}>Withdraw consent at any time</li>
          </ul>
          <p style={{ marginBottom: 16 }}>
            To exercise any of these rights, contact us using the form on the <a href="/" style={{ color: '#d95000', textDecoration: 'underline', textUnderlineOffset: 4 }}>home page</a>.
          </p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.375rem',
            fontWeight: 700,
            color: '#1a1a1a',
            marginTop: 40,
            marginBottom: 12,
          }}>Hosting</h2>
          <p style={{ marginBottom: 16 }}>
            This site is hosted on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#d95000', textDecoration: 'underline', textUnderlineOffset: 4 }}>Vercel</a>. Vercel may collect standard server logs (IP address, browser type, timestamps) as part of normal web hosting operations.
          </p>
        </div>

        <div style={{ marginTop: 48 }}>
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
      </div>
    </main>
  );
}
