"use client";

import React, { useState } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, X } from "lucide-react";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Expanded Quick Message Bubble */}
      {isOpen && (
        <div className="bg-white p-4 shadow-xl border border-[#E2DBD0] max-w-xs w-72 mb-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#E2DBD0]">
            <div>
              <p className="font-serif font-bold text-sm text-[#14342B]">
                Swayambhoo Admissions
              </p>
              <p className="text-[11px] text-[#25D366] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                Online | Typically replies within 1 hour
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#64748B] hover:text-[#14342B] p-0.5"
              aria-label="Close message"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#181C20]/80 py-2.5 leading-relaxed">
            Welcome to Swayambhoo International School, Gaya. Have questions regarding classes, admissions, or campus visits?
          </p>

          <a
            href={getWhatsAppUrl({ source: "floating" })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-[#25D366] hover:bg-[#20BA59] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Start WhatsApp Chat
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <span className="hidden sm:inline-flex items-center px-3 py-1 bg-[#14342B] text-[#C5A059] text-xs font-semibold uppercase tracking-wider border border-[#C5A059]/40 shadow-md">
            Admissions Desk
          </span>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle WhatsApp Admission Chat"
          className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20BA59] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#C5A059]" />
          </span>
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
