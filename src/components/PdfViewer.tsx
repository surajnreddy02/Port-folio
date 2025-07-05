pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import { Document, Page, pdfjs } from 'react-pdf';
import { Plus, Minus, RotateCw } from 'lucide-react';
import React, { useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
// @ts-expect-error: Vite-specific import for pdfjs worker as URL, required for react-pdf workerSrc
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min?url';

// Set the workerSrc to the locally bundled worker
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface PdfViewerProps {
  file: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
  // numPages state removed (no longer needed)
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);

  function onDocumentLoadSuccess() {
    setPageNumber(1);
  }

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.2, 3));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));
  const handleRotate = () => setRotation((r) => (r + 90) % 360);

  return (
    <div className="pdf-container w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex flex-col items-center justify-center">
      {/* Controls Bar - fully themed and responsive */}
      <div className="flex items-center justify-center gap-3 mb-4 w-full max-w-xs bg-card border border-light rounded-xl p-2 shadow-lg backdrop-blur-sm pdf-controls-bar">
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-lg text-muted hover:text-accent hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
          title="Zoom Out"
          aria-label="Zoom out"
        >
          <Minus size={22} />
        </button>
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-lg text-muted hover:text-accent hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
          title="Zoom In"
          aria-label="Zoom in"
        >
          <Plus size={22} />
        </button>
        <button
          onClick={handleRotate}
          className="p-2 rounded-lg text-muted hover:text-accent hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
          title="Rotate"
          aria-label="Rotate"
        >
          <RotateCw size={22} />
        </button>
      </div>
      <div className="pdf-viewer w-full flex justify-center items-center">
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
