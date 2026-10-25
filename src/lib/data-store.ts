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

export const DataStore = {
  // Services
  async getServices(): Promise<Service[]> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('services').select('*').order('display_order');
        if (!error && data && data.length > 0) {
          return data as any;
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local store:', err);
      }
    }
    return getMemoryStore().services;
  },

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const services = await this.getServices();
    return services.find((s) => s.slug === slug);
  },

  async updateService(updated: Service): Promise<void> {
    const store = getMemoryStore();
    const idx = store.services.findIndex((s) => s.id === updated.id);
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
  },

  // Pricing Rules
  async getPricingRules(): Promise<PricingRule[]> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('pricing_rules').select('*').order('display_order');
        if (!error && data && data.length > 0) {
          return data as any;
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local store:', err);
      }
    }
    return getMemoryStore().pricingRules;
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
    return getMemoryStore().siteSettings;
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

    const newLead: Lead = {
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
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

    // If Supabase is active, also asynchronously persist to Supabase
    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase.from('quotes').insert({
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
        });

        await supabase.from('leads').insert({
          quote_code: params.quote.quoteCode,
          full_name: params.fullName,
          phone: params.phone,
          email: params.email,
          city: params.city,
          district: params.district,
          channel: params.channel,
          status: 'new',
          notes: params.notes,
          kvkk_consent: params.kvkkConsent,
        });
      } catch (e) {
        console.warn('Supabase remote write error:', e);
      }
    }

    return { lead: newLead, quote: params.quote };
  },

  async getLeads(): Promise<Lead[]> {
    return getMemoryStore().leads;
  },

  async updateLeadStatus(id: string, status: LeadStatus, adminNotes?: string): Promise<Lead | null> {
    const store = getMemoryStore();
    const lead = store.leads.find((l) => l.id === id);
    if (!lead) return null;

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
  },

  async getAuditLogs(): Promise<AuditLog[]> {
    return getMemoryStore().auditLogs;
  },
};
