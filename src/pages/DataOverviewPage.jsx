import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Users,
  CreditCard,
  Calendar,
  ShieldCheck,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import Button from '../components/ui/Button';

const MONTHLY_DATA = [
  { month: 'Jul', count: '2.410', heightPct: 61 },
  { month: 'Agu', count: '2.650', heightPct: 68 },
  { month: 'Sep', count: '2.120', heightPct: 54 },
  { month: 'Okt', count: '3.010', heightPct: 76 },
  { month: 'Nov', count: '2.840', heightPct: 72 },
  { month: 'Des', count: '3.280', heightPct: 83 },
  { month: 'Jan', count: '2.590', heightPct: 66 },
  { month: 'Feb', count: '3.520', heightPct: 89 },
  { month: 'Mar', count: '3.080', heightPct: 78 },
  { month: 'Apr', count: '3.710', heightPct: 94 },
  { month: 'Mei', count: '3.450', heightPct: 87 },
  { month: 'Jun', count: '3.960', heightPct: 100 },
];

const COLUMN_PROFILES = [
  {
    col: 'customer_id',
    type: 'Text',
    completeness: '100%',
    unique: '12,480',
    status: 'Valid',
    statusVariant: 'success',
  },
  {
    col: 'order_date',
    type: 'Tanggal',
    completeness: '100%',
    unique: '364',
    status: 'Valid',
    statusVariant: 'success',
  },
  {
    col: 'order_value',
    type: 'Decimal',
    completeness: '99.8%',
    unique: '8,214',
    status: 'Perlu ditinjau',
    statusVariant: 'warning',
  },
  {
    col: 'order_id',
    type: 'Text',
    completeness: '100%',
    unique: '31,906',
    status: 'Valid',
    statusVariant: 'success',
  },
];

