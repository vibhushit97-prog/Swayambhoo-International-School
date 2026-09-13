import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShieldCheck, Bus, HeartPulse, Video } from "lucide-react";

export function SafetySection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FDFBF7] border-b border-[#E2DBD0]">
      <Container>
        <SectionHeading
          badge="Parent Peace of Mind"
          title="Uncompromising Campus Safety & Care"
          description="Every square meter of Swayambhoo International School is engineered with child safeguarding protocols, secure access control, and dedicated medical support."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-[#EAE3D7] hover:border-[#C5A059] transition-colors">
            <Video className="w-8 h-8 text-[#C5A059] mb-3" />
            <h3 className="font-serif font-bold text-lg text-[#14342B] mb-2">
              24/7 Monitored Perimeter
            </h3>
            <p className="text-xs sm:text-sm text-[#181C20]/75 leading-relaxed font-sans">
              High-definition digital surveillance covering all corridors, gates, common grounds, and boundary perimeters with trained security personnel.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#EAE3D7] hover:border-[#C5A059] transition-colors">
            <Bus className="w-8 h-8 text-[#C5A059] mb-3" />
            <h3 className="font-serif font-bold text-lg text-[#14342B] mb-2">
              GPS Fleet & Attendants
            </h3>
            <p className="text-xs sm:text-sm text-[#181C20]/75 leading-relaxed font-sans">
              Modern school buses equipped with real-time GPS tracking, speed governors, first-aid kits, and female attendants on all routes across Gaya.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#EAE3D7] hover:border-[#C5A059] transition-colors">
            <HeartPulse className="w-8 h-8 text-[#C5A059] mb-3" />
            <h3 className="font-serif font-bold text-lg text-[#14342B] mb-2">
              Full-Time Medical Infirmary
            </h3>
            <p className="text-xs sm:text-sm text-[#181C20]/75 leading-relaxed font-sans">
              Well-equipped four-bed campus infirmary staffed by qualified medical nursing personnel, emergency oxygen, and on-call pediatrician tie-ups.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#EAE3D7] hover:border-[#C5A059] transition-colors">
            <ShieldCheck className="w-8 h-8 text-[#C5A059] mb-3" />
            <h3 className="font-serif font-bold text-lg text-[#14342B] mb-2">
              Strict Gate Verification
            </h3>
            <p className="text-xs sm:text-sm text-[#181C20]/75 leading-relaxed font-sans">
              Digital visitor pass protocols, parent pickup authorization cards, and 100% background-verified teaching and support staff.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
