import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Info,
} from 'lucide-react';
import Button from '../components/ui/Button';

const PIPELINE_STEPS = [
  { num: 1, title: 'Data Cleaning', sub: '31.882 baris valid' },
  { num: 2, title: 'Hitung RFM', sub: '12.480 pelanggan' },
  { num: 3, title: 'Standard Scaling', sub: 'Mean 0 · SD 1' },
  { num: 4, title: 'K-Means & Fuzzy', sub: 'K optimal = 4' },
];

const ELBOW_POINTS = [
  { k: 2, inertia: 7420, x: 50, y: 35 },
  { k: 3, inertia: 5180, x: 120, y: 80 },
  { k: 4, inertia: 3620, x: 190, y: 125, isElbow: true },
  { k: 5, inertia: 2840, x: 260, y: 160 },
  { k: 6, inertia: 2310, x: 330, y: 180 },
  { k: 7, inertia: 1950, x: 400, y: 195 },
  { k: 8, inertia: 1680, x: 470, y: 205 },
  { k: 9, inertia: 1490, x: 540, y: 212 },
];

const SCALING_FEATURES = [
  { feature: 'Recency', before: '0–365', after: '−1.82–2.41' },
  { feature: 'Frequency', before: '1–42', after: '−0.91–3.74' },
  { feature: 'Monetary', before: '$8–$4.2K', after: '−0.76–5.12' },
];

const FUZZY_MEMBERSHIPS = [
  {
    dim: 'Recency',
    terms: [
      { name: 'Baru', range: '0 – 45 hari', type: 'Trapesium Kiri' },
      { name: 'Sedang', range: '30 – 120 hari', type: 'Segitiga' },
      { name: 'Lama', range: '> 90 hari', type: 'Trapesium Kanan' },
    ],
  },
  {
    dim: 'Frequency',
    terms: [
      { name: 'Jarang', range: '1 – 3 kali', type: 'Trapesium Kiri' },
      { name: 'Sedang', range: '2 – 8 kali', type: 'Segitiga' },
      { name: 'Sering', range: '> 6 kali', type: 'Trapesium Kanan' },
    ],
  },
  {
    dim: 'Monetary',
    terms: [
      { name: 'Rendah', range: '< Rp 1.5M', type: 'Trapesium Kiri' },
      { name: 'Sedang', range: 'Rp 1M – 5M', type: 'Segitiga' },
      { name: 'Tinggi', range: '> Rp 4M', type: 'Trapesium Kanan' },
    ],
  },
];

