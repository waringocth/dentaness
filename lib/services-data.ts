export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  imageUrl: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
}

export const services: Service[] = [
  {
    slug: "implant-tedavisi",
    title: "İmplant Tedavisi",
    shortDescription:
      "Eksik dişlerinizin yerine doğal görünümlü, kalıcı implantlarla sağlıklı ve estetik bir gülüşe kavuşun.",
    longDescription: `İmplant tedavisi, eksik dişlerin yerine titanyum vidaların çene kemiğine yerleştirilerek yapay diş kökü oluşturan modern bir diş tedavisi yöntemidir. Dentaness Bahçeşehir olarak, eksik diş sorunlarınıza kalıcı çözümler sunan implant tedavisi ile sağlıklı ve estetik bir gülüşe sahip olmanızı sağlıyoruz.

Uzman diş hekimlerimiz ve son teknoloji ekipmanlarımız ile sizlere konforlu, güvenilir ve uzun ömürlü bir tedavi sunuyoruz. İmplant tedavisi, diş kaybının getirdiği hem estetik hem de fonksiyonel sorunları kalıcı olarak çözer.

Titanyum implantlar, çene kemiği ile uyum sağlayarak doğal diş kökü gibi işlev görür. Üzerine yerleştirilen porselen veya zirkonyum kron sayesinde doğal dişinizden neredeyse ayırt edilemez bir görünüm elde edilir.`,
    features: [
      "Tek diş implantı",
      "Çoklu implant uygulaması",
      "All-on-4 / All-on-6 implant",
      "Hızlı implant (immediate loading)",
      "Kemik grefti uygulaması",
      "Sinüs lifting",
    ],
    benefits: [
      "Doğal diş görünümü ve hissi",
      "20+ yıl uzun ömürlü çözüm",
      "Çene kemiği erimesini önler",
      "Komşu dişleri etkilemez",
      "Konforlu yeme ve konuşma",
      "Güçlü tutunma, kayma yok",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e1c?w=800&q=80",
    icon: "Zap",
    metaTitle:
      "İmplant Tedavisi Bahçeşehir | Dentaness Diş Kliniği",
    metaDescription:
      "Bahçeşehir Dentaness'te uzman hekimlerle profesyonel implant tedavisi. Eksik dişlerinize kalıcı çözüm. Hemen randevu alın: (0501) 107 02 10",
  },
  {
    slug: "estetik-dis-hekimligi",
    title: "Estetik Diş Hekimliği",
    shortDescription:
      "Dişlerin renk, şekil ve hizalanma sorunlarını düzelterek hayalinizdeki mükemmel gülüşe kavuşun.",
    longDescription: `Estetik diş hekimliği, dişlerin ve diş etlerinin görsel olarak daha hoş ve doğal bir görünüm kazanmasını sağlayan tedavilerin tümünü kapsar. Dentaness Bahçeşehir olarak, estetik diş hekimliği uygulamalarıyla sizlere sağlıklı, doğal ve güzel bir gülüş sunuyoruz.

Dişlerdeki renk, şekil ve hizalanma problemlerini düzenleyerek gülüş estetiğinizi en uygun hale getiriyoruz. Modern estetik diş hekimliği artık sadece güzellik değil, aynı zamanda uzun vadeli diş sağlığını da destekler.

Kişiye özel tedavi planları ile gülüşünüzü baştan tasarlıyor, yüz şeklinizle uyumlu, doğal ve estetik sonuçlar elde etmenizi sağlıyoruz.`,
    features: [
      "Diş beyazlatma (Bleaching)",
      "Porselen laminat (Veneer)",
      "Zirkonyum kron",
      "Kompozit bonding",
      "Diş şekillendirme",
      "Diş eti estetiği",
    ],
    benefits: [
      "Parlak ve beyaz dişler",
      "Özgüven artışı",
      "Doğal görünümlü sonuçlar",
      "Uzun ömürlü tedaviler",
      "Minimal invaziv yöntemler",
      "Kişiye özel tasarım",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
    icon: "Sparkles",
    metaTitle:
      "Estetik Diş Hekimliği Bahçeşehir | Dentaness",
    metaDescription:
      "Bahçeşehir Dentaness ile estetik diş hekimliği — laminat, zirkonyum, diş beyazlatma. Hayalinizdeki gülüşe kavuşun. Randevu: (0501) 107 02 10",
  },
  {
    slug: "ortodonti",
    title: "Ortodonti",
    shortDescription:
      "Modern ortodonti tedavileriyle dişlerinizi hizalayın, hem estetik hem fonksiyonel sorunlara kalıcı çözüm.",
    longDescription: `Ortodonti, dişlerdeki ve çene yapısındaki bozuklukları düzenlemeyi amaçlayan bir diş hekimliği dalıdır. Dentaness Bahçeşehir olarak, ortodontik tedavilerle diş ve çene yapınızdaki hizalanma problemlerini düzenleyerek sağlıklı ve estetik bir gülüş kazanmanızı sağlıyoruz.

Modern ortodonti uygulamalarımız sayesinde hem çocuklar hem de yetişkinler için etkili çözümler sunuyoruz. Diş teli tedavisi, sadece görünümü değil, çiğneme ve konuşma gibi fonksiyonel problemleri de çözer.

Şeffaf plak (Invisalign) sisteminden geleneksel metal tel tedavisine, her hastaya özel tedavi planı hazırlıyoruz.`,
    features: [
      "Metal diş teli",
      "Seramik (şeffaf) diş teli",
      "İnvisalign şeffaf plak",
      "Lingual (dil arkası) teli",
      "Pekiştirme apareyi (Retainer)",
      "Çocuk ortodonti uygulamaları",
    ],
    benefits: [
      "Düzgün ve simetrik dişler",
      "Çiğneme fonksiyonu düzelir",
      "Ağız hijyeni kolaylaşır",
      "Çene ağrıları azalır",
      "Özgüven kazanımı",
      "Uzun vadeli sağlık",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1588776814546-1ffbb6c6499b?w=800&q=80",
    icon: "AlignCenter",
    metaTitle: "Ortodonti Bahçeşehir | İnvisalign | Dentaness",
    metaDescription:
      "Bahçeşehir Dentaness'te ortodonti tedavisi — İnvisalign, şeffaf plak, metal teli. Uzman ortodontistlerimizle tanışın. Randevu: (0501) 107 02 10",
  },
  {
    slug: "cocuk-dis-hekimligi",
    title: "Çocuk Diş Hekimliği",
    shortDescription:
      "Çocukların diş gelişimini sağlıklı tamamlamaları için özel ortam ve uzman pedodonti ekibi.",
    longDescription: `Çocuk diş hekimliği (Pedodonti), bebeklik döneminden başlayarak 14 yaşına kadar olan çocukların diş ve ağız sağlığını korumayı ve tedavi etmeyi kapsayan uzmanlık dalıdır. Dentaness Bahçeşehir olarak, çocuk diş sağlığını koruma ve geliştirme konusunda uzmanlaşmış bir ekiple hizmet veriyoruz.

Çocukların diş gelişimini sağlıklı bir şekilde tamamlamaları ve diş hekimi korkusu olmadan rahat bir tedavi süreci yaşamaları için özel olarak tasarlanmış bir ortam sunuyoruz.

Çocuklara özel renkli ve eğlenceli klinik ortamımız, küçük hastalarımızın diş hekimine gitmekten korkmamasını, aksine severek gelmesini sağlar.`,
    features: [
      "Bebek ve çocuk diş kontrolü",
      "Süt diş dolgular",
      "Fissür örtücü (koruyucu)",
      "Çocuk kanal tedavisi",
      "Çocuk ortodonti",
      "Diş travma tedavileri",
    ],
    benefits: [
      "Diş hekimi korkusunu önler",
      "Erken yaşta sağlıklı alışkanlık",
      "Kalıcı diş gelişimi korunur",
      "Eğlenceli, çocuk dostu ortam",
      "Koruyucu tedaviler",
      "Aile odaklı yaklaşım",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&q=80",
    icon: "Baby",
    metaTitle:
      "Çocuk Diş Hekimliği Bahçeşehir | Pedodonti | Dentaness",
    metaDescription:
      "Bahçeşehir Dentaness çocuk diş kliniği — eğlenceli, korkusuz tedavi ortamı. Çocuğunuzun dişleri güvende. Randevu: (0501) 107 02 10",
  },
  {
    slug: "agiz-cene-cerrahisi",
    title: "Ağız Çene Cerrahisi",
    shortDescription:
      "Diş çekimi, gömülü diş operasyonu ve çene cerrahisi alanında uzman ekibimizle güvenli tedavi.",
    longDescription: `Ağız, diş ve çene cerrahisi; ağız içi ve çene bölgesindeki cerrahi müdahaleleri kapsayan diş hekimliği uzmanlık alanıdır. Dentaness Bahçeşehir olarak, modern cerrahi teknikler ve son teknoloji ekipmanlarla güvenli ve konforlu ağız çene cerrahisi hizmetleri sunuyoruz.

Uzman ekibimiz, diş çekiminden gömülü yirmilik dişlere, çene eklem tedavisinden kist operasyonlarına kadar geniş bir yelpazede cerrahi müdahaleler gerçekleştirmektedir.

Ağrısız anestezi teknikleri ve minimal invaziv yaklaşımımız sayesinde hastalarımız operasyon sürecini en az rahatsızlıkla geçirmektedir.`,
    features: [
      "Diş çekimi",
      "Gömülü yirmilik diş operasyonu",
      "Çene kisti ameliyatı",
      "Çene eklem (TME) tedavisi",
      "Pre-implant cerrahi",
      "Ağız kanseri taraması",
    ],
    benefits: [
      "Uzman cerrahi ekip",
      "Ağrısız anestezi",
      "Minimal invaziv teknikler",
      "Hızlı iyileşme süreci",
      "Steril operasyon ortamı",
      "Detaylı post-op bakım bilgisi",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    icon: "Shield",
    metaTitle:
      "Ağız Çene Cerrahisi Bahçeşehir | Gömülü Diş | Dentaness",
    metaDescription:
      "Bahçeşehir Dentaness'te ağız çene cerrahisi — gömülü diş, yirmilik diş çekimi. Uzman cerrahlarımız yanınızda. Randevu: (0501) 107 02 10",
  },
  {
    slug: "gulus-tasarimi",
    title: "Gülüş Tasarımı",
    shortDescription:
      "Hollywood Smile ile hayalinizdeki mükemmel gülüşe kavuşun — kişiye özel tasarım, estetik sonuçlar.",
    longDescription: `Gülüş tasarımı (Smile Design), kişiye özel estetik planlamayla dişlerin, diş etlerinin ve yüz yapısının bir bütün olarak değerlendirilerek mükemmel bir gülüş elde edilmesini sağlayan kapsamlı bir tedavi programıdır.

Dentaness Bahçeşehir olarak, kişiye özel gülüş tasarımı ile estetik ve sağlıklı bir gülümseme kazandırıyoruz. Diş yapınızı, yüz şeklinizi ve estetik beklentilerinizi dikkate alarak size en uygun gülüşü tasarlıyoruz.

En çok tercih edilen gülüş tasarımı yöntemlerinden biri olan Hollywood Smile uygulamamız ile hayalinizdeki mükemmel gülüşe kavuşabilirsiniz. Bu tedavi, dişlerinize doğal beyazlık, düzgünlük ve simetrik bir görünüm kazandırır.`,
    features: [
      "Dijital gülüş analizi (DSD)",
      "Hollywood Smile uygulaması",
      "Laminat veneer",
      "Zirkonyum kron",
      "Diş beyazlatma",
      "Diş eti şekillendirme",
    ],
    benefits: [
      "Tamamen kişiselleştirilmiş",
      "Yüz hatlarıyla uyumlu tasarım",
      "Doğal ve estetik sonuç",
      "Özgüveni artırır",
      "Uzun ömürlü malzemeler",
      "Dijital önizleme imkânı",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80",
    icon: "Star",
    metaTitle:
      "Gülüş Tasarımı Bahçeşehir | Hollywood Smile | Dentaness",
    metaDescription:
      "Bahçeşehir Dentaness Hollywood Smile — kişiye özel gülüş tasarımı, dijital analiz. Mükemmel gülüşe ilk adım için randevu alın: (0501) 107 02 10",
  },
  {
    slug: "bruksizm-tedavisi",
    title: "Bruksizm Tedavisi",
    shortDescription:
      "Diş gıcırdatma ve sıkıştırma sorununa kalıcı çözüm — gece plakları ve botoks tedavisiyle rahat uyku.",
    longDescription: `Bruksizm, kişinin istem dışı olarak dişlerini gıcırdatması veya sıkıştırması durumudur. Genellikle uyku sırasında ortaya çıkan bu durum, diş aşınmasına, çene ağrısına, baş ağrısına ve dişlerde kırılmalara yol açabilir.

Dentaness Bahçeşehir olarak, bruksizm tedavisinde kapsamlı bir yaklaşım sunuyoruz. Öncelikle hastanın durumu değerlendirilir ve en uygun tedavi planı hazırlanır.

Gece plakları (oklüzal splint), çene kaslarındaki gerilimi azaltarak dişleri korur. Botoks enjeksiyonu ise çiğneme kaslarını gevşeterek bruksizm şiddetini önemli ölçüde azaltır.`,
    features: [
      "Gece plağı (oklüzal splint)",
      "Botoks enjeksiyonu",
      "Çene gerginlik egzersizleri",
      "Stres yönetimi yönlendirmesi",
      "Aşınan diş restorasyonu",
      "Düzenli takip randevuları",
    ],
    benefits: [
      "Diş aşınması durur",
      "Çene ve baş ağrısı azalır",
      "Rahat ve kaliteli uyku",
      "Dişler korunur",
      "Hızlı etki eden tedavi",
      "Non-invaziv yaklaşımlar",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    icon: "Moon",
    metaTitle: "Bruksizm Tedavisi Bahçeşehir | Diş Gıcırdatma | Dentaness",
    metaDescription:
      "Bahçeşehir Dentaness bruksizm tedavisi — gece plağı, botoks, çene ağrısı çözümü. Dişlerinizi koruyun. Randevu: (0501) 107 02 10",
  },
  {
    slug: "diseti-hastaliklari",
    title: "Dişeti Hastalıkları",
    shortDescription:
      "Periodontal hastalıkları erken tedavi edin — sağlıklı dişetleri, sağlam dişler, güçlü bir gülüş.",
    longDescription: `Dişeti hastalıkları (periodontal hastalıklar), dişleri çevreleyen dokuların iltihaplanmasıyla ortaya çıkar ve tedavi edilmezse diş kaybına kadar ilerleyebilir. Erken teşhis ve profesyonel müdahale ile diş eti sağlığınızı koruyoruz.

Dentaness Bahçeşehir olarak, sağlıklı diş etleri ve güçlü bir ağız yapısı için dişeti hastalıkları konusunda kapsamlı tedaviler sunuyoruz. Gingivitis'ten (diş eti iltihabı) ileri evre periodontitis'e kadar tüm diş eti sorunlarında uzman ekibimiz yanınızda.

Düzenli diş eti kontrolü ve profesyonel temizlik, diş eti hastalıklarının önlenmesinde en etkili yöntemdir.`,
    features: [
      "Diş eti muayenesi",
      "Profesyonel diş taşı temizliği",
      "Küretaj (derin temizleme)",
      "Flep operasyonu",
      "Diş eti çekilmesi tedavisi",
      "Periodontal bakım programı",
    ],
    benefits: [
      "Diş kayıplarını önler",
      "Kötü nefes gider",
      "Diş eti çekilmesi durur",
      "Genel sağlık korunur",
      "Ağrısız prosedürler",
      "Uzun vadeli periodontal sağlık",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1609207808072-08d97b70e73a?w=800&q=80",
    icon: "Heart",
    metaTitle: "Dişeti Hastalıkları Bahçeşehir | Periodontoloji | Dentaness",
    metaDescription:
      "Bahçeşehir Dentaness dişeti hastalıkları — gingivitis, periodontitis, küretaj tedavisi. Uzman periodontolog ekibi. Randevu: (0501) 107 02 10",
  },
  {
    slug: "kanal-tedavisi",
    title: "Kanal Tedavisi",
    shortDescription:
      "Çürük veya enfekte dişleri kurtarın — modern teknikler ve ağrısız uygulamalarla güvenli kanal tedavisi.",
    longDescription: `Kanal tedavisi (endodonti), dişin iç kısmında bulunan hasarlı veya iltihaplı dokunun temizlenerek dişin sağlıklı bir şekilde korunmasını sağlayan bir işlemdir. Modern teknikler ve ağrısız uygulamalar ile diş kaybını önlüyor, uzun ömürlü bir diş sağlığı sunuyoruz.

Dentaness Bahçeşehir olarak, çürük veya enfekte olmuş dişleri kurtarmak için kanal tedavisi (endodonti) hizmeti sunuyoruz. Yanlış bilgilerin aksine, modern kanal tedavisi günümüzde oldukça ağrısız ve konforlu bir prosedürdür.

Rotary endodonti sistemleri ve 3D diş görüntüleme teknolojimiz sayesinde kanal tedavisini daha hızlı, daha güvenilir ve tek seansta tamamlayabiliyoruz.`,
    features: [
      "Tek seans kanal tedavisi",
      "Rotary endodonti sistemi",
      "3D dijital görüntüleme",
      "Yeniden kanal tedavisi",
      "Kanal sonrası kron uygulaması",
      "Ağrısız anestezi",
    ],
    benefits: [
      "Diş kurtarılır, çekilmez",
      "Ağrı ve enfeksiyon gider",
      "Tek seansta tamamlanabilir",
      "Minimal ağrı",
      "Uzun ömürlü sonuç",
      "Komşu dişler korunur",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80",
    icon: "Activity",
    metaTitle: "Kanal Tedavisi Bahçeşehir | Endodonti | Dentaness",
    metaDescription:
      "Bahçeşehir Dentaness kanal tedavisi — ağrısız, tek seans, rotary sistem. Dişinizi kurtaralım. Randevu alın: (0501) 107 02 10",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
