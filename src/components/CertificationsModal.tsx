import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Maximize2, Minimize2, RefreshCw, ExternalLink } from 'lucide-react';

interface CertificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CertificationsModal: React.FC<CertificationsModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const certificationsUrl = "https://www.linkedin.com/in/surajnreddy02/details/certifications/";

  // Initialize modal state
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(false);
      setIsFullscreen(false);
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
      
      // Set a shorter timeout since LinkedIn will likely block the iframe
      const loadingTimer = setTimeout(() => {
        setLoading(false);
        // Since LinkedIn blocks iframes, show error state immediately after loading
        setError(true);
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

  // Fullscreen toggle
  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  // Open in new tab
  const openInNewTab = () => {
    window.open(certificationsUrl, '_blank', 'noopener,noreferrer');
  };

  // Retry loading
  const retryLoad = () => {
    setLoading(true);
    setError(false);
    // Set timeout to show error state since LinkedIn blocks embedding
    setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 1500);
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
            <h2 className="text-xl font-bold text-primary">Certifications</h2>
            <p className="text-secondary text-sm">Suraj N Reddy - Professional Certifications</p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleFullscreen}
              className="p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-secondary"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            
            <button 
              onClick={openInNewTab}
              className="p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-secondary"
              title="Open in New Tab"
            >
              <ExternalLink size={16} />
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
        
        {/* Web Page Viewer Container */}
        <div className="flex-1 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm z-10">
              <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4"></div>
              <p className="text-secondary font-medium">Preparing LinkedIn View...</p>
              <p className="text-muted text-sm mt-2">Checking LinkedIn accessibility</p>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm z-10">
              <div className="bg-card border border-custom rounded-xl p-8 max-w-md text-center shadow-2xl">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">LinkedIn Security Restriction</h3>
                <p className="text-secondary mb-6 leading-relaxed">
                  LinkedIn prevents embedding their pages for security reasons. Click below to view your certifications directly on LinkedIn.
                </p>
                <div className="space-y-3">
                  <button 
                    onClick={openInNewTab}
                    className="w-full px-4 py-2 btn-primary rounded-lg font-medium flex items-center justify-center"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View Certifications on LinkedIn
                  </button>
                  <button 
                    onClick={retryLoad}
                    className="w-full px-4 py-2 btn-secondary rounded-lg font-medium flex items-center justify-center"
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Alternative content when iframe fails */}
          {!loading && !error && (
            <div className="flex items-center justify-center h-full">
              <div className="bg-card border border-custom rounded-xl p-8 max-w-md text-center shadow-2xl">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">View Certifications</h3>
                <p className="text-secondary mb-6 leading-relaxed">
                  Click the button below to view professional certifications on LinkedIn.
                </p>
                <button 
                  onClick={openInNewTab}
                  className="w-full px-4 py-2 btn-primary rounded-lg font-medium flex items-center justify-center"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Open LinkedIn Certifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between p-3 border-t border-custom bg-card/95 backdrop-blur-sm">
          <div className="text-xs text-muted">
            Certifications • LinkedIn Profile
          </div>
          <div className="flex items-center space-x-4 text-xs text-muted">
            <span>View professional certifications</span>
            <span>•</span>
            <span>ESC to close</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CertificationsModal;
