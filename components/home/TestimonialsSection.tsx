"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ayşe K.",
    treatment: "Hollywood Smile",
    stars: 5,
    text: "Dentaness'te Hollywood Smile yaptırdım ve sonuç inanılmaz! Hekimler son derece profesyonel ve ilgili. Klinik son derece hijyenik ve modern. Kesinlikle tavsiye ediyorum!",
  },
  {
    id: 2,
    name: "Mehmet Y.",
    treatment: "İmplant Tedavisi",
    stars: 5,
    text: "İmplant tedavisi için çok kaygılıydım ama Dentaness ekibi tüm süreci çok rahat geçirmemi sağladı. Ağrısız bir deneyimdi ve sonuçtan çok memnunum. Teşekkürler!",
  },
  {
    id: 3,
    name: "Fatma B.",
    treatment: "Ortodonti (İnvisalign)",
    stars: 5,
    text: "Yetişkin olarak şeffaf plak tedavisine başlamaktan çekiniyordum. Doktorlarımız beni çok iyi yönlendirdi. 8 ayda inanılmaz bir değişim yaşadım. Gülümsemeyi öğrendim!",
  },
  {
    id: 4,
    name: "Can D.",
    treatment: "Diş Beyazlatma",
    stars: 5,
    text: "Diş beyazlatma için geldim, hem süreç hem de sonuç mükemmeldi. Klinik çok temiz, personel çok nazik. Bahçeşehir'de en iyi diş kliniği diyebilirim.",
  },
  {
    id: 5,
    name: "Selin A.",
    treatment: "Çocuk Diş Hekimliği",
    stars: 5,
    text: "Kızım diş hekiminden çok korkuyordu ama Dentaness'teki çocuk doktoru onu anında rahatlatmayı başardı. Artık diş kontrolüne gitmeyi seviyor. Harika bir ekip!",
  },
];

export default function TestimonialsSection() {

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-700/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 text-teal-200 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            Hasta Görüşleri
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Mutlu Hastalarımız{" "}
            <span className="text-teal-300">Anlatıyor</span>
          </h2>
          <p className="text-teal-200/80 max-w-xl mx-auto">
            Bahçeşehir Dentaness&apos;te tedavi olan hastalarımızın deneyimleri
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col h-full"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array(testimonial.stars)
                  .fill(0)
                  .map((_, idx) => (
                    <Star
                      key={idx}
                      size={18}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
              </div>

              {/* Quote */}
              <p className="text-white leading-relaxed mb-8 italic flex-grow text-sm">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Patient */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-teal-300 text-xs">
                    {testimonial.treatment}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
