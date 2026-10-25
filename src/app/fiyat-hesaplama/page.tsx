import React from 'react';
import { Metadata } from 'next';
import { DataStore } from '@/lib/data-store';
import { CalculatorWizard } from '@/components/calculator/CalculatorWizard';
import { ShieldCheck, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Çelik Ev Fiyat Hesaplama Sihirbazı — ARGEV Yapı',
  description:
    'Hafif çelik ev, ağır çelik ev, çelik villa ve çelik garaj için şeffaf fiyat hesaplayıcı. Serbest m², paket seçenekleri ve detaylı maliyet dökümü.',
};

export default async function FiyatHesaplamaPage() {
  const services = await DataStore.getServices();
  const steps = await DataStore.getCalculatorSteps();

  return (
    <div className="pt-24 pb-16 bg-warm-white min-h-screen">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
          ŞEFFAF VE ANLIK MALİYET DÖKÜMÜ
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-dark tracking-tight mb-4">
          Çelik Yapı Fiyat Hesaplayıcı
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Projenizin arsa, m², paket, zemin ve donanım tercihlerini seçerek anlık yaklaşık maliyet tablonuzu inceleyin.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Tüm fiyatlar Düzce fabrika imalat standartlarımıza göre hesaplanır</span>
        </div>
      </div>

      {/* Calculator Interactive Wizard */}
      <CalculatorWizard services={services} steps={steps} />
    </div>
  );
}
