import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';

export async function GET() {
  try {
    const leads = await DataStore.getLeads();
    return NextResponse.json(leads);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status, adminNotes } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'ID ve durum zorunludur' }, { status: 400 });
    }
    const updated = await DataStore.updateLeadStatus(id, status, adminNotes);
    if (!updated) {
      return NextResponse.json({ error: 'Başvuru bulunamadı' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
