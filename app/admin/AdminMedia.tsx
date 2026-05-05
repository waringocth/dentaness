"use client";

import { useState } from "react";
import useSWR from "swr";
import { Loader2, Upload, Trash2, Pencil, X, Image as ImageIcon } from "lucide-react";
import type { Doctor, SiteMedia } from "@prisma/client";

const fetcher = (url: string) =>
  fetch(url)
    .then(r => r.json())
    .then(data => (Array.isArray(data) ? data : []));

export default function AdminMedia() {
  const { data: doctors = [], mutate: mutateDoctors } = useSWR<Doctor[]>("/api/doctors", fetcher);
  const { data: media = [], mutate: mutateMedia } = useSWR<SiteMedia[]>("/api/media", fetcher);

  const [activeTab, setActiveTab] = useState<"doctors" | "media">("doctors");

  // Shared form state (used for both Add and Edit)
  const EMPTY_FORM = { name: "", specialization: "", bio: "", specialtiesRaw: "", educationRaw: "" };
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [doctorFile, setDoctorFile] = useState<File | null>(null);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);

  // Edit mode state
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  // State for media updates
  const [mediaFiles, setMediaFiles] = useState<Record<string, File>>({});
  const [uploadingMedia, setUploadingMedia] = useState<string | null>(null);

  const isEditing = editingDoctor !== null;

  const handleEditDoctor = (doc: Doctor) => {
    setEditingDoctor(doc);
    setFormData({
      name: doc.name,
      specialization: doc.specialization,
      bio: (doc as any).bio ?? "",
      specialtiesRaw: ((doc as any).specialties as string[] ?? []).join(", "),
      educationRaw: ((doc as any).education as string[] ?? []).join("\n"),
    });
    setDoctorFile(null);
    // Scroll form into view
    document.getElementById("doctor-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCancelEdit = () => {
    setEditingDoctor(null);
    setFormData(EMPTY_FORM);
    setDoctorFile(null);
  };

  const servicesList = [
    "implant-tedavisi", "estetik-dis-hekimligi", "ortodonti", "cocuk-dis-hekimligi", 
    "agiz-cene-cerrahisi", "gulus-tasarimi", "bruksizm-tedavisi", "diseti-hastaliklari", "kanal-tedavisi"
  ];
  
  const predefinedSections = [
    { key: "why_us_beyazlatma", label: "Neden Biz: Diş Beyazlatma" },
    { key: "why_us_implant", label: "Neden Biz: İmplant" },
    { key: "why_us_ortodonti", label: "Neden Biz: Ortodonti" },
    { key: "why_us_dolgu", label: "Neden Biz: Diş Dolgusu" },
    { key: "why_us_lamine", label: "Neden Biz: Lamine & Zirkonyum" },
    { key: "why_us_hollywood", label: "Neden Biz: Hollywood Smile" },
    ...servicesList.flatMap(slug => [
      { key: `hero_${slug}`, label: `Hero Görseli: ${slug}` },
      { key: `before_${slug}`, label: `Öncesi: ${slug}` },
      { key: `after_${slug}`, label: `Sonrası: ${slug}` },
    ])
  ];

  const handleSubmitDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.specialization) return alert("İsim ve unvan alanları zorunludur");
    // For new doctors a photo is required; for edits it's optional
    if (!isEditing && !doctorFile) return alert("Yeni doktor için fotoğraf zorunludur");

    setIsUploadingDoc(true);
    try {
      let imageUrl = isEditing ? editingDoctor!.imageUrl : "";

      // Upload new photo if provided
      if (doctorFile) {
        const uploadRes = await fetch(`/api/upload?filename=${encodeURIComponent(doctorFile.name)}`, {
          method: "POST",
          body: doctorFile,
        });
        if (!uploadRes.ok) throw new Error("Upload failed");
        const json = await uploadRes.json();
        imageUrl = json.url;
      }

      const payload = {
        name: formData.name,
        specialization: formData.specialization,
        imageUrl,
        bio: formData.bio,
        specialties: formData.specialtiesRaw.split(",").map(s => s.trim()).filter(Boolean),
        education: formData.educationRaw.split("\n").map(s => s.trim()).filter(Boolean),
      };

      if (isEditing) {
        await fetch(`/api/doctors/${editingDoctor!.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/doctors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      handleCancelEdit();
      mutateDoctors();
    } catch (error) {
      alert("Hata oluştu");
    } finally {
      setIsUploadingDoc(false);
    }
  };

  const handleDeleteDoctor = async (id: string) => {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/doctors/${id}`, { method: "DELETE" });
    mutateDoctors();
  };

  const handleMediaUpload = async (sectionKey: string) => {
    const file = mediaFiles[sectionKey];
    if (!file) return;

    setUploadingMedia(sectionKey);
    try {
      const uploadRes = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { url } = await uploadRes.json();

      await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionKey, imageUrl: url })
      });

      setMediaFiles(prev => {
        const next = { ...prev };
        delete next[sectionKey];
        return next;
      });
      mutateMedia();
    } catch (error) {
      alert("Hata oluştu");
    } finally {
      setUploadingMedia(null);
    }
  };

  const getMediaUrl = (key: string) => {
    return Array.isArray(media) ? media.find(m => m.sectionKey === key)?.imageUrl : undefined;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex border-b border-slate-200 bg-slate-50">
        <button
          onClick={() => setActiveTab("doctors")}
          className={`px-6 py-4 font-bold text-sm ${activeTab === "doctors" ? "text-teal-600 border-b-2 border-teal-600" : "text-slate-500 hover:text-slate-700"}`}
        >
          Doktor Yönetimi
        </button>
        <button
          onClick={() => setActiveTab("media")}
          className={`px-6 py-4 font-bold text-sm ${activeTab === "media" ? "text-teal-600 border-b-2 border-teal-600" : "text-slate-500 hover:text-slate-700"}`}
        >
          Site Görselleri
        </button>
      </div>

      <div className="p-6">
        {activeTab === "doctors" && (
          <div className="space-y-8">
            <div id="doctor-form" className={`p-6 rounded-xl border-2 transition-colors ${isEditing ? "bg-amber-50 border-amber-300" : "bg-slate-50 border-slate-200"}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800">
                  {isEditing ? `Düzenle: ${editingDoctor!.name}` : "Yeni Doktor Ekle"}
                </h3>
                {isEditing && (
                  <button type="button" onClick={handleCancelEdit} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 border border-slate-300 rounded-lg px-3 py-1.5 hover:bg-slate-100 transition-colors">
                    <X size={14} /> İptal
                  </button>
                )}
              </div>
              <form onSubmit={handleSubmitDoctor} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">İsim Soyisim</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-teal-500 text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Unvan / Uzmanlık</label>
                  <input type="text" value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-teal-500 text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    Fotoğraf {isEditing && <span className="font-normal text-slate-400">(boş bırakılırsa mevcut fotoğraf korunur)</span>}
                  </label>
                  {isEditing && editingDoctor?.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={editingDoctor.imageUrl} alt="Mevcut" className="w-16 h-16 rounded-lg object-cover mb-2 border border-slate-200" />
                  )}
                  <input type="file" accept="image/*" onChange={e => setDoctorFile(e.target.files?.[0] || null)} className="w-full p-1.5 border border-slate-200 rounded-lg bg-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Uzmanlık Alanları <span className="font-normal text-slate-400">(virgülle ayırın)</span></label>
                  <input type="text" placeholder="İmplant, Ortodonti, Estetik..." value={formData.specialtiesRaw} onChange={e => setFormData({...formData, specialtiesRaw: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-teal-500 text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1">Hakkında (Bio)</label>
                  <textarea rows={4} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-teal-500 text-sm resize-none" placeholder="Doktor hakkında kısa bir biyografi yazın..." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1">Eğitim <span className="font-normal text-slate-400">(her satır bir madde)</span></label>
                  <textarea rows={3} value={formData.educationRaw} onChange={e => setFormData({...formData, educationRaw: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-teal-500 text-sm resize-none" placeholder="Üniversite Adı (Yıl)&#10;Sertifika Programı&#10;Birlik Üyeliği..." />
                </div>
                <div className="md:col-span-2 flex justify-end gap-3">
                  {isEditing && (
                    <button type="button" onClick={handleCancelEdit} className="px-6 py-2.5 border border-slate-300 text-slate-600 font-bold rounded-lg hover:bg-slate-50 text-sm">
                      İptal
                    </button>
                  )}
                  <button type="submit" disabled={isUploadingDoc} className={`px-6 py-2.5 font-bold rounded-lg disabled:opacity-50 text-sm flex items-center gap-2 text-white ${isEditing ? "bg-amber-500 hover:bg-amber-600" : "bg-teal-600 hover:bg-teal-700"}`}>
                    {isUploadingDoc ? <Loader2 className="animate-spin" size={20} /> : isEditing ? "Değişiklikleri Kaydet" : "Doktor Ekle"}
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(doctors) && doctors.map(doc => (
                <div key={doc.id} className={`border-2 rounded-xl overflow-hidden bg-white transition-colors ${editingDoctor?.id === doc.id ? "border-amber-400 shadow-amber-100 shadow-md" : "border-slate-200"}`}>
                  <div className="flex gap-4 p-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={doc.imageUrl} alt={doc.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm">{doc.name}</p>
                      <p className="text-xs text-teal-600 font-medium mb-2">{doc.specialization}</p>
                      <div className="flex flex-wrap gap-1">
                        {(doc as any).specialties?.slice(0, 2).map((s: string) => (
                          <span key={s} className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs rounded-full">{s}</span>
                        ))}
                        {(doc as any).specialties?.length > 2 && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full">+{(doc as any).specialties.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t border-slate-100">
                    <button
                      onClick={() => handleEditDoctor(doc)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-amber-600 hover:bg-amber-50 transition-colors"
                    >
                      <Pencil size={13} /> Düzenle
                    </button>
                    <div className="w-px bg-slate-100" />
                    <button
                      onClick={() => handleDeleteDoctor(doc.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={13} /> Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "media" && (
          <div className="space-y-4">
            <p className="text-sm text-slate-500 mb-6 font-medium bg-blue-50 text-blue-700 p-4 rounded-xl border border-blue-100">
              Buradan sitenizdeki belirli görselleri değiştirebilirsiniz. Resim yükledikten sonra otomatik olarak WEBP formatına çevrilir ve kalite optimizasyonu yapılır.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {predefinedSections.map(section => {
                const currentUrl = getMediaUrl(section.key);
                return (
                  <div key={section.key} className="border border-slate-200 rounded-xl p-4 flex gap-4 bg-slate-50 items-center">
                    <div className="w-20 h-20 bg-slate-200 rounded-lg overflow-hidden shrink-0 border border-slate-300 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {currentUrl ? <img src={currentUrl} className="w-full h-full object-cover" alt="preview" /> : <ImageIcon className="absolute inset-0 m-auto text-slate-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-700 text-sm mb-2 truncate" title={section.label}>{section.label}</h4>
                      <div className="flex gap-2">
                        <input type="file" accept="image/*" onChange={e => setMediaFiles(prev => ({...prev, [section.key]: e.target.files?.[0] as File}))} className="text-xs flex-1 min-w-0 bg-white border border-slate-200 rounded p-1" />
                        <button 
                          onClick={() => handleMediaUpload(section.key)}
                          disabled={!mediaFiles[section.key] || uploadingMedia === section.key}
                          className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-bold disabled:opacity-50 hover:bg-teal-700 flex items-center gap-1 shrink-0"
                        >
                          {uploadingMedia === section.key ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                          Yükle
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
