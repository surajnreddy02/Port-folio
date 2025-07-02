import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Download, ZoomIn, ZoomOut, RotateCw, Maximize2, Minimize2, RefreshCw } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Initialize modal state
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(false);
      setScale(1);
      setRotation(0);
      setIsFullscreen(false);
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
      
      // Set a timeout to hide loading after PDF should have loaded
      const loadingTimer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      
      return () => clearTimeout(loadingTimer);
    } else {
      // Re-enable body scrolling
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Zoom controls
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleZoomReset = () => {
    setScale(1);
  };

  // Rotation control
  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  // Download functionality
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/my-cv.pdf';
    link.download = 'Suraj_N_Reddy_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleIframeError = () => {
    setLoading(false);
    setError(true);
  };

  // Retry loading
  const retryLoad = () => {
    setLoading(true);
    setError(false);
    // Force reload by changing src
    const iframe = document.getElementById('pdf-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = `/my-cv.pdf?t=${Date.now()}`;
    }
  };

  // Prevent modal from closing when clicking inside
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm ${
        isFullscreen ? 'p-0' : 'p-4'
      }`}
      onClick={onClose}
    >
      <motion.div 
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`relative bg-card border border-custom flex flex-col ${
          isFullscreen 
            ? 'w-full h-full rounded-none' 
            : 'rounded-xl w-full max-w-6xl h-[90vh]'
        }`}
        onClick={handleModalClick}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-custom bg-card/95 backdrop-blur-sm">
          <div>
            <h2 className="text-xl font-bold text-primary">Resume Preview</h2>
            <p className="text-secondary text-sm">Suraj N Reddy - Software Developer</p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 bg-secondary rounded-lg p-1">
              <button 
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
                className="p-1.5 text-muted hover:text-primary transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button 
                onClick={handleZoomReset}
                className="px-2 py-1.5 text-xs text-secondary hover:text-primary transition-colors"
                title="Reset Zoom"
              >
                {Math.round(scale * 100)}%
              </button>
              <button 
                onClick={handleZoomIn}
                disabled={scale >= 3.0}
                className="p-1.5 text-muted hover:text-primary transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            {/* Additional Controls */}
            <button 
              onClick={handleRotate}
              className="p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-secondary"
              title="Rotate"
            >
              <RotateCw size={16} />
            </button>
            
            <button 
              onClick={toggleFullscreen}
              className="p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-secondary"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            
            <button 
              onClick={handleDownload}
              className="p-2 text-accent hover:text-accent-hover transition-colors rounded-lg hover:bg-secondary"
              title="Download Resume"
            >
              <Download size={16} />
            </button>
            
            <button 
              onClick={onClose}
              className="p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-secondary"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        
        {/* PDF Viewer Container */}
        <div className="flex-1 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm z-10">
              <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4"></div>
              <p className="text-secondary font-medium">Loading Resume...</p>
              <p className="text-muted text-sm mt-2">Please wait while we prepare your document</p>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm z-10">
              <div className="bg-card border border-custom rounded-xl p-8 max-w-md text-center shadow-2xl">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">Unable to Load PDF</h3>
                <p className="text-secondary mb-6 leading-relaxed">
                  The resume couldn't be displayed in the browser. You can download it directly instead.
                </p>
                
                <div className="space-y-3">
                  <button 
                    onClick={retryLoad}
                    className="w-full px-4 py-2 btn-secondary rounded-lg font-medium flex items-center justify-center"
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Try Again
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="w-full px-4 py-2 btn-primary rounded-lg font-medium flex items-center justify-center"
                  >
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* PDF Display */}
          <div className="w-full h-full overflow-auto flex items-center justify-center p-4">
            <div 
              style={{ 
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transformOrigin: 'center',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="shadow-2xl rounded-lg overflow-hidden bg-white max-w-full max-h-full"
            >
              <iframe 
                id="pdf-iframe"
                src="/my-cv.pdf"
                className="w-[800px] h-[1000px] border-0 bg-white"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title="Suraj N Reddy Resume"
                style={{
                  minWidth: '600px',
                  minHeight: '800px',
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between p-3 border-t border-custom bg-card/95 backdrop-blur-sm">
          <div className="text-xs text-muted">
            Resume • Suraj N Reddy
          </div>
          <div className="flex items-center space-x-4 text-xs text-muted">
            <span>Use controls to zoom and rotate</span>
            <span>•</span>
            <span>ESC to close</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeModal;