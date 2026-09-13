import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AdmissionForm } from "@/components/admissions/AdmissionForm";
import { Button } from "@/components/ui/Button";
import {
  FileText,
  UserCheck,
  CreditCard,
  School,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Admissions 2025–2026 | Nursery to Grade 11 | Apply Online",
  description:
    "Apply for admissions at Swayambhoo International School, Wazirganj, Gaya, Bihar for academic year 2025–2026. Submit enquiry online or chat with our admissions desk.",
  path: "/admissions",
});

export default function AdmissionsPage() {
  const steps = [
    {
      step: "01",
      title: "Online Enquiry",
      desc: "Complete the admission form below or reach our team via WhatsApp for instant prospectus details.",
      icon: FileText,
    },
    {
      step: "02",
      title: "Parent & Child Interaction",
      desc: "An informal discussion to understand the child's developmental milestones and academic goals.",
      icon: UserCheck,
    },
    {
      step: "03",
      title: "Document Verification",
      desc: "Verification of date of birth proof, transfer certificate (if applicable), and medical records.",
      icon: CreditCard,
    },
    {
      step: "04",
      title: "Enrollment & Welcome",
      desc: "Completion of admission formalities, measurement for school uniforms, and orientation packet.",
      icon: School,
    },
  ];

  return (
    <div className="bg-[#F7F3E8]">
      {/* Hero Header */}
      <section className="bg-[#083526] text-[#F7F3E8] py-20 lg:py-24 relative overflow-hidden border-b-2 border-[#B88A2A]">
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4B15A] font-bold">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Admissions</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0F4735] border border-[#B88A2A]/40 text-xs text-[#D4B15A] uppercase tracking-wider font-semibold rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#B88A2A] animate-pulse" />
              <span>Enrollment Open for 2025–2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#FFFFFF]">
              Admissions Portal & Guidelines
            </h1>

            <p className="text-base sm:text-lg text-[#F7F3E8] font-sans leading-relaxed">
              We welcome families who seek balanced academic excellence, modern biophilic infrastructure, and a strong character foundation for their children in Gaya, Bihar.
            </p>
          </div>
        </Container>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-16 border-b border-[#DEDCCF] bg-white">
        <Container>
          <SectionHeading
            badge="Simple Transparent Procedure"
            title="The 4-Step Admission Journey"
            description="Our admissions process is designed to be transparent, welcoming, and parent-friendly."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-[#FBF9F2] p-6 border border-[#DEDCCF] hover:border-[#B88A2A] rounded-2xl shadow-[0_4px_20px_rgba(15,71,53,0.04)] transition-all relative"
                >
                  <span className="text-xs font-bold text-[#B88A2A] uppercase tracking-widest block mb-3">
                    Step {item.step}
                  </span>
                  <div className="w-10 h-10 bg-[#E7EDE2] border border-[#DEDCCF] rounded-xl flex items-center justify-center text-[#0F4735] mb-4">
                    <Icon className="w-5 h-5 text-[#B88A2A]" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#0F4735] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#26332E] leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Main Admission Form Section */}
      <section className="py-20 lg:py-24 border-b border-[#DEDCCF] bg-[#F7F3E8]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-8">
              <AdmissionForm />
            </div>

            {/* Right Column: Support & Office Details */}
            <div className="lg:col-span-4 space-y-6">
              {/* WhatsApp Fast Track Card */}
              <div className="bg-[#083526] text-white p-6 sm:p-8 border border-[#B88A2A]/40 rounded-2xl shadow-[0_8px_30px_rgba(15,71,53,0.1)] space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4B15A] block">
                  Instant Counselor Chat
                </span>
                <h3 className="font-serif text-xl font-bold text-[#FFFFFF]">
                  Have Questions on the Go?
                </h3>
                <p className="text-xs sm:text-sm text-[#F7F3E8] leading-relaxed font-sans">
                  Chat directly with our admissions desk on WhatsApp. We answer queries regarding class availability, transport routes, and prospectus documents.
                </p>

                <Button
                  variant="whatsapp"
                  size="md"
                  href={getWhatsAppUrl({ source: "admissions" })}
                  isExternal
                  className="w-full justify-center text-xs shadow-md"
                  leftIcon={<MessageCircle className="w-4 h-4" />}
                >
                  WhatsApp: +91 96614 48541
                </Button>
              </div>

              {/* Admissions Office Information */}
              <div className="bg-[#FBF9F2] border border-[#DEDCCF] rounded-2xl p-6 space-y-4 text-xs text-[#26332E] shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
                <h4 className="font-serif font-bold text-base text-[#0F4735] border-b border-[#DEDCCF] pb-2">
                  Admissions Office Desk
                </h4>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B88A2A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F4735] block">Campus Address:</strong>
                    <span>{siteConfig.contact.address.full}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B88A2A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F4735] block">Telephone:</strong>
                    <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`} className="hover:underline text-[#0F4735] font-semibold">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#B88A2A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F4735] block">Working Hours:</strong>
                    <span>{siteConfig.contact.officeHours}</span>
                  </div>
                </div>
              </div>

              {/* Required Documents Checklist */}
              <div className="bg-white border border-[#DEDCCF] rounded-2xl p-6 space-y-3 shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
                <h4 className="font-serif font-bold text-sm text-[#0F4735] border-b border-[#DEDCCF] pb-2">
                  Documents for Final Enrollment
                </h4>
                <ul className="space-y-2 text-xs text-[#26332E]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B88A2A] shrink-0 mt-0.5" />
                    <span>Birth Certificate issued by competent authority</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B88A2A] shrink-0 mt-0.5" />
                    <span>Recent passport-size photographs of student & parents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B88A2A] shrink-0 mt-0.5" />
                    <span>Transfer Certificate (for Grade 2 and above)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B88A2A] shrink-0 mt-0.5" />
                    <span>Previous year academic progress report card</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
