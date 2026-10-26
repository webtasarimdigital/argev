import {
  CalculatorStep,
  PricingRule,
  QuoteCalculationResult,
  Service,
} from '@/types/calculator';
import { BlogPost, FAQItem, Project, SiteSettings } from '@/types/content';
import { Lead, LeadChannel, LeadStatus } from '@/types/lead';
import {
  INITIAL_BLOG_POSTS,
  INITIAL_CALCULATOR_STEPS,
  INITIAL_FAQS,
  INITIAL_PRICING_RULES,
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_SITE_SETTINGS,
} from './seed-data';
import { createAdminClient } from './supabase/server';

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  oldValue?: any;
  newValue?: any;
  timestamp: string;
}

// Global persistent state cache in memory
declare global {
  // eslint-disable-next-line no-var
  var __argev_store: {
    services: Service[];
    pricingRules: PricingRule[];
    calculatorSteps: CalculatorStep[];
    projects: Project[];
    blogPosts: BlogPost[];
    faqs: FAQItem[];
    siteSettings: SiteSettings;
    leads: Lead[];
    quotes: QuoteCalculationResult[];
    auditLogs: AuditLog[];
  } | undefined;
}

function getMemoryStore() {
  if (!global.__argev_store) {
    global.__argev_store = {
      services: JSON.parse(JSON.stringify(INITIAL_SERVICES)),
      pricingRules: JSON.parse(JSON.stringify(INITIAL_PRICING_RULES)),
      calculatorSteps: JSON.parse(JSON.stringify(INITIAL_CALCULATOR_STEPS)),
      projects: JSON.parse(JSON.stringify(INITIAL_PROJECTS)),
      blogPosts: JSON.parse(JSON.stringify(INITIAL_BLOG_POSTS)),
      faqs: JSON.parse(JSON.stringify(INITIAL_FAQS)),
      siteSettings: JSON.parse(JSON.stringify(INITIAL_SITE_SETTINGS)),
      leads: [
        {
          id: 'lead-demo-1',
          quoteCode: 'ARG-2026-AK78B',
          fullName: 'Ahmet Yılmaz',
          phone: '+90 533 456 78 90',
          email: 'ahmet.yilmaz@gmail.com',
          city: 'Düzce',
          district: 'Akçakoca',
          channel: 'whatsapp_intent',
          status: 'proposal_sent',
          kvkkConsent: true,
          adminNotes: 'Akçakoca 150 m² çelik villa için arsa tapusu gönderildi, keşif randevusu planlandı.',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 'lead-demo-2',
          quoteCode: 'ARG-2026-MR54X',
          fullName: 'Merve Demir',
          phone: '+90 542 321 00 11',
          email: 'merve.demir@hotmail.com',
          city: 'Bolu',
          district: 'Merkez',
          channel: 'form',
          status: 'contacted',
          kvkkConsent: true,
          adminNotes: 'Bolu 100 m² hafif çelik ev talebi. Zemin betonu hazır durumda.',
          createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        },
      ],
      quotes: [],
      auditLogs: [
        {
          id: 'log-1',
          actor: 'Sistem',
          action: 'Sistem Başlatma',
          target: 'Veri Tabanı & Şema',
          timestamp: new Date().toISOString(),
        },
      ],
    };
  }
  return global.__argev_store;
}

function mapServiceRow(row: any, fallback?: Service): Service {
  return {
    id: row.id || fallback?.id || '',
    slug: row.slug || fallback?.slug || '',
    name: row.name || fallback?.name || '',
    shortTitle: row.short_title || row.shortTitle || fallback?.shortTitle || row.name || '',
    summary: row.summary || fallback?.summary || '',
    description: row.description || fallback?.description || '',
    iconName: row.icon_name || row.iconName || fallback?.iconName || 'Home',
    pricingType: row.pricing_type || row.pricingType || fallback?.pricingType || 'm2',
    featuredImage: (fallback?.featuredImage && fallback.featuredImage.startsWith('/'))
      ? fallback.featuredImage
      : (row.featured_image || row.featuredImage || fallback?.featuredImage || ''),
    baseM2Price: Number(row.base_m2_price ?? row.baseM2Price ?? fallback?.baseM2Price ?? 0),
    minM2: Number(row.min_m2 ?? row.minM2 ?? fallback?.minM2 ?? 40),
    maxM2: Number(row.max_m2 ?? row.maxM2 ?? fallback?.maxM2 ?? 500),
    defaultTurnaroundDays: Number(row.default_turnaround_days ?? row.defaultTurnaroundDays ?? fallback?.defaultTurnaroundDays ?? 45),
    calculatorActive: row.calculator_active ?? row.calculatorActive ?? fallback?.calculatorActive ?? true,
    isActive: row.is_active ?? row.isActive ?? fallback?.isActive ?? true,
    displayOrder: Number(row.display_order ?? row.displayOrder ?? fallback?.displayOrder ?? 0),
    packages: fallback?.packages || [],
  };
}

