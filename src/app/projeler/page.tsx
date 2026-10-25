import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { DataStore } from '@/lib/data-store';
import { MapPin, ArrowRight, Calendar, Maximize2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tamamlanan Çelik Yapı Projelerimiz — ARGEV Yapı',
  description:
    'Düzce, Akçakoca, Bolu ve Sakarya genelinde tamamladığımız hafif çelik ev, ağır çelik rezidans ve çelik villa referanslarımız.',
};

export default async function ProjelerPage() {
  const projects = await DataStore.getProjects();

  return (
    <div className="pt-24 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
            MİMARİ REFERANSLARIMIZ
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-dark tracking-tight mb-4">
            Gerçekleştirdiğimiz Çelik Projeler
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light">
            Düzce ve Batı Karadeniz iklim koşullarına tam uyumlu, deprem güvenliğinden ödün vermeden teslim ettiğimiz yapılar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((prj) => (
            <div
              key={prj.id}
              className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 relative border border-warm-border hover:border-bronze shadow-card hover:shadow-luxury-lg bg-white"
            >
              {/* Top expanding bronze accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-bronze to-bronze-light w-0 group-hover:w-full transition-all duration-500 z-20" />

              <div>
                <div className="relative h-64 w-full overflow-hidden bg-navy-dark">
                  <img
                    src={prj.coverImage}
                    alt={prj.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-navy-dark/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-warm-white flex items-center gap-1.5 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-bronze" />
                    <span>{prj.locationCity} / {prj.locationDistrict}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-navy shadow-sm">
                    {prj.areaM2} m²
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-bronze block mb-1">
                    {prj.serviceName}
                  </span>
                  <h2 className="text-xl font-bold font-serif text-navy-dark mb-2">
                    {prj.title}
                  </h2>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2">
                    {prj.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {prj.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/projeler/${prj.slug}`}
                  className="w-full py-2.5 px-4 rounded-xl border border-navy/20 hover:border-navy hover:bg-navy/5 text-navy text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Projeyi İncele</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
