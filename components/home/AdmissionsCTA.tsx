import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageCircle, Phone, CalendarCheck } from "lucide-react";

export function AdmissionsCTA() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF6EE] border-b border-[#E2DBD0] relative overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto bg-white border-2 border-[#C5A059] p-8 sm:p-12 lg:p-16 shadow-xl relative z-10 text-center">
          {/* Top Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F5EFEB] border border-[#E2DBD0] text-xs font-semibold uppercase tracking-widest text-[#856627] mb-6">
            <CalendarCheck className="w-4 h-4 text-[#C5A059]" />
            <span>Admissions Desk • Academic Year 2025–2026</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#14342B] mb-4">
            Begin Your Child&apos;s Transformative Journey
          </h2>

          <p className="text-base sm:text-lg text-[#181C20]/80 leading-relaxed font-sans max-w-2xl mx-auto mb-8">
            Admissions are now open for Early Years (Nursery/KG) through Grade 11. Connect with our academic counselors or schedule a guided campus tour at Wazirganj.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="gold"
              size="lg"
              href="/admissions"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Fill Admission Enquiry Form
            </Button>

            <Button
              variant="whatsapp"
              size="lg"
              href={getWhatsAppUrl({ source: "admissions" })}
              isExternal
              leftIcon={<MessageCircle className="w-5 h-5" />}
            >
              Chat on WhatsApp (+91 96614 48541)
            </Button>

            <Button
              variant="secondary"
              size="lg"
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              leftIcon={<Phone className="w-4 h-4" />}
            >
              Call Admissions: {siteConfig.contact.phone}
            </Button>
          </div>

          <p className="text-xs text-[#181C20]/60 mt-8 pt-6 border-t border-[#F5EFEB]">
            Admissions Counselor Office: Monday – Saturday, 8:00 AM – 3:30 PM • Wazirganj, Gaya, Bihar – 805131
          </p>
        </div>
      </Container>
    </section>
  );
}
