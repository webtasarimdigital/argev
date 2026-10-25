import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Factory,
  Hammer,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      num: '01',
      icon: Compass,
      title: 'Mimari & Statik Projelendirme',
      desc: 'Arsanızın imar durumuna ve zemin etüdüne uygun olarak 3D mimari çizimler, oda planları ve statik deprem simülasyonları hazırlanır.',
      points: ['İhtiyaca özel iç planlama', 'Statik deprem hesap raporu', 'Ruhsat proje hazırlığı'],
    },
    {
      num: '02',
      icon: Factory,
      title: 'Fabrikasyon Hassas Üretim',
      desc: 'Projelendirilen çelik taşıyıcı karkas, Düzce tesislerimizde roll-form makinelerinde sıfır hata payıyla galvanizli sacdan imal edilir.',
      points: ['Milimetrik CAD/CAM üretimi', '275 gr/m² galvaniz koruması', 'Numaralandırılmış cıvatalı karkas'],
    },
    {
      num: '03',
      icon: Hammer,
      title: 'Sahada Hızlı Montaj & Teslim',
      desc: 'Hazır paneller şantiyenize sevk edilerek sertifikalı montaj ekiplerimizce 35-45 gün içinde eksiksiz anahtar teslim kurulur.',
      points: ['Hava koşullarından etkilenmeyen montaj', 'Taşyünü ve tesisat montajı', 'Temizlik ve anahtar teslimi'],
    },
  ];

  return (
    <section className="py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
            ŞEFFAF VE DİSİPLİNLİ
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy-dark tracking-tight">
            3 Aşamalı Kusursuz Çalışma Süreci
          </h2>
          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            Hayalinizdeki çelik evi tasarımdan anahtar teslimine kadar sürprizsiz, zamanında ve profesyonel adımlarla tamamlıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="luxury-card p-8 rounded-2xl relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-serif font-bold text-navy/15">
                      {st.num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-navy/5 text-navy flex items-center justify-center">
                      <Icon className="w-6 h-6 text-bronze" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-navy-dark mb-3">
                    {st.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    {st.desc}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {st.points.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-bronze shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/fiyat-hesaplama"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-navy hover:bg-navy-light text-white text-sm font-semibold shadow-md transition-all"
          >
            <span>Kendi Projenizin Maliyetini Hesaplayın</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
