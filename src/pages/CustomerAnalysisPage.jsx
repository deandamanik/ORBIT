import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Users,
  CreditCard,
  RefreshCw,
  Layers,
  Download,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Button from '../components/ui/Button';

const SEGMENTS_DATA = [
  {
    name: 'Bernilai Tinggi',
    color: '#2563eb',
    shape: 'circle',
    count: '4,493',
    pct: '36%',
    recency: '8 hari',
    freq: '12.4',
    orderVal: '$186.40',
  },
  {
    name: 'Setia',
    color: '#0891b2',
    shape: 'square',
    count: '3,494',
    pct: '28%',
    recency: '18 hari',
    freq: '8.7',
    orderVal: '$94.20',
  },
  {
    name: 'Potensial',
    color: '#6366f1',
    shape: 'diamond',
    count: '2,746',
    pct: '22%',
    recency: '31 hari',
    freq: '4.2',
    orderVal: '$61.80',
  },
  {
    name: 'Berisiko',
    color: '#0d9488',
    shape: 'triangle',
    count: '1,747',
    pct: '14%',
    recency: '78 hari',
    freq: '2.8',
    orderVal: '$72.10',
  },
];

// Scatter plot simulated data points
const SCATTER_POINTS = [
  // Bernilai Tinggi (High freq, high value)
  { id: '17850', x: 380, y: 55, seg: 'Bernilai Tinggi', color: '#2563eb', shape: 'circle' },
  { id: '13047', x: 420, y: 70, seg: 'Bernilai Tinggi', color: '#2563eb', shape: 'circle' },
  { id: '12583', x: 450, y: 45, seg: 'Bernilai Tinggi', color: '#2563eb', shape: 'circle' },
  { id: '14646', x: 480, y: 35, seg: 'Bernilai Tinggi', color: '#2563eb', shape: 'circle' },
  { id: '15311', x: 395, y: 85, seg: 'Bernilai Tinggi', color: '#2563eb', shape: 'circle' },
  { id: '18102', x: 440, y: 60, seg: 'Bernilai Tinggi', color: '#2563eb', shape: 'circle' },
  { id: '17450', x: 470, y: 50, seg: 'Bernilai Tinggi', color: '#2563eb', shape: 'circle' },

  // Setia (Mid-high freq, moderate value)
  { id: '14911', x: 320, y: 120, seg: 'Setia', color: '#0891b2', shape: 'square' },
  { id: '13798', x: 340, y: 135, seg: 'Setia', color: '#0891b2', shape: 'square' },
  { id: '16029', x: 360, y: 110, seg: 'Setia', color: '#0891b2', shape: 'square' },
  { id: '14096', x: 310, y: 145, seg: 'Setia', color: '#0891b2', shape: 'square' },
  { id: '17511', x: 290, y: 130, seg: 'Setia', color: '#0891b2', shape: 'square' },
  { id: '15061', x: 330, y: 115, seg: 'Setia', color: '#0891b2', shape: 'square' },

  // Potensial (Mid-low freq, high potential basket)
  { id: '14156', x: 190, y: 110, seg: 'Potensial', color: '#6366f1', shape: 'diamond' },
  { id: '16684', x: 220, y: 130, seg: 'Potensial', color: '#6366f1', shape: 'diamond' },
  { id: '14298', x: 240, y: 95, seg: 'Potensial', color: '#6366f1', shape: 'diamond' },
  { id: '15159', x: 210, y: 145, seg: 'Potensial', color: '#6366f1', shape: 'diamond' },
  { id: '16210', x: 175, y: 125, seg: 'Potensial', color: '#6366f1', shape: 'diamond' },

  // Berisiko (Low freq, low value, high recency)
  { id: '17841', x: 90, y: 185, seg: 'Berisiko', color: '#0d9488', shape: 'triangle' },
  { id: '12748', x: 110, y: 195, seg: 'Berisiko', color: '#0d9488', shape: 'triangle' },
  { id: '14088', x: 130, y: 175, seg: 'Berisiko', color: '#0d9488', shape: 'triangle' },
  { id: '15769', x: 80, y: 190, seg: 'Berisiko', color: '#0d9488', shape: 'triangle' },
  { id: '16033', x: 120, y: 180, seg: 'Berisiko', color: '#0d9488', shape: 'triangle' },
];

