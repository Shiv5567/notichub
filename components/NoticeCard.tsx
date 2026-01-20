
import React from 'react';
import { Link } from 'react-router-dom';
import { Notice } from '../types';

interface NoticeCardProps {
  notice: Notice;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice }) => {
  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'Government': return 'bg-blue-600 shadow-blue-200';
      case 'Result': return 'bg-emerald-600 shadow-emerald-200';
      case 'Scholarship': return 'bg-purple-600 shadow-purple-200';
      default: return 'bg-red-600 shadow-red-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] font-black text-white px-3 py-1 rounded-full shadow-lg ${getCategoryColor(notice.category)}`}>
          {notice.category.toUpperCase()}
        </span>
        <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider flex items-center">
          <i className="far fa-calendar-alt mr-1.5 text-slate-300"></i>
          {new Date(notice.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>
      
      <Link to={`/notice/${notice.id}`} className="block">
        <h3 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors leading-snug mb-3 line-clamp-2">
          {notice.title}
        </h3>
      </Link>
      
      <div className="flex flex-wrap gap-1.5 mb-5">
        {notice.tags.map(tag => (
          <span key={tag} className="text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded-md">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-slate-400 flex items-center">
            <i className="far fa-eye mr-1.5"></i>
            {notice.viewCount.toLocaleString()}
          </span>
        </div>
        <Link 
          to={`/notice/${notice.id}`} 
          className="text-xs font-black text-slate-900 group-hover:text-red-600 flex items-center gap-1 transition-all"
        >
          VIEW DETAILS
          <i className="fas fa-chevron-right text-[8px] transform group-hover:translate-x-1 transition-transform"></i>
        </Link>
      </div>
    </div>
  );
};

export default NoticeCard;
