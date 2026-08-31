import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

export default async function PdfViewer({ params }) {
  const { filename } = await params;
  
  // Tambahkan .pdf jika belum ada (karena routing ini untuk preview)
  // File statis /pdf/namafile.pdf akan di-handle langsung oleh folder public
  const pdfFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  const filePath = path.join(process.cwd(), 'public', 'pdf', pdfFilename);
  
  // Cek apakah file ada, jika tidak kembalikan halaman 404
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  // URL relatif ke file statis di folder public
  const pdfUrl = `/pdf/${pdfFilename}`;

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <header style={{ 
        padding: '12px 24px', 
        backgroundColor: '#1f2937', 
        color: '#f9fafb', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>&larr; Back</a>
          <h1 style={{ fontSize: '16px', margin: 0, fontWeight: 500 }}>{pdfFilename}</h1>
        </div>
        <div>
          <a 
            href={pdfUrl} 
            download 
            style={{ 
              backgroundColor: '#3b82f6', 
              color: '#fff', 
              textDecoration: 'none', 
              padding: '8px 16px', 
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'background-color 0.2s'
            }}
          >
            Download PDF
          </a>
        </div>
      </header>
      <div style={{ flex: 1, width: '100%', backgroundColor: '#e5e7eb' }}>
        <iframe 
          src={`${pdfUrl}#toolbar=0&navpanes=0`} 
          style={{ width: '100%', height: '100%', border: 'none' }}
          title={`PDF Preview: ${pdfFilename}`}
        />
      </div>
    </div>
  );
}
