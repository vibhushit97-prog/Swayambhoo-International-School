"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ImageUploader } from "@/components/admin/ImageUploader";

interface Facility {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: string;
  description: string;
  imageUrl: string;
  features: string[];
  displayOrder: number;
  isFeatured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export default function AdminFacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    tagline: "",
    category: "Campus",
    description: "",
    imageUrl: "/images/hero/swayambhoo-hero-facade.jpg",
    featuresRaw: "",
    displayOrder: 0,
    isFeatured: false,
    status: "PUBLISHED" as "DRAFT" | "PUBLISHED" | "ARCHIVED",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const fetchFacilities = async () => {
    try {
      const res = await fetch("/api/admin/facilities");
      const data = await res.json();
      if (data.success) {
        setFacilities(data.facilities);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetch("/api/admin/facilities")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success) {
          setFacilities(data.facilities);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenAdd = () => {
    setEditingFacility(null);
    setFormData({
      name: "",
      slug: "",
      tagline: "",
      category: "Campus",
      description: "",
      imageUrl: "",
      featuresRaw: "",
      displayOrder: facilities.length + 1,
      isFeatured: false,
      status: "PUBLISHED",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (fac: Facility) => {
    setEditingFacility(fac);
    setFormData({
      name: fac.name,
      slug: fac.slug,
      tagline: fac.tagline,
      category: fac.category,
      description: fac.description,
      imageUrl: fac.imageUrl,
      featuresRaw: fac.features.join("\n"),
      displayOrder: fac.displayOrder,
      isFeatured: fac.isFeatured,
      status: fac.status,
    });
    setIsModalOpen(true);
  };

  const handleSaveFacility = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const features = formData.featuresRaw
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      ...(editingFacility ? { id: editingFacility.id } : {}),
      name: formData.name,
      slug: formData.slug,
      tagline: formData.tagline,
      category: formData.category,
      description: formData.description,
      imageUrl: formData.imageUrl,
      features,
      displayOrder: formData.displayOrder,
      isFeatured: formData.isFeatured,
      status: formData.status,
    };

    try {
      const method = editingFacility ? "PUT" : "POST";
      const res = await fetch("/api/admin/facilities", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchFacilities();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetch(`/api/admin/facilities?id=${deleteTargetId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFacilities((prev) => prev.filter((f) => f.id !== deleteTargetId));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDeleteTargetId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-stone-500 flex flex-col items-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#14342B]" />
        <p className="mt-2 text-xs">Loading facilities...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            Campus Facilities CMS
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Manage institutional infrastructure, architectural features, and publication states
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14342B] hover:bg-[#0E241B] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#C5A059]" />
          <span>Add Facility</span>
        </button>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((fac) => (
          <div
            key={fac.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-stone-100">
                <Image
                  src={fac.imageUrl}
                  alt={fac.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <StatusBadge status={fac.status} />
                  {fac.isFeatured && (
                    <span className="bg-[#C5A059] text-[#0E241B] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] px-2 py-0.5 rounded font-mono">
                  #{fac.displayOrder}
                </div>
              </div>

              <div className="p-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
                  {fac.category}
                </span>
                <h3 className="font-serif text-base font-bold text-stone-900 mt-1">
                  {fac.name}
                </h3>
                <p className="text-xs text-stone-500 italic mt-0.5">{fac.tagline}</p>
                <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                  {fac.description}
                </p>

                {fac.features && fac.features.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap gap-1">
                    {fac.features.slice(0, 3).map((feat) => (
                      <span
                        key={feat}
                        className="px-2 py-0.5 bg-stone-50 text-stone-600 rounded text-[10px] border border-stone-100"
                      >
                        {feat}
                      </span>
                    ))}
                    {fac.features.length > 3 && (
                      <span className="text-[10px] text-stone-400 py-0.5">
                        +{fac.features.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-mono text-[11px]">/{fac.slug}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(fac)}
                  className="p-1.5 text-stone-600 hover:text-[#14342B] hover:bg-stone-200 rounded"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTargetId(fac.id)}
                  className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 border border-stone-200 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
              {editingFacility ? "Edit Facility" : "Create New Campus Facility"}
            </h3>

            <form onSubmit={handleSaveFacility} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                    Facility Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Smart Classrooms"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. smart-classrooms"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Digitally enabled, daylight-optimized spaces"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Academics / Innovation / Athletics"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed architectural and functional specifications..."
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <ImageUploader
                label="Facility Photo"
                folder="facilities"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              />

              <div>
                <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                  Features (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.featuresRaw}
                  onChange={(e) => setFormData({ ...formData, featuresRaw: e.target.value })}
                  placeholder="75-inch 4K Interactive Touch Panels&#10;Acoustic Insulation & Low-Glare Windows&#10;Ergonomic Posture-Friendly Wooden Desks"
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-sans"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })
                    }
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                    Publish Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "DRAFT" | "PUBLISHED" | "ARCHIVED",
                      })
                    }
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        setFormData({ ...formData, isFeatured: e.target.checked })
                      }
                      className="rounded border-stone-300 text-[#14342B] focus:ring-[#14342B]"
                    />
                    <span className="font-semibold text-stone-800 text-[11px]">
                      Feature on Home
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 text-xs font-medium text-white bg-[#14342B] hover:bg-[#0E241B] rounded-lg shadow-sm flex items-center gap-1.5"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Facility</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Delete Facility"
        message="Are you sure you want to delete this facility record from the database?"
        confirmLabel="Delete Facility"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
