import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setLoading(true);
      setError(false);
      setScale(1);
      setCurrentPage(1);
    }
  }, [isOpen]);

  const handleZoomIn = () => {
    if (scale < 2) setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    if (scale > 0.5) setScale(scale - 0.1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/my-cv.pdf';
    link.download = 'Suraj_N_Reddy_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleIframeLoad = () => {
    setLoading(false);
    // In a real implementation, you would get the total pages from the PDF
    setTotalPages(1);
  };

  const handleIframeError = () => {
    setLoading(false);
    setError(true);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative bg-card border border-custom rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-custom">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">Resume Preview</h2>
            <p className="text-secondary text-sm">View and download my resume</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleZoomOut}
                className="p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-secondary"
                aria-label="Zoom out"
              >
                <ZoomOut size={18} />
              </button>
              <span className="text-secondary text-sm">{Math.round(scale * 100)}%</span>
              <button 
                onClick={handleZoomIn}
                className="p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-secondary"
                aria-label="Zoom in"
              >
                <ZoomIn size={18} />
              </button>
            </div>
            <button 
              onClick={handleDownload}
              className="p-2 text-accent hover:text-accent-hover transition-colors rounded-lg hover:bg-secondary"
              title="Download Resume"
              aria-label="Download resume"
            >
              <Download size={18} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-secondary"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-secondary/50">
          {loading && (
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4"></div>
              <p className="text-secondary">Loading PDF...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-card border border-custom rounded-lg p-8 max-w-md text-center">
              <div className="text-red-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <h3 className="text-xl font-semibold text-primary mb-2">Error Loading PDF</h3>
              </div>
              <p className="text-secondary mb-6">
                We couldn't load the resume PDF. This could be due to:
              </p>
              <ul className="text-left text-secondary mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>The file may be missing or corrupted</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Your browser might be blocking the PDF viewer</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>A temporary network issue</span>
                </li>
              </ul>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={handleDownload}
                  className="px-4 py-2 btn-primary rounded-lg font-medium flex items-center"
                >
                  <Download size={16} className="mr-2" />
                  Download Instead
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 btn-secondary rounded-lg font-medium"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
          
          {!loading && !error && (
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'center', transition: 'transform 0.2s ease' }}>
              <iframe 
                src="/my-cv.pdf" 
                className="w-full h-[70vh] border border-custom rounded-lg bg-white"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title="Resume PDF"
              />
            </div>
          )}
        </div>
        
        {/* Footer with pagination */}
        <div className="flex items-center justify-between p-4 border-t border-custom">
          <div className="text-sm text-muted">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage <= 1 || loading || error}
              className={`p-2 rounded-lg ${currentPage <= 1 || loading || error ? 'text-muted/50 cursor-not-allowed' : 'text-muted hover:text-primary hover:bg-secondary'}`}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={handleNextPage}
              disabled={currentPage >= totalPages || loading || error}
              className={`p-2 rounded-lg ${currentPage >= totalPages || loading || error ? 'text-muted/50 cursor-not-allowed' : 'text-muted hover:text-primary hover:bg-secondary'}`}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeModal;