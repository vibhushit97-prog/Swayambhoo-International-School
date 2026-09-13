import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Cpu, Bot, Printer, Code2, ArrowRight } from "lucide-react";

export function STEMSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#14342B] text-[#FDFBF7] border-b border-[#0E241B]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative aspect-16/10 w-full border-2 border-[#C5A059] shadow-2xl overflow-hidden group">
              <Image
                src={siteConfig.images.labs.stemRobotics}
                alt="Swayambhoo STEM Robotics Lab - Proposed Visualization"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#081611]/90 backdrop-blur-xs border border-[#C5A059]/40 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                    Innovation Block
                  </p>
                  <p className="font-serif text-sm font-bold text-[#FDFBF7]">
                    Robotics Assembly, Microcontrollers & 3D Fabrication
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-white/60 bg-white/10 px-2 py-1 border border-white/20">
                  Concept
                </span>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <SectionHeading
              align="left"
              theme="dark"
              badge="Innovation & Technology"
              title="Applied STEM, Coding & Robotics"
              description="Empowering young minds from foundational concepts to advanced algorithmic programming, IoT electronics, and mechanical prototyping."
            />

            <div className="space-y-4 text-sm sm:text-base text-[#E8DFC8]/90 leading-relaxed font-sans">
              <p>
                In the Innovation Block at Swayambhoo, theoretical science comes to life. Students assemble functional robotic mechanisms, write clean code in Python and C++, and test prototypes using rapid 3D printing equipment.
              </p>
              <p>
                Guided by experienced mentors, students develop problem-solving grit and computational thinking to prepare them for premier technological frontiers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#0E241B] border border-[#1E4D40]">
                <Bot className="w-6 h-6 text-[#C5A059] mb-2" />
                <p className="font-serif font-bold text-sm text-white">Robotics Lab</p>
                <p className="text-xs text-[#E8DFC8]/70">Micro-controllers & robotic arms</p>
              </div>

              <div className="p-4 bg-[#0E241B] border border-[#1E4D40]">
                <Printer className="w-6 h-6 text-[#C5A059] mb-2" />
                <p className="font-serif font-bold text-sm text-white">3D Prototyping</p>
                <p className="text-xs text-[#E8DFC8]/70">Precision rapid fabrication</p>
              </div>

              <div className="p-4 bg-[#0E241B] border border-[#1E4D40]">
                <Code2 className="w-6 h-6 text-[#C5A059] mb-2" />
                <p className="font-serif font-bold text-sm text-white">Coding Stations</p>
                <p className="text-xs text-[#E8DFC8]/70">Computational logic & AI kits</p>
              </div>

              <div className="p-4 bg-[#0E241B] border border-[#1E4D40]">
                <Cpu className="w-6 h-6 text-[#C5A059] mb-2" />
                <p className="font-serif font-bold text-sm text-white">Electronics Lab</p>
                <p className="text-xs text-[#E8DFC8]/70">Circuit design & sensors</p>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="gold"
                href="/facilities#stem-robotics"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Robotics Infrastructure
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
