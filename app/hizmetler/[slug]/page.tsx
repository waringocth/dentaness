import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { services, getServiceBySlug } from "@/lib/services-data";
import { CheckCircle2, Phone, MessageCircle, Calendar, ArrowLeft } from "lucide-react";
import AppointmentCTA from "@/components/ui/AppointmentCTA";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Sayfa Bulunamadı" };
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-teal-900 to-teal-700 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-teal-200 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Anasayfa
            </Link>
            <span>/</span>
            <Link
              href="/#hizmetlerimiz"
              className="hover:text-white transition-colors"
            >
              Hizmetlerimiz
            </Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {service.title}
          </h1>
          <p className="text-teal-100 text-lg max-w-2xl leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden aspect-video mb-8 shadow-lg">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="prose prose-lg max-w-none">
                {service.longDescription
                  .split("\n\n")
                  .map((paragraph, i) => (
                    <p key={i} className="text-slate-600 leading-relaxed mb-4">
                      {paragraph.trim()}
                    </p>
                  ))}
              </div>

              {/* Features & Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    Uygulama Yöntemleri
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2
                          className="text-teal-600 shrink-0 mt-0.5"
                          size={18}
                        />
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    Avantajları
                  </h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle2
                          className="text-amber-500 shrink-0 mt-0.5"
                          size={18}
                        />
                        <span className="text-slate-600 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Back button */}
              <div className="mt-10">
                <Link
                  href="/#hizmetlerimiz"
                  className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium text-sm"
                >
                  <ArrowLeft size={16} />
                  Tüm Hizmetlere Dön
                </Link>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="sticky top-24 space-y-4">
                {/* Main CTA Card */}
                <div className="bg-teal-gradient rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">
                    {service.title} için Randevu Alın
                  </h3>
                  <p className="text-teal-100 text-sm mb-5 leading-relaxed">
                    Uzman hekimlerimiz sizin için burada. Hemen iletişime geçin.
                  </p>

                  <AppointmentCTA service={service.title} />

                  <a
                    href="tel:+905011070210"
                    className="flex items-center gap-2 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-sm transition-all justify-center mt-3"
                  >
                    <Phone size={16} />
                    (0501) 107 02 10
                  </a>

                  <a
                    href="https://wa.me/905011070210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full py-3 bg-green-500 hover:bg-green-400 text-white rounded-xl font-semibold text-sm transition-all justify-center mt-3"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>

                {/* Address Card */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <h4 className="font-semibold text-slate-800 mb-3 text-sm">
                    Kliniğimiz
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">
                    Bahçeşehir 1. Kısım, Başöğretmen Cd. No:5 D:10A, 34488
                    Başakşehir/İstanbul
                  </p>
                  <a
                    href="https://www.google.com/maps?daddr=Bah%C3%A7e%C5%9Fehir+1.+K%C4%B1s%C4%B1m,+Ba%C5%9F%C3%B6%C4%9Fretmen+Cd.+No:5+D:10A,+34488+Ba%C5%9Fak%C5%9Fehir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 text-xs font-semibold"
                  >
                    Yol Tarifi Al →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Other Services */}
          <div className="mt-20 pt-16 border-t border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              Diğer Hizmetlerimiz
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/hizmetler/${s.slug}`}
                  className="group p-4 bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-200 rounded-xl transition-all"
                >
                  <p className="font-semibold text-slate-700 group-hover:text-teal-700 text-sm transition-colors">
                    {s.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {s.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
