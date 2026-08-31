'use client';

import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewerClient({ pdfUrl }) {
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
      className="w-full h-full overflow-auto bg-slate-800/80 flex flex-col items-center py-4 md:py-8 touch-pan-y" 
      ref={containerRef}
    >
      <div className="flex flex-col items-center gap-4 md:gap-8 max-w-5xl w-full">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="text-white flex items-center justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mr-3"></div>
              Memuat PDF...
            </div>
          }
          error={
            <div className="text-red-400 p-8 text-center bg-slate-900/50 rounded-xl border border-red-900/50 mt-10">
              Gagal memuat PDF.
            </div>
          }
        >
          {numPages && containerWidth && Array.from(new Array(numPages), (el, index) => (
            <div 
              key={`page_${index + 1}`} 
              className="mb-4 md:mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-md overflow-hidden bg-white mx-auto flex justify-center"
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
      </div>
    </div>
  );
}
