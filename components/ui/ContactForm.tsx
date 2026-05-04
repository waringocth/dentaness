"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    /**
     * TODO: Backend Integration Point
     * Replace the timeout below with an actual API call:
     * await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) });
     *
     * Also add Google Ads conversion tracking:
     * window.gtag('event', 'form_submit', { event_category: 'contact' });
     */
    await new Promise((r) => setTimeout(r, 1500));

    setLoading(false);
    setSuccess(true);
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-teal-600" size={40} />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          Mesajınız Alındı!
        </h3>
        <p className="text-slate-500">
          En kısa sürede sizinle iletişime geçeceğiz.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
            Ad Soyad *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Adınız soyadınız"
            className="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm outline-none focus:border-teal-500 focus:bg-white transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
            Telefon *
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="0532 123 45 67"
            className="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm outline-none focus:border-teal-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
          E-posta
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="ornek@email.com"
          className="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm outline-none focus:border-teal-500 focus:bg-white transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
          Mesajınız *
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Mesajınızı buraya yazın..."
          className="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm outline-none focus:border-teal-500 focus:bg-white transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full py-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-70 text-white font-bold rounded-xl transition-all"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Gönderiliyor...
          </>
        ) : (
          <>
            <Send size={20} />
            Mesaj Gönder
          </>
        )}
      </button>
    </form>
  );
}