export default function CustomerAnalysisPage() {
  const [searchParams] = useSearchParams();
  const datasetName = searchParams.get('dataset') || 'retail_customers_q2.csv';

  const [scatterMode, setScatterMode] = useState('Frekuensi vs. Nilai');
  const [isScatterModeOpen, setIsScatterModeOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const handleExportCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Segmen,Pelanggan,Proporsi,Rata-rata Recency,Rata-rata Frequency,Rata-rata Nilai Pesanan\n' +
      SEGMENTS_DATA.map(
        (s) => `"${s.name}",${s.count.replace(',', '')},${s.pct},"${s.recency}",${s.freq},"${s.orderVal}"`
      ).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `segmentasi_pelanggan_${datasetName.replace('.csv', '')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* ── Top Header (Figma 54:7336) ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          {/* Active Dataset Tag (Figma 54:7338) */}
          <p className="text-[10px] font-bold tracking-[0.6px] text-brand-700 uppercase mb-1">
            {datasetName}
          </p>
          <h1 className="text-[26px] font-bold text-slate-900 tracking-tight leading-tight">
            Analisis Pelanggan
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            12.480 pelanggan · Analisis selesai 30 Juni 2025
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            icon={Download}
          >
            Export
          </Button>

          <Link to="/analysis/insights">
            <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
              Lanjut ke Insight
            </Button>
          </Link>
        </div>
      </div>

      {/* ── 4 Metric KPI Cards (Figma 54:7357) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Pelanggan */}
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-600 flex items-center justify-center mb-3">
            <Users className="w-4 h-4 stroke-[2]" />
          </div>
          <p className="text-xs text-slate-500">Total Pelanggan</p>
          <p className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            12,480
          </p>
          <p className="text-[10px] font-medium text-emerald-700 mt-1">
            +8,2% dari periode sebelumnya
          </p>
        </div>

        {/* KPI 2: Rata-rata Nilai Pesanan */}
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-600 flex items-center justify-center mb-3">
            <CreditCard className="w-4 h-4 stroke-[2]" />
          </div>
          <p className="text-xs text-slate-500">Rata-rata Nilai Pesanan</p>
          <p className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            $84.20
          </p>
          <p className="text-[10px] font-medium text-emerald-700 mt-1">
            +4,7% dari periode sebelumnya
          </p>
        </div>

        {/* KPI 3: Pembelian Ulang */}
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-600 flex items-center justify-center mb-3">
            <RefreshCw className="w-4 h-4 stroke-[2]" />
          </div>
          <p className="text-xs text-slate-500">Pembelian Ulang</p>
          <p className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            38.6%
          </p>
          <p className="text-[10px] font-medium text-emerald-700 mt-1">
            +2,1% dari periode sebelumnya
          </p>
        </div>

        {/* KPI 4: Segmen Teridentifikasi */}
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-600 flex items-center justify-center mb-3">
            <Layers className="w-4 h-4 stroke-[2]" />
          </div>
          <p className="text-xs text-slate-500">Segmen Teridentifikasi</p>
          <p className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            4
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            Jumlah cluster optimal
          </p>
        </div>
      </div>

      {/* ── 2-Column Section: Peta Perilaku Pelanggan & Insight Utama (Figma 54:7444) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Card (8 cols): Peta Perilaku Pelanggan (Scatter Plot) (Figma 54:7445) */}
        <div className="lg:col-span-8 bg-white border border-border-subtle rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <div>
                <h3 className="text-[15px] font-semibold text-slate-900">
                  Peta Perilaku Pelanggan
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Segmen berdasarkan Recency, Frequency, dan Monetary
                </p>
              </div>

              {/* Mode Dropdown (Figma 54:7455) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsScatterModeOpen(!isScatterModeOpen)}
                  className="inline-flex items-center gap-1.5 h-8 px-2.5 bg-white border border-border-subtle rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span>{scatterMode}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isScatterModeOpen && (
                  <div className="absolute right-0 mt-1 w-44 bg-white border border-border-subtle rounded-lg shadow-dropdown py-1 z-20">
                    {['Frekuensi vs. Nilai', 'Kebaruan vs. Nilai'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setScatterMode(opt);
                          setIsScatterModeOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs ${
                          scatterMode === opt
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
            </div>

            {/* Scatter Plot SVG (Figma 54:7460) */}
            <div className="mt-4 relative pl-8 pb-7 pr-2 pt-2 bg-surface-ground rounded-xl border border-border-subtle">
              {/* Y Axis Label */}
              <span className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-slate-400 font-medium tracking-tight">
                Nilai pesanan
              </span>

              <svg viewBox="0 0 520 220" className="w-full h-52 overflow-visible">
                {/* Horizontal Grid Lines */}
                <line x1="20" y1="30" x2="500" y2="30" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="20" y1="80" x2="500" y2="80" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="20" y1="130" x2="500" y2="130" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="20" y1="180" x2="500" y2="180" stroke="#cbd5e1" />

                {/* Vertical Grid Lines */}
                <line x1="20" y1="20" x2="20" y2="180" stroke="#cbd5e1" />
                <line x1="140" y1="20" x2="140" y2="180" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="260" y1="20" x2="260" y2="180" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="380" y1="20" x2="380" y2="180" stroke="#e2e8f0" strokeDasharray="3 3" />

                {/* Render Scatter Points */}
                {SCATTER_POINTS.map((pt) => {
                  const isHovered = hoveredPoint?.id === pt.id;
                  return (
                    <g
                      key={pt.id}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPoint(pt)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      {pt.shape === 'circle' && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHovered ? '7' : '5'}
                          fill={pt.color}
                          fillOpacity={isHovered ? 1 : 0.85}
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          className="transition-all duration-150"
                        />
                      )}
                      {pt.shape === 'square' && (
                        <rect
                          x={pt.x - (isHovered ? 6 : 4.5)}
                          y={pt.y - (isHovered ? 6 : 4.5)}
                          width={isHovered ? 12 : 9}
                          height={isHovered ? 12 : 9}
                          fill={pt.color}
                          fillOpacity={isHovered ? 1 : 0.85}
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          className="transition-all duration-150"
                        />
                      )}
                      {pt.shape === 'diamond' && (
                        <polygon
                          points={`${pt.x},${pt.y - (isHovered ? 7 : 5)} ${pt.x + (isHovered ? 7 : 5)},${pt.y} ${pt.x},${pt.y + (isHovered ? 7 : 5)} ${pt.x - (isHovered ? 7 : 5)},${pt.y}`}
                          fill={pt.color}
                          fillOpacity={isHovered ? 1 : 0.85}
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          className="transition-all duration-150"
                        />
                      )}
                      {pt.shape === 'triangle' && (
                        <polygon
                          points={`${pt.x},${pt.y - (isHovered ? 7 : 5)} ${pt.x + (isHovered ? 6 : 4.5)},${pt.y + (isHovered ? 6 : 4.5)} ${pt.x - (isHovered ? 6 : 4.5)},${pt.y + (isHovered ? 6 : 4.5)}`}
                          fill={pt.color}
                          fillOpacity={isHovered ? 1 : 0.85}
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          className="transition-all duration-150"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip on Hover */}
              {hoveredPoint && (
                <div
                  className="absolute z-20 px-2 py-1 bg-slate-900 text-white text-[10px] rounded shadow-md pointer-events-none"
                  style={{
                    left: `${Math.min(Math.max(hoveredPoint.x - 20, 10), 380)}px`,
                    top: `${hoveredPoint.y - 10}px`,
                  }}
                >
                  ID: #{hoveredPoint.id} · {hoveredPoint.seg}
                </div>
              )}

              {/* X Axis Label */}
              <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-medium">
                Frekuensi pembelian
              </span>
            </div>

            {/* Scatter Legend (Figma 54:7545) */}
            <div className="flex flex-wrap items-center justify-center gap-5 mt-3 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
                <span>Bernilai Tinggi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-[1px] bg-[#0891b2]" />
                <span>Setia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rotate-45 rounded-[1px] bg-[#6366f1]" />
                <span>Potensial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-[#0d9488]" />
                <span>Berisiko</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card (4 cols): Insight Utama (Figma 54:7564) */}
        <div className="lg:col-span-4 bg-white border border-border-subtle rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-[15px] font-semibold text-slate-900">
              Insight Utama
            </h3>

            {/* Sparkle Icon Box (Figma 54:7568) */}
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-600 flex items-center justify-center my-4">
              <Sparkles className="w-5 h-5 stroke-[2]" />
            </div>

            {/* Headline (Figma 54:7573) */}
            <h4 className="text-base font-semibold text-slate-900 leading-snug">
              Pelanggan bernilai tinggi menyumbang 58% dari total pendapatan
            </h4>

            {/* Paragraph (Figma 54:7576) */}
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Mereka mencakup 36% dari pelanggan dan bertransaksi 2,8× lebih sering dibandingkan rata-rata.
            </p>

            {/* Progress Bar (Figma 54:7578) */}
            <div className="mt-5 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Kontribusi Pendapatan</span>
                <span className="font-bold text-slate-900">58%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-600 rounded-full transition-all duration-500"
                  style={{ width: '58%' }}
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Link to="/analysis/insights" className="block">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-center bg-white border-border-subtle hover:bg-slate-50"
                icon={ArrowRight}
                iconPosition="right"
              >
                Jelajahi Pelanggan
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Section 3: Rincian Segmen Table Card (Figma 54:7598) ── */}
      <div className="bg-white border border-border-subtle rounded-xl shadow-xs overflow-hidden">
        <div className="p-5 sm:px-6 sm:py-4 border-b border-border-subtle">
          <h3 className="text-[15px] font-semibold text-slate-900">
            Rincian Segmen
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Metrik perilaku utama untuk setiap cluster pelanggan
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-ground border-b border-border-subtle text-[11px] font-semibold text-slate-500">
                <th className="py-3 px-6">Segmen</th>
                <th className="py-3 px-5">Pelanggan</th>
                <th className="py-3 px-5">Proporsi</th>
                <th className="py-3 px-5">Rata-rata Recency</th>
                <th className="py-3 px-5">Rata-rata Frequency</th>
                <th className="py-3 px-6">Rata-rata Nilai Pesanan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-xs">
              {SEGMENTS_DATA.map((s) => (
                <tr key={s.name} className="hover:bg-slate-50/70 transition-colors">
                  {/* Segmen Name with Dot */}
                  <td className="py-3.5 px-6 font-semibold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: s.color }}
                      />
                      <span>{s.name}</span>
                    </div>
                  </td>

                  {/* Pelanggan */}
                  <td className="py-3.5 px-5 font-mono text-slate-600">
                    {s.count}
                  </td>

                  {/* Proporsi */}
                  <td className="py-3.5 px-5 font-mono text-slate-700">
                    {s.pct}
                  </td>

                  {/* Rata-rata Recency */}
                  <td className="py-3.5 px-5 text-slate-600">
                    {s.recency}
                  </td>

                  {/* Rata-rata Frequency */}
                  <td className="py-3.5 px-5 font-mono text-slate-600">
                    {s.freq}
                  </td>

                  {/* Rata-rata Nilai Pesanan */}
                  <td className="py-3.5 px-6 font-semibold text-slate-900">
                    {s.orderVal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
