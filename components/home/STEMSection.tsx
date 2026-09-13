import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Cpu, Bot, Printer, Code2, ArrowRight } from "lucide-react";

export function STEMSection() {
  return (
    <section className="py-20 lg:py-28 bg-white text-[#26332E] border-b border-[#DEDCCF]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative aspect-16/10 w-full border-2 border-[#DEDCCF] shadow-2xl overflow-hidden group hover:border-[#B88A2A] transition-colors">
              <Image
                src={siteConfig.images.labs.stemRobotics}
                alt="Swayambhoo STEM Robotics Lab - Proposed Visualization"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#083526]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#083526]/95 backdrop-blur-xs border border-[#B88A2A]/40 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#D4B15A] font-semibold">
                    Innovation Block
                  </p>
                  <p className="font-serif text-sm font-bold text-[#F7F3E8]">
                    Robotics Assembly, Microcontrollers & 3D Fabrication
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#F7F3E8]/70 bg-white/10 px-2 py-1 border border-white/20">
                  Concept
                </span>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <SectionHeading
              align="left"
              badge="Innovation & Technology"
              title="Applied STEM, Coding & Robotics"
              description="Empowering young minds from foundational concepts to advanced algorithmic programming, IoT electronics, and mechanical prototyping."
            />

            <div className="space-y-4 text-sm sm:text-base text-[#26332E]/85 leading-relaxed font-sans">
              <p>
                In the Innovation Block at Swayambhoo, theoretical science comes to life. Students assemble functional robotic mechanisms, write clean code in Python and C++, and test prototypes using rapid 3D printing equipment.
              </p>
              <p>
                Guided by experienced mentors, students develop problem-solving grit and computational thinking to prepare them for premier technological frontiers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#F7F3E8] border border-[#DEDCCF] hover:border-[#B88A2A] transition-colors">
                <Bot className="w-6 h-6 text-[#B88A2A] mb-2" />
                <p className="font-serif font-bold text-sm text-[#0F4735]">Robotics Lab</p>
                <p className="text-xs text-[#26332E]">Micro-controllers & robotic arms</p>
              </div>

              <div className="p-4 bg-[#F7F3E8] border border-[#DEDCCF] hover:border-[#B88A2A] transition-colors">
                <Printer className="w-6 h-6 text-[#B88A2A] mb-2" />
                <p className="font-serif font-bold text-sm text-[#0F4735]">3D Prototyping</p>
                <p className="text-xs text-[#26332E]">Precision rapid fabrication</p>
              </div>

              <div className="p-4 bg-[#F7F3E8] border border-[#DEDCCF] hover:border-[#B88A2A] transition-colors">
                <Code2 className="w-6 h-6 text-[#B88A2A] mb-2" />
                <p className="font-serif font-bold text-sm text-[#0F4735]">Coding Stations</p>
                <p className="text-xs text-[#26332E]">Computational logic & AI kits</p>
              </div>

              <div className="p-4 bg-[#F7F3E8] border border-[#DEDCCF] hover:border-[#B88A2A] transition-colors">
                <Cpu className="w-6 h-6 text-[#B88A2A] mb-2" />
                <p className="font-serif font-bold text-sm text-[#0F4735]">Electronics Lab</p>
                <p className="text-xs text-[#26332E]">Circuit design & sensors</p>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
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
