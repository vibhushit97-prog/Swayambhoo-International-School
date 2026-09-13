import React from "react";
import prisma from "@/lib/prisma";
import { siteConfig } from "@/config/site";
import { SeniorSecondaryInteractive } from "./SeniorSecondaryInteractive";

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

  const streams = [
    {
      slug: "science",
      title: "Science Stream",
      tagline: "Engineering, Medicine, Pure Sciences & Applied AI",
      iconName: "Atom",
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
      iconName: "TrendingUp",
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
      iconName: "BookOpenCheck",
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

  const seniorStageConfig = siteConfig.academicStages[4];

  return (
    <div id="senior-secondary" className="mt-16 pt-12 border-t-2 border-[#B88A2A]">
      <div className="max-w-3xl mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#B88A2A] block mb-2">
          Stage 05 • Senior Secondary / +2
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F4735] mb-3">
          Senior Secondary Specializations
        </h2>
        <p className="text-sm sm:text-base text-[#26332E]/80 leading-relaxed font-sans">
          Preparing students in Grades 11 and 12 for university admissions, competitive examinations, and responsible citizenship. Streams are configured and introduced systematically by administration as part of our academic expansion.
        </p>
      </div>

      <SeniorSecondaryInteractive seniorStage={seniorStageConfig} streams={streams} />
    </div>
  );
}
