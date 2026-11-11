import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';

const PATH_TITLES = {
  '/': 'Ringkasan',
  '/upload': 'Upload Dataset',
  '/history': 'Riwayat Analisis',
  '/analysis/overview': 'Ringkasan Data',
  '/analysis/eda': 'Analisis Eksploratif',
  '/analysis/model': 'Evaluasi Model',
  '/analysis/customers': 'Analisis Pelanggan',
  '/analysis/insights': 'Insight Pelanggan',
  '/analysis/customer-detail': 'Pelanggan',
};

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const pageTitle = PATH_TITLES[location.pathname] || 'Ringkasan';

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/analysis/customer-detail?id=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <header className="h-[72px] bg-white/95 backdrop-blur-sm border-b border-border-subtle flex items-center justify-between px-6 lg:px-10 sticky top-0 z-10 shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'Inter' }}>
        <span className="font-semibold text-slate-900 tracking-tight">ORBIT</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-500 font-medium">{pageTitle}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <form onSubmit={handleSearch}>
          <div className="relative flex items-center w-64 md:w-72 h-[38px]">
            <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari CustomerID..."
              className="w-full h-full pl-9 pr-12 bg-surface-ground border border-border-subtle rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
            <kbd className="absolute right-2 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-border-subtle rounded shadow-2xs pointer-events-none">
              ⌘ K
            </kbd>
          </div>
        </form>

        {/* Notification Bell */}
        <button
          type="button"
          title="Notifikasi"
          className="relative w-[38px] h-[38px] flex items-center justify-center rounded-lg border border-border-subtle bg-white hover:bg-slate-50 text-slate-600 transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-brand-600 ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
}
