import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default async function Home() {
  const pdfDir = path.join(process.cwd(), 'public', 'pdf');
  let pdfFiles = [];
  
  try {
    if (fs.existsSync(pdfDir)) {
      pdfFiles = fs.readdirSync(pdfDir).filter(file => file.endsWith('.pdf'));
    }
  } catch (error) {
    console.error("Failed to read PDF directory:", error);
  }

  return (
    <main className="min-h-screen p-6 md:p-12 lg:p-24 max-w-7xl mx-auto flex flex-col gap-8">
      <header className="flex flex-col gap-4 text-center items-center mt-12 mb-8">
        <div className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          Document Portal
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-400 drop-shadow-sm">
          PDF Preview App
        </h1>
        <p className="text-slate-400 max-w-2xl text-lg md:text-xl">
          Securely browse and preview your PDF documents stored in <code className="text-indigo-300 bg-slate-800/80 px-2 py-0.5 rounded text-sm">public/pdf/</code>.
        </p>
      </header>

      <section className="w-full">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
          </svg>
          Available Documents
          <span className="bg-indigo-600 text-white text-xs py-1 px-2.5 rounded-full">{pdfFiles.length}</span>
        </h2>
        
        {pdfFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl border border-dashed border-slate-700 bg-slate-800/30 backdrop-blur-sm">
            <svg className="w-12 h-12 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-slate-300">No PDFs found</h3>
            <p className="text-slate-500 mt-1 text-center">Add some .pdf files to your public/pdf folder.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdfFiles.map((file) => {
              const basename = file.replace('.pdf', '');
              return (
                <div 
                  key={file} 
                  className="group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-800/40 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800/60 hover:border-indigo-500/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full -mr-10 -mt-10"></div>
                  
                  <div className="flex items-start gap-4 mb-8 relative z-10">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-red-500/20">
                      <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-lg font-semibold text-white truncate" title={file}>
                        {file}
                      </span>
                      <span className="text-sm text-slate-400 mt-1">PDF Document</span>
                    </div>
                  </div>

                  <div className="flex gap-3 relative z-10">
                    <Link 
                      href={`/pdf/${basename}`}
                      className="flex-1 py-2.5 px-4 bg-indigo-500 hover:bg-indigo-400 text-white text-center rounded-lg font-medium text-sm transition-colors shadow-[0_4px_14px_0_rgb(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview
                    </Link>
                    <a 
                      href={`/pdf/${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 text-center rounded-lg font-medium text-sm transition-colors border border-slate-600 flex items-center justify-center gap-2"
                      title="Direct file link"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
