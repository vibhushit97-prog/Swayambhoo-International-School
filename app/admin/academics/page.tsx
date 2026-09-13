"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ImageUploader } from "@/components/admin/ImageUploader";

interface Stream {
  id: string;
  name: string;
  slug: string;
  description: string;
  subjects: string[];
  isOffered: boolean;
  displayOrder: number;
}

interface AcademicStage {
  id: string;
  slug: string;
  title: string;
  classes: string;
  ageRange: string;
  description: string;
  imageUrl: string | null;
  displayOrder: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  streams: Stream[];
}

export default function AdminAcademicsPage() {
  const [stages, setStages] = useState<AcademicStage[]>([]);
  const [loading, setLoading] = useState(true);

  // Stage Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStage, setEditingStage] = useState<AcademicStage | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    classes: "",
    ageRange: "",
    description: "",
    imageUrl: "",
    displayOrder: 0,
    status: "PUBLISHED" as "DRAFT" | "PUBLISHED" | "ARCHIVED",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [togglingStreamId, setTogglingStreamId] = useState<string | null>(null);

  const fetchStages = async () => {
    try {
      const res = await fetch("/api/admin/academics");
      const data = await res.json();
      if (data.success) {
        setStages(data.stages);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetch("/api/admin/academics")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success) {
          setStages(data.stages);
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
    setEditingStage(null);
    setFormData({
      title: "",
      slug: "",
      classes: "",
      ageRange: "",
      description: "",
      imageUrl: "",
      displayOrder: stages.length + 1,
      status: "PUBLISHED",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (stage: AcademicStage) => {
    setEditingStage(stage);
    setFormData({
      title: stage.title,
      slug: stage.slug,
      classes: stage.classes,
      ageRange: stage.ageRange,
      description: stage.description,
      imageUrl: stage.imageUrl || "",
      displayOrder: stage.displayOrder,
      status: stage.status,
    });
    setIsModalOpen(true);
  };

  const handleSaveStage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const method = editingStage ? "PUT" : "POST";
      const payload = editingStage
        ? { id: editingStage.id, ...formData }
        : formData;

      const res = await fetch("/api/admin/academics", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchStages();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStream = async (stream: Stream) => {
    setTogglingStreamId(stream.id);
    try {
      const res = await fetch("/api/admin/academics", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          streamId: stream.id,
          isOffered: !stream.isOffered,
        }),
      });
      if (res.ok) {
        setStages((prev) =>
          prev.map((st) => ({
            ...st,
            streams: st.streams.map((str) =>
              str.id === stream.id
                ? { ...str, isOffered: !str.isOffered }
                : str
            ),
          }))
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTogglingStreamId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetch(`/api/admin/academics?id=${deleteTargetId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setStages((prev) => prev.filter((s) => s.id !== deleteTargetId));
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
        <p className="mt-2 text-xs">Loading academic stages...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            Academic Stages & Senior Secondary Streams
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Configure school stages, grade bands, pedagogical descriptions, and official stream availability
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14342B] hover:bg-[#0E241B] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#C5A059]" />
          <span>Add Academic Stage</span>
        </button>
      </div>

      {/* Stages List */}
      <div className="space-y-4">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs hover:border-[#14342B]/30 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center font-mono">
                    {stage.displayOrder}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    {stage.title}
                  </h3>
                  <StatusBadge status={stage.status} />
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-stone-600">
                  <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-800 font-medium">
                    {stage.classes}
                  </span>
                  <span>Age: {stage.ageRange}</span>
                </div>

                <p className="mt-2 text-xs text-stone-600 leading-relaxed max-w-3xl">
                  {stage.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(stage)}
                  className="p-1.5 text-stone-600 hover:text-[#14342B] hover:bg-stone-100 rounded"
                  title="Edit Stage"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTargetId(stage.id)}
                  className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded"
                  title="Delete Stage"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Configurable Streams for Senior Secondary */}
            {stage.streams && stage.streams.length > 0 && (
              <div className="mt-5 pt-4 border-t border-stone-100 bg-[#FDFBF7] -mx-6 -mb-6 p-6 rounded-b-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      Configurable +2 Senior Secondary Streams
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Streams will only appear as officially offered on public pages when toggled on by administrator.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {stage.streams.map((stream) => (
                    <div
                      key={stream.id}
                      className={`p-3.5 rounded-lg border text-xs transition-all ${
                        stream.isOffered
                          ? "bg-white border-emerald-300 shadow-xs"
                          : "bg-stone-50/80 border-stone-200 text-stone-500"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-semibold text-stone-900">{stream.name}</h5>
                        <button
                          type="button"
                          disabled={togglingStreamId === stream.id}
                          onClick={() => handleToggleStream(stream)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 ${
                            stream.isOffered
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-stone-200 text-stone-700 hover:bg-stone-300"
                          }`}
                        >
                          {togglingStreamId === stream.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : stream.isOffered ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                              Offered
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-stone-500" />
                              Not Offered
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">
                        {stream.description}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {stream.subjects.map((sub) => (
                          <span
                            key={sub}
                            className="px-1.5 py-0.2 bg-stone-100 text-stone-600 rounded text-[10px]"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for Add / Edit Stage */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 border border-stone-200 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
              {editingStage ? "Edit Academic Stage" : "Create New Academic Stage"}
            </h3>

            <form onSubmit={handleSaveStage} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                    Stage Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Primary School"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                    placeholder="e.g. primary-school"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                    Class / Grade Range
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grades 1 to 5"
                    value={formData.classes}
                    onChange={(e) => setFormData({ ...formData, classes: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                    Age Group Range
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6 – 10 Years"
                    value={formData.ageRange}
                    onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                  Curriculum & Pedagogical Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summarize stage focus, inquiry methodologies, and student growth..."
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <ImageUploader
                label="Stage Feature Photo"
                folder="academics"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              />

              <div className="grid grid-cols-2 gap-3">
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
                  <span>Save Stage</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Delete Academic Stage"
        message="Are you sure you want to delete this stage? Associated stream configurations will also be removed."
        confirmLabel="Delete Stage"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
