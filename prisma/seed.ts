import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const doctors = [
    {
      name: "Dt. Ece Özoğul",
      specialization: "Diş Hekimi",
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
      specialization: "Diş Hekimi",
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

  console.log("Seeding doctors...");

  await prisma.doctor.createMany({
    data: doctors,
    skipDuplicates: true,
  });

  console.log(`  ✔ ${doctors.length} doctors seeded (duplicates skipped).`);
  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
