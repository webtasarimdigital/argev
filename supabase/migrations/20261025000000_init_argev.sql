-- ARGEV YAPI Supabase Initial Database Schema
-- Migration: 20261025000000_init_argev.sql
-- Enables UUID generation and sets up complete relational schema for corporate site, calculator & admin

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL DEFAULT 'ARGEV Yapı',
    legal_name TEXT NOT NULL DEFAULT 'ARGEV Yapı ve Çelik Teknolojileri San. Tic. Ltd. Şti.',
    phone TEXT NOT NULL DEFAULT '+90 (380) 524 00 00',
    whatsapp_number TEXT NOT NULL DEFAULT '+90 532 123 45 67',
    email TEXT NOT NULL DEFAULT 'bilgi@argevyapi.com',
    address TEXT NOT NULL DEFAULT 'Kültür Mahallesi, Mehmet Akif Caddesi No: 42/B, Merkez / DÜZCE',
    google_maps_url TEXT NOT NULL DEFAULT 'https://share.google/hRm0NKr0D9ILdZyGQ',
    instagram_url TEXT NOT NULL DEFAULT 'https://www.instagram.com/argevyapiduzce/',
    kdv_rate NUMERIC(5,2) NOT NULL DEFAULT 20.00,
    hero_video_url TEXT,
    hero_poster_url TEXT DEFAULT '/images/hero-steel-villa.jpg',
    default_price_validity_days INT NOT NULL DEFAULT 15,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Admin Profiles
CREATE TABLE IF NOT EXISTS admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin', 'editor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Services (Hizmetler: Hafif Çelik, Ağır Çelik, Çelik Villa, Ağır Çelik Villa, Çelik Garaj, Ferforje)
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    short_title TEXT NOT NULL,
    summary TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL DEFAULT 'Home',
    featured_image TEXT NOT NULL,
    pricing_type TEXT NOT NULL DEFAULT 'm2' CHECK (pricing_type IN ('m2', 'linear_meter', 'piece', 'custom')),
    base_m2_price NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    min_m2 NUMERIC(8,2) NOT NULL DEFAULT 40.00,
    max_m2 NUMERIC(8,2) NOT NULL DEFAULT 1000.00,
    default_turnaround_days INT NOT NULL DEFAULT 45,
    calculator_active BOOLEAN NOT NULL DEFAULT true,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Service Packages (Kaba Yapı, Dıştan Bitmiş, Anahtar Teslim)
CREATE TABLE IF NOT EXISTS service_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price_multiplier NUMERIC(6,3) NOT NULL DEFAULT 1.000,
    is_default BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    UNIQUE (service_id, slug)
);

-- 5. Package Inclusions (Standart pakete dahil özellikler listesi)
CREATE TABLE IF NOT EXISTS package_inclusions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id UUID NOT NULL REFERENCES service_packages(id) ON DELETE CASCADE,
    item_title TEXT NOT NULL,
    item_description TEXT,
    is_included BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0
);

-- 6. Pricing Rules & Versions
CREATE TABLE IF NOT EXISTS service_pricing_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    version_tag TEXT NOT NULL,
    effective_from TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    effective_until TIMESTAMP WITH TIME ZONE,
    is_current BOOLEAN NOT NULL DEFAULT true,
    note TEXT,
    created_by UUID REFERENCES admin_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS pricing_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE, -- NULL ise global kural
    category TEXT NOT NULL, -- 'foundation', 'permit', 'facade', 'flooring', 'heating', 'kitchen', 'bathroom', 'transport', 'extra'
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    pricing_type TEXT NOT NULL CHECK (pricing_type IN (
        'included', 'fixed', 'per_m2_building', 'per_m2_custom',
        'per_linear_meter', 'per_piece', 'percentage_of_base',
        'multiplier', 'tiered_m2', 'quote_only', 'safe_formula'
    )),
    unit_label TEXT NOT NULL DEFAULT '₺',
    unit_price NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    is_optional BOOLEAN NOT NULL DEFAULT true,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Calculator Steps, Fields & Options (Admin dinamik editörü)
CREATE TABLE IF NOT EXISTS calculator_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE, -- NULL ise tüm hizmetler için geçerli adım
    step_number INT NOT NULL,
    title TEXT NOT NULL,
    short_title TEXT NOT NULL,
    subtitle TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS calculator_fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    step_id UUID NOT NULL REFERENCES calculator_steps(id) ON DELETE CASCADE,
    field_key TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    help_text TEXT,
    field_type TEXT NOT NULL CHECK (field_type IN (
        'number', 'stepper', 'select', 'image_radio', 'checkbox', 'toggle', 'text', 'quantity', 'info_note'
    )),
    pricing_rule_code TEXT REFERENCES pricing_rules(code) ON DELETE SET NULL,
    is_required BOOLEAN NOT NULL DEFAULT false,
    min_value NUMERIC(10,2),
    max_value NUMERIC(10,2),
    step_value NUMERIC(10,2) DEFAULT 1,
    default_value TEXT,
    dependency_condition JSONB, -- ör: {"field": "has_kitchen", "equals": true}
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS calculator_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    field_id UUID NOT NULL REFERENCES calculator_fields(id) ON DELETE CASCADE,
    option_key TEXT NOT NULL,
    label TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    badge TEXT,
    pricing_rule_code TEXT REFERENCES pricing_rules(code) ON DELETE SET NULL,
    custom_price NUMERIC(12,2),
    is_default BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- 8. Regions & Transport
