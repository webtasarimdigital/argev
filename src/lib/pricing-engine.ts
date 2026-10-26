import {
  PricingRule,
  QuoteCalculationInput,
  QuoteCalculationResult,
  QuoteItemBreakdown,
  Service,
} from '@/types/calculator';

/**
 * ARGEV Yapı — Server-side Precise Calculation Engine
 * 
 * Guarantees:
 * 1. Safe kuruş/decimal calculations (rounds to 2 decimal places, avoids JS float issues).
 * 2. Independent linear meters for kitchen lower and upper cabinets.
 * 3. Custom m² billing (e.g. 50 m² underfloor heating in an 80 m² structure).
 * 4. Mutual exclusion validation for floor finishes (ceramic + parquet <= floor area).
 * 5. Automatic zeroing of kitchen line items if kitchen is set to "yok".
 * 6. Package inclusions deducted: only EXTRA bathrooms/WCs are billed.
 * 7. Active service filter: options not relevant to a service (e.g. garage vs heavy steel) are excluded.
 * 8. Quote-only flag for unknown/survey-required items (e.g. foundation, permits), preventing fake totals.
 * 9. Generation of an immutable calculation snapshot.
 */

export function roundCurrency(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

export function generateQuoteCode(): string {
  const year = new Date().getFullYear();
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ARG-${year}-${randomPart}`;
}

export interface PricingEngineContext {
  service: Service;
  rules: PricingRule[];
  kdvRate?: number;
}

export function calculateQuote(
  input: QuoteCalculationInput,
  context: PricingEngineContext
): QuoteCalculationResult {
  const { service, rules, kdvRate = 20 } = context;
  const { buildingM2, selections, packageSlug = 'anahtar-teslim' } = input;
  const items: QuoteItemBreakdown[] = [];
  const warnings: string[] = [];
  let hasQuoteOnlyItems = false;
  let quoteOnlyCount = 0;

  // 1. Package Multiplier
  const selectedPackage = service.packages.find((p) => p.slug === packageSlug) ||
    service.packages[0] || {
      slug: 'anahtar-teslim',
      name: 'Anahtar Teslim',
      priceMultiplier: 1.0,
      inclusions: [],
    };

  // 2. Base Structure Calculation
  const baseRate = roundCurrency(service.baseM2Price * selectedPackage.priceMultiplier);
  const baseStructurePrice = roundCurrency(buildingM2 * baseRate);

  items.push({
    category: 'Yapı Gövdesi',
    itemCode: `BASE_${service.slug.toUpperCase()}`,
    itemTitle: `${service.name} (${selectedPackage.name}) - ${buildingM2} m²`,
    quantity: buildingM2,
    unitLabel: '₺/m²',
    unitPrice: baseRate,
    totalPrice: baseStructurePrice,
    isQuoteOnly: false,
    note: `Birim m² bedeli paket çarpanı (${selectedPackage.priceMultiplier}x) ile hesaplanmıştır.`,
  });

  // Helper to look up active rule for this service
  const getRule = (code: string): PricingRule | undefined => {
    return rules.find(
      (r) =>
        r.code === code &&
        r.isActive &&
        (!r.serviceId || r.serviceId === service.id || r.serviceId === service.slug)
    );
  };

  // 2.5. Kat Sayısı Farkı (Çift Katlı / Dubleks Farkı)
  const isDoubleStory = Number(selections.floor_count) === 2;
  if (isDoubleStory) {
    const floorRule = getRule('floor_double_story');
    if (floorRule && floorRule.unitPrice > 0) {
      const floorDiffTotal = roundCurrency(buildingM2 * floorRule.unitPrice);
      items.push({
        category: 'Statik & Kat Düzeni',
        itemCode: 'FLOOR_DOUBLE_STORY',
        itemTitle: floorRule.title || 'Çift Katlı / Dubleks Ara Kat & Merdiven',
        quantity: buildingM2,
        unitLabel: floorRule.unitLabel || '₺/m²',
        unitPrice: floorRule.unitPrice,
        totalPrice: floorDiffTotal,
        isQuoteOnly: false,
        note: `Çift katlı projeler için ara kat çelik döşeme tabliyesi ve merdiven konstrüksiyon bedeli.`,
      });
    }
  }

  // 3. Temel & Resmi İşlemler (Foundation & Permits)
  const foundationChoice = selections.foundation || 'temel_yok';
  if (foundationChoice === 'temel_subasman') {
    const fRule = getRule('foundation_subasman');
    if (fRule && fRule.pricingType === 'quote_only') {
      hasQuoteOnlyItems = true;
      quoteOnlyCount++;
      items.push({
        category: 'Temel & Altyapı',
        itemCode: 'FOUNDATION_SUBASMAN',
        itemTitle: 'Betonarme Subasman & Temel İmalatı',
        quantity: 1,
        unitLabel: 'Keşif',
        unitPrice: 0,
        totalPrice: 0,
        isQuoteOnly: true,
        note: 'Zemin etüdü ve statik projeye göre yerinde keşif ile kesinleşir.',
      });
    } else if (fRule) {
      const price = roundCurrency(buildingM2 * fRule.unitPrice);
      items.push({
        category: 'Temel & Altyapı',
        itemCode: 'FOUNDATION_SUBASMAN',
        itemTitle: 'Betonarme Subasman (Ön Tahmini)',
        quantity: buildingM2,
        unitLabel: fRule.unitLabel,
        unitPrice: fRule.unitPrice,
        totalPrice: price,
        isQuoteOnly: false,
        note: 'Zemin koşullarına bağlı değişkenlik gösterebilir.',
      });
    }
  }

  // Ruhsat & Proje Takip
  const permitChoice = selections.permit_tracking;
  if (permitChoice === 'var') {
    const pRule = getRule('permit_and_projects');
    if (pRule) {
      if (pRule.pricingType === 'quote_only') {
        hasQuoteOnlyItems = true;
        quoteOnlyCount++;
        items.push({
          category: 'Resmi İşlemler',
          itemCode: 'PERMIT_TRACKING',
          itemTitle: 'Mimari, Statik ve Ruhsat Proje Takibi',
          quantity: 1,
          unitLabel: 'Keşif',
          unitPrice: 0,
          totalPrice: 0,
          isQuoteOnly: true,
          note: 'Belediye harçları ve zemin şartlarına göre özel dosya hazırlanır.',
        });
      } else {
        items.push({
          category: 'Resmi İşlemler',
          itemCode: 'PERMIT_TRACKING',
          itemTitle: 'Mimari & Statik Ruhsat Proje Çizimi',
          quantity: 1,
          unitLabel: pRule.unitLabel,
          unitPrice: pRule.unitPrice,
          totalPrice: pRule.unitPrice,
          isQuoteOnly: false,
        });
      }
    }
  }

  // 4. Dış Cephe Kaplama (Facade)
  const facadeChoice = selections.facade_type;
  if (facadeChoice && facadeChoice !== 'standart') {
    const facadeRule = getRule(`facade_${facadeChoice}`);
    if (facadeRule) {
      // If user supplied custom facade area, use it; otherwise approximate buildingM2 * 1.3
      const facadeArea = Number(selections.facade_custom_m2) || roundCurrency(buildingM2 * 1.3);
      const facadePrice = roundCurrency(facadeArea * facadeRule.unitPrice);
      items.push({
        category: 'Dış Cephe',
        itemCode: `FACADE_${facadeChoice.toUpperCase()}`,
        itemTitle: `Dış Cephe: ${facadeRule.title}`,
        quantity: facadeArea,
        unitLabel: facadeRule.unitLabel,
        unitPrice: facadeRule.unitPrice,
        totalPrice: facadePrice,
        isQuoteOnly: false,
      });
    }
  }

  // 5. Zemin & Döşeme (Parke ve Seramik Kontrolleri)
  const parquetM2 = Math.max(0, Number(selections.flooring_parquet_m2) || 0);
  const ceramicM2 = Math.max(0, Number(selections.flooring_ceramic_m2) || 0);
  const totalFlooringSelected = parquetM2 + ceramicM2;

  if (totalFlooringSelected > buildingM2) {
    warnings.push(
      `Parke (${parquetM2} m²) ve Seramik (${ceramicM2} m²) toplamı yapı alanını (${buildingM2} m²) aşıyor. Lütfen zemin alanlarını gözden geçiriniz.`
    );
  }

  if (parquetM2 > 0) {
    const parquetRule = getRule('flooring_parquet');
    const pPrice = parquetRule ? roundCurrency(parquetM2 * parquetRule.unitPrice) : 0;
    items.push({
      category: 'İç Mekan & Zemin',
      itemCode: 'FLOOR_PARQUET',
      itemTitle: 'Derzli 32. Sınıf Laminat Parke',
      quantity: parquetM2,
      unitLabel: parquetRule?.unitLabel || '₺/m²',
      unitPrice: parquetRule?.unitPrice || 0,
      totalPrice: pPrice,
      isQuoteOnly: false,
    });
  }

  if (ceramicM2 > 0) {
    const ceramicRule = getRule('flooring_ceramic');
    const cPrice = ceramicRule ? roundCurrency(ceramicM2 * ceramicRule.unitPrice) : 0;
    items.push({
      category: 'İç Mekan & Zemin',
      itemCode: 'FLOOR_CERAMIC',
      itemTitle: '1. Sınıf Granit / Seramik Zemin Kaplama',
      quantity: ceramicM2,
      unitLabel: ceramicRule?.unitLabel || '₺/m²',
      unitPrice: ceramicRule?.unitPrice || 0,
      totalPrice: cPrice,
      isQuoteOnly: false,
    });
  }

  // 6. Yerden Isıtma (Underfloor Heating)
  // CRITICAL RULE: If 80 m² home has 50 m² underfloor heating, ONLY 50 m² is billed!
  const hasHeating = selections.heating_type && selections.heating_type !== 'yok';
  if (hasHeating) {
    const heatingM2 = Math.min(
      buildingM2,
      Math.max(0, Number(selections.heating_custom_m2) || buildingM2)
    );
    const heatingRule = getRule(`heating_${selections.heating_type}`);
    if (heatingRule) {
      const hPrice = roundCurrency(heatingM2 * heatingRule.unitPrice);
      items.push({
        category: 'Isıtma Sistemleri',
        itemCode: `HEATING_${selections.heating_type.toUpperCase()}`,
        itemTitle: heatingRule.title,
        quantity: heatingM2,
        unitLabel: heatingRule.unitLabel,
        unitPrice: heatingRule.unitPrice,
        totalPrice: hPrice,
        isQuoteOnly: false,
        note: `Yalnızca seçilen ${heatingM2} m² alan için ücretlendirilmiştir.`,
      });
    }
  }

  // 7. Mutfak (Kitchen)
  // CRITICAL RULE: If mutfak_durumu === 'yok', lower and upper cabinet prices MUST be zeroed!
  const kitchenStatus = selections.kitchen_status || 'var';
  if (kitchenStatus === 'var') {
    const lowerCabinetMtul = Math.max(0, Number(selections.kitchen_lower_mtul) || 0);
    const upperCabinetMtul = Math.max(0, Number(selections.kitchen_upper_mtul) || 0);
    const countertopMtul = Math.max(0, Number(selections.kitchen_countertop_mtul) || 0);

    if (lowerCabinetMtul > 0) {
      const lowerRule = getRule('kitchen_lower_cabinet');
      const lowerPrice = lowerRule ? roundCurrency(lowerCabinetMtul * lowerRule.unitPrice) : 0;
      items.push({
        category: 'Mutfak Donanımı',
        itemCode: 'KITCHEN_LOWER_CABINET',
        itemTitle: 'Mutfak Alt Dolabı (MDF Gövde / Frenli Ray)',
        quantity: lowerCabinetMtul,
        unitLabel: lowerRule?.unitLabel || '₺/mtül',
        unitPrice: lowerRule?.unitPrice || 0,
        totalPrice: lowerPrice,
        isQuoteOnly: false,
      });
    }

    if (upperCabinetMtul > 0) {
      const upperRule = getRule('kitchen_upper_cabinet');
      const upperPrice = upperRule ? roundCurrency(upperCabinetMtul * upperRule.unitPrice) : 0;
      items.push({
        category: 'Mutfak Donanımı',
        itemCode: 'KITCHEN_UPPER_CABINET',
        itemTitle: 'Mutfak Üst Dolabı (Kapak / Amortisörlü Raf)',
        quantity: upperCabinetMtul,
        unitLabel: upperRule?.unitLabel || '₺/mtül',
        unitPrice: upperRule?.unitPrice || 0,
        totalPrice: upperPrice,
        isQuoteOnly: false,
      });
    }

    if (countertopMtul > 0) {
      const counterRule = getRule('kitchen_countertop');
      const counterPrice = counterRule ? roundCurrency(countertopMtul * counterRule.unitPrice) : 0;
      items.push({
        category: 'Mutfak Donanımı',
        itemCode: 'KITCHEN_COUNTERTOP',
        itemTitle: 'Mutfak Tezgâhı (Çimstone / Porselen)',
        quantity: countertopMtul,
        unitLabel: counterRule?.unitLabel || '₺/mtül',
        unitPrice: counterRule?.unitPrice || 0,
        totalPrice: counterPrice,
        isQuoteOnly: false,
      });
    }
  }

  // 8. Tuvalet ve Banyo (WC & Bathroom)
  // CRITICAL RULE: Standard package includes base count (1 WC & 1 Bath). Only EXTRA counts are charged!
  const extraWcCount = Math.max(0, Number(selections.extra_wc_count) || 0);
  const extraBathCount = Math.max(0, Number(selections.extra_bath_count) || 0);

  if (extraWcCount > 0) {
    const wcRule = getRule('extra_wc');
    const wcPrice = wcRule ? roundCurrency(extraWcCount * wcRule.unitPrice) : 0;
    items.push({
      category: 'Islak Hacimler',
      itemCode: 'EXTRA_WC',
      itemTitle: 'İlave Tuvalet / WC Ünitesi (Klozet, Lavabo & Armatür)',
      quantity: extraWcCount,
      unitLabel: wcRule?.unitLabel || '₺/adet',
      unitPrice: wcRule?.unitPrice || 0,
      totalPrice: wcPrice,
      isQuoteOnly: false,
      note: 'Standart pakete dahil 1 adet WC haricinde talep edilen ekstra ünite.',
    });
  }

  if (extraBathCount > 0) {
    const bathRule = getRule('extra_bathroom');
    const bathPrice = bathRule ? roundCurrency(extraBathCount * bathRule.unitPrice) : 0;
    items.push({
      category: 'Islak Hacimler',
      itemCode: 'EXTRA_BATHROOM',
      itemTitle: 'İlave Ebeveyn / Genel Banyo (Duşakabin & Dolap Dahil)',
      quantity: extraBathCount,
      unitLabel: bathRule?.unitLabel || '₺/adet',
      unitPrice: bathRule?.unitPrice || 0,
      totalPrice: bathPrice,
      isQuoteOnly: false,
      note: 'Standart pakete dahil banyo haricinde talep edilen ekstra banyo.',
    });
  }

  // 9. Ekstralar (Veranda, Ferforje, Garaj)
  const verandaM2 = Math.max(0, Number(selections.veranda_m2) || 0);
  if (verandaM2 > 0) {
    const verandaRule = getRule('extra_veranda');
    const vPrice = verandaRule ? roundCurrency(verandaM2 * verandaRule.unitPrice) : 0;
    items.push({
      category: 'Ekstra Yapılar',
      itemCode: 'EXTRA_VERANDA',
      itemTitle: 'Çelik Konstrüksiyon Veranda & Sundurma',
      quantity: verandaM2,
      unitLabel: verandaRule?.unitLabel || '₺/m²',
      unitPrice: verandaRule?.unitPrice || 0,
      totalPrice: vPrice,
      isQuoteOnly: false,
    });
  }

  const railingMtul = Math.max(0, Number(selections.railing_mtul) || 0);
  if (railingMtul > 0) {
    const railingRule = getRule('extra_railing');
    const rPrice = railingRule ? roundCurrency(railingMtul * railingRule.unitPrice) : 0;
    items.push({
      category: 'Ekstra Yapılar',
      itemCode: 'EXTRA_RAILING',
      itemTitle: 'ARGEV Ferforje & Çelik Balkon/Merdiven Korkuluğu',
      quantity: railingMtul,
      unitLabel: railingRule?.unitLabel || '₺/mtül',
      unitPrice: railingRule?.unitPrice || 0,
      totalPrice: rPrice,
      isQuoteOnly: false,
    });
  }

  // 9.5. Dinamik ve Hizmete Özel Ekstra Parametreler (Admin panelden eklenen kurallar)
  const STANDARD_CORE_CODES = [
    'foundation_subasman',
    'permit_and_projects',
    'facade_standart',
    'facade_fibercement',
    'facade_composite',
    'flooring_parquet',
    'flooring_ceramic',
    'heating_sulu',
    'heating_elektrikli',
    'kitchen_lower_cabinet',
    'kitchen_upper_cabinet',
    'kitchen_countertop',
    'extra_wc',
    'extra_bathroom',
    'extra_veranda',
    'extra_railing',
    'floor_double_story',
  ];

  const formatCategoryName = (cat: string) => {
    switch (cat) {
      case 'bathroom':
        return 'Islak Hacimler';
      case 'kitchen':
        return 'Mutfak Donanımı';
      case 'facade':
        return 'Dış Cephe';
      case 'flooring':
        return 'İç Mekan & Zemin';
      case 'heating':
        return 'Isıtma Sistemleri';
      case 'foundation':
        return 'Temel & Altyapı';
      case 'permit':
        return 'Resmi İşlemler';
      case 'extra':
        return 'Ekstra Donanımlar';
      default:
        return cat || 'Özel Seçenekler';
    }
  };

  const dynamicRules = rules.filter(
    (r) =>
      r.isActive &&
      (!r.serviceId || r.serviceId === service.id || r.serviceId === service.slug) &&
      !STANDARD_CORE_CODES.includes(r.code)
  );

  for (const dynRule of dynamicRules) {
    const rawVal = selections[dynRule.code];
    if (
      rawVal !== undefined &&
      rawVal !== null &&
      rawVal !== false &&
      rawVal !== 0 &&
      rawVal !== '0' &&
      rawVal !== 'yok'
    ) {
      let qty = 1;
      if (typeof rawVal === 'number') {
        qty = rawVal;
      } else if (typeof rawVal === 'string' && !isNaN(Number(rawVal))) {
        qty = Number(rawVal);
      } else if (typeof rawVal === 'boolean') {
        qty = rawVal ? 1 : 0;
      }

      if (qty > 0) {
        if (dynRule.pricingType === 'quote_only') {
          hasQuoteOnlyItems = true;
          quoteOnlyCount++;
          items.push({
            category: formatCategoryName(dynRule.category),
            itemCode: dynRule.code,
            itemTitle: dynRule.title,
            quantity: qty,
            unitLabel: dynRule.unitLabel || 'Keşif',
            unitPrice: 0,
            totalPrice: 0,
            isQuoteOnly: true,
            note: dynRule.description || 'Statik proje ve yerinde keşif ile kesinleşir.',
          });
        } else {
          const itemTotal = roundCurrency(qty * dynRule.unitPrice);
          items.push({
            category: formatCategoryName(dynRule.category),
            itemCode: dynRule.code,
            itemTitle: dynRule.title,
            quantity: qty,
            unitLabel: dynRule.unitLabel,
            unitPrice: dynRule.unitPrice,
            totalPrice: itemTotal,
            isQuoteOnly: false,
            note: dynRule.description || undefined,
          });
        }
      }
    }
  }

  // 10. Nakliye & Lojistik (Shipping by location)
  let shippingTotal = 0;
  const city = input.city || 'Düzce';
  const district = input.district || 'Merkez';

  if (city === 'Düzce') {
    if (district.toLowerCase() === 'merkez') {
      shippingTotal = 0;
      items.push({
        category: 'Lojistik & Nakliye',
        itemCode: 'SHIPPING_DUZCE_MERKEZ',
        itemTitle: 'Düzce Merkez Fabrika İçi Nakliye',
        quantity: 1,
        unitLabel: '₺',
        unitPrice: 0,
        totalPrice: 0,
        isQuoteOnly: false,
        note: 'Düzce Merkez sınırları dahilindedir.',
      });
    } else {
      shippingTotal = 15000;
      items.push({
        category: 'Lojistik & Nakliye',
        itemCode: 'SHIPPING_DUZCE_DISTRICT',
        itemTitle: `Düzce İçi Lojistik (${district})`,
        quantity: 1,
        unitLabel: '₺',
        unitPrice: 15000,
        totalPrice: 15000,
        isQuoteOnly: false,
      });
    }
  } else if (['Bolu', 'Sakarya'].includes(city)) {
    shippingTotal = 28000;
    items.push({
      category: 'Lojistik & Nakliye',
      itemCode: 'SHIPPING_ZONE_2',
      itemTitle: `Batı Karadeniz Lojistik (${city})`,
      quantity: 1,
      unitLabel: '₺',
      unitPrice: 28000,
      totalPrice: 28000,
      isQuoteOnly: false,
    });
  } else {
    shippingTotal = 42000;
    items.push({
      category: 'Lojistik & Nakliye',
      itemCode: 'SHIPPING_ZONE_3',
      itemTitle: `Şehirlerarası Çelik Taşımacılık & Vinç (${city})`,
      quantity: 1,
      unitLabel: '₺',
      unitPrice: 42000,
      totalPrice: 42000,
      isQuoteOnly: false,
    });
  }

  // 11. Totals Calculation
  const optionsTotal = roundCurrency(
    items
      .filter((item) => item.category !== 'Yapı Gövdesi' && item.category !== 'Lojistik & Nakliye' && !item.isQuoteOnly)
      .reduce((sum, item) => sum + item.totalPrice, 0)
  );

  const subtotal = roundCurrency(baseStructurePrice + optionsTotal + shippingTotal);
  const kdvTotal = roundCurrency((subtotal * kdvRate) / 100);
  const grandTotal = roundCurrency(subtotal + kdvTotal);

  if (hasQuoteOnlyItems) {
    warnings.push(
      'Teklifinizde yerinde keşif veya resmi izin gerektiren kalemler (temel, resmi ruhsat harçları vb.) yer almaktadır. Bu kalemlerin bedeli statik proje onayından sonra netleşir.'
    );
  }

  return {
    quoteCode: generateQuoteCode(),
    serviceName: service.name,
    packageTitle: selectedPackage.name,
    buildingM2,
    basePrice: baseStructurePrice,
    optionsTotal,
    shippingTotal,
    subtotal,
    kdvRate,
    kdvTotal,
    grandTotal,
    hasQuoteOnlyItems,
    quoteOnlyCount,
    items,
    timestamp: new Date().toISOString(),
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}
