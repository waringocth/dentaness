"use client";

import { useState } from "react";
import AdminTable from "./AdminTable";
import AdminMedia from "./AdminMedia";
import { Calendar as CalendarIcon, Image as ImageIcon } from "lucide-react";

export default function AdminWrapper({ initialAppointments, dbError }: { initialAppointments: any[], dbError: boolean }) {
  const [tab, setTab] = useState<"appointments" | "media">("appointments");

  return (
    <div>
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setTab("appointments")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${tab === "appointments" ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
        >
          <CalendarIcon size={20} />
          Randevu Yönetimi
        </button>
        <button 
          onClick={() => setTab("media")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${tab === "media" ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
        >
          <ImageIcon size={20} />
          İçerik Yönetimi
        </button>
      </div>

      {tab === "appointments" ? (
        <AdminTable initialAppointments={initialAppointments} dbError={dbError} />
      ) : (
        <AdminMedia />
      )}
    </div>
  );
}
