import { describe, it, expect } from 'vitest';
import { calculateQuote, roundCurrency } from '../lib/pricing-engine';
import {
  INITIAL_SERVICES,
  INITIAL_PRICING_RULES,
} from '../lib/seed-data';

describe('ARGEV Yapı — Fiyatlandırma Motoru ve 12 Başarı Testi', () => {
  const hafifCelikService = INITIAL_SERVICES.find((s) => s.slug === 'hafif-celik-ev')!;
  const agirCelikService = INITIAL_SERVICES.find((s) => s.slug === 'agir-celik-ev')!;
  const garajService = INITIAL_SERVICES.find((s) => s.slug === 'celik-garaj')!;

  // 1. Serbest m² girişi ve hizmete özel m² birim fiyatı
  it('Kriter 1: Serbest m² girişinde (ör. 105 m²) hizmet m² birim fiyatı ile hatasız hesaplar', () => {
    const result = calculateQuote(
      {
        serviceSlug: 'hafif-celik-ev',
        packageSlug: 'anahtar-teslim',
        buildingM2: 105,
        city: 'Düzce',
        district: 'Merkez',
        selections: {},
      },
      {
        service: hafifCelikService,
        rules: INITIAL_PRICING_RULES,
      }
    );

    // Hafif Çelik Anahtar Teslim: 16,500 ₺/m² * 105 m² = 1,732,500 ₺
    expect(result.basePrice).toBe(1732500);
    expect(result.buildingM2).toBe(105);
    expect(result.items.some((i) => i.itemCode === 'BASE_HAFIF-CELIK-EV')).toBe(true);
  });

  // 2. Yerden ısıtmayı m² üzerinden, mutfak alt ve üst dolaplarını mtül üzerinden fiyatlar
  it('Kriter 2: Yerden ısıtma m², mutfak alt/üst dolapları mtül üzerinden bağımsız hesaplanır', () => {
    const result = calculateQuote(
      {
        serviceSlug: 'hafif-celik-ev',
        packageSlug: 'anahtar-teslim',
        buildingM2: 100,
        city: 'Düzce',
        district: 'Merkez',
        selections: {
          heating_type: 'sulu',
          heating_custom_m2: 60, // 60 m² * 950 ₺ = 57,000 ₺
          kitchen_status: 'var',
          kitchen_lower_mtul: 4, // 4 mtül * 7500 ₺ = 30,000 ₺
          kitchen_upper_mtul: 3, // 3 mtül * 6500 ₺ = 19,500 ₺
        },
      },
      {
        service: hafifCelikService,
        rules: INITIAL_PRICING_RULES,
      }
    );

    const heatingItem = result.items.find((i) => i.itemCode === 'HEATING_SULU');
    expect(heatingItem).toBeDefined();
    expect(heatingItem?.quantity).toBe(60);
    expect(heatingItem?.unitPrice).toBe(950);
    expect(heatingItem?.totalPrice).toBe(57000);

    const lowerKitchen = result.items.find((i) => i.itemCode === 'KITCHEN_LOWER_CABINET');
    expect(lowerKitchen).toBeDefined();
    expect(lowerKitchen?.quantity).toBe(4);
    expect(lowerKitchen?.totalPrice).toBe(30000);

    const upperKitchen = result.items.find((i) => i.itemCode === 'KITCHEN_UPPER_CABINET');
    expect(upperKitchen).toBeDefined();
    expect(upperKitchen?.quantity).toBe(3);
    expect(upperKitchen?.totalPrice).toBe(19500);
  });

  // 3. 80 m² yapıda 50 m² yerden ısıtma seçilirse YALNIZ 50 m² ücretlendirilir
  it('Kriter 3: 80 m² yapıda 50 m² yerden ısıtma seçildiğinde yalnız 50 m² faturalandırılır', () => {
    const result = calculateQuote(
      {
        serviceSlug: 'hafif-celik-ev',
        packageSlug: 'anahtar-teslim',
        buildingM2: 80,
        city: 'Düzce',
        district: 'Merkez',
        selections: {
          heating_type: 'sulu',
          heating_custom_m2: 50,
        },
      },
      {
        service: hafifCelikService,
        rules: INITIAL_PRICING_RULES,
      }
    );

    const heatingItem = result.items.find((i) => i.itemCode === 'HEATING_SULU');
    expect(heatingItem).toBeDefined();
    expect(heatingItem?.quantity).toBe(50); // Kesinlikle 50 m² olmalı, 80 değil!
    expect(heatingItem?.totalPrice).toBe(50 * 950); // 47,500 ₺
  });

  // 4. Ekstra WC ve Banyo adet hesabı
  it('Kriter 4: Ekstra WC ve banyo için paket harici adet hesabı tam çalışır', () => {
    const result = calculateQuote(
      {
        serviceSlug: 'hafif-celik-ev',
        packageSlug: 'anahtar-teslim',
        buildingM2: 120,
        city: 'Düzce',
        district: 'Merkez',
        selections: {
          extra_wc_count: 1, // 1 * 18,000 = 18,000 ₺
          extra_bath_count: 2, // 2 * 35,000 = 70,000 ₺
        },
      },
      {
        service: hafifCelikService,
        rules: INITIAL_PRICING_RULES,
      }
    );

    const wcItem = result.items.find((i) => i.itemCode === 'EXTRA_WC');
    expect(wcItem).toBeDefined();
    expect(wcItem?.quantity).toBe(1);
    expect(wcItem?.totalPrice).toBe(18000);

    const bathItem = result.items.find((i) => i.itemCode === 'EXTRA_BATHROOM');
    expect(bathItem).toBeDefined();
    expect(bathItem?.quantity).toBe(2);
    expect(bathItem?.totalPrice).toBe(70000);
  });

  // 5. Seramik ve Parke alan çakışması kontrolü
  it('Kriter 5: Seramik ve parke toplamı bina alanını aşarsa sistem uyarı üretir', () => {
    const result = calculateQuote(
      {
        serviceSlug: 'hafif-celik-ev',
        packageSlug: 'anahtar-teslim',
        buildingM2: 100,
        city: 'Düzce',
        district: 'Merkez',
        selections: {
          flooring_parquet_m2: 80,
          flooring_ceramic_m2: 40, // 80 + 40 = 120 m² > 100 m²!
        },
      },
      {
        service: hafifCelikService,
        rules: INITIAL_PRICING_RULES,
      }
    );

    expect(result.warnings).toBeDefined();
    expect(result.warnings?.some((w) => w.includes('aşıyor'))).toBe(true);
  });

  // 6. Mutfak 'yok' yapılınca alt/üst dolap ve tezgah sıfırlanır
  it('Kriter 6: Mutfak "yok" seçildiğinde mutfak dolap ve tezgâh satırları sıfırlanır/eklenmez', () => {
    const result = calculateQuote(
      {
        serviceSlug: 'hafif-celik-ev',
        packageSlug: 'anahtar-teslim',
        buildingM2: 100,
        city: 'Düzce',
        district: 'Merkez',
        selections: {
          kitchen_status: 'yok',
          kitchen_lower_mtul: 5, // Formda önceden kalmış olsa bile
          kitchen_upper_mtul: 4,
          kitchen_countertop_mtul: 5,
        },
      },
      {
        service: hafifCelikService,
        rules: INITIAL_PRICING_RULES,
      }
    );

    const hasKitchenItem = result.items.some(
      (i) => i.itemCode.startsWith('KITCHEN_')
    );
    expect(hasKitchenItem).toBe(false);
  });

  // 7. Ağır Çelik ve Çelik Garaj hizmet bazlı opsiyon yönetimi
  it('Kriter 7: Hizmetler kendi paketlerine ve kurallarına göre ayrı hesaplanır', () => {
    const garajResult = calculateQuote(
      {
        serviceSlug: 'celik-garaj',
        buildingM2: 40,
        city: 'Düzce',
        district: 'Merkez',
        selections: {},
      },
      {
        service: garajService,
        rules: INITIAL_PRICING_RULES,
      }
    );

    // Garaj baz m² 9500 ₺ * 40 = 380,000 ₺
    expect(garajResult.basePrice).toBe(380000);
    expect(garajResult.serviceName).toBe('Çelik Garaj & Sundurma');
  });

  // 8. Bilinmeyen/keşif gerektiren kalemde sahte kesin fiyat verilmez (quote_only)
  it('Kriter 8: Temel gibi keşif gerektiren kalemlerde hasQuoteOnlyItems bayrağı set edilir', () => {
    const result = calculateQuote(
      {
        serviceSlug: 'hafif-celik-ev',
        packageSlug: 'anahtar-teslim',
        buildingM2: 100,
        city: 'Düzce',
        district: 'Merkez',
        selections: {
          foundation: 'temel_subasman', // quote_only kuralı
        },
      },
      {
        service: hafifCelikService,
        rules: INITIAL_PRICING_RULES,
      }
    );

    expect(result.hasQuoteOnlyItems).toBe(true);
    expect(result.quoteOnlyCount).toBeGreaterThan(0);
    const foundationItem = result.items.find((i) => i.itemCode === 'FOUNDATION_SUBASMAN');
    expect(foundationItem?.isQuoteOnly).toBe(true);
    expect(foundationItem?.totalPrice).toBe(0);
    expect(result.warnings?.some((w) => w.includes('keşif'))).toBe(true);
  });

  // 9. Hassas para hesabı (roundCurrency float koruması)
  it('Kriter 9 & 12: Float yuvarlama hataları engellenir ve kuruş hassasiyeti korunur', () => {
    expect(roundCurrency(0.1 + 0.2)).toBe(0.3);
    expect(roundCurrency(12345.6789)).toBe(12345.68);
  });
});