export default function DataOverviewPage() {
  const [searchParams] = useSearchParams();
  const datasetName = searchParams.get('dataset') || 'retail_customers_q2.csv';

  const [hoveredMonth, setHoveredMonth] = useState(null);

  const handleExportQuality = () => {
    const report =
      `LAPORAN KUALITAS DATASET - ORBIT\n` +
      `Dataset: ${datasetName}\n` +
      `Skor Kualitas: 96 / 100\n` +
      `Jumlah Pelanggan: 12,480\n` +
      `Total Transaksi: 31,906\n` +
      `Cakupan Periode: 365 hari (Jul 2024 – Jun 2025)\n` +
      `Kelengkapan Data: 99.8%\n\n` +
      `PROFIL KOLOM:\n` +
      COLUMN_PROFILES.map(
        (c) => `- ${c.col}: Tipe=${c.type}, Kelengkapan=${c.completeness}, Unik=${c.unique}, Status=${c.status}`
      ).join('\n');

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kualitas_${datasetName.replace('.csv', '')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* ── Top Header (Figma 54:6080) ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          {/* Active Dataset Tag (Figma 54:6082) */}
          <p className="text-[10px] font-bold tracking-[0.6px] text-brand-700 uppercase mb-1">
            {datasetName}
          </p>
          <h1 className="text-[26px] font-bold text-slate-900 tracking-tight leading-tight">
            Ringkasan Data
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Tinjau struktur, kualitas, dan cakupan Dataset sebelum menginterpretasikan hasil analisis.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportQuality}
            icon={Download}
          >
            Export Kualitas Data
          </Button>

          <Link to="/analysis/eda">
            <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
              Lanjut ke EDA
            </Button>
          </Link>
        </div>
      </div>

      {/* ── 4 Metric KPI Cards (Figma 54:6099) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Jumlah Pelanggan */}
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-600 flex items-center justify-center mb-3">
            <Users className="w-4 h-4 stroke-[2]" />
          </div>
          <p className="text-xs text-slate-500">Jumlah Pelanggan</p>
          <p className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            12,480
          </p>
          <p className="text-[10px] text-slate-400 mt-1">ID pelanggan unik</p>
        </div>

        {/* KPI 2: Transaksi */}
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-600 flex items-center justify-center mb-3">
            <CreditCard className="w-4 h-4 stroke-[2]" />
          </div>
          <p className="text-xs text-slate-500">Transaksi</p>
          <p className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            31,906
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Dari seluruh channel</p>
        </div>

        {/* KPI 3: Cakupan Periode */}
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-600 flex items-center justify-center mb-3">
            <Calendar className="w-4 h-4 stroke-[2]" />
          </div>
          <p className="text-xs text-slate-500">Cakupan Periode</p>
          <p className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            365 hari
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Jul 2024 – Jun 2025</p>
        </div>

        {/* KPI 4: Kelengkapan Data */}
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-4 h-4 stroke-[2]" />
          </div>
          <p className="text-xs text-slate-500">Kelengkapan Data</p>
          <p className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            99.8%
          </p>
          <p className="text-[10px] font-semibold text-emerald-700 mt-1">
            Siap dianalisis
          </p>
        </div>
      </div>

      {/* ── 2-Column Section: Cakupan Transaksi & Ringkasan Kualitas (Figma 54:6172) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Left Column (2/3): Cakupan Transaksi Bar Chart (Figma 54:6173) */}
        <div className="lg:col-span-2 bg-white border border-border-subtle rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-[15px] font-semibold text-slate-900">
              Cakupan Transaksi
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Jumlah catatan per bulan dalam Dataset yang di-import
            </p>
          </div>

          {/* Bar Chart Container (Figma 54:6183) */}
          <div className="mt-6 pt-2 pb-1 bg-surface-ground rounded-xl p-4 border border-border-subtle">
            <div className="h-44 flex items-end justify-between gap-1.5 sm:gap-2 px-1">
              {MONTHLY_DATA.map((item, idx) => (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                  onMouseEnter={() => setHoveredMonth(idx)}
                  onMouseLeave={() => setHoveredMonth(null)}
                >
                  {/* Tooltip */}
                  {hoveredMonth === idx && (
                    <div className="absolute -top-9 z-10 px-2 py-1 bg-slate-900 text-white text-[10px] rounded shadow-md whitespace-nowrap pointer-events-none">
                      {item.month}: {item.count} transaksi
                    </div>
                  )}

                  {/* Bar */}
                  <div
                    className="w-full max-w-[28px] bg-brand-600 rounded-t group-hover:bg-brand-700 transition-all duration-200"
                    style={{ height: `${item.heightPct}%` }}
                  />

                  {/* Month Label */}
                  <span className="text-[10px] text-slate-500 mt-2 font-medium">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1/3): Ringkasan Kualitas (Figma 54:6245) */}
        <div className="lg:col-span-1 bg-white border border-border-subtle rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-[15px] font-semibold text-slate-900">
              Ringkasan Kualitas
            </h3>

            {/* Score 96 / 100 (Figma 54:6249) */}
            <div className="text-center my-6">
              <span className="text-4xl font-bold text-slate-900 tracking-tight">
                96
              </span>
              <span className="text-sm font-normal text-slate-400 ml-1.5">
                / 100
              </span>
            </div>

            {/* Progress Bar (Figma 54:6252) */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                style={{ width: '96%' }}
              />
            </div>

            {/* Quality Checklist Items (Figma 54:6254) */}
            <div className="divide-y divide-slate-100 mt-5 border-t border-slate-100">
              <div className="py-2.5 flex items-center gap-2.5 text-xs text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tidak ada ID pelanggan duplikat</span>
              </div>

              <div className="py-2.5 flex items-center gap-2.5 text-xs text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Format tanggal konsisten</span>
              </div>

              <div className="py-2.5 flex items-center gap-2.5 text-xs text-amber-800 font-medium">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>24 nilai pesanan perlu ditinjau</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Profil Kolom Table Card (Figma 54:6277) ── */}
      <div className="bg-white border border-border-subtle rounded-xl shadow-xs overflow-hidden">
        <div className="p-5 sm:px-6 sm:py-4 border-b border-border-subtle">
          <h3 className="text-[15px] font-semibold text-slate-900">
            Profil Kolom
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Skema dan kelengkapan yang terdeteksi pada setiap kolom
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-ground border-b border-border-subtle text-[11px] font-semibold text-slate-500">
                <th className="py-3 px-6">Kolom</th>
                <th className="py-3 px-5">Tipe terdeteksi</th>
                <th className="py-3 px-5">Kelengkapan</th>
                <th className="py-3 px-5">Nilai unik</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-xs">
              {COLUMN_PROFILES.map((row) => (
                <tr key={row.col} className="hover:bg-slate-50/70 transition-colors">
                  {/* Kolom */}
                  <td className="py-3.5 px-6 font-mono font-semibold text-slate-900">
                    {row.col}
                  </td>

                  {/* Tipe terdeteksi */}
                  <td className="py-3.5 px-5 text-slate-600">
                    {row.type}
                  </td>

                  {/* Kelengkapan */}
                  <td className="py-3.5 px-5 font-mono text-slate-700">
                    {row.completeness}
                  </td>

                  {/* Nilai unik */}
                  <td className="py-3.5 px-5 font-mono text-slate-700">
                    {row.unique}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-6">
                    {row.statusVariant === 'success' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        {row.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                        {row.status}
                      </span>
                    )}
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
