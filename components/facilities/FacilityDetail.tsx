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
      className="py-12 border-b border-[#E2DBD0] last:border-b-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Visual Media */}
        <div className={`lg:col-span-6 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
          <div className="relative aspect-16/10 w-full border-2 border-[#EAE3D7] shadow-md overflow-hidden group">
            <Image
              src={facility.image}
              alt={facility.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-102 transition-transform duration-700"
            />
            {facility.isConceptual && (
              <span className="absolute top-3 left-3 bg-[#081611]/85 text-[#C5A059] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 border border-[#C5A059]/40">
                Architectural Visualization
              </span>
            )}
          </div>
        </div>

        {/* Informational Copy */}
        <div className={`lg:col-span-6 space-y-4 ${reversed ? "lg:order-1" : "lg:order-2"}`}>
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            {facility.category} Infrastructure
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14342B]">
            {facility.name}
          </h3>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#856627]">
            {facility.tagline}
          </p>
          <p className="text-sm text-[#181C20]/80 leading-relaxed font-sans">
            {facility.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {facility.features.map((feat) => (
              <div key={feat} className="flex items-center gap-2 text-xs text-[#14342B] font-medium">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
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
