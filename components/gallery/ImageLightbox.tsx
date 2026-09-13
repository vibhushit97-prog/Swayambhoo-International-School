"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { GalleryItem } from "@/types/gallery";
import { X, ChevronLeft, ChevronRight, ShieldAlert } from "lucide-react";

interface ImageLightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      } else if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % items.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between text-white z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] px-2.5 py-1 bg-[#14342B] border border-[#C5A059]/40">
            {currentItem.categoryLabel}
          </span>
          <span className="text-xs text-white/70">
            {currentIndex + 1} of {items.length}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-[#C5A059]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() =>
          onNavigate((currentIndex - 1 + items.length) % items.length)
        }
        aria-label="Previous image"
        className="absolute left-4 sm:left-6 z-20 p-3 bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#C5A059]"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => onNavigate((currentIndex + 1) % items.length)}
        aria-label="Next image"
        className="absolute right-4 sm:right-6 z-20 p-3 bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#C5A059]"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Center Image Container */}
      <div className="relative w-full max-w-5xl max-h-[75vh] h-full mx-4 sm:mx-16 flex items-center justify-center">
        <div className="relative w-full h-full max-h-[70vh]">
          <Image
            src={currentItem.src}
            alt={currentItem.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom Caption Bar */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white text-center z-20 bg-gradient-to-t from-black/90 to-transparent">
        <div className="max-w-3xl mx-auto space-y-1">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
            {currentItem.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#E8DFC8]/90 font-sans leading-relaxed">
            {currentItem.description}
          </p>
          {currentItem.isConceptual && (
            <p className="text-[11px] text-[#C5A059] flex items-center justify-center gap-1.5 pt-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Proposed Campus Concept • Architectural Visualization</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
