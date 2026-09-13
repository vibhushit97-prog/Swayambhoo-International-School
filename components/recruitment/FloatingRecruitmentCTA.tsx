"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, ArrowRight, X } from "lucide-react";

export function FloatingRecruitmentCTA() {
  const [isDismissed, setIsDismissed] = useState(false);
  const pathname = usePathname();

  // Hide on admin routes or when already on the application wizard
  if (isDismissed || pathname.startsWith("/admin") || pathname.startsWith("/careers/apply")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center group animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="relative flex items-center bg-[#083526] text-[#F7F3E8] border-2 border-[#B88A2A] shadow-2xl overflow-hidden">
        {/* Pulsing indicator */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4B15A] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4B15A]"></span>
        </span>

        {/* Main Clickable Area */}
        <Link
          href="/careers/apply"
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#0F4735] transition-colors"
          title="Apply for Teaching Position"
        >
          <div className="w-8 h-8 rounded-full bg-[#0F4735] border border-[#B88A2A] flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4 text-[#D4B15A]" />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4B15A] animate-pulse" />
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#D4B15A]">
                We&apos;re Hiring Faculty
              </span>
            </div>
            <span className="text-xs font-serif font-bold text-white group-hover:text-[#D4B15A] transition-colors flex items-center gap-1">
              Apply as Teacher <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Dismiss Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="px-2 py-3 text-white/50 hover:text-white hover:bg-white/10 border-l border-white/15 transition-colors"
          aria-label="Dismiss hiring alert"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
