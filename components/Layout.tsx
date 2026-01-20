
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: 'fa-home' },
    { name: 'Government', path: '/notices/government', icon: 'fa-landmark' },
    { name: 'Results', path: '/results', icon: 'fa-poll' },
    { name: 'PDFs', path: '/pdfs', icon: 'fa-file-pdf' },
    { name: 'Articles', path: '/articles', icon: 'fa-newspaper' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-red-100 selection:text-red-700">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-slate-200 py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:rotate-6 transition-transform">
                <i className="fas fa-flag"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-900 leading-none">NoticeHub</span>
                <span className="text-[10px] font-bold text-red-600 tracking-widest uppercase">Nepal Portal</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                    location.pathname === link.path 
                      ? 'bg-red-50 text-red-600 shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <i className={`fas ${link.icon} opacity-50`}></i>
                  {link.name}
                </Link>
              ))}
              <div className="ml-4 pl-4 border-l border-slate-200">
                <Link 
                  to="/admin" 
                  className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 active:scale-95"
                >
                  Admin Portal
                </Link>
              </div>
            </nav>

            {/* Mobile Nav Button */}
            <button 
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 active:scale-90 transition-transform" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars-staggered'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top duration-300">
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-all ${
                    location.pathname === link.path 
                      ? 'bg-red-50 text-red-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <i className={`fas ${link.icon} w-6`}></i>
                  {link.name}
                </Link>
              ))}
              <hr className="my-4 border-slate-100" />
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-xl text-base font-black text-white bg-slate-900 shadow-lg"
              >
                <i className="fas fa-lock"></i>
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Spacer */}
      <div className="h-20"></div>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white text-sm">
                  <i className="fas fa-flag"></i>
                </div>
                <span className="text-xl font-black text-white">NoticeHub Nepal</span>
              </div>
              <p className="text-slate-400 mb-8 max-w-sm leading-relaxed">
                Empowering Nepali citizens with rapid access to official notices, career vacancies, and educational results in a single, secure platform.
              </p>
              <div className="flex space-x-3">
                {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map(icon => (
                  <a key={icon} href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1">
                    <i className={`fab fa-${icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-white mb-6 uppercase tracking-widest text-xs">Navigation</h4>
              <ul className="space-y-4 text-sm font-medium">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="hover:text-red-500 transition-colors flex items-center gap-2">
                      <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-white mb-6 uppercase tracking-widest text-xs">Official Support</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-red-500 transition-colors">PSC (Loksewa) Help</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">University Desk</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Sitemap</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors text-red-500">Emergency Updates</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-500">
            <p>&copy; {new Date().getFullYear()} NOTICEHUB NEPAL. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">PRIVACY</a>
              <a href="#" className="hover:text-white">TERMS</a>
              <a href="#" className="hover:text-white">CONTACT</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
