import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Tedavi Sonrası | Dentaness Diş Kliniği",
  description:
    "Dentaness Bahçeşehir tedavi sonrası bakım talimatları. İmplant, kanal tedavisi, diş çekimi sonrası dikkat edilmesi gerekenler.",
};

const faqs = [
  {
    category: "İmplant Tedavisi Sonrası",
    items: [
      {
        q: "İmplant sonrası ne kadar dinlenmeliyim?",
        a: "İmplant operasyonundan sonra 24-48 saat istirahat önerilir. İlk gün sert fiziksel aktivitelerden kaçının. Ağzınızı kuvvetli çalkalamamalı ve sigara içmemelisiniz.",
      },
      {
        q: "İmplant sonrası ne yiyebilirim?",
        a: "İlk birkaç gün yumuşak gıdalar tercih edin: yoğurt, çorba, püre. Sıcak, sert ve baharatlı gıdalardan kaçının. 1 hafta sonra normal diyetinize kademeli olarak dönebilirsiniz.",
      },
      {
        q: "İmplant bölgesini nasıl temizlemeliyim?",
        a: "Operasyon günü o bölgeyi fırçalamayın. Ertesi günden itibaren yumuşak bir diş fırçasıyla nazikçe temizleyebilirsiniz. Verilen antiseptik gargarayı kullanın.",
      },
    ],
  },
  {
    category: "Kanal Tedavisi Sonrası",
    items: [
      {
        q: "Kanal tedavisinden sonra ağrı normal mi?",
        a: "Hafif bir hassasiyet ve ağrı birkaç gün sürebilir. Reçete edilen ağrı kesiciyi kullanabilirsiniz. Eğer şiddetli ağrı 3-4 günden fazla sürerse kliniği arayın.",
      },
      {
        q: "Kanal tedavisi sonrası ne zaman yiyebilirim?",
        a: "Anestezi tamamen geçtikten sonra (genellikle 2-3 saat) yemek yiyebilirsiniz. Kron yapılana kadar o diş tarafından sert gıdalar çiğnemekten kaçının.",
      },
    ],
  },
  {
    category: "Diş Çekimi Sonrası",
    items: [
      {
        q: "Diş çekimi sonrası kanama ne kadar sürer?",
        a: "Diş çekiminden sonra verilen steril gazlı beziyi 30-45 dakika ısırarak tutun. Hafif kanama 24 saat sürebilir. Şiddetli kanama devam ederse kliniği arayın.",
      },
      {
        q: "Çekim sonrası sigara içebilir miyim?",
        a: "Diş çekiminden sonra en az 48-72 saat sigara içmemenizi kesinlikle tavsiye ederiz. Sigara, pıhtının çözülmesine (kuru soket) yol açabilir ve iyileşmeyi geciktirir.",
      },
      {
        q: "Ne zaman fırçalama yapabilirim?",
        a: "Çekim yapılan bölgeyi en az 24 saat boyunca fırçalamayın. Diğer dişlerinizi nazikçe fırçalayabilirsiniz. 24 saat sonra ılık tuzlu su ile nazikçe ağzınızı çalkalayabilirsiniz.",
      },
    ],
  },
  {
    category: "Estetik Tedaviler Sonrası",
    items: [
      {
        q: "Diş beyazlatma sonrası ne yapmamalıyım?",
        a: "İlk 48 saat; çay, kahve, kırmızı şarap, kiraz gibi boyalı gıdalardan kaçının. Sigara içmeyin. Bu dönemde \"beyaz diyet\" uygulayın.",
      },
      {
        q: "Laminat veneer bakımı nasıl olmalı?",
        a: "Laminat dişlerinizi normal dişleriniz gibi fırçalayın. Diş ipi kullanın. Çok sert ve yapışkan gıdalardan kaçının. Altı ayda bir düzenli kontrol yaptırın.",
      },
    ],
  },
];

export default function TedaviSonrasiPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-teal-900 to-teal-700 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-teal-200 text-sm mb-6">
            <Link href="/" className="hover:text-white">Anasayfa</Link>
            <span>/</span>
            <span className="text-white">Tedavi Sonrası</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Tedavi Sonrası Bakım</h1>
          <p className="text-teal-100 text-lg max-w-2xl">
            Tedavinizden en iyi sonucu almanız için dikkat etmeniz gereken önemli bilgiler.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-3 border-b border-teal-100">
                  {section.category}
                </h2>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <details
                      key={item.q}
                      className="group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden"
                    >
                      <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-slate-700 hover:text-teal-700 transition-colors">
                        {item.q}
                        <ChevronDown
                          className="shrink-0 transition-transform group-open:rotate-180 text-teal-600"
                          size={18}
                        />
                      </summary>
                      <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-teal-50 rounded-2xl border border-teal-100 text-center">
            <p className="text-slate-700 font-medium mb-3">
              Tedavinizle ilgili sorunuz mu var?
            </p>
            <a
              href="tel:+905011070210"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all"
            >
              Hemen Arayın: (0501) 107 02 10
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
