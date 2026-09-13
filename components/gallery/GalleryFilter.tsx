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
              "px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer border rounded-full focus-visible:outline-2 focus-visible:outline-[#B88A2A]",
              isActive
                ? "bg-[#083526] text-[#D4B15A] border-[#B88A2A] shadow-xs"
                : "bg-white text-[#26332E] border-[#DEDCCF] hover:border-[#B88A2A] hover:bg-[#FBF9F2]"
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
