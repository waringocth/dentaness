"use client";

import { useState, useEffect, useRef } from "react";
import type { Appointment } from "@prisma/client";
import { Check, X, Loader2, Bell, BellOff, Edit2, Save, Trash2, Download, MessageCircle, Search } from "lucide-react";
import useSWR from "swr";

interface AdminTableProps {
  initialAppointments: Appointment[];
  dbError?: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json()).then(data => {
  if (data.success === false) throw new Error(data.message);
  return data.appointments || [];
});

function NoteCell({ appointmentId, initialNote }: { appointmentId: string, initialNote: string | null }) {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(initialNote || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/appointments/${appointmentId}/notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: note }),
      });
      if (res.ok) {
        setIsEditing(false);
      } else {
        alert("Not kaydedilirken bir hata oluştu.");
      }
    } catch (error) {
      alert("Bağlantı hatası.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 min-w-[200px]">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:border-teal-500 outline-none resize-none"
          rows={2}
          autoFocus
        />
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
        </button>
      </div>
    );
  }

  return (
    <div 
      className="group flex items-start gap-2 min-w-[200px] cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <p className="text-xs text-slate-500 italic max-w-[180px] truncate">
        {note || "Not ekle..."}
      </p>
      <Edit2 size={12} className="text-slate-300 group-hover:text-teal-500 transition-colors mt-0.5" />
    </div>
  );
}

