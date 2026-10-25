import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası — ARGEV Yapı ve Çelik Teknolojileri',
  description: 'ARGEV Yapı gizlilik ilkeleri, veri güvenliği standartları ve müşteri bilgi mahremiyeti politikası.',
};

export default function GizlilikPolitikasiPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="luxury-card p-6 sm:p-12 rounded-3xl shadow-card bg-white border border-warm-border">
          <div className="border-b border-gray-100 pb-6 mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
              BİLGİ GÜVENLİĞİ VE MAHREMİYET
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-navy-dark">
              Gizlilik Politikası
            </h1>
            <p className="text-xs text-gray-500 mt-2">
              Son Güncelleme: 25 Ekim 2026 • ARGEV Yapı ve Çelik Teknolojileri San. Tic. Ltd. Şti.
            </p>
          </div>

          <div className="prose prose-sm text-gray-700 leading-relaxed space-y-6 font-light">
            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif text-navy-dark flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-bronze" />
                1. Giriş ve Kapsam
              </h2>
              <p>
                ARGEV Yapı ve Çelik Teknolojileri (&apos;ARGEV Yapı&apos;, &apos;Şirket&apos;, &apos;Biz&apos;), müstakil çelik ev, ağır çelik konut, çelik villa, çelik sundurma ve sanatsal ferforje imalatı alanında faaliyet gösteren öncü bir mühendislik kuruluşudur. Dijital platformlarımız (web sitesi, interaktif fiyat hesaplama sihirbazı, mobil arayüzler ve iletişim kanalları) üzerinden bizimle paylaştığınız kişisel ve ticari verilerin gizliliği, şirketimizin en temel etik ve yasal ilkelerindendir.
              </p>
              <p>
                Bu Gizlilik Politikası, web sitemizi ziyaret eden tüm gerçek kişilerin, teklif hesaplayan potansiyel müşterilerimizin ve sözleşmeli iş ortaklarımızın bilgilerinin nasıl toplandığını, işlendiğini, korunduğunu ve hangi güvenlik standartlarına tabi olduğunu detaylandırmaktadır.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif text-navy-dark flex items-center gap-2">
                <FileText className="w-5 h-5 text-bronze" />
                2. Toplanan Bilgiler ve Toplama Yöntemleri
              </h2>
              <p>
                Sitemizi ziyaret ettiğinizde ve hizmetlerimizden yararlandığınızda aşağıdaki kategorilerdeki bilgiler toplanabilmektedir:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <h3 className="font-semibold text-navy text-xs mb-1">Doğrudan İlettiğiniz Bilgiler</h3>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-gray-600">
                    <li>Ad, soyad ve unvan bilgileri</li>
                    <li>Telefon numarası ve e-posta adresi</li>
                    <li>İnşaat planlanan il/ilçe ve arsa imar detayları</li>
                    <li>Fiyat hesaplayıcıda seçtiğiniz m², kat, paket ve opsiyon tercihleri</li>
                    <li>İletişim formlarında bıraktığınız özel proje notları</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <h3 className="font-semibold text-navy text-xs mb-1">Otomatik Toplanan Teknik Bilgiler</h3>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-gray-600">
                    <li>İnternet Protokol (IP) adresi ve coğrafi bölge</li>
                    <li>Kullanılan cihaz, tarayıcı türü ve ekran çözünürlüğü</li>
                    <li>Sitede geçirilen süre ve ziyaret edilen hizmet sayfaları</li>
                    <li>Hata logları ve sunucu yanıt süreleri</li>
                    <li>Hesaplama adım geçişleri ve form doldurma tamamlama oranları</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif text-navy-dark flex items-center gap-2">
                <Eye className="w-5 h-5 text-bronze" />
                3. Bilgilerin Kullanım Amaçları
              </h2>
              <p>Toplanan bilgileriniz aşağıdaki amaçlar doğrultusunda meşru menfaatler çerçevesinde kullanılır:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
                <li><strong>Şeffaf Teklif Üretimi:</strong> Seçtiğiniz mimari parametrelere ve güncel malzeme maliyetlerine göre anlık fiyat snapshot&apos;ı oluşturmak.</li>
                <li><strong>Mühendislik ve Keşif Görüşmesi:</strong> Talebiniz üzerine teknik uzmanlarımızın arsanızı ve projenizi incelemek üzere tarafınıza telefon veya WhatsApp ile ulaşması.</li>
                <li><strong>Sözleşme ve Ruhsat Süreçleri:</strong> İlerleme kaydedilen projelerde statik proje, belediye ruhsat dosyası ve anahtar teslim inşaat sözleşmelerinin düzenlenmesi.</li>
                <li><strong>Sistem Performansı ve İyileştirme:</strong> Hesaplama motorunun doğruluğunu test etmek, kullanıcı deneyimini iyileştirmek ve sunucu altyapısını güçlendirmek.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif text-navy-dark flex items-center gap-2">
                <Lock className="w-5 h-5 text-bronze" />
                4. Bilgi Güvenliği ve Altyapı Tedbirleri
              </h2>
              <p>
                ARGEV Yapı, verilerinizin yetkisiz erişim, tahrif edilme, kaybolma veya kötüye kullanım risklerine karşı korunması için endüstri standardı güvenlik önlemleri uygulamaktadır:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
                <li><strong>256-Bit SSL/TLS Şifreleme:</strong> Web sitemiz ile sunucularımız arasındaki tüm veri trafiği uçtan uca şifrelenmektedir.</li>
                <li><strong>İzole Veritabanı Mimarisi:</strong> Müşteri başvuru kayıtları ve fiyat teklifleri, yetkisiz sorgulamalara karşı Row-Level Security (RLS) kısıtlamalarıyla korunur.</li>
                <li><strong>Kısıtlı Yönetici Erişimi:</strong> Admin paneline yalnızca güçlü kimlik doğrulama parolalarına sahip şirket yetkilileri erişebilir; her erişim ve işlem denetim günlüklerine (audit logs) kaydedilir.</li>
                <li><strong>Üçüncü Taraflara Satılmama Güvencesi:</strong> Bilgileriniz hiçbir koşulda ticari reklam ağlarına, veri simsarlarına veya alakasız üçüncü şahıslara satılmaz, kiralanmaz ve devredilmez.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif text-navy-dark flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-bronze" />
                5. Çerezler ve Analitik Araçlar
              </h2>
              <p>
                Sitemiz, hesaplayıcıda yaptığınız seçimleri adım geçişlerinde korumak ve güvenli oturum sağlamak için zorunlu teknik çerezler kullanır. Detaylı bilgi için lütfen{' '}
                <Link href="/cerez-politikasi" className="text-bronze underline font-semibold">
                  Çerez Politikası
                </Link>{' '}
                sayfamızı inceleyiniz.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif text-navy-dark">6. İletişim ve Hak Talebi</h2>
              <p>
                Gizlilik politikamız veya verilerinizin işlenişi hakkında her türlü soru, görüş veya hak talepleriniz için bize aşağıdaki kanallardan doğrudan ulaşabilirsiniz:
              </p>
              <div className="p-4 rounded-xl bg-warm-white border border-warm-border text-xs text-gray-700 space-y-1">
                <p><strong>ARGEV Yapı ve Çelik Teknolojileri San. Tic. Ltd. Şti.</strong></p>
                <p>Adres: Kültür Mah. Mehmet Akif Cad. No: 42/B, Merkez / DÜZCE</p>
                <p>Telefon: 0541 398 00 81</p>
                <p>E-Posta: bilgi@argevyapi.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
