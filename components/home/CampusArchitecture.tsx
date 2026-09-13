import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Compass, SunMedium, Trees, ShieldAlert, ArrowRight } from "lucide-react";

export function CampusArchitecture() {
  return (
    <section className="py-20 lg:py-28 bg-[#E7EDE2] border-b border-[#C9D8C8]">
      <Container>
        <SectionHeading
          badge="Built Environment"
          title="Architectural Harmony & Biophilic Spaces"
          description="A campus designed as a silent teacher — balanced with monumental classical proportions, natural sandstone, shaded porticos, and tranquil inner courtyards."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Main Facade Card */}
          <div className="bg-white border border-[#DEDCCF] p-4 shadow-sm hover:border-[#B88A2A] transition-all">
            <div className="relative aspect-16/10 w-full overflow-hidden mb-4">
              <Image
                src={siteConfig.images.campus.main}
                alt="Swayambhoo Main Facade with Knowledge & Innovation Wings"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-103 transition-transform duration-700"
              />
              <span className="absolute top-3 left-3 bg-[#083526]/90 text-[#D4B15A] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 border border-[#B88A2A]/40">
                Architectural Visualization
              </span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F4735] mb-2">
              Symmetrical Grand Colonnade & Arrival Plaza
            </h3>
            <p className="text-sm text-[#26332E] leading-relaxed font-sans">
              Anchored by the central portico with grand stone pillars, landscaped circular driveway, dedicated security gatehouse, and outdoor amphitheater inscribed with the school motto.
            </p>
          </div>

          {/* Biophilic Courtyard Card */}
          <div className="bg-white border border-[#DEDCCF] p-4 shadow-sm hover:border-[#B88A2A] transition-all">
            <div className="relative aspect-16/10 w-full overflow-hidden mb-4">
              <Image
                src={siteConfig.images.campus.courtyard}
                alt="Swayambhoo Courtyard and Shaded Outdoor Learning"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-103 transition-transform duration-700"
              />
              <span className="absolute top-3 left-3 bg-[#083526]/90 text-[#D4B15A] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 border border-[#B88A2A]/40">
                Biophilic Courtyard Concept
              </span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F4735] mb-2">
              Verdant Courtyards & Open-Air Amphitheaters
            </h3>
            <p className="text-sm text-[#26332E] leading-relaxed font-sans">
              Interior gardens filled with native flora, shaded pergolas, gentle water features, and stepped wood seating terraces that turn the natural outdoors into stimulating classrooms.
            </p>
          </div>
        </div>

        {/* Feature Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-[#C9D8C8]">
          <div className="flex items-start gap-3">
            <Trees className="w-5 h-5 text-[#B88A2A] shrink-0 mt-1" />
            <div>
              <p className="font-serif font-bold text-sm text-[#0F4735]">40%+ Green Canopy</p>
              <p className="text-xs text-[#26332E]">Native shade trees & manicured lawns</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <SunMedium className="w-5 h-5 text-[#B88A2A] shrink-0 mt-1" />
            <div>
              <p className="font-serif font-bold text-sm text-[#0F4735]">Passive Solar Shading</p>
              <p className="text-xs text-[#26332E]">Deep overhangs and thermal sandstone</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Compass className="w-5 h-5 text-[#B88A2A] shrink-0 mt-1" />
            <div>
              <p className="font-serif font-bold text-sm text-[#0F4735]">Pedestrian Safety First</p>
              <p className="text-xs text-[#26332E]">Vehicle-free central learning quads</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#B88A2A] shrink-0 mt-1" />
            <div>
              <p className="font-serif font-bold text-sm text-[#0F4735]">Discipline & Order</p>
              <p className="text-xs text-[#26332E]">Secure access & monitored perimeters</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="secondary"
            href="/campus"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Complete Campus Masterplan
          </Button>
        </div>
      </Container>
    </section>
  );
}
