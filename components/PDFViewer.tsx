
import React, { useState, useEffect } from 'react';

interface PDFViewerProps {
  url: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
  const [loading, setLoading] = useState(true);

  // Simple right-click prevention
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <div className="relative w-full aspect-[1/1.4] bg-gray-200 rounded-lg overflow-hidden border border-gray-300">
      {/* Transparent overlay to block interaction with the iframe context menu */}
      <div className="pdf-overlay pointer-events-none" />
      
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
          <p className="text-gray-500 font-medium">Loading PDF document securely...</p>
        </div>
      )}

      <iframe
        src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
        className="w-full h-full"
        onLoad={() => setLoading(false)}
        title="PDF Viewer"
      />

      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded shadow-sm text-[10px] font-bold text-red-600 z-30 uppercase tracking-tighter">
        Protected View
      </div>
    </div>
  );
};

export default PDFViewer;
