import { describe, it, expect } from 'vitest';
import { DataStore } from '../lib/data-store';

describe('DataStore Supabase Entegrasyonu', () => {
  it('Supabase üzerinden hizmetleri doğru modellerle çeker', async () => {
    const services = await DataStore.getServices();
    expect(services.length).toBeGreaterThan(0);
    const hafifCelik = services.find(s => s.slug === 'hafif-celik-ev');
    expect(hafifCelik).toBeDefined();
    expect(hafifCelik?.baseM2Price).toBeGreaterThan(0);
  });

  it('Supabase üzerinden fiyat kurallarını çeker', async () => {
    const rules = await DataStore.getPricingRules();
    expect(rules.length).toBeGreaterThan(0);
    const subasman = rules.find(r => r.code === 'foundation_subasman');
    expect(subasman).toBeDefined();
  });

  it('Teklif ve müşteri başvurusunu (Lead) Supabase veri tabanına kaydeder ve geri okur', async () => {
    const uniqueQuoteCode = `ARG-${Date.now().toString().slice(-6)}`;
    const mockQuote = {
      quoteCode: uniqueQuoteCode,
      serviceName: 'Hafif Çelik Ev',
      packageTitle: 'Anahtar Teslim',
      buildingM2: 120,
      basePrice: 1980000,
      optionsTotal: 0,
      shippingTotal: 0,
      subtotal: 1980000,
      kdvRate: 20,
      kdvTotal: 396000,
      grandTotal: 2376000,
      hasQuoteOnlyItems: false,
      items: [
        { itemTitle: 'Hafif Çelik Yapı', quantity: 120, unitLabel: 'm²', totalPrice: 1980000 }
      ]
    };

    const { lead } = await DataStore.saveLeadAndQuote({
      quote: mockQuote,
      fullName: 'Ahmet Test Müşterisi',
      phone: '0541 398 00 81',
      email: 'test@argevyapi.com',
      city: 'Düzce',
      district: 'Akçakoca',
      channel: 'whatsapp_intent',
      notes: 'Arsa imarlı, numaramdan arayabilirsiniz.',
      kvkkConsent: true,
    });

    expect(lead).toBeDefined();
    expect(lead.quoteCode).toBe(uniqueQuoteCode);
    expect(lead.phone).toBe('0541 398 00 81');

    // Admin getLeads test
    const allLeads = await DataStore.getLeads();
    const found = allLeads.find(l => l.quoteCode === uniqueQuoteCode);
    expect(found).toBeDefined();
    expect(found?.fullName).toBe('Ahmet Test Müşterisi');
    expect(found?.phone).toBe('0541 398 00 81');

    // Admin durum güncelleme test
    if (found) {
      const updated = await DataStore.updateLeadStatus(found.id, 'contacted', 'Telefon ile arandı, keşif tarihi belirlendi.');
      expect(updated?.status).toBe('contacted');
      expect(updated?.adminNotes).toBe('Telefon ile arandı, keşif tarihi belirlendi.');
    }
  });
});
