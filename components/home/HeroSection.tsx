"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Phone, Calendar } from "lucide-react";
import AppointmentModal from "@/components/ui/AppointmentModal";

const slides = [
  {
    id: 1,
    imageUrl: "/images/hero-1.jpeg",
    heading: "DentaNess Bahçeşehir",
    subheading:
      "Uzman diş hekimleri ve son teknoloji ekipmanlarıyla sağlıklı gülüşler. Güvenilir, konforlu ve hijyenik ortamımızda ağız ve diş sağlığınız emin ellerde!",
    cta: "Hemen Randevu Al",
  },
  {
    id: 2,
    imageUrl: "/images/hero-2.jpeg",
    heading: "Parlak Dişler, Mutlu Çocuklar",
    subheading:
      "Ömür boyu gülümse! Sağlıklı ve estetik gülüşler için uzman kadrosuyla yanınızda. Modern teknolojilerle donatılmış kliniğimizde konforlu ve güvenilir diş tedavileri.",
    cta: "Çocuk Diş Hekimliği",
  },
  {
    id: 3,
    imageUrl: "/images/hero-3.jpeg",
    heading: "Sağlıklı ve Estetik Gülümseme",
    subheading:
      "Uzman diş hekimleriyle doğal ve güzel gülüşler tasarlıyoruz. Modern tedavi yöntemlerimizle diş sağlığınızı koruyarak estetik çözümler sunuyoruz.",
    cta: "Gülüş Tasarımı",
  },
];

const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <>
      <section
        className="relative w-full min-h-[90vh] md:min-h-screen flex items-center overflow-hidden"
        aria-label="Hero bölümü"
      >
        {/* Background Images — always mounted, GPU-composited crossfade */}
        {slides.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: i === 0 ? 1 : 0 }}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${s.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              willChange: "opacity",
            }}
          />
        ))}

        {/* Overlay Layer 1: base dimmer — keeps bright clinic photos from bleeding */}
        <div className="absolute inset-0 z-10 bg-black/35" />
        {/* Overlay Layer 2: strong left-side gradient — darkens text area heavily */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
        {/* Overlay Layer 3: bottom vignette */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${slide.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full mb-6"
              >
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Bahçeşehir&apos;in En Modern Diş Kliniği
              </motion.div>
            </AnimatePresence>

            {/* Heading */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`h1-${slide.id}`}
                custom={0}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
                style={{ textShadow: "0 2px 16px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)" }}
              >
                {slide.heading}
              </motion.h1>
            </AnimatePresence>

            {/* Subheading */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${slide.id}`}
                custom={1}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="text-lg text-slate-200 leading-relaxed mb-10 max-w-xl"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,1)" }}
              >
                {slide.subheading}
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => setModalOpen(true)}
                id="hero-randevu-btn"
                className="flex items-center gap-2 px-7 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold text-base rounded-xl shadow-lg shadow-teal-900/40 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <Calendar size={20} />
                Hemen Randevu Al
              </button>
              <a
                href="tel:+905011070210"
                id="hero-call-btn"
                className="flex items-center gap-2 px-7 py-4 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-bold text-base rounded-xl border border-white/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Phone size={20} />
                (0501) 107 02 10
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="mt-12 flex flex-wrap gap-6"
            >
              {[
                { value: "1000+", label: "Mutlu Hasta" },
                { value: "40+", label: "Uzman Kadro" },
                { value: "9+", label: "Hizmet" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-extrabold text-teal-400">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-xl flex items-center justify-center transition-all hover:scale-110"
          aria-label="Önceki slayt"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-xl flex items-center justify-center transition-all hover:scale-110"
          aria-label="Sonraki slayt"
        >
          <ChevronRight size={22} />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-teal-400" : "w-3 bg-white/40"
              }`}
              aria-label={`Slayt ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
