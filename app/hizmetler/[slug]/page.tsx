import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { services, getServiceBySlug } from "@/lib/services-data";
import { CheckCircle2, Phone, MessageCircle, Calendar, ArrowLeft } from "lucide-react";
import AppointmentCTA from "@/components/ui/AppointmentCTA";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

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
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-teal-400/10 blur-3xl" />
        </div>
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
      <section className="relative z-20 py-12 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="w-full lg:w-2/3 order-2 lg:order-1">
              {/* 3D Overlapping Before/After Slider */}
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1598256989800-fea5c5ce870b?q=80&w=800&auto=format&fit=crop"
                afterImage="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop"
                className="mb-10 shadow-2xl ring-4 ring-white mt-0 lg:-mt-32 z-30 rounded-2xl"
              />

              {/* Typography Enhancement */}
              <div className="prose prose-lg max-w-none space-y-6">
                {service.longDescription
                  .split("\n\n")
                  .map((paragraph, i) => (
                    <p 
                      key={i} 
                      className={i === 0 
                        ? "text-lg md:text-xl text-slate-800 font-medium leading-relaxed" 
                        : "text-slate-600 leading-relaxed"
                      }
                    >
                      {paragraph.trim()}
                    </p>
                  ))}
              </div>

              {/* Features & Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
                <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                      <CheckCircle2 size={20} />
                    </span>
                    Uygulama Yöntemleri
                  </h3>
                  <ul className="space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="text-teal-600" size={12} />
                        </span>
                        <span className="text-slate-700 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50/50 p-6 md:p-8 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                      <CheckCircle2 size={20} />
                    </span>
                    Avantajları
                  </h3>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="text-amber-600" size={12} />
                        </span>
                        <span className="text-slate-700 text-sm leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Sıkça Sorulan Sorular</h3>
                <div className="space-y-4">
                  {[
                    { 
                      q: `${service.title} işlemi ne kadar sürer?`, 
                      a: "İşlem süresi hastanın durumuna ve tedavi planına göre değişiklik göstermekle birlikte, genellikle hekimimiz ilk muayenede size en doğru zaman çizelgesini sunacaktır." 
                    },
                    { 
                      q: "İşlem sırasında ağrı hisseder miyim?", 
                      a: "Modern lokal anestezi yöntemlerimiz sayesinde işlem sırasında herhangi bir ağrı veya acı hissetmezsiniz. Tedavi sonrası oluşabilecek hafif hassasiyetler için hekimimiz size gerekli önerilerde bulunacaktır." 
                    },
                    { 
                      q: "Tedavi sonrası nelere dikkat etmeliyim?", 
                      a: "Tedaviden sonraki ilk 24 saat aşırı sıcak/soğuk yiyeceklerden kaçınılması ve hekiminizin önerdiği ağız bakım rutinlerine harfiyen uyulması iyileşme sürecini hızlandıracaktır." 
                    }
                  ].map((faq, index) => (
                    <details key={index} className="group bg-white border border-slate-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between p-5 font-medium text-slate-800 cursor-pointer bg-slate-50 group-open:bg-teal-50 hover:bg-slate-100 transition-colors">
                        {faq.q}
                        <span className="transition duration-300 group-open:-rotate-180 shrink-0 ml-4">
                          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24" className="text-slate-500"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                      </summary>
                      <div className="p-5 text-slate-600 border-t border-slate-100 leading-relaxed bg-white">
                        {faq.a}
                      </div>
                    </details>
                  ))}
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
            <div className="w-full lg:w-1/3 order-1 lg:order-2">
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
