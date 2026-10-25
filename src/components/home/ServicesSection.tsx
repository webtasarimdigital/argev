import React from 'react';
import Link from 'next/link';
import { Service } from '@/types/calculator';
import { formatCurrency } from '@/lib/utils';
import { ArrowRight, Calculator, Check, Clock } from 'lucide-react';

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
              ÇELİK MİMARİ KAPSAMIMIZ
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy-dark tracking-tight">
              Uzmanlık Alanlarımız
            </h2>
          </div>
          <p className="text-sm text-gray-600 max-w-md mt-4 md:mt-0 leading-relaxed">
            Statik mühendislik kurallarına göre projelendirilen, depreme dayanıklı ve asırlık ömre sahip çelik yapılar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 relative border border-warm-border hover:border-bronze shadow-card hover:shadow-luxury-lg bg-white"
            >
              {/* Top expanding bronze accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-bronze to-bronze-light w-0 group-hover:w-full transition-all duration-500 z-20" />

              <div>
                {/* Photo with smooth zoom on hover */}
                <div className="relative h-64 w-full overflow-hidden bg-navy-dark">
                  <img
                    src={srv.featuredImage}
                    alt={srv.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute top-4 right-4 bg-navy-dark/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-warm-white flex items-center gap-1.5 shadow-md border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-bronze-light" />
                    <span>~{srv.defaultTurnaroundDays} Gün</span>
                  </div>

                  <div className="absolute bottom-3 left-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-bronze-light bg-navy-dark/85 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/10">
                      {srv.pricingType === 'm2' ? 'M² Proje' : 'Özel İmalat'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-navy-dark mb-2 group-hover:text-bronze transition-colors">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-5">
                    {srv.summary}
                  </p>

                  <div className="bg-warm-card border border-warm-border p-3.5 rounded-xl mb-4 flex items-center justify-between group-hover:border-bronze/40 transition-colors">
                    <div>
                      <span className="text-[10px] text-gray-500 block uppercase font-medium">
                        Başlangıç Birim Fiyatı
                      </span>
                      <span className="text-base font-bold text-navy">
                        {formatCurrency(srv.baseM2Price)}{' '}
                        <span className="text-xs text-gray-500 font-normal">
                          / {srv.pricingType === 'm2' ? 'm²' : 'mtül'}
                        </span>
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium">
                      {srv.minM2} - {srv.maxM2} {srv.pricingType === 'm2' ? 'm²' : 'mtül'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <Link
                  href={`/hizmetler/${srv.slug}`}
                  className="flex-1 py-2.5 px-3 rounded-lg border border-navy/20 hover:border-navy text-navy text-xs font-semibold text-center transition-all hover:bg-navy/5"
                >
                  Detayları İncele
                </Link>
                <Link
                  href={`/fiyat-hesaplama/${srv.slug}`}
                  className="py-2.5 px-4 rounded-lg bg-navy hover:bg-navy-light text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm hover:shadow-md"
                  title="Bu hizmet için fiyat hesapla"
                >
                  <Calculator className="w-3.5 h-3.5 text-bronze-light" />
                  <span>Hesapla</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
