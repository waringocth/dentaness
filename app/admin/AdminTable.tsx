"use client";

import { useState, useEffect, useRef } from "react";
import type { Appointment } from "@prisma/client";
import { Check, X, Loader2, Bell, BellOff } from "lucide-react";
import useSWR from "swr";

interface AdminTableProps {
  initialAppointments: Appointment[];
  dbError?: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json()).then(data => {
  if (data.success === false) throw new Error(data.message);
  return data.appointments || [];
});

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
  const prevCountRef = useRef(initialAppointments.length);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
        return <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Onaylandı</span>;
      case "CANCELLED":
        return <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">İptal Edildi</span>;
      default:
        return <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Bekliyor</span>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={requestPermissions}
          disabled={notificationsEnabled}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            notificationsEnabled 
              ? "bg-teal-100 text-teal-700 opacity-80 cursor-default" 
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {notificationsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
          {notificationsEnabled ? "Bildirimler Açık" : "🔔 Tarayıcı Bildirimlerine İzin Ver"}
        </button>
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
                <th className="px-6 py-4">Kayıt Zamanı</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    Henüz randevu talebi bulunmuyor.
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {appointment.firstName} {appointment.lastName}
                    </td>
                    <td className="px-6 py-4">{appointment.phone}</td>
                    <td className="px-6 py-4">{appointment.serviceType}</td>
                    <td className="px-6 py-4 font-medium">
                      {appointment.appointmentDate} <br />
                      <span className="text-slate-400 text-xs">{appointment.appointmentTime}</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(appointment.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(appointment.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
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
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="İptal Et"
                              >
                                <X size={18} />
                              </button>
                            )}
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

