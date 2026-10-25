# ARGEV YAPI — ANTIGRAVITY UYGULAMA TALİMATI

## Projenin hedefi
Düzce ve Batı Karadeniz'de hafif çelik ev, ağır çelik ev, çelik villa, ağır çelik villa, çelik garaj ve ferforje hizmetleri sunan ARGEV Yapı için **gerçek bir mimarlık/inşaat firmasına yakışan, özgün, responsive kurumsal site** ile **Supabase tabanlı, tüm fiyatları ve adımları admin panelinden yönetilebilen detaylı teklif hesaplayıcı** oluştur. Sadece tasarım veya plan sunma: çalışan frontend, backend, SQL migration, yönetim paneli ve testler üret.

Instagram: https://www.instagram.com/argevyapiduzce/
Google Haritalar: https://share.google/hRm0NKr0D9ILdZyGQ
Örnek hesaplayıcı: https://kolayhesap.app/c/avlu-collections-prefabrik

Örnek sitenin çok adımlı mantığını ve fonksiyonel yaklaşımını incele, ancak kodunu/tasarımını/metinlerini/görsellerini izinsiz birebir kopyalama. ARGEV'e ait gerçek proje görselleri admin panelinden yüklenecek; o zamana kadar lisanslı gerçekçi mimari fotoğraflar veya boş yer tutucu kullan. **Ahşap ev/bungalov ARGEV'de yok, ekleme.**

## Tasarım dili
Öncelik: AI tarafından üretilmiş gibi görünen jenerik SaaS teması değil; lüks, mimari dergi kalitesinde gerçekçi site. Lacivert `#15283A`, koyu lacivert `#0D1A28`, kahve `#866B55`, sıcak kırık beyaz `#F3EFE8`; zarif çizgiler, gerçek fotoğraflar, kaliteli tipografi, yeterli beyaz alan, üst düzey mobil deneyim. Video hero (admin yüklemesi, mobil poster, ses kapalı playsInline, performans ve erişilebilirlik), sticky nav, sayfa kaydıkça ince reveal animasyonları, hover geçişleri, reduced motion uyumu. Sahte referans, uydurma müşteri sayısı, sahte yorum yok.

**Navbar:** Ana Sayfa | Fiyat Hesaplama | Hizmetler | Projeler | Hakkımızda | Blog | İletişim + Teklif Hesapla CTA. Mobil hamburger menü.

**Ana sayfa:** büyük video hero + iki CTA, hizmetler, neden ARGEV, proje portföyü, 3 aşamalı çalışma süreci, hesaplayıcı CTA, üretim/teknik bilgiler, hizmet bölgeleri, SSS, iletişim ve çok sütunlu footer.

**Sayfalar:** `/`, `/fiyat-hesaplama`, `/fiyat-hesaplama/[slug]`, `/hizmetler`, `/hizmetler/[slug]`, `/projeler`, `/projeler/[slug]`, `/hakkimizda`, `/blog`, `/blog/[slug]`, `/iletisim`, KVKK/gizlilik/çerez sayfaları, 404, `/admin`.

## Hesaplayıcı — temel kural
**TÜM ADIMLAR, SORULAR, SEÇENEKLER, GÖRSELLER, KURALLAR, BİRİM FİYATLAR VE PAKETE DAHİL OLANLAR HİZMET BAZINDA ADMIN PANELİNDEN DÜZENLENEBİLİR OLMALI.** Frontend seçeneklerini hardcode etme. Admin bir hizmete yeni soru ve seçenek ekleyebilsin, silebilsin, sıralayabilsin, gizleyebilsin, fiyatını değiştirebilsin; diğer hizmetleri etkilemesin. Admin seçtiği soruyu zorunlu/opsiyonel yapabilsin; koşullu gösterebilsin. Fiyat girilmemişse gerçekmiş gibi sayı uydurma; 'Teklif isteyin / keşif gerektirir' göster.

### Önerilen wizard adımları (hizmete göre değişebilir)

