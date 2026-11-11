import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ChevronDown,
  Info,
  ArrowRight,
} from 'lucide-react';
import Button from '../components/ui/Button';

const TOP_CATEGORIES = [
  { name: 'Elektronik', revenue: '$482K', pct: 86 },
  { name: 'Rumah & Gaya Hidup', revenue: '$391K', pct: 70 },
  { name: 'Busana', revenue: '$312K', pct: 56 },
  { name: 'Kecantikan', revenue: '$218K', pct: 39 },
  { name: 'Olahraga', revenue: '$157K', pct: 28 },
];

const GEO_DISTRIBUTION = [
  { country: 'Indonesia', pct: 42 },
  { country: 'Singapore', pct: 21 },
  { country: 'Malaysia', pct: 18 },
  { country: 'Thailand', pct: 11 },
  { country: 'Lainnya', pct: 8 },
];

const RFM_DISTRIBUTIONS = {
  recency: [
    { score: 1, heightPct: 31, count: '1.498' },
    { score: 2, heightPct: 46, count: '2.246' },
    { score: 3, heightPct: 64, count: '2.995' },
    { score: 4, heightPct: 84, count: '3.994' },
    { score: 5, heightPct: 100, count: '4.742' },
  ],
  frequency: [
    { score: 1, heightPct: 100, count: '3.994' },
    { score: 2, heightPct: 85, count: '3.370' },
    { score: 3, heightPct: 68, count: '2.745' },
    { score: 4, heightPct: 50, count: '1.997' },
    { score: 5, heightPct: 31, count: '1.248' },
  ],
  monetary: [
    { score: 1, heightPct: 87, count: '3.370' },
    { score: 2, heightPct: 100, count: '3.869' },
    { score: 3, heightPct: 76, count: '2.870' },
    { score: 4, heightPct: 57, count: '2.246' },
    { score: 5, heightPct: 42, count: '1.622' },
  ],
};

