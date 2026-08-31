import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function PdfViewer({ params }) {
  const { filename } = await params;
  
  const pdfFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  const filePath = path.join(process.cwd(), 'public', 'pdf', pdfFilename);
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const pdfUrl = `/pdf/${pdfFilename}`;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-slate-900">
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-3 md:px-6 md:py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-sm z-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link 
            href="/" 
            className="flex items-center justify-center flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            title="Back to home"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div className="flex flex-col overflow-hidden">
            <h1 className="text-sm md:text-base font-semibold text-white truncate max-w-[150px] sm:max-w-xs md:max-w-md" title={pdfFilename}>
              {pdfFilename}
            </h1>
            <span className="text-[10px] sm:text-xs text-slate-400">PDF Preview</span>
          </div>
        </div>
        
        <div>
          <a 
            href={pdfUrl} 
            download 
            className="flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:px-4 sm:py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg font-medium text-sm transition-all shadow-[0_4px_14px_0_rgb(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)]"
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
      
      <main className="flex-1 w-full bg-slate-800/50 relative overflow-hidden">
        <iframe 
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} 
          className="absolute inset-0 w-full h-full border-none"
          title={`PDF Preview: ${pdfFilename}`}
        />
      </main>
    </div>
  );
}