**0. Hizmet seçimi:** Hafif Çelik Ev, Ağır Çelik Ev, Çelik Villa, Ağır Çelik Villa, Çelik Garaj, Ferforje. Her hizmet için fotoğraflı kart ve ayrı fiyat kuralı. Ferforje gibi hizmetlerde metretül/adet veya özel fiyatlandırma desteklenmeli.

**1. Proje bilgileri:** Kullanıcı **serbest m² girişi** yapar (ör. 80, 105, 157,5), admin min/max ve birim m² fiyatını belirler. İl, ilçe, kat sayısı (tek/iki vb.), oda sayısı (1+1 ... 6+1), tavan yüksekliği (2,50 / 2,80 / 3,00 vb.), varsa arsa/imar durumu. Lokasyon nakliye tarifesi admin tarafından ayarlanabilir. Toplam yapı alanı / taban oturum alanı açıkça ayrıştırılsın.

**2. Yapı türü ve paket:** Kaba yapı / dıştan bitmiş / anahtar teslim; hafif/ağır çelik yapı, çatı, yalıtım türü, izolasyon ve varsa paneller. Her paket için hangi kalemlerin standart dahil olduğu ayrı yönetilir.

**3. Temel ve resmi işlemler:** **Temel yapımı**, zemin etüdü, mimari proje, statik proje, elektrik/mekanik proje, **ruhsat başvuru/takip**, **iskân süreci**, aplikasyon, montaj, nakliye; her biri ayrı yok/var/dahil/keşif gerektirir ve sabit/m²/adet/özel fiyat olabilir. Belediye harçları ve izinlerin sonuçlanacağı garantisi uydurulmasın. Zemin koşullarına bağlı temel fiyatı açıkça ön tahmin olarak gösterilsin.

**4. Dış cephe:** **Dış cephe kaplama** yok/standart panel/fibercement/kompozit/dekoratif vb.; cephe alanını ayrıca m² olarak girebilsin veya tahmini katsayı yönetilsin. Cephe m² yapı m²'ye otomatik eşit varsayılmasın. Dış cephe rengi, mantolama, çatı kaplaması, kapılar, pencere türü/adet/ölçüsü, garaj kapısı gibi opsiyonlar.

**5. İç mekan, zemin, ısıtma:** **Seramik veya parke** (seramik, porselen, standart laminat, premium laminat vs.) ve kaplanacak zemin m²; farklı odalara farklı malzeme tercihi desteklenebilir, aynı m² iki defa fiyatlandırılmaz. Boya, iç kapı/adet, tavan, süpürgelik. **Yerden ısıtma** yok/sulu/elektrikli ve ısıtılacak m² + opsiyonel sabit bağlantı bedeli; yerden ısıtma yapı m²'sinden farklı alan olabilmeli.

**6. Mutfak:** **Mutfak dolabı** yok/standart/MDF/lake/özel; **alt dolap ve üst dolap ayrı**, metre-tül (mtül) olarak miktar girişi, opsiyonel hazır 80/100/120/160 cm ölçü kartları. Mutfak tezgâhı türü ve mtül, evye, armatür, mutfak adası gibi ek seçenekler. Dolap 'yok' seçilirse bağlı fiyatlar otomatik sıfırlanır. Paket dahil dolap yeniden ücretlendirilmez.

**7. Tuvalet ve banyo:** Pakete dahil **standart WC ve banyo adetleri**, **ekstra tuvalet (WC) adedi**, **ekstra banyo adedi** birbirinden ayrı; adet başına admin fiyatları. Kalite paketi, duşakabin, seramik, klozet, lavabo, batarya, banyo dolabı vb. Alt parçalar banyo paketine dahilse ikinci kez ücretlendirilmesin.

**8. Diğer ekstralar:** Veranda/teras m², merdiven, korkuluk mtül, çelik garaj m² veya adet, ferforje kapı/korkuluk mtül veya adet, ek yalıtım ve admince yeni seçenekler. Her hizmette yalnız mantıklı seçenekler görünsün.

