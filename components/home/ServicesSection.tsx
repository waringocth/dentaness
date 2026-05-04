"use client";

import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

// Dental-specific icons from react-icons
import { RiToothLine, RiSparklingLine, RiHeartPulseLine } from "react-icons/ri";
import { TbDental, TbDentalBroken, TbMoodSmile } from "react-icons/tb";
import { FaChild, FaStethoscope } from "react-icons/fa";

// Custom: dental braces — clean 24×24 line-art using currentColor to match other icons
function SmileBracesIcon({ size = 26 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* 4 teeth */}
      <rect x="2"  y="4" width="4" height="13" rx="1.5" />
      <rect x="7"  y="4" width="4" height="13" rx="1.5" />
      <rect x="12" y="4" width="4" height="13" rx="1.5" />
      <rect x="17" y="4" width="4" height="13" rx="1.5" />
      {/* Archwire */}
      <line x1="1" y1="11" x2="23" y2="11" />
      {/* Brackets — small filled squares centered on each tooth */}
      <rect x="3"   y="9.5" width="2" height="3" rx="0.4" fill="currentColor" stroke="none" />
      <rect x="8"   y="9.5" width="2" height="3" rx="0.4" fill="currentColor" stroke="none" />
      <rect x="13"  y="9.5" width="2" height="3" rx="0.4" fill="currentColor" stroke="none" />
      <rect x="18"  y="9.5" width="2" height="3" rx="0.4" fill="currentColor" stroke="none" />
      {/* Bottom gum line */}
      <path d="M2 17 Q6 20 12 19 Q18 20 22 17" />
    </svg>
  );
}

const services = [
  {
    slug: "implant-tedavisi",
    title: "İmplant Tedavisi",
    description:
      "Eksik dişlerinize kalıcı ve doğal görünümlü çözüm. Titanyum implantlarla güçlü, sağlıklı gülüşe kavuşun.",
    Icon: TbDental,
    color: "teal",
  },
  {
    slug: "estetik-dis-hekimligi",
    title: "Estetik Diş Hekimliği",
    description:
      "Diş beyazlatma, laminat veneer ve zirkonyum kron ile hayalinizdeki gülüşe ulaşın.",
    Icon: RiSparklingLine,
    color: "amber",
  },
  {
    slug: "ortodonti",
    title: "Ortodonti",
    description:
      "İnvisalign şeffaf plak ve diş teli tedavisiyle dişlerinizi hizalayın, gülüşünüzü mükemmelleştirin.",
    Icon: SmileBracesIcon,
    color: "teal",
  },
  {
    slug: "cocuk-dis-hekimligi",
    title: "Çocuk Diş Hekimliği",
    description:
      "Çocuğunuzun diş gelişimini sağlıklı tamamlaması için eğlenceli, korkusuz bir klinik ortamı.",
    Icon: FaChild,
    color: "pink",
  },
  {
    slug: "agiz-cene-cerrahisi",
    title: "Ağız Çene Cerrahisi",
    description:
      "Gömülü yirmilik diş, kist operasyonu ve çene cerrahisinde uzman ekibimizle güvenli tedavi.",
    Icon: FaStethoscope,
    color: "teal",
  },
  {
    slug: "gulus-tasarimi",
    title: "Gülüş Tasarımı",
    description:
      "Hollywood Smile ve kişiye özel gülüş tasarımıyla yüzünüzün en güzel versiyonuna ulaşın.",
    Icon: TbMoodSmile,
    color: "amber",
  },
  {
    slug: "bruksizm-tedavisi",
    title: "Bruksizm Tedavisi",
    description:
      "Diş gıcırdatma sorununa gece plağı ve botoks tedavisiyle kalıcı çözüm.",
    Icon: TbDentalBroken,
    color: "indigo",
  },
  {
    slug: "diseti-hastaliklari",
    title: "Dişeti Hastalıkları",
    description:
      "Gingivitis ve periodontitis tedavileriyle sağlıklı diş etleri, sağlam dişler.",
    Icon: RiHeartPulseLine,
    color: "rose",
  },
  {
    slug: "kanal-tedavisi",
    title: "Kanal Tedavisi",
    description:
      "Modern rotary sistem ve ağrısız tekniklerle enfekte dişinizi kurtarıyoruz.",
    Icon: RiToothLine,
    color: "teal",
  },
];

const colorMap: Record<string, string> = {
  teal: "bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white",
  amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white",
  pink: "bg-pink-50 text-pink-600 group-hover:bg-pink-500 group-hover:text-white",
  indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white",
  rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white",
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="hizmetlerimiz"
      className="py-20 md:py-28 bg-white"
      aria-label="Hizmetlerimiz"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            Hizmetlerimiz
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
            Kapsamlı Diş{" "}
            <span className="text-teal-600">Tedavi Çözümleri</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Bahçeşehir Dentaness olarak, sağlıklı ve estetik gülüşler için geniş
            bir hizmet yelpazesi sunuyoruz. Her tedavide size en iyisini
            hedefliyoruz.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => {
            const { Icon } = service;
            const iconClass = colorMap[service.color] || colorMap["teal"];

            return (
              <motion.div
                key={service.slug}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="group flex flex-col h-full bg-white border border-slate-100 hover:border-teal-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${iconClass}`}
                  >
                    <Icon size={26} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-teal-700 transition-colors mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-sm leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center gap-1 mt-4 text-teal-600 text-sm font-semibold group-hover:gap-2 transition-all">
                    Detaylı İncele <ArrowRight size={16} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
