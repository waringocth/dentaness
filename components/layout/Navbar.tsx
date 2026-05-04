"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Calendar,
} from "lucide-react";
import AppointmentModal from "@/components/ui/AppointmentModal";

const services = [
  { name: "İmplant Tedavisi", href: "/hizmetler/implant-tedavisi" },
  { name: "Estetik Diş Hekimliği", href: "/hizmetler/estetik-dis-hekimligi" },
  { name: "Ortodonti", href: "/hizmetler/ortodonti" },
  { name: "Çocuk Diş Hekimliği", href: "/hizmetler/cocuk-dis-hekimligi" },
  { name: "Ağız Çene Cerrahisi", href: "/hizmetler/agiz-cene-cerrahisi" },
  { name: "Gülüş Tasarımı", href: "/hizmetler/gulus-tasarimi" },
  { name: "Bruksizm Tedavisi", href: "/hizmetler/bruksizm-tedavisi" },
  { name: "Dişeti Hastalıkları", href: "/hizmetler/diseti-hastaliklari" },
  { name: "Kanal Tedavisi", href: "/hizmetler/kanal-tedavisi" },
];

const navLinks = [
  { name: "Anasayfa", href: "/" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "Doktorlarımız", href: "/doktorlarimiz" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top info bar */}
      <div className="bg-teal-700 text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="flex items-center gap-2 opacity-90">
            📍 Bahçeşehir 1. Kısım, Başöğretmen Cd. No:5 D:10A, Başakşehir/İstanbul
          </span>
          <div className="flex items-center gap-6">
            <a
              href="mailto:randevu@dentaness.com"
              className="flex items-center gap-1 hover:text-teal-200 transition-colors"
            >
              ✉ randevu@dentaness.com
            </a>
            <a
              href="tel:+905011070210"
              className="flex items-center gap-1 font-semibold hover:text-teal-200 transition-colors"
            >
              <Phone size={14} /> (0501) 107 02 10
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-white shadow-sm"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none">D</span>
            </div>
            <span className="text-xl font-bold text-teal-700 tracking-tight">
              Denta<span className="text-amber-500">ness</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-teal-700 bg-teal-50"
                    : "text-slate-600 hover:text-teal-700 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/hizmetler")
                    ? "text-teal-700 bg-teal-50"
                    : "text-slate-600 hover:text-teal-700 hover:bg-slate-50"
                }`}
              >
                Hizmetlerimiz
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
                  >
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block px-4 py-3 text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors border-b border-slate-50 last:border-0"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[
              { name: "Tedavi Sonrası", href: "/tedavi-sonrasi" },
              { name: "Galeri", href: "/galeri" },
              { name: "Blog", href: "/blog" },
              { name: "İletişim", href: "/iletisim" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-teal-700 bg-teal-50"
                    : "text-slate-600 hover:text-teal-700 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+905011070210"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-teal-700 border-2 border-teal-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition-all"
            >
              <Phone size={16} />
              (0501) 107 02 10
            </a>
            <button
              onClick={() => setModalOpen(true)}
              id="navbar-randevu-btn"
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              <Calendar size={16} />
              Hemen Randevu Al
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Menüyü aç/kapat"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}

                <div>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                  >
                    Hizmetlerimiz
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden ml-4"
                      >
                        {services.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block px-4 py-2 rounded-lg text-sm text-slate-500 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {[
                  { name: "Tedavi Sonrası", href: "/tedavi-sonrasi" },
                  { name: "Galeri", href: "/galeri" },
                  { name: "Blog", href: "/blog" },
                  { name: "İletişim", href: "/iletisim" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <a
                    href="tel:+905011070210"
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-teal-700 border-2 border-teal-200 rounded-lg hover:bg-teal-50 transition-colors"
                  >
                    <Phone size={16} />
                    (0501) 107 02 10
                  </a>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                  >
                    <Calendar size={16} />
                    Hemen Randevu Al
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
