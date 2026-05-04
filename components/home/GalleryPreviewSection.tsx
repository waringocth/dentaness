"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?w=600&q=80",
    alt: "Modern diş kliniği",
    span: "md:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80",
    alt: "Estetik diş hekimliği",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1609207808072-08d97b70e73a?w=600&q=80",
    alt: "Diş kliniği ekipmanları",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e1c?w=600&q=80",
    alt: "Diş tedavisi",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1588776814546-1ffbb6c6499b?w=600&q=80",
    alt: "Ortodonti tedavisi",
    span: "",
  },
];

export default function GalleryPreviewSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              Galeri
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              Klinik & Tedavi{" "}
              <span className="text-teal-600">Görüntüleri</span>
            </h2>
          </div>
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 text-teal-700 font-semibold hover:text-teal-800 group"
          >
            Tüm Galeri
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              style={{ willChange: "opacity, transform" }}
              className={`relative rounded-2xl overflow-hidden aspect-square group cursor-pointer ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
