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
    <div className="pt-20 pb-12 bg-warm-white min-h-screen">
      {/* Compact Page Header */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center pt-2 pb-1">
        <span className="text-[11px] uppercase font-bold tracking-widest text-bronze block">
          ŞEFFAF VE ANLIK MALİYET DÖKÜMÜ
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-navy-dark tracking-tight mt-1 mb-1.5">
          Çelik Yapı Fiyat Hesaplayıcı
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          Projenizin m², paket, zemin ve donanım tercihlerini seçerek anlık maliyet tablonuzu inceleyin.
        </p>
      </div>

      {/* Calculator Interactive Wizard */}
      <CalculatorWizard services={services} steps={steps} />
    </div>
  );
}
