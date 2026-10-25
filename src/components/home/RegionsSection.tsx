import React from 'react';
import { MapPin, Navigation, Truck } from 'lucide-react';

export function RegionsSection() {
  const regions = [
    {
      city: 'Düzce (Fabrika & Merkez Bölgesi)',
      badge: '0 ₺ Fabrika İçi Nakliye',
      districts: ['Merkez', 'Akçakoca', 'Gölyaka', 'Çilimli', 'Gümüşova', 'Kaynaşlı', 'Yığılca', 'Beyköy'],
    },
    {
      city: 'Bolu & Çevresi',
      badge: 'Sabit Bölge Tarifesi',
      districts: ['Merkez', 'Abant Yolu', 'Mengen', 'Gerede', 'Mudurnu', 'Göynük'],
    },
    {
      city: 'Sakarya & Sapanca',
      badge: 'Hızlı Şantiye Sevk',
      districts: ['Adapazarı', 'Sapanca', 'Hendek', 'Akyazı', 'Karasu', 'Serdivan'],
    },
    {
      city: 'Zonguldak & Kocaeli',
      badge: 'Batı Karadeniz Hattı',
      districts: ['Ereğli', 'Zonguldak Merkez', 'Alaplı', 'Kocaeli Kartepe', 'Kandıra'],
    },
  ];

  return (
    <section className="py-16 bg-warm-card border-y border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
              BÖLGESEL HİZMET AĞIMIZ
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-dark">
              Düzce ve Batı Karadeniz Hizmet Noktalarımız
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 md:mt-0">
            <Truck className="w-4 h-4 text-bronze" />
            <span>Kendi vinç ve lojistik araçlarımızla yerinde teslimat</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((reg, idx) => (
            <div key={idx} className="luxury-card p-6 rounded-xl">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-bronze" />
                  <h3 className="font-bold text-sm text-navy-dark font-serif">{reg.city}</h3>
                </div>
              </div>
              <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-bronze/10 text-bronze uppercase tracking-wider mb-4">
                {reg.badge}
              </span>

              <div className="flex flex-wrap gap-1.5">
                {reg.districts.map((d, dIdx) => (
                  <span
                    key={dIdx}
                    className="text-[11px] px-2 py-0.5 rounded bg-gray-100 text-gray-700"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
