import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  Clock,
  ArrowRight,
  Layers,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-dark text-gray-300 border-t border-white/10 relative overflow-hidden">
      {/* Subtle top architectural bar */}
      <div className="h-1 bg-gradient-to-r from-navy via-bronze to-navy" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-bronze to-bronze-dark flex items-center justify-center text-white shadow-md">
                <Layers className="w-5 h-5 text-warm-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-wider text-white font-serif">
                  ARGEV <span className="text-bronze text-lg font-sans font-semibold">YAPI</span>
                </span>
                <span className="text-[11px] tracking-widest uppercase text-gray-400 font-medium">
                  Çelik Teknolojileri ve Mühendislik
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-gray-400 pr-4">
              Düzce ve Batı Karadeniz genelinde depreme tam dayanıklı hafif çelik ve ağır çelik villalar, konutlar, endüstriyel garajlar ve ferforje sanatını en yüksek mühendislik disipliniyle hayata geçiriyoruz.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/argevyapiduzce/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-bronze hover:text-white flex items-center justify-center text-gray-400 transition-colors"
                title="Instagram @argevyapiduzce"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://share.google/hRm0NKr0D9ILdZyGQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-bronze hover:text-white flex items-center justify-center text-gray-400 transition-colors"
                title="Google Haritalar Konumu"
              >
                <MapPin className="w-5 h-5" />
              </a>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-400 border border-white/5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>1. Derece Deprem Dayanımlı</span>
              </div>
            </div>
          </div>

          {/* Column 2: Çelik Yapı Hizmetleri */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-serif mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bronze" />
              Hizmetlerimiz
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/hizmetler/hafif-celik-ev" className="hover:text-white transition-colors">
                  Hafif Çelik Ev
                </Link>
              </li>
              <li>
                <Link href="/hizmetler/agir-celik-ev" className="hover:text-white transition-colors">
                  Ağır Çelik Ev
                </Link>
              </li>
              <li>
                <Link href="/hizmetler/celik-villa" className="hover:text-white transition-colors">
                  Çelik Villa
                </Link>
              </li>
              <li>
                <Link href="/hizmetler/agir-celik-villa" className="hover:text-white transition-colors">
                  Ağır Çelik Villa
                </Link>
              </li>
              <li>
                <Link href="/hizmetler/celik-garaj" className="hover:text-white transition-colors">
                  Çelik Garaj & Sundurma
                </Link>
              </li>
              <li>
                <Link href="/hizmetler/ferforje" className="hover:text-white transition-colors">
                  Ferforje & Bahçe Kapısı
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hızlı Erişim & Araçlar */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-serif mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bronze" />
              Hızlı Erişim
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/fiyat-hesaplama" className="text-bronze-light hover:text-white flex items-center gap-1.5 font-medium">
                  <span>Teklif Hesaplama Sihirbazı</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/projeler" className="hover:text-white transition-colors">
                  Tamamlanan Projeler
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="hover:text-white transition-colors">
                  Mühendislik Standartlarımız
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Çelik Yapı Rehberi & Blog
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-white transition-colors">
                  Bize Ulaşın
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/admin/login" className="text-xs text-gray-500 hover:text-gray-300">
                  Yönetim Paneli Girişi
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: İletişim & Düzce Ofis */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-serif mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bronze" />
              Merkez Ofis & İletişim
            </h3>
            <div className="space-y-3.5 text-xs sm:text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                <div>
                  <span>Kültür Mah. Mehmet Akif Cad. No: 42/B, Merkez / DÜZCE</span>
                  <a
                    href="https://share.google/hRm0NKr0D9ILdZyGQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-bronze-light hover:text-white underline mt-1 font-medium"
                  >
                    Google Haritalarda Görüntüle →
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-bronze shrink-0" />
                <a href="tel:05413980081" className="hover:text-white font-semibold text-warm-white">
                  0541 398 00 81
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href="https://wa.me/905413980081?text=Merhaba%20ARGEV%20Yapı,%20çelik%20ev%20ve%20yapı%20projeleriniz%20hakkında%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 font-medium text-emerald-400"
                >
                  WhatsApp: 0541 398 00 81
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-bronze shrink-0" />
                <a href="mailto:bilgi@argevyapi.com" className="hover:text-white">
                  bilgi@argevyapi.com
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                <span>Pzt - Cmt: 08:30 - 18:30<br />Pazar: Randevu ile</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} ARGEV Yapı ve Çelik Teknolojileri San. Tic. Ltd. Şti. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-5">
            <Link href="/kvkk" className="hover:text-gray-300 transition-colors">
              KVKK Aydınlatma
            </Link>
            <Link href="/gizlilik-politikasi" className="hover:text-gray-300 transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/cerez-politikasi" className="hover:text-gray-300 transition-colors">
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
