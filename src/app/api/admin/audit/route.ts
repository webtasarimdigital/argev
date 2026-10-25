import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';

export async function GET() {
  const logs = await DataStore.getAuditLogs();
  return NextResponse.json(logs);
}
