'use client';

import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewerClient({ pdfUrl, driveLink }) {
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

        {/* GOOGLE DRIVE BUTTON */}
        {numPages && driveLink && (
          <div className="mt-8 mb-12 flex justify-center w-full">
            <a 
              href={driveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M17 7l11 19h14.5L31.5 7z"/>
                <path fill="#1976D2" d="M38 26l-7-12-14 24h14.5z"/>
                <path fill="#4CAF50" d="M17 7L3 31l7 12 14-24z"/>
              </svg>
              Buka di Google Drive
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
