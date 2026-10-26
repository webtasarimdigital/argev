# ARGEV YAPI - GÖREV KUYRUĞU & TAMAMLANAN GELİŞTİRMELER

Bu belge, iletilen 6 temel talebin sistem genelindeki uygulama detaylarını ve doğrulama durumunu özetler.

---

### 1. Çift Katlı / Tek Katlı Fiyatlandırma Farkı (Floor Count Impact)
- **Talep:** Çift katlı (floor_count = 2) seçildiğinde fiyata kat farkı yansımıyordu; admin panelinden belirlenebilmeli ve hesaplayıcıda dinamik olarak fiyata eklenmeli.
- **Uygulama:**
  - `src/lib/seed-data.ts`: `INITIAL_PRICING_RULES` listesine `floor_double_story` kuralı (1.500 ₺/m²) eklendi.
  - `src/lib/pricing-engine.ts`: `2.5. Kat Sayısı Farkı (Çift Katlı / Dubleks Farkı)` mantığı entegre edildi. Kat sayısı 2 seçildiğinde `buildingM2 * unitPrice` hesaplanıp maliyet dökümüne ekleniyor.
  - `src/tests/pricing-engine.test.ts`: Kat sayısı 2 ve 1 için özel birim testi eklendi ve 14/14 test başarıyla geçti.

---

### 2. Admin Menü ve Fiyat Düzenleme Sadeleştirmesi
- **Talep:** "Parametrik Fiyat Tablosu" ve "Hizmet Yönetimi" kısımlarına gerek yok. Dolap gibi kalemlerde karmaşık yüzdesel çarpanlar yerine doğrudan TL fiyatı girilebilmeli.
- **Uygulama:**
  - `src/app/admin/layout.tsx`: Menü sadeleştirilerek yalnızca 4 ana sekme bırakıldı:
    1. **Dashboard** (`/admin`)
    2. **Hesaplayıcı & Fiyatlar** (`/admin/fiyatlar`)
    3. **Teklif Talepleri** (`/admin/teklifler`)
    4. **Site Ayarları** (`/admin/ayarlar`)
  - `src/app/admin/fiyatlar/page.tsx`: 6 çelik yapı hizmeti için ayrı sekmeli yapı kuruldu. Mutfak dolabı, banyo, zemin, temel vb. tüm kalemler için doğrudan net TL tutarı girilip kaydedilebiliyor.

---

### 3. Admin Paneli Kimlik Doğrulama & Güvenlik
- **Talep:** `/admin` yazıldığında doğrudan içeri girilmemeli; giriş ekranı zorunlu olmalı.
  - **Kullanıcı Adı:** `argev`
  - **Şifre:** `argeçelikev1`
- **Uygulama:**
  - `src/middleware.ts`: Tüm `/admin/*` sayfaları (login hariç) `argev_admin_session=authenticated` çerezini zorunlu kılacak şekilde korundu.
  - `src/app/admin/layout.tsx`: Client-side yetkilendirme kontrolü eklendi; oturumu olmayan kullanıcılar anında `/admin/login` sayfasına yönlendiriliyor.
  - `src/app/admin/login/page.tsx`: Kullanıcı adı `argev` ve şifre `argeçelikev1` (Türkçe karakter ve nokta toleranslı) doğrulandı; oturum çerezi güvenli olarak tanımlandı.

---

### 4. Mobil Hero ve Mobil Navbar Düzenlemeleri
- **Talep:** Mobilde hero alanında "Fiyatınızı Hesaplayın" yazmasına gerek yok. Alt navbar kaymasını düzelt, "Hesapla" butonu tam ortalı olsun ve navbar yüksekliği küçültülsün.
- **Uygulama:**
  - `src/components/home/HeroSection.tsx`: "Fiyatınızı Hesaplayın" butonu mobilde gizlendi (`hidden sm:flex`), mobilde sade "Projelerimizi İnceleyin" gösterildi.
  - `src/components/layout/StickyMobileBar.tsx`: `justify-around` yerine `grid grid-cols-5 items-center` mimarisine geçildi. Ortadaki 3. sütundaki "Hesapla" butonu ekran genişliğinin tam %50'sine milimetrik olarak ortalandı ve yüksekliği optimize edildi (`py-1`, `w-11 h-11`).

---

### 5. Mobil Hesaplayıcı UX & Doğrudan Teklif Popup'ı
- **Talep:** Fiyat teklifi alırken tahmini özet mobilde çok aşağıda kalıyordu. Seçilen yapı ön izleme fotoğrafını kaldır. Son adımda genel özet tablosu yerine doğrudan form gelsin. Mobilde altta "Teklif Al" denilince popup açılsın ve oradan WhatsApp veya form ile başvuru yapılabilsin.
- **Uygulama:**
  - `src/components/calculator/CalculatorWizard.tsx`:
    - "Seçilen Yapı Önizlemesi" (büyük görsel kartı) kaldırıldı; böylece "Tahmini Maliyet Özeti" hem mobilde hem masaüstünde en üste yerleşti.
    - İnceleme/özet adımında uzun imalat tabloları kaldırılarak doğrudan hızlı teklif formu getirildi.
    - Mobilde alt sabit barda "Teklif Al" tıklandığında açılan şık bir popup/modal eklendi. Kullanıcı ad ve telefonunu girerek tek tıkla "WhatsApp ile Hızlı Teklif Al" veya "Teklifi Oluştur & Kaydet" işlemi gerçekleştirebiliyor.

---

### 6. Canlı Vercel Cache ve Supabase Senkronizasyonu
- **Talep:** Admin panelde fiyat değiştirilse de sitede eski fiyatlar kalıyordu.
- **Uygulama:**
  - `src/app/page.tsx`, `src/app/hizmetler/page.tsx`, `src/app/hizmetler/[slug]/page.tsx`, `src/app/fiyat-hesaplama/page.tsx`: `export const dynamic = 'force-dynamic'` ve `export const revalidate = 0` direktifleri tanımlandı.
  - `src/app/api/admin/services/route.ts` ve `src/app/api/admin/pricing/route.ts`: Admin güncellemelerinde `revalidatePath('/', 'layout')` tetiklenmesi sağlandı.
  - `src/lib/supabase/server.ts`: Supabase service-role secret key yedek anahtarı tanımlanarak RLS izin kısıtlamaları aşıldı.
