import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Dentaness Diş Kliniği",
  description: "Ağız ve diş sağlığı hakkında uzman içerikler. Dentaness Bahçeşehir blogu.",
};

const posts = [
  {
    slug: "implant-tedavisi-hakkinda-bilinmesi-gerekenler",
    title: "İmplant Tedavisi Hakkında Bilinmesi Gerekenler",
    excerpt:
      "İmplant tedavisi, eksik dişlerinize kalıcı çözüm sunan modern bir yöntemdir. Merak ettiğiniz her şeyi uzman görüşüyle anlattık.",
    category: "İmplant",
    date: "2024-05-10",
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e1c?w=600&q=80",
    readTime: "5 dk",
  },
  {
    slug: "cocuklarda-dis-sagligini-koruma-yollari",
    title: "Çocuklarda Diş Sağlığını Koruma Yolları",
    excerpt:
      "Çocukların diş sağlığı, ilerleyen yaşlar için kritik öneme sahiptir. İşte ebeveynlerin bilmesi gereken en önemli ipuçları.",
    category: "Çocuk Diş",
    date: "2024-04-22",
    imageUrl: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=600&q=80",
    readTime: "4 dk",
  },
  {
    slug: "ortodonti-tedavisi-ne-kadar-surer",
    title: "Ortodonti Tedavisi Ne Kadar Sürer?",
    excerpt:
      "Diş teli veya şeffaf plak tedavisi başlamadan merak ettiğiniz süre sorusunu uzmanlarımız yanıtlıyor.",
    category: "Ortodonti",
    date: "2024-04-08",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffbb6c6499b?w=600&q=80",
    readTime: "6 dk",
  },
  {
    slug: "dis-beyazlatma-guvenli-mi",
    title: "Diş Beyazlatma Güvenli mi?",
    excerpt:
      "Diş beyazlatma işlemi hakkında merak edilenleri yanıtlıyoruz. Klinik uygulama vs. evde uygulama farkı nedir?",
    category: "Estetik",
    date: "2024-03-15",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80",
    readTime: "5 dk",
  },
];

const categoryColors: Record<string, string> = {
  "İmplant": "bg-teal-100 text-teal-700",
  "Çocuk Diş": "bg-pink-100 text-pink-700",
  "Ortodonti": "bg-indigo-100 text-indigo-700",
  "Estetik": "bg-amber-100 text-amber-700",
  "Genel": "bg-slate-100 text-slate-700",
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-teal-900 to-teal-700 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-teal-200 text-sm mb-6">
            <Link href="/" className="hover:text-white">Anasayfa</Link>
            <span>/</span>
            <span className="text-white">Blog</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Blog</h1>
          <p className="text-teal-100 text-lg">Ağız ve diş sağlığı hakkında uzman içerikler.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[post.category] || categoryColors["Genel"]}`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                    <span className="text-xs text-slate-400">{post.readTime} okuma</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-800 group-hover:text-teal-700 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
