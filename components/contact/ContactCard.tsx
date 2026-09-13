import React from "react";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MapPin, Phone, MessageCircle, Mail, Clock, ExternalLink } from "lucide-react";

export function ContactCard() {
  return (
    <div className="bg-[#FAF6EE] border border-[#EAE3D7] p-8 sm:p-10 space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
          Campus Information
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#14342B]">
          Swayambhoo International School
        </h3>
        <p className="text-xs text-[#856627] uppercase tracking-wider mt-0.5">
          Estd. 2024 • Wazirganj, Gaya
        </p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm text-[#181C20]/80">
        <div className="flex items-start gap-3.5 pb-4 border-b border-[#E2DBD0]">
          <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold text-[#14342B]">Campus Address</strong>
            <span>{siteConfig.contact.address.full}</span>
            <p className="text-[11px] text-[#64748B] mt-0.5">Near NH-82 Gaya-Nawada Highway</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 pb-4 border-b border-[#E2DBD0]">
          <Phone className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold text-[#14342B]">Admissions Desk Phone</strong>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="text-[#14342B] hover:text-[#C5A059] font-medium"
            >
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3.5 pb-4 border-b border-[#E2DBD0]">
          <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold text-[#14342B]">Official WhatsApp</strong>
            <a
              href={getWhatsAppUrl({ source: "contact" })}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline font-medium"
            >
              {siteConfig.contact.whatsapp}
            </a>
            <p className="text-[11px] text-[#64748B]">Instant chat with counselors</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 pb-4 border-b border-[#E2DBD0]">
          <Mail className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold text-[#14342B]">Email Enquiries</strong>
            <a
              href={`mailto:${siteConfig.contact.admissionsEmail}`}
              className="text-[#14342B] hover:text-[#C5A059] font-medium"
            >
              {siteConfig.contact.admissionsEmail}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <Clock className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold text-[#14342B]">Administrative Hours</strong>
            <span>{siteConfig.contact.officeHours}</span>
            <p className="text-[11px] text-[#64748B]">Closed on Sundays and public holidays</p>
          </div>
        </div>
      </div>
    </div>
  );
}
