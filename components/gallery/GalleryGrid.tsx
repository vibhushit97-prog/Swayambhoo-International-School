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
            className="group relative bg-white border border-[#EAE3D7] hover:border-[#C5A059] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative aspect-4/3 w-full bg-[#FAF6EE] overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-[#0E241B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-10 h-10 bg-white/90 text-[#14342B] flex items-center justify-center shadow-lg border border-white">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              {/* Tag Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-[#081611]/85 text-[#C5A059] text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 border border-[#C5A059]/40">
                  {item.categoryLabel}
                </span>
              </div>

              {item.isConceptual && (
                <div className="absolute top-3 right-3">
                  <span className="bg-black/60 text-white/80 text-[9px] uppercase tracking-wider px-2 py-0.5 backdrop-blur-xs">
                    Concept
                  </span>
                </div>
              )}
            </div>

            {/* Description Card Footer */}
            <div className="p-4 border-t border-[#F5EFEB]">
              <h4 className="font-serif font-bold text-base text-[#14342B] mb-1 group-hover:text-[#856627] transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-[#181C20]/70 line-clamp-2 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-[#FAF6EE] border border-[#E2DBD0]">
          <p className="text-sm text-[#181C20]/70">No images found in this category.</p>
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
