"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, Loader2, Save } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ImageUploader } from "@/components/admin/ImageUploader";

interface GalleryCategory {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
}

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  altText: string;
  imageUrl: string;
  categoryId: string | null;
  category?: GalleryCategory | null;
  sortOrder: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export default function AdminGalleryPage() {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCatId, setSelectedCatId] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  const [imageForm, setImageForm] = useState({
    title: "",
    description: "",
    altText: "",
    imageUrl: "",
    categoryId: "",
    sortOrder: 0,
    status: "PUBLISHED" as "DRAFT" | "PUBLISHED" | "ARCHIVED",
  });

  const [catForm, setCatForm] = useState({ name: "", slug: "", sortOrder: 0 });
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [reorderMap, setReorderMap] = useState<Record<string, number>>({});
  const [reorderSaving, setReorderSaving] = useState(false);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
        setImages(data.images);
        const initialReorder: Record<string, number> = {};
        data.images.forEach((img: GalleryImage) => {
          initialReorder[img.id] = img.sortOrder;
        });
        setReorderMap(initialReorder);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetch("/api/admin/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success) {
          setCategories(data.categories);
          setImages(data.images);
          const initialReorder: Record<string, number> = {};
          data.images.forEach((img: GalleryImage) => {
            initialReorder[img.id] = img.sortOrder;
          });
          setReorderMap(initialReorder);
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

  const handleOpenAddImage = () => {
    setEditingImage(null);
    setImageForm({
      title: "",
      description: "",
      altText: "",
      imageUrl: "",
      categoryId: categories[0]?.id || "",
      sortOrder: images.length + 1,
      status: "PUBLISHED",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditImage = (img: GalleryImage) => {
    setEditingImage(img);
    setImageForm({
      title: img.title,
      description: img.description || "",
      altText: img.altText,
      imageUrl: img.imageUrl,
      categoryId: img.categoryId || "",
      sortOrder: img.sortOrder,
      status: img.status,
    });
    setIsModalOpen(true);
  };

  const handleSaveImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const method = editingImage ? "PUT" : "POST";
      const payload = {
        ...(editingImage ? { id: editingImage.id } : {}),
        ...imageForm,
      };

      const res = await fetch("/api/admin/gallery", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchGallery();
        setIsModalOpen(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCategory: true, ...catForm }),
      });
      if (res.ok) {
        await fetchGallery();
        setIsCategoryModalOpen(false);
        setCatForm({ name: "", slug: "", sortOrder: 0 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveReorder = async () => {
    setReorderSaving(true);
    try {
      const reorderList = Object.entries(reorderMap).map(([id, sortOrder]) => ({
        id,
        sortOrder,
      }));
      const res = await fetch("/api/admin/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reorder: reorderList }),
      });
      if (res.ok) {
        await fetchGallery();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setReorderSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${deleteTargetId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== deleteTargetId));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDeleteTargetId(null);
    }
  };

  const filteredImages =
    selectedCatId === "ALL"
      ? images
      : images.filter((img) => img.categoryId === selectedCatId);

  if (loading) {
    return (
      <div className="p-12 text-center text-stone-500 flex flex-col items-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#14342B]" />
        <p className="mt-2 text-xs">Loading campus gallery...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            Gallery & Campus Media CMS
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Curate architectural photos, classroom highlights, and category arrangements
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="px-3 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
          >
            + New Category
          </button>
          <button
            onClick={handleOpenAddImage}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#14342B] hover:bg-[#0E241B] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#C5A059]" />
            <span>Upload Photo</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-px gap-4">
        <div className="flex overflow-x-auto gap-2 scrollbar-none">
          <button
            onClick={() => setSelectedCatId("ALL")}
            className={`pb-3 px-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
              selectedCatId === "ALL"
                ? "border-[#14342B] text-[#14342B] font-semibold"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            All Works ({images.length})
          </button>
          {categories.map((cat) => {
            const count = images.filter((i) => i.categoryId === cat.id).length;
            const isActive = selectedCatId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`pb-3 px-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                  isActive
                    ? "border-[#14342B] text-[#14342B] font-semibold"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        <button
          onClick={handleSaveReorder}
          disabled={reorderSaving}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-xs font-medium transition-colors"
          title="Save manual sort order numbers"
        >
          {reorderSaving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5 text-[#14342B]" />
          )}
          <span>Save Sort Order</span>
        </button>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 w-full bg-stone-100">
                <Image
                  src={img.imageUrl}
                  alt={img.altText}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute top-2 left-2">
                  <StatusBadge status={img.status} />
                </div>
                {img.category && (
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-sans font-medium">
                    {img.category.name}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h4 className="font-serif font-bold text-stone-900 text-sm line-clamp-1">
                  {img.title}
                </h4>
                <p className="text-[11px] text-stone-500 line-clamp-2 mt-1">
                  {img.description || img.altText}
                </p>
              </div>
            </div>

            <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-stone-500 uppercase font-semibold">
                  Order:
                </span>
                <input
                  type="number"
                  value={reorderMap[img.id] ?? img.sortOrder}
                  onChange={(e) =>
                    setReorderMap({
                      ...reorderMap,
                      [img.id]: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-12 py-0.5 px-1 bg-white border border-stone-300 rounded text-center text-[11px]"
                />
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEditImage(img)}
                  className="p-1.5 text-stone-600 hover:text-[#14342B] hover:bg-stone-200 rounded"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTargetId(img.id)}
                  className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-stone-200 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
              {editingImage ? "Edit Gallery Image" : "Add Image to Gallery"}
            </h3>

            <form onSubmit={handleSaveImage} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Neoclassical Colonnade Facade"
                  value={imageForm.title}
                  onChange={(e) => setImageForm({ ...imageForm, title: e.target.value })}
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                    Category
                  </label>
                  <select
                    value={imageForm.categoryId}
                    onChange={(e) =>
                      setImageForm({ ...imageForm, categoryId: e.target.value })
                    }
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={imageForm.sortOrder}
                    onChange={(e) =>
                      setImageForm({
                        ...imageForm,
                        sortOrder: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                  Alt Text (SEO & Accessibility)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Descriptive explanation of the photo"
                  value={imageForm.altText}
                  onChange={(e) =>
                    setImageForm({ ...imageForm, altText: e.target.value })
                  }
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  value={imageForm.description}
                  onChange={(e) =>
                    setImageForm({ ...imageForm, description: e.target.value })
                  }
                  placeholder="Optional architectural or context description..."
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <ImageUploader
                label="Gallery Photo"
                folder="gallery"
                value={imageForm.imageUrl}
                onChange={(url) => setImageForm({ ...imageForm, imageUrl: url })}
              />

              <div>
                <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                  Publish Status
                </label>
                <select
                  value={imageForm.status}
                  onChange={(e) =>
                    setImageForm({
                      ...imageForm,
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
                  <span>Save Image</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border border-stone-200">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
              Add Gallery Category
            </h3>
            <form onSubmit={handleSaveCategory} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Landscaping"
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. landscaping"
                  value={catForm.slug}
                  onChange={(e) => setCatForm({ ...catForm, slug: e.target.value })}
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                />
              </div>
              <div className="mt-5 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 text-xs font-medium text-white bg-[#14342B] hover:bg-[#0E241B] rounded-lg shadow-sm"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Delete Photo"
        message="Are you sure you want to delete this photo from the campus gallery?"
        confirmLabel="Delete Photo"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
