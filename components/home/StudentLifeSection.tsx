import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Sparkles, Palette, Users, ArrowRight } from "lucide-react";

export function StudentLifeSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF6EE] border-b border-[#E2DBD0]">
      <Container>
        <SectionHeading
          badge="Community & Identity"
          title="Vibrant Student Life & Uniform Identity"
          description="Fostering unity, mutual respect, and personal poise through enriching co-curricular traditions and an elegant official dress code."
        />

        {/* Uniform Identity Feature Grid */}
        <div className="bg-white border border-[#EAE3D7] p-6 sm:p-10 mb-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] block mb-2">
              Official Institutional Attire
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14342B] mb-3">
              The Swayambhoo Uniform Standards
            </h3>
            <p className="text-sm text-[#181C20]/75 leading-relaxed font-sans">
              Designed with premium quality breathable cotton, our uniforms feature a refined palette of crisp white, deep chocolate brown, and elegant golden accents. Every garment carries the embroidered sacred flame emblem and vertical typographic branding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Boys Uniform Card */}
            <div className="border border-[#E2DBD0] bg-[#FAF6EE] p-4 group">
              <div className="relative aspect-4/3 w-full bg-white overflow-hidden mb-4 border border-[#E2DBD0]">
                <Image
                  src={siteConfig.images.uniforms.boys}
                  alt="Swayambhoo Official Boys Uniform Specification"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-2 group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-base text-[#14342B]">
                    Boys Formal & Daily Uniform
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#856627] bg-[#F8F3E8] px-2 py-0.5 border border-[#C5A059]/40">
                    Official Spec
                  </span>
                </div>
                <p className="text-xs text-[#181C20]/70 leading-relaxed">
                  White cotton shirt with brown & gold collar and cuff tipping, embroidered gold flame crest on pocket, vertical &lsquo;SWAYAMBHOO&rsquo; placket branding, and tailored chocolate brown trousers.
                </p>
              </div>
            </div>

            {/* Girls Uniform Card */}
            <div className="border border-[#E2DBD0] bg-[#FAF6EE] p-4 group">
              <div className="relative aspect-4/3 w-full bg-white overflow-hidden mb-4 border border-[#E2DBD0]">
                <Image
                  src={siteConfig.images.uniforms.girls}
                  alt="Swayambhoo Official Girls Skirt and Kurta Uniform Specifications"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-2 group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-base text-[#14342B]">
                    Girls Skirt & Kurta Uniforms
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#856627] bg-[#F8F3E8] px-2 py-0.5 border border-[#C5A059]/40">
                    Official Spec
                  </span>
                </div>
                <p className="text-xs text-[#181C20]/70 leading-relaxed">
                  Two elegant configurations: pleated chocolate brown skirt with double gold border trim, or contemporary full-cut kurta uniform with embroidered pocket emblem and matching salwar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Co-Curricular & House System */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-[#EAE3D7]">
            <Users className="w-6 h-6 text-[#C5A059] mb-3" />
            <h4 className="font-serif font-bold text-lg text-[#14342B] mb-2">
              Four House Systems
            </h4>
            <p className="text-xs sm:text-sm text-[#181C20]/70 leading-relaxed font-sans">
              Instilling camaraderie, healthy inter-house debates, sports championships, and leadership appointments through a supportive mentorship hierarchy.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#EAE3D7]">
            <Palette className="w-6 h-6 text-[#C5A059] mb-3" />
            <h4 className="font-serif font-bold text-lg text-[#14342B] mb-2">
              Performing & Fine Arts
            </h4>
            <p className="text-xs sm:text-sm text-[#181C20]/70 leading-relaxed font-sans">
              Studios for Indian classical music, contemporary orchestra, theater productions, pottery, and visual arts integrated into the weekly timetable.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#EAE3D7]">
            <Sparkles className="w-6 h-6 text-[#C5A059] mb-3" />
            <h4 className="font-serif font-bold text-lg text-[#14342B] mb-2">
              Clubs & Social Initiatives
            </h4>
            <p className="text-xs sm:text-sm text-[#181C20]/70 leading-relaxed font-sans">
              Eco Club, Robotics League, Model UN, Debating Society, and community literacy drives in surrounding Wazirganj communities.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button
            variant="primary"
            href="/student-life"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Student Life & Guidelines
          </Button>
        </div>
      </Container>
    </section>
  );
}
