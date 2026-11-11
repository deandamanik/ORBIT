import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Download,
  ChevronRight,
  Plus,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function CustomerDetailPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get('id');

  const customersData = [
    {
      id: 'C-10482',
      avatarNum: '82',
      segment: 'Bernilai Tinggi',
      segmentVariant: 'high-value',
      dotColor: 'bg-blue-600',
      lastOrderDate: '30 Jun 2025',
      recency: '4 hari',
      recencyScaled: '−1.28',
      frequency: '18 pesanan',
      frequencyScaled: '1.74',
      monetary: '$2,416.80',
      monetaryScaled: '2.12',
      rfmScore: '15 / 15',
      scoreDesc: 'Tingkat pelanggan tertinggi',
      recommendation: 'Undang pelanggan ini ke program loyalitas akses awal.',
      actionText: 'Tambahkan ke daftar tindakan',
      transactions: [
        { id: 'ORD-82914', date: '30 Jun 2025', category: 'Elektronik', amount: '$124.50' },
        { id: 'ORD-81742', date: '18 Jun 2025', category: 'Rumah & Gaya Hidup', amount: '$86.20' },
        { id: 'ORD-79831', date: '27 Mei 2025', category: 'Busana', amount: '$64.80' },
      ],
    },
    {
      id: 'C-09317',
      avatarNum: '17',
      segment: 'Setia',
      segmentVariant: 'loyal',
      dotColor: 'bg-cyan-600',
      lastOrderDate: '22 Jun 2025',
      recency: '12 hari',
      recencyScaled: '−0.75',
      frequency: '14 pesanan',
      frequencyScaled: '1.12',
      monetary: '$1,840.00',
      monetaryScaled: '1.35',
      rfmScore: '13 / 15',
      scoreDesc: 'Pelanggan rutin setia',
      recommendation: 'Rekomendasikan kategori terkait berdasarkan dua kategori yang paling sering dibeli.',
      actionText: 'Tambahkan ke daftar tindakan',
      transactions: [
        { id: 'ORD-77421', date: '22 Jun 2025', category: 'Elektronik', amount: '$95.00' },
        { id: 'ORD-75102', date: '04 Jun 2025', category: 'Aksesoris', amount: '$42.50' },
        { id: 'ORD-73910', date: '15 Mei 2025', category: 'Elektronik', amount: '$128.00' },
      ],
    },
    {
      id: 'C-12004',
      avatarNum: '04',
      segment: 'Potensial',
      segmentVariant: 'promising',
      dotColor: 'bg-indigo-600',
      lastOrderDate: '10 Jun 2025',
      recency: '24 hari',
      recencyScaled: '−0.15',
      frequency: '5 pesanan',
      frequencyScaled: '−0.20',
      monetary: '$612.40',
      monetaryScaled: '−0.18',
      rfmScore: '10 / 15',
      scoreDesc: 'Pelanggan berpotensi berkembang',
      recommendation: 'Dorong pesanan berikutnya dalam 21 hari dengan penawaran kupon personal.',
      actionText: 'Tambahkan ke daftar tindakan',
      transactions: [
        { id: 'ORD-71044', date: '10 Jun 2025', category: 'Rumah & Gaya Hidup', amount: '$54.00' },
        { id: 'ORD-69812', date: '19 Mei 2025', category: 'Kecantikan', amount: '$38.40' },
        { id: 'ORD-67990', date: '11 Apr 2025', category: 'Busana', amount: '$45.00' },
      ],
    },
    {
      id: 'C-07128',
      avatarNum: '28',
      segment: 'Berisiko',
      segmentVariant: 'at-risk',
      dotColor: 'bg-teal-600',
      lastOrderDate: '13 Apr 2025',
      recency: '82 hari',
      recencyScaled: '1.85',
      frequency: '3 pesanan',
      frequencyScaled: '−0.65',
      monetary: '$320.00',
      monetaryScaled: '−0.82',
      rfmScore: '6 / 15',
      scoreDesc: 'Perlu kampanye win-back segera',
      recommendation: 'Jangkau kembali pelanggan dengan Recency lebih dari 60 hari melalui penawaran personal.',
      actionText: 'Tambahkan ke daftar tindakan',
      transactions: [
        { id: 'ORD-64210', date: '13 Apr 2025', category: 'Busana', amount: '$75.00' },
        { id: 'ORD-59821', date: '02 Feb 2025', category: 'Busana', amount: '$120.00' },
        { id: 'ORD-54120', date: '18 Des 2024', category: 'Elektronik', amount: '$125.00' },
      ],
    },
  ];

  const [selectedId, setSelectedId] = useState(paramId || 'C-10482');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const activeId = paramId || selectedId;
  const selectedCustomer =
    customersData.find(
      (c) => c.id.toLowerCase() === activeId.toLowerCase()
    ) || customersData[0];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectCustomer = (cust) => {
    setSelectedId(cust.id);
    setSearchParams({ id: cust.id });
  };

  const filteredCustomers = customersData.filter((c) =>
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.segment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCustomerData = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'CustomerID,Segmen,Terakhir Belanja,Recency,Recency Scaled,Frequency,Frequency Scaled,Monetary,Monetary Scaled,RFM Score',
        `${selectedCustomer.id},${selectedCustomer.segment},${selectedCustomer.lastOrderDate},${selectedCustomer.recency},${selectedCustomer.recencyScaled},${selectedCustomer.frequency},${selectedCustomer.frequencyScaled},"${selectedCustomer.monetary}",${selectedCustomer.monetaryScaled},"${selectedCustomer.rfmScore}"`,
        '',
        'Riwayat Transaksi:',
        'ID Pesanan,Tanggal,Kategori,Nilai',
        ...selectedCustomer.transactions.map(
          (t) => `${t.id},${t.date},${t.category},"${t.amount}"`
        ),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `customer_${selectedCustomer.id}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Data pelanggan ${selectedCustomer.id} berhasil diekspor.`);
  };

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
            PENELUSUR PELANGGAN
          </span>
          <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
            Detail Pelanggan
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
            Cari CustomerID untuk meninjau perilaku, nilai RFM, dan tindakan yang ditetapkan.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onClick={exportCustomerData}
          className="text-slate-700 border-border-default hover:bg-slate-50 text-xs font-semibold shadow-xs shrink-0 self-start"
        >
          Export Data Pelanggan
        </Button>
      </div>

      {/* Main Grid: Left Column (Customer List) & Right Column (Customer Profile & Transactions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Customer Selector */}
        <div className="lg:col-span-4 bg-white border border-border-subtle rounded-xl overflow-hidden shadow-xs">
          {/* Search Input */}
          <div className="p-3.5 border-b border-border-subtle">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari CustomerID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-border-input rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
              />
            </div>
          </div>

          {/* Customer Item List */}
          <div className="divide-y divide-border-subtle max-h-[520px] overflow-y-auto">
            {filteredCustomers.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                Tidak ada pelanggan ditemukan
              </div>
            ) : (
              filteredCustomers.map((cust) => {
                const isSelected = cust.id === selectedCustomer.id;
                return (
                  <button
                    key={cust.id}
                    onClick={() => handleSelectCustomer(cust)}
                    className={`w-full text-left p-3.5 flex items-center justify-between gap-3 transition-colors ${
                      isSelected
                        ? 'bg-brand-50/80 border-l-4 border-l-brand-600'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Avatar with Number */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected
                            ? 'bg-brand-200/80 text-brand-800 font-mono'
                            : 'bg-slate-100 text-slate-700 font-mono'
                        }`}
                      >
                        {cust.avatarNum}
                      </div>

                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 block truncate">
                          {cust.id}
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                          {cust.segment} · {cust.lastOrderDate}
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-brand-600 translate-x-0.5' : 'text-slate-400'
                      }`}
                    />
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Customer Details */}
        <div className="lg:col-span-8 space-y-4">
          {/* Card 1: Customer Profile & RFM 4-Metrics Grid */}
          <Card padding="p-5" className="shadow-xs space-y-5">
            {/* Profile Header */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-blue-100 text-brand-700 flex items-center justify-center font-bold text-sm font-mono shrink-0">
                  {selectedCustomer.avatarNum}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                    {selectedCustomer.id}
                  </h2>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Pesanan terakhir {selectedCustomer.lastOrderDate}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                <span className={`w-2 h-2 rounded-full ${selectedCustomer.dotColor}`} />
                <span>{selectedCustomer.segment}</span>
              </div>
            </div>

            {/* 4-Metrics Grid Box (Figma Node 54:8361) */}
            <div className="border border-border-subtle rounded-xl overflow-hidden grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border-subtle bg-white">
              {/* Recency */}
              <div className="p-3.5 flex flex-col justify-between">
                <span className="text-[11px] text-slate-500 block">Recency</span>
                <span className="text-sm md:text-base font-bold text-slate-900 mt-1 block">
                  {selectedCustomer.recency}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Scaled: {selectedCustomer.recencyScaled}
                </span>
              </div>

              {/* Frequency */}
              <div className="p-3.5 flex flex-col justify-between">
                <span className="text-[11px] text-slate-500 block">Frequency</span>
                <span className="text-sm md:text-base font-bold text-slate-900 mt-1 block">
                  {selectedCustomer.frequency}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Scaled: {selectedCustomer.frequencyScaled}
                </span>
              </div>

              {/* Monetary */}
              <div className="p-3.5 flex flex-col justify-between">
                <span className="text-[11px] text-slate-500 block">Monetary</span>
                <span className="text-sm md:text-base font-bold text-slate-900 mt-1 block">
                  {selectedCustomer.monetary}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Scaled: {selectedCustomer.monetaryScaled}
                </span>
              </div>

              {/* RFM Score */}
              <div className="p-3.5 flex flex-col justify-between">
                <span className="text-[11px] text-slate-500 block">RFM Score</span>
                <span className="text-sm md:text-base font-bold text-slate-900 mt-1 block">
                  {selectedCustomer.rfmScore}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
                  {selectedCustomer.scoreDesc}
                </span>
              </div>
            </div>
          </Card>

          {/* Card 2: Next Action Recommendation Box */}
          <div className="bg-white border border-border-subtle rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 border border-brand-100">
                <Sparkles className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                  Rekomendasi tindakan berikutnya
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {selectedCustomer.recommendation}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={Plus}
              onClick={() => showToast(`Tindakan untuk ${selectedCustomer.id} berhasil ditambahkan.`)}
              className="text-xs font-semibold text-slate-700 border-border-default hover:bg-slate-50 shrink-0 self-start sm:self-center"
            >
              {selectedCustomer.actionText}
            </Button>
          </div>

          {/* Card 3: Recent Transactions Table */}
          <Card padding="p-0" className="shadow-xs overflow-hidden">
            <div className="p-4 border-b border-border-subtle">
              <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                Transaksi Terbaru
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Pesanan terbaru milik {selectedCustomer.id}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-border-subtle text-[11px] font-semibold text-slate-500">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">ID Pesanan</th>
                    <th className="py-2.5 px-4 font-semibold">Tanggal</th>
                    <th className="py-2.5 px-4 font-semibold">Kategori</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Nilai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {selectedCustomer.transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900 font-mono text-[11px]">
                        {tx.id}
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-[11px]">
                        {tx.date}
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-[11px]">
                        {tx.category}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900 font-mono text-[11px] text-right">
                        {tx.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
