import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata = constructMetadata({
  title: "Privacy Policy | Student & Parent Data Protection",
  description:
    "Privacy Policy for Swayambhoo International School explaining our commitment to child privacy, data security, and communication protocols.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="bg-[#FDFBF7]">
      {/* Hero Banner */}
      <section className="bg-[#081611] text-[#FDFBF7] py-16 border-b-2 border-[#C5A059]">
        <Container>
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059]">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Privacy Policy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
              Privacy Policy & Student Data Protection
            </h1>
            <p className="text-xs sm:text-sm text-[#E8DFC8]/80 font-mono">
              Last Updated: Academic Session 2025–2026
            </p>
          </div>
        </Container>
      </section>

      {/* Main Policy Content */}
      <section className="py-16">
        <Container size="narrow">
          <div className="bg-white border border-[#EAE3D7] p-8 sm:p-12 space-y-8 text-sm text-[#181C20]/80 leading-relaxed font-sans">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#14342B] mb-3">
                1. Commitment to Child & Family Privacy
              </h2>
              <p>
                Swayambhoo International School (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the School&rdquo;), located in Wazirganj, Gaya, Bihar – 805131, India, is committed to safeguarding the privacy and digital security of our students, parents, guardians, and web visitors. This policy outlines how information gathered through our public website and admission enquiries is collected, processed, and protected.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-[#14342B] mb-3">
                2. Information We Collect
              </h2>
              <p className="mb-2">We collect information strictly necessary to service your educational enquiries, including:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li>Student details: Full name, current grade/class, and proposed class of admission.</li>
                <li>Parent/Guardian contact info: Full name, verified mobile phone number, WhatsApp number, and email address.</li>
                <li>General correspondence and questions submitted via our web forms.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-[#14342B] mb-3">
                3. Purpose of Processing
              </h2>
              <p>
                Collected data is used solely to respond to admission enquiries, share school prospectuses and fee structures, schedule campus visits, and facilitate academic admissions. We never sell, rent, or commercialize student or parent data to third parties or marketing brokers.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-[#14342B] mb-3">
                4. Data Security & Retention
              </h2>
              <p>
                Enquiry submissions are handled with standard cryptographic security (HTTPS/TLS) and stored in protected database systems accessible only to authorized school admissions personnel.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-[#14342B] mb-3">
                5. Contact for Privacy Inquiries
              </h2>
              <p>
                If you have questions regarding this privacy policy or wish to review or delete information submitted through our portal, please reach out to our administrative office at{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-[#14342B] font-semibold underline">
                  {siteConfig.contact.email}
                </a>{" "}
                or call {siteConfig.contact.phone}.
              </p>
            </div>

            <div className="pt-6 border-t border-[#F5EFEB] flex items-center justify-between">
              <Link href="/terms" className="text-xs font-semibold text-[#856627] hover:underline">
                View Terms & Conditions →
              </Link>
              <Button variant="secondary" size="sm" href="/contact">
                Contact Office
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
