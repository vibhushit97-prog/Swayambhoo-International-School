import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "forest" | "gold" | "sage" | "outline" | "concept";
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = "outline",
  children,
  ...props
}: BadgeProps) {
  const variantClasses = {
    forest: "bg-[#14342B] text-[#FDFBF7] border-[#14342B]",
    gold: "bg-[#F8F3E8] text-[#856627] border-[#C5A059]/40",
    sage: "bg-[#EAF0EA] text-[#2F4F2F] border-[#8FA38F]/40",
    outline: "bg-transparent text-[#14342B] border-[#E2DBD0]",
    concept: "bg-[#181C20]/80 text-[#E8DFC8] border-[#C5A059]/50 backdrop-blur-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase border",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
