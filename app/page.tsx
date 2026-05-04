import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import AboutSection from "@/components/home/AboutSection";

// Below-the-fold sections — dynamic import for code-splitting (deferred JS parsing)
const WhyUsSection = dynamic(() => import("@/components/home/WhyUsSection"));
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"));
const GalleryPreviewSection = dynamic(() => import("@/components/home/GalleryPreviewSection"));
const CTABannerSection = dynamic(() => import("@/components/home/CTABannerSection"));

export const metadata: Metadata = {
  title:
    "Dentaness Diş Kliniği | Bahçeşehir | Hollywood Gülüşü & İmplant Tedavisi",
  description:
    "Dentaness Bahçeşehir — uzman diş hekimleri, son teknoloji ekipmanlar. İmplant, ortodonti, Hollywood Smile, estetik diş hekimliği. Hemen randevu alın: (0501) 107 02 10",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WhyUsSection />
      <TestimonialsSection />
      <GalleryPreviewSection />
      <CTABannerSection />
    </>
  );
}