export default function AdminTable({ initialAppointments, dbError = false }: AdminTableProps) {
  const { data: appointments = initialAppointments, mutate } = useSWR<Appointment[]>(
    "/api/appointments",
    fetcher,
    {
      fallbackData: initialAppointments,
      refreshInterval: 10000,
      refreshWhenHidden: true,
      revalidateOnFocus: true,
    }
  );

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const prevCountRef = useRef(initialAppointments.length);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // CRM İstatistikleri
  const stats = {
    total: appointments.length,
    today: appointments.filter(a => {
      const todayStr = new Date().toISOString().split('T')[0];
      return new Date(a.createdAt).toISOString().includes(todayStr);
    }).length,
    approved: appointments.filter(a => a.status === "APPROVED").length,
    pending: appointments.filter(a => a.status === "PENDING").length,
  };

  // Arama filtresi
  const filteredAppointments = appointments.filter(a => 
    `${a.firstName} ${a.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.phone.includes(searchTerm)
  );

  const exportToCSV = () => {
    const headers = ["İsim", "Soyisim", "Telefon", "İşlem", "Tarih", "Saat", "Durum", "Notlar", "Kayıt"];
    const rows = filteredAppointments.map(a => [
      a.firstName,
      a.lastName,
      a.phone,
      a.serviceType,
      a.appointmentDate,
      a.appointmentTime,
      a.status,
      a.notes || "",
      new Date(a.createdAt).toLocaleString("tr-TR")
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `randevular_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu randevuyu silmek istediğinize emin misiniz?")) return;
    
    setLoadingId(id);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        mutate();
      } else {
        alert("Randevu silinirken bir hata oluştu.");
      }
    } catch (error) {
      alert("Bağlantı hatası.");
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    audioRef.current = new Audio("/sounds/notification.mp3");
    if (typeof window !== "undefined" && Notification.permission === "granted") {
      setNotificationsEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (appointments.length > prevCountRef.current) {
      if (notificationsEnabled) {
        if (audioRef.current) {
          audioRef.current.play().catch((e) => console.log("Audio play failed", e));
        }
        if (Notification.permission === "granted") {
          new Notification("Yeni Randevu!", {
            body: "Kliniğe yeni bir randevu talebi geldi. Lütfen paneli kontrol edin.",
            icon: "/favicon.ico",
          });
        }

        // Başlık yanıp sönme efekti
        const originalTitle = document.title;
        let isFlash = false;
        const flashInterval = setInterval(() => {
          document.title = isFlash ? originalTitle : "!!! YENİ RANDEVU !!!";
          isFlash = !isFlash;
        }, 1000);

        // Kullanıcı sayfaya odaklandığında durdur
        const handleFocus = () => {
          clearInterval(flashInterval);
          document.title = originalTitle;
          window.removeEventListener("focus", handleFocus);
        };
        window.addEventListener("focus", handleFocus);
      }
    }
    prevCountRef.current = appointments.length;
  }, [appointments, notificationsEnabled]);

  const requestPermissions = async () => {
    if (audioRef.current) {
      // Sessiz çalma ile tarayıcı ses kilidini aç
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        audioRef.current!.pause();
        audioRef.current!.currentTime = 0;
        audioRef.current!.volume = 1;
      }).catch(() => {});
    }

    if (typeof window !== "undefined") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setNotificationsEnabled(true);
      } else {
        alert("Bildirim izni reddedildi. Otomatik uyarı alamayacaksınız.");
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        mutate(); // SWR verisini yeniden çek
      } else {
        alert("Durum güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      alert("Bağlantı hatası.");
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <span className="px-2.5 py-1 bg-green-500 text-white rounded-full text-xs font-bold shadow-sm">Onaylandı</span>;
      case "CANCELLED":
        return <span className="px-2.5 py-1 bg-red-600 text-white rounded-full text-xs font-bold shadow-sm">İptal Edildi</span>;
      default:
        return <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Bekliyor</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Bugün Toplam</p>
          <p className="text-2xl font-bold text-slate-800">{stats.today}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-green-500">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Onaylananlar</p>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-yellow-400">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Bekleyenler</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Toplam Kayıt</p>
          <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="İsim veya telefon ile ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-teal-500 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
          >
            <Download size={18} />
            Excel'e Aktar (CSV)
          </button>
          
          <button
            onClick={requestPermissions}
            disabled={notificationsEnabled}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition-all shadow-sm ${
              notificationsEnabled 
                ? "bg-teal-50 text-teal-700 opacity-80 cursor-default" 
                : "bg-teal-600 text-white hover:bg-teal-700"
            }`}
          >
            {notificationsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
            {notificationsEnabled ? "Bildirimler Açık" : "🔔 Sesli Bildirimleri Aç"}
          </button>
        </div>
      </div>

      {dbError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
          <X size={18} />
          Veritabanı bağlantısı kurulamadı. Lütfen daha sonra tekrar deneyin veya sistem yöneticisiyle iletişime geçin.
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">İsim Soyisim</th>
                <th className="px-6 py-4">Telefon</th>
                <th className="px-6 py-4">İşlem</th>
                <th className="px-6 py-4">Tarih / Saat</th>
                <th className="px-6 py-4">Notlar</th>
                <th className="px-6 py-4">Kayıt Zamanı</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                    Kayıt bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appointment) => (
                  <tr 
                    key={appointment.id} 
                    className={`hover:bg-slate-50 transition-colors ${
                      appointment.status === "PENDING" ? "bg-yellow-50/30" : ""
                    }`}
                  >
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {appointment.firstName} {appointment.lastName}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{appointment.phone}</span>
                        <a
                          href={`https://wa.me/${appointment.phone.replace(/\s+/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700"
                          title="WhatsApp'tan Mesaj Gönder"
                        >
                          <MessageCircle size={16} />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700">{appointment.serviceType}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {appointment.appointmentDate} <br />
                      <span className="text-teal-600 text-xs font-bold">{appointment.appointmentTime}</span>
                    </td>
                    <td className="px-6 py-4">
                      <NoteCell appointmentId={appointment.id} initialNote={appointment.notes} />
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                      {new Date(appointment.createdAt).toLocaleString("tr-TR", {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(appointment.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {loadingId === appointment.id ? (
                          <Loader2 size={18} className="animate-spin text-slate-400" />
                        ) : (
                          <>
                            {appointment.status !== "APPROVED" && (
                              <button
                                onClick={() => handleStatusChange(appointment.id, "APPROVED")}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Onayla"
                              >
                                <Check size={18} />
                              </button>
                            )}
                            {appointment.status !== "CANCELLED" && (
                              <button
                                onClick={() => handleStatusChange(appointment.id, "CANCELLED")}
                                className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                title="İptal Et"
                              >
                                <X size={18} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(appointment.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
                              title="Sil"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

