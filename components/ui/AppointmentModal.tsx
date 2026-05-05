"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Calendar, CheckCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceOptions = [
  "İmplant Tedavisi",
  "Estetik Diş Hekimliği",
  "Ortodonti",
  "Çocuk Diş Hekimliği",
  "Ağız Çene Cerrahisi",
  "Gülüş Tasarımı",
  "Bruksizm Tedavisi",
  "Dişeti Hastalıkları",
  "Kanal Tedavisi",
  "Genel Muayene",
  "Diğer",
];

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const bookingSchema = z.object({
  firstName: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
  phone: z.string().regex(/^[\d\s\-\+\(\)]{10,}$/, "Geçerli bir telefon numarası giriniz"),
  serviceType: z.string().min(1, "Lütfen bir hizmet seçiniz"),
  appointmentDate: z.string().min(1, "Lütfen bir tarih seçiniz"),
  appointmentTime: z.string().min(1, "Lütfen bir saat seçiniz"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function AppointmentModal({
  isOpen,
  onClose,
}: AppointmentModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      serviceType: "",
      appointmentDate: "",
      appointmentTime: "",
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    try {
      // Send data to our API route
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Bir hata oluştu");
      }

      // Track conversion if gtag is present
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "form_submit", {
          event_category: "appointment",
        });
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Booking error:", error);
      alert("Randevu talebiniz alınırken bir hata oluştu. Lütfen telefon ile iletişime geçiniz.");
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    reset();
    onClose();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center pointer-events-none px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-[9999] w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-teal-gradient px-6 py-5 relative shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Calendar className="text-white" size={22} />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">
                    Hemen Randevu Al
                  </h2>
                  <p className="text-teal-100 text-xs mt-0.5">
                    En kısa sürede sizi arayacağız
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors"
                aria-label="Kapat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-teal-600" size={36} />
                  </div>
                  <h3 className="text-slate-800 font-bold text-xl mb-2">
                    Talebiniz Alındı!
                  </h3>
                  <p className="text-slate-500 text-sm mb-6">
                    En kısa sürede kliniğimiz sizi arayacaktır. Acil durumlar
                    için hemen arayabilirsiniz.
                  </p>
                  <a
                    href="tel:+905011070210"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-xl font-semibold text-sm hover:bg-teal-700 transition-colors"
                  >
                    <Phone size={16} />
                    (0501) 107 02 10
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                        Ad *
                      </label>
                      <input
                        type="text"
                        {...register("firstName")}
                        placeholder="Adınız"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                          errors.firstName
                            ? "border-red-300 bg-red-50"
                            : "border-slate-200 bg-slate-50 focus:border-teal-500 focus:bg-white"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                        Soyad *
                      </label>
                      <input
                        type="text"
                        {...register("lastName")}
                        placeholder="Soyadınız"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                          errors.lastName
                            ? "border-red-300 bg-red-50"
                            : "border-slate-200 bg-slate-50 focus:border-teal-500 focus:bg-white"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      placeholder="0532 123 45 67"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        errors.phone
                          ? "border-red-300 bg-red-50"
                          : "border-slate-200 bg-slate-50 focus:border-teal-500 focus:bg-white"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                      İşlem Türü *
                    </label>
                    <select
                      {...register("serviceType")}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all appearance-none text-slate-900 ${
                        errors.serviceType
                          ? "border-red-300 bg-red-50"
                          : "border-slate-200 bg-slate-50 focus:border-teal-500 focus:bg-white"
                      }`}
                    >
                      <option value="" className="text-slate-900">Seçiniz...</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="text-slate-900">
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.serviceType && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.serviceType.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                        Tarih *
                      </label>
                      <input
                        type="date"
                        min={today}
                        {...register("appointmentDate")}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all text-slate-900 ${
                          errors.appointmentDate
                            ? "border-red-300 bg-red-50"
                            : "border-slate-200 bg-slate-50 focus:border-teal-500 focus:bg-white"
                        }`}
                      />
                      {errors.appointmentDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.appointmentDate.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                        Saat *
                      </label>
                      <select
                        {...register("appointmentTime")}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all appearance-none text-slate-900 ${
                          errors.appointmentTime
                            ? "border-red-300 bg-red-50"
                            : "border-slate-200 bg-slate-50 focus:border-teal-500 focus:bg-white"
                        }`}
                      >
                        <option value="" className="text-slate-900">Seçiniz...</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time} className="text-slate-900">
                            {time}
                          </option>
                        ))}
                      </select>
                      {errors.appointmentTime && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.appointmentTime.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-all text-sm mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <Calendar size={18} />
                        Randevu Talep Et
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-400 mt-2">
                    Veya hemen arayın:{" "}
                    <a
                      href="tel:+905011070210"
                      className="text-teal-600 font-semibold hover:underline"
                    >
                      (0501) 107 02 10
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
