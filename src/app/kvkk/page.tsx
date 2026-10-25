import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, FileCheck, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni — ARGEV Yapı ve Çelik Teknolojileri',
  description: '6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca ARGEV Yapı müşteri ve kullanıcı aydınlatma bildirimi.',
};

export default function KvkkPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="luxury-card p-6 sm:p-12 rounded-3xl shadow-card bg-white border border-warm-border">
          <div className="border-b border-gray-100 pb-6 mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-bronze block mb-2">
              6698 SAYILI KANUN KAPSAMINDA
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-navy-dark">
              Kişisel Verilerin Korunması ve İşlenmesi Aydınlatma Metni
            </h1>
            <p className="text-xs text-gray-500 mt-2">
              Veri Sorumlusu: ARGEV Yapı ve Çelik Teknolojileri San. Tic. Ltd. Şti. (Düzce)
            </p>
          </div>

          <div className="prose prose-sm text-gray-700 leading-relaxed space-y-6 font-light">
            <p>
              <strong>ARGEV Yapı ve Çelik Teknolojileri San. Tic. Ltd. Şti.</strong> (&apos;ARGEV Yapı&apos; veya &apos;Şirket&apos;) olarak; 6698 sayılı Kişisel Verilerin Korunması Kanunu (&apos;KVKK&apos;) ve ilgili mevzuat uyarınca, veri sorumlusu sıfatıyla, tarafımıza sağladığınız kişisel verilerin korunmasına ve hukuka uygun işlenmesine en üst düzeyde hassasiyet göstermekteyiz.
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif text-navy-dark flex items-center gap-2">
                <Shield className="w-5 h-5 text-bronze" />
                1. Veri Sorumlusunun Kimliği
              </h2>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 space-y-1">
                <p><strong>Unvan:</strong> ARGEV Yapı ve Çelik Teknolojileri San. Tic. Ltd. Şti.</p>
                <p><strong>Adres:</strong> Kültür Mah. Mehmet Akif Cad. No: 42/B, Merkez / DÜZCE</p>
                <p><strong>Vergi Dairesi & No:</strong> Düzce V.D. / 0790852341</p>
                <p><strong>İletişim:</strong> 0541 398 00 81 • bilgi@argevyapi.com</p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif text-navy-dark flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-bronze" />
                2. İşlenen Kişisel Veri Kategorileri ve Elde Edilme Yolları
              </h2>
              <p>
                Verileriniz; web sitemiz, dijital teklif hesaplayıcımız, WhatsApp iletişim hattımız, telefon görüşmelerimiz ve şantiye/ofis ziyaretleriniz sırasında elektronik ve fiziki ortamda toplanmaktadır:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
                <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, TC kimlik numarası (yalnızca sözleşme aşamasında).</li>
                <li><strong>İletişim Bilgileri:</strong> Telefon numarası, e-posta adresi, tebligat adresi.</li>
                <li><strong>Müşteri İşlem ve Proje Bilgileri:</strong> Hesaplama kodu, arsa parsel bilgisi, inşaat yapılacak şehir/ilçe, bina m² talebi, mimari ve statik tercihler, teklif dökümü.</li>
                <li><strong>İşlem Güvenliği Bilgileri:</strong> IP adresleri, web sitesi giriş-çıkış logları, kullanıcı izin ve onay zaman damgaları.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif text-navy-dark flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-bronze" />
                3. Kişisel Verilerin İşlenme Amaçları ve Hukuki Sebepleri
              </h2>
              <p>
                Kişisel verileriniz, KVKK&apos;nın 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs text-gray-600">
                <li>
                  <strong>Sözleşmenin Kurulması ve İfası (KVKK m.5/2-c):</strong> Seçtiğiniz çelik yapı modeli için şeffaf teklif oluşturulması, keşif randevusu verilmesi, zemin ve statik hesaplarının hazırlanması, inşaat ve montaj sözleşmesinin yürütülmesi.
                </li>
                <li>
                  <strong>Hukuki Yükümlülüğün Yerine Getirilmesi (KVKK m.5/2-ç):</strong> Yapı denetim, belediye ruhsat dosyası, vergi ve faturalandırma mevzuatına uyum sağlanması.
                </li>
                <li>
                  <strong>Meşru Menfaat (KVKK m.5/2-f):</strong> Müşteri memnuniyetinin ölçülmesi, fiyatlama motorunun optimizasyonu, şantiye iş güvenliği süreçlerinin takibi ve sahteciliğin önlenmesi.
                </li>
                <li>
                  <strong>Açık Rıza (KVKK m.5/1):</strong> İsteğe bağlı olarak yeni çelik yapı teknolojileri, lansman projeleri ve kampanya bilgilendirmelerinin tarafınıza iletilmesi.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif text-navy-dark flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-bronze" />
                4. Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği
              </h2>
              <p>
                Toplanan verileriniz, gizlilik taahhütleri ve yasal sınırlamalar çerçevesinde yalnızca aşağıdaki kişi ve kurumlara aktarılabilir:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
                <li>Mühendislik, statik hesap ve zemin etüdü iş ortaklarımıza,</li>
                <li>Belediyeler, Çevre ve Şehircilik Bakanlığı ile ilgili resmi denetim kurumlarına,</li>
                <li>Nakliye, vinç ve saha montaj lojistik partnerlerimize,</li>
                <li>Kanunen yetkili adli merciler ve kolluk kuvvetlerine (talep halinde).</li>
              </ul>
              <p className="text-xs text-rose-600 font-medium">
                Verileriniz hiçbir surette üçüncü şahıs ve kurumlara pazarlama veya ticari kazanç amacıyla satılmaz.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif text-navy-dark">
                5. İlgili Kişi Olarak KVKK&apos;nın 11. Maddesindeki Haklarınız
              </h2>
              <p>Kanun uyarınca her ilgili kişi ARGEV Yapı&apos;ya başvurarak aşağıdaki haklara sahiptir:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-700">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  ✓ Kişisel verilerinin işlenip işlenmediğini öğrenme
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  ✓ İşlenmişse buna ilişkin detaylı bilgi talep etme
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  ✓ İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  ✓ Yurt içinde veya yurt dışında aktarıldığı 3. kişileri bilme
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  ✓ Eksik veya yanlış işlenmişse düzeltilmesini isteme
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  ✓ KVKK m.7 uyarınca verilerin silinmesini veya yok edilmesini talep etme
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-serif text-navy-dark">6. Başvuru Usulü</h2>
              <p>
                Yukarıda sayılan haklarınıza ilişkin taleplerinizi yazılı olarak <strong>Kültür Mah. Mehmet Akif Cad. No: 42/B, Merkez / DÜZCE</strong> adresimize ıslak imzalı dilekçe ile veya sistemimizde kayıtlı e-posta adresiniz üzerinden <strong>bilgi@argevyapi.com</strong> adresine iletebilirsiniz. Başvurularınız en geç 30 (otuz) gün içinde ücretsiz olarak sonuçlandırılacaktır.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
