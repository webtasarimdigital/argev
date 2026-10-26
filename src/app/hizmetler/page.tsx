import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { DataStore } from '@/lib/data-store';
import { formatCurrency } from '@/lib/utils';
import { Clock, Calculator, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Çelik Yapı Hizmetlerimiz — ARGEV Yapı Düzce',
  description:
    'Hafif çelik ev, ağır çelik ev, çelik villa, ağır çelik villa, çelik garaj ve ferforje imalatı. Depreme dayanıklı kalıcı yapılar.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HizmetlerPage() {
  const services = await DataStore.getServices();

  return (
    <div className="pt-24 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
            MİMARLIK VE MÜHENDİSLİK HİZMETLERİ
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-dark tracking-tight mb-4">
            Çelik Yapı Çözümlerimiz
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light">
            Deprem bölgesinde yaşayan aileler için 1. sınıf galvanizli çelik ve mühendislik disipliniyle inşa ettiğimiz yaşam alanları.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-12">
          {services.map((srv, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={srv.id}
                className={`luxury-card p-6 sm:p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}
              >
                {/* Photo Column */}
                <div
                  className={`lg:col-span-5 relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-navy-dark ${
                    isReversed ? 'lg:order-2' : ''
                  }`}
                >
                  <img
                    src={srv.featuredImage}
                    alt={srv.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-navy-dark/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-warm-white flex items-center gap-1.5 shadow-md">
                    <Clock className="w-3.5 h-3.5 text-bronze" />
                    <span>Ortalama {srv.defaultTurnaroundDays} Günde Teslim</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/95 px-3.5 py-1.5 rounded-full text-xs font-bold text-navy shadow-md">
                    {formatCurrency(srv.baseM2Price)} / {srv.pricingType === 'm2' ? 'm²' : 'mtül'}
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-7 flex flex-col justify-between ${isReversed ? 'lg:order-1' : ''}`}>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-bronze mb-2 block">
                      {srv.shortTitle}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-dark mb-4">
                      {srv.name}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {srv.description}
                    </p>

                    {/* Packages Preview */}
                    <div className="mb-6">
                      <span className="text-xs font-semibold text-gray-700 block mb-2">
                        Teslim Paket Seçenekleri:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {srv.packages.map((pkg) => (
                          <div
                            key={pkg.id}
                            className="px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-xs text-gray-800 flex items-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5 text-bronze" />
                            <span className="font-medium">{pkg.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-100">
                    <Link
                      href={`/fiyat-hesaplama/${srv.slug}`}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-navy hover:bg-navy-light text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <Calculator className="w-4 h-4" />
                      <span>{srv.shortTitle} Fiyatı Hesapla</span>
                    </Link>
                    <Link
                      href={`/hizmetler/${srv.slug}`}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl border border-navy/20 hover:border-navy text-navy text-xs sm:text-sm font-semibold text-center transition-all"
                    >
                      Detaylı Teknik İnceleme
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
