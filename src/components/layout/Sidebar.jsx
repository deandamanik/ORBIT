import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Home,
  PlusCircle,
  History,
  FileSpreadsheet,
  BarChart2,
  Cpu,
  PieChart,
  Lightbulb,
  User,
  FileText,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import logoOrbit from '../../assets/logo-orbit.svg';

export default function Sidebar() {
  const location = useLocation();
  const isAnalysisActive = location.pathname.startsWith('/analysis');

  // Figma: "RUANG KERJA" section
  const workspaceItems = [
    { label: 'Beranda', path: '/', icon: Home, end: true },
    { label: 'Analisis Baru', path: '/upload', icon: PlusCircle },
    { label: 'Riwayat', path: '/history', icon: History },
  ];

  // Figma: "ANALISIS SAAT INI" section (Exact labels from Figma 54:6440–54:6479)
  const analysisItems = [
    { label: 'Ringkasan', path: '/analysis/overview', icon: FileSpreadsheet },
    { label: 'EDA', path: '/analysis/eda', icon: BarChart2 },
    { label: 'RFM & Model', path: '/analysis/model', icon: Cpu },
    { label: 'Segmentasi', path: '/analysis/customers', icon: PieChart },
    { label: 'Insight', path: '/analysis/insights', icon: Lightbulb },
    { label: 'Pelanggan', path: '/analysis/customer-detail', icon: User },
  ];

  return (
    <aside className="w-[240px] h-screen bg-white border-r border-border-subtle flex flex-col shrink-0 sticky top-0 select-none z-20">
      {/* ── Brand Header (Figma 54:5448) h=72 ── */}
      <div className="h-[72px] px-5 flex items-center gap-[11px] border-b border-border-subtle shrink-0">
        <img src={logoOrbit} alt="ORBIT" className="w-[35px] h-[35px] object-contain" />
        <span
          className="text-slate-900 text-[18px] font-bold tracking-[0.5px] leading-[27px]"
          style={{ fontFamily: 'Inter' }}
        >
          ORBIT
        </span>
      </div>

      {/* ── Navigation Body ── */}
      <div className="flex-1 overflow-y-auto py-5 flex flex-col gap-5">
        {/* Section: RUANG KERJA (Figma 54:5460) */}
        <div>
          <p className="px-[22px] text-[10px] font-bold text-slate-400 tracking-[0.8px] uppercase mb-2">
            RUANG KERJA
          </p>
          <nav className="flex flex-col gap-0.5 px-3">
            {workspaceItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `relative flex items-center gap-[10px] h-[38px] px-3 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] bg-brand-600 rounded-r-full" />
                      )}
                      <Icon
                        className={`w-[18px] h-[18px] shrink-0 ${
                          isActive ? 'text-brand-600' : 'text-slate-400'
                        }`}
                      />
                      <span style={{ fontFamily: 'Inter' }}>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Section: ANALISIS SAAT INI (Figma 54:6418) */}
        <div className="border-t border-border-subtle pt-4">
          <p className="px-[22px] text-[10px] font-bold text-slate-400 tracking-[0.8px] uppercase mb-2.5">
            ANALISIS SAAT INI
          </p>

          {/* Active Dataset Card vs Empty State */}
          {isAnalysisActive ? (
            /* Active Dataset Card (Figma 54:6422) */
            <div className="mx-3 mb-2 p-2 rounded-lg bg-surface-ground border border-border-subtle flex items-center gap-2.5">
              <div className="w-[30px] h-[30px] rounded-md bg-white border border-border-subtle flex items-center justify-center shrink-0 text-brand-600">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-slate-900 truncate leading-tight">
                  retail_customers_q2.csv
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span className="text-[10px] font-medium text-emerald-700">
                    Selesai
                  </span>
                </div>
              </div>
              <Link
                to="/history"
                title="Ganti dataset"
                className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            /* Empty State (Figma 54:5736) */
            <div className="px-[22px] mb-3">
              <p className="text-xs font-semibold text-slate-800 leading-[15px]">
                Belum ada analisis dipilih
              </p>
              <p className="text-[10px] text-slate-400 mt-1 leading-[14px]">
                Upload Dataset untuk memulai analisis.
              </p>
              <Link
                to="/upload"
                className="mt-2.5 inline-flex items-center justify-center w-full h-8 px-3 rounded-lg border border-border-subtle bg-white text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                Analisis Baru
              </Link>
            </div>
          )}

          {/* Analysis Menu Items (Figma 54:6440–54:6479) */}
          <nav className="flex flex-col gap-0.5 px-3">
            {analysisItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative flex items-center gap-[10px] h-[38px] px-3 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 font-semibold'
                        : isAnalysisActive
                        ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] bg-brand-600 rounded-r-full" />
                      )}
                      <Icon
                        className={`w-[18px] h-[18px] shrink-0 ${
                          isActive ? 'text-brand-600' : 'text-slate-400'
                        }`}
                      />
                      <span style={{ fontFamily: 'Inter' }}>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── User Footer (Figma 54:5504) h=72 ── */}
      <div className="h-[72px] px-4 border-t border-border-subtle flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          {/* Avatar initials (Figma 54:5505 "DD") */}
          <div className="w-[34px] h-[34px] rounded-full bg-blue-100 text-brand-800 text-xs font-bold flex items-center justify-center shrink-0 border border-blue-200">
            DD
          </div>
          <div className="flex flex-col min-w-0">
            <span
              className="text-xs font-bold text-slate-900 truncate leading-tight"
              style={{ fontFamily: 'Inter' }}
            >
              Dean Damanik
            </span>
            <span
              className="text-[10px] text-slate-500 truncate leading-tight mt-0.5"
              style={{ fontFamily: 'Inter' }}
            >
              Analis Data
            </span>
          </div>
        </div>

        {/* Logout icon (Figma 54:5516) */}
        <Link
          to="/login"
          title="Keluar"
          className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
        >
          <LogOut className="w-[18px] h-[18px]" />
        </Link>
      </div>
    </aside>
  );
}
