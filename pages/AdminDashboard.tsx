
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { api } from '../services/apiService';
import { Category, Tag } from '../types';

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Government');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        navigate('/admin');
      } else {
        setUser(u);
      }
      setLoading(false);
    });
    return unsub;
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      let fileUrl = '';
      if (file) {
        fileUrl = await api.uploadFile(file);
      }
      
      await api.createNotice({
        title,
        category,
        content,
        fileUrl,
        tags: [category === 'Government' ? 'Loksewa' : 'College'] as Tag[]
      });

      alert('Notice published successfully!');
      setTitle('');
      setContent('');
      setFile(null);
      setIsAdding(false);
    } catch (err) {
      alert('Failed to publish notice.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin"></div>
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Verifying Admin Session...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-slate-100 rounded-[1.25rem] flex items-center justify-center text-slate-400 text-2xl">
            <i className="fas fa-user-shield"></i>
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 leading-tight">Admin Dashboard</h1>
            <p className="text-slate-500 font-medium">Manage all public content and files.</p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className={`${isAdding ? 'bg-slate-900' : 'bg-red-600 shadow-red-600/20'} hover:opacity-90 text-white px-6 py-3 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-lg flex-grow md:flex-grow-0 active:scale-95`}
          >
            <i className={`fas ${isAdding ? 'fa-times' : 'fa-plus'} text-xs`}></i> 
            {isAdding ? 'Close Editor' : 'Create Notice'}
          </button>
          <button 
            onClick={handleLogout}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-black transition-all active:scale-95"
          >
            Sign Out
          </button>
        </div>
      </div>

      {isAdding ? (
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl max-w-3xl mx-auto animate-in fade-in zoom-in duration-300">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Publish New Content</h2>
            <p className="text-slate-500 font-medium text-sm">Fill in the details below to update the live feed.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Notice Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-bold text-slate-900"
                  placeholder="e.g., Loksewa Kharidar Vacancy"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                <select 
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-bold text-slate-900 appearance-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                >
                  <option value="Government">Government</option>
                  <option value="Non-Government">Non-Government</option>
                  <option value="Result">Result</option>
                  <option value="Scholarship">Scholarship</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Brief Description</label>
              <textarea
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all h-32 font-medium text-slate-600"
                placeholder="Briefly explain the notice..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Upload Document (PDF)</label>
              <div className="relative">
                <input
                  type="file"
                  accept="application/pdf"
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[1.5rem] py-10 px-6 bg-slate-50/50 hover:bg-red-50/30 hover:border-red-200 transition-all">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-300 text-2xl mb-4">
                    <i className="fas fa-cloud-upload-alt"></i>
                  </div>
                  <p className="text-sm font-black text-slate-900 mb-1">
                    {file ? file.name : 'Click to upload PDF'}
                  </p>
                  <p className="text-xs font-bold text-slate-400">Max size: 10MB • Secured Storage</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-spinner animate-spin"></i>
                  Syncing with Cloudflare...
                </span>
              ) : 'Push to Live Site'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
          <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
             <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Recently Published</h3>
             <span className="text-xs font-bold text-slate-400">Total: 128 items</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Notice Details</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Views</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3, 4, 5].map(i => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="font-bold text-slate-900">Loksewa Kharidar Vacancy 2081 - Phase {i}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">
                        <i className="far fa-calendar mr-1"></i> Oct {10+i}, 2024
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Government</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-sm font-bold text-slate-600">{(1250 * i).toLocaleString()}</div>
                    </td>
                    <td className="px-8 py-5 text-right space-x-2">
                      <button className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl transition-all"><i className="fas fa-edit text-sm"></i></button>
                      <button className="w-9 h-9 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all"><i className="fas fa-trash text-sm"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-8 bg-slate-50/50 text-center border-t border-slate-50">
             <button className="text-xs font-black text-slate-400 hover:text-slate-900 transition-colors">Load More History</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
