import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Target, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda | Dentaness Diş Kliniği Bahçeşehir",
  description:
    "Dentaness Bahçeşehir hakkında — misyon, vizyon ve değerlerimiz. Uzman kadromuz ve son teknoloji ekipmanlarımızla diş sağlığınız için buradayız.",
};

const values = [
  "Son teknoloji dijital görüntüleme ve tedavi sistemleri",
  "Hasta odaklı, kişiye özel tedavi planları",
  "Hijyenik, steril ve konforlu klinik ortamı",
  "Şeffaf tedavi süreci ve fiyatlandırma",
  "Ağrısız anestezi ve minimal invaziv yaklaşım",
  "Tedavi sonrası takip ve destek hizmetleri",
];

export default function HakkimizdaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 to-teal-700 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-teal-200 text-sm mb-6">
            <Link href="/" className="hover:text-white">Anasayfa</Link>
            <span>/</span>
            <span className="text-white">Hakkımızda</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Hakkımızda
          </h1>
          <p className="text-teal-100 text-lg max-w-2xl">
            Diş sağlığınız İçin mükemmelliğin adı DentaNess — beklentilerinizin bir adım ilerisi.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Kliniğimiz
              </span>
              <h2 className="text-3xl font-extrabold text-slate-800 mb-6">
                DentaNess Bahçeşehir
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                Dentaness Bahçeşehir olarak, diş sağlığı alanında en ileri teknolojileri
                ve hasta odaklı yaklaşımlarını benimseyerek, her hastamıza özel, kapsamlı
                ve güvenilir tedavi hizmetleri sunuyoruz.
              </p>
              <p className="text-slate-500 leading-relaxed mb-4">
                Kliniğimiz, son teknoloji ekipmanlar ve uzman diş hekimi kadrosuyla
                donatılmış, konforlu ve hijyenik bir ortamda diş tedavisi sunar. Estetik
                diş hekimliğinden implant tedavisine, ortodontiden çocuk diş hekimliğine
                kadar geniş bir hizmet yelpazesi sunuyoruz.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Bahçeşehir&apos;in kalbinde yer alan kliniğimiz, kolayca ulaşılabilir konumuyla
                hastalarımıza hizmet etmektedir.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                alt="Dentaness Bahçeşehir klinik"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-teal-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                <Target className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Misyonumuz</h3>
              <p className="text-slate-600 leading-relaxed">
                Her hastamıza en yüksek kalitede diş sağlığı hizmeti sunmak,
                ağrısız ve konforlu tedavi deneyimi yaşatmak ve uzun vadeli diş
                sağlığını garanti altına almaktır.
              </p>
            </div>

            <div className="bg-amber-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mb-4">
                <Eye className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Vizyonumuz</h3>
              <p className="text-slate-600 leading-relaxed">
                Dentaness Bahçeşehir olarak, diş sağlığı alanında en ileri
                teknolojileri ve yenilikçi tedavi yöntemlerini benimseyerek
                Türkiye&apos;nin önde gelen dental kliniği olmaktır.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-8 text-center">
              Değerlerimiz & <span className="text-teal-600">Avantajlarımız</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value) => (
                <div key={value} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                  <CheckCircle2 className="text-teal-600 shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-600">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/doktorlarimiz"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all hover:shadow-lg group"
            >
              Doktorlarımızı Tanıyın
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
