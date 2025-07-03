pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import { Document, Page, pdfjs } from 'react-pdf';
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
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.2, 3));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));
  const handleRotate = () => setRotation((r) => (r + 90) % 360);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap gap-2 mb-2 justify-center w-full">
        <button onClick={handleZoomOut} className="px-2 py-1 rounded min-w-[40px] bg-gray-800 text-white font-bold shadow hover:bg-gray-700 transition" aria-label="Zoom out">-</button>
        <button onClick={handleZoomIn} className="px-2 py-1 rounded min-w-[40px] bg-gray-800 text-white font-bold shadow hover:bg-gray-700 transition" aria-label="Zoom in">+</button>
        <button onClick={handleRotate} className="px-2 py-1 rounded min-w-[40px] bg-gray-800 text-white font-bold shadow hover:bg-gray-700 transition" aria-label="Rotate">⟳</button>
      </div>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div>Loading PDF...</div>}
        error={<div>Failed to load PDF.</div>}
      >
        <Page pageNumber={pageNumber} scale={scale} rotate={rotation} width={350} />
      </Document>
      {numPages && (
        <div className="flex flex-wrap items-center gap-2 mt-2 justify-center w-full">
          <button onClick={() => setPageNumber(p => Math.max(1, p - 1))} disabled={pageNumber <= 1} className="px-2 py-1 rounded min-w-[60px] bg-gray-800 text-white font-bold shadow hover:bg-gray-700 transition disabled:opacity-50">Prev</button>
          <span className="min-w-[100px] text-center font-semibold text-gray-900 bg-white bg-opacity-80 px-2 py-1 rounded shadow">Page {pageNumber} of {numPages}</span>
          <button onClick={() => setPageNumber(p => Math.min(numPages!, p + 1))} disabled={pageNumber >= numPages} className="px-2 py-1 rounded min-w-[60px] bg-gray-800 text-white font-bold shadow hover:bg-gray-700 transition disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
