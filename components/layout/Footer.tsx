"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, ShieldCheck, Lock } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#083526] text-[#F7F3E8] border-t-2 border-[#B88A2A]">
      {/* Top Banner with Motto: Deep Forest Green (#083526) */}
      <div className="border-b border-[#0F4735] py-8 bg-[#083526]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-[#D4B15A] text-xs uppercase tracking-[0.25em] font-semibold">
              Swayambhoo Core Vision
            </span>
            <p className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight mt-1">
              &ldquo;Discipline Today, Leadership Tomorrow&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F4735] hover:bg-[#2D654E] text-white border border-[#B88A2A]/40 text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              <span>Join Our Faculty</span>
              <ArrowRight className="w-4 h-4 text-[#D4B15A]" />
            </Link>

            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#B88A2A] hover:bg-[#9C731F] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={getWhatsAppUrl({ source: "footer" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: School Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src={siteConfig.images.emblem}
                  alt="Swayambhoo Emblem"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white tracking-wider block leading-tight">
                  SWAYAMBHOO
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#D4B15A] font-medium block">
                  International School
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#D8E2D9] leading-relaxed max-w-md font-sans">
              Nurturing confident, curious, and responsible leaders through rigorous academics, biophilic campus infrastructure, advanced robotics laboratories, and holistic values in Gaya, Bihar.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#D4B15A]">
              <span className="w-2 h-2 rounded-full bg-[#B88A2A]" />
              <span className="font-semibold tracking-wider">ESTD. 2024 • WAZIRGANJ, GAYA</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4B15A] border-b border-[#0F4735] pb-2">
              Institution
            </h3>
            <ul className="space-y-2.5 text-xs text-[#F7F3E8]">
              <li>
                <Link href="/about" className="hover:text-[#D4B15A] transition-colors">
                  About the School
                </Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-[#D4B15A] transition-colors">
                  Academic Framework
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#D4B15A] transition-colors text-[#D4B15A] font-medium">
                  Careers & Vacancies
                </Link>
              </li>
              <li>
                <Link href="/careers/positions" className="hover:text-[#D4B15A] transition-colors">
                  Teacher Recruitment
                </Link>
              </li>
              <li>
                <Link href="/campus" className="hover:text-[#D4B15A] transition-colors">
                  Campus & Architecture
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-[#D4B15A] transition-colors">
                  World-Class Facilities
                </Link>
              </li>
              <li>
                <Link href="/student-life" className="hover:text-[#D4B15A] transition-colors">
                  Student Life & Uniforms
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#D4B15A] transition-colors">
                  Architectural Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Stages */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4B15A] border-b border-[#0F4735] pb-2">
              School Stages
            </h3>
            <ul className="space-y-2.5 text-xs text-[#F7F3E8]">
              <li>
                <Link href="/academics#foundational" className="hover:text-[#D4B15A] transition-colors">
                  Foundational (Nursery – Gr 2)
                </Link>
              </li>
              <li>
                <Link href="/academics#preparatory" className="hover:text-[#D4B15A] transition-colors">
                  Preparatory (Grades 3 – 5)
                </Link>
              </li>
              <li>
                <Link href="/academics#middle" className="hover:text-[#D4B15A] transition-colors">
                  Middle School (Grades 6 – 8)
                </Link>
              </li>
              <li>
                <Link href="/academics#secondary" className="hover:text-[#D4B15A] transition-colors">
                  Secondary (Grades 9 & 10)
                </Link>
              </li>
              <li>
                <Link href="/academics#senior-secondary" className="hover:text-[#D4B15A] transition-colors">
                  Senior Secondary / +2 (Gr 11–12)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4B15A] border-b border-[#0F4735] pb-2">
              Contact & Visit
            </h3>
            <div className="space-y-3 text-xs text-[#F7F3E8]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4B15A] shrink-0 mt-0.5" />
                <span>
                  Wazirganj, Gaya, Bihar – 805131, India
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4B15A] shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={getWhatsAppUrl({ source: "footer" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  +91 96614 48541 (WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4B15A] shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.admissionsEmail}`}
                  className="hover:text-white transition-colors truncate"
                >
                  {siteConfig.contact.admissionsEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical Transparency & Conceptual Note */}
        <div className="mt-12 pt-8 border-t border-[#0F4735] flex items-center gap-3 bg-[#083526]/80 p-4 border border-[#0F4735]">
          <ShieldCheck className="w-5 h-5 text-[#D4B15A] shrink-0" />
          <p className="text-[11px] text-[#F7F3E8] leading-relaxed font-sans">
            <span className="font-semibold text-[#D4B15A]">Architectural Transparency Notice:</span> Campus images and building visualizations presented represent proposed institutional architecture, landscaping, and learning facilities for Swayambhoo International School. Academic stage delivery strictly follows progressive phased institutional rollout.
          </p>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="mt-8 pt-6 border-t border-[#0F4735] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F3E8]/90">
          <p>
            © {new Date().getFullYear()} Swayambhoo International School. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Campus Map
            </Link>
            <Link
              href="/admin/login"
              className="hover:text-[#D4B15A] transition-colors flex items-center gap-1 font-medium"
            >
              <Lock className="w-3 h-3 text-[#D4B15A]" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
