import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata = constructMetadata({
  title: "Terms & Conditions | Institutional Guidelines",
  description:
    "Terms and Conditions governing the use of Swayambhoo International School's website, admission portal, and campus communication.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="bg-[#FDFBF7]">
      {/* Hero Banner */}
      <section className="bg-[#081611] text-[#FDFBF7] py-16 border-b-2 border-[#C5A059]">
        <Container>
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059]">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Terms of Service</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
              Terms & Institutional Guidelines
            </h1>
            <p className="text-xs sm:text-sm text-[#E8DFC8]/80 font-mono">
              Academic Session 2025–2026 • Wazirganj, Gaya, Bihar
            </p>
          </div>
        </Container>
      </section>

      {/* Terms Body */}
      <section className="py-16">
        <Container size="narrow">
          <div className="bg-white border border-[#EAE3D7] p-8 sm:p-12 space-y-8 text-sm text-[#181C20]/80 leading-relaxed font-sans">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#14342B] mb-3">
                1. General Website Terms
              </h2>
              <p>
                By accessing or utilizing the official website of Swayambhoo International School (Wazirganj, Gaya, Bihar – 805131, India), users agree to comply with and be bound by these terms and conditions. If you disagree with any part of these terms, please discontinue using this portal.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-[#14342B] mb-3">
                2. Nature of Architectural & Conceptual Visualizations
              </h2>
              <p>
                Photographic imagery, 3D architectural elevations, and landscape renders marked as &ldquo;Proposed Campus Concept&rdquo; or &ldquo;Architectural Visualization&rdquo; illustrate the planned institutional infrastructure of Swayambhoo International School. While planned with utmost architectural fidelity, actual finishes, room allocations, and landscape maturity may evolve during progressive construction and fit-out phases.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-[#14342B] mb-3">
                3. Admission Enquiries & Registration
              </h2>
              <p>
                Submitting an online admission enquiry through this website or via WhatsApp constitutes an expression of interest and does not guarantee an immediate seat offer. Formal admission is finalized strictly upon verification of authentic documents, meeting eligibility requirements, and payment of the prescribed registration and tuition fees.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-[#14342B] mb-3">
                4. Intellectual Property & Uniform Design
              </h2>
              <p>
                The name &ldquo;Swayambhoo International School&rdquo;, the official golden sacred flame emblem, the school motto &ldquo;Learn • Grow • Lead&rdquo;, and official uniform designs (including vertical typographic branding) are exclusive intellectual assets of Swayambhoo International School. Unauthorized reproduction, imitation, or commercial exploitation is strictly prohibited.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-[#14342B] mb-3">
                5. Governing Law & Jurisdiction
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the Republic of India. Any legal dispute arising out of or related to this portal or institutional administration shall be subject to the exclusive jurisdiction of the competent courts in Gaya, Bihar.
              </p>
            </div>

            <div className="pt-6 border-t border-[#F5EFEB] flex items-center justify-between">
              <Link href="/privacy" className="text-xs font-semibold text-[#856627] hover:underline">
                ← View Privacy Policy
              </Link>
              <Button variant="primary" size="sm" href="/admissions">
                Apply for Admission
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
