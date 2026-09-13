"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export function ImageUploader({
  value,
  onChange,
  folder = "general",
  label = "Featured Image / Photo",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side quick check
    if (file.size > 5 * 1024 * 1024) {
      setError("File exceeds 5MB size limit.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to upload image");
      }

      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
        {label}
      </label>

      {value ? (
        <div className="relative group w-full max-w-sm h-48 rounded-lg overflow-hidden border border-stone-200 bg-stone-50">
          <Image
            src={value}
            alt="Uploaded Preview"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-white text-stone-800 rounded text-xs font-medium hover:bg-stone-100 shadow"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700 shadow"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute bottom-2 left-2 bg-emerald-600/90 text-white px-2 py-0.5 rounded text-[11px] flex items-center gap-1 backdrop-blur-sm">
            <CheckCircle2 className="w-3 h-3" /> Ready
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            uploading
              ? "bg-stone-50 border-stone-300 pointer-events-none"
              : "border-stone-300 hover:border-[#14342B] hover:bg-stone-50/50"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center text-stone-500 py-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#14342B]" />
              <p className="mt-2 text-xs font-medium">Uploading to storage...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-2">
              <UploadCloud className="w-8 h-8 text-stone-400 mb-2" />
              <p className="text-xs font-medium text-stone-800">
                Click to upload image or drag & drop
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                PNG, JPG, WebP up to 5MB
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="text-xs text-red-600 flex items-center gap-1.5 mt-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
