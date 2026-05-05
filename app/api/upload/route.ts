import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  if (!request.body) {
    return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
  }

  try {
    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert to webp using sharp
    const optimizedBuffer = await sharp(buffer)
      .webp({ quality: 80 })
      .toBuffer();

    // Replace original extension with .webp
    const webpFilename = filename.replace(/\.[^/.]+$/, "") + ".webp";

    const blob = await put(webpFilename, optimizedBuffer, {
      access: 'public',
      contentType: 'image/webp',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
