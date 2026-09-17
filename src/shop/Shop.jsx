function Shop() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: '#020817',
      color: '#e2e8f0',
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      <div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Shop</h1>
        <p style={{ fontSize: '1.05rem', opacity: 0.8 }}>
          The storefront is being prepared. Check back soon.
        </p>
      </div>
    </div>
  );
}

export default Shop;
