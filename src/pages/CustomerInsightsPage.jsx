import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Download,
  ArrowRight,
  Info,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function CustomerInsightsPage() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const exportActionPlan = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'Segmen,Prioritas,Judul Rekomendasi,Deskripsi,Aturan Terpicu,Channel,Target Pelanggan',
        'Berisiko,Prioritas tinggi,"Jalankan kampanye win-back selama 14 hari","Jangkau kembali pelanggan dengan Recency lebih dari 60 hari melalui penawaran personal dalam periode terbatas.","Recency > 60 hari · Frequency >= 2",Email + Ads,1747',
        'Bernilai Tinggi,Dampak tinggi,"Pertahankan nilai pelanggan melalui program akses awal","Berikan akses prioritas kepada pelanggan yang sering bertransaksi dan bernilai tinggi, bukan diskon umum.","Skor RFM >= 13 · Nilai > $150",Email + Loyalty,4493',
        'Setia,Pertumbuhan,"Terapkan cross-sell berbasis kategori","Rekomendasikan kategori terkait berdasarkan dua kategori yang paling sering dibeli setiap pelanggan.","Frequency >= 6 · Recency <= 30 hari",Email + On-site,3494',
        'Potensial,Pengembangan,"Berikan insentif untuk pembelian kedua","Dorong pesanan berikutnya dalam 21 hari agar pelanggan terbiasa membeli kembali.","Frequency 2-4 · Recency <= 45 hari",Email,2746',
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'rencana_tindakan_orbit_q2.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Rencana tindakan berhasil diekspor ke format CSV.');
  };

  const recommendations = [
    {
      id: 'win-back',
      segment: 'Berisiko',
      dotColor: 'bg-teal-600',
      priority: 'Prioritas tinggi',
      title: 'Jalankan kampanye win-back selama 14 hari',
      desc: 'Jangkau kembali pelanggan dengan Recency lebih dari 60 hari melalui penawaran personal dalam periode terbatas.',
      rule: 'Recency > 60 hari · Frequency ≥ 2',
      channel: 'Email + Ads',
      target: '1.747 pelanggan',
      btnText: 'Buat daftar win-back',
      targetCustomerId: 'C-07128',
    },
    {
      id: 'vip-early',
      segment: 'Bernilai Tinggi',
      dotColor: 'bg-blue-600',
      priority: 'Dampak tinggi',
      title: 'Pertahankan nilai pelanggan melalui program akses awal',
      desc: 'Berikan akses prioritas kepada pelanggan yang sering bertransaksi dan bernilai tinggi, bukan diskon umum.',
      rule: 'Skor RFM ≥ 13 · Nilai > $150',
      channel: 'Email + Loyalty',
      target: '4.493 pelanggan',
      btnText: 'Export daftar pelanggan VIP',
      targetCustomerId: 'C-10482',
    },
    {
      id: 'cross-sell',
      segment: 'Setia',
      dotColor: 'bg-cyan-600',
      priority: 'Pertumbuhan',
      title: 'Terapkan cross-sell berbasis kategori',
      desc: 'Rekomendasikan kategori terkait berdasarkan dua kategori yang paling sering dibeli setiap pelanggan.',
      rule: 'Frequency ≥ 6 · Recency ≤ 30 hari',
      channel: 'Email + On-site',
      target: '3.494 pelanggan',
      btnText: 'Lihat keterkaitan produk',
      targetCustomerId: 'C-09317',
    },
    {
      id: 'second-purchase',
      segment: 'Potensial',
      dotColor: 'bg-indigo-600',
      priority: 'Pengembangan',
      title: 'Berikan insentif untuk pembelian kedua',
      desc: 'Dorong pesanan berikutnya dalam 21 hari agar pelanggan terbiasa membeli kembali.',
      rule: 'Frequency 2–4 · Recency ≤ 45 hari',
      channel: 'Email',
      target: '2.746 pelanggan',
      btnText: 'Buat daftar pengembangan',
      targetCustomerId: 'C-12004',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-brand-700 tracking-wider uppercase block mb-1">
            MESIN REKOMENDASI BERBASIS ATURAN
          </span>
          <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
            Insight Pelanggan
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
            Rekomendasi tindakan diprioritaskan berdasarkan profil perilaku setiap segmen.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-start">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={exportActionPlan}
            className="text-slate-700 border-border-default hover:bg-slate-50 text-xs font-semibold shadow-xs"
          >
            Export Rencana Tindakan
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/analysis/customer-detail')}
            className="text-xs font-semibold shadow-xs"
          >
            Lihat Detail Pelanggan
          </Button>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="bg-brand-50/70 border border-brand-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white border border-brand-200 shadow-xs flex items-center justify-center shrink-0 text-brand-600">
            <Sparkles className="w-5 h-5 text-brand-600" />
          </div>
          <div>
            <h2 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
              4 rekomendasi tindakan
            </h2>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
              Aturan dievaluasi terhadap 12.480 profil pelanggan
            </p>
          </div>
        </div>

        <span className="text-[11px] font-medium text-slate-500 self-end sm:self-center shrink-0">
          Dihasilkan 30 Juni 2025
        </span>
      </div>

      {/* 2x2 Grid Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {recommendations.map((item) => (
          <Card
            key={item.id}
            padding="p-5"
            className="flex flex-col justify-between hover:border-brand-300 transition-all shadow-xs"
          >
            <div>
              {/* Card Header: Tag & Priority Badge */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
                  <span className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                  <span>{item.segment}</span>
                </div>

                <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/50 px-2.5 py-0.5 rounded-full">
                  {item.priority}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-semibold text-slate-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed min-h-[38px]">
                {item.desc}
              </p>

              {/* Definition Box */}
              <div className="mt-4 p-3 bg-slate-50 border border-slate-200/70 rounded-lg space-y-2 text-xs">
                <div className="grid grid-cols-3 gap-2 items-center">
                  <span className="text-slate-500 text-[11px]">Aturan terpicu</span>
                  <span className="col-span-2 text-slate-800 font-semibold text-[11px] text-right truncate">
                    {item.rule}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 items-center pt-1.5 border-t border-slate-200/40">
                  <span className="text-slate-500 text-[11px]">Channel yang disarankan</span>
                  <span className="col-span-2 text-slate-800 font-semibold text-[11px] text-right">
                    {item.channel}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 items-center pt-1.5 border-t border-slate-200/40">
                  <span className="text-slate-500 text-[11px]">Target pelanggan</span>
                  <span className="col-span-2 text-slate-800 font-semibold text-[11px] text-right">
                    {item.target}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Action Button */}
            <div className="mt-5 pt-3 border-t border-border-subtle flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  showToast(`Daftar aksi "${item.btnText}" berhasil diproses.`);
                  navigate(`/analysis/customer-detail?id=${item.targetCustomerId}`);
                }}
                className="w-full justify-between text-xs font-semibold text-slate-700 border-border-default hover:bg-slate-50"
              >
                <span>{item.btnText}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Info Banner */}
      <div className="bg-white border border-border-subtle rounded-xl p-4 flex items-start gap-3 shadow-xs">
        <div className="w-6 h-6 rounded-md bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-4 h-4 text-brand-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-slate-900 leading-snug">
            Cara rekomendasi dihasilkan
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            ORBIT menerapkan aturan bisnis yang transparan pada skor RFM dan profil segmen.
            Tinjau setiap rekomendasi sebelum mengaktifkannya melalui tools marketing.
          </p>
        </div>
      </div>
    </div>
  );
}
