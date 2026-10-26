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

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ServiceCalculatorPage({ params }: PageProps) {
  const services = await DataStore.getServices();
  const service = await DataStore.getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const steps = await DataStore.getCalculatorSteps();
  const pricingRules = await DataStore.getPricingRules();

  return (
    <div className="pt-24 sm:pt-32 pb-12 bg-warm-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center pt-1 pb-2">
        <h1 className="text-xl sm:text-3xl font-serif font-bold text-navy-dark tracking-tight">
          {service.name} Fiyat Sihirbazı
        </h1>
        <p className="hidden sm:block text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mt-1 leading-relaxed">
          {service.summary}
        </p>
      </div>

      <CalculatorWizard
        initialServiceSlug={params.slug}
        services={services}
        steps={steps}
        pricingRules={pricingRules}
      />
    </div>
  );
}
