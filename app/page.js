export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>PDF Preview App</h1>
      <p>This is a static Next.js site to preview PDF files. The PDFs are stored in the <code>public/pdf/</code> directory.</p>
      
      <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #eaeaea', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <h2>Available PDFs</h2>
        <ul style={{ listStyleType: 'none', padding: 0, marginTop: '1rem' }}>
          <li style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>📄 dummy.pdf</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a 
                  href="/pdf/dummy" 
                  style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 500 }}
                >
                  Preview in Viewer
                </a>
                <a 
                  href="/pdf/dummy.pdf" 
                  style={{ padding: '0.5rem 1rem', backgroundColor: '#e5e7eb', color: '#374151', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 500 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Direct File Link
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
}
