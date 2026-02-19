'use client';

export default function ChapterNav({ progress, activeChapter, visible }) {
  const chapters = 5;

  return (
    <div style={{
      position: 'fixed',
      left: 24,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.5s ease-out',
      pointerEvents: 'none',
    }}>
      {Array.from({ length: chapters }, (_, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: i === activeChapter ? 600 : 400,
            color: i === activeChapter ? '#c8ff00' : '#333',
            letterSpacing: '0.05em',
            transition: 'color 0.3s ease-out',
            padding: '8px 0',
          }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          {i < chapters - 1 && (
            <div style={{
              width: 1,
              height: 24,
              background: '#1f1f1f',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${i < activeChapter ? 100 : i === activeChapter ? Math.min(100, Math.max(0, ((progress - 0.25 - i * 0.1) / 0.1) * 100)) : 0}%`,
                background: '#c8ff00',
                transition: 'height 0.15s linear',
              }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
