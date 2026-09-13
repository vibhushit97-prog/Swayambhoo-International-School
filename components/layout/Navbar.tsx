"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";
import { Phone, MessageCircle, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparentNavbar = isHomePage && !isScrolled;

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Pre-header Top Bar */}
      <div
        className={cn(
          "w-full transition-colors duration-300 py-2 border-b text-xs",
          transparentNavbar
            ? "bg-[#081611]/90 text-[#E8DFC8] border-white/10"
            : "bg-[#14342B] text-[#FDFBF7] border-[#0E241B]"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="font-semibold text-[#C5A059]">Admissions Open 2025–26</span>
              <span className="hidden md:inline text-white/50">|</span>
              <span className="hidden md:inline">Wazirganj, Gaya, Bihar</span>
            </span>
          </div>

          <div className="flex items-center gap-5 text-[11px] sm:text-xs">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-medium">{siteConfig.contact.phone}</span>
            </a>

            <a
              href={getWhatsAppUrl({ source: "navbar" })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#25D366] hover:text-[#2fe674] transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: +91 96614 48541</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          transparentNavbar
            ? "bg-[#0E241B]/85 backdrop-blur-md border-b border-white/10 text-[#FDFBF7]"
            : "bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE3D7] text-[#14342B] shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* School Brand Logo */}
            <Link
              href="/"
              className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-[#C5A059]"
              aria-label="Swayambhoo International School Home"
            >
              <div className="relative w-11 h-11 sm:w-13 sm:h-13 shrink-0">
                <Image
                  src={siteConfig.images.emblem}
                  alt="Swayambhoo Crest"
                  fill
                  sizes="52px"
                  className="object-contain group-hover:scale-105 transition-transform duration-200"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    "font-serif font-bold text-lg sm:text-xl tracking-wider leading-none transition-colors",
                    transparentNavbar ? "text-[#FDFBF7] group-hover:text-[#C5A059]" : "text-[#14342B] group-hover:text-[#9C7A33]"
                  )}
                >
                  SWAYAMBHOO
                </span>
                <span
                  className={cn(
                    "text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mt-0.5",
                    transparentNavbar ? "text-[#C5A059]" : "text-[#856627]"
                  )}
                >
                  International School
                </span>
                <span
                  className={cn(
                    "text-[8px] tracking-[0.16em] uppercase hidden sm:block",
                    transparentNavbar ? "text-white/60" : "text-[#181C20]/60"
                  )}
                >
                  Learn • Grow • Lead
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6" aria-label="Main Navigation">
              {siteConfig.navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-xs font-semibold tracking-wider uppercase transition-colors py-1 relative focus-visible:outline-2 focus-visible:outline-[#C5A059]",
                      transparentNavbar
                        ? isActive
                          ? "text-[#C5A059]"
                          : "text-[#FDFBF7]/90 hover:text-[#C5A059]"
                        : isActive
                        ? "text-[#14342B] font-bold"
                        : "text-[#181C20]/80 hover:text-[#14342B]"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A059]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant={transparentNavbar ? "gold" : "primary"}
                size="sm"
                href="/admissions"
                className="font-bold text-xs"
              >
                Admission Enquiry
              </Button>
            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="flex items-center gap-2 xl:hidden">
              <a
                href={getWhatsAppUrl({ source: "navbar" })}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#25D366] hover:opacity-80 transition-opacity"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "p-2 rounded-none border focus-visible:outline-2 focus-visible:outline-[#C5A059]",
                  transparentNavbar
                    ? "text-[#FDFBF7] border-white/20 hover:bg-white/10"
                    : "text-[#14342B] border-[#E2DBD0] hover:bg-[#14342B]/5"
                )}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={siteConfig.navigation}
      />
    </>
  );
}