export default function FuzzyModelPage() {
  const [activeTab, setActiveTab] = useState('elbow'); // 'elbow' | 'fuzzy'
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const handleExportEvaluation = () => {
    const report =
      `LAPORAN EVALUASI MODEL - ORBIT\n` +
      `Pipeline: RFM + K-Means & Fuzzy Mamdani\n` +
      `Jumlah Cluster Terpilih: 4 (Rekomendasi Elbow)\n` +
      `Silhouette Score: 0.62 (Pemisahan cluster baik)\n` +
      `Davies-Bouldin Index: 0.74 (Semakin kecil semakin baik)\n\n` +
      `FITUR RFM SETELAH SCALING:\n` +
      SCALING_FEATURES.map((f) => `- ${f.feature}: Sebelum=${f.before}, Sesudah=${f.after}`).join('\n') +
      `\n\nINTERPRETASI:\n` +
      `K = 4 menyeimbangkan kekompakan cluster dan kegunaan segmen bisnis.`;

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evaluasi_model_k4.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* ── Top Header (Figma 54:6949) ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          {/* Active Pipeline Tag (Figma 54:6951) */}
          <p className="text-[10px] font-bold tracking-[0.6px] text-brand-700 uppercase mb-1">
            PIPELINE RFM + K-MEANS &amp; FUZZY
          </p>
          <h1 className="text-[26px] font-bold text-slate-900 tracking-tight leading-tight">
            Evaluasi Model
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Tinjau persiapan fitur, pemilihan cluster, dan kualitas model.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportEvaluation}
            icon={Download}
          >
            Export Evaluasi
          </Button>

          <Link to="/analysis/customers">
            <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
              Lanjut ke Segmentasi
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Pipeline Stepper Banner (Figma 54:6968) ── */}
      <div className="bg-white border border-border-subtle rounded-xl p-4 sm:px-6 sm:py-4 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          {PIPELINE_STEPS.map((step, idx) => (
            <div key={step.num} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-50 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-100">
                  {step.num}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    {step.title}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {step.sub}
                  </p>
                </div>
              </div>

              {idx < PIPELINE_STEPS.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-300 hidden md:block shrink-0 ml-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── 3 Metric KPI Cards (Figma 54:7026) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KPI 1: Cluster Terpilih */}
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-xs">
          <p className="text-xs text-slate-500">Jumlah cluster terpilih</p>
          <p className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
            4
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Rekomendasi Elbow</p>
        </div>

        {/* KPI 2: Silhouette Score */}
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-xs">
          <p className="text-xs text-slate-500">Silhouette Score</p>
          <p className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
            0.62
          </p>
          <p className="text-[11px] font-semibold text-emerald-700 mt-1">
            Pemisahan cluster baik
          </p>
        </div>

        {/* KPI 3: Davies-Bouldin Index */}
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-xs">
          <p className="text-xs text-slate-500">Davies–Bouldin Index</p>
          <p className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
            0.74
          </p>
          <p className="text-[11px] font-semibold text-emerald-700 mt-1">
            Semakin kecil semakin baik
          </p>
        </div>
      </div>

      {/* ── Main Analysis Section: Elbow Method & Feature Scaling (Figma 54:7063) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column (7 cols): Elbow Method Chart & Fuzzy Toggle (Figma 54:7064) */}
        <div className="lg:col-span-7 bg-white border border-border-subtle rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <div>
                <h3 className="text-[15px] font-semibold text-slate-900">
                  {activeTab === 'elbow' ? 'Elbow Method' : 'Fungsi Keanggotaan Fuzzy (Mamdani)'}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {activeTab === 'elbow'
                    ? 'Inertia berdasarkan jumlah cluster (K)'
                    : 'Derajat linguistik RFM untuk pemodelan inferensi'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === 'elbow' ? 'fuzzy' : 'elbow')}
                  className="px-2.5 py-1 rounded-lg border border-border-subtle bg-slate-50 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {activeTab === 'elbow' ? 'Lihat Fuzzy' : 'Lihat Elbow'}
                </button>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  K terpilih = 4
                </span>
              </div>
            </div>

            {/* Content: Elbow SVG Chart */}
            {activeTab === 'elbow' ? (
              <div className="mt-4">
                <div className="relative w-full h-56 bg-surface-ground rounded-xl border border-border-subtle p-3 flex flex-col justify-between">
                  {hoveredPoint && (
                    <div className="absolute top-3 right-3 bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded-md shadow-md z-10 pointer-events-none font-medium">
                      K = {hoveredPoint.k} · Inertia: {hoveredPoint.inertia}
                    </div>
                  )}
                  <svg viewBox="0 0 580 240" className="w-full h-44 overflow-visible">
                    {/* Grid lines */}
                    <line x1="40" y1="30" x2="550" y2="30" stroke="#e2e8f0" strokeDasharray="3 3" />
                    <line x1="40" y1="90" x2="550" y2="90" stroke="#e2e8f0" strokeDasharray="3 3" />
                    <line x1="40" y1="150" x2="550" y2="150" stroke="#e2e8f0" strokeDasharray="3 3" />
                    <line x1="40" y1="210" x2="550" y2="210" stroke="#cbd5e1" />

                    {/* Drop line at Elbow Knee K = 4 */}
                    <line
                      x1={ELBOW_POINTS[2].x}
                      y1={ELBOW_POINTS[2].y}
                      x2={ELBOW_POINTS[2].x}
                      y2={210}
                      stroke="#2563eb"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />

                    {/* Connecting Curve */}
                    <path
                      d="M 50 35 Q 100 70 120 80 T 190 125 T 260 160 T 330 180 T 400 195 T 470 205 T 540 212"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                    />

                    {/* Data Points */}
                    {ELBOW_POINTS.map((pt) => (
                      <g
                        key={pt.k}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPoint(pt)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        {pt.isElbow && (
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="9"
                            fill="#dbeafe"
                            className="animate-pulse"
                          />
                        )}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={pt.isElbow ? '5.5' : '4'}
                          fill={pt.isElbow ? '#2563eb' : '#ffffff'}
                          stroke="#2563eb"
                          strokeWidth="2"
                        />
                      </g>
                    ))}
                  </svg>

                  {/* K Axis Labels */}
                  <div className="flex justify-between px-3 text-[11px] font-semibold text-slate-500 border-t border-slate-200 pt-1.5">
                    {ELBOW_POINTS.map((pt) => (
                      <span
                        key={pt.k}
                        className={pt.isElbow ? 'text-brand-700 font-bold' : ''}
                      >
                        {pt.k}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 text-center mt-2">
                  Jumlah cluster (K) · Titik siku (*elbow*) terbentuk pada K = 4
                </p>
              </div>
            ) : (
              /* Content: Fuzzy Memberships */
              <div className="mt-4 space-y-3">
                {FUZZY_MEMBERSHIPS.map((fm) => (
                  <div
                    key={fm.dim}
                    className="p-3 rounded-lg border border-border-subtle bg-surface-ground text-xs"
                  >
                    <p className="font-bold text-slate-900 mb-2">
                      Fungsi Keanggotaan: {fm.dim}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {fm.terms.map((t) => (
                        <div
                          key={t.name}
                          className="bg-white p-2 rounded border border-slate-200 text-center"
                        >
                          <p className="font-semibold text-brand-700 text-[11px]">
                            {t.name}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                            {t.range}
                          </p>
                          <span className="text-[9px] text-slate-400">
                            {t.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Fitur RFM setelah scaling (Figma 54:7110) */}
        <div className="lg:col-span-5 bg-white border border-border-subtle rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-[15px] font-semibold text-slate-900">
              Fitur RFM setelah scaling
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              StandardScaler mencegah nilai Monetary mendominasi perhitungan jarak.
            </p>

            {/* Feature Scaling Comparison Table (Figma 54:7117) */}
            <div className="border border-border-subtle rounded-lg overflow-hidden mt-5 bg-white">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-surface-ground border-b border-border-subtle text-[11px] font-semibold text-slate-500">
                    <th className="py-2.5 px-3">Fitur</th>
                    <th className="py-2.5 px-3">Sebelum</th>
                    <th className="py-2.5 px-3">Sesudah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle font-mono text-[11px] text-slate-700">
                  {SCALING_FEATURES.map((f) => (
                    <tr key={f.feature} className="hover:bg-slate-50/60">
                      <td className="py-3 px-3 font-sans font-bold text-slate-800">
                        {f.feature}
                      </td>
                      <td className="py-3 px-3 text-slate-500">{f.before}</td>
                      <td className="py-3 px-3 font-semibold text-brand-700">
                        {f.after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Green Badge Box (Figma 54:7158) */}
            <div className="bg-emerald-50/80 border border-emerald-200/60 rounded-lg p-2.5 flex items-center gap-2.5 mt-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <p className="text-[11px] text-emerald-800 font-medium leading-snug">
                Skala fitur tetap seimbang setelah transformasi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interpretasi Card (Figma 54:7167) ── */}
      <div className="bg-white border border-border-subtle rounded-xl p-4 sm:px-5 sm:py-3.5 shadow-xs flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-blue-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900">
            Interpretasi
          </h4>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
            K = 4 menyeimbangkan kekompakan cluster dan kegunaan segmen bisnis. Nilai Silhouette Score (0.62) dan DBI (0.74) menunjukkan pemisahan yang memadai untuk dilanjutkan ke klasifikasi segmen pelanggan.
          </p>
        </div>
      </div>
    </div>
  );
}
