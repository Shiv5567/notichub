
import React, { useEffect, useState } from 'react';
import { api } from '../services/apiService';
import { Notice } from '../types';
import NoticeCard from '../components/NoticeCard';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await api.getNotices();
        setNotices(data);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  return (
    <div className="space-y-16 pb-20">
      <SEO 
        title="Latest Nepal Notices, Results & Job Vacancies"
        description="Stay updated with the latest government notices, Loksewa vacancies, Myadi results, university exam updates, and career tips in Nepal."
        keywords="myadi police result, loksewa notice, university exam result, college notice, scholarship nepal"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                Live Updates 2081/82
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] mb-6">
                Stay Ahead <br />
                <span className="text-red-600">Every Notice,</span> <br />
                One Platform.
              </h1>
              <p className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed font-medium">
                The fastest way to access Loksewa Aayog vacancies, University results, and public notices in Nepal. Verified and real-time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/notices/government" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-red-600/20 flex items-center gap-3 group active:scale-95">
                  Explore Notices
                  <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
                </Link>
                <Link to="/results" className="bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 px-8 py-4 rounded-2xl font-black transition-all shadow-sm active:scale-95">
                  Latest Results
                </Link>
              </div>
            </div>
            
            <div className="relative hidden lg:block animate-in fade-in slide-in-from-right duration-700">
               <div className="relative z-10 bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 rotate-2">
                  <div className="bg-slate-50 rounded-[2rem] p-8 aspect-video flex flex-col justify-center overflow-hidden">
                     <div className="flex gap-4 mb-6">
                        <div className="h-12 w-12 bg-red-100 rounded-xl animate-pulse"></div>
                        <div className="flex-1 space-y-2">
                           <div className="h-4 bg-slate-200 rounded-full w-3/4 animate-pulse"></div>
                           <div className="h-4 bg-slate-100 rounded-full w-1/2 animate-pulse"></div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="h-32 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex gap-4">
                           <div className="h-full aspect-square bg-slate-50 rounded-lg"></div>
                           <div className="flex-1 space-y-2 py-2">
                              <div className="h-3 bg-slate-200 rounded-full w-full"></div>
                              <div className="h-3 bg-slate-100 rounded-full w-2/3"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* Decorative elements */}
               <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-100/50 blur-[100px] rounded-full -z-10"></div>
               <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-100/50 blur-[100px] rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Search/Quick Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-4 shadow-xl shadow-slate-200/50 border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: 'fa-bullhorn', label: 'Notices Today', value: '45+', color: 'text-red-600', bg: 'bg-red-50' },
            { icon: 'fa-graduation-cap', label: 'Education', value: '1.2k', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: 'fa-user-tie', label: 'Job Vacancy', value: '800+', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { icon: 'fa-clock', label: 'Response Time', value: '<5m', color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center text-xl`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 leading-none">{stat.value}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Notices Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Recent Updates</h2>
            <p className="text-slate-500 font-medium">Hand-picked notices and results from across Nepal.</p>
          </div>
          <Link to="/notices" className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-6 py-2.5 rounded-xl font-black text-sm transition-all flex items-center gap-2">
            View All Hubs
            <i className="fas fa-chevron-right text-[10px]"></i>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-slate-100 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notices.map(notice => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </div>
        )}
      </section>

      {/* Viber/Community Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] p-12 text-white relative overflow-hidden group">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-black mb-6 leading-tight">Join Nepal's Largest <br />Notice Community</h2>
            <p className="text-lg text-indigo-100 mb-10 leading-relaxed font-medium">
              Over 50,000+ students and professionals receive instant alerts directly on their phones. Don't miss a single result or deadline.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-indigo-700 px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl flex items-center gap-3 active:scale-95">
                <i className="fab fa-viber text-2xl"></i>
                Join on Viber
              </button>
              <button className="bg-indigo-500/30 backdrop-blur-md text-white border border-indigo-400/30 px-8 py-4 rounded-2xl font-black hover:bg-indigo-500/50 transition-all flex items-center gap-3 active:scale-95">
                <i className="fab fa-telegram-plane text-2xl"></i>
                Telegram Channel
              </button>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 -rotate-12 translate-x-12 translate-y-12 hidden lg:block transition-transform duration-700 group-hover:rotate-0">
            <i className="fas fa-bullhorn text-[300px]"></i>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
