import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  Search,
  ChevronDown,
  FileText,
  ArrowRight,
} from 'lucide-react';
import Button from '../components/ui/Button';

const INITIAL_HISTORY = [
  {
    id: '1',
    name: 'retail_customers_q2.csv',
    date: '30 Jun 2025',
    customers: '12,480',
    segments: '4',
    status: 'Selesai',
  },
  {
    id: '2',
    name: 'online_orders_may.csv',
    date: '3 Jun 2025',
    customers: '9,842',
    segments: '5',
    status: 'Selesai',
  },
  {
    id: '3',
    name: 'customer_export_apr.csv',
    date: '4 Mei 2025',
    customers: '8,219',
    segments: '4',
    status: 'Selesai',
  },
  {
    id: '4',
    name: 'march_campaign_data.csv',
    date: '5 Apr 2025',
    customers: '7,904',
    segments: '3',
    status: 'Selesai',
  },
];

export default function HistoryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredData = INITIAL_HISTORY.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'Semua Status' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAnalysis = (item) => {
    navigate(`/analysis/overview?dataset=${encodeURIComponent(item.name)}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* ── Top Header (Figma 54:5805) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-slate-900 tracking-tight leading-tight">
            Riwayat Analisis
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Lihat dan buka kembali Dataset yang pernah diproses.
          </p>
        </div>

        <Link to="/upload" className="shrink-0">
          <Button variant="primary" size="sm" icon={Plus}>
            Analisis Baru
          </Button>
        </Link>
      </div>

      {/* ── Main History Table Card (Figma 54:5821) ── */}
      <div className="bg-white border border-border-subtle rounded-xl shadow-xs overflow-hidden">
        {/* Top Control Bar: Search & Status Filter (Figma 54:5822) */}
        <div className="p-4 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle bg-white">
          {/* Search Dataset Input (Figma 54:5823) */}
          <div className="relative flex items-center w-full sm:w-64 h-[38px]">
            <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Dataset"
              className="w-full h-full pl-9 pr-3 bg-white border border-border-subtle rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
          </div>

          {/* Status Filter Pill Dropdown (Figma 54:5829) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center gap-2 h-[34px] px-3 bg-white border border-border-subtle rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none transition-colors"
            >
              <span>{statusFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-1.5 w-40 bg-white border border-border-subtle rounded-lg shadow-dropdown py-1 z-20">
                {['Semua Status', 'Selesai'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setStatusFilter(status);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors ${
                      statusFilter === status
                        ? 'bg-brand-50 text-brand-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Table (Figma 54:5835) ── */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-ground border-b border-border-subtle text-[11px] font-semibold text-slate-500">
                <th className="py-3 px-5">Dataset</th>
                <th className="py-3 px-4">Dibuat</th>
                <th className="py-3 px-4">Pelanggan</th>
                <th className="py-3 px-4">Segmen</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-5 text-right sr-only sm:not-sr-only">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-xs">
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => handleOpenAnalysis(row)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                  >
                    {/* Dataset Name with File Icon (Figma 54:5856) */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-md bg-blue-50 text-brand-600 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 stroke-[1.8]" />
                        </div>
                        <span className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
                          {row.name}
                        </span>
                      </div>
                    </td>

                    {/* Dibuat (Figma 54:5863) */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {row.date}
                    </td>

                    {/* Pelanggan (Figma 54:5866) */}
                    <td className="py-3.5 px-4 font-mono text-slate-600 font-medium whitespace-nowrap">
                      {row.customers}
                    </td>

                    {/* Segmen (Figma 54:5869) */}
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {row.segments}
                    </td>

                    {/* Status Badge (Figma 54:5872) */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        {row.status}
                      </span>
                    </td>

                    {/* Action Button (Figma 54:5877) */}
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAnalysis(row);
                        }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-brand-600 hover:bg-brand-50 transition-colors ml-auto"
                        title="Buka Analisis"
                      >
                        <ArrowRight className="w-4 h-4 stroke-[2]" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-xs">
                    Tidak ada riwayat analisis yang cocok dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Table Footer & Pagination (Figma 54:5959) ── */}
        <div className="px-5 py-3.5 bg-white border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <p className="text-slate-500">
            Menampilkan 1–{filteredData.length} dari {INITIAL_HISTORY.length} analisis
          </p>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              disabled
              className="px-3 py-1.5 rounded-lg border border-border-subtle bg-white text-xs font-semibold text-slate-300 cursor-not-allowed"
            >
              Sebelumnya
            </button>
            <button
              type="button"
              disabled
              className="px-3 py-1.5 rounded-lg border border-border-subtle bg-white text-xs font-semibold text-slate-300 cursor-not-allowed"
            >
              Berikutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
