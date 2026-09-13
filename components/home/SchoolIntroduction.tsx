import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Award } from "lucide-react";

export function SchoolIntroduction() {
  return (
    <section className="py-20 lg:py-28 bg-[#FDFBF7] text-[#181C20] border-b border-[#E2DBD0]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Architectural Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 w-full border-2 border-[#C5A059] shadow-xl overflow-hidden group">
              <Image
                src={siteConfig.images.campus.main}
                alt="Swayambhoo International School Campus Entrance - Proposed Concept"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0E241B]/90 backdrop-blur-xs border border-[#C5A059]/40 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                    Campus Inscription
                  </p>
                  <p className="font-serif text-sm sm:text-base font-bold text-[#FDFBF7]">
                    &ldquo;Discipline Today, Leadership Tomorrow&rdquo;
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-white/60 bg-white/10 px-2 py-1 border border-white/20">
                  Concept
                </span>
              </div>
            </div>

            {/* Corner Decorative Accent */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#14342B] -z-10" />
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#C5A059] -z-10" />
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              align="left"
              badge="About Our Institution"
              title="A Sanctuary for Intellectual Curiosity & Character"
              description="Rooted in the timeless heritage of Gaya, Bihar and looking outward to the world, Swayambhoo International School redefines educational standards through balanced academic rigor, cutting-edge science, and ethical values."
            />

            <div className="space-y-4 text-sm sm:text-base text-[#181C20]/80 leading-relaxed font-sans">
              <p>
                The name <strong className="text-[#14342B] font-semibold">&apos;Swayambhoo&apos;</strong> translates to self-manifesting — evoking the dormant genius present inside every child. Our pedagogical philosophy provides children with the environment, mentorship, and creative liberty to discover their own voice, purpose, and capability.
              </p>
              <p>
                Spanning distinct academic wings — the <span className="font-semibold text-[#14342B]">Knowledge Block</span> and <span className="font-semibold text-[#14342B]">Innovation Block</span> — our campus is planned around biophilic architecture that harnesses natural daylight, mature greenery, and calm acoustics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#14342B]">
                  Co-educational K–12 / +2 Curriculum
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#14342B]">
                  Bespoke Student Uniform Identity
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#14342B]">
                  STEM Robotics & AI Discovery
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#14342B]">
                  Monitored Safe Transportation
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button
                variant="primary"
                href="/about"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Learn More About Us
              </Button>
              <Button
                variant="secondary"
                href="/admissions"
              >
                Admission Criteria
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
