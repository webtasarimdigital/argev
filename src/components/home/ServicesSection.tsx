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
              className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Photo with zoom on hover */}
                <div className="relative h-60 w-full overflow-hidden bg-navy-dark">
                  <img
                    src={srv.featuredImage}
                    alt={srv.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-navy-dark/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-warm-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-bronze" />
                    <span>~{srv.defaultTurnaroundDays} Gün</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-navy-dark mb-2">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    {srv.summary}
                  </p>

                  <div className="bg-warm-card border border-warm-border p-3 rounded-xl mb-4 flex items-center justify-between">
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
                  className="flex-1 py-2.5 px-3 rounded-lg border border-navy/20 hover:border-navy text-navy text-xs font-semibold text-center transition-colors"
                >
                  Detayları İncele
                </Link>
                <Link
                  href={`/fiyat-hesaplama/${srv.slug}`}
                  className="py-2.5 px-3.5 rounded-lg bg-navy hover:bg-navy-light text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  title="Bu hizmet için fiyat hesapla"
                >
                  <Calculator className="w-3.5 h-3.5" />
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
