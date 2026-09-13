import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SchoolStage } from "@/components/academics/SchoolStage";
import { SeniorSecondary } from "@/components/academics/SeniorSecondary";
import { AdmissionsCTA } from "@/components/home/AdmissionsCTA";
import { BookOpen, Sparkles, BrainCircuit, GraduationCap, ShieldCheck } from "lucide-react";

export const metadata = constructMetadata({
  title: "Academics & Curriculum | K–12 & +2 Education Stages",
  description:
    "Explore Swayambhoo International School's progressive K–12 academic stages from Early Years to Senior Secondary +2 specializations.",
  path: "/academics",
});

export default function AcademicsPage() {
  return (
    <div className="bg-[#F7F3E8]">
      {/* Hero Header */}
      <section className="bg-[#083526] text-[#F7F3E8] py-20 lg:py-24 relative overflow-hidden border-b-2 border-[#B88A2A]">
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4B15A] font-bold">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Academics</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#FFFFFF]">
              Academic Framework & Curricular Excellence
            </h1>

            <p className="text-base sm:text-lg text-[#F7F3E8] font-sans leading-relaxed">
              A comprehensive developmental pathway from early childhood wonder to rigorous +2 scholarship, engineered to foster intellectual independence and critical thought.
            </p>
          </div>
        </Container>
      </section>

      {/* Pedagogical Principles */}
      <section className="py-16 border-b border-[#DEDCCF] bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#FBF9F2] border border-[#DEDCCF] rounded-xl shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
              <BrainCircuit className="w-7 h-7 text-[#B88A2A] mb-3" />
              <h3 className="font-serif font-bold text-base text-[#0F4735] mb-1">Inquiry-Based Learning</h3>
              <p className="text-xs text-[#26332E] leading-relaxed">Questions lead the classroom; students learn by observing, formulating hypotheses, and testing ideas.</p>
            </div>

            <div className="p-6 bg-[#FBF9F2] border border-[#DEDCCF] rounded-xl shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
              <Sparkles className="w-7 h-7 text-[#B88A2A] mb-3" />
              <h3 className="font-serif font-bold text-base text-[#0F4735] mb-1">Experiential STEM</h3>
              <p className="text-xs text-[#26332E] leading-relaxed">Coding, robotics, and hands-on laboratory modules integrated seamlessly from primary grades upward.</p>
            </div>

            <div className="p-6 bg-[#FBF9F2] border border-[#DEDCCF] rounded-xl shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
              <BookOpen className="w-7 h-7 text-[#B88A2A] mb-3" />
              <h3 className="font-serif font-bold text-base text-[#0F4735] mb-1">Bilingual Mastery</h3>
              <p className="text-xs text-[#26332E] leading-relaxed">Fluency and articulate expression in English alongside deep appreciation for Hindi and Indian literature.</p>
            </div>

            <div className="p-6 bg-[#FBF9F2] border border-[#DEDCCF] rounded-xl shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
              <GraduationCap className="w-7 h-7 text-[#B88A2A] mb-3" />
              <h3 className="font-serif font-bold text-base text-[#0F4735] mb-1">Individual Mentorship</h3>
              <p className="text-xs text-[#26332E] leading-relaxed">Low student-teacher ratios ensuring every learner receives personalized academic tracking and support.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Stages */}
      <section className="py-20 lg:py-24 border-b border-[#DEDCCF] bg-[#F7F3E8]">
        <Container>
          <SectionHeading
            badge="Developmental Architecture"
            title="School Stages (Nursery to Grade 10)"
            description="Our academic progression honors the cognitive, emotional, and physical milestones of every age group."
          />

          <SchoolStage stages={siteConfig.academicStages.slice(0, 4)} />

          {/* Senior Secondary Section */}
          <SeniorSecondary />
        </Container>
      </section>

      {/* Curriculum Disclosure */}
      <section className="py-8 bg-[#E7EDE2] border-b border-[#DEDCCF]">
        <Container>
          <div className="flex items-center gap-3 p-4 bg-white border border-[#DEDCCF] rounded-xl shadow-[0_2px_10px_rgba(15,71,53,0.03)]">
            <ShieldCheck className="w-5 h-5 text-[#B88A2A] shrink-0" />
            <p className="text-xs text-[#26332E] font-sans leading-relaxed">
              <strong className="text-[#0F4735]">Academic Regulatory Notice:</strong> Swayambhoo International School aligns its foundational curriculum with the National Education Policy (NEP) guidelines and progressive pedagogical benchmarks. Institutional affiliations and examination board registrations are processed progressively in accordance with formal state and national directives.
            </p>
          </div>
        </Container>
      </section>

      <AdmissionsCTA />
    </div>
  );
}
