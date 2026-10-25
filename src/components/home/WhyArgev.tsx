import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Flame,
  BadgeCheck,
  Scale,
  Zap,
} from 'lucide-react';

export function WhyArgev() {
  const points = [
    {
      icon: ShieldCheck,
      title: '1. Derece Deprem Güvenliği',
      desc: '1999 Düzce depremini yaşamış bir bölgenin bilinciyle; betonarmeden %70 daha hafif, esnek sünek çelik profillerle can güvenliğinizi garanti altına alıyoruz.',
    },
    {
      icon: Cpu,
      title: 'Bilgisayar Kontrollü Roll-Form Üretim',
      desc: 'Düzce fabrikamızda milimetrik hassasiyetle kesilip bükülen galvaniz profiller; şantiyede kaynak veya insan hatasına yer bırakmadan cıvata-somun ile birleşir.',
    },
    {
      icon: Zap,
      title: 'A+ Isı ve Ses Yalıtımı',
      desc: '150 kg/m³ yoğunlukta taşyünü katmanları, su geçirmez Tyvek nem bariyeri ve çift kat yangına dayanıklı alçıpan ile betonarmeden %40 daha tasarruflu.',
    },
    {
      icon: Scale,
      title: 'Şeffaf Sabit Fiyat Garantisi',
      desc: 'Sözleşmede ne yazıyorsa o ödenir. İnşaat sürecinde uydurma demir-çimento zamları veya gizli ekstralar çıkarılmaz.',
    },
    {
      icon: BadgeCheck,
      title: '100 Yıllık Paslanmazlık',
      desc: '275 gr/m² çift yüzeyli sıcak daldırma çinko galvaniz koruması; neme, fırtınaya ve korozyona karşı yüzyıllık yapı ömrü sunar.',
    },
    {
      icon: ShieldAlert,
      title: 'Neden Ahşap / Bungalov Yapmıyoruz?',
      desc: 'ARGEV portföyünde ahşap/bungalov yoktur. Ahşabın çürüme, kurtlanma, yangın ve düşük deprem rijitliği risklerini kabul etmiyor, kalıcı çelik mimari inşa ediyoruz.',
    },
  ];

  return (
    <section className="py-20 bg-navy-dark text-warm-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
            MÜHENDİSLİK FARKI
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Neden ARGEV Çelik Yapı?
          </h2>
          <p className="text-sm text-gray-300 mt-4 leading-relaxed font-light">
            Deprem bölgesinde yaşayan aileler için güvenliği şansa bırakmayan, çağdaş inşaat teknolojisi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-bronze/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-bronze to-bronze-dark text-white flex items-center justify-center mb-6 shadow-md shadow-bronze/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-warm-white" />
                </div>
                <h3 className="text-lg font-bold font-serif text-white mb-2.5">
                  {pt.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {pt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
