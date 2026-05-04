"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "905011070210";
const PHONE_NUMBER = "+905011070210";
const WHATSAPP_MESSAGE =
  "Merhaba, Dentaness Bahçeşehir hakkında bilgi almak istiyorum.";

export default function FloatingCTAs() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* Phone button */}
      <motion.a
        href={`tel:${PHONE_NUMBER}`}
        id="floating-phone-btn"
        aria-label="Hemen Ara"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 180, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{ willChange: "transform, opacity" }}
        className="flex items-center gap-2 px-4 py-3 bg-teal-600 text-white text-sm font-semibold rounded-full shadow-lg hover:bg-teal-700 transition-colors"
      >
        <Phone size={18} />
        <span className="hidden sm:inline">Hemen Ara</span>
      </motion.a>

      {/* WhatsApp button */}
      <motion.a
        href={whatsappUrl}
        id="floating-whatsapp-btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile İletişim"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.0, type: "spring", stiffness: 180, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{ willChange: "transform, opacity" }}
        className="relative flex items-center gap-2 px-4 py-3 bg-green-500 text-white text-sm font-semibold rounded-full shadow-lg hover:bg-green-600 transition-colors"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40" />
        <MessageCircle size={20} fill="white" />
        <span className="hidden sm:inline relative">WhatsApp</span>
      </motion.a>
    </div>
  );
}
