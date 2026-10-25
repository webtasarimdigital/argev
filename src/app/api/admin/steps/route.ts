import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';

export async function GET() {
  const steps = await DataStore.getCalculatorSteps();
  return NextResponse.json(steps);
}

export async function PATCH(req: NextRequest) {
  try {
    const updatedStep = await req.json();
    await DataStore.updateCalculatorStep(updatedStep);
    return NextResponse.json({ success: true, step: updatedStep });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
