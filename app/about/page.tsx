import React from "react";
import Image from "next/image";
import Link from "next/link";
import { constructMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AdmissionsCTA } from "@/components/home/AdmissionsCTA";
import { Compass, Target, HeartHandshake, Eye, Award, CheckCircle2, Building, ShieldCheck } from "lucide-react";

export const metadata = constructMetadata({
  title: "About Our Institution | Vision, Philosophy & Campus Legacy",
  description:
    "Learn about Swayambhoo International School's vision, philosophy, and architectural design in Wazirganj, Gaya, Bihar.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="bg-[#F7F3E8]">
      {/* Page Header Banner */}
      <section className="bg-[#083526] text-[#F7F3E8] py-20 lg:py-24 relative overflow-hidden border-b-2 border-[#B88A2A]">
        <div className="absolute inset-0 z-0">
          <Image
            src={siteConfig.images.campus.main}
            alt="Campus Background"
            fill
            className="object-cover opacity-85"
          />
          {/* Subtle Green Overlay (~55%) for optimal contrast and photo visibility */}
          <div className="absolute inset-0 bg-[rgba(15,71,53,0.55)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#083526]/80 via-transparent to-[#083526]/30" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4B15A] font-bold">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>About Us</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#FFFFFF]">
              Cultivating Confident, Curious & Responsible Leaders
            </h1>

            <p className="text-base sm:text-lg text-[#F7F3E8] font-sans leading-relaxed">
              Founded on the belief that every child possesses innate genius, Swayambhoo International School merges heritage values with international educational standards in Gaya, Bihar.
            </p>
          </div>
        </Container>
      </section>

      {/* Philosophical Foundations */}
      <section className="py-20 lg:py-24 border-b border-[#DEDCCF] bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                align="left"
                badge="The Swayambhoo Ethos"
                title="Self-Originated Potential & Boundless Curiosity"
                description="The ancient Sanskrit term 'Swayambhoo' refers to that which is self-manifesting and intrinsically complete."
              />

              <div className="space-y-4 text-sm sm:text-base text-[#26332E] leading-relaxed font-sans">
                <p>
                  We believe education is not the filling of a bucket, but the lighting of a flame. At Swayambhoo, our purpose is to awaken each child&apos;s inherent potential through personalized guidance, experiential learning studios, and ethical character formation.
                </p>
                <p>
                  Situated in the historic cradle of Gaya, Bihar—a region celebrated worldwide as the epicenter of spiritual enlightenment and scholarly debate—Swayambhoo stands as a temple of modern learning.
                </p>
              </div>

              <div className="p-4 bg-[#FBF9F2] border-l-4 border-[#B88A2A] rounded-r-xl space-y-1">
                <p className="font-serif font-bold text-[#083526]">The Campus Inscription</p>
                <p className="text-sm italic text-[#B88A2A] font-medium">
                  &ldquo;Discipline Today, Leadership Tomorrow&rdquo;
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-4/3 w-full border-2 border-[#B88A2A] shadow-[0_8px_30px_rgba(15,71,53,0.12)] rounded-2xl overflow-hidden group">
                <Image
                  src={siteConfig.images.campus.main}
                  alt="Swayambhoo International School Campus Entrance - Concept"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-[#D4B15A] bg-[#083526]/90 px-3 py-1.5 border border-[#B88A2A]/40 rounded-md font-bold">
                  Main Entrance & Portico • Established 2024
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-20 lg:py-24 bg-[#E7EDE2] border-b border-[#DEDCCF]">
        <Container>
          <SectionHeading
            badge="Institutional Direction"
            title="Our Vision & Mission"
            description="Clear principles guiding our faculty, leadership, and curricular architecture every day."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 sm:p-10 border border-[#DEDCCF] rounded-2xl shadow-[0_8px_30px_rgba(15,71,53,0.06)] flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-[#083526] text-[#D4B15A] border border-[#B88A2A]/30 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0F4735] mb-4">
                  Our Institutional Vision
                </h3>
                <p className="text-sm sm:text-base text-[#26332E] leading-relaxed font-sans mb-6">
                  To be recognized as a premier center of holistic K–12 schooling in eastern India, inspiring young men and women to lead lives of intellectual audacity, moral courage, and compassionate civic responsibility.
                </p>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#0F4735] pt-4 border-t border-[#DEDCCF]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B88A2A]" />
                  <span>Lifelong passion for learning and scientific enquiry</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B88A2A]" />
                  <span>Excellence rooted in timeless cultural ethics</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 sm:p-10 border border-[#DEDCCF] rounded-2xl shadow-[0_8px_30px_rgba(15,71,53,0.06)] flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-[#B88A2A] text-white rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0F4735] mb-4">
                  Our Educational Mission
                </h3>
                <p className="text-sm sm:text-base text-[#26332E] leading-relaxed font-sans mb-6">
                  To provide world-class biophilic learning environments, state-of-the-art STEM and robotics infrastructure, competitive athletics, and personalized faculty mentorship that enable every student to thrive.
                </p>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#0F4735] pt-4 border-t border-[#DEDCCF]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B88A2A]" />
                  <span>Student-centered collaborative classrooms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B88A2A]" />
                  <span>Holistic character, physical culture & arts</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Campus Blocks Showcase */}
      <section className="py-20 lg:py-24 border-b border-[#DEDCCF] bg-[#F7F3E8]">
        <Container>
          <SectionHeading
            badge="Institutional Wings"
            title="The Knowledge Block & Innovation Block"
            description="Purpose-built infrastructure dividing foundational inquiry from high-tech applied science."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-[#DEDCCF] bg-white rounded-2xl p-8 space-y-4 shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B88A2A]">
                Left Wing • West Quad
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0F4735]">
                The Knowledge Block
              </h3>
              <p className="text-sm text-[#26332E] leading-relaxed font-sans">
                Dedicated to foundational languages, humanities, mathematical thinking, and the sensory library sanctuary. Designed with acoustic wood damping, daylight courtyards, and quiet seminar rooms.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="text-xs bg-[#E7EDE2] text-[#0F4735] font-medium px-3 py-1 rounded-md border border-[#DEDCCF]">Library Sanctuary</span>
                <span className="text-xs bg-[#E7EDE2] text-[#0F4735] font-medium px-3 py-1 rounded-md border border-[#DEDCCF]">Language Labs</span>
                <span className="text-xs bg-[#E7EDE2] text-[#0F4735] font-medium px-3 py-1 rounded-md border border-[#DEDCCF]">Lecture Halls</span>
              </div>
            </div>

            <div className="border border-[#DEDCCF] bg-white rounded-2xl p-8 space-y-4 shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B88A2A]">
                Right Wing • East Quad
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0F4735]">
                The Innovation Block
              </h3>
              <p className="text-sm text-[#26332E] leading-relaxed font-sans">
                Dedicated to hands-on science and technology: advanced robotics workstations, 3D prototyping labs, computer coding terminals, and physics, chemistry, and biology research studios.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="text-xs bg-[#E7EDE2] text-[#0F4735] font-medium px-3 py-1 rounded-md border border-[#DEDCCF]">Robotics Workstations</span>
                <span className="text-xs bg-[#E7EDE2] text-[#0F4735] font-medium px-3 py-1 rounded-md border border-[#DEDCCF]">3D Prototyping</span>
                <span className="text-xs bg-[#E7EDE2] text-[#0F4735] font-medium px-3 py-1 rounded-md border border-[#DEDCCF]">Senior Labs</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Admissions Callout */}
      <AdmissionsCTA />
    </div>
  );
}
