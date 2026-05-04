"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Calendar, CheckCircle, Loader2 } from "lucide-react";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceOptions = [
  "Hizmet Seçiniz",
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

export default function AppointmentModal({
  isOpen,
  onClose,
}: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Hizmet Seçiniz",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Ad soyad zorunludur.";
    if (!formData.phone.trim()) newErrors.phone = "Telefon numarası zorunludur.";
    else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone))
      newErrors.phone = "Geçerli bir telefon numarası giriniz.";
    if (formData.service === "Hizmet Seçiniz")
      newErrors.service = "Lütfen bir hizmet seçiniz.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    /**
     * TODO: Backend Integration Point
     * Replace the setTimeout below with an actual API call, e.g.:
     * await fetch('/api/appointments', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify(formData),
     * });
     *
     * Also integrate with Google Ads conversion tracking:
     * window.gtag('event', 'form_submit', { event_category: 'appointment' });
     */
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSuccess(true);
    setFormData({ name: "", phone: "", service: "Hizmet Seçiniz", message: "" });
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-4 top-[50%] -translate-y-[50%] z-[70] max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-teal-gradient px-6 py-5 relative">
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
            <div className="p-6">
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="modal-name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Adınız ve soyadınız"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        errors.name
                          ? "border-red-300 bg-red-50"
                          : "border-slate-200 bg-slate-50 focus:border-teal-500 focus:bg-white"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="modal-phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="0532 123 45 67"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        errors.phone
                          ? "border-red-300 bg-red-50"
                          : "border-slate-200 bg-slate-50 focus:border-teal-500 focus:bg-white"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Hizmet *
                    </label>
                    <select
                      id="modal-service"
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all appearance-none ${
                        errors.service
                          ? "border-red-300 bg-red-50"
                          : "border-slate-200 bg-slate-50 focus:border-teal-500 focus:bg-white"
                      }`}
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-500 text-xs mt-1">{errors.service}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Mesajınız (İsteğe bağlı)
                    </label>
                    <textarea
                      id="modal-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tedaviniz hakkında kısa bilgi verebilirsiniz..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-teal-500 focus:bg-white text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    id="modal-submit-btn"
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-all text-sm"
                  >
                    {isLoading ? (
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

                  <p className="text-center text-xs text-slate-400">
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
        </>
      )}
    </AnimatePresence>
  );
}
