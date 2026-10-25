# ARGEV Yapı — Kurumsal Web Sitesi ve Dinamik Teklif Hesaplayıcı

Düzce ve Batı Karadeniz bölgesinde hafif çelik ev, ağır çelik ev, çelik villa, ağır çelik villa, çelik garaj ve ferforje hizmetleri sunan **ARGEV Yapı** için geliştirilmiş lüks mimari kurumsal web sitesi, parametrik teklif hesaplayıcısı ve kapsamlı yönetim paneli.

> **Önemli İlke:** ARGEV Yapı portföyünde ahşap ev ve bungalov yer almamaktadır; tüm yapılar 1. derece deprem bölgesine uygun galvanizli ve sıcak haddelenmiş çelik sistemlerle inşa edilir.

---

## 🚀 Öne Çıkan Özellikler

1. **Lüks Mimari Tasarım Dili:**
   - Koyu Lacivert (`#15283A`), Derin Gece Laciverti (`#0D1A28`), Bronz/Kahve (`#866B55`) ve Sıcak Taş Kırık Beyazı (`#F3EFE8`).
   - Sticky şeffaf cam navigasyon, yumuşak geçişler, mobil uyumlu hamburger drawer ve modern tipografi.
2. **Hardcoded Olmayan Dinamik Hesaplayıcı:**
   - Tüm adımlar, sorular, seçenekler, paketler ve birim fiyatlar veritabanından / yönetim panelinden yönetilir.
   - Serbest m² girişi (ör: 85, 105, 157.5 m²).
   - Özel m² (ör: 80 m² evde 50 m² yerden ısıtma seçilirse yalnız 50 m² ücretlendirilir).
   - Metre-tül (mtül) mutfak alt ve üst dolap hesabı (bağımsız hesaplanır).
   - Mutfak "yok" seçildiğinde alt/üst dolap ve tezgâh satırlarının otomatik sıfırlanması.
   - Pakete dahil banyo/WC sayısı düşülerek sadece ekstra adetlerin birim fiyattan eklenmesi.
   - Seramik ve parke alan çakışma uyarıları.
   - Keşif ve statik proje gerektiren kalemlerde (`quote_only`) sahte kesin fiyat uydurulmaz; keşif uyarısı verilir.
3. **Çift Kanallı Teklif Toplama:**
   - **WhatsApp Teklifi:** Müşteri bilgileri girilip teklif veritabanına `whatsapp_intent` durumuyla kaydedilir; ardından doldurulmuş teklif mesajıyla `wa.me` açılır.
   - **Web Formu Teklifi:** Teklif snapshot'ı veritabanına kaydedilir, benzersiz teklif kodu (`ARG-2026-XXXX`) üretilir.
4. **Kapsamlı Yönetim Paneli (`/admin`):**
   - **Dashboard:** Başvuru sayıları, WhatsApp/Form dağılımı, son teklifler.
   - **Hizmet Yönetimi:** 6 çelik hizmetinin baz m² / mtül fiyatları, teslim süreleri ve hesaplayıcı aç/kapat ayarları.
   - **Hesaplayıcı Editörü:** Adım, soru ve seçenekleri dinamik olarak düzenleme.
   - **Parametrik Fiyatlar:** Temel, ruhsat, dış cephe, parke, seramik, yerden ısıtma, mutfak mtül, ekstra WC/banyo fiyat tablosu.
   - **Teklifler & Başvurular:** Müşteri bilgileri, tarihsel fiyat döküm snapshot'ı, durum değiştirme (Yeni, Görüşüldü, Teklif Verildi, Kazanıldı, Kaybedildi) ve CSV dışa aktarımı.
   - **Site Ayarları:** Logo, unvan, WhatsApp ve telefon numaraları, KDV oranı.
   - **Güvenlik & Audit:** Fiyat ve teklif değişikliklerinin tarihçesi ve denetim kayıtları.

---

## 🛠️ Teknolojiler

- **Framework:** Next.js (App Router, Server Actions, API Routes)
- **Dil:** TypeScript
- **Stil & Tasarım:** Tailwind CSS, PostCSS, Lucide Icons, clsx, tailwind-merge
- **Doğrulama & Şema:** Zod
- **Veritabanı & Auth:** Supabase (PostgreSQL, Auth, Storage, RLS) + Hibrit Yerel Fallback Veri Katmanı
- **Test:** Vitest (12 başarı kriterini doğrulayan birim test paketi)

---

## 💻 Kurulum ve Çalıştırma

### 1. Bağımlılıkları Yükleme
```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlatma
```bash
npm run dev
```
Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

### 3. Otomatik Başarı Testlerini Çalıştırma
```bash
npm test
```

### 4. Üretim Derlemesi (Build)
```bash
npm run build
npm start
```

---

## 🗄️ Supabase Entegrasyonu

Projede yer alan **Hibrit Veri Katmanı (`DataStore`)** sayesinde, Supabase anahtarları girilmemiş olsa dahi site tam fonksiyonel olarak çalışır, Next.js derlemesi hatasız tamamlanır ve testler başarıyla geçer.

Canlı Supabase veritabanınızı bağlamak istediğinizde:

1. [Supabase](https://supabase.com) üzerinde yeni bir proje oluşturun.
2. Supabase SQL Editor içerisinde `supabase/migrations/20261025000000_init_argev.sql` dosyasını çalıştırın (tüm tablolar, indexler ve RLS politikaları kurulur).
3. Ardından `supabase/seed.sql` dosyasını çalıştırarak başlangıç verilerini yükleyin.
4. Proje kök dizininde `.env.local` dosyası oluşturun ve bilgileri ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=https://projeniz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon-key-degeriniz
SUPABASE_SERVICE_ROLE_KEY=service-role-key-degeriniz
```

---

## 🔐 Yönetim Paneli Girişi

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin) (veya `/admin/login`)
- **Varsayılan E-Posta:** `admin@argevyapi.com`
- **Varsayılan Şifre:** `argev2026!admin`
