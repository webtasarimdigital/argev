import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  Factory,
  Award,
  Users,
  Compass,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hakkımızda — ARGEV Yapı Çelik Teknolojileri Düzce',
  description:
    'Düzce ve Batı Karadeniz bölgesinde depreme dayanıklı hafif ve ağır çelik yapılar inşa eden ARGEV Yapı kurumsal vizyonu ve mühendislik ilkeleri.',
};

export default function HakkimizdaPage() {
  return (
    <div className="pt-24 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
            KURUMSAL MİMARİ VİZYONUMUZ
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-dark tracking-tight mb-4">
            Mühendislik Disiplini ile Güvenli Yaşam Alanları
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light">
            Düzce merkezli ARGEV Yapı, yüksek mukavemetli yapısal çelik ve roll-form teknolojisiyle bölgenin en güvenli konutlarını hayata geçirmektedir.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 relative h-96 sm:h-[480px] rounded-3xl overflow-hidden shadow-luxury-lg bg-navy-dark">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="ARGEV Yapı Düzce Üretim ve Mimarlık"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs text-bronze-light font-bold uppercase tracking-wider block mb-1">
                Deprem Bilinciyle İnşa Ediyoruz
              </span>
              <p className="text-sm font-serif">
                1999 Düzce felaketini yaşayan bir coğrafyanın mühendisleri olarak güvenliği şansa bırakmıyoruz.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-sm text-gray-700 leading-relaxed font-light">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-dark">
              Neden Çelik Mimarisi?
            </h2>
            <p>
              ARGEV Yapı ve Çelik Teknolojileri; Düzce, Bolu, Sakarya ve tüm Batı Karadeniz bölgesinde deprem riskini minimize eden en ileri inşaat sistemlerini sunmak amacıyla kurulmuştur. Betonarme yapıların ağır kütlesel eylemsizliği yerine, deprem enerjisini sönümleyen hafif ve esnek yapısal çelik karkas sistemlerini tercih ediyoruz.
            </p>
            <p>
              Tüm taşıyıcı elemanlarımız, 275 gr/m² sıcak daldırma galvaniz kaplı sac profillerden bilgisayar destekli roll-form makinelerinde sıfır hata toleransıyla üretilir. Şantiye ortamında kalıp çakma, kaynak yapma veya beton priz alma beklemesi gibi kontrolsüz değişkenler devreden çıkarılır.
            </p>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
              <strong className="block mb-1 text-amber-950 font-semibold">
                Kesin İlkemiz: Ahşap ve Bungalov Yapmıyoruz
              </strong>
              ARGEV portföyünde yangın dayanımı düşük, böceklenme ve rutubete bağlı çürüme riski barındıran geçici ahşap veya bungalov yapılar kesinlikle yer almaz. Biz yalnızca uluslararası statik normlara uygun asırlık çelik mimari üretiyoruz.
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="luxury-card p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-navy/5 text-navy flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-bronze" />
            </div>
            <h3 className="text-lg font-bold font-serif text-navy-dark mb-2">
              Statik Güvenlik & Süneklik
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Her yapı için bağımsız statik hesap raporu ve deprem ivme simülasyonu düzenlenir. Yapı rijitliği yasal zorunlulukların üzerinde tutulur.
            </p>
          </div>

          <div className="luxury-card p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-navy/5 text-navy flex items-center justify-center mb-6">
              <Factory className="w-6 h-6 text-bronze" />
            </div>
            <h3 className="text-lg font-bold font-serif text-navy-dark mb-2">
              Düzce Fabrikasyon İmalatı
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Profillerin tamamı kendi bünyemizdeki CNC roll-form hatlarında milimetrik delik ve bükümle üretilir. Montajda somun-cıvata kullanılır.
            </p>
          </div>

          <div className="luxury-card p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-navy/5 text-navy flex items-center justify-center mb-6">
              <Award className="w-6 h-6 text-bronze" />
            </div>
            <h3 className="text-lg font-bold font-serif text-navy-dark mb-2">
              Şeffaf Sözleşme & Sabit Fiyat
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Keşif ve proje netleştikten sonra sözleşme bedeli sabittir. İnşaat süresince döviz veya enflasyon farkı talep edilmez.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/fiyat-hesaplama"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-navy hover:bg-navy-light text-white text-sm font-semibold shadow-md transition-all"
          >
            <span>Fiyat Hesaplama Sihirbazını Başlat</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
