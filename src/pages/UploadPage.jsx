import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileSpreadsheet,
  Download,
  Check,
  CheckCircle2,
  Info,
  Lock,
  ArrowRight,
  FileText,
  X,
} from 'lucide-react';
import Button from '../components/ui/Button';

const REQUIRED_COLUMNS = [
  { name: 'customer_id', desc: 'ID unik pelanggan' },
  { name: 'order_date', desc: 'Tanggal transaksi' },
  { name: 'order_value', desc: 'Total nilai transaksi' },
  { name: 'order_id', desc: 'ID unik pesanan' },
];

const PREVIEW_ROWS = [
  { customer_id: '17850', order_date: '2024-01-15 08:26:00', order_value: 'Rp 2.450.000', order_id: 'ORD-7821' },
  { customer_id: '13047', order_date: '2024-01-15 09:12:00', order_value: 'Rp 1.120.000', order_id: 'ORD-7822' },
  { customer_id: '12583', order_date: '2024-01-15 10:45:00', order_value: 'Rp 3.890.000', order_id: 'ORD-7823' },
  { customer_id: '13748', order_date: '2024-01-16 11:30:00', order_value: 'Rp 740.000', order_id: 'ORD-7824' },
  { customer_id: '15100', order_date: '2024-01-16 14:10:00', order_value: 'Rp 5.200.000', order_id: 'ORD-7825' },
];

