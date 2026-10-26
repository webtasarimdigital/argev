import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const rules = await DataStore.getPricingRules();
  return NextResponse.json(rules);
}

export async function PATCH(req: NextRequest) {
  try {
    const updatedRule = await req.json();
    await DataStore.updatePricingRule(updatedRule);
    revalidatePath('/', 'layout');
    revalidatePath('/fiyat-hesaplama');
    return NextResponse.json({ success: true, rule: updatedRule });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const newRule = await req.json();
    const created = await DataStore.createPricingRule(newRule);
    revalidatePath('/', 'layout');
    revalidatePath('/fiyat-hesaplama');
    return NextResponse.json({ success: true, rule: created });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || searchParams.get('code');
    if (!id) {
      return NextResponse.json({ error: 'id or code required' }, { status: 400 });
    }
    await DataStore.deletePricingRule(id);
    revalidatePath('/', 'layout');
    revalidatePath('/fiyat-hesaplama');
    return NextResponse.json({ success: true, deleted: id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
