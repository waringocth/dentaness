import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KVKK & Çerez Politikası | Dentaness Diş Kliniği",
  description: "Dentaness Diş Kliniği KVKK (Kişisel Verilerin Korunması Kanunu) ve çerez politikası.",
};

export default function KVKKPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-teal-900 to-teal-700 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-teal-200 text-sm mb-6">
            <Link href="/" className="hover:text-white">Anasayfa</Link>
            <span>/</span>
            <span className="text-white">KVKK & Çerez Politikası</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">KVKK & Çerez Politikası</h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 prose prose-slate max-w-none">
          <h2>Kişisel Verilerin Korunması Kanunu Aydınlatma Metni</h2>
          <p>
            Dentaness Diş Kliniği olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu
            (&quot;KVKK&quot;) kapsamında kişisel verilerinizin güvenliğine büyük önem veriyoruz.
          </p>
          <h3>Veri Sorumlusu</h3>
          <p>
            Dentaness Diş Kliniği, Bahçeşehir 1. Kısım, Başöğretmen Cd. No:5 D:10A,
            34488 Başakşehir/İstanbul adresinde faaliyet göstermekte olup kişisel
            verilerinizin işlenmesinden sorumlu veri sorumlusudur.
          </p>
          <h3>Toplanan Veriler</h3>
          <p>Kliniğimiz aşağıdaki kişisel verileri toplayabilir:</p>
          <ul>
            <li>Ad, soyad, telefon numarası, e-posta adresi</li>
            <li>Sağlık geçmişi ve tedavi bilgileri</li>
            <li>Web sitesi kullanım verileri (çerezler aracılığıyla)</li>
          </ul>
          <h3>Verilerin İşlenme Amacı</h3>
          <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
          <ul>
            <li>Randevu ve hasta takibi</li>
            <li>Tedavi süreçlerinin yürütülmesi</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            <li>İletişim ve bilgilendirme</li>
          </ul>
          <h3>Çerez Politikası</h3>
          <p>
            Web sitemiz, kullanıcı deneyimini geliştirmek amacıyla çerezler kullanmaktadır.
            Zorunlu çerezler sitenin çalışması için gereklidir. Analitik ve pazarlama
            çerezleri için tarayıcı ayarlarınızdan izin verebilir veya reddedebilirsiniz.
          </p>
          <h3>Veri Sahibi Hakları</h3>
          <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
          <ul>
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenen veriler hakkında bilgi talep etme</li>
            <li>Verilerin düzeltilmesini isteme</li>
            <li>Verilerin silinmesini talep etme</li>
            <li>İşlemeye itiraz etme</li>
          </ul>
          <p>
            Haklarınızı kullanmak için{" "}
            <a href="mailto:randevu@dentaness.com">randevu@dentaness.com</a>{" "}
            adresine e-posta gönderebilirsiniz.
          </p>
          <p className="text-sm text-slate-400 mt-8">
            Son güncelleme: Ocak 2025
          </p>
        </div>
      </section>
    </>
  );
}
