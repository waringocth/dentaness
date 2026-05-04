"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Calendar, MessageCircle } from "lucide-react";
import AppointmentModal from "@/components/ui/AppointmentModal";

export default function CTABannerSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-slate-900 to-teal-900">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              Gülüşünüz İçin İlk Adım
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Diş Sağlığınızda Mükemmeliyet,
              <br />
              <span className="text-teal-400">Gülüşünüzde Dentaness Farkı</span>
            </h2>

            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Bahçeşehir Dentaness, diş sağlığınızı korurken estetik açıdan
              mükemmel sonuçlar elde etmenizi sağlar. Uzman kadromuz ve son
              teknoloji cihazlarımızla, her adımda güvenli ve etkili çözümler
              sunuyoruz.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setModalOpen(true)}
                id="cta-banner-randevu-btn"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-bold text-base rounded-xl shadow-lg shadow-teal-900/50 transition-all"
              >
                <Calendar size={20} />
                Hemen Randevu Al
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="tel:+905011070210"
                id="cta-banner-call-btn"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-xl border border-white/20 transition-all"
              >
                <Phone size={20} />
                (0501) 107 02 10
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/905011070210?text=Merhaba%2C%20randevu%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                id="cta-banner-whatsapp-btn"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold text-base rounded-xl transition-all"
              >
                <MessageCircle size={20} />
                WhatsApp
              </motion.a>
            </div>

            {/* Address */}
            <p className="mt-10 text-slate-400 text-sm">
              📍 Bahçeşehir 1. Kısım, Başöğretmen Cd. No:5 D:10A, 34488 Başakşehir/İstanbul
            </p>
          </motion.div>
        </div>
      </section>

      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