**9. Fiyat özeti ve teklif:** Sağda/sticky mobil altta **anlık fiyat özeti**; yapı m², ana yapı bedeli, paket, ekler, adet/m²/mtül, birim tutar, indirim/vergi, nakliye ve kapsam dökümü. Finalde okunaklı tahmini toplam ve 'Keşif ve teknik projeye göre değişebilir' uyarısı. Fiyatı bilinmeyen opsiyon varsa kısmi fiyat olduğunu belirt veya fiyatı gizleyip 'Özel teklif isteyin' göster. Kullanıcı geriye dönüp seçenekleri değiştirebilsin; ilerleme göstergesi ve form validasyonu olsun.

### Referans siteden doğrulanabilen bilgiler
- Prefabrik ev başlangıç ekranı **6 adımlı**: m², şehir, tavan yüksekliği, kat ve oda sayısı.
- Çelik ev başlangıç ekranı **5 adımlı**: m², şehir, kat, oda ve 2,80/3,00 m tavan yüksekliği.
- Konteyner başlangıç ekranı **3 adımlı**: m², şehir, kat/oda, panel/yalıtım, WC/banyo var-yok, alt dolap ölçüsü, üst dolap, pencere adetleri ve zemin.
- Tiny House başlangıç ekranı **4 adımlı**: uzunluk, loft, dış/iç cephe.
- Referansın sonraki dinamik adımlarının tüm içerikleri otomatik erişimde doğrulanamadı. 'Birebir incelendi' iddiası üretme. Yukarıdaki ARGEV akışı müşterinin talep ettiği **genişletilmiş kapsamdır**.

## Admin paneli — kapsamlı olmak zorunda
`/admin/login`: yalnız Supabase Auth ile yetkili admin. Ana panelde aşağıdaki menüler:

1. **Dashboard:** gelen başvurular, son teklif hesaplamaları, form vs. WhatsApp niyetleri, son 7/30 gün, hizmet bazında talepler.
2. **Hizmet Yönetimi:** hizmet ekle/sil/gizle, SEO ve fotoğraf düzenle, baz m² veya mtül/adet fiyatı, m² bantları, hesaplayıcı aç/kapat, paket dahil özellikler.
3. **Hesaplama Adımları Editörü:** hizmet seç → adım ekle/sırala/sil → soru ekle → alan tipi (`number`, `stepper`, `select`, `image_radio`, `checkbox`, `toggle`, `text`, `quantity`, `info_note`) → seçenekler → koşul → fiyat tipi/fiyat → önizleme → taslak/yayınla. Her hizmete özgü düzenleme.
4. **Parametrik Fiyatlar:** her hizmette ayrı tabloda **m² baz fiyat, kat/tavan farkı, temel, ruhsat, proje, iskân, dış cephe kaplama, seramik, parke, yerden ısıtma, mutfak dolabı alt/üst, tezgâh, ekstra tuvalet, ekstra banyo** fiyatları. Her satırda 'aktif', 'dahil', 'birim', 'fiyatlama metodu', 'birim ücret', 'görünürlük'.
5. **Teklifler ve Başvurular:** kişi adı/telefon/e-posta, proje yeri, seçilen hizmet, **TÜM seçeneklerin fiyat kırılımı**, veritabanındaki hesap tarihi tarifesinin snapshot'ı, toplam, WhatsApp/form kanalı, not, durum (Yeni/Görüşüldü/Teklif Verildi/Kazanıldı/Kaybedildi), arama/filtre/CSV.
6. **İçerik yönetimi:** proje galerileri, blog, hizmet sayfaları, SSS, hakkımızda, hero video, medya yüklemeleri, footer/menü, SEO alanları.
7. **Site ayarları:** logo, telefon, WhatsApp numarası, adres, e-posta, sosyal bağlantılar, harita, KDV ayarı, taşıma bölgeleri.
8. **Güvenlik ve denetim:** fiyat değişikliklerini kim-ne zaman-eski/yeni olarak kaydet, rol ve erişim politikaları.

