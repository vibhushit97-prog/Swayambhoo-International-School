import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CAMPUS_PILLARS } from "@/lib/constants";
import {
  Building2,
  Cpu,
  Trophy,
  BookOpen,
  ShieldCheck,
  Award,
} from "lucide-react";

export function WhySwayambhoo() {
  const iconMap = {
    Building2,
    Cpu,
    Trophy,
    BookOpen,
    ShieldCheck,
    Award,
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAF6EE] border-b border-[#E2DBD0]">
      <Container>
        <SectionHeading
          badge="Distinctive Excellence"
          title="Why Choose Swayambhoo?"
          description="A progressive environment designed to build character, kindle scientific inquiry, and foster lifelong leadership in every student."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CAMPUS_PILLARS.map((pillar, idx) => {
            const IconComponent =
              iconMap[pillar.icon as keyof typeof iconMap] || Award;
            return (
              <div
                key={pillar.title}
                className="bg-white p-8 border border-[#EAE3D7] hover:border-[#C5A059] transition-all duration-300 relative group flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                {/* Top Corner Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-[#F5EFEB] group-hover:bg-[#14342B] transition-colors duration-300 flex items-center justify-center text-[#14342B] group-hover:text-[#C5A059] border border-[#E2DBD0] group-hover:border-[#14342B]">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="font-serif text-sm font-bold text-[#C5A059]">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-[#14342B] mb-3 group-hover:text-[#856627] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#181C20]/75 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F5EFEB] flex items-center gap-2 text-xs font-semibold text-[#14342B] uppercase tracking-wider group-hover:text-[#C5A059] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>Swayambhoo Benchmark</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
