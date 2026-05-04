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
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const prev = () => {
    setAutoPlay(false);
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setAutoPlay(false);
    setCurrent((p) => (p + 1) % testimonials.length);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-700/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
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

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array(testimonials[current].stars)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
              </div>

              {/* Quote */}
              <p className="text-white text-lg leading-relaxed mb-8 italic">
                &quot;{testimonials[current].text}&quot;
              </p>

              {/* Patient */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[current].name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white">
                    {testimonials[current].name}
                  </p>
                  <p className="text-teal-300 text-sm">
                    {testimonials[current].treatment}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setAutoPlay(false);
                    setCurrent(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-teal-300" : "w-3 bg-white/30"
                  }`}
                  aria-label={`Yorum ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                aria-label="Önceki yorum"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                aria-label="Sonraki yorum"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