### Fiyat tipi seçimi (her opsiyon için)
- `included`: pakete dahil, ek ücret 0
- `fixed`: sabit TL
- `per_m2_building`: yapı m² × TL/m²
- `per_m2_custom`: ilgili özel yüzey m² × TL/m² (ısıtma, cephe, parke, seramik)
- `per_linear_meter`: mtül × TL/mtül (mutfak dolabı, korkuluk)
- `per_piece`: adet × TL/adet (WC, banyo, pencere)
- `percentage_of_base`: baz bedelin yüzdesi
- `multiplier`: uygulanacak fiyat katsayısı, hangi kaleme uygulanacağı belirtilir
- `tiered_m2`: m² aralığına bağlı fiyat (kademeli mi tüm alan için mi olduğunu admin belirler)
- `quote_only`: keşif gerektirir, fiyat verilmez
- `safe_formula`: whitelist aritmetik yapılandırma; asla kullanıcıya/admin'e eval veya serbest JS çalıştırma izni verme.

**Önemli bağımlılıklar:** mutfak yoksa dolap fiyatları yok; üst dolap alt dolaptan ayrı; parke/seramik aynı alanın birbiriyle çakışan seçenekleri; standart pakete dahil banyo/WC düşülerek sadece ekstra adetler fiyatlanır; ferforje hizmetinde m² yerine mtül/adet seçilebilir; admin her seçeneği belirli hizmetlere atayabilir.

## Fiyat motoru
Tamamen server-side hesapla, istemciden gelen fiyat/toplama güvenme. Kesin para hesaplaması için decimal veya tam kuruş tutarı kullan; float kullanma. Genel yapı:

```
baz_yapi = toplam_yapi_m2 × hizmete_ozel_m2_birim_fiyati + varsa_sabit_baslangic
opsiyonlar = Σ (adet × adet_fiyati + ozel_m2 × m2_fiyati + mtul × mtul_fiyati + sabitler)
ara_toplam = baz_yapi + opsiyonlar + uyarlanan_bolge_nakliye + diger_ucretler - indirim
vergiler = fiyatlara_dahil_veya_haric_olma_durumuna_gore_ayri_hesapla
toplam = ara_toplam + haric_vergiler
```

Fiyat versiyonları olmalı; adminin yeni tarifesi yalnız yeni teklifleri etkilesin, geçmiş teklifler kendi birim fiyat ve toplam snapshot'larını korusun. Bir kalem `quote_only` ise **kesin toplam** gösterme. Her teklif için benzersiz teklif kodu üret.

## Teklif toplama: iki kanal, ikisi de admin paneline

**A. WhatsApp ile gönder:** Kullanıcı ad, telefon, proje lokasyonu ve gerekiyorsa notunu girer; server tarafında fiyat yeniden hesaplanır ve `quotes + quote_items + leads` olarak **önce kaydedilir**; ardından adminin belirlediği WhatsApp numarasına önceden doldurulmuş teklif kodu + hizmet + m² + kısa özet + tahmini toplam ile `wa.me` açılır. **WhatsApp'ı açmak mesaj gönderildi demek değildir**; durum `whatsapp_intent` olarak kayıt altına alınır.

**B. Form ile gönder:** Aynı hesaplama ve kayıt süreci; başarı ekranı ve teklif numarası. Form: ad-soyad, telefon, e-posta (isteğe bağlı), il/ilçe, not, KVKK bilgilendirme ve gerekiyorsa ayrı rıza. Spam/honeypot/rate-limit, server validation, log ve hata yönetimi.

