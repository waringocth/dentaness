import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Stethoscope } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Doktorlarımız | Dentaness Diş Kliniği Bahçeşehir",
  description:
    "Dentaness Bahçeşehir uzman diş hekimleri — Dt. Birol Karabulut ve Dt. Ece Özoğul. Eğitim ve uzmanlık alanları hakkında bilgi alın.",
};

const doctors = [
  {
    name: "Dt. Ece Özoğul",
    title: "Diş Hekimi",
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    bio: `İstanbul doğumlu olan Dt. Ece Özoğul, eğitim hayatına Bahçeşehir Koleji'nde başlayıp, Özel Bahçeşehir Anadolu Lisesi'nden 2019 yılında mezun olduktan sonra, Bahçeşehir Üniversitesi Diş Hekimliği Fakültesi'nde eğitimini tamamlayarak 2024 yılında mezun olmuştur.

2022-2024 yılları arasında Bahçeşehir Üniversitesi'nde stajyer hekim olarak görev almış ve klinik deneyim kazanmıştır. Staj döneminde, diş muayeneleri, tedavi planlaması ve çeşitli diş hekimliği prosedürlerine aktif olarak katılmıştır.`,
    specialties: [
      "Estetik Diş Hekimliği",
      "Restoratif Diş Hekimliği",
      "Çocuk Diş Hekimliği",
      "Ağız Sağlığı Koruma",
    ],
    education: [
      "Bahçeşehir Koleji - Özel Bahçeşehir Anadolu Lisesi (2019)",
      "Bahçeşehir Üniversitesi Diş Hekimliği Fakültesi (2024)",
      "Klinik Staj - Bahçeşehir Üniversitesi (2022-2024)",
    ],
  },
  {
    name: "Dt. Birol Karabulut",
    title: "Diş Hekimi",
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
    bio: `Deneyimli diş hekimimiz Dt. Birol Karabulut, implant tedavisi ve ağız-çene cerrahisi konularında uzmanlaşmış olup yıllarca Türkiye'nin önde gelen kliniklerinde görev yapmıştır.

Hasta memnuniyetini her zaman ön planda tutan Dt. Karabulut, Dentaness Bahçeşehir'de modern teknoloji ve kanıta dayalı tedavi yöntemleriyle hastalarına en yüksek kalitede hizmet sunmaktadır.`,
    specialties: [
      "İmplant Tedavisi",
      "Ağız Çene Cerrahisi",
      "Ortodonti",
      "Bruksizm Tedavisi",
    ],
    education: [
      "Diş Hekimliği Fakültesi Mezunu",
      "İmplantoloji Sertifika Programları",
      "Türk Diş Hekimleri Birliği Üyesi",
    ],
  },
];

const defaultStaticData: Record<string, any> = {
  "Dt. Ece Özoğul": doctors[0],
  "Dt. Birol Karabulut": doctors[1]
};

const genericStaticData = {
  bio: "Dentaness Bahçeşehir'de modern teknoloji ve kanıta dayalı tedavi yöntemleriyle hastalarımıza en yüksek kalitede hizmet sunmaktadır.\n\nHasta memnuniyetini ve sağlığını her zaman ön planda tutarak klinik çalışmalarına devam etmektedir.",
  specialties: ["Genel Diş Hekimliği", "Estetik Uygulamalar", "Ağız Sağlığı Koruma", "Koruyucu Diş Hekimliği"],
  education: ["Diş Hekimliği Fakültesi Mezunu", "Mesleki Gelişim ve Sertifika Programları", "Türk Diş Hekimleri Birliği Üyesi"]
};

export const dynamic = "force-dynamic";

export default async function DoktorlarimizPage() {
  let displayDoctors = doctors;

  try {
    const dbDoctors = await prisma.doctor.findMany({ orderBy: { createdAt: "asc" } });
    if (dbDoctors.length > 0) {
      displayDoctors = dbDoctors.map(doc => {
        const staticData = defaultStaticData[doc.name] || genericStaticData;
        return {
          name: doc.name,
          title: doc.specialization,
          imageUrl: doc.imageUrl || staticData.imageUrl || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
          bio: staticData.bio,
          specialties: staticData.specialties,
          education: staticData.education
        };
      });
    }
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 to-teal-700 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-teal-200 text-sm mb-6">
            <Link href="/" className="hover:text-white">Anasayfa</Link>
            <span>/</span>
            <span className="text-white">Doktorlarımız</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Doktorlarımız
          </h1>
          <p className="text-teal-100 text-lg max-w-2xl">
            Uzman ve deneyimli hekim kadromuzla tanışın. Sağlığınız için buradayız.
          </p>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-20">
            {displayDoctors.map((doc, i) => (
              <div
                key={doc.name}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Photo */}
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative rounded-3xl overflow-hidden aspect-[3/4] max-w-sm mx-auto shadow-2xl">
                    <Image
                      src={doc.imageUrl}
                      alt={doc.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <p className="text-white font-bold text-xl">{doc.name}</p>
                      <p className="text-teal-300 text-sm">{doc.title}</p>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                    {doc.title}
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-800 mb-6">
                    {doc.name}
                  </h2>

                  {doc.bio.split("\n\n").map((para, j) => (
                    <p key={j} className="text-slate-500 leading-relaxed mb-4">
                      {para}
                    </p>
                  ))}

                  {/* Specialties */}
                  <div className="mt-6 mb-6">
                    <h3 className="flex items-center gap-2 font-bold text-slate-700 mb-3">
                      <Stethoscope className="text-teal-600" size={18} />
                      Uzmanlık Alanları
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {doc.specialties.map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1.5 bg-teal-50 text-teal-700 text-sm rounded-lg font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="flex items-center gap-2 font-bold text-slate-700 mb-3">
                      <GraduationCap className="text-amber-500" size={18} />
                      Eğitim
                    </h3>
                    <ul className="space-y-2">
                      {doc.education.map((edu) => (
                        <li
                          key={edu}
                          className="text-sm text-slate-500 flex items-start gap-2"
                        >
                          <span className="text-teal-600 font-bold mt-0.5">›</span>
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
