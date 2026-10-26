import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';

import { revalidatePath } from 'next/cache';

export async function GET() {
  const services = await DataStore.getServices();
  return NextResponse.json(services);
}

export async function PATCH(req: NextRequest) {
  try {
    const updatedService = await req.json();
    await DataStore.updateService(updatedService);
    revalidatePath('/', 'layout');
    revalidatePath('/hizmetler');
    revalidatePath('/fiyat-hesaplama');
    return NextResponse.json({ success: true, service: updatedService });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
