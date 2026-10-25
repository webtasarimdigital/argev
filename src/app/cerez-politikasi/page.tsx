import React from 'react';
import { Metadata } from 'next';
import { Cookie, CheckCircle2, Settings, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Çerez (Cookie) Politikası — ARGEV Yapı ve Çelik Teknolojileri',
  description: 'ARGEV Yapı web sitesi çerez kullanım esasları, analitik araçlar ve çerez tercihleri yönetim rehberi.',
};

export default function CerezPolitikasiPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="luxury-card p-6 sm:p-12 rounded-3xl shadow-card bg-white border border-warm-border">
          <div className="border-b border-gray-100 pb-6 mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
              BİLGİLENDİRME VE ŞEFFAFLIK
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-navy-dark">
              Çerez (Cookie) Politikası
            </h1>
            <p className="text-xs text-gray-500 mt-2">
              ARGEV Yapı ve Çelik Teknolojileri San. Tic. Ltd. Şti.
            </p>
          </div>

          <div className="prose prose-sm text-gray-700 leading-relaxed space-y-6 font-light">
            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif text-navy-dark flex items-center gap-2">
                <Cookie className="w-5 h-5 text-bronze" />
                1. Çerez Nedir ve Ne Amaçla Kullanılır?
              </h2>
              <p>
                Çerezler (cookies), bir internet sitesini ziyaret ettiğinizde tarayıcınız tarafından bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler web sitesinin düzgün çalışmasını, hesaplama tercihlerinizin adımlar arasında korunmasını ve ziyaretçi deneyiminin optimize edilmesini sağlar.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif text-navy-dark flex items-center gap-2">
                <Settings className="w-5 h-5 text-bronze" />
                2. Sitemizde Kullanılan Çerez Türleri
              </h2>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <h3 className="font-semibold text-navy text-xs mb-1">A. Kesinlikle Gerekli (Zorunlu) Çerezler</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Sitemizin güvenliğini sağlamak, yetkili yönetici oturumunu tanımak (örneğin <code>argev_admin_session</code>) ve fiyat hesaplama sihirbazında girdiğiniz m², kat ve donanım tercihlerinin tarayıcıda kaybolmadan bir sonraki adıma aktarılabilmesi için zorunludur. Bu çerezler kapatılamaz.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <h3 className="font-semibold text-navy text-xs mb-1">B. Performans ve Analitik Çerezler</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Sitemizin hangi sayfalarının (örneğin Hafif Çelik Ev veya Çelik Villa) daha çok ziyaret edildiğini, sayfa yüklenme hızlarını ve teknik hataları anonim olarak tespit etmek amacıyla kullanılır. Bu veriler kimliğinizi doğrudan belirlemez.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <h3 className="font-semibold text-navy text-xs mb-1">C. İşlevsellik Çerezleri</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Tercih ettiğiniz il/ilçe seçimi veya form doldurma aşamasında bıraktığınız tercihlerin hatırlanması sayesinde sonraki ziyaretlerinizde size daha kişiselleştirilmiş bir deneyim sunulmasını sağlar.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif text-navy-dark flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-bronze" />
                3. Çerezleri Nasıl Kontrol Edebilir veya Silebilirsiniz?
              </h2>
              <p>
                Tarayıcınızın ayarlarını değiştirerek çerezleri dilediğiniz zaman engelleyebilir veya silebilirsiniz:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
                <li><strong>Google Chrome:</strong> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Diğer Site Verileri</li>
                <li><strong>Mozilla Firefox:</strong> Seçenekler &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Site Verileri</li>
                <li><strong>Safari:</strong> Tercihler &gt; Gizlilik &gt; Tüm Çerezleri Engelle</li>
                <li><strong>Microsoft Edge:</strong> Ayarlar &gt; Çerezler ve Site İzinleri</li>
              </ul>
              <p className="text-xs text-gray-500 italic">
                Not: Zorunlu çerezlerin engellenmesi durumunda, interaktif fiyat hesaplama sihirbazı veya admin oturumu gibi fonksiyonlar beklenen şekilde çalışmayabilir.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
