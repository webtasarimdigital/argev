import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { DataStore } from '@/lib/data-store';
import { calculateQuote } from '@/lib/pricing-engine';
import { formatCurrency } from '@/lib/utils';

const leadSchema = z.object({
  serviceSlug: z.string().min(1, 'Hizmet seçimi zorunludur'),
  packageSlug: z.string().optional(),
  buildingM2: z.number().min(10, 'Metrekare en az 10 olmalıdır'),
  fullName: z.string().min(2, 'Ad Soyad en az 2 karakter olmalıdır'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  email: z.string().email().optional().or(z.literal('')),
  city: z.string().default('Düzce'),
  district: z.string().optional(),
  notes: z.string().optional(),
  channel: z.enum(['whatsapp_intent', 'form', 'phone_direct']),
  selections: z.record(z.any()),
  kvkkConsent: z.boolean().refine((val) => val === true, 'KVKK aydınlatma metnini onaylamanız gerekmektedir'),
});

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const parsed = leadSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validasyon hatası', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const service = await DataStore.getServiceBySlug(data.serviceSlug);
    if (!service) {
      return NextResponse.json({ error: 'Hizmet bulunamadı' }, { status: 404 });
    }

    const rules = await DataStore.getPricingRules();
    const settings = await DataStore.getSiteSettings();

    // SERVER-SIDE CALCULATION: Never trust client totals!
    const quote = calculateQuote(
      {
        serviceSlug: data.serviceSlug,
        packageSlug: data.packageSlug,
        buildingM2: data.buildingM2,
        city: data.city,
        district: data.district,
        selections: data.selections,
      },
      {
        service,
        rules,
        kdvRate: settings.kdvRate,
      }
    );

    // Save lead and quote
    const { lead } = await DataStore.saveLeadAndQuote({
      quote,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || undefined,
      city: data.city,
      district: data.district,
      channel: data.channel,
      notes: data.notes,
      kvkkConsent: data.kvkkConsent,
    });

    // Prepare WhatsApp URL if channel is whatsapp_intent
    let whatsappUrl: string | undefined = undefined;
    if (data.channel === 'whatsapp_intent') {
      const cleanPhone = (settings.whatsappNumber || '+905321234567').replace(/[^0-9]/g, '');
      const message = `Merhaba ARGEV Yapı,\n\n📋 *Teklif Kodu:* ${quote.quoteCode}\n🏗️ *Hizmet:* ${quote.serviceName} (${quote.packageTitle})\n📐 *Yapı Alanı:* ${quote.buildingM2} m²\n📍 *Lokasyon:* ${data.city} / ${data.district || 'Merkez'}\n👤 *İsim:* ${data.fullName}\n📞 *Telefon:* ${data.phone}\n💰 *Tahmini Tutar:* ${quote.hasQuoteOnlyItems ? 'Keşif Gerektirir / Kısmi Hesap' : formatCurrency(quote.grandTotal)}\n${data.notes ? `📝 *Not:* ${data.notes}\n` : ''}\nWeb siteniz üzerinden hazırladığım çelik yapı teklifim hakkında görüşmek ve keşif planlamak istiyorum.`;

      whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    }

    return NextResponse.json({
      success: true,
      quoteCode: quote.quoteCode,
      leadId: lead.id,
      whatsappUrl,
      quote,
    });
  } catch (error: any) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: error?.message || 'Başvuru kaydedilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
