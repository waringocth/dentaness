"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const tabs = [
  {
    id: "beyazlatma",
    label: "Diş Beyazlatma",
    heading: "DentaNess İle Beyaz Gülüşler",
    content:
      "Zamanla dişlerimizdeki doğal beyazlık azalabilir ve lekeler oluşabilir. Bahçeşehir Dentaness olarak, diş beyazlatma işlemi ile gülüşünüzü aydınlatıyoruz. Uzman hekimlerimiz tarafından uygulanan güvenli ve etkili beyazlatma yöntemleriyle, dişlerinizin doğal beyazlığını geri kazandırıyoruz.",
    imageUrl: "/images/neden-dentaness.jpeg",
    features: [
      "Son teknoloji cihazlar",
      "Konforlu diş tedavisi",
      "Hijyenik ve steril tedavi alanları",
      "Alanında uzman kadromuz",
    ],
  },
  {
    id: "implant",
    label: "İmplant Tedavisi",
    heading: "İmplant Tedavisinde DentaNess",
    content:
      "Diş kayıpları, hem estetik hem de fonksiyonel sorunlara yol açabilir. Bahçeşehir Dentaness olarak, kaybolan dişlerinizin yerine kalıcı ve doğal görünümlü implantlar sunuyoruz. İmplant tedavisi, diş köklerine yerleştirilen titanyum vidalarla sağlıklı ve estetik bir gülüş oluşturur.",
    imageUrl:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=700&q=80",
    features: [
      "Son teknoloji cihazlar",
      "Konforlu diş tedavisi",
      "Hijyenik ve steril tedavi alanları",
      "Alanında uzman kadromuz",
    ],
  },
  {
    id: "ortodonti",
    label: "Ortodonti",
    heading: "Ortodonti'de Bir Adım İleri",
    content:
      "Dişlerinizin düzgün sıralanmaması, estetik ve fonksiyonel sorunlara yol açabilir. Bahçeşehir Dentaness olarak, ortodontik tedavi ile dişlerinizin hizasını düzelterek daha sağlıklı ve estetik bir gülüş elde etmenizi sağlıyoruz.",
    imageUrl:
      "https://images.unsplash.com/photo-1588776814546-1ffbb6c6499b?w=700&q=80",
    features: [
      "İnvisalign şeffaf plak",
      "Metal ve seramik teli",
      "Dijital ortodonti planlaması",
      "Hem çocuk hem yetişkin",
    ],
  },
  {
    id: "dolgu",
    label: "Diş Dolgusu",
    heading: "Diş Dolgusu ve Estetik Uygulamalar",
    content:
      "Dişlerdeki çürükler veya estetik sorunlar, gülüşünüzü etkileyebilir. Bahçeşehir Dentaness olarak, diş dolgusu ve estetik uygulamalar ile dişlerinizin sağlığını ve görünümünü iyileştiriyoruz. Estetik dolgular, doğal diş renginizle uyumlu malzemelerle yapılır.",
    imageUrl:
      "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=700&q=80",
    features: [
      "Kompozit (beyaz) dolgu",
      "Doğal diş rengiyle uyumlu",
      "Tek seansta tamamlanabilir",
      "Ağrısız uygulama",
    ],
  },
  {
    id: "lamine",
    label: "Lamine & Zirkonyum",
    heading: "Lamine ve Zirkonyum Diş",
    content:
      "Gülüşünüzü estetik açıdan mükemmelleştirmek için Bahçeşehir Dentaness olarak, lamine ve zirkonyum diş uygulamaları sunuyoruz. Lamine dişler, ince porselen kaplamalarla dişlerinizin şekli ve rengi üzerine yapılan estetik bir tedavidir.",
    imageUrl:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=700&q=80",
    features: [
      "Minimal invaziv yöntem",
      "20 yıla kadar dayanıklılık",
      "Doğal diş görünümü",
      "Kişiye özel tasarım",
    ],
  },
  {
    id: "hollywood",
    label: "Hollywood Smile",
    heading: "DentaNess Hollywood Smile",
    content:
      "Hayalinizdeki mükemmel gülüşe kavuşmak artık mümkün! Bahçeşehir Dentaness olarak, Hollywood Smile uygulamaları ile dişlerinizi estetik açıdan en üst seviyeye taşıyoruz. Dişlerinizin boyutları, şekli ve rengini kişiye özel olarak tasarlıyoruz.",
    imageUrl:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700&q=80",
    features: [
      "Dijital gülüş simülasyonu (DSD)",
      "Tamamen kişiselleştirilmiş",
      "Yüz hatlarıyla uyumlu",
      "Uzun ömürlü sonuçlar",
    ],
  },
];

interface WhyUsProps {
  mediaMap?: Record<string, string>;
}

export default function WhyUsSection({ mediaMap = {} }: WhyUsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            Neden Dentaness?
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
            Hasta Memnuniyeti{" "}
            <span className="text-teal-600">Ön Planda</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Güvenilir, konforlu ve estetik çözümler sunduğumuz kapsamlı hizmetlerimizi keşfedin.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ willChange: "opacity, transform" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            {/* Text */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                {active.heading}
              </h3>
              <p className="text-slate-500 leading-relaxed mb-8">
                {active.content}
              </p>
              <ul className="space-y-3">
                {active.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="text-teal-600 shrink-0" size={18} />
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
              <Image
                src={mediaMap[`why_us_${active.id}`] || active.imageUrl}
                alt={active.heading}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized={active.imageUrl.startsWith("http")}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
