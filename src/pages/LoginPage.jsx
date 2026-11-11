import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import logoOrbit from '../assets/logo-orbit.svg';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-surface-ground flex flex-col items-center justify-center px-4 py-8 select-none">
      <div className="w-full max-w-[420px] flex flex-col items-center">

        {/* ── Brand Header (Figma 42:1025: w=420, h=42) ── */}
        <div className="flex items-center justify-center gap-[11px] mb-6">
          <img
            src={logoOrbit}
            alt="ORBIT Logo"
            className="w-[42px] h-[42px] object-contain shrink-0"
          />
          <span
            className="text-slate-900 text-[20px] font-bold tracking-[1px] leading-[30px]"
            style={{ fontFamily: 'Inter' }}
          >
            ORBIT
          </span>
        </div>

        {/* ── Login Card (Figma 42:1034: w=420, p=33.2px, rounded=16px) ── */}
        <div className="w-full bg-white border border-border-subtle rounded-2xl shadow-card p-[33px]">

          {/* Title & Subtitle (Figma 42:1035) */}
          <div className="text-center mb-[26px]">
            <h1
              className="text-slate-900 text-[30px] font-bold tracking-[-0.6px] leading-[40px]"
              style={{ fontFamily: 'Inter' }}
            >
              Selamat datang kembali
            </h1>
            <p
              className="text-slate-500 text-[13px] font-normal leading-[20px] mt-[6px]"
              style={{ fontFamily: 'Inter' }}
            >
              Masuk untuk melanjutkan ke ruang kerja analitik Anda.
            </p>
          </div>

          {/* Form (Figma 42:1043) */}
          <form onSubmit={handleSubmit} className="flex flex-col">

            {/* Email Field (Figma 42:1044) */}
            <div className="flex flex-col gap-[7px] mb-4">
              <label
                htmlFor="email"
                className="text-[12px] font-semibold text-slate-700 leading-[18px]"
                style={{ fontFamily: 'Inter' }}
              >
                Alamat email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@perusahaan.com"
                required
                className="w-full h-[42px] px-3 bg-white border border-border-input rounded-lg text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 transition-all"
                style={{ fontFamily: 'Inter' }}
              />
            </div>

            {/* Password Field (Figma 42:1050) */}
            <div className="flex flex-col gap-[7px] mb-2">
              <label
                htmlFor="password"
                className="text-[12px] font-semibold text-slate-700 leading-[18px]"
                style={{ fontFamily: 'Inter' }}
              >
                Kata sandi
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi Anda"
                required
                className="w-full h-[42px] px-3 bg-white border border-border-input rounded-lg text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 transition-all"
                style={{ fontFamily: 'Inter' }}
              />
            </div>

            {/* Remember Me & Forgot Password (Figma 42:1056: h=42px) */}
            <div className="flex items-center justify-between h-[42px] mb-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-[15px] h-[15px] rounded-[2px] border border-slate-400 text-brand-600 focus:ring-brand-500/20 cursor-pointer"
                />
                <span
                  className="text-[11px] font-normal text-slate-700 leading-[16.5px]"
                  style={{ fontFamily: 'Inter' }}
                >
                  Ingat saya
                </span>
              </label>

              <button
                type="button"
                className="text-[11px] font-semibold text-brand-700 hover:text-brand-800 leading-[20px] transition-colors"
                style={{ fontFamily: 'Inter' }}
                onClick={() => alert('Fitur pemulihan kata sandi')}
              >
                Lupa kata sandi?
              </button>
            </div>

            {/* Submit Button (Figma 42:1068: h=44px) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[44px] bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-[13px] font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-60 shadow-sm"
              style={{ fontFamily: 'Inter' }}
            >
              {isLoading ? (
                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <>
                  <span>Masuk ke ORBIT</span>
                  <ArrowRight className="w-[17px] h-[17px] stroke-[2.2]" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* ── Footer Tagline (Figma 42:1088 / 42:1089) ── */}
        <p
          className="mt-5 text-[10px] font-normal text-slate-500 leading-[15px] text-center tracking-normal"
          style={{ fontFamily: 'Inter' }}
        >
          Pelacak Perilaku dan Insight Ritel Online
        </p>
      </div>
    </div>
  );
}
