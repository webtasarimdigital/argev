import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DataStore } from '@/lib/data-store';
import {
  MapPin,
  Calendar,
  Clock,
  Layers,
  ArrowRight,
  ChevronRight,
  Calculator,
  ShieldCheck,
} from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await DataStore.getProjectBySlug(params.slug);
  if (!project) return { title: 'Proje Bulunamadı — ARGEV Yapı' };

  return {
    title: `${project.title} — ARGEV Yapı Portföy`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await DataStore.getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link href="/" className="hover:text-navy">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/projeler" className="hover:text-navy">Projeler</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-navy font-semibold">{project.title}</span>
        </div>

        {/* Hero Title */}
        <div className="mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
            {project.serviceName} • {project.locationCity} / {project.locationDistrict}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-dark tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-base text-gray-700 max-w-3xl leading-relaxed font-light">
            {project.summary}
          </p>
        </div>

        {/* Specs Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-warm-card border border-warm-border">
            <span className="text-xs text-gray-500 block mb-1">Toplam Alan</span>
            <span className="text-xl font-bold text-navy">{project.areaM2} m²</span>
          </div>

          <div className="p-4 rounded-xl bg-warm-card border border-warm-border">
            <span className="text-xs text-gray-500 block mb-1">Montaj Süresi</span>
            <span className="text-xl font-bold text-bronze">{project.durationDays} Gün</span>
          </div>

          <div className="p-4 rounded-xl bg-warm-card border border-warm-border">
            <span className="text-xs text-gray-500 block mb-1">Çelik Tonajı</span>
            <span className="text-xl font-bold text-navy">{project.steelTonnage} Ton</span>
          </div>

          <div className="p-4 rounded-xl bg-warm-card border border-warm-border">
            <span className="text-xs text-gray-500 block mb-1">Teslim Yılı</span>
            <span className="text-xl font-bold text-navy">{project.year}</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="md:col-span-2 h-96 sm:h-[500px] rounded-3xl overflow-hidden shadow-luxury-lg bg-navy-dark">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          {project.galleryImages.slice(1).map((img, idx) => (
            <div key={idx} className="h-72 sm:h-80 rounded-2xl overflow-hidden shadow-card bg-navy-dark">
              <img src={img} alt={`${project.title} - ${idx + 2}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Technical Description & Bottom CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-serif font-bold text-navy-dark mb-4">
              Mühendislik ve Mimari Detaylar
            </h2>
            <div className="prose prose-sm text-gray-700 leading-relaxed space-y-4">
              <p>{project.description}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <span className="text-xs font-bold uppercase text-navy-dark tracking-wider block mb-3">
                Bu Projede Uygulanan Sistemler:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.features.map((feat, fIdx) => (
                  <span
                    key={fIdx}
                    className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-navy shadow-sm"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Action Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="luxury-card p-6 rounded-2xl bg-gradient-to-b from-white to-warm-card border-bronze/30">
              <span className="text-xs font-bold uppercase tracking-wider text-bronze block mb-1">
                BENZER BİR YAPI DÜŞÜNÜYORSANIZ
              </span>
              <h3 className="text-lg font-serif font-bold text-navy-dark mb-3">
                Kendi Evinizin Maliyetini Anında Görün
              </h3>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                Bu projede kullanılan malzeme kalitesiyle arsanıza özel yaklaşık teklif tutarını hesaplayın.
              </p>

              <Link
                href={`/fiyat-hesaplama/${project.serviceSlug}`}
                className="w-full py-3 px-4 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Calculator className="w-4 h-4" />
                <span>Benzer Proje Fiyatı Hesapla</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
