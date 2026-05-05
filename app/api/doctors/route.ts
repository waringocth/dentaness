import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(doctors);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const doctor = await prisma.doctor.create({ data });
    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
  }
}
