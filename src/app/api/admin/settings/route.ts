import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';

export async function GET() {
  const settings = await DataStore.getSiteSettings();
  return NextResponse.json(settings);
}

export async function PATCH(req: NextRequest) {
  try {
    const updatedSettings = await req.json();
    await DataStore.updateSiteSettings(updatedSettings);
    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
