import React from 'react';
import Link from 'next/link';
import { DataStore } from '@/lib/data-store';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { WhyArgev } from '@/components/home/WhyArgev';
import { ProcessSection } from '@/components/home/ProcessSection';
import { RegionsSection } from '@/components/home/RegionsSection';
import { ProjectsTeaser } from '@/components/home/ProjectsTeaser';
import { FAQSection } from '@/components/home/FAQSection';
import { Calculator, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';

export default async function HomePage() {
  const services = await DataStore.getServices();
  const projects = await DataStore.getProjects();
  const faqs = await DataStore.getFAQs();

  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Services Section */}
      <ServicesSection services={services} />

      {/* 3. Why ARGEV & Earthquake Focus */}
      <WhyArgev />

      {/* 4. Three Stage Process */}
      <ProcessSection />

      {/* 5. Projects Portfolio Teaser */}
      <ProjectsTeaser projects={projects} />

      {/* 6. Service Regions */}
      <RegionsSection />

      {/* 7. Interactive Calculator Banner CTA */}
      <section className="py-16 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-bronze/20 via-navy-dark to-navy-dark opacity-90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-bronze-light block mb-2">
              DİJİTAL MALİYET DANIŞMANI
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
              Hayalinizdeki Çelik Evin Maliyetini Şimdi Öğrenin
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              M² büyüklüğü, kat sayısı, teslim paketi, zemin malzemeleri, yerden ısıtma ve mutfak donanımını serbestçe seçin; şeffaf ve anlık fiyat teklifinizi saniyeler içinde oluşturun.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              href="/fiyat-hesaplama"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-bronze to-bronze-dark hover:from-bronze-light hover:to-bronze text-white font-semibold text-sm shadow-lg flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Teklif Sihirbazını Başlat</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:05413980081"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/15 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-bronze-light" />
              <span>0541 398 00 81</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. FAQs */}
      <FAQSection faqs={faqs} />
    </div>
  );
}
