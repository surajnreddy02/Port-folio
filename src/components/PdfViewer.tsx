import { Document, Page, pdfjs } from 'react-pdf';
// ...existing code...
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import React, { useState } from 'react';
import { Plus, Minus, RotateCw, RefreshCw } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '../pdf-viewer.css';
// @ts-expect-error: Vite-specific import for pdfjs worker as URL, required for react-pdf workerSrc
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min?url';

// Set the workerSrc to the locally bundled worker
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface PdfViewerProps {
  file: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
  const handleReset = () => {
    setScale(1.0);
    setRotation(0);
    if (pdfContainerRef.current) pdfContainerRef.current.scrollTop = 0;
  };
  // numPages state removed (no longer needed)
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const pdfContainerRef = React.useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess() {
    setPageNumber(1);
  }

  const handleZoomIn = () => {
    setScale((s) => Math.min(s + 0.2, 3));
    if (pdfContainerRef.current) pdfContainerRef.current.scrollTop = 0;
  };
  const handleZoomOut = () => {
    setScale((s) => Math.max(s - 0.2, 0.5));
    if (pdfContainerRef.current) pdfContainerRef.current.scrollTop = 0;
  };
  const handleRotate = () => {
    setRotation((r) => (r + 90) % 360);
    if (pdfContainerRef.current) pdfContainerRef.current.scrollTop = 0;
  };

  return (
    <div className="pdf-container w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex flex-col items-center justify-center">
      {/* Controls Bar - balanced grid layout */}
      <div className="flex items-center justify-center gap-3 mb-4 w-full max-w-md bg-card border border-light rounded-xl p-3 shadow-lg backdrop-blur-sm pdf-controls-bar">
        {/* Rotate - left */}
        <div className="relative group flex items-center">
          <button
            onClick={handleRotate}
            className="p-2 rounded-lg text-muted hover:text-accent hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-colors w-10 h-10 flex items-center justify-center"
            aria-label="Rotate"
          >
            <RotateCw size={20} />
          </button>
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-medium text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10 bg-white/10 border border-white/30 shadow-lg backdrop-blur-md">Rotate</span>
        </div>
        {/* Zoom Controls - visually distinguished pill container */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 px-2 py-1 rounded-full border-2 border-yellow-400 bg-transparent">
            <div className="relative group flex items-center">
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-full text-muted hover:text-accent hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-colors w-10 h-10 flex items-center justify-center"
                aria-label="Zoom out"
              >
                <Minus size={20} />
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 text-xs font-medium text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10 bg-white/10 border border-white/30 shadow-lg backdrop-blur-md">Zoom Out</span>
            </div>
            <div className="relative group flex items-center">
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-full text-muted hover:text-accent hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-colors w-10 h-10 flex items-center justify-center"
                aria-label="Zoom in"
              >
                <Plus size={20} />
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 text-xs font-medium text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10 bg-white/10 border border-white/30 shadow-lg backdrop-blur-md">Zoom In</span>
            </div>
          </div>
        </div>
        {/* Reset - right, visually distinct */}
        <div className="relative group flex items-center">
          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-muted hover:text-accent hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-colors w-10 h-10 flex items-center justify-center"
            aria-label="Reset PDF Viewer"
          >
            <RefreshCw size={20} />
          </button>
            <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-medium text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10 bg-white/10 border border-white/30 shadow-lg backdrop-blur-md">Reset</span>
        </div>
      </div>
      {/* Make the PDF area scrollable when zoomed */}
      <div
        ref={pdfContainerRef}
        className="pdf-viewer-scroll rounded-xl"
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className='text-secondary text-center py-8'>Loading PDF...</div>}
          error={<div className='text-red-400 text-center py-8'>Failed to load PDF.</div>}
        >
          <Page pageNumber={pageNumber} scale={scale} rotate={rotation}
            width={typeof window !== 'undefined' ? Math.min(window.innerWidth - 48, 420) : 350}
          />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
