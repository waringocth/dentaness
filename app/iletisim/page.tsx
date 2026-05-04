import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ui/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim | Dentaness Diş Kliniği Bahçeşehir",
  description:
    "Dentaness Bahçeşehir ile iletişime geçin. Adres: Bahçeşehir 1. Kısım, Başöğretmen Cd. No:5 D:10A. Tel: (0501) 107 02 10",
};

const contactDetails = [
  {
    icon: Phone,
    label: "Telefon",
    value: "(0501) 107 02 10",
    href: "tel:+905011070210",
    color: "teal",
  },
  {
    icon: Mail,
    label: "E-posta",
    value: "randevu@dentaness.com",
    href: "mailto:randevu@dentaness.com",
    color: "amber",
  },
  {
    icon: MapPin,
    label: "Adres",
    value:
      "Bahçeşehir 1. Kısım, Başöğretmen Cd. No:5 D:10A, 34488 Başakşehir/İstanbul",
    href: "https://www.google.com/maps?daddr=Bah%C3%A7e%C5%9Fehir+1.+K%C4%B1s%C4%B1m,+Ba%C5%9F%C3%B6%C4%9Fretmen+Cd.+No:5+D:10A,+34488+Ba%C5%9Fak%C5%9Fehir",
    color: "rose",
  },
  {
    icon: Clock,
    label: "Çalışma Saatleri",
    value: "Pzt–Cts: 09:00–20:00 | Pazar: 10:00–17:00",
    href: null,
    color: "indigo",
  },
];

const colorMap: Record<string, string> = {
  teal: "bg-teal-100 text-teal-600",
  amber: "bg-amber-100 text-amber-600",
  rose: "bg-rose-100 text-rose-600",
  indigo: "bg-indigo-100 text-indigo-600",
};

export default function IletisimPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 to-teal-700 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-teal-200 text-sm mb-6">
            <Link href="/" className="hover:text-white">Anasayfa</Link>
            <span>/</span>
            <span className="text-white">İletişim</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            İletişim
          </h1>
          <p className="text-teal-100 text-lg">
            İstek ve önerileriniz için formu doldurarak bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-8">
                Bize Ulaşın
              </h2>

              <div className="space-y-4 mb-10">
                {contactDetails.map((detail) => {
                  const Icon = detail.icon;
                  const iconClass = colorMap[detail.color] || "bg-teal-100 text-teal-600";
                  return (
                    <div
                      key={detail.label}
                      className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconClass}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                          {detail.label}
                        </p>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            target={detail.href.startsWith("http") ? "_blank" : undefined}
                            rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-slate-700 font-medium hover:text-teal-600 transition-colors text-sm"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p className="text-slate-700 font-medium text-sm">
                            {detail.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-md h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.7!2d28.65!3d41.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA0JzEyLjAiTiAyOMKwMzknMDAuMCJF!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dentaness Bahçeşehir konum"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-8">
                Mesaj Gönderin
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
