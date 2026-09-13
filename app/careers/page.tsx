import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  HeartHandshake,
  TrendingUp,
  Award,
  Clock,
  MapPin,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Faculty Careers & Teacher Recruitment | Swayambhoo International School",
  description:
    "Join Swayambhoo International School in Wazirganj, Gaya. Explore current teaching vacancies, PGT, TGT, PRT, Pre-Primary, and administrative roles. Apply online today.",
};

async function getActivePositions() {
  try {
    return await prisma.jobPosition.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export default async function CareersPage() {
  const positions = await getActivePositions();

  return (
    <div className="bg-[#F7F3E8] text-[#26332E] overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#083526] text-[#F7F3E8] pt-24 pb-20 md:pt-32 md:pb-28 border-b-2 border-[#B88A2A]">
        <div className="absolute inset-0 bg-[radial-gradient(#B88A2A_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F4735] border border-[#B88A2A]/40 text-[#D4B15A] text-xs font-semibold tracking-widest uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Faculty Recruitment 2026–2027</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FFFFFF] tracking-tight leading-tight">
              BUILD THE FUTURE WITH SWAYAMBHOO
            </h1>

            <p className="text-base sm:text-lg text-[#F7F3E8] font-sans leading-relaxed max-w-2xl mx-auto">
              &ldquo;Join Swayambhoo International School and become part of an institution committed to academic excellence, character, discipline, creativity and holistic development.&rdquo;
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="gold"
                size="lg"
                href="#vacancies"
                className="w-full sm:w-auto font-bold tracking-wider uppercase text-xs"
              >
                View Open Positions
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="/careers/apply"
                className="w-full sm:w-auto font-bold tracking-wider uppercase text-xs border-white/30 text-white hover:bg-white/10"
              >
                Apply Now
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href="/careers/status"
                className="w-full sm:w-auto font-medium text-xs text-[#D4B15A] hover:text-white"
              >
                Check Application Status →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. WHY JOIN SWAYAMBHOO */}
      <section className="py-20 bg-[#E7EDE2] border-b border-[#C9D8C8]">
        <Container>
          <SectionHeading
            badge="INSTITUTIONAL CULTURE"
            title="Why Educators Thrive at Swayambhoo"
            description="We view teachers not just as classroom instructors, but as transformative mentors, researchers, and foundational leaders of student destiny."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              {
                icon: GraduationCap,
                title: "Academic Autonomy",
                description:
                  "Empowerment to design creative pedagogies, experiential science labs, and exploratory projects that bring curriculum alive.",
              },
              {
                icon: TrendingUp,
                title: "Continuous Mentorship",
                description:
                  "Regular pedagogy workshops, NEP 2020 skill certifications, and leadership training programs funded by the school.",
              },
              {
                icon: Sparkles,
                title: "Biophilic Smart Campus",
                description:
                  "Work in architecturally inspired classrooms equipped with smart interactive displays, STEM robotics labs, and natural light.",
              },
              {
                icon: HeartHandshake,
                title: "Supportive Leadership",
                description:
                  "A transparent, respectful administrative culture where teacher well-being, ideas, and dedication are celebrated.",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 border border-[#DEDCCF] shadow-xs hover:shadow-md transition-shadow hover:border-[#B88A2A] flex flex-col"
                >
                  <div className="w-12 h-12 bg-[#0F4735] text-[#D4B15A] flex items-center justify-center mb-5 shrink-0 shadow-xs border border-[#B88A2A]/40">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#0F4735] mb-2.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-[#26332E]/75 leading-relaxed font-sans flex-1">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. TEACHING PHILOSOPHY & FACULTY CULTURE */}
      <section className="py-20 bg-white border-b border-[#DEDCCF]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B88A2A]">
                EDUCATIONAL FOUNDATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F4735] leading-tight">
                Teaching with Purpose, Character, and Compassion
              </h2>
              <p className="text-sm text-[#26332E]/80 leading-relaxed font-sans">
                At Swayambhoo International School, education extends far beyond rote textbook memorization. Our ethos, <em>&ldquo;Discipline Today, Leadership Tomorrow,&rdquo;</em> guides how we nurture inquisitive young minds.
              </p>
              <div className="space-y-3.5 pt-2">
                {[
                  "Inquiry-based and experiential learning replacing mechanical rote learning",
                  "Equal focus on rigorous scholarship and foundational moral integrity",
                  "Inclusive classrooms where every child’s cognitive pace is respected",
                  "Biophilic campus harmony connecting students with environmental values",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#B88A2A] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#26332E] font-medium leading-relaxed font-sans">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Button variant="primary" href="/careers/apply">
                  Apply to Join Faculty
                </Button>
              </div>
            </div>

            <div className="bg-[#083526] text-white p-8 sm:p-10 border border-[#B88A2A] relative overflow-hidden shadow-xl">
              <div className="space-y-5">
                <span className="text-[11px] font-bold tracking-widest text-[#D4B15A] uppercase block">
                  Faculty Benefits & Welfare
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Competitive Compensation & Holistic Well-Being
                </h3>
                <ul className="space-y-3 text-xs text-[#F7F3E8]/85 font-sans">
                  <li className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-[#D4B15A]" />
                    <span>Competitive salary commensurate with experience & qualification</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#D4B15A]" />
                    <span>Provident Fund (EPF) and medical insurance assistance</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-[#D4B15A]" />
                    <span>Concession on tuition fees for biological children of faculty</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#D4B15A]" />
                    <span>Annual performance awards and academic recognition bonuses</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#D4B15A]" />
                    <span>Subsidized school transport across Gaya and adjoining sectors</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. CURRENT VACANCIES (DYNAMIC DATABASE BACKED) */}
      <section id="vacancies" className="py-20 bg-[#F7F3E8] border-b border-[#DEDCCF]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B88A2A]">
                OPPORTUNITIES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F4735] mt-1">
                Current Teaching & Staff Vacancies
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/careers/positions"
                className="text-xs font-bold text-[#0F4735] hover:text-[#B88A2A] transition-colors flex items-center gap-1.5"
              >
                <span>View Full Vacancy Board</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {positions.length === 0 ? (
            <div className="text-center py-16 bg-white border border-[#DEDCCF]">
              <Briefcase className="w-12 h-12 text-[#26332E]/60 mx-auto mb-3" />
              <h3 className="font-serif font-bold text-lg text-[#0F4735]">
                No Vacancies Currently Listed
              </h3>
              <p className="text-xs text-[#26332E] mt-1 max-w-md mx-auto">
                We are always eager to meet outstanding educators. You can still submit an open general application.
              </p>
              <div className="mt-6">
                <Button variant="gold" href="/careers/apply">
                  Submit Open Application
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {positions.map((pos) => (
                <div
                  key={pos.id}
                  className="bg-white border border-[#DEDCCF] p-6 flex flex-col justify-between hover:border-[#B88A2A] transition-all hover:shadow-md group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#E7EDE2] text-[#0F4735] border border-[#C9D8C8]">
                        {pos.department}
                      </span>
                      <span className="text-[11px] font-bold text-[#B88A2A]">
                        {pos.vacancies} {pos.vacancies === 1 ? "Post" : "Posts"}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#0F4735] group-hover:text-[#B88A2A] transition-colors">
                      {pos.title}
                    </h3>

                    <p className="text-xs text-[#26332E]/75 line-clamp-2 leading-relaxed">
                      {pos.description || "Join our academic team to deliver distinction in subject teaching."}
                    </p>

                    <div className="pt-2 border-t border-[#DEDCCF] space-y-1.5 text-[11px] text-[#26332E]/80">
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-[#B88A2A] shrink-0" />
                        <span className="truncate">{pos.minQualification}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#B88A2A] shrink-0" />
                        <span>Min Experience: {pos.minExperience} Year{pos.minExperience !== 1 ? "s" : ""}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B88A2A] shrink-0" />
                        <span>Campus: Wazirganj, Gaya</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#DEDCCF] flex items-center justify-between gap-3">
                    <span className="text-[10px] text-[#26332E]/70 font-mono">
                      {pos.code || "SWIS"}
                    </span>
                    <Link
                      href={`/careers/apply/${pos.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0F4735] hover:text-[#B88A2A] transition-colors"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center bg-white border border-[#DEDCCF] p-8 max-w-2xl mx-auto shadow-xs">
            <h3 className="font-serif font-bold text-lg text-[#0F4735]">
              Looking for a Specialization Not Listed Above?
            </h3>
            <p className="text-xs text-[#26332E] mt-1.5 leading-relaxed font-sans">
              We welcome applications across all primary, secondary, and administrative domains. Choose &quot;Other Position&quot; in the application form to specify your subject expertise.
            </p>
            <div className="mt-5">
              <Button variant="gold" size="sm" href="/careers/apply">
                Apply with Custom Position
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. RECRUITMENT PROCESS */}
      <section className="py-20 bg-white border-b border-[#DEDCCF]">
        <Container>
          <SectionHeading
            badge="TRANSPARENT PIPELINE"
            title="Our Faculty Recruitment Process"
            description="We respect your time and credentials. Here is what you can expect after submitting your application."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-14">
            {[
              {
                step: "01",
                title: "Application",
                desc: "Complete the online application form, enter custom skills, and attach CV.",
              },
              {
                step: "02",
                title: "Screening",
                desc: "Academic committee evaluates academic credentials and curriculum alignment.",
              },
              {
                step: "03",
                title: "Interview",
                desc: "Shortlisted candidates receive Gmail invitation to confirm interview round.",
              },
              {
                step: "04",
                title: "Demonstration",
                desc: "Classroom teaching demo or technical interaction with department heads.",
              },
              {
                step: "05",
                title: "Appointment",
                desc: "Leadership conference, formal appointment letter, and campus onboarding.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F7F3E8] p-6 border border-[#DEDCCF] relative flex flex-col"
              >
                <div className="text-2xl font-serif font-bold text-[#B88A2A] mb-3">
                  {item.step}
                </div>
                <h4 className="font-serif font-bold text-sm text-[#0F4735] mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-[#26332E]/75 leading-relaxed font-sans flex-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. FAQ */}
      <section className="py-20 bg-[#E7EDE2] border-b border-[#C9D8C8]">
        <Container>
          <SectionHeading
            badge="HELP & CLARIFICATIONS"
            title="Frequently Asked Questions"
            description="Clear answers regarding our recruitment process, eligibility, and working culture."
            align="center"
          />

          <div className="max-w-3xl mx-auto mt-12 space-y-4">
            {[
              {
                q: "What qualifications are mandatory for teaching posts?",
                a: "For PGT roles, a Master's degree in the subject with B.Ed is required. For TGT/PRT roles, a Bachelor's or Master's degree with B.Ed / D.El.Ed is required. CTET or STET qualification is given special weightage.",
              },
              {
                q: "Can freshers apply for teaching positions?",
                a: "Yes. Enthusiastic graduates with strong subject knowledge, fluency in English, and genuine passion for child-centric pedagogy are encouraged to apply as PRT or Trainee Faculty.",
              },
              {
                q: "How will I know if my application is shortlisted?",
                a: "Immediately upon applying, you receive an automated confirmation email with your unique Application ID. Shortlisted candidates receive an official interview invitation with scheduled date, time, and venue/link.",
              },
              {
                q: "Can I track my application status online?",
                a: "Yes! Visit our Application Status Portal (/careers/status), enter your Application ID (e.g. SWIS-2026-000001) and registered email to view real-time pipeline status.",
              },
              {
                q: "Are outstation candidates supported with online interviews?",
                a: "Yes. Initial interview rounds for candidates residing outside Gaya / Bihar can be conducted via Google Meet or Zoom upon request.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white p-6 border border-[#DEDCCF] shadow-xs hover:border-[#B88A2A] transition-colors"
              >
                <h4 className="font-serif font-bold text-base text-[#0F4735] flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-[#B88A2A] shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-[#26332E]/75 leading-relaxed mt-2 pl-7 font-sans">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="py-20 bg-[#083526] text-white text-center relative border-t-2 border-[#B88A2A]">
        <Container>
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#D4B15A]">
              BECOME A MENTOR OF TOMORROW
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Ready to Shape the Future with Swayambhoo?
            </h2>
            <p className="text-xs sm:text-sm text-[#F7F3E8]/85 leading-relaxed">
              Step into an empowering environment that respects your academic craft and provides a vibrant platform for your personal and professional growth.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Button variant="gold" size="lg" href="/careers/apply" className="font-bold uppercase tracking-wider text-xs">
                Start Teacher Application
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="/careers/status"
                className="border-white/40 text-white hover:bg-white/10 text-xs uppercase tracking-wider font-bold"
              >
                Track Existing Application
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