export default function EdaPage() {
  const [searchParams] = useSearchParams();
  const datasetName = searchParams.get('dataset') || 'retail_customers_q2.csv';

  const [transactionFilter, setTransactionFilter] = useState('Semua Transaksi');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredRfm, setHoveredRfm] = useState(null);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* ── Top Header (Figma 54:6535) ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          {/* Active Dataset Tag (Figma 54:6537) */}
          <p className="text-[10px] font-bold tracking-[0.6px] text-brand-700 uppercase mb-1">
            {datasetName}
          </p>
          <h1 className="text-[26px] font-bold text-slate-900 tracking-tight leading-tight">
            Analisis Data Eksploratif
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Pahami pola produk, wilayah, dan RFM dalam data pelanggan.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {/* Transaction Filter Dropdown (Figma 54:6547) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center gap-2 h-[34px] px-3 bg-white border border-border-subtle rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>{transactionFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white border border-border-subtle rounded-lg shadow-dropdown py-1 z-20">
                {['Semua Transaksi', 'Kuartal Berjalan', 'Kuartal Sebelumnya'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setTransactionFilter(opt);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors ${
                      transactionFilter === opt
                        ? 'bg-brand-50 text-brand-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/analysis/model">
            <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
              Lanjut ke Model Fuzzy
            </Button>
          </Link>
        </div>
      </div>

      {/* ── 2-Column Section: Kategori Produk & Sebaran Geografis (Figma 54:6552) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column (7 cols): Kategori Produk Teratas (Figma 54:6553) */}
        <div className="lg:col-span-7 bg-white border border-border-subtle rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-[15px] font-semibold text-slate-900">
              Kategori Produk Teratas
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Kontribusi pendapatan per kategori
            </p>
          </div>

          {/* Horizontal Bar List (Figma 54:6563) */}
          <div className="mt-5 space-y-4">
            {TOP_CATEGORIES.map((cat) => (
              <div key={cat.name} className="flex items-center gap-3 text-xs">
                {/* Category Label */}
                <span className="w-32 shrink-0 text-slate-700 font-medium truncate">
                  {cat.name}
                </span>

                {/* Progress Bar Container */}
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-600 rounded-full transition-all duration-300 hover:bg-brand-700"
                    style={{ width: `${cat.pct}%` }}
                  />
                </div>

                {/* Revenue Value */}
                <span className="w-12 shrink-0 font-bold text-slate-900 text-right font-mono">
                  {cat.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (5 cols): Sebaran Geografis Pelanggan (Figma 54:6610) */}
        <div className="lg:col-span-5 bg-white border border-border-subtle rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-[15px] font-semibold text-slate-900">
              Sebaran Geografis Pelanggan
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Proporsi pelanggan berdasarkan negara
            </p>
          </div>

          {/* Progress Bar List with Cyan Fill (Figma 54:6620) */}
          <div className="mt-5 space-y-3.5">
            {GEO_DISTRIBUTION.map((geo) => (
              <div key={geo.country} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-medium">{geo.country}</span>
                  <span className="font-bold text-slate-800 font-mono">{geo.pct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                    style={{ width: `${geo.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 2: Distribusi RFM (Figma 54:6677) ── */}
      <div className="bg-white border border-border-subtle rounded-xl p-5 sm:p-6 shadow-xs">
        {/* RFM Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-border-subtle">
          <div>
            <h3 className="text-[15px] font-semibold text-slate-900">
              Distribusi RFM
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Sebaran pelanggan berdasarkan skor Recency, Frequency, dan Monetary
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border-subtle text-xs text-slate-600 bg-surface-ground">
            <span>Skor 1–5</span>
          </div>
        </div>

        {/* 3 Dimension Bar Charts (Figma 54:6692) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
          {/* Dimension 1: Recency (Blue) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Recency</span>
              <span className="text-[10px] text-slate-400">Kebaruan Belanja</span>
            </div>
            <div className="bg-surface-ground border border-border-subtle rounded-xl p-3 pt-6 pb-2">
              <div className="h-36 flex items-end justify-between gap-2 px-1">
                {RFM_DISTRIBUTIONS.recency.map((bar) => (
                  <div
                    key={bar.score}
                    className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                    onMouseEnter={() => setHoveredRfm(`r-${bar.score}`)}
                    onMouseLeave={() => setHoveredRfm(null)}
                  >
                    {hoveredRfm === `r-${bar.score}` && (
                      <div className="absolute -top-7 z-10 px-1.5 py-0.5 bg-slate-900 text-white text-[9px] rounded shadow pointer-events-none whitespace-nowrap">
                        {bar.count}
                      </div>
                    )}
                    <div
                      className="w-full max-w-[32px] bg-brand-600 rounded-t group-hover:bg-brand-700 transition-all duration-200"
                      style={{ height: `${bar.heightPct}%` }}
                    />
                    <span className="text-[10px] text-slate-500 mt-2 font-semibold">
                      {bar.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dimension 2: Frequency (Cyan / Teal) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Frequency</span>
              <span className="text-[10px] text-slate-400">Kekerapan Belanja</span>
            </div>
            <div className="bg-surface-ground border border-border-subtle rounded-xl p-3 pt-6 pb-2">
              <div className="h-36 flex items-end justify-between gap-2 px-1">
                {RFM_DISTRIBUTIONS.frequency.map((bar) => (
                  <div
                    key={bar.score}
                    className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                    onMouseEnter={() => setHoveredRfm(`f-${bar.score}`)}
                    onMouseLeave={() => setHoveredRfm(null)}
                  >
                    {hoveredRfm === `f-${bar.score}` && (
                      <div className="absolute -top-7 z-10 px-1.5 py-0.5 bg-slate-900 text-white text-[9px] rounded shadow pointer-events-none whitespace-nowrap">
                        {bar.count}
                      </div>
                    )}
                    <div
                      className="w-full max-w-[32px] bg-cyan-600 rounded-t group-hover:bg-cyan-700 transition-all duration-200"
                      style={{ height: `${bar.heightPct}%` }}
                    />
                    <span className="text-[10px] text-slate-500 mt-2 font-semibold">
                      {bar.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dimension 3: Monetary (Indigo) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Monetary</span>
              <span className="text-[10px] text-slate-400">Total Nilai Belanja</span>
            </div>
            <div className="bg-surface-ground border border-border-subtle rounded-xl p-3 pt-6 pb-2">
              <div className="h-36 flex items-end justify-between gap-2 px-1">
                {RFM_DISTRIBUTIONS.monetary.map((bar) => (
                  <div
                    key={bar.score}
                    className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                    onMouseEnter={() => setHoveredRfm(`m-${bar.score}`)}
                    onMouseLeave={() => setHoveredRfm(null)}
                  >
                    {hoveredRfm === `m-${bar.score}` && (
                      <div className="absolute -top-7 z-10 px-1.5 py-0.5 bg-slate-900 text-white text-[9px] rounded shadow pointer-events-none whitespace-nowrap">
                        {bar.count}
                      </div>
                    )}
                    <div
                      className="w-full max-w-[32px] bg-indigo-600 rounded-t group-hover:bg-indigo-700 transition-all duration-200"
                      style={{ height: `${bar.heightPct}%` }}
                    />
                    <span className="text-[10px] text-slate-500 mt-2 font-semibold">
                      {bar.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footnote (Figma 54:6786) */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>
            Skor 5 menunjukkan perilaku terbaik pada setiap dimensi RFM.
          </span>
        </div>
      </div>
    </div>
  );
}
