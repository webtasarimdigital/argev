-- ARGEV YAPI Supabase Initial Seed Data
-- Run this script in your Supabase SQL Editor after running the migration.

-- 1. Site Settings
INSERT INTO site_settings (
    company_name,
    legal_name,
    phone,
    whatsapp_number,
    email,
    address,
    google_maps_url,
    instagram_url,
    kdv_rate,
    hero_poster_url,
    default_price_validity_days
) VALUES (
    'ARGEV Yapı',
    'ARGEV Yapı ve Çelik Teknolojileri San. Tic. Ltd. Şti.',
    '+90 (380) 524 00 00',
    '+90 532 123 45 67',
    'bilgi@argevyapi.com',
    'Kültür Mahallesi, Mehmet Akif Caddesi No: 42/B, Merkez / DÜZCE',
    'https://share.google/hRm0NKr0D9ILdZyGQ',
    'https://www.instagram.com/argevyapiduzce/',
    20.00,
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
    15
) ON CONFLICT DO NOTHING;

-- 2. Services
INSERT INTO services (slug, name, short_title, summary, description, icon_name, featured_image, pricing_type, base_m2_price, min_m2, max_m2, default_turnaround_days, calculator_active, is_active, display_order)
VALUES
('hafif-celik-ev', 'Hafif Çelik Ev', 'Hafif Çelik Ev', 'Depreme en dayanıklı, galvanizli çelik profillerle milimetrik hassasiyette üretilen, A+ ısı ve ses yalıtımlı modern müstakil yaşam alanları.', 'ARGEV Yapı hafif çelik sistemleri; bilgisayar kontrollü roll-form makinelerinde soğuk şekillendirilmiş yüksek mukavemetli galvaniz sacdan üretilir. Paslanmaya, neme ve depreme karşı asırlık güvence sağlar.', 'Home', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'm2', 16500.00, 50, 350, 45, true, true, 1),
('agir-celik-ev', 'Ağır Çelik Ev', 'Ağır Çelik Ev', 'Geniş açıklıklı, yüksek tavanlı ve endüstriyel mukavemete sahip IPE/HEA haddelenmiş çelik profillerle inşa edilen lüks rezidans güvenliği.', 'Ağır çelik evler; kolon ve kirişlerde sıcak haddelenmiş yapısal çelik (HEA, HEB, IPE) profiller kullanılarak imal edilir. Geniş açıklıkların kolonsuz geçilmesini mümkün kılar.', 'Building', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', 'm2', 22000.00, 80, 500, 60, true, true, 2),
('celik-villa', 'Çelik Villa', 'Çelik Villa', 'Estetik mimari çizgiler, geniş balkon ve verandalar, panoramik cam cepheler ve yüksek tavanlı ferah villa yaşamı.', 'Düzce, Akçakoca, Bolu Abant ve Sapanca gibi doğa ile iç içe coğrafyalarda lüks müstakil yaşam hayalini gerçekleştiren ARGEV Çelik Villaları; mimari tasarım özgürlüğü ile statik gücü harmanlar.', 'Castle', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', 'm2', 19500.00, 120, 600, 75, true, true, 3),
('agir-celik-villa', 'Ağır Çelik Villa', 'Ağır Çelik Villa', 'Ultra lüks, sınır tanımayan mimari açıklıklar, konsol çıkmalar ve nesiller boyu dimdik ayakta kalacak mühendislik başyapıtı.', 'En zorlu zemin koşullarında ve geniş arsa parsellerinde tasarlanan ARGEV Ağır Çelik Villaları; endüstriyel yapı güvenliğini ultra lüks rezidans konforuyla buluşturur.', 'ShieldCheck', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', 'm2', 27500.00, 150, 1000, 90, true, true, 4),
('celik-garaj', 'Çelik Garaj & Sundurma', 'Çelik Garaj', 'Müstakil konut ve ticari alanlar için kar ve rüzgar yüküne dayanıklı, otomatik kapı uyumlu modern çelik otopark yapıları.', 'Hafif ve ağır çelik profil kombinasyonuyla üretilen ARGEV çelik garajları; 1 araçlıktan filo kapasitesine kadar serbest ölçülerde imal edilir.', 'Warehouse', 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80', 'm2', 9500.00, 20, 200, 20, true, true, 5),
('ferforje', 'Ferforje & Özel Çelik İmalat', 'Ferforje', 'Usta ellerden çıkan sanatsal ferforje bahçe kapıları, villa girişleri, balkon ve merdiven korkulukları.', 'ARGEV Yapı atölyelerinde sıcak dövme demir ve elektrostatik toz fırın boya ile üretilen ferforje imalatlarımız yapılara asil bir kimlik kazandırır.', 'Wrench', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', 'linear_meter', 3800.00, 5, 250, 15, true, true, 6)
ON CONFLICT (slug) DO NOTHING;

-- 3. Pricing Rules
INSERT INTO pricing_rules (category, code, title, description, pricing_type, unit_label, unit_price, is_optional, is_active, display_order)
VALUES
('foundation', 'foundation_subasman', 'Betonarme Subasman & Temel', 'Zemin etüdüne göre grobeton, radye temel ve demirli subasman betonu.', 'quote_only', 'Keşif', 0.00, true, true, 1),
('permit', 'permit_and_projects', 'Ruhsat ve Mimari Proje Takibi', 'Mimari, statik, mekanik ve elektrik projeleri çizimi ve belediye dosya takibi.', 'fixed', '₺/Dosya', 85000.00, true, true, 2),
('facade', 'facade_fibercement', 'Fibercement Taş / Ahşap Desen Kaplama', 'A1 sınıfı yanmaz, suya ve neme tam dayanıklı estetik cephe panelleri.', 'per_m2_custom', '₺/m²', 950.00, true, true, 3),
('facade', 'facade_composite', 'Alüminyum Kompozit & Antrasit Mimari Cephe', 'Modern villa mimarisine uygun yüksek prestijli kompozit panel kaplama.', 'per_m2_custom', '₺/m²', 1650.00, true, true, 4),
('flooring', 'flooring_parquet', '32. Sınıf Derzli Laminat Parke', 'Çizilmeye dirençli, süpürgelikleri ve şiltesi dahil zemin kaplama.', 'per_m2_custom', '₺/m²', 650.00, true, true, 5),
('flooring', 'flooring_ceramic', '60x120 1. Sınıf Porselen / Granit Seramik', 'Kaymaz, aşınmaz, kalibre granit zemin kaplama ve derz uygulaması.', 'per_m2_custom', '₺/m²', 900.00, true, true, 6),
('heating', 'heating_sulu', 'Sulu Borulu Yerden Isıtma Sistemi', 'Oksijen bariyerli PEX borular, modülasyon paneli ve kollektör kutusu.', 'per_m2_custom', '₺/m²', 950.00, true, true, 7),
('heating', 'heating_elektrikli', 'Karbon Film / Kablolu Elektrikli Yerden Isıtma', 'Dijital termostat kontrollü hızlı tepki veren ısıtıcı şilte sistemi.', 'per_m2_custom', '₺/m²', 1250.00, true, true, 8),
('kitchen', 'kitchen_lower_cabinet', 'Mutfak Alt Dolabı', 'Gövde MDF-lam, kapaklar membran/lake, frenli çekmece rayları.', 'per_linear_meter', '₺/mtül', 7500.00, true, true, 9),
('kitchen', 'kitchen_upper_cabinet', 'Mutfak Üst Dolabı', 'Amortisörlü kapaklı, tavan hizalı ergonomik mutfak üst saklama dolapları.', 'per_linear_meter', '₺/mtül', 6500.00, true, true, 10),
('kitchen', 'kitchen_countertop', 'Çimstone / Porselen Mutfak Tezgâhı', 'Leke tutmaz, ısıya ve çizilmeye dayanıklı 1. sınıf kuvars/porselen tezgâh.', 'per_linear_meter', '₺/mtül', 4500.00, true, true, 11),
('bathroom', 'extra_wc', 'Ekstra Misafir Tuvaleti / WC', 'Gömme rezervuarlı asma klozet, küçük lavabo dolabı, batarya ve ayna seti.', 'per_piece', '₺/adet', 18000.00, true, true, 12),
('bathroom', 'extra_bathroom', 'Ekstra Tam Donanımlı Banyo', 'Temperli cam duşakabin, banyo dolabı, armatürler, klozet ve boy seramik.', 'per_piece', '₺/adet', 35000.00, true, true, 13),
('extra', 'extra_veranda', 'Çelik Konstrüksiyon Veranda & Teras', 'Statik hesaplı çelik kolonlar, ahşap/kompozit deck zemin ve üst sundurma.', 'per_m2_custom', '₺/m²', 4800.00, true, true, 14),
('extra', 'extra_railing', 'Ferforje & Çelik Güvenlik Korkuluğu', 'Statik fırın boyalı özel motifli ferforje balkon ve merdiven korkuluğu.', 'per_linear_meter', '₺/mtül', 2800.00, true, true, 15)
ON CONFLICT (code) DO NOTHING;

-- 4. Regions & Transport
INSERT INTO regions (city, district, zone_name, fixed_shipping_fee)
VALUES
('Düzce', 'Merkez', 'Fabrika Bölgesi', 0.00),
('Düzce', 'Akçakoca', 'Düzce İlçeler', 15000.00),
('Düzce', 'Gölyaka', 'Düzce İlçeler', 15000.00),
('Düzce', 'Çilimli', 'Düzce İlçeler', 15000.00),
('Düzce', 'Gümüşova', 'Düzce İlçeler', 15000.00),
('Düzce', 'Kaynaşlı', 'Düzce İlçeler', 15000.00),
('Düzce', 'Yığılca', 'Düzce İlçeler', 15000.00),
('Bolu', 'Merkez', 'Bölge 2', 28000.00),
('Sakarya', 'Adapazarı', 'Bölge 2', 28000.00),
('Zonguldak', 'Ereğli', 'Bölge 3', 42000.00),
('Kocaeli', 'Kartepe', 'Bölge 3', 42000.00)
ON CONFLICT (city, district) DO NOTHING;
