
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Notices from './pages/Notices';
import Results from './pages/Notices'; // Reusing for demo
import PDFLibrary from './pages/PDFLibrary';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Articles from './pages/Articles';

// Simple Articles page component (Inline to save space)
const ArticlePage = () => (
  <div className="space-y-8">
     <h1 className="text-3xl font-black text-blue-900">Articles & Career Tips</h1>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
             <img src={`https://picsum.photos/seed/article${i}/600/300`} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" alt="Blog" />
             <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Successful Loksewa Preparation Tips</h3>
                <p className="text-gray-500 text-sm mb-4">Learn the secrets of cracking the PSC exams with our comprehensive guide...</p>
                <button className="text-red-600 font-bold text-sm">Read Article <i className="fas fa-arrow-right ml-1"></i></button>
             </div>
          </div>
        ))}
     </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/notices/:category" element={<Notices />} />
          <Route path="/results" element={<Notices />} />
          <Route path="/pdfs" element={<PDFLibrary />} />
          <Route path="/articles" element={<ArticlePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
