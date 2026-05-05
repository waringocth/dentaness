import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();
    const doctor = await prisma.doctor.update({
      where: { id },
      data: {
        name: data.name,
        specialization: data.specialization,
        bio: data.bio,
        specialties: data.specialties,
        education: data.education,
        ...(data.imageUrl ? { imageUrl: data.imageUrl } : {}),
      },
    });

    // Revalidate the public doctors page immediately
    revalidatePath('/doktorlarimiz');

    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update doctor' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.doctor.delete({ where: { id } });

    // Revalidate the public doctors page immediately
    revalidatePath('/doktorlarimiz');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 });
  }
}
