import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactCard } from "@/components/contact/ContactCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPlaceholder } from "@/components/contact/MapPlaceholder";

export const metadata = constructMetadata({
  title: "Contact Us & Campus Location | Wazirganj, Gaya, Bihar",
  description:
    "Contact Swayambhoo International School in Wazirganj, Gaya, Bihar. Call +91 92412 18844 or WhatsApp +91 96614 48541 for admissions and campus visits.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="bg-[#FDFBF7]">
      {/* Hero Header */}
      <section className="bg-[#081611] text-[#FDFBF7] py-20 lg:py-24 relative overflow-hidden border-b-2 border-[#C5A059]">
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059]">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Contact</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white">
              Connect with Our School Administration
            </h1>

            <p className="text-base sm:text-lg text-[#E8DFC8]/90 font-sans leading-relaxed">
              We welcome prospective parents, educationists, and community members to connect with our administrative desk or plan a visit to our campus.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Contact Grid */}
      <section className="py-20 border-b border-[#E2DBD0]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info Card */}
            <div className="lg:col-span-5 space-y-8">
              <ContactCard />
              <MapPlaceholder />
            </div>

            {/* Right: Direct Message Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
