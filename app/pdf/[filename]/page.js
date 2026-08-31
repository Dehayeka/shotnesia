import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PdfViewerClient from './PdfViewerClient';

// DAFTAR LINK GOOGLE DRIVE (Tambahkan manual di sini)
const driveLinks = {
  'Googledrive-Naki.pdf': 'https://drive.google.com/drive/folders/1nvu1fOiv6EzQWerJM-MTcmQQz2lJAAfb?usp=drive_link',
  'Googledrive-farmasi.pdf': 'https://drive.google.com/drive/folders/1Ugv6xkgY6MROMOGmNzj4VYwXy4UAg93gg?usp=sharing',
  // Format: 'NamaFile.pdf': 'Link Google Drive',
};

export default async function PdfViewer({ params }) {
  const { filename } = await params;
  
  const pdfFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  const filePath = path.join(process.cwd(), 'public', 'pdf', pdfFilename);
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const pdfUrl = `/pdf/${pdfFilename}`;
  const driveLink = driveLinks[pdfFilename] || null;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-slate-50">
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-3 md:px-6 md:py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm z-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link 
            href="/" 
            className="flex items-center justify-center flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200"
            title="Back to home"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div className="flex flex-col overflow-hidden">
            <h1 className="text-sm md:text-base font-semibold text-slate-900 truncate max-w-[150px] sm:max-w-xs md:max-w-md" title={pdfFilename}>
              {pdfFilename}
            </h1>
            <span className="text-[10px] sm:text-xs text-slate-500">PDF Preview</span>
          </div>
        </div>
        
        <div>
          <a 
            href={pdfUrl} 
            download 
            className="flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:px-4 sm:py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm transition-all shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30"
            title="Download PDF"
          >
            <svg className="w-4 h-4 hidden sm:block sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="hidden sm:inline">Download</span>
            <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </header>
      
      <main className="flex-1 w-full bg-slate-100 relative overflow-hidden">
        <PdfViewerClient pdfUrl={pdfUrl} driveLink={driveLink} />
      </main>
    </div>
  );
}