function mapPricingRuleRow(row: any, fallback?: PricingRule): PricingRule {
  return {
    id: row.id || fallback?.id || '',
    serviceId: row.service_id || row.serviceId || fallback?.serviceId,
    category: row.category || fallback?.category || '',
    code: row.code || fallback?.code || '',
    title: row.title || fallback?.title || '',
    description: row.description || fallback?.description || '',
    pricingType: row.pricing_type || row.pricingType || fallback?.pricingType || 'fixed',
    unitLabel: row.unit_label || row.unitLabel || fallback?.unitLabel || '₺',
    unitPrice: Number(row.unit_price ?? row.unitPrice ?? fallback?.unitPrice ?? 0),
    isOptional: row.is_optional ?? row.isOptional ?? fallback?.isOptional ?? true,
    isActive: row.is_active ?? row.isActive ?? fallback?.isActive ?? true,
    displayOrder: Number(row.display_order ?? row.displayOrder ?? fallback?.displayOrder ?? 0),
  };
}

function mapSettingsRow(row: any, fallback: SiteSettings): SiteSettings {
  return {
    companyName: row.company_name || row.companyName || fallback.companyName,
    legalName: row.legal_name || row.legalName || fallback.legalName,
    phone: row.phone || fallback.phone,
    whatsappNumber: row.whatsapp_number || row.whatsappNumber || fallback.whatsappNumber,
    email: row.email || fallback.email,
    address: row.address || fallback.address,
    googleMapsUrl: row.google_maps_url || row.googleMapsUrl || fallback.googleMapsUrl,
    instagramUrl: row.instagram_url || row.instagramUrl || fallback.instagramUrl,
    kdvRate: Number(row.kdv_rate ?? row.kdvRate ?? fallback.kdvRate ?? 20),
    heroPosterUrl: row.hero_poster_url || row.heroPosterUrl || fallback.heroPosterUrl,
    heroVideoUrl: row.hero_video_url || row.heroVideoUrl || fallback.heroVideoUrl,
    defaultPriceValidityDays: Number(row.default_price_validity_days ?? row.defaultPriceValidityDays ?? fallback.defaultPriceValidityDays ?? 15),
  };
}

function mapLeadRow(row: any, quote?: QuoteCalculationResult): Lead {
  return {
    id: row.id,
    quoteId: row.quote_id || row.quote_code,
    quoteCode: row.quote_code,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email || undefined,
    city: row.city,
    district: row.district || undefined,
    notes: row.notes || undefined,
    channel: row.channel,
    status: row.status,
    adminNotes: row.admin_notes || undefined,
    kvkkConsent: row.kvkk_consent ?? true,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    quoteSnapshot: quote || (row.quote_snapshot ? (row.quote_snapshot as QuoteCalculationResult) : undefined),
  };
}

