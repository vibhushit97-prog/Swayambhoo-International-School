import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight, BookOpen } from "lucide-react";

export function AcademicOverview() {
  return (
    <section className="py-20 lg:py-28 bg-[#E7EDE2] border-b border-[#C9D8C8]">
      <Container>
        <SectionHeading
          badge="Curricular Pathways"
          title="Progressive K–12 / +2 Academic Stages"
          description="Designed to support developmentally appropriate learning from early play-based exploration to advanced secondary scholarship."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.academicStages.map((stage, idx) => (
            <div
              key={stage.id}
              className="bg-[#FFFFFF] p-8 border border-[#DEDCCF] hover:border-[#B88A2A] transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#DEDCCF]">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#B88A2A]">
                    Stage 0{idx + 1}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#E7EDE2] border border-[#C9D8C8] text-[#0F4735]">
                    {stage.ageGroup}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#0F4735] mb-2">
                  {stage.title}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#B88A2A] mb-3">
                  {stage.classes}
                </p>

                <p className="text-sm text-[#26332E] leading-relaxed font-sans">
                  {stage.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#DEDCCF] flex items-center justify-between">
                <Link
                  href={`/academics#${stage.id}`}
                  className="text-xs font-bold uppercase tracking-wider text-[#0F4735] hover:text-[#B88A2A] flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B88A2A]" />
                </Link>
                <div className="w-7 h-7 rounded-full bg-[#EFE2BC] flex items-center justify-center">
                  <BookOpen className="w-3.5 h-3.5 text-[#0F4735]" />
                </div>
              </div>
            </div>
          ))}

          {/* Special Senior Secondary Card */}
          <div className="bg-[#083526] text-[#F7F3E8] p-8 border border-[#0F4735] flex flex-col justify-between relative overflow-hidden shadow-md">
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#0F4735]">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4B15A]">
                  Stage 05 • +2 College Prep
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-[#0F4735] border border-[#B88A2A]/40 text-[#D4B15A]">
                  Grades 11 & 12
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Configurable Senior Streams
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D4B15A] mb-3">
                Science • Commerce • Humanities
              </p>
              <p className="text-sm text-[#F7F3E8] leading-relaxed font-sans">
                Focused preparation for competitive national entrance exams, laboratory experimentation, case studies, and personalized career mentoring.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-4 border-t border-[#0F4735]">
              <Button
                variant="gold"
                size="sm"
                href="/academics#senior-secondary"
                className="w-full text-xs font-bold"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                View +2 Specializations
              </Button>
            </div>

            {/* Subtle background glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#B88A2A]/10 rounded-full blur-2xl" />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="primary"
            href="/academics"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Complete Academic Framework
          </Button>
        </div>
      </Container>
    </section>
  );
}
