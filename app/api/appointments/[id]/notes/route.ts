import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { notes } = await req.json();
    const { id } = await params;

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { notes },
    });

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error("Update notes error:", error);
    return NextResponse.json(
      { success: false, message: "Not güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}
