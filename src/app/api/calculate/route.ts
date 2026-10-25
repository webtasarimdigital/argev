import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';
import { calculateQuote } from '@/lib/pricing-engine';
import { QuoteCalculationInput } from '@/types/calculator';

export async function POST(req: NextRequest) {
  try {
    const body: QuoteCalculationInput = await req.json();

    if (!body.serviceSlug) {
      return NextResponse.json({ error: 'Hizmet seçilmelidir.' }, { status: 400 });
    }

    const service = await DataStore.getServiceBySlug(body.serviceSlug);
    if (!service) {
      return NextResponse.json({ error: 'Geçersiz hizmet türü.' }, { status: 404 });
    }

    const rules = await DataStore.getPricingRules();
    const settings = await DataStore.getSiteSettings();

    const result = calculateQuote(body, {
      service,
      rules,
      kdvRate: settings.kdvRate || 20,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Calculate API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Hesaplama sırasında sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
