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
    <div className="pt-28 sm:pt-32 pb-12 bg-warm-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center pt-2 pb-3">
        <span className="text-[11px] uppercase font-bold tracking-widest text-bronze block mb-1">
          {service.name.toUpperCase()} ÖZEL HESAPLAMA
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-navy-dark tracking-tight mt-1 mb-2">
          {service.name} Fiyat Sihirbazı
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          {service.summary}
        </p>
      </div>

      <CalculatorWizard
        initialServiceSlug={params.slug}
        services={services}
        steps={steps}
      />
    </div>
  );
}
