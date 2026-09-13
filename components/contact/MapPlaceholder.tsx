import React from "react";
import { siteConfig } from "@/config/site";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

export function MapPlaceholder() {
  return (
    <div className="bg-[#FBF9F2] border border-[#DEDCCF] p-8 text-center space-y-4 rounded-2xl shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
      <div className="w-14 h-14 bg-[#0F4735] text-[#D4B15A] mx-auto flex items-center justify-center border border-[#B88A2A] shadow-md rounded-xl">
        <MapPin className="w-7 h-7" />
      </div>
      <div>
        <h4 className="font-serif font-bold text-lg text-[#0F4735]">
          Swayambhoo Campus Geolocation
        </h4>
        <p className="text-xs text-[#26332E]/80 font-sans mt-0.5">
          {siteConfig.contact.address.full}
        </p>
      </div>

      <div className="p-4 bg-white border border-[#DEDCCF] text-xs text-[#26332E]/80 max-w-sm mx-auto rounded-xl">
        <p className="font-semibold text-[#0F4735] mb-1">Navigation Assistance</p>
        <p className="leading-relaxed">
          Located along NH-82 Gaya-Nawada Road. Accessible via state highway with dedicated school bus drop-off bay.
        </p>
      </div>

      <a
        href="https://maps.google.com/?q=Wazirganj+Gaya+Bihar+805131"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F4735] text-white hover:bg-[#083526] text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
      >
        <Navigation className="w-4 h-4 text-[#D4B15A]" />
        <span>Open in Google Maps</span>
        <ExternalLink className="w-3 h-3 text-white/60" />
      </a>
    </div>
  );
}
