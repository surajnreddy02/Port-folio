import { Document, Page, pdfjs } from 'react-pdf';
import React, { useState } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  file: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="flex flex-col items-center">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div>Loading PDF...</div>}
        error={<div>Failed to load PDF.</div>}
      >
        <Page pageNumber={pageNumber} width={350} />
      </Document>
      {numPages && (
        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => setPageNumber(p => Math.max(1, p - 1))} disabled={pageNumber <= 1} className="btn-secondary px-2 py-1 rounded">Prev</button>
          <span>Page {pageNumber} of {numPages}</span>
          <button onClick={() => setPageNumber(p => Math.min(numPages!, p + 1))} disabled={pageNumber >= numPages} className="btn-secondary px-2 py-1 rounded">Next</button>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
