import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0E241B] text-[#FDFBF7] border-t-2 border-[#C5A059]">
      {/* Top Banner with Motto */}
      <div className="border-b border-[#1E4D40] py-8 bg-[#081611]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-[#C5A059] text-xs uppercase tracking-[0.25em] font-semibold">
              Swayambhoo Core Vision
            </span>
            <p className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight mt-1">
              &ldquo;Discipline Today, Leadership Tomorrow&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A059] hover:bg-[#A27F35] text-[#0E241B] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
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
                <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium block">
                  International School
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#E8DFC8]/80 leading-relaxed max-w-md font-sans">
              Nurturing confident, curious, and responsible leaders through rigorous academics, biophilic campus infrastructure, advanced robotics laboratories, and holistic values in Gaya, Bihar.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#C5A059]">
              <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
              <span className="font-semibold tracking-wider">ESTD. 2024 • WAZIRGANJ, GAYA</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] border-b border-[#1E4D40] pb-2">
              Institution
            </h3>
            <ul className="space-y-2.5 text-xs text-[#E8DFC8]/80">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About the School
                </Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-white transition-colors">
                  Academic Framework
                </Link>
              </li>
              <li>
                <Link href="/campus" className="hover:text-white transition-colors">
                  Campus & Architecture
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-white transition-colors">
                  World-Class Facilities
                </Link>
              </li>
              <li>
                <Link href="/student-life" className="hover:text-white transition-colors">
                  Student Life & Uniforms
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Architectural Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Stages */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] border-b border-[#1E4D40] pb-2">
              School Stages
            </h3>
            <ul className="space-y-2.5 text-xs text-[#E8DFC8]/80">
              <li>
                <Link href="/academics#foundational" className="hover:text-white transition-colors">
                  Foundational (Nursery – Gr 2)
                </Link>
              </li>
              <li>
                <Link href="/academics#preparatory" className="hover:text-white transition-colors">
                  Preparatory (Grades 3 – 5)
                </Link>
              </li>
              <li>
                <Link href="/academics#middle" className="hover:text-white transition-colors">
                  Middle School (Grades 6 – 8)
                </Link>
              </li>
              <li>
                <Link href="/academics#secondary" className="hover:text-white transition-colors">
                  Secondary (Grades 9 & 10)
                </Link>
              </li>
              <li>
                <Link href="/academics#senior-secondary" className="hover:text-white transition-colors">
                  Senior Secondary / +2 (Gr 11–12)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] border-b border-[#1E4D40] pb-2">
              Contact & Visit
            </h3>
            <div className="space-y-3 text-xs text-[#E8DFC8]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  Wazirganj, Gaya, Bihar – 805131, India
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
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
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
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
        <div className="mt-12 pt-8 border-t border-[#1E4D40]/70 flex items-center gap-3 bg-[#081611]/50 p-4 border border-[#1E4D40]">
          <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
          <p className="text-[11px] text-[#E8DFC8]/70 leading-relaxed font-sans">
            <span className="font-semibold text-[#C5A059]">Architectural Transparency Notice:</span> Campus images and building visualizations presented represent proposed institutional architecture, landscaping, and learning facilities for Swayambhoo International School. Academic stage delivery strictly follows progressive phased institutional rollout.
          </p>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="mt-8 pt-6 border-t border-[#1E4D40]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8DFC8]/60">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
