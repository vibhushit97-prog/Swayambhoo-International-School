import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sun, Droplets, Leaf, Recycle } from "lucide-react";

export function SustainabilitySection() {
  return (
    <section className="py-20 lg:py-28 bg-[#14342B] text-[#FDFBF7] border-b border-[#0E241B]">
      <Container>
        <SectionHeading
          badge="Green Stewardship"
          theme="dark"
          title="Eco-Literacy & Sustainable Infrastructure"
          description="We believe in teaching planetary responsibility by example. Our physical campus operates on ecologically sustainable systems that students learn from firsthand."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#0E241B] border border-[#1E4D40]">
            <Sun className="w-8 h-8 text-[#C5A059] mb-3" />
            <h3 className="font-serif font-bold text-lg text-white mb-2">
              Solar Energy Integration
            </h3>
            <p className="text-xs sm:text-sm text-[#E8DFC8]/75 leading-relaxed font-sans">
              Solar photovoltaic canopies over parking areas and rooftops generating clean power for educational laboratories and classrooms.
            </p>
          </div>

          <div className="p-6 bg-[#0E241B] border border-[#1E4D40]">
            <Droplets className="w-8 h-8 text-[#C5A059] mb-3" />
            <h3 className="font-serif font-bold text-lg text-white mb-2">
              Rainwater Harvesting
            </h3>
            <p className="text-xs sm:text-sm text-[#E8DFC8]/75 leading-relaxed font-sans">
              Recharge wells and sub-surface filtration basins capturing monsoon rainfall to replenish the local water table in Wazirganj.
            </p>
          </div>

          <div className="p-6 bg-[#0E241B] border border-[#1E4D40]">
            <Leaf className="w-8 h-8 text-[#C5A059] mb-3" />
            <h3 className="font-serif font-bold text-lg text-white mb-2">
              Native Botanical Gardens
            </h3>
            <p className="text-xs sm:text-sm text-[#E8DFC8]/75 leading-relaxed font-sans">
              Drought-tolerant indigenous Bihar trees, medicinal plant beds, and butterfly gardens providing hands-on biology lessons.
            </p>
          </div>

          <div className="p-6 bg-[#0E241B] border border-[#1E4D40]">
            <Recycle className="w-8 h-8 text-[#C5A059] mb-3" />
            <h3 className="font-serif font-bold text-lg text-white mb-2">
              Zero Plastic Policy
            </h3>
            <p className="text-xs sm:text-sm text-[#E8DFC8]/75 leading-relaxed font-sans">
              A single-use plastic-free campus supported by hygienic water refill stations and organic dining waste composting units.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
