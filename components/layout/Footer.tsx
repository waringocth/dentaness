import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const serviceLinks = [
  { name: "İmplant Tedavisi", href: "/hizmetler/implant-tedavisi" },
  { name: "Estetik Diş Hekimliği", href: "/hizmetler/estetik-dis-hekimligi" },
  { name: "Ortodonti", href: "/hizmetler/ortodonti" },
  { name: "Çocuk Diş Hekimliği", href: "/hizmetler/cocuk-dis-hekimligi" },
  { name: "Gülüş Tasarımı", href: "/hizmetler/gulus-tasarimi" },
  { name: "Bruksizm Tedavisi", href: "/hizmetler/bruksizm-tedavisi" },
  { name: "Dişeti Hastalıkları", href: "/hizmetler/diseti-hastaliklari" },
  { name: "Kanal Tedavisi", href: "/hizmetler/kanal-tedavisi" },
];

const quickLinks = [
  { name: "Anasayfa", href: "/" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "Doktorlarımız", href: "/doktorlarimiz" },
  { name: "Tedavi Sonrası", href: "/tedavi-sonrasi" },
  { name: "Galeri", href: "/galeri" },
  { name: "Blog", href: "/blog" },
  { name: "İletişim", href: "/iletisim" },
  { name: "KVKK", href: "/kvkk" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Denta<span className="text-amber-400">ness</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Bahçeşehir Dentaness olarak, sağlıklı ve estetik gülüşler için
              uzman kadromuz ve modern teknolojimizle hizmet veriyoruz.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/dentaness"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-teal-600 transition-all"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://dentaness.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-teal-600 transition-all"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-teal-400 transition-colors flex items-center gap-1"
                  >
                    <span className="text-teal-600">›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Hizmetlerimiz
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-teal-400 transition-colors flex items-center gap-1"
                  >
                    <span className="text-teal-600">›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              İletişim
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+905011070210"
                  className="flex items-start gap-3 text-slate-400 hover:text-teal-400 transition-colors group"
                >
                  <Phone
                    size={16}
                    className="shrink-0 mt-0.5 text-teal-500 group-hover:text-teal-400"
                  />
                  <span className="text-sm">(0501) 107 02 10</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:randevu@dentaness.com"
                  className="flex items-start gap-3 text-slate-400 hover:text-teal-400 transition-colors group"
                >
                  <Mail
                    size={16}
                    className="shrink-0 mt-0.5 text-teal-500 group-hover:text-teal-400"
                  />
                  <span className="text-sm">randevu@dentaness.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps?daddr=Bah%C3%A7e%C5%9Fehir+1.+K%C4%B1s%C4%B1m,+Ba%C5%9F%C3%B6%C4%9Fretmen+Cd.+No:5+D:10A,+34488+Ba%C5%9Fak%C5%9Fehir/%C4%B0stanbul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-slate-400 hover:text-teal-400 transition-colors group"
                >
                  <MapPin
                    size={16}
                    className="shrink-0 mt-0.5 text-teal-500 group-hover:text-teal-400"
                  />
                  <span className="text-sm leading-relaxed">
                    Bahçeşehir 1. Kısım, Başöğretmen Cd. No:5 D:10A,
                    34488 Başakşehir/İstanbul
                  </span>
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-teal-900/30 rounded-xl border border-teal-800/50">
              <p className="text-xs text-teal-300 font-medium mb-1">
                Çalışma Saatleri
              </p>
              <p className="text-xs text-slate-400">
                Pzt–Cts: 09:00 – 20:00
              </p>
              <p className="text-xs text-slate-400">Pazar: 10:00 – 17:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Dentaness Diş Kliniği. Tüm hakları
            saklıdır.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/kvkk" className="hover:text-slate-300 transition-colors">
              KVKK & Çerez Politikası
            </Link>
            <span className="text-slate-700">|</span>
            <span>Web Tasarım: Garen Creative</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
