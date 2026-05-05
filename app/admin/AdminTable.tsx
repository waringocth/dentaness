"use client";

import { useState, useEffect, useRef } from "react";
import type { Appointment } from "@prisma/client";
import { Check, X, Loader2, Bell, BellOff, Edit2, Save, Trash2, Download, MessageCircle, Search, Calendar as CalendarIcon, CalendarDays, List, ChevronLeft, ChevronRight, Phone } from "lucide-react";
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

  // Calendar View State
  const [view, setView] = useState<"list" | "calendar">("list");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const formatYYYYMMDD = (d: Date) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let startingDayOfWeek = firstDay.getDay() - 1;
    if (startingDayOfWeek === -1) startingDayOfWeek = 6;

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

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

      <div className="flex border-b border-slate-200 mb-6">
        <button
          onClick={() => setView("list")}
          className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            view === "list" ? "border-teal-600 text-teal-600" : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <List size={18} />
          Liste Görünümü
        </button>
        <button
          onClick={() => setView("calendar")}
          className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            view === "calendar" ? "border-teal-600 text-teal-600" : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <CalendarDays size={18} />
          Takvim Görünümü
        </button>
      </div>

      {dbError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
          <X size={18} />
          Veritabanı bağlantısı kurulamadı. Lütfen daha sonra tekrar deneyin veya sistem yöneticisiyle iletişime geçin.
        </div>
      )}

      {view === "list" ? (
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
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => setCurrentMonth(new Date())} className="px-4 py-2 text-sm font-medium hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                Bugün
              </button>
              <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
            {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map(day => (
              <div key={day} className="bg-slate-50 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                {day}
              </div>
            ))}
            
            {getDaysInMonth(currentMonth).map((day, i) => {
              const dayAppointments = day ? filteredAppointments.filter(a => a.appointmentDate === formatYYYYMMDD(day)) : [];
              const isToday = day && formatYYYYMMDD(day) === formatYYYYMMDD(new Date());
              
              return (
                <div key={i} className={`min-h-[120px] bg-white p-2 transition-colors ${day ? "hover:bg-slate-50" : ""}`}>
                  {day && (
                    <>
                      <div className={`text-right text-sm font-medium mb-2 ${isToday ? "text-teal-600 font-bold" : "text-slate-400"}`}>
                        {isToday ? <span className="bg-teal-100 w-7 h-7 inline-flex items-center justify-center rounded-full">{day.getDate()}</span> : day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayAppointments.map(app => (
                          <div 
                            key={app.id} 
                            onClick={() => setSelectedAppointment(app)}
                            className={`text-xs p-1.5 rounded border cursor-pointer truncate ${
                              app.status === "APPROVED" ? "bg-green-50 border-green-200 text-green-700" :
                              app.status === "CANCELLED" ? "bg-red-50 border-red-200 text-red-700" :
                              "bg-yellow-50 border-yellow-200 text-yellow-700"
                            }`}
                            title={`${app.appointmentTime} - ${app.firstName} ${app.lastName}`}
                          >
                            <span className="font-bold">{app.appointmentTime}</span> {app.firstName}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedAppointment(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-lg font-bold text-slate-800">Randevu Detayı</h3>
              <button onClick={() => setSelectedAppointment(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hasta Bilgileri</p>
                <p className="font-semibold text-slate-800 text-lg">{selectedAppointment.firstName} {selectedAppointment.lastName}</p>
                <a href={`tel:${selectedAppointment.phone}`} className="text-teal-600 hover:underline flex items-center gap-2 mt-1 font-medium">
                  <Phone size={16} /> {selectedAppointment.phone}
                </a>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tarih</p>
                  <p className="font-medium text-slate-700">{selectedAppointment.appointmentDate}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Saat</p>
                  <p className="font-medium text-slate-700">{selectedAppointment.appointmentTime}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">İşlem Türü</p>
                <p className="font-medium text-slate-700">{selectedAppointment.serviceType}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Durum</p>
                <div className="mt-1">{getStatusBadge(selectedAppointment.status)}</div>
              </div>

              {selectedAppointment.notes && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Notlar</p>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">{selectedAppointment.notes}</p>
                </div>
              )}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2 justify-end shrink-0">
              <button onClick={() => setSelectedAppointment(null)} className="px-5 py-2 font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

