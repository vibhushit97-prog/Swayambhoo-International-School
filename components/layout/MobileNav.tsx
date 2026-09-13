"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig, NavItem } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { X, Phone, MessageCircle, MapPin, Mail, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavItem[];
}

export function MobileNav({ isOpen, onClose, navigation }: MobileNavProps) {
  const pathname = usePathname();

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

      {/* Drawer: Cream Background (#FBF9F2) */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FBF9F2] shadow-2xl z-50 flex flex-col justify-between overflow-y-auto border-l border-[#DEDCCF]">
        {/* Header */}
        <div className="p-5 border-b border-[#DEDCCF] flex items-center justify-between bg-white">
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
              <div className="font-serif font-bold text-sm text-[#0F4735]">SWAYAMBHOO</div>
              <div className="text-[10px] tracking-widest uppercase text-[#B88A2A]">Gaya, Bihar</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#26332E] hover:text-[#0F4735] border border-[#DEDCCF] hover:bg-[#E7EDE2] focus-visible:outline-2 focus-visible:outline-[#B88A2A]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="px-5 py-6 space-y-1 divide-y divide-[#DEDCCF]/60 flex-1">
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
                      ? "text-[#0F4735] font-bold border-l-2 border-[#B88A2A] pl-3 bg-[#E7EDE2]/40"
                      : "text-[#26332E]/80 hover:text-[#0F4735]"
                  )}
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Footer CTAs */}
        <div className="p-5 border-t border-[#DEDCCF] bg-white space-y-2.5">
          <Button
            variant="primary"
            href="/admissions"
            className="w-full justify-center text-xs py-3 font-bold shadow-xs"
            onClick={onClose}
          >
            Admission Enquiry 2025–26
          </Button>

          <Button
            variant="gold"
            href="/careers/apply"
            className="w-full justify-center text-xs py-2.5 font-bold shadow-xs"
            leftIcon={<GraduationCap className="w-4 h-4" />}
            onClick={onClose}
          >
            Teacher Recruitment — Apply
          </Button>

          <Button
            variant="whatsapp"
            href={getWhatsAppUrl({ source: "navbar" })}
            isExternal
            className="w-full justify-center text-xs py-2.5"
            leftIcon={<MessageCircle className="w-4 h-4" />}
          >
            Chat on WhatsApp
          </Button>

          <a
            href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
            className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#0F4735] border border-[#0F4735]/30 hover:bg-[#E7EDE2] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#B88A2A]" />
            <span>Call: {siteConfig.contact.phone}</span>
          </a>

          <div className="pt-3 text-[11px] text-[#66716A] space-y-1">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#B88A2A] shrink-0" />
              <span>Wazirganj, Gaya, Bihar – 805131</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-[#B88A2A] shrink-0" />
              <span>{siteConfig.contact.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
