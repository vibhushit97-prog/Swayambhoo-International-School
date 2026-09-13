import React from "react";
import { Button } from "@/components/ui/Button";
import { Atom, TrendingUp, BookOpenCheck, Check, Sparkles } from "lucide-react";
import prisma from "@/lib/prisma";

export async function SeniorSecondary() {
  let dbStreams: Array<{
    id: string;
    slug: string;
    name: string;
    description: string;
    subjects: string[];
    isOffered: boolean;
  }> = [];

  try {
    const seniorStage = await prisma.academicStage.findFirst({
      where: { slug: "senior-secondary" },
      include: { streams: { orderBy: { displayOrder: "asc" } } },
    });
    if (seniorStage && seniorStage.streams.length > 0) {
      dbStreams = seniorStage.streams;
    }
  } catch (e) {
    console.warn("Senior secondary streams fallback:", e);
  }

  const defaultStreams = [
    {
      slug: "science",
      title: "Science Stream",
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
      isOffered: dbStreams.find((s) => s.slug === "science")?.isOffered || false,
    },
    {
      slug: "commerce",
      title: "Commerce Stream",
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
      isOffered: dbStreams.find((s) => s.slug === "commerce")?.isOffered || false,
    },
    {
      slug: "humanities",
      title: "Humanities & Liberal Arts",
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
      isOffered: dbStreams.find((s) => s.slug === "humanities")?.isOffered || false,
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
          Preparing students in Grades 11 and 12 for university admissions, competitive examinations, and responsible citizenship. Streams are configured and introduced systematically by administration as part of our academic expansion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {defaultStreams.map((stream) => {
          const Icon = stream.icon;
          return (
            <div
              key={stream.title}
              className={`border p-6 sm:p-8 flex flex-col justify-between transition-all ${
                stream.isOffered
                  ? "bg-white border-[#14342B] shadow-md"
                  : "bg-[#FAF6EE] border-[#EAE3D7]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white border border-[#E2DBD0] flex items-center justify-center text-[#C5A059]">
                    <Icon className="w-6 h-6" />
                  </div>
                  {stream.isOffered ? (
                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-emerald-600" /> Officially Offered
                    </span>
                  ) : (
                    <span className="bg-stone-200 text-stone-600 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Proposed / Configurable
                    </span>
                  )}
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
                  variant={stream.isOffered ? "primary" : "secondary"}
                  size="sm"
                  href="/admissions"
                  className="w-full justify-center text-xs"
                >
                  {stream.isOffered ? "Apply for this Stream" : "Enquire for +2 Admissions"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-white border border-[#E2DBD0] text-xs text-[#64748B] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>* Senior Secondary streams are configured in accordance with progressive academic rollout.</span>
        <span className="font-semibold text-[#14342B]">Grades 11 & 12 Readiness</span>
      </div>
    </div>
  );
}
