"use client";

import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, Trash2 } from "lucide-react";

export interface UploadedDoc {
  documentType: string;
  filename: string;
  storageKey: string;
  mimeType: string;
  fileSize: number;
}

interface DocumentsUploadStepProps {
  documents: UploadedDoc[];
  onChange: (docs: UploadedDoc[]) => void;
  error?: string;
}

const DOCUMENT_SLOTS = [
  { type: "Resume / CV", label: "Curriculum Vitae / Resume", required: true },
  { type: "Profile Photo", label: "Formal Passport Photograph", required: false },
  { type: "10th Certificate", label: "Secondary / 10th Certificate & Marksheet", required: false },
  { type: "12th Certificate", label: "Senior Secondary / 12th Certificate", required: false },
  { type: "Graduation Certificate", label: "Graduation Degree Certificate", required: false },
  { type: "Post Graduation Certificate", label: "Post Graduation Degree Certificate", required: false },
  { type: "B.Ed Certificate", label: "B.Ed / Teaching Degree Certificate", required: false },
  { type: "CTET/STET Certificate", label: "CTET / STET Marksheet & Eligibility Card", required: false },
  { type: "Experience Certificate", label: "Previous Employment Experience Certificate", required: false },
  { type: "Other Documents", label: "Other Certifications / Awards", required: false },
];

export function DocumentsUploadStep({
  documents,
  onChange,
  error,
}: DocumentsUploadStepProps) {
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [slotErrors, setSlotErrors] = useState<Record<string, string>>({});

  const handleFileUpload = async (slotType: string, file: File) => {
    // 1. Client-Side Size Check (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setSlotErrors((prev) => ({
        ...prev,
        [slotType]: "File exceeds maximum size limit of 10MB.",
      }));
      return;
    }

    setUploadingSlot(slotType);
    setSlotErrors((prev) => ({ ...prev, [slotType]: "" }));

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentType", slotType);

      const res = await fetch("/api/recruitment/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Upload failed");
      }

      // Replace existing slot or append
      const filtered = documents.filter((d) => d.documentType !== slotType);
      onChange([...filtered, data.document]);
    } catch (err: any) {
      setSlotErrors((prev) => ({
        ...prev,
        [slotType]: err.message || "Failed to upload file",
      }));
    } finally {
      setUploadingSlot(null);
    }
  };

  const handleRemoveDoc = (slotType: string) => {
    onChange(documents.filter((d) => d.documentType !== slotType));
    setSlotErrors((prev) => ({ ...prev, [slotType]: "" }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#EAE2D5] pb-4">
        <h3 className="font-serif font-bold text-lg text-[#14342B] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#C5A059]" />
          <span>Upload Credentials & Documents</span>
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5 font-sans">
          Supported Formats: <strong>PDF, JPG, PNG, DOC, DOCX</strong>. Maximum file size: <strong>10MB per file</strong>.
          Uploaded documents are stored in secure private storage and never exposed publicly.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DOCUMENT_SLOTS.map((slot) => {
          const uploaded = documents.find((d) => d.documentType === slot.type);
          const isUploading = uploadingSlot === slot.type;
          const slotError = slotErrors[slot.type];

          return (
            <div
              key={slot.type}
              className={`p-4 rounded-xl border transition-all ${
                uploaded
                  ? "bg-emerald-50/50 border-emerald-200 shadow-xs"
                  : slot.required
                  ? "bg-white border-[#C5A059]/40 shadow-xs"
                  : "bg-white border-[#E2DBD0]"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-xs font-bold text-[#14342B] flex items-center gap-1.5">
                    <span>{slot.label}</span>
                    {slot.required && (
                      <span className="text-red-500 font-bold">* Required</span>
                    )}
                  </h4>
                </div>
                {uploaded && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Uploaded</span>
                  </span>
                )}
              </div>

              {uploaded ? (
                <div className="flex items-center justify-between p-2.5 bg-white border border-emerald-200 rounded-lg text-xs">
                  <div className="truncate max-w-[220px]">
                    <span className="font-medium text-[#181C20] block truncate">
                      {uploaded.filename}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {(uploaded.fileSize / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveDoc(slot.type)}
                    className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                    title="Remove and replace"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <label className="flex flex-col items-center justify-center p-3.5 border-2 border-dashed border-[#E2DBD0] hover:border-[#C5A059] rounded-lg cursor-pointer bg-[#FAF6EE]/50 hover:bg-[#FAF6EE] transition-colors">
                    {isUploading ? (
                      <div className="flex items-center gap-2 text-xs text-[#856627]">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-[#64748B]">
                        <Upload className="w-4 h-4 text-[#C5A059]" />
                        <span className="font-medium">Choose file to upload</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                      disabled={isUploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(slot.type, file);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {slotError && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">
                  {slotError}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
