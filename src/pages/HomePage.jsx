import { Link } from 'react-router-dom';
import { Plus, UploadCloud, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const steps = [
    {
      number: '1',
      title: 'Upload dan Validasi',
      desc: 'Periksa format file transaksi, kolom wajib, tipe data, dan nilai sebelum diproses.',
      link: '/upload',
    },
    {
      number: '2',
      title: 'Analisis Perilaku',
      desc: 'Hitung fitur RFM dan identifikasi segmen pelanggan menggunakan Fuzzy Mamdani.',
      link: '/analysis/model',
    },
    {
      number: '3',
      title: 'Tindak Lanjuti',
      desc: 'Tinjau rekomendasi bisnis yang transparan dan dapat langsung dieksekusi per segmen.',
      link: '/analysis/insights',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 select-none">

      {/* ── Top Header Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
            Selamat Pagi, Dean
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Mulai analisis pertama untuk memahami perilaku dan segmentasi pelanggan ritel Anda.
          </p>
        </div>

        <div>
          <Link to="/upload">
            <button
              type="button"
              className="inline-flex items-center gap-2 h-10 px-4 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-sm font-semibold rounded-lg transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.2]" />
              <span>Analisis Baru</span>
            </button>
          </Link>
        </div>
      </div>

      {/* ── Empty State Container ── */}
      <div className="w-full bg-white border border-border-subtle rounded-2xl shadow-card py-12 px-6 flex flex-col items-center justify-center text-center transition-shadow">
        
        {/* Icon Box */}
        <div className="w-13 h-13 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center mb-4 text-brand-600 shadow-2xs">
          <UploadCloud className="w-6 h-6 stroke-[2]" />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Belum ada analisis pelanggan
        </h2>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed max-w-lg mt-2">
          Upload file transaksi dalam format CSV atau Excel. ORBIT akan memvalidasi, membersihkan,
          mengelompokkan, dan menghasilkan rekomendasi terarah dari data Anda secara otomatis menggunakan{' '}
          <strong className="text-slate-700 font-semibold">Fuzzy Mamdani</strong>.
        </p>

        {/* Upload Button */}
        <div className="mt-6">
          <Link to="/upload">
            <button
              type="button"
              className="inline-flex items-center gap-2 h-10 px-5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-sm font-semibold rounded-lg transition-all shadow-sm cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 stroke-[2]" />
              <span>Upload Dataset</span>
            </button>
          </Link>
        </div>
      </div>

      {/* ── 3-Step Guide Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step) => (
          <Link
            key={step.number}
            to={step.link}
            className="group block"
          >
            <div className="h-full bg-white border border-border-subtle rounded-xl p-5 flex items-start gap-4 hover:border-brand-300 hover:shadow-card transition-all">
              {/* Number Badge */}
              <div className="w-8 h-8 rounded-full bg-brand-50 border border-brand-200/80 text-brand-800 flex items-center justify-center shrink-0 font-bold text-xs group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-colors">
                {step.number}
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
                    {step.title}
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                  {step.desc}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
