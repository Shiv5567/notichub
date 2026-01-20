
import React, { useState } from 'react';
import PDFViewer from '../components/PDFViewer';
import SEO from '../components/SEO';

const PDFLibrary: React.FC = () => {
  const [activePdf, setActivePdf] = useState<string | null>(null);

  const pdfs = [
    { title: 'Loksewa Kharidar Syllabus 2081', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { title: 'Myadi Police Application Form', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { title: 'TU Exam Form Guidelines', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  ];

  return (
    <div className="space-y-8">
      <SEO 
        title="PDF Syllabus & Resources"
        description="Download official Loksewa syllabi, exam forms, and career guides in PDF format."
        keywords="loksewa syllabus pdf, nepal exam forms, career guide nepal"
      />

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-black text-blue-900 mb-2">PDF Document Library</h1>
        <p className="text-gray-500">Official documents, syllabi, and forms in protected view mode.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-4">
          {pdfs.map((pdf, i) => (
            <button
              key={i}
              onClick={() => setActivePdf(pdf.url)}
              className={`w-full text-left p-6 rounded-2xl border transition-all flex justify-between items-center group ${
                activePdf === pdf.url ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100 hover:border-red-200'
              }`}
            >
              <div>
                <h3 className={`font-bold ${activePdf === pdf.url ? 'text-red-600' : 'text-gray-900 group-hover:text-red-600'}`}>
                  {pdf.title}
                </h3>
                <span className="text-xs text-gray-400">PDF Document • 1.2 MB</span>
              </div>
              <i className={`fas fa-chevron-right text-xs ${activePdf === pdf.url ? 'text-red-600' : 'text-gray-300'}`}></i>
            </button>
          ))}
        </div>

        <div className="lg:col-span-8">
          {activePdf ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-50 px-6 py-3 rounded-xl">
                <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Document Preview</span>
                <span className="text-[10px] bg-red-600 text-white px-2 py-1 rounded font-black">PROTECTED VIEW</span>
              </div>
              <PDFViewer url={activePdf} />
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-gray-200 aspect-[1/1] flex flex-col items-center justify-center text-center p-12">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-file-pdf text-4xl text-gray-200"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Select a Document</h3>
              <p className="text-gray-500">Click on a file from the sidebar to view it securely in your browser.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFLibrary;
