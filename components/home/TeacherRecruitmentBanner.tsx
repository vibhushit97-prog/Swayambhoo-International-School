import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  GraduationCap,
  Briefcase,
  Sparkles,
  ArrowRight,
  Award,
  BookOpen,
  Laptop,
  CheckCircle2,
  Users,
} from "lucide-react";

export function TeacherRecruitmentBanner() {
  const perks = [
    {
      icon: Award,
      title: "Competitive Compensation",
      description: "Attractive pay scale with provident fund, medical coverage, and performance-based increments.",
    },
    {
      icon: Laptop,
      title: "Smart Infrastructure",
      description: "Interactive smart boards, advanced STEM & robotics laboratories, and digital teaching aids.",
    },
    {
      icon: BookOpen,
      title: "Academic Growth",
      description: "Continuous national CBSE pedagogical training, workshops, and professional development.",
    },
    {
      icon: Users,
      title: "Scholarly Environment",
      description: "Collaborative, dignified, and supportive leadership that values teacher autonomy and excellence.",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#083526] via-[#0F4735] to-[#083526] text-[#F7F3E8] overflow-hidden border-y-2 border-[#B88A2A]/40">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#B88A2A_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#B88A2A]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#083526]/60 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#083526] border border-[#B88A2A]/50 text-[#D4B15A] text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4B15A]" />
              <span>TEACHER RECRUITMENT 2026–2027</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FFFFFF] tracking-tight">
              Shape The Future As A Swayambhoo Educator
            </h2>

            <p className="text-base sm:text-lg text-[#F7F3E8] max-w-2xl mx-auto leading-relaxed">
              We are inviting passionate, qualified educators across PGT, TGT, PRT, Pre-Primary, and Specialist disciplines to join our world-class faculty in Wazirganj, Gaya.
            </p>
          </div>

          {/* Perks Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, idx) => (
              <div
                key={idx}
                className="bg-[#083526]/80 backdrop-blur-sm border border-white/15 p-5 rounded-none hover:border-[#B88A2A]/60 transition-all group"
              >
                <div className="w-10 h-10 rounded-none bg-[#0F4735] border border-[#B88A2A]/40 flex items-center justify-center mb-3 group-hover:bg-[#B88A2A] transition-colors">
                  <perk.icon className="w-5 h-5 text-[#D4B15A] group-hover:text-[#083526] transition-colors" />
                </div>
                <h3 className="text-sm font-serif font-bold text-[#FFFFFF] mb-1.5">{perk.title}</h3>
                <p className="text-xs text-[#F7F3E8]/80 leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>

          {/* Dedicated Recruitment CTA Box */}
          <div className="mt-12 p-8 bg-[#083526] border-2 border-[#B88A2A] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#D4B15A] text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#D4B15A]" />
                <span>Online Applications Are Actively Open</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FFFFFF]">
                Ready to take your teaching career to the next level?
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F3E8]/85 max-w-xl">
                Complete our step-by-step application in 5 minutes. Upload your CV, showcase your academic subject mastery, and track your interview status live.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <Button
                variant="gold"
                size="lg"
                href="/careers/apply"
                leftIcon={<GraduationCap className="w-5 h-5" />}
                className="w-full sm:w-auto font-bold text-xs tracking-wider uppercase shadow-xl hover:scale-105 transition-all"
              >
                Apply as Teacher
              </Button>

              <Button
                variant="outline"
                size="lg"
                href="/careers/positions"
                leftIcon={<Briefcase className="w-4 h-4" />}
                className="w-full sm:w-auto font-bold text-xs tracking-wider uppercase border-white/40 text-white hover:bg-white/10"
              >
                View Vacancies
              </Button>
            </div>
          </div>

          {/* Quick Tracking Link */}
          <div className="mt-6 text-center text-xs text-[#F7F3E8]/75">
            Already submitted an application?{" "}
            <Link
              href="/careers/status"
              className="text-[#D4B15A] hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>Track Application Status</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
