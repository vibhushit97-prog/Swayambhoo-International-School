import React from "react";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MapPin, Phone, MessageCircle, Mail, Clock, ExternalLink } from "lucide-react";

export function ContactCard() {
  return (
    <div className="bg-[#FBF9F2] border border-[#DEDCCF] rounded-2xl p-8 sm:p-10 space-y-6 shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#B88A2A] block mb-1">
          Campus Information
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#0F4735]">
          Swayambhoo International School
        </h3>
        <p className="text-xs text-[#B88A2A] uppercase tracking-wider font-semibold mt-0.5">
          Estd. 2024 • Wazirganj, Gaya
        </p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm text-[#26332E]/80">
        <div className="flex items-start gap-3.5 pb-4 border-b border-[#DEDCCF]">
          <MapPin className="w-5 h-5 text-[#B88A2A] shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold text-[#0F4735]">Campus Address</strong>
            <span>{siteConfig.contact.address.full}</span>
            <p className="text-[11px] text-[#26332E] mt-0.5">Near NH-82 Gaya-Nawada Highway</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 pb-4 border-b border-[#DEDCCF]">
          <Phone className="w-5 h-5 text-[#B88A2A] shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold text-[#0F4735]">Admissions Desk Phone</strong>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="text-[#0F4735] hover:text-[#B88A2A] font-semibold"
            >
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3.5 pb-4 border-b border-[#DEDCCF]">
          <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold text-[#0F4735]">Official WhatsApp</strong>
            <a
              href={getWhatsAppUrl({ source: "contact" })}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0F4735] hover:text-[#B88A2A] hover:underline font-semibold"
            >
              {siteConfig.contact.whatsapp}
            </a>
            <p className="text-[11px] text-[#26332E]">Instant chat with counselors</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 pb-4 border-b border-[#DEDCCF]">
          <Mail className="w-5 h-5 text-[#B88A2A] shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold text-[#0F4735]">Email Enquiries</strong>
            <a
              href={`mailto:${siteConfig.contact.admissionsEmail}`}
              className="text-[#0F4735] hover:text-[#B88A2A] font-medium"
            >
              {siteConfig.contact.admissionsEmail}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <Clock className="w-5 h-5 text-[#B88A2A] shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold text-[#0F4735]">Administrative Hours</strong>
            <span>{siteConfig.contact.officeHours}</span>
            <p className="text-[11px] text-[#26332E]">Closed on Sundays and public holidays</p>
          </div>
        </div>
      </div>
    </div>
  );
}
