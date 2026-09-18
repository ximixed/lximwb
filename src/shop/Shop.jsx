function Shop() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: '#ffffff',
      color: '#18181b',
      fontFamily: 'Inter, -apple-system, sans-serif',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '420px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Shop</h1>
        <p style={{ fontSize: '1rem', color: '#71717a', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          The storefront is currently being prepared. Check back soon for curated tools, presets, and digital assets.
        </p>
        <a
          href="#home"
          onClick={() => {
            window.location.hash = 'home';
            window.location.reload();
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.65rem 1.4rem',
            background: '#000000',
            color: '#ffffff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600',
          }}
        >
          ← Back to Portfolio
        </a>
      </div>
    </div>
  );
}

export default Shop;
