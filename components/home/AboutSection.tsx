"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const stats = [
  { value: 1000, suffix: "+", label: "Mutlu Hasta" },
  { value: 40, suffix: "+", label: "Uzman Kadro" },
  { value: 9, suffix: "+", label: "Diş Tedavisi" },
  { value: 5, suffix: " Yıl", label: "Klinik Deneyim" },
];

const values = [
  "Son teknoloji dijital görüntüleme sistemi",
  "Kişiye özel tedavi planları",
  "Hijyenik ve steril tedavi ortamı",
  "Ağrısız anestezi teknikleri",
  "Deneyimli ve uzman hekim kadrosu",
  "Konforlu hasta deneyimi",
];

function CountUp({
  target,
  suffix,
  isInView,
}: {
  target: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="hakkimizda"
      className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            {/* Secondary image (hakkımızda-2) floating on top */}
            <div className="absolute -top-6 -right-6 w-2/5 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl z-10 border-4 border-white">
              <Image
                src="/images/hakkimizda-2.jpeg"
                alt="Dentaness bekleme salonu"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>

            {/* Main image (hakkımızda-1) */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/hakkimizda-1.jpeg"
                alt="Dentaness Bahçeşehir modern diş kliniği"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-card bg-white/90 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-white text-2xl">🦷</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">
                      Bahçeşehir&apos;in En Modern Kliniği
                    </p>
                    <p className="text-xs text-slate-500">
                      Son teknoloji — uzman kadro — konforlu ortam
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating teal accent */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-teal-100 rounded-3xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-amber-100 rounded-2xl -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              Hakkımızda
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6 leading-tight">
              Sağlıklı bir gülüş,{" "}
              <span className="text-teal-600">sağlıklı bir hayat!</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              Gülüşünüz, sadece estetik değil, genel sağlığınızın da bir
              yansımasıdır. Bahçeşehir Dentaness olarak, uzman kadromuz ve
              modern tedavi yöntemlerimizle sağlıklı ve estetik gülüşler
              sunuyoruz.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              Diş sağlığınızı en üst seviyede tutmak için son teknoloji, uzman
              kadro ve hasta odaklı yaklaşımımızla hizmet veriyoruz. Korkmadan,
              güvenle ve konforla tedavi olabileceğiniz bir deneyim sunuyoruz.
            </p>

            {/* Values Checklist */}
            <ul className="space-y-3 mb-10">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-3">
                  <CheckCircle2
                    className="text-teal-600 shrink-0 mt-0.5"
                    size={18}
                  />
                  <span className="text-slate-600 text-sm">{value}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/hakkimizda"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg group"
            >
              Daha Fazla Öğren
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div
          ref={ref}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100"
            >
              <div className="text-4xl font-extrabold text-teal-600 mb-1">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>
              <div className="text-sm text-slate-500 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
