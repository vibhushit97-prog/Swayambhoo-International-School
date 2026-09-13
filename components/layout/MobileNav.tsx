"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig, NavItem } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { X, Phone, MessageCircle, MapPin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavItem[];
}

export function MobileNav({ isOpen, onClose, navigation }: MobileNavProps) {
  const pathname = usePathname();

  // Close when pathname changes
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF6EE] shadow-2xl z-50 flex flex-col justify-between overflow-y-auto border-l border-[#E2DBD0]">
        {/* Header */}
        <div className="p-5 border-b border-[#E2DBD0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9">
              <Image
                src={siteConfig.images.emblem}
                alt="Swayambhoo Emblem"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="font-serif font-bold text-sm text-[#14342B]">SWAYAMBHOO</div>
              <div className="text-[10px] tracking-widest uppercase text-[#856627]">Gaya, Bihar</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#181C20] hover:text-[#14342B] border border-[#E2DBD0] hover:bg-[#F5EFEB] focus-visible:outline-2 focus-visible:outline-[#C5A059]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="px-5 py-6 space-y-1 divide-y divide-[#E2DBD0]/60 flex-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.href} className="pt-2.5 first:pt-0">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "block py-2 text-sm font-semibold tracking-wider uppercase transition-colors",
                    isActive
                      ? "text-[#14342B] font-bold border-l-2 border-[#C5A059] pl-3"
                      : "text-[#181C20]/80 hover:text-[#14342B]"
                  )}
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Footer CTAs */}
        <div className="p-5 border-t border-[#E2DBD0] bg-white space-y-3">
          <Button
            variant="gold"
            href="/admissions"
            className="w-full justify-center text-xs py-3"
            onClick={onClose}
          >
            Admission Enquiry 2025–26
          </Button>

          <Button
            variant="whatsapp"
            href={getWhatsAppUrl({ source: "navbar" })}
            isExternal
            className="w-full justify-center text-xs py-3"
            leftIcon={<MessageCircle className="w-4 h-4" />}
          >
            Chat on WhatsApp
          </Button>

          <a
            href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
            className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#14342B] border border-[#14342B]/30 hover:bg-[#14342B]/5"
          >
            <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Call: {siteConfig.contact.phone}</span>
          </a>

          <div className="pt-3 text-[11px] text-[#64748B] space-y-1">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#C5A059] shrink-0" />
              <span>Wazirganj, Gaya, Bihar – 805131</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-[#C5A059] shrink-0" />
              <span>{siteConfig.contact.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
