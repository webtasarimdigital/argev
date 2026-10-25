import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Çerez Politikası — ARGEV Yapı',
};

export default function CerezPolitikasiPage() {
  return (
    <div className="pt-24 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="luxury-card p-8 sm:p-12 rounded-3xl">
          <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
            ÇEREZ (COOKIE) KULLANIMI
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-navy-dark mb-6">
            Çerez Politikası
          </h1>

          <div className="prose prose-sm text-gray-700 leading-relaxed space-y-4 font-light">
            <p>
              Web sitemizde gezinme deneyiminizi iyileştirmek, hesaplama tercihlerinizi hatırlamak ve site performansını analiz etmek amacıyla çerezler (cookies) kullanılmaktadır. Zorunlu teknik çerezler haricinde hiçbir üçüncü taraf izleme çerezi bilginiz dışında yüklenmez.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
