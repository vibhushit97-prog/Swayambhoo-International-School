import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function SmartClassrooms() {
  return (
    <section className="py-20 lg:py-28 bg-[#F7F3E8] border-b border-[#DEDCCF]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              align="left"
              badge="Learning Environments"
              title="Next-Generation Smart Classrooms"
              description="Acoustically treated spaces bathed in natural sunlight, replacing rigid rows of desks with flexible collaborative learning studios."
            />

            <div className="space-y-4 text-sm sm:text-base text-[#26332E] leading-relaxed font-sans">
              <p>
                Every classroom at Swayambhoo is engineered to support both energetic group projects and focused individual study. Ergonomic swiveling chairs and modular tables allow rapid reconfiguration from lecture format to debate circles in seconds.
              </p>
              <p>
                Interactive digital displays integrate multimedia curriculum, simulation models, and real-time student assessments, while dedicated reading nooks built into acoustic wood walls provide quiet zones for reflective reading.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-3 text-sm text-[#0F4735] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#B88A2A] shrink-0" />
                <span>Interactive 4K Digital Smart Panels</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#0F4735] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#B88A2A] shrink-0" />
                <span>Ergonomic Swivel Seating & Modular Pods</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#0F4735] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#B88A2A] shrink-0" />
                <span>Biophilic Natural Wood & Acoustic Dampening</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#0F4735] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#B88A2A] shrink-0" />
                <span>Floor-to-Ceiling Windows with Courtyard Views</span>
              </div>
            </div>

            <div className="pt-4">
              <Button
                variant="primary"
                href="/facilities#smart-classrooms"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Classroom Features
              </Button>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-16/10 w-full border-2 border-[#DEDCCF] shadow-xl overflow-hidden group hover:border-[#B88A2A] transition-colors">
              <Image
                src={siteConfig.images.classrooms.smartClassroom}
                alt="Swayambhoo Smart Classroom Architecture - Proposed Concept"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#083526]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#083526]/95 backdrop-blur-xs border border-[#B88A2A]/40 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#D4B15A] font-semibold">
                    Studio Classroom Concept
                  </p>
                  <p className="font-serif text-sm font-bold text-[#F7F3E8]">
                    Ergonomic Seating, Wood Paneling & Smart Interactive Wall
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#F7F3E8]/70 bg-white/10 px-2 py-1 border border-white/20">
                  Concept
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
