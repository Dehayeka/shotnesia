'use client';

import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewerClient({ pdfUrl, driveLink, orderLink }) {
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        // Padding adjustment based on screen size
        const padding = window.innerWidth < 768 ? 16 : 64; 
        setContainerWidth(width - padding);
      }
    };
    
    // Initial width set
    const timer = setTimeout(updateWidth, 100);
    
    window.addEventListener('resize', updateWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div 
      className="w-full h-full overflow-auto bg-slate-100 flex flex-col items-center py-4 md:py-8 touch-pan-y" 
      ref={containerRef}
    >
      <div className="flex flex-col items-center gap-4 md:gap-8 max-w-5xl w-full">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="text-slate-800 flex items-center justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mr-3"></div>
              Memuat PDF...
            </div>
          }
          error={
            <div className="text-red-600 p-8 text-center bg-red-50 rounded-xl border border-red-200 mt-10">
              Gagal memuat PDF.
            </div>
          }
        >
          {numPages && containerWidth && Array.from(new Array(numPages), (el, index) => (
            <div 
              key={`page_${index + 1}`} 
              className="mb-4 md:mb-8 shadow-lg border border-slate-200 rounded-md overflow-hidden bg-white mx-auto flex justify-center"
            >
              <Page 
                pageNumber={index + 1} 
                width={Math.min(containerWidth, 1200)} // max width 1200px
                renderAnnotationLayer={false} 
                renderTextLayer={false}
                className="max-w-full"
              />
            </div>
          ))}
        </Document>

        {/* ACTION BUTTONS (ORDER & GOOGLE DRIVE) */}
        {numPages && (driveLink || orderLink) && (
          <div className="mt-8 mb-12 flex flex-col sm:flex-row justify-center gap-4 w-full px-4">
            {orderLink && (
              <a 
                href={orderLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-3.5 bg-emerald-500 text-white font-semibold rounded-xl shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:bg-emerald-600 hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order (WhatsApp)
              </a>
            )}
            
            {driveLink && (
              <a 
                href={driveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M17 7l11 19h14.5L31.5 7z"/>
                  <path fill="#1976D2" d="M38 26l-7-12-14 24h14.5z"/>
                  <path fill="#4CAF50" d="M17 7L3 31l7 12 14-24z"/>
                </svg>
                Buka di Google Drive
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