export default function UploadPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activeStep, setActiveStep] = useState(1); // 1 = Upload, 2 = Validasi & Pratinjau
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Trigger file download for Template
  const handleDownloadTemplate = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'customer_id,order_date,order_value,order_id\n' +
      '17850,2024-01-15 08:26:00,2450000,ORD-7821\n' +
      '13047,2024-01-15 09:12:00,1120000,ORD-7822\n' +
      '12583,2024-01-15 10:45:00,3890000,ORD-7823\n' +
      '13748,2024-01-16 11:30:00,740000,ORD-7824\n' +
      '15100,2024-01-16 14:10:00,5200000,ORD-7825\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'template_transaksi_orbit.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import pre-cleaned demo dataset
  const handleImportCleanData = () => {
    setSelectedFile({
      name: 'online_retail_olahan.csv',
      size: '4.2 MB',
      rows: 5419,
      isDemo: true,
    });
    setActiveStep(2);
  };

  // Handle native file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        rows: 5419,
        isDemo: false,
      });
      setActiveStep(2);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        rows: 5419,
        isDemo: false,
      });
      setActiveStep(2);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setActiveStep(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleStartAnalysis = () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate('/analysis/overview');
    }, 700);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* ── Top Header (Figma 54:5551) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-slate-900 tracking-tight leading-tight">
            Upload Dataset
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload data transaksi pelanggan untuk menghasilkan segmen perilaku.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleImportCleanData}
            icon={FileSpreadsheet}
          >
            Import Data Olahan
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadTemplate}
            icon={Download}
          >
            Unduh Template
          </Button>
        </div>
      </div>

      {/* ── 2-Column Responsive Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Card: Upload & Dropzone (Figma 54:5574) */}
        <div className="lg:col-span-2 bg-white border border-border-subtle rounded-xl p-6 lg:p-7 shadow-xs">
          {/* Stepper (Figma 54:5575) */}
          <div className="flex items-center">
            {/* Step 1: Upload */}
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold transition-colors ${
                  activeStep === 1
                    ? 'bg-brand-600 text-white'
                    : selectedFile
                    ? 'bg-emerald-600 text-white'
                    : 'bg-brand-600 text-white'
                }`}
              >
                {selectedFile && activeStep === 2 ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : '1'}
              </div>
              <span
                className={`text-xs font-semibold ${
                  activeStep === 1 ? 'text-brand-700' : 'text-slate-600'
                }`}
              >
                Upload
              </span>
            </button>

            {/* Stepper Divider */}
            <div className="w-12 h-px bg-slate-200 mx-3 shrink-0" />

            {/* Step 2: Validasi & Pratinjau */}
            <button
              type="button"
              disabled={!selectedFile}
              onClick={() => selectedFile && setActiveStep(2)}
              className={`flex items-center gap-2 ${
                selectedFile ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'
              } focus:outline-none`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold border transition-colors ${
                  activeStep === 2
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'border-slate-300 text-slate-500 bg-white'
                }`}
              >
                2
              </div>
              <span
                className={`text-xs font-semibold ${
                  activeStep === 2 ? 'text-brand-700' : 'text-slate-500'
                }`}
              >
                Validasi &amp; Pratinjau
              </span>
            </button>
          </div>

          {/* Step Tag */}
          <p className="text-[10px] font-bold tracking-[0.6px] text-brand-700 uppercase mt-6">
            LANGKAH {activeStep} DARI 2
          </p>

          {/* Step Title & Subtitle */}
          <h2 className="text-lg font-semibold text-slate-900 mt-1">
            {activeStep === 1 ? 'Pilih file data Anda' : 'Pratinjau & Validasi Data'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {activeStep === 1
              ? 'Gunakan file CSV atau Excel sesuai struktur Dataset ORBIT.'
              : 'Periksa kesesuaian kolom transaksi sebelum melanjutkan proses analisis.'}
          </p>

          {/* ── Dropzone Area (Figma 54:5599) ── */}
          {activeStep === 1 && !selectedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`mt-5 border-2 border-dashed rounded-xl p-8 lg:p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? 'border-brand-500 bg-brand-50/40 scale-[0.99]'
                  : 'border-slate-300 bg-surface-ground hover:border-brand-400 hover:bg-brand-50/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv, .xlsx, .xls"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Blue Icon Square (Figma 54:5600) */}
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-brand-600 mb-3.5 shadow-2xs">
                <UploadCloud className="w-6 h-6 stroke-[2]" />
              </div>

              <h3 className="text-sm font-semibold text-slate-900">
                Tarik file CSV ke sini
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                atau pilih file dari komputer
              </p>

              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="bg-white border-border-subtle shadow-2xs hover:bg-slate-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Pilih File
                </Button>
              </div>

              <p className="text-[11px] text-slate-400 mt-3.5">
                CSV, XLS, atau XLSX · Ukuran maksimal 25 MB
              </p>
            </div>
          ) : (
            /* ── File Uploaded & Preview Mode (Step 2) ── */
            <div className="mt-5 space-y-4">
              {/* Selected File Summary Banner */}
              <div className="border border-emerald-200 bg-emerald-50/60 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {selectedFile?.name}
                      </p>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        {selectedFile?.isDemo ? 'Data Olahan' : 'File Siap'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Ukuran: {selectedFile?.size} · {selectedFile?.rows.toLocaleString()} baris data · 4 kolom cocok
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs text-slate-600 hover:text-slate-900 font-medium px-2 py-1 rounded hover:bg-white/80 transition-colors"
                  >
                    Ganti
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Hapus file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Data Preview Table */}
              <div className="border border-border-subtle rounded-xl overflow-hidden bg-white">
                <div className="px-4 py-2.5 bg-slate-50/80 border-b border-border-subtle flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-semibold text-slate-800">
                      Pratinjau Data (5 Baris Pertama)
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Format terverifikasi
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-border-subtle bg-surface-ground text-slate-600 font-semibold text-[11px]">
                        <th className="px-3.5 py-2 font-mono">customer_id</th>
                        <th className="px-3.5 py-2 font-mono">order_date</th>
                        <th className="px-3.5 py-2 font-mono">order_value</th>
                        <th className="px-3.5 py-2 font-mono">order_id</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle font-mono text-[11px] text-slate-700">
                      {PREVIEW_ROWS.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-3.5 py-2 font-semibold text-brand-700">{row.customer_id}</td>
                          <td className="px-3.5 py-2 text-slate-600">{row.order_date}</td>
                          <td className="px-3.5 py-2 text-slate-900 font-sans">{row.order_value}</td>
                          <td className="px-3.5 py-2 text-slate-500">{row.order_id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── Footer Row (Figma 54:5620) ── */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                Data Anda tetap privat dan hanya digunakan untuk analisis ini.
              </span>
            </div>

            <Button
              variant={selectedFile ? 'primary' : 'secondary'}
              size="sm"
              disabled={!selectedFile}
              loading={isAnalyzing}
              onClick={handleStartAnalysis}
              icon={ArrowRight}
              iconPosition="right"
              className={selectedFile ? 'shadow-xs' : 'opacity-60 cursor-not-allowed'}
            >
              Mulai Analisis
            </Button>
          </div>
        </div>

        {/* ── Right Card: Persyaratan Dataset (Figma 54:5633) ── */}
        <div className="lg:col-span-1 bg-white border border-border-subtle rounded-xl p-6 shadow-xs self-start">
          <h3 className="text-[15px] font-semibold text-slate-900 leading-tight">
            Persyaratan Dataset
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Sertakan kolom berikut agar ORBIT dapat menganalisis perilaku pelanggan secara akurat.
          </p>

          {/* Required Columns List (Figma 54:5640) */}
          <div className="divide-y divide-slate-100 mt-4 border-t border-slate-100">
            {REQUIRED_COLUMNS.map((item) => (
              <div key={item.name} className="py-3 flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-blue-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <div>
                  <p className="font-mono text-xs font-bold text-slate-800">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box (Figma 54:5685) */}
          <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-2.5 flex items-center gap-2.5 mt-5">
            <Info className="w-4 h-4 text-blue-700 shrink-0" />
            <p className="text-[11px] text-blue-800 font-medium leading-snug">
              Nama kolom harus sama persis dengan Template.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
