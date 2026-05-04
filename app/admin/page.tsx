import { prisma } from "@/lib/prisma";
import { Appointment } from "@prisma/client";
import AdminTable from "./AdminTable";
import { LogOut } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let appointments: Appointment[] = [];
  let dbError = false;

  try {
    appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    dbError = true;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dentaness Yönetim Paneli</h1>
          <p className="text-sm text-slate-500">Gelen randevu taleplerini buradan yönetebilirsiniz.</p>
        </div>
        {/* Simple logout trick by deleting cookie and refreshing */}
        <button 
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {/* We will handle logout in a client script or just instruct the user */}
          <LogOut size={16} />
          Paneli Kapat
        </button>
      </header>
      
      <main className="max-w-7xl mx-auto p-8">
        <AdminTable initialAppointments={appointments} dbError={dbError} />
      </main>
    </div>
  );
}
