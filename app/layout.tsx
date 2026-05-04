import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingCTAs from "@/components/layout/FloatingCTAs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Dentaness Diş Kliniği",
    default:
      "Dentaness Diş Kliniği | Bahçeşehir | Hollywood Gülüşü & İmplant",
  },
  description:
    "Dentaness Bahçeşehir — uzman diş hekimleri ve modern ekipmanlarla sağlıklı ve estetik gülüşler. İmplant, ortodonti, Hollywood Smile ve daha fazlası.",
  keywords:
    "Bahçeşehir diş kliniği, implant tedavisi, Hollywood smile, ortodonti, Dentaness",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://dentaness.com",
    siteName: "Dentaness Diş Kliniği",
    title: "Dentaness Diş Kliniği | Bahçeşehir",
    description:
      "Bahçeşehir'in en modern diş kliniği. İmplant, estetik diş hekimliği, ortodonti ve Hollywood Smile.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#0d9488" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased bg-slate-50 text-slate-700 overflow-x-hidden">
        <Navbar />
        <main id="content">{children}</main>
        <Footer />
        <FloatingCTAs />
      </body>
    </html>
  );
}
