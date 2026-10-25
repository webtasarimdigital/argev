'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('argev');
  const [password, setPassword] = useState('argevçelikev1.');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const cleanUsername = username.trim().toLowerCase();
    const validUsernames = ['argev', 'admin', 'admin@argevyapi.com'];
    const validPasswords = ['argevçelikev1.', 'argevcelikev1.', 'argev2026!admin', 'Argevdatabase123.'];

    const isValidUser = validUsernames.includes(cleanUsername);
    const isValidPass = validPasswords.includes(password.trim());

    if (isValidUser && isValidPass) {
      // Set secure admin session cookie for 30 days
      document.cookie = 'argev_admin_session=active; path=/; max-age=2592000; SameSite=Lax';
      setTimeout(() => {
        router.push('/admin');
        router.refresh();
      }, 300);
    } else {
      setLoading(false);
      setError('Kullanıcı adı veya şifre hatalı. Lütfen kontrol ediniz.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#FF6B00] flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-[#FF6B00]/25">
            <span className="font-serif font-bold text-2xl">A</span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF6B00] block mb-1">
            GÜVENLİ YÖNETİM
          </span>
          <h1 className="text-2xl font-serif font-bold text-white">ARGEV Yapı Yönetim</h1>
          <p className="text-xs text-slate-400 mt-1">
            Yönetici paneline erişmek için bilgilerinizi giriniz.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Kullanıcı Adı
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="argev"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Şifre
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all mt-6 disabled:opacity-50"
          >
            <span>{loading ? 'Giriş Yapılıyor...' : 'Panele Giriş Yap'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>256-Bit SSL Şifreli Yönetici Oturumu</span>
        </div>
      </div>
    </div>
  );
}
