import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DataStore } from '@/lib/data-store';
import { formatCurrency } from '@/lib/utils';
import {
  Check,
  Calculator,
  ShieldCheck,
  Clock,
  ArrowRight,
  ChevronRight,
  Layers,
  Sparkles,
  Award,
} from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await DataStore.getServiceBySlug(params.slug);
  if (!service) return { title: 'Hizmet Bulunamadı — ARGEV Yapı' };

  return {
    title: `${service.name} — ARGEV Yapı Düzce`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const service = await DataStore.getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link href="/" className="hover:text-navy">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/hizmetler" className="hover:text-navy">Hizmetlerimiz</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-navy font-semibold">{service.name}</span>
        </div>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
              DÜZCE VE BATI KARADENİZ İÇİN ÖZEL MİMARİ
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-dark tracking-tight mb-6">
              {service.name}
            </h1>
            <p className="text-base text-gray-700 leading-relaxed mb-6 font-light">
              {service.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-warm-card border border-warm-border">
                <span className="text-xs text-gray-500 block mb-1">Başlangıç Fiyatı</span>
                <span className="text-lg font-bold text-navy">
                  {formatCurrency(service.baseM2Price)}
                </span>
                <span className="text-[10px] text-gray-400 block">
                  /{service.pricingType === 'm2' ? 'm²' : 'mtül'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-warm-card border border-warm-border">
                <span className="text-xs text-gray-500 block mb-1">Montaj Süresi</span>
                <span className="text-lg font-bold text-bronze">
                  ~{service.defaultTurnaroundDays} Gün
                </span>
                <span className="text-[10px] text-gray-400 block">Anahtar Teslim</span>
              </div>

              <div className="p-4 rounded-xl bg-warm-card border border-warm-border">
                <span className="text-xs text-gray-500 block mb-1">M² Aralığı</span>
                <span className="text-lg font-bold text-navy">
                  {service.minM2} - {service.maxM2}
                </span>
                <span className="text-[10px] text-gray-400 block">Serbest m²</span>
              </div>
            </div>

            <Link
              href={`/fiyat-hesaplama/${service.slug}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-bronze to-bronze-dark hover:from-bronze-light hover:to-bronze text-white font-semibold text-sm shadow-md transition-all"
            >
              <Calculator className="w-5 h-5" />
              <span>Bu Hizmet İçin Teklif Hesapla</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-5 relative h-80 sm:h-[460px] rounded-3xl overflow-hidden shadow-luxury-lg bg-navy-dark">
            <img
              src={service.featuredImage}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs text-bronze-light font-bold uppercase tracking-wider block mb-1">
                ARGEV Kalite Güvencesi
              </span>
              <span className="text-base font-serif font-bold">
                1. Sınıf Galvaniz Çelik & A+ İzolasyon
              </span>
            </div>
          </div>
        </div>

        {/* Packages Comparison Table */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
              KAPSAM VE DONANIM
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-dark">
              Paket Seçenekleri ve Kapsamları
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              İster kaba yapı iskeleti, ister tam anahtar teslim lüks donanım.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`luxury-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative ${
                  pkg.isDefault ? 'border-bronze ring-2 ring-bronze/20' : ''
                }`}
              >
                {pkg.isDefault && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-bronze text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    En Çok Tercih Edilen
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-serif font-bold text-navy-dark mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                    {pkg.description || 'Projenize özel standart teslim kapsamı.'}
                  </p>

                  <div className="space-y-3 mb-8">
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/fiyat-hesaplama/${service.slug}`}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center transition-all ${
                    pkg.isDefault
                      ? 'bg-navy text-white hover:bg-navy-light shadow-md'
                      : 'border border-navy/20 text-navy hover:bg-navy/5'
                  }`}
                >
                  {pkg.name} ile Hesapla
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
