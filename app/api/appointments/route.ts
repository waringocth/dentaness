import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as z from "zod";

const bookingSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(10),
  serviceType: z.string().min(1),
  appointmentDate: z.string().min(1),
  appointmentTime: z.string().min(1),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = bookingSchema.parse(body);

    const appointment = await prisma.appointment.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        serviceType: data.serviceType,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        status: "PENDING",
        notes: data.notes,
      },
    });

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error("Booking POST error:", error);
    return NextResponse.json(
      { success: false, message: "Geçersiz veri veya sunucu hatası" },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ success: true, appointments });
  } catch (error) {
    console.error("Booking GET error:", error);
    return NextResponse.json(
      { success: false, message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