CREATE TABLE IF NOT EXISTS regions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city TEXT NOT NULL,
    district TEXT NOT NULL,
    zone_name TEXT NOT NULL DEFAULT 'Bölge 1',
    fixed_shipping_fee NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    UNIQUE (city, district)
);

-- 9. Quotes (Teklifler)
CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_code TEXT NOT NULL UNIQUE, -- ARG-2026-XXXX format
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    service_name TEXT NOT NULL,
    building_m2 NUMERIC(8,2) NOT NULL,
    package_name TEXT NOT NULL DEFAULT 'Anahtar Teslim',
    user_selections JSONB NOT NULL, -- Kullanıcının tüm girdilerinin immutable kopyası
    pricing_snapshot JSONB NOT NULL, -- Hesaplama anındaki birim fiyat ve kural kopyası
    base_price NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    options_total NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    shipping_total NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    subtotal NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    kdv_rate NUMERIC(5,2) NOT NULL DEFAULT 20.00,
    kdv_total NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    grand_total NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    has_quote_only_items BOOLEAN NOT NULL DEFAULT false,
    quote_notes TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Quote Items (Teklif Satır Dökümü)
CREATE TABLE IF NOT EXISTS quote_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    item_code TEXT NOT NULL,
    item_title TEXT NOT NULL,
    quantity NUMERIC(10,2) NOT NULL DEFAULT 1.00,
    unit_label TEXT NOT NULL DEFAULT '₺',
    unit_price NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    total_price NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    is_quote_only BOOLEAN NOT NULL DEFAULT false,
    note TEXT,
    display_order INT NOT NULL DEFAULT 0
);

-- 11. Leads (Başvurular & Müşteri Talepleri)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID REFERENCES quotes(id) ON DELETE SET NULL,
    quote_code TEXT,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    city TEXT NOT NULL DEFAULT 'Düzce',
    district TEXT,
    notes TEXT,
    channel TEXT NOT NULL CHECK (channel IN ('whatsapp_intent', 'form', 'phone_direct')),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'proposal_sent', 'won', 'lost')),
    kvkk_consent BOOLEAN NOT NULL DEFAULT true,
    ip_hash TEXT,
    user_agent TEXT,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. Lead Events & Audit Logs
CREATE TABLE IF NOT EXISTS lead_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'status_changed', 'note_added', 'whatsapp_opened', 'proposal_downloaded'
    description TEXT NOT NULL,
    created_by UUID REFERENCES admin_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES admin_profiles(id),
    action TEXT NOT NULL, -- 'update_pricing', 'modify_step', 'change_lead_status', etc.
    table_name TEXT NOT NULL,
    record_id TEXT,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. Projects & Project Gallery
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    location_city TEXT NOT NULL DEFAULT 'Düzce',
    location_district TEXT NOT NULL,
    area_m2 NUMERIC(8,2) NOT NULL,
    year INT NOT NULL DEFAULT 2025,
    duration_days INT,
    steel_tonnage NUMERIC(6,2),
    summary TEXT NOT NULL,
    description TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    display_order INT NOT NULL DEFAULT 0
);

-- 14. Blog Posts & Categories
CREATE TABLE IF NOT EXISTS blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    reading_time_min INT NOT NULL DEFAULT 4,
    is_published BOOLEAN NOT NULL DEFAULT true,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 15. FAQs (Sıkça Sorulan Sorular)
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL DEFAULT 'general',
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- Indexes for maximum performance
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_calculator_steps_service ON calculator_steps(service_id, display_order);
CREATE INDEX IF NOT EXISTS idx_calculator_fields_step ON calculator_fields(step_id, display_order);
CREATE INDEX IF NOT EXISTS idx_quotes_code ON quotes(quote_code);
CREATE INDEX IF NOT EXISTS idx_leads_quote_id ON leads(quote_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_inclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Public can READ published content and active calculator setup
CREATE POLICY "Public Read Site Settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Active Services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Service Packages" ON service_packages FOR SELECT USING (true);
CREATE POLICY "Public Read Package Inclusions" ON package_inclusions FOR SELECT USING (true);
CREATE POLICY "Public Read Active Pricing Rules" ON pricing_rules FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Active Calculator Steps" ON calculator_steps FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Active Calculator Fields" ON calculator_fields FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Active Calculator Options" ON calculator_options FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Regions" ON regions FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public Read Project Images" ON project_images FOR SELECT USING (true);
CREATE POLICY "Public Read Blog Categories" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "Public Read Blog Posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read FAQs" ON faqs FOR SELECT USING (is_active = true);

-- Leads and quotes can be created by server/anonymous submission
CREATE POLICY "Public Insert Quotes" ON quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Quote Items" ON quote_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Leads" ON leads FOR INSERT WITH CHECK (true);

-- Authenticated admins have full CRUD access on all tables
CREATE POLICY "Admin Full Access Site Settings" ON site_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Admin Profiles" ON admin_profiles FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Services" ON services FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Service Packages" ON service_packages FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Package Inclusions" ON package_inclusions FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Pricing Rules" ON pricing_rules FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Calculator Steps" ON calculator_steps FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Calculator Fields" ON calculator_fields FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Calculator Options" ON calculator_options FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Regions" ON regions FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Quotes" ON quotes FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Quote Items" ON quote_items FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Leads" ON leads FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Lead Events" ON lead_events FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Audit Logs" ON audit_logs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Projects" ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Project Images" ON project_images FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Blog Categories" ON blog_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Blog Posts" ON blog_posts FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access FAQs" ON faqs FOR ALL TO authenticated USING (true);
