"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GalleryItem } from "@/types/gallery";
import { GalleryFilter } from "./GalleryFilter";
import { ImageLightbox } from "./ImageLightbox";
import { Maximize2 } from "lucide-react";

interface GalleryGridProps {
  initialItems: GalleryItem[];
}

export function GalleryGrid({ initialItems }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? initialItems
      : initialItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      <GalleryFilter
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(idx)}
            className="group relative bg-[#FBF9F2] border border-[#DEDCCF] hover:border-[#B88A2A] rounded-2xl shadow-[0_4px_20px_rgba(15,71,53,0.04)] hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative aspect-4/3 w-full bg-[#E7EDE2] overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-[#083526]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-10 h-10 bg-white/95 text-[#083526] rounded-full flex items-center justify-center shadow-lg border border-[#B88A2A]">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              {/* Tag Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-[#083526]/90 text-[#D4B15A] text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 border border-[#B88A2A]/40 rounded-md shadow-xs">
                  {item.categoryLabel}
                </span>
              </div>

              {item.isConceptual && (
                <div className="absolute top-3 right-3">
                  <span className="bg-black/60 text-white/90 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm backdrop-blur-xs font-medium">
                    Concept
                  </span>
                </div>
              )}
            </div>

            {/* Description Card Footer */}
            <div className="p-4 border-t border-[#DEDCCF]">
              <h4 className="font-serif font-bold text-base text-[#0F4735] mb-1 group-hover:text-[#B88A2A] transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-[#26332E] line-clamp-2 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-[#FBF9F2] border border-[#DEDCCF] rounded-2xl">
          <p className="text-sm text-[#26332E]">No images found in this category.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      <ImageLightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
