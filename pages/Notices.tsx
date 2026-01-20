
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { api } from '../services/apiService';
import { Notice, Category } from '../types';
import NoticeCard from '../components/NoticeCard';
import SEO from '../components/SEO';

const Notices: React.FC = () => {
  const { category: catParam } = useParams<{ category: string }>();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await api.getNotices(catParam);
      setNotices(data);
      setLoading(false);
    };
    fetch();
  }, [catParam]);

  const categoryName = catParam ? catParam.charAt(0).toUpperCase() + catParam.slice(1) : 'All';

  return (
    <div className="space-y-8">
      <SEO 
        title={`${categoryName} Notices 2081/2082`}
        description={`Browse all ${categoryName} notices, vacancies, and official announcements from Nepal.`}
        keywords="nepal notices, vacancy 2081, loksewa notice, sarkari notice"
      />

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-blue-900">{categoryName} Notices</h1>
          <p className="text-gray-500">Showing {notices.length} documents</p>
        </div>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <button className="px-6 py-2 rounded-lg bg-white text-blue-900 font-bold shadow-sm">Grid</button>
          <button className="px-6 py-2 rounded-lg text-gray-500 font-medium">List</button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notices.map(notice => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notices;
