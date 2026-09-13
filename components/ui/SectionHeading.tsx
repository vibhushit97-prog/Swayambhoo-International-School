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
            "inline-flex items-center gap-2 mb-3.5 px-3.5 py-1 text-xs font-bold tracking-widest uppercase border",
            isDark
              ? "bg-[#083526] text-[#D4B15A] border-[#B88A2A]/40"
              : "bg-[#E7EDE2] text-[#0F4735] border-[#C9D8C8]"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B88A2A]" />
          <span>{badge}</span>
        </div>
      )}

      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-4",
          isDark ? "text-white" : "text-[#0F4735]"
        )}
      >
        {title}
      </h2>

      {/* Architectural decorative line (──── ◇ ────) */}
      <div
        className={cn(
          "flex items-center gap-2 my-4",
          isCenter ? "justify-center" : "justify-start"
        )}
      >
        <span className="w-10 h-[1px] bg-[#B88A2A]" />
        <span className="w-1.5 h-1.5 rotate-45 border border-[#B88A2A] bg-[#B88A2A]" />
        <span className="w-10 h-[1px] bg-[#B88A2A]" />
      </div>

      {description && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed font-sans",
            isDark ? "text-[#F7F3E8]" : "text-[#26332E]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
