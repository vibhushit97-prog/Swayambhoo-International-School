import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight, BookOpen, Layers } from "lucide-react";

export function AcademicOverview() {
  return (
    <section className="py-20 lg:py-28 bg-[#FDFBF7] border-b border-[#E2DBD0]">
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
              className="bg-[#FAF6EE] p-8 border border-[#EAE3D7] hover:border-[#C5A059] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#E2DBD0]">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                    Stage 0{idx + 1}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-white border border-[#E2DBD0] text-[#14342B]">
                    {stage.ageGroup}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#14342B] mb-2">
                  {stage.title}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#856627] mb-3">
                  {stage.classes}
                </p>

                <p className="text-sm text-[#181C20]/75 leading-relaxed font-sans">
                  {stage.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E2DBD0] flex items-center justify-between">
                <Link
                  href={`/academics#${stage.id}`}
                  className="text-xs font-bold uppercase tracking-wider text-[#14342B] hover:text-[#C5A059] flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <BookOpen className="w-4 h-4 text-[#C5A059]" />
              </div>
            </div>
          ))}

          {/* Special Senior Secondary Card */}
          <div className="bg-[#14342B] text-white p-8 border border-[#0E241B] flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#1E4D40]">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                  Stage 05 • +2 College Prep
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-[#0E241B] border border-[#C5A059]/40 text-[#C5A059]">
                  Grades 11 & 12
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Configurable Senior Streams
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#E8DFC8] mb-3">
                Science • Commerce • Humanities
              </p>
              <p className="text-sm text-[#E8DFC8]/85 leading-relaxed font-sans">
                Focused preparation for competitive national entrance exams, laboratory experimentation, case studies, and personalized career mentoring.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-4 border-t border-[#1E4D40]">
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
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#C5A059]/10 rounded-full blur-2xl" />
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
