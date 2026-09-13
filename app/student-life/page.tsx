import React from "react";
import Image from "next/image";
import Link from "next/link";
import { constructMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AdmissionsCTA } from "@/components/home/AdmissionsCTA";
import { Users, Palette, Trophy, Sparkles, Shirt, ShieldCheck, Heart } from "lucide-react";

export const metadata = constructMetadata({
  title: "Student Life & Uniform Identity | Swayambhoo International School",
  description:
    "Explore student life, co-curricular arts, sports leagues, house systems, and official school uniform standards at Swayambhoo International School.",
  path: "/student-life",
});

export default function StudentLifePage() {
  return (
    <div className="bg-[#F7F3E8]">
      {/* Hero Header */}
      <section className="bg-[#083526] text-[#F7F3E8] py-20 lg:py-24 relative overflow-hidden border-b-2 border-[#B88A2A]">
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4B15A] font-bold">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Student Life</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#FFFFFF]">
              Character, Community & Uniform Identity
            </h1>

            <p className="text-base sm:text-lg text-[#F7F3E8] font-sans leading-relaxed">
              Student life at Swayambhoo is a rich tapestry of sportsmanship, performing arts, leadership appointments, and shared institutional pride.
            </p>
          </div>
        </Container>
      </section>

      {/* Official Uniform Showcase */}
      <section className="py-20 border-b border-[#DEDCCF] bg-white">
        <Container>
          <SectionHeading
            badge="Institutional Attire"
            title="Official School Uniform Standards"
            description="Our attire reflects elegance, dignity, and neatness. Tailored from high-grade breathable cotton with a dignified color palette of pure white, chocolate brown, and golden trim."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            {/* Boys Uniform Showcase */}
            <div className="bg-[#FBF9F2] border border-[#DEDCCF] rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
              <div className="relative aspect-4/3 w-full bg-white border border-[#DEDCCF] rounded-xl overflow-hidden mb-6">
                <Image
                  src={siteConfig.images.uniforms.boys}
                  alt="Swayambhoo Official Boys Uniform Specification"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#DEDCCF]">
                  <h3 className="font-serif text-xl font-bold text-[#0F4735]">
                    Boys Formal & Daily Uniform
                  </h3>
                  <span className="text-[11px] font-bold text-[#B88A2A] bg-[#EFE2BC]/50 px-2.5 py-1 border border-[#D4B15A] rounded-md">
                    High Quality Cotton
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-[#26332E]">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B88A2A] mt-2 shrink-0" />
                    <span><strong>Shirt:</strong> Crisp white cotton with brown and gold dual-stripe collar and cuff tipping.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B88A2A] mt-2 shrink-0" />
                    <span><strong>Branding:</strong> Vertical gold lettering &lsquo;SWAYAMBHOO&rsquo; along the shirt placket for distinctive identity.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B88A2A] mt-2 shrink-0" />
                    <span><strong>Pocket Emblem:</strong> Embroidered sacred flame crest with vertical brown & gold accent stripe.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B88A2A] mt-2 shrink-0" />
                    <span><strong>Trousers:</strong> Tailored chocolate brown formal trousers with clean pleating.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Girls Uniform Showcase */}
            <div className="bg-[#FBF9F2] border border-[#DEDCCF] rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
              <div className="relative aspect-4/3 w-full bg-white border border-[#DEDCCF] rounded-xl overflow-hidden mb-6">
                <Image
                  src={siteConfig.images.uniforms.girls}
                  alt="Swayambhoo Official Girls Uniform Specification - Skirt and Kurta"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#DEDCCF]">
                  <h3 className="font-serif text-xl font-bold text-[#0F4735]">
                    Girls Skirt & Kurta Uniforms
                  </h3>
                  <span className="text-[11px] font-bold text-[#B88A2A] bg-[#EFE2BC]/50 px-2.5 py-1 border border-[#D4B15A] rounded-md">
                    High Quality Cotton
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-[#26332E]">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B88A2A] mt-2 shrink-0" />
                    <span><strong>Skirt Uniform:</strong> White tailored shirt with brown pleated skirt bordered with gold trim.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B88A2A] mt-2 shrink-0" />
                    <span><strong>Kurta Uniform:</strong> Contemporary mandarin-collar white kurta with gold vertical typography and brown salwar.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B88A2A] mt-2 shrink-0" />
                    <span><strong>Pocket Emblem:</strong> Finely stitched golden flame monogram on chest pocket.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B88A2A] mt-2 shrink-0" />
                    <span><strong>Material:</strong> 100% breathable natural cotton suited to Bihar&apos;s climate throughout the seasons.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Color Palette Indicators */}
          <div className="p-6 bg-[#FBF9F2] border border-[#DEDCCF] rounded-2xl flex flex-wrap items-center justify-around gap-6 text-center shadow-[0_4px_20px_rgba(15,71,53,0.03)]">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white border-2 border-[#DEDCCF] shadow-xs" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F4735]">Crisp White (Purity & Clarity)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#4A2E1B] border-2 border-[#362113] shadow-xs" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F4735]">Chocolate Brown (Grounded Discipline)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#B88A2A] border-2 border-[#9C7A33] shadow-xs" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F4735]">Muted Gold (Excellence & Nobility)</span>
            </div>
          </div>
        </Container>
      </section>

      {/* House System */}
      <section className="py-20 bg-[#E7EDE2] border-b border-[#DEDCCF]">
        <Container>
          <SectionHeading
            badge="Healthy Fellowship"
            title="The Four House System"
            description="Students across all grades are inducted into one of four houses, fostering healthy competition, leadership roles, and lifelong friendships."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 border border-[#DEDCCF] rounded-2xl border-t-4 border-t-[#083526] shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
              <h3 className="font-serif font-bold text-lg text-[#0F4735] mb-1">Prithvi (Earth)</h3>
              <p className="text-xs text-[#B88A2A] font-bold uppercase tracking-wider mb-2">Discipline & Resilience</p>
              <p className="text-xs text-[#26332E] leading-relaxed font-sans">
                Embodying stability, ethical groundedness, environmental stewardship, and persistence in physical and academic endeavors.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#DEDCCF] rounded-2xl border-t-4 border-t-[#B88A2A] shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
              <h3 className="font-serif font-bold text-lg text-[#0F4735] mb-1">Agni (Fire)</h3>
              <p className="text-xs text-[#B88A2A] font-bold uppercase tracking-wider mb-2">Passion & Courage</p>
              <p className="text-xs text-[#26332E] leading-relaxed font-sans">
                Representing the intellectual spark, boldness in public debate, innovative research, and unstoppable athletic zeal.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#DEDCCF] rounded-2xl border-t-4 border-t-[#2D654E] shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
              <h3 className="font-serif font-bold text-lg text-[#0F4735] mb-1">Jal (Water)</h3>
              <p className="text-xs text-[#B88A2A] font-bold uppercase tracking-wider mb-2">Adaptability & Empathy</p>
              <p className="text-xs text-[#26332E] leading-relaxed font-sans">
                Fostering fluid problem solving, emotional maturity, fine arts excellence, and community service initiatives.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#DEDCCF] rounded-2xl border-t-4 border-t-[#4A2E1B] shadow-[0_4px_20px_rgba(15,71,53,0.04)]">
              <h3 className="font-serif font-bold text-lg text-[#0F4735] mb-1">Vayu (Air)</h3>
              <p className="text-xs text-[#B88A2A] font-bold uppercase tracking-wider mb-2">Freedom & Vision</p>
              <p className="text-xs text-[#26332E] leading-relaxed font-sans">
                Symbolizing boundless imagination, scientific curiosity, strategic agility on the playing field, and visionary leadership.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <AdmissionsCTA />
    </div>
  );
}
