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
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#DEDCCF]">
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
                className="bg-[#FBF9F2] p-8 border border-[#DEDCCF] hover:border-[#B88A2A] transition-all duration-300 relative group flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1"
              >
                {/* Top Corner Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-[#E7EDE2] group-hover:bg-[#0F4735] transition-colors duration-300 flex items-center justify-center text-[#0F4735] group-hover:text-[#D4B15A] border border-[#C9D8C8] group-hover:border-[#0F4735]">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="font-serif text-sm font-bold text-[#B88A2A]">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F4735] mb-3 group-hover:text-[#B88A2A] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#26332E] leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DEDCCF]/70 flex items-center gap-2 text-xs font-semibold text-[#0F4735]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B88A2A]" />
                  <span>Institutional Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
