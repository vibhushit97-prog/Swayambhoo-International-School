"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageCircle, MapPin, Building, Shield, GraduationCap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#083526] text-[#F7F3E8]">
      {/* Background Architectural Visual with Subtle Green Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={siteConfig.images.heroImage}
          alt="Swayambhoo International School - Proposed Campus Concept Architectural Visualization"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Subtle Green Overlay (~55%) for optimal contrast and photo visibility */}
        <div className="absolute inset-0 bg-[rgba(15,71,53,0.55)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#083526]/80 via-transparent to-[#083526]/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          {/* Institutional Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#083526]/80 border border-[#B88A2A]/50 text-xs font-bold uppercase tracking-[0.2em] text-[#D4B15A] backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#B88A2A] animate-ping" />
              <span>Admissions Open 2025–2026 • Nursery to +2</span>
            </div>

            <Link
              href="/careers/apply"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#B88A2A] hover:bg-[#A37820] border border-[#D4B15A] text-xs font-bold uppercase tracking-wider text-white transition-all backdrop-blur-xs"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Faculty Recruitment 2026–27 • Apply Online</span>
            </Link>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#FFFFFF] leading-[1.08]">
            LEARN. <br />
            EXPLORE. CREATE. <br />
            LEAD.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-xl text-[#F7F3E8] font-sans leading-relaxed max-w-2xl font-normal">
            Swayambhoo International School — nurturing confident, curious and responsible learners through academic excellence, technology, sports and holistic education in Gaya, Bihar.
          </p>

          {/* Location Badge */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#F7F3E8]/85 font-medium">
            <MapPin className="w-4 h-4 text-[#D4B15A] shrink-0" />
            <span>Wazirganj, Gaya, Bihar – 805131, India</span>
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <Button
              variant="primary"
              size="lg"
              href="/admissions"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="font-bold shadow-lg shadow-[#083526]/40"
            >
              Admission Enquiry
            </Button>

            <Button
              variant="gold"
              size="lg"
              href="/careers/apply"
              leftIcon={<GraduationCap className="w-4 h-4" />}
              className="font-bold shadow-lg shadow-[#B88A2A]/20 hover:scale-[1.02] transition-transform"
            >
              Teacher Recruitment • Apply
            </Button>

            <Button
              variant="outline"
              size="lg"
              href="/campus"
              leftIcon={<Building className="w-4 h-4" />}
              className="text-[#F7F3E8] border-white/40 hover:bg-white/10 hover:text-white hidden sm:inline-flex"
            >
              Explore Our Campus
            </Button>

            <Button
              variant="whatsapp"
              size="lg"
              href={getWhatsAppUrl({ source: "hero" })}
              isExternal
              leftIcon={<MessageCircle className="w-5 h-5" />}
            >
              WhatsApp Desk
            </Button>
          </div>

          {/* Transparent Architectural Notice Tag */}
          <div className="pt-4 flex items-center gap-2 text-[11px] text-[#F7F3E8]/50">
            <Shield className="w-3.5 h-3.5 text-[#D4B15A]" />
            <span>Proposed Campus Concept • Architectural Visualization</span>
          </div>
        </div>
      </div>

      {/* Bottom Features Bar: Deep Forest Green (#083526) with Gold Accent Boxes (#D4B15A) */}
      <div className="relative z-10 w-full border-t border-[#0F4735] bg-[#083526]/95 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-none border border-[#B88A2A]/50 bg-[#0F4735] flex items-center justify-center text-[#D4B15A] font-bold shrink-0">
                01
              </span>
              <div>
                <p className="font-semibold text-white">Biophilic Architecture</p>
                <p className="text-[#F7F3E8]/70 text-[11px]">Natural daylight & stone</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-none border border-[#B88A2A]/50 bg-[#0F4735] flex items-center justify-center text-[#D4B15A] font-bold shrink-0">
                02
              </span>
              <div>
                <p className="font-semibold text-white">STEM & AI Labs</p>
                <p className="text-[#F7F3E8]/70 text-[11px]">Robotics & 3D prototyping</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-none border border-[#B88A2A]/50 bg-[#0F4735] flex items-center justify-center text-[#D4B15A] font-bold shrink-0">
                03
              </span>
              <div>
                <p className="font-semibold text-white">Maple Indoor Arena</p>
                <p className="text-[#F7F3E8]/70 text-[11px]">Olympic-grade sports floors</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-none border border-[#B88A2A]/50 bg-[#0F4735] flex items-center justify-center text-[#D4B15A] font-bold shrink-0">
                04
              </span>
              <div>
                <p className="font-semibold text-white">Sensory Library</p>
                <p className="text-[#F7F3E8]/70 text-[11px]">Integrated reading pods</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
