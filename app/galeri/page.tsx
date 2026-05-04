import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Galeri | Dentaness Diş Kliniği Bahçeşehir",
  description:
    "Dentaness Bahçeşehir klinik galeri — tedavi öncesi/sonrası görseller, klinik ortamı ve ekipmanlar.",
};

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?w=600&q=80", alt: "Modern klinik ortamı" },
  { src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80", alt: "Estetik diş uygulaması" },
  { src: "https://images.unsplash.com/photo-1609207808072-08d97b70e73a?w=600&q=80", alt: "Diş kliniği ekipmanları" },
  { src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e1c?w=600&q=80", alt: "Diş tedavisi" },
  { src: "https://images.unsplash.com/photo-1588776814546-1ffbb6c6499b?w=600&q=80", alt: "Ortodonti" },
  { src: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80", alt: "Hollywood smile" },
  { src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80", alt: "Klinik cerrahi" },
  { src: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=600&q=80", alt: "Diş röntgeni" },
  { src: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=600&q=80", alt: "Çocuk diş hekimliği" },
  { src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80", alt: "Modern klinik" },
  { src: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80", alt: "Diş implantı" },
  { src: "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?w=600&q=80", alt: "Gülümseme" },
];

export default function GaleriPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-teal-900 to-teal-700 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-teal-200 text-sm mb-6">
            <Link href="/" className="hover:text-white">Anasayfa</Link>
            <span>/</span>
            <span className="text-white">Galeri</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Galeri</h1>
          <p className="text-teal-100 text-lg">Klinik ortamımız ve tedavi görsellerimizden bir kesit.</p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
