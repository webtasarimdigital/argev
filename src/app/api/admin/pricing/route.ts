import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';

export async function GET() {
  const rules = await DataStore.getPricingRules();
  return NextResponse.json(rules);
}

export async function PATCH(req: NextRequest) {
  try {
    const updatedRule = await req.json();
    await DataStore.updatePricingRule(updatedRule);
    return NextResponse.json({ success: true, rule: updatedRule });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