export const DataStore = {
  // Services
  async getServices(): Promise<Service[]> {
    const memory = getMemoryStore().services;
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('services').select('*').order('display_order');
        if (!error && data && data.length > 0) {
          return data.map((row) => {
            const fb = memory.find((m) => m.slug === row.slug);
            return mapServiceRow(row, fb);
          });
        }
      } catch (err) {
        console.warn('Supabase fetch services failed, falling back to local store:', err);
      }
    }
    return memory;
  },

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const services = await this.getServices();
    return services.find((s) => s.slug === slug);
  },

  async updateService(updated: Service): Promise<void> {
    const store = getMemoryStore();
    const idx = store.services.findIndex((s) => s.id === updated.id || s.slug === updated.slug);
    if (idx !== -1) {
      const old = store.services[idx];
      store.services[idx] = updated;
      store.auditLogs.unshift({
        id: `log-${Date.now()}`,
        actor: 'Admin',
        action: 'Hizmet Güncelleme',
        target: updated.name,
        oldValue: old,
        newValue: updated,
        timestamp: new Date().toISOString(),
      });
    }

    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase
          .from('services')
          .update({
            base_m2_price: updated.baseM2Price,
            name: updated.name,
            short_title: updated.shortTitle,
            summary: updated.summary,
            description: updated.description,
            min_m2: updated.minM2,
            max_m2: updated.maxM2,
            default_turnaround_days: updated.defaultTurnaroundDays,
            is_active: updated.isActive,
            calculator_active: updated.calculatorActive,
            display_order: updated.displayOrder,
            updated_at: new Date().toISOString(),
          })
          .eq('slug', updated.slug);
      } catch (err) {
        console.error('Supabase updateService error:', err);
      }
    }
  },

  // Pricing Rules
  async getPricingRules(): Promise<PricingRule[]> {
    const memory = getMemoryStore().pricingRules;
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('pricing_rules').select('*').order('display_order');
        if (!error && data && data.length > 0) {
          const dbRules = data.map((row) => {
            const fb = memory.find((m) => m.code === row.code || m.id === row.id);
            return mapPricingRuleRow(row, fb);
          });
          const dbCodes = new Set(dbRules.map((r) => r.code));
          const extraMemoryRules = memory.filter((m) => !dbCodes.has(m.code));
          return [...dbRules, ...extraMemoryRules];
        }
      } catch (err) {
        console.warn('Supabase fetch pricing rules failed, falling back to local store:', err);
      }
    }
    return memory;
  },

  async updatePricingRule(updated: PricingRule): Promise<void> {
    const store = getMemoryStore();
    const idx = store.pricingRules.findIndex((r) => r.id === updated.id || r.code === updated.code);
    if (idx !== -1) {
      const old = store.pricingRules[idx];
      store.pricingRules[idx] = updated;
      store.auditLogs.unshift({
        id: `log-${Date.now()}`,
        actor: 'Admin',
        action: 'Fiyat Kuralı Değişikliği',
        target: updated.title,
        oldValue: { unitPrice: old.unitPrice, type: old.pricingType },
        newValue: { unitPrice: updated.unitPrice, type: updated.pricingType },
        timestamp: new Date().toISOString(),
      });
    }

    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase
          .from('pricing_rules')
          .update({
            unit_price: updated.unitPrice,
            pricing_type: updated.pricingType,
            unit_label: updated.unitLabel,
            title: updated.title,
            description: updated.description,
            is_active: updated.isActive,
            display_order: updated.displayOrder,
            updated_at: new Date().toISOString(),
          })
          .eq('code', updated.code);
      } catch (err) {
        console.error('Supabase updatePricingRule error:', err);
      }
    }
  },

  async createPricingRule(rule: PricingRule): Promise<PricingRule> {
    const store = getMemoryStore();
    const newRule: PricingRule = {
      ...rule,
      id: rule.id || `rule-${Date.now()}`,
      code: rule.code || `PARAM_${Date.now()}`,
      isActive: rule.isActive ?? true,
      displayOrder: rule.displayOrder ?? (store.pricingRules.length + 1),
    };
    store.pricingRules.push(newRule);

    const isUUID = (str?: string | null) =>
      Boolean(str && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str));

    const supabase = createAdminClient();
    if (supabase) {
      try {
        const payload: any = {
          category: newRule.category,
          code: newRule.code,
          title: newRule.title,
          description: newRule.description || '',
          pricing_type: newRule.pricingType,
          unit_label: newRule.unitLabel,
          unit_price: newRule.unitPrice,
          is_optional: newRule.isOptional ?? true,
          is_active: newRule.isActive,
          display_order: newRule.displayOrder,
        };
        if (isUUID(newRule.id)) {
          payload.id = newRule.id;
        }
        if (isUUID(newRule.serviceId)) {
          payload.service_id = newRule.serviceId;
        }
        await supabase.from('pricing_rules').insert(payload);
      } catch (err) {
        console.error('Supabase createPricingRule error:', err);
      }
    }
    return newRule;
  },

  async deletePricingRule(idOrCode: string): Promise<void> {
    const store = getMemoryStore();
    const idx = store.pricingRules.findIndex((r) => r.id === idOrCode || r.code === idOrCode);
    if (idx !== -1) {
      const removed = store.pricingRules.splice(idx, 1)[0];
      const isUUID = (str?: string | null) =>
        Boolean(str && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str));
      const supabase = createAdminClient();
      if (supabase) {
        try {
          if (isUUID(removed.id)) {
            await supabase.from('pricing_rules').delete().or(`id.eq.${removed.id},code.eq.${removed.code}`);
          } else {
            await supabase.from('pricing_rules').delete().eq('code', removed.code);
          }
        } catch (err) {
          console.error('Supabase deletePricingRule error:', err);
        }
      }
    }
  },

  // Calculator Steps
  async getCalculatorSteps(): Promise<CalculatorStep[]> {
    return getMemoryStore().calculatorSteps;
  },

  async updateCalculatorStep(step: CalculatorStep): Promise<void> {
    const store = getMemoryStore();
    const idx = store.calculatorSteps.findIndex((s) => s.id === step.id);
    if (idx !== -1) {
      store.calculatorSteps[idx] = step;
    }
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    return getMemoryStore().projects;
  },

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const projects = await this.getProjects();
    return projects.find((p) => p.slug === slug);
  },

  // Blog
  async getBlogPosts(): Promise<BlogPost[]> {
    return getMemoryStore().blogPosts;
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const posts = await this.getBlogPosts();
    return posts.find((p) => p.slug === slug);
  },

  // FAQs
  async getFAQs(): Promise<FAQItem[]> {
    return getMemoryStore().faqs;
  },

  // Site Settings
  async getSiteSettings(): Promise<SiteSettings> {
    const memory = getMemoryStore().siteSettings;
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
        if (!error && data) {
          return mapSettingsRow(data, memory);
        }
      } catch (err) {
        console.warn('Supabase fetch site settings failed:', err);
      }
    }
    return memory;
  },

  async updateSiteSettings(settings: SiteSettings): Promise<void> {
    const store = getMemoryStore();
    store.siteSettings = settings;
    store.auditLogs.unshift({
      id: `log-${Date.now()}`,
      actor: 'Admin',
      action: 'Site Ayarları Güncelleme',
      target: 'Site Ayarları',
      timestamp: new Date().toISOString(),
    });

    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase
          .from('site_settings')
          .update({
            company_name: settings.companyName,
            legal_name: settings.legalName,
            phone: settings.phone,
            whatsapp_number: settings.whatsappNumber,
            email: settings.email,
            address: settings.address,
            google_maps_url: settings.googleMapsUrl,
            instagram_url: settings.instagramUrl,
            kdv_rate: settings.kdvRate,
            hero_poster_url: settings.heroPosterUrl,
            default_price_validity_days: settings.defaultPriceValidityDays,
            updated_at: new Date().toISOString(),
          })
          .neq('id', '00000000-0000-0000-0000-000000000000');
      } catch (err) {
        console.error('Supabase updateSiteSettings error:', err);
      }
    }
  },

  // Leads & Quotes
  async saveLeadAndQuote(params: {
    quote: QuoteCalculationResult;
    fullName: string;
    phone: string;
    email?: string;
    city: string;
    district?: string;
    channel: LeadChannel;
    notes?: string;
    kvkkConsent: boolean;
  }): Promise<{ lead: Lead; quote: QuoteCalculationResult }> {
    const store = getMemoryStore();
    store.quotes.unshift(params.quote);

    let savedLeadId = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data: quoteData, error: qErr } = await supabase
          .from('quotes')
          .insert({
            quote_code: params.quote.quoteCode,
            service_name: params.quote.serviceName,
            building_m2: params.quote.buildingM2,
            package_name: params.quote.packageTitle,
            user_selections: params.quote,
            pricing_snapshot: params.quote.items,
            base_price: params.quote.basePrice,
            options_total: params.quote.optionsTotal,
            shipping_total: params.quote.shippingTotal,
            subtotal: params.quote.subtotal,
            kdv_rate: params.quote.kdvRate,
            kdv_total: params.quote.kdvTotal,
            grand_total: params.quote.grandTotal,
            has_quote_only_items: params.quote.hasQuoteOnlyItems,
          })
          .select()
          .single();

        if (qErr) {
          console.warn('Supabase quote insert error:', qErr);
        }

        const { data: leadData, error: lErr } = await supabase
          .from('leads')
          .insert({
            quote_id: quoteData?.id || null,
            quote_code: params.quote.quoteCode,
            full_name: params.fullName,
            phone: params.phone,
            email: params.email || null,
            city: params.city,
            district: params.district || null,
            channel: params.channel,
            status: 'new',
            notes: params.notes || null,
            kvkk_consent: params.kvkkConsent,
          })
          .select()
          .single();

        if (lErr) {
          console.warn('Supabase lead insert error:', lErr);
        }
        if (leadData?.id) {
          savedLeadId = leadData.id;
        }
      } catch (e) {
        console.warn('Supabase remote write error:', e);
      }
    }

    const newLead: Lead = {
      id: savedLeadId,
      quoteId: params.quote.quoteCode,
      quoteCode: params.quote.quoteCode,
      fullName: params.fullName,
      phone: params.phone,
      email: params.email,
      city: params.city,
      district: params.district,
      channel: params.channel,
      status: 'new',
      notes: params.notes,
      kvkkConsent: params.kvkkConsent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      quoteSnapshot: params.quote,
    };

    store.leads.unshift(newLead);
    return { lead: newLead, quote: params.quote };
  },

  async getLeads(): Promise<Lead[]> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data: leadRows, error: leadError } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (!leadError && leadRows && leadRows.length > 0) {
          const quoteCodes = leadRows.map((l) => l.quote_code).filter(Boolean);
          const { data: quoteRows } = await supabase
            .from('quotes')
            .select('*')
            .in('quote_code', quoteCodes);

          const quoteMap = new Map<string, QuoteCalculationResult>();
          if (quoteRows) {
            quoteRows.forEach((q) => {
              quoteMap.set(q.quote_code, {
                quoteCode: q.quote_code,
                serviceName: q.service_name,
                packageTitle: q.package_name,
                buildingM2: Number(q.building_m2),
                basePrice: Number(q.base_price),
                optionsTotal: Number(q.options_total),
                shippingTotal: Number(q.shipping_total),
                subtotal: Number(q.subtotal),
                kdvRate: Number(q.kdv_rate),
                kdvTotal: Number(q.kdv_total),
                grandTotal: Number(q.grand_total),
                hasQuoteOnlyItems: q.has_quote_only_items ?? false,
                quoteOnlyCount: q.has_quote_only_items ? 1 : 0,
                items: q.pricing_snapshot || [],
                timestamp: q.created_at || new Date().toISOString(),
              });
            });
          }

          return leadRows.map((row) => mapLeadRow(row, quoteMap.get(row.quote_code)));
        }
      } catch (err) {
        console.warn('Supabase getLeads error, falling back:', err);
      }
    }
    return getMemoryStore().leads;
  },

  async updateLeadStatus(id: string, status: LeadStatus, adminNotes?: string): Promise<Lead | null> {
    const store = getMemoryStore();
    const supabase = createAdminClient();

    if (supabase) {
      try {
        const updateData: any = {
          status,
          updated_at: new Date().toISOString(),
        };
        if (adminNotes !== undefined) {
          updateData.admin_notes = adminNotes;
        }
        await supabase.from('leads').update(updateData).eq('id', id);
      } catch (err) {
        console.error('Supabase updateLeadStatus error:', err);
      }
    }

    const lead = store.leads.find((l) => l.id === id);
    if (lead) {
      const oldStatus = lead.status;
      lead.status = status;
      lead.updatedAt = new Date().toISOString();
      if (adminNotes !== undefined) {
        lead.adminNotes = adminNotes;
      }

      store.auditLogs.unshift({
        id: `log-${Date.now()}`,
        actor: 'Admin',
        action: 'Başvuru Durumu Güncelleme',
        target: `${lead.fullName} (${lead.quoteCode})`,
        oldValue: oldStatus,
        newValue: status,
        timestamp: new Date().toISOString(),
      });

      return lead;
    }

    return null;
  },

  async getAuditLogs(): Promise<AuditLog[]> {
    return getMemoryStore().auditLogs;
  },
};
