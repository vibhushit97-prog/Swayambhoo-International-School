import React from "react";
import Image from "next/image";
import { Facility } from "@/types/facility";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight } from "lucide-react";

interface FacilityDetailProps {
  facility: Facility;
  reversed?: boolean;
}

export function FacilityDetail({ facility, reversed = false }: FacilityDetailProps) {
  return (
    <div
      id={facility.slug}
      className="py-12 border-b border-[#DEDCCF] last:border-b-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Visual Media */}
        <div className={`lg:col-span-6 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
          <div className="relative aspect-16/10 w-full border-2 border-[#DEDCCF] hover:border-[#B88A2A] rounded-2xl shadow-[0_4px_20px_rgba(15,71,53,0.04)] overflow-hidden group transition-colors">
            <Image
              src={facility.image}
              alt={facility.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-102 transition-transform duration-700"
            />
            {facility.isConceptual && (
              <span className="absolute top-3 left-3 bg-[#083526]/90 text-[#D4B15A] text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 border border-[#B88A2A]/40 rounded-md shadow-xs">
                Architectural Visualization
              </span>
            )}
          </div>
        </div>

        {/* Informational Copy */}
        <div className={`lg:col-span-6 space-y-4 ${reversed ? "lg:order-1" : "lg:order-2"}`}>
          <span className="text-xs font-bold uppercase tracking-widest text-[#B88A2A]">
            {facility.category} Infrastructure
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4735]">
            {facility.name}
          </h3>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B88A2A]">
            {facility.tagline}
          </p>
          <p className="text-sm text-[#26332E] leading-relaxed font-sans">
            {facility.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {facility.features.map((feat) => (
              <div key={feat} className="flex items-center gap-2 text-xs text-[#26332E] font-medium">
                <Check className="w-4 h-4 text-[#B88A2A] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Button
              variant="secondary"
              size="sm"
              href="/admissions"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Enquire About Campus Admissions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
