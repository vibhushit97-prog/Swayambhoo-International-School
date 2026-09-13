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
    <div className="bg-[#FDFBF7]">
      {/* Hero Header */}
      <section className="bg-[#081611] text-[#FDFBF7] py-20 lg:py-24 relative overflow-hidden border-b-2 border-[#C5A059]">
        <div className="absolute inset-0 opacity-25">
          <Image
            src={siteConfig.images.campus.main}
            alt="Campus Masterplan"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#081611] via-[#081611]/85 to-transparent" />

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059]">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Campus</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white">
              Campus Architecture & Spatial Masterplan
            </h1>

            <p className="text-base sm:text-lg text-[#E8DFC8]/90 font-sans leading-relaxed">
              Synthesizing neoclassical grandeur with biophilic modernism, our campus in Wazirganj provides a majestic, daylight-filled atmosphere dedicated to scholarship.
            </p>
          </div>
        </Container>
      </section>

      {/* Campus Colonnade & Central Facade */}
      <section className="py-20 border-b border-[#E2DBD0]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                align="left"
                badge="Architectural Gateway"
                title="The Grand Neoclassical Colonnade & Arrival Plaza"
                description="Designed to impress upon students a sense of purpose, dignity, and pride each morning."
              />

              <div className="space-y-4 text-sm sm:text-base text-[#181C20]/80 leading-relaxed font-sans">
                <p>
                  The main campus facade features a monumental pediment portico flanked by the twin scholarly wings: the <strong>Knowledge Block</strong> on the west and the <strong>Innovation Block</strong> on the east.
                </p>
                <p>
                  A circular landscaped drop-off plaza ensures modern school buses deposit children safely away from public roadway thoroughfares, while an integrated open-air stone amphitheater serves for morning assemblies and public oratory.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#FAF6EE] border border-[#E2DBD0]">
                  <p className="font-serif font-bold text-lg text-[#14342B]">Knowledge Block</p>
                  <p className="text-xs text-[#181C20]/70">Foundational arts & library</p>
                </div>
                <div className="p-4 bg-[#FAF6EE] border border-[#E2DBD0]">
                  <p className="font-serif font-bold text-lg text-[#14342B]">Innovation Block</p>
                  <p className="text-xs text-[#181C20]/70">Advanced STEM & robotics</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-16/10 w-full border-2 border-[#C5A059] shadow-xl overflow-hidden group">
                <Image
                  src={siteConfig.images.campus.main}
                  alt="Swayambhoo Grand Colonnade - Proposed Visualization"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <span className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-[#C5A059] bg-[#0E241B]/90 px-3 py-1.5 border border-[#C5A059]/40">
                  Architectural Visualization • Proposed Concept
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Biophilic Courtyards & Green Spaces */}
      <section className="py-20 bg-[#FAF6EE] border-b border-[#E2DBD0]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative aspect-16/10 w-full border-2 border-[#EAE3D7] shadow-xl overflow-hidden group">
                <Image
                  src={siteConfig.images.campus.courtyard}
                  alt="Swayambhoo Biophilic Courtyards - Proposed Visualization"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <span className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-[#C5A059] bg-[#0E241B]/90 px-3 py-1.5 border border-[#C5A059]/40">
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

              <div className="space-y-4 text-sm sm:text-base text-[#181C20]/80 leading-relaxed font-sans">
                <p>
                  Research consistently proves that children learn faster and experience lower stress in spaces with ample natural daylight and views of living greenery. Swayambhoo&apos;s campus is organized around deep internal courtyards sheltered by architectural louvers.
                </p>
                <p>
                  Stepped timber benches, stone pathways, and shaded trees create outdoor breakout areas where classes gather for discussions, biology field sketches, and quiet reading periods.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#14342B] font-medium">
                  <Trees className="w-4 h-4 text-[#C5A059]" />
                  <span>Native shade trees adapted to the climatic conditions of Gaya</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#14342B] font-medium">
                  <Sun className="w-4 h-4 text-[#C5A059]" />
                  <span>Deep window reveals preventing direct glare while maximizing daylight</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#14342B] font-medium">
                  <Compass className="w-4 h-4 text-[#C5A059]" />
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
