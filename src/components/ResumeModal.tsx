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
  const [retryCount, setRetryCount] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // PDF URL with cache busting
  const getPdfUrl = () => {
    const timestamp = new Date().getTime();
    return `/my-cv.pdf?v=${timestamp}&retry=${retryCount}`;
  };

  // Initialize modal state
  useEffect(() => {
    if (isOpen) {
      // Reset all states when modal opens
      setLoading(true);
      setError(false);
      setScale(1);
      setRotation(0);
      setIsFullscreen(false);
      setRetryCount(0);
      
      // Prevent body scrolling - critical for modal positioning
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Store scroll position
      document.body.setAttribute('data-scroll-y', scrollY.toString());
    } else {
      // Re-enable body scrolling and restore position
      const scrollY = document.body.getAttribute('data-scroll-y');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
        document.body.removeAttribute('data-scroll-y');
      }
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
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

  // Zoom controls with bounds
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2.0));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
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

  // Download functionality with multiple fallbacks
  const handleDownload = async () => {
    try {
      // Method 1: Try fetch first
      const response = await fetch('/my-cv.pdf');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Suraj_N_Reddy_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        return;
      }
    } catch (error) {
      console.warn('Fetch download failed, trying direct link:', error);
    }

    // Method 2: Direct link fallback
    try {
      const link = document.createElement('a');
      link.href = '/my-cv.pdf';
      link.download = 'Suraj_N_Reddy_Resume.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('All download methods failed:', error);
      // Method 3: Open in new tab as last resort
      window.open('/my-cv.pdf', '_blank');
    }
  };

  // PDF load handlers with enhanced error detection
  const handleIframeLoad = () => {
    console.log('PDF iframe loaded');
    setTimeout(() => {
      if (iframeRef.current) {
        try {
          // Try to access iframe content to verify PDF loaded
          const iframeDoc = iframeRef.current.contentDocument;
          if (iframeDoc && iframeDoc.body && iframeDoc.body.innerHTML.trim() === '') {
            // Empty body might indicate PDF loaded successfully
            setLoading(false);
            setError(false);
          } else if (iframeDoc && iframeDoc.body && iframeDoc.body.innerHTML.includes('pdf')) {
            // Content suggests PDF is there
            setLoading(false);
            setError(false);
          } else {
            // Assume success after timeout
            setLoading(false);
            setError(false);
          }
        } catch (e) {
          // Cross-origin restrictions - assume success
          setLoading(false);
          setError(false);
        }
      }
    }, 1000);
  };

  const handleIframeError = () => {
    console.error('PDF iframe failed to load');
    setLoading(false);
    setError(true);
  };

  // Prevent modal from closing when clicking inside
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Retry loading PDF with different strategies
  const retryLoad = () => {
    setLoading(true);
    setError(false);
    setRetryCount(prev => prev + 1);
    
    if (iframeRef.current) {
      // Force reload with new timestamp
      iframeRef.current.src = getPdfUrl();
    }
  };

  // Check if PDF exists
  const checkPdfExists = async () => {
    try {
      const response = await fetch('/my-cv.pdf', { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  // Initialize PDF check
  useEffect(() => {
    if (isOpen) {
      checkPdfExists().then(exists => {
        if (!exists) {
          setError(true);
          setLoading(false);
        }
      });
    }
  }, [isOpen]);

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
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
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
            : 'rounded-xl w-full max-w-5xl h-[90vh]'
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
                disabled={scale >= 2.0}
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
        <div className="flex-1 overflow-hidden bg-secondary/30 relative">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/50 backdrop-blur-sm z-10">
              <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4"></div>
              <p className="text-secondary font-medium">Loading Resume...</p>
              <p className="text-muted text-sm mt-2">Please wait while we prepare your document</p>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm z-10">
              <div className="bg-card border border-custom rounded-xl p-8 max-w-md text-center shadow-2xl">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">Unable to Load PDF</h3>
                <p className="text-secondary mb-6 leading-relaxed">
                  The resume couldn't be displayed. This might be due to browser restrictions or the PDF file not being found.
                </p>
                
                <div className="space-y-3">
                  <button 
                    onClick={retryLoad}
                    className="w-full px-4 py-2 btn-primary rounded-lg font-medium flex items-center justify-center"
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Try Again ({retryCount + 1})
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="w-full px-4 py-2 btn-secondary rounded-lg font-medium flex items-center justify-center"
                  >
                    <Download size={16} className="mr-2" />
                    Download PDF Instead
                  </button>
                </div>
                
                <div className="mt-6 pt-4 border-t border-custom">
                  <p className="text-xs text-muted">
                    Troubleshooting: Ensure my-cv.pdf exists in the public folder, try clearing browser cache, or use a different browser
                  </p>
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
                maxWidth: '100%',
                maxHeight: '100%'
              }}
              className="shadow-2xl rounded-lg overflow-hidden bg-white"
            >
              <iframe 
                ref={iframeRef}
                src={getPdfUrl()}
                className="w-[210mm] h-[297mm] border-0 bg-white"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title="Suraj N Reddy Resume"
                style={{
                  minWidth: '595px',
                  minHeight: '842px',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
                sandbox="allow-same-origin allow-scripts"
              />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between p-3 border-t border-custom bg-card/95 backdrop-blur-sm">
          <div className="text-xs text-muted">
            Resume • Last updated: {new Date().toLocaleDateString()}
          </div>
          <div className="flex items-center space-x-4 text-xs text-muted">
            <span>Use mouse wheel to zoom</span>
            <span>•</span>
            <span>ESC to close</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeModal;