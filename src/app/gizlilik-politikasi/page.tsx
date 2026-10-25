import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası — ARGEV Yapı',
};

export default function GizlilikPolitikasiPage() {
  return (
    <div className="pt-24 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="luxury-card p-8 sm:p-12 rounded-3xl">
          <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
            GÜVENLİK VE GİZLİLİK
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-navy-dark mb-6">
            Gizlilik Politikası
          </h1>

          <div className="prose prose-sm text-gray-700 leading-relaxed space-y-4 font-light">
            <p>
              ARGEV Yapı olarak kullanıcılarımızın gizliliğini en yüksek düzeyde koruyoruz. Web sitemizi ziyaret ettiğinizde veya teklif hesaplayıcımızı kullandığınızda toplanan teknik ve iletişim bilgileri yalnızca size daha iyi ve güvenli hizmet sunmak için kullanılır.
            </p>
            <h2 className="text-lg font-bold font-serif text-navy-dark pt-2">Güvenlik Tedbirleri</h2>
            <p>
              Sistemimiz modern şifreleme protokolleri (SSL/TLS), güvenli sunucu mimarisi ve yetkilendirilmiş erişim kısıtlamaları (Row Level Security) ile korunmaktadır. Fiyat teklifi snapshot&apos;ları ve müşteri iletişim verileri yetkisiz erişimlere karşı izole edilmiş veritabanlarında saklanır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
