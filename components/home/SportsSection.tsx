import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Trophy, Activity, Dumbbell, ShieldCheck, ArrowRight } from "lucide-react";

export function SportsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#F7F3E8] border-b border-[#DEDCCF]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              align="left"
              badge="Athletics & Physical Culture"
              title="Championship Sports Complex"
              description="A multi-sport arena built to international standards, fostering sportsmanship, physical endurance, and teamwork from early grades."
            />

            <div className="space-y-4 text-sm sm:text-base text-[#26332E]/85 leading-relaxed font-sans">
              <p>
                True discipline begins on the field and court. Our indoor sports complex features certified Canadian maple hardwood flooring with shock-absorption sub-floors that protect young athletes&apos; joints during high-impact training.
              </p>
              <p>
                Accommodating championship basketball, volleyball, badminton courts, and indoor table tennis, students receive structured coaching from certified physical training instructors.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border border-[#DEDCCF] bg-white p-4 hover:border-[#B88A2A] transition-colors">
                <Trophy className="w-5 h-5 text-[#B88A2A] mb-1.5" />
                <p className="font-serif font-bold text-sm text-[#0F4735]">Maple Hardwood Court</p>
                <p className="text-xs text-[#26332E]">Shock-damped timber surface</p>
              </div>

              <div className="border border-[#DEDCCF] bg-white p-4 hover:border-[#B88A2A] transition-colors">
                <Activity className="w-5 h-5 text-[#B88A2A] mb-1.5" />
                <p className="font-serif font-bold text-sm text-[#0F4735]">Badminton & Basketball</p>
                <p className="text-xs text-[#26332E]">Standard dimensions & nets</p>
              </div>

              <div className="border border-[#DEDCCF] bg-white p-4 hover:border-[#B88A2A] transition-colors">
                <Dumbbell className="w-5 h-5 text-[#B88A2A] mb-1.5" />
                <p className="font-serif font-bold text-sm text-[#0F4735]">Fitness Conditioning</p>
                <p className="text-xs text-[#26332E]">Youth agility & gymnastics</p>
              </div>

              <div className="border border-[#DEDCCF] bg-white p-4 hover:border-[#B88A2A] transition-colors">
                <ShieldCheck className="w-5 h-5 text-[#B88A2A] mb-1.5" />
                <p className="font-serif font-bold text-sm text-[#0F4735]">Sports Medicine First</p>
                <p className="text-xs text-[#26332E]">Trained on-site first aid</p>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                href="/facilities#sports-complex"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View Athletic Facilities
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-16/10 w-full border-2 border-[#DEDCCF] shadow-xl overflow-hidden group hover:border-[#B88A2A] transition-colors">
              <Image
                src={siteConfig.images.sports.complex}
                alt="Swayambhoo Indoor Sports Complex - Proposed Concept"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#083526]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#083526]/95 backdrop-blur-xs border border-[#B88A2A]/40 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#D4B15A] font-semibold">
                    Athletics Complex
                  </p>
                  <p className="font-serif text-sm font-bold text-[#F7F3E8]">
                    Multi-Sport Maple Arena & Spectator Gallery
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
