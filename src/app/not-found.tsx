import React from 'react';
import Link from 'next/link';
import { Layers, ArrowLeft, Home, Calculator } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-warm-white px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-navy/5 text-navy flex items-center justify-center mx-auto mb-6">
          <Layers className="w-8 h-8 text-bronze" />
        </div>

        <span className="text-4xl sm:text-5xl font-serif font-bold text-navy-dark block mb-2">
          404
        </span>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-navy-dark mb-3">
          Aradığınız Sayfa Bulunamadı
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mb-8 leading-relaxed">
          Ulaşmak istediğiniz sayfa taşınmış veya kaldırılmış olabilir. Dilerseniz ana sayfaya dönebilir veya çelik yapı fiyat hesaplayıcısını başlatabilirsiniz.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 py-3 px-4 rounded-xl border border-navy/20 text-navy font-semibold text-xs flex items-center justify-center gap-2 hover:bg-navy/5"
          >
            <Home className="w-4 h-4" />
            <span>Ana Sayfa</span>
          </Link>
          <Link
            href="/fiyat-hesaplama"
            className="flex-1 py-3 px-4 rounded-xl bg-navy text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-navy-light shadow-md"
          >
            <Calculator className="w-4 h-4" />
            <span>Fiyat Hesapla</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
