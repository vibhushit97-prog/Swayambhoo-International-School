import React from "react";
import Image from "next/image";
import Link from "next/link";
import { constructMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AdmissionsCTA } from "@/components/home/AdmissionsCTA";
import { Compass, Trees, Sun, Shield, Layers, Building2, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "Campus & Architecture | Biophilic Design in Gaya, Bihar",
  description:
    "Explore the architectural masterplan of Swayambhoo International School featuring neoclassical stone facades, landscaped courtyards, and solar canopies.",
  path: "/campus",
});

export default function CampusPage() {
  return (
    <div className="bg-[#F7F3E8]">
      {/* Hero Header */}
      <section className="bg-[#083526] text-[#F7F3E8] py-20 lg:py-24 relative overflow-hidden border-b-2 border-[#B88A2A]">
        <div className="absolute inset-0 z-0">
          <Image
            src={siteConfig.images.campus.main}
            alt="Campus Masterplan"
            fill
            className="object-cover opacity-85"
          />
          {/* Subtle Green Overlay (~55%) for optimal contrast and photo visibility */}
          <div className="absolute inset-0 bg-[rgba(15,71,53,0.55)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#083526]/80 via-transparent to-[#083526]/30" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4B15A] font-bold">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Campus</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#FFFFFF]">
              Campus Architecture & Spatial Masterplan
            </h1>

            <p className="text-base sm:text-lg text-[#F7F3E8] font-sans leading-relaxed">
              Synthesizing neoclassical grandeur with biophilic modernism, our campus in Wazirganj provides a majestic, daylight-filled atmosphere dedicated to scholarship.
            </p>
          </div>
        </Container>
      </section>

      {/* Campus Colonnade & Central Facade */}
      <section className="py-20 border-b border-[#DEDCCF] bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                align="left"
                badge="Architectural Gateway"
                title="The Grand Neoclassical Colonnade & Arrival Plaza"
                description="Designed to impress upon students a sense of purpose, dignity, and pride each morning."
              />

              <div className="space-y-4 text-sm sm:text-base text-[#26332E] leading-relaxed font-sans">
                <p>
                  The main campus facade features a monumental pediment portico flanked by the twin scholarly wings: the <strong>Knowledge Block</strong> on the west and the <strong>Innovation Block</strong> on the east.
                </p>
                <p>
                  A circular landscaped drop-off plaza ensures modern school buses deposit children safely away from public roadway thoroughfares, while an integrated open-air stone amphitheater serves for morning assemblies and public oratory.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-5 bg-[#FBF9F2] border border-[#DEDCCF] rounded-2xl shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
                  <p className="font-serif font-bold text-lg text-[#0F4735]">Knowledge Block</p>
                  <p className="text-xs text-[#26332E]">Foundational arts & library</p>
                </div>
                <div className="p-5 bg-[#FBF9F2] border border-[#DEDCCF] rounded-2xl shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
                  <p className="font-serif font-bold text-lg text-[#0F4735]">Innovation Block</p>
                  <p className="text-xs text-[#26332E]">Advanced STEM & robotics</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-16/10 w-full border-2 border-[#B88A2A] shadow-[0_8px_30px_rgba(15,71,53,0.12)] rounded-2xl overflow-hidden group">
                <Image
                  src={siteConfig.images.campus.main}
                  alt="Swayambhoo Grand Colonnade - Proposed Visualization"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <span className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-[#D4B15A] bg-[#083526]/90 px-3 py-1.5 border border-[#B88A2A]/40 rounded-md font-bold">
                  Architectural Visualization • Proposed Concept
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Biophilic Courtyards & Green Spaces */}
      <section className="py-20 bg-[#E7EDE2] border-b border-[#DEDCCF]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative aspect-16/10 w-full border-2 border-[#B88A2A]/40 shadow-[0_8px_30px_rgba(15,71,53,0.08)] rounded-2xl overflow-hidden group">
                <Image
                  src={siteConfig.images.campus.courtyard}
                  alt="Swayambhoo Biophilic Courtyards - Proposed Visualization"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <span className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-[#D4B15A] bg-[#083526]/90 px-3 py-1.5 border border-[#B88A2A]/40 rounded-md font-bold">
                  Biophilic Courtyard • Outdoor Learning Circles
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <SectionHeading
                align="left"
                badge="Biophilic Principles"
                title="Internal Courtyards & Natural Landscaping"
                description="Bringing light, air, and living greenery into every student corridor."
              />

              <div className="space-y-4 text-sm sm:text-base text-[#26332E] leading-relaxed font-sans">
                <p>
                  Research consistently proves that children learn faster and experience lower stress in spaces with ample natural daylight and views of living greenery. Swayambhoo&apos;s campus is organized around deep internal courtyards sheltered by architectural louvers.
                </p>
                <p>
                  Stepped timber benches, stone pathways, and shaded trees create outdoor breakout areas where classes gather for discussions, biology field sketches, and quiet reading periods.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#0F4735] font-medium">
                  <Trees className="w-4 h-4 text-[#B88A2A]" />
                  <span>Native shade trees adapted to the climatic conditions of Gaya</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#0F4735] font-medium">
                  <Sun className="w-4 h-4 text-[#B88A2A]" />
                  <span>Deep window reveals preventing direct glare while maximizing daylight</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#0F4735] font-medium">
                  <Compass className="w-4 h-4 text-[#B88A2A]" />
                  <span>Safe interior quads completely segregated from vehicular movement</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <AdmissionsCTA />
    </div>
  );
}
