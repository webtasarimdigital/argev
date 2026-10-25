import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DataStore } from '@/lib/data-store';
import { CalculatorWizard } from '@/components/calculator/CalculatorWizard';
import { ShieldCheck } from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await DataStore.getServiceBySlug(params.slug);
  if (!service) return { title: 'Fiyat Hesaplama — ARGEV Yapı' };

  return {
    title: `${service.name} Fiyat Hesaplama — ARGEV Yapı`,
    description: `${service.name} için serbest m² ve donanım seçeneklerine göre anlık fiyat teklifi hesaplayın.`,
  };
}

export default async function ServiceCalculatorPage({ params }: PageProps) {
  const services = await DataStore.getServices();
  const service = await DataStore.getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const steps = await DataStore.getCalculatorSteps();

  return (
    <div className="pt-24 pb-16 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
          {service.name.toUpperCase()} ÖZEL HESAPLAMA
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-dark tracking-tight mb-4">
          {service.name} Fiyat Sihirbazı
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {service.summary}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Başlangıç {service.baseM2Price.toLocaleString('tr-TR')} ₺/{service.pricingType === 'm2' ? 'm²' : 'mtül'}</span>
        </div>
      </div>

      <CalculatorWizard
        initialServiceSlug={params.slug}
        services={services}
        steps={steps}
      />
    </div>
  );
}
