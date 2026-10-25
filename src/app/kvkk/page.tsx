import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni — ARGEV Yapı',
};

export default function KvkkPage() {
  return (
    <div className="pt-24 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="luxury-card p-8 sm:p-12 rounded-3xl">
          <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
            6698 SAYILI KANUN KAPSAMINDA
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-navy-dark mb-6">
            Kişisel Verilerin Korunması Aydınlatma Metni
          </h1>

          <div className="prose prose-sm text-gray-700 leading-relaxed space-y-4 font-light">
            <p>
              <strong>ARGEV Yapı ve Çelik Teknolojileri San. Tic. Ltd. Şti.</strong> (&apos;ARGEV Yapı&apos;) olarak; müşterilerimizin ve web sitemizi ziyaret eden kullanıcılarımızın kişisel verilerinin Türkiye Cumhuriyeti Anayasası ve 6698 sayılı Kişisel Verilerin Korunması Kanunu (&apos;KVKK&apos;) başta olmak üzere ilgili mevzuata uygun olarak işlenmesine ve korunmasına azami özen göstermekteyiz.
            </p>

            <h2 className="text-lg font-bold font-serif text-navy-dark pt-2">1. Veri Sorumlusu</h2>
            <p>
              KVKK uyarınca veri sorumlusu sıfatıyla ARGEV Yapı (Kültür Mah. Mehmet Akif Cad. No: 42/B, Merkez / DÜZCE) tarafından toplanan kişisel verileriniz aşağıda belirtilen çerçevede işlenmektedir.
            </p>

            <h2 className="text-lg font-bold font-serif text-navy-dark pt-2">2. İşlenen Kişisel Veriler ve İşleme Amaçları</h2>
            <p>
              Web sitemizdeki teklif hesaplama formları ve iletişim kanalları vasıtasıyla ad-soyad, telefon numarası, e-posta adresi, proje şehri/ilçesi ve teklif parametreleriniz toplanmaktadır. Bu veriler;
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Talep ettiğiniz çelik yapı teklifinin hesaplanması ve tarafınıza iletilmesi,</li>
              <li>Keşif, mimari ve statik projelendirme süreçlerinin yürütülmesi,</li>
              <li>Müşteri ilişkileri yönetimi ve iletişim süreçlerinin takibi,</li>
              <li>Yetkili kurum ve kuruluşlara mevzuattan kaynaklanan bilgi verilmesi amacıyla işlenmektedir.</li>
            </ul>

            <h2 className="text-lg font-bold font-serif text-navy-dark pt-2">3. Kişisel Verilerin Aktarımı</h2>
            <p>
              Toplanan kişisel verileriniz, açık rızanız olmaksızın üçüncü taraflara ticari veya reklam amacıyla kesinlikle satılmaz ve aktarılmaz. Yalnızca yasal yükümlülükler doğrultusunda adli ve idari mercilere aktarılabilir.
            </p>

            <h2 className="text-lg font-bold font-serif text-navy-dark pt-2">4. Haklarınız</h2>
            <p>
              KVKK&apos;nın 11. maddesi uyarınca veri sorumlusuna başvurarak; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, silinmesini veya düzeltilmesini isteme haklarına sahipsiniz. Başvurularınızı <strong>bilgi@argevyapi.com</strong> adresi üzerinden yazılı olarak iletebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
