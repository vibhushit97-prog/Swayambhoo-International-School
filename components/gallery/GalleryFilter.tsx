import React from "react";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface GalleryFilterProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function GalleryFilter({
  activeCategory,
  onSelectCategory,
}: GalleryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
      {GALLERY_CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={cn(
              "px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer border focus-visible:outline-2 focus-visible:outline-[#C5A059]",
              isActive
                ? "bg-[#14342B] text-[#FDFBF7] border-[#14342B] shadow-sm"
                : "bg-white text-[#181C20]/80 border-[#E2DBD0] hover:border-[#C5A059] hover:bg-[#FAF6EE]"
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
