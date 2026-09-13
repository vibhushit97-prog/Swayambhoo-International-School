import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facility } from "@/types/facility";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FacilityCardProps {
  facility: Facility;
}

export function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <div
      id={facility.slug}
      className="bg-white border border-[#EAE3D7] hover:border-[#C5A059] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group overflow-hidden"
    >
      <div>
        <div className="relative aspect-16/10 w-full overflow-hidden bg-[#FAF6EE]">
          <Image
            src={facility.image}
            alt={facility.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-103 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-3 left-3">
            <span className="bg-[#081611]/85 text-[#C5A059] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 border border-[#C5A059]/40">
              {facility.category}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium block">
              Facility Focus
            </span>
            <p className="font-serif font-bold text-base text-white truncate">
              {facility.name}
            </p>
          </div>
        </div>

        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#856627] mb-2">
            {facility.tagline}
          </p>
          <p className="text-xs sm:text-sm text-[#181C20]/75 leading-relaxed font-sans mb-4">
            {facility.description}
          </p>

          <div className="space-y-1.5 pt-3 border-t border-[#F5EFEB]">
            {facility.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-xs text-[#181C20]/80">
                <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <Button
          variant="secondary"
          size="sm"
          href="/admissions"
          className="w-full justify-center text-xs"
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Enquire About Facility
        </Button>
      </div>
    </div>
  );
}
