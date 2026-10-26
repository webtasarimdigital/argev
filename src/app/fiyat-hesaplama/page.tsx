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

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function FiyatHesaplamaPage() {
  const services = await DataStore.getServices();
  const steps = await DataStore.getCalculatorSteps();
  const pricingRules = await DataStore.getPricingRules();

  return (
    <div className="pt-24 sm:pt-32 pb-12 bg-warm-white min-h-screen">
      {/* Compact Header */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center pt-1 pb-2">
        <h1 className="text-xl sm:text-3xl font-serif font-bold text-navy-dark tracking-tight">
          Çelik Yapı Fiyat Hesaplayıcı
        </h1>
        <p className="hidden sm:block text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mt-1 leading-relaxed">
          Projenizin m², paket, zemin ve donanım tercihlerini seçerek anlık maliyet tablonuzu inceleyin.
        </p>
      </div>

      {/* Calculator Interactive Wizard */}
      <CalculatorWizard services={services} steps={steps} pricingRules={pricingRules} />
    </div>
  );
}
