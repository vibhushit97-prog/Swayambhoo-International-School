"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function AdminSchoolProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "Swayambhoo International School",
    tagline: "LEARN. EXPLORE. CREATE. LEAD.",
    motto: "LEARN • GROW • LEAD",
    campusMotto: "Discipline Today, Leadership Tomorrow",
    description: "",
    addressStreet: "",
    addressLocality: "Wazirganj",
    addressCity: "Gaya",
    addressState: "Bihar",
    addressPincode: "805131",
    phone: "",
    whatsapp: "",
    email: "",
    admissionsEmail: "",
    logoUrl: "/logo/swayambhoo-logo.svg",
    heroImageUrl: "/images/hero/swayambhoo-hero-facade.jpg",
    admissionCtaTitle: "Admissions Open for Academic Session 2026–2027",
    admissionCtaSubtitle: "Secure your child's future at Gaya's premier educational campus.",
    footerText: "Rooted in timeless values and modern innovation: 'Discipline Today, Leadership Tomorrow'.",
    facebook: "",
    instagram: "",
    youtube: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/admin/school-profile");
        const data = await res.json();
        if (data.profile) {
          const p = data.profile;
          setFormData({
            name: p.name || "",
            tagline: p.tagline || "",
            motto: p.motto || "",
            campusMotto: p.campusMotto || "",
            description: p.description || "",
            addressStreet: p.addressStreet || "",
            addressLocality: p.addressLocality || "",
            addressCity: p.addressCity || "",
            addressState: p.addressState || "",
            addressPincode: p.addressPincode || "",
            phone: p.phone || "",
            whatsapp: p.whatsapp || "",
            email: p.email || "",
            admissionsEmail: p.admissionsEmail || "",
            logoUrl: p.logoUrl || "",
            heroImageUrl: p.heroImageUrl || "",
            admissionCtaTitle: p.admissionCtaTitle || "",
            admissionCtaSubtitle: p.admissionCtaSubtitle || "",
            footerText: p.footerText || "",
            facebook: p.socialLinks?.facebook || "",
            instagram: p.socialLinks?.instagram || "",
            youtube: p.socialLinks?.youtube || "",
          });
        }
      } catch (err) {
        console.error("Profile load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    const payload = {
      ...formData,
      socialLinks: {
        facebook: formData.facebook,
        instagram: formData.instagram,
        youtube: formData.youtube,
      },
    };

    try {
      const res = await fetch("/api/admin/school-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update profile");
      }

      setSuccessMsg("School profile and institutional metadata saved successfully.");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-stone-500 flex flex-col items-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#14342B]" />
        <p className="mt-2 text-xs">Loading school profile...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            School Profile & Branding CMS
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Global institutional details consumed dynamically by public pages, navigation, and footers
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#14342B] hover:bg-[#0E241B] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm transition-all disabled:opacity-60 cursor-pointer"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" />
          ) : (
            <Save className="w-4 h-4 text-[#C5A059]" />
          )}
          <span>Save Changes</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Basic Identity */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
        <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
          Institutional Identity
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              School Legal Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-1 focus:ring-[#14342B]"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              Tagline
            </label>
            <input
              type="text"
              name="tagline"
              required
              value={formData.tagline}
              onChange={handleChange}
              className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-1 focus:ring-[#14342B]"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              Core Motto
            </label>
            <input
              type="text"
              name="motto"
              required
              value={formData.motto}
              onChange={handleChange}
              className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-1 focus:ring-[#14342B]"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              Campus Inscription
            </label>
            <input
              type="text"
              name="campusMotto"
              required
              value={formData.campusMotto}
              onChange={handleChange}
              className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-1 focus:ring-[#14342B]"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
            Institutional Description & Ethos
          </label>
          <textarea
            rows={3}
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2.5 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#14342B]"
          />
        </div>
      </div>

      {/* Visual Assets */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
        <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
          Hero Imagery & Crest
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ImageUploader
            label="Hero Architecture Photo"
            folder="hero"
            value={formData.heroImageUrl}
            onChange={(url) => setFormData((prev) => ({ ...prev, heroImageUrl: url }))}
          />
          <ImageUploader
            label="School Logo / Crest"
            folder="branding"
            value={formData.logoUrl}
            onChange={(url) => setFormData((prev) => ({ ...prev, logoUrl: url }))}
          />
        </div>
      </div>

      {/* Contact & Location */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
        <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
          Campus Location & Official Contact
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="sm:col-span-2">
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              Street / Campus Route
            </label>
            <input
              type="text"
              name="addressStreet"
              required
              value={formData.addressStreet}
              onChange={handleChange}
              className="w-full p-2.5 border border-stone-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              Locality
            </label>
            <input
              type="text"
              name="addressLocality"
              required
              value={formData.addressLocality}
              onChange={handleChange}
              className="w-full p-2.5 border border-stone-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              City
            </label>
            <input
              type="text"
              name="addressCity"
              required
              value={formData.addressCity}
              onChange={handleChange}
              className="w-full p-2.5 border border-stone-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              State
            </label>
            <input
              type="text"
              name="addressState"
              required
              value={formData.addressState}
              onChange={handleChange}
              className="w-full p-2.5 border border-stone-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              PIN Code
            </label>
            <input
              type="text"
              name="addressPincode"
              required
              value={formData.addressPincode}
              onChange={handleChange}
              className="w-full p-2.5 border border-stone-300 rounded-lg font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div>
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              Official Phone
            </label>
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2.5 border border-stone-300 rounded-lg font-mono"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              Official WhatsApp Number
            </label>
            <input
              type="text"
              name="whatsapp"
              required
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full p-2.5 border border-stone-300 rounded-lg font-mono"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              General Info Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2.5 border border-stone-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              Admissions Email
            </label>
            <input
              type="email"
              name="admissionsEmail"
              required
              value={formData.admissionsEmail}
              onChange={handleChange}
              className="w-full p-2.5 border border-stone-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Call to Action & Footer */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs">
        <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
          Admission Banner & Footer Settings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              Admission CTA Headline
            </label>
            <input
              type="text"
              name="admissionCtaTitle"
              required
              value={formData.admissionCtaTitle}
              onChange={handleChange}
              className="w-full p-2.5 border border-stone-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              Admission CTA Subtitle
            </label>
            <input
              type="text"
              name="admissionCtaSubtitle"
              required
              value={formData.admissionCtaSubtitle}
              onChange={handleChange}
              className="w-full p-2.5 border border-stone-300 rounded-lg"
            />
          </div>
        </div>
        <div>
          <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
            Footer Text Inscription
          </label>
          <input
            type="text"
            name="footerText"
            required
            value={formData.footerText}
            onChange={handleChange}
            className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#14342B] hover:bg-[#0E241B] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shadow-md transition-all cursor-pointer"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" />}
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
}
