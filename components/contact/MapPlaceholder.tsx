import React from "react";
import { siteConfig } from "@/config/site";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

export function MapPlaceholder() {
  return (
    <div className="bg-[#FAF6EE] border border-[#EAE3D7] p-8 text-center space-y-4">
      <div className="w-14 h-14 bg-[#14342B] text-[#C5A059] mx-auto flex items-center justify-center border border-[#C5A059] shadow-md">
        <MapPin className="w-7 h-7" />
      </div>
      <div>
        <h4 className="font-serif font-bold text-lg text-[#14342B]">
          Swayambhoo Campus Geolocation
        </h4>
        <p className="text-xs text-[#181C20]/70 font-sans mt-0.5">
          {siteConfig.contact.address.full}
        </p>
      </div>

      <div className="p-4 bg-white border border-[#E2DBD0] text-xs text-[#64748B] max-w-sm mx-auto">
        <p className="font-semibold text-[#14342B] mb-1">Navigation Assistance</p>
        <p className="leading-relaxed">
          Located along NH-82 Gaya-Nawada Road. Accessible via state highway with dedicated school bus drop-off bay.
        </p>
      </div>

      <a
        href="https://maps.google.com/?q=Wazirganj+Gaya+Bihar+805131"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#14342B] text-[#FDFBF7] hover:bg-[#0E241B] text-xs font-semibold uppercase tracking-wider transition-colors"
      >
        <Navigation className="w-4 h-4 text-[#C5A059]" />
        <span>Open in Google Maps</span>
        <ExternalLink className="w-3 h-3 text-white/60" />
      </a>
    </div>
  );
}
