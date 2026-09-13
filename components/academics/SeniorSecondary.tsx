import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Atom, TrendingUp, BookOpenCheck, ArrowRight, Check } from "lucide-react";

export function SeniorSecondary() {
  const streams = [
    {
      title: "Science Stream (Proposed)",
      tagline: "Engineering, Medicine, Pure Sciences & Applied AI",
      icon: Atom,
      subjects: [
        "Physics & Chemistry",
        "Mathematics / Biology",
        "Computer Science / Python",
        "English Core & Environmental Science",
      ],
      description:
        "Rigorous laboratory inquiry, numerical problem solving, and targeted coaching assistance for competitive science entrance preparations.",
    },
    {
      title: "Commerce Stream (Proposed)",
      tagline: "Finance, Entrepreneurship & Global Trade",
      icon: TrendingUp,
      subjects: [
        "Accountancy & Financial Analysis",
        "Business Studies & Management",
        "Micro & Macro Economics",
        "Applied Mathematics / Informatics",
      ],
      description:
        "Case study-based learning, business simulations, foundational financial literacy, and data analysis skills.",
    },
    {
      title: "Humanities Stream (Proposed)",
      tagline: "Social Sciences, Public Policy & Creative Expression",
      icon: BookOpenCheck,
      subjects: [
        "History & Civilization Studies",
        "Political Science & Governance",
        "Economics / Psychology",
        "English Elective & Literary Studies",
      ],
      description:
        "Deep analytical writing, critical research methods, civic awareness, and preparation for law and administrative public services.",
    },
  ];

  return (
    <div id="senior-secondary" className="mt-16 pt-12 border-t-2 border-[#C5A059]">
      <div className="max-w-3xl mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] block mb-2">
          Stage 05 • Senior Secondary / +2
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14342B] mb-3">
          Senior Secondary Specializations
        </h2>
        <p className="text-sm sm:text-base text-[#181C20]/80 leading-relaxed font-sans">
          Preparing students in Grades 11 and 12 for university admissions, competitive examinations, and responsible citizenship. Streams are configured and introduced systematically as part of our phased school expansion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {streams.map((stream) => {
          const Icon = stream.icon;
          return (
            <div
              key={stream.title}
              className="bg-[#FAF6EE] border border-[#EAE3D7] hover:border-[#C5A059] p-6 sm:p-8 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="w-12 h-12 bg-white border border-[#E2DBD0] flex items-center justify-center text-[#C5A059] mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#14342B] mb-1">
                  {stream.title}
                </h3>
                <p className="text-xs font-semibold text-[#856627] uppercase tracking-wider mb-4">
                  {stream.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[#181C20]/75 leading-relaxed font-sans mb-6">
                  {stream.description}
                </p>

                <div className="space-y-2 mb-6 pt-4 border-t border-[#E2DBD0]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#14342B]">
                    Subject Combinations:
                  </p>
                  {stream.subjects.map((sub) => (
                    <div key={sub} className="flex items-center gap-2 text-xs text-[#181C20]/80">
                      <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2DBD0]">
                <Button
                  variant="primary"
                  size="sm"
                  href="/admissions"
                  className="w-full justify-center text-xs"
                >
                  Enquire for +2 Admissions
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-white border border-[#E2DBD0] text-xs text-[#64748B] flex items-center justify-between">
        <span>* Senior Secondary streams are configured in accordance with progressive academic rollout.</span>
        <span className="font-semibold text-[#14342B]">Grades 11 & 12 Readiness</span>
      </div>
    </div>
  );
}