## Supabase veri şeması (migration + RLS yaz)
- `admin_profiles`, `site_settings`
- `services`, `service_packages`, `package_inclusions`
- `service_pricing_versions`, `pricing_tiers`, `pricing_rules`
- `calculator_steps`, `calculator_fields`, `calculator_options` (koşullar, birimler, görseller, sıralama, zorunluluk, fiyat modelleri)
- `regions`, `transport_pricing`
- `quotes` (public opaque UUID + teklif kodu, hizmet/fiyat sürümü, seçimler snapshot, ara toplam/vergi/toplam, eksik fiyat bayrağı)
- `quote_items` (tüm satır kırılımları, miktar, birim, tarihsel fiyat)
- `leads` (müşteri, kanal, not, durum, rıza), `lead_events`, `audit_logs`
- `projects`, `project_images`, `blog_posts`, `blog_categories`, `faqs`, `content_pages`, `media_assets`

Bütün tablolarda FK/index/check constraint, SQL migrations. **RLS:** ziyaretçi yalnız yayınlanan site içeriğini ve gereken açık fiyat ayarlarını okuyabilir; kişi bilgisi, teklifler ve admin loglarını göremez. Anonymous formu yalnız güvenli server action/endpoint üzerinden oluşturur. Service role key frontend'e çıkmaz. Supabase Auth admin için zorunlu.

## Teknoloji
Next.js App Router, TypeScript, Tailwind, shadcn/ui, Framer Motion, React Hook Form, Zod, Supabase Auth/Postgres/Storage. Responsive, accessibility, reduced motion, hızlı yüklenen video/resimler. `.env.example`, README, veritabanı migrationları, seed içerikler, örnek admin kullanım yönergesi. SEO: sitemap, robots, canonical, Open Graph, JSON-LD, Düzce Çelik Ev / Düzce Hafif Çelik Ev / Düzce Ağır Çelik Ev / Düzce Çelik Villa için doğal özgün içerik, ilgili iç linkler; NAP bilgileri doğrulanmadan uydurma.

## Başarı testleri (mutlaka uygula)
1. Admin her hizmet için ayrı m² fiyatı girer; kullanıcı girdiği serbest m² üzerinden hesap görür.
2. Admin yerden ısıtmayı m² üzerinden, mutfak alt ve üst dolaplarını mtül üzerinden fiyatlar.
3. 80 m² yapıda 50 m² yerden ısıtma seçilirse **yalnız 50 m²** ücretlendirilir.
4. Admin 1 ve 2 ekstra WC/banyo için ayrı adet hesabının doğru çalıştığını görür.
5. Seramik ve parke aynı yüzeye yanlışlıkla iki kez eklenemez.
6. Mutfak 'yok' yapılınca mutfak alt/üst dolapları sıfırlanır.
7. Admin ağır çelik evde bir opsiyonu aktif, çelik garajda pasif yapabilir.
8. Temel/ruhsat/iskân bilinmeyen fiyat olduğunda yanlış kesin fiyat görünmez.
9. WhatsApp ve form CTA'larının ikisi de **başvuru kaydı oluşturur**; WhatsApp niyeti gönderilmiş mesaj olarak sunulmaz.
10. Admin başvuruda tüm fiyat kalemlerini ve müşteri seçimini görür. Sonradan fiyat değişmesi geçmiş teklif toplamını değiştirmez.
11. Gerçek ARGEV fiyatları verilmeden üretim sitesinde **uydurma fiyat yayınlanmaz**.
12. Mobil ve masaüstü sorunsuz görünür; navbar, video hero, scroll animasyonları, hizmetler, blog, projeler, SSS ve footer tamamlanır.

## Antigravity'e uygulanacak sıralama
1) Proje iskeleti ve yüksek kaliteli kurumsal tasarım; 2) Supabase şeması/Auth/RLS; 3) fiyat motoru + testler; 4) dinamik hesaplayıcı; 5) admin adım editörü ve fiyat yönetimi; 6) teklif kayıt/WhatsApp/form; 7) içerik yönetimi, SEO, responsive son kontrol. Önce gerçek çalışan ürünü üret, ardından polish yap. Kayıp şirket bilgisi ve fiyatları admin panelindeki boş doldurulabilir alanlara bırak; eksik bilgiler için geliştirmeyi durdurma.
