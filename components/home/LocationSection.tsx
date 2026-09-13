import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MapPin, Navigation, Bus, Clock, ExternalLink } from "lucide-react";

export function LocationSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FDFBF7]">
      <Container>
        <SectionHeading
          badge="Strategic Location"
          title="Visit Our Campus in Wazirganj, Gaya"
          description="Conveniently situated along the high-connectivity NH-82 corridor, ensuring safe, hassle-free bus routes and parent accessibility across the greater Gaya district."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Representation Box */}
          <div className="lg:col-span-7 bg-[#FAF6EE] border border-[#EAE3D7] p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E2DBD0]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#C5A059]" />
                  <span className="font-serif font-bold text-base text-[#14342B]">
                    Swayambhoo Campus Geolocation
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#856627] bg-white px-2.5 py-1 border border-[#E2DBD0]">
                  PIN: 805131
                </span>
              </div>

              {/* Architectural Styled Map Canvas */}
              <div className="relative aspect-16/9 w-full bg-[#14342B] border border-[#0E241B] flex flex-col items-center justify-center text-center p-6 text-white shadow-inner">
                {/* Radial grid effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.15)_0%,transparent_70%)]" />
                
                <div className="relative z-10 space-y-3 max-w-sm">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#C5A059] flex items-center justify-center text-[#0E241B] shadow-lg animate-bounce">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <p className="font-serif font-bold text-lg text-white">
                    Swayambhoo International School
                  </p>
                  <p className="text-xs text-[#E8DFC8]/90 font-sans">
                    Wazirganj, Gaya, Bihar – 805131, India
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://maps.google.com/?q=Wazirganj+Gaya+Bihar+805131"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C5A059] hover:underline"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2DBD0] flex items-center justify-between text-xs text-[#181C20]/70">
              <span className="font-medium">Direct Highway Access via NH-82</span>
              <span>Coordinates: 24.8105° N, 85.2346° E</span>
            </div>
          </div>

          {/* Transit & Commute Info */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="bg-white border border-[#EAE3D7] p-6 space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#14342B] border-b border-[#F5EFEB] pb-3">
                Commute & Proximity Highlights
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-[#181C20]/80">
                <div className="flex items-start gap-3">
                  <Navigation className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#14342B]">NH-82 Gaya–Nawada Highway:</strong>
                    <p className="text-xs text-[#181C20]/70">Smooth double-lane arterial access right to the school gate</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Bus className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#14342B]">Gaya City & Bodh Gaya:</strong>
                    <p className="text-xs text-[#181C20]/70">~25–35 min comfortable commute via dedicated school bus routes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#14342B]">Gaya Junction Railway Station:</strong>
                    <p className="text-xs text-[#181C20]/70">~26 km / 40 minutes driving distance</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF6EE] border border-[#EAE3D7] p-6">
              <h4 className="font-serif font-bold text-base text-[#14342B] mb-2">
                Campus Visiting Hours
              </h4>
              <p className="text-xs text-[#181C20]/75 leading-relaxed font-sans mb-4">
                Parents and visitors are warmly welcomed during administrative hours. Guided campus walk-throughs can be pre-scheduled with our admissions coordinator.
              </p>
              <div className="flex items-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  href="/contact"
                >
                  Schedule Campus Visit
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  href="/admissions"
                >
                  Admission Desk
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
