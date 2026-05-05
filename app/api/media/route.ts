import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const media = await prisma.siteMedia.findMany();
    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { sectionKey, imageUrl } = await req.json();
    const media = await prisma.siteMedia.upsert({
      where: { sectionKey },
      update: { imageUrl },
      create: { sectionKey, imageUrl },
    });
    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save media' }, { status: 500 });
  }
}
