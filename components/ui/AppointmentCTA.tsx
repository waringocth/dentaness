"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import AppointmentModal from "@/components/ui/AppointmentModal";

interface AppointmentCTAProps {
  service?: string;
}

export default function AppointmentCTA({ service }: AppointmentCTAProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-2 w-full py-3 bg-white text-teal-700 hover:bg-teal-50 rounded-xl font-bold text-sm transition-all justify-center"
      >
        <Calendar size={16} />
        Hemen Randevu Al
      </motion.button>

      <AnimatePresence>
        {modalOpen && (
          <AppointmentModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
