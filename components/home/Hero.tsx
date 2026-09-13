"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageCircle, MapPin, Sparkles, Building, Shield } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#081611] text-[#FDFBF7]">
      {/* Background Architectural Visual with Subtle Pan Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src={siteConfig.images.heroImage}
          alt="Swayambhoo International School - Proposed Campus Concept Architectural Visualization"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multilayered Architectural Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081611] via-[#081611]/70 to-[#081611]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(8,22,17,0.85)_100%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#14342B]/90 border border-[#C5A059]/40 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
            <span>Admissions Open 2025–2026 • Nursery to +2</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-[1.08]">
            LEARN. <br />
            <span className="text-[#C5A059]">EXPLORE.</span> CREATE. <br />
            LEAD.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-xl text-[#E8DFC8]/90 font-sans leading-relaxed max-w-2xl font-light">
            Swayambhoo International School — nurturing confident, curious and responsible learners through academic excellence, technology, sports and holistic education.
          </p>

          {/* Location Badge */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#E8DFC8]/80 font-medium">
            <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>Wazirganj, Gaya, Bihar – 805131, India</span>
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Button
              variant="gold"
              size="lg"
              href="/admissions"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Admission Enquiry
            </Button>

            <Button
              variant="outline"
              size="lg"
              href="/campus"
              leftIcon={<Building className="w-4 h-4" />}
              className="text-[#FDFBF7] border-white/40 hover:bg-white/10 hover:text-white"
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
          <div className="pt-4 flex items-center gap-2 text-[11px] text-[#E8DFC8]/50">
            <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Proposed Campus Concept • Architectural Visualization</span>
          </div>
        </div>
      </div>

      {/* Bottom Features Bar */}
      <div className="relative z-10 w-full border-t border-[#1E4D40] bg-[#0E241B]/90 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-none border border-[#C5A059]/40 bg-[#14342B] flex items-center justify-center text-[#C5A059] shrink-0">
                01
              </span>
              <div>
                <p className="font-semibold text-white">Biophilic Architecture</p>
                <p className="text-[#E8DFC8]/70 text-[11px]">Natural daylight & stone</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-none border border-[#C5A059]/40 bg-[#14342B] flex items-center justify-center text-[#C5A059] shrink-0">
                02
              </span>
              <div>
                <p className="font-semibold text-white">STEM & AI Labs</p>
                <p className="text-[#E8DFC8]/70 text-[11px]">Robotics & 3D prototyping</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-none border border-[#C5A059]/40 bg-[#14342B] flex items-center justify-center text-[#C5A059] shrink-0">
                03
              </span>
              <div>
                <p className="font-semibold text-white">Maple Indoor Arena</p>
                <p className="text-[#E8DFC8]/70 text-[11px]">Olympic-grade sports floors</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-none border border-[#C5A059]/40 bg-[#14342B] flex items-center justify-center text-[#C5A059] shrink-0">
                04
              </span>
              <div>
                <p className="font-semibold text-white">Sensory Library</p>
                <p className="text-[#E8DFC8]/70 text-[11px]">Integrated reading pods</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
