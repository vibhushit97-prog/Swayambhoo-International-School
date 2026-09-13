import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  theme = "light",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        isCenter ? "text-center mx-auto max-w-3xl" : "max-w-2xl",
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-2 mb-3.5 px-3 py-1 text-xs font-semibold tracking-widest uppercase border",
            isDark
              ? "bg-[#1E4D40]/60 text-[#C5A059] border-[#C5A059]/40"
              : "bg-[#F5EFEB] text-[#14342B] border-[#E2DBD0]"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span>{badge}</span>
        </div>
      )}

      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-4",
          isDark ? "text-[#FDFBF7]" : "text-[#14342B]"
        )}
      >
        {title}
      </h2>

      {/* Architectural decorative line */}
      <div
        className={cn(
          "flex items-center gap-2 my-4",
          isCenter ? "justify-center" : "justify-start"
        )}
      >
        <span className="w-8 h-[2px] bg-[#C5A059]" />
        <span className="w-2 h-2 rotate-45 border border-[#C5A059]" />
        <span className="w-8 h-[2px] bg-[#C5A059]" />
      </div>

      {description && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed font-sans",
            isDark ? "text-[#E8DFC8]/90" : "text-[#181C20]/80"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
