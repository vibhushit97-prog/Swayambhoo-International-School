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
    <div className="bg-[#FDFBF7]">
      {/* Hero Header */}
      <section className="bg-[#081611] text-[#FDFBF7] py-20 lg:py-24 relative overflow-hidden border-b-2 border-[#C5A059]">
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059]">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Student Life</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white">
              Character, Community & Uniform Identity
            </h1>

            <p className="text-base sm:text-lg text-[#E8DFC8]/90 font-sans leading-relaxed">
              Student life at Swayambhoo is a rich tapestry of sportsmanship, performing arts, leadership appointments, and shared institutional pride.
            </p>
          </div>
        </Container>
      </section>

      {/* Official Uniform Showcase */}
      <section className="py-20 border-b border-[#E2DBD0]">
        <Container>
          <SectionHeading
            badge="Institutional Attire"
            title="Official School Uniform Standards"
            description="Our attire reflects elegance, dignity, and neatness. Tailored from high-grade breathable cotton with a dignified color palette of pure white, chocolate brown, and golden trim."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            {/* Boys Uniform Showcase */}
            <div className="bg-white border border-[#EAE3D7] p-6 sm:p-8 shadow-sm">
              <div className="relative aspect-4/3 w-full bg-[#FAF6EE] border border-[#E2DBD0] overflow-hidden mb-6">
                <Image
                  src={siteConfig.images.uniforms.boys}
                  alt="Swayambhoo Official Boys Uniform Specification"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#F5EFEB]">
                  <h3 className="font-serif text-xl font-bold text-[#14342B]">
                    Boys Formal & Daily Uniform
                  </h3>
                  <span className="text-[11px] font-semibold text-[#856627] bg-[#FAF6EE] px-2.5 py-1 border border-[#C5A059]/40">
                    High Quality Cotton
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-[#181C20]/80">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                    <span><strong>Shirt:</strong> Crisp white cotton with brown and gold dual-stripe collar and cuff tipping.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                    <span><strong>Branding:</strong> Vertical gold lettering &lsquo;SWAYAMBHOO&rsquo; along the shirt placket for distinctive identity.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                    <span><strong>Pocket Emblem:</strong> Embroidered sacred flame crest with vertical brown & gold accent stripe.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                    <span><strong>Trousers:</strong> Tailored chocolate brown formal trousers with clean pleating.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Girls Uniform Showcase */}
            <div className="bg-white border border-[#EAE3D7] p-6 sm:p-8 shadow-sm">
              <div className="relative aspect-4/3 w-full bg-[#FAF6EE] border border-[#E2DBD0] overflow-hidden mb-6">
                <Image
                  src={siteConfig.images.uniforms.girls}
                  alt="Swayambhoo Official Girls Uniform Specification - Skirt and Kurta"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#F5EFEB]">
                  <h3 className="font-serif text-xl font-bold text-[#14342B]">
                    Girls Skirt & Kurta Uniforms
                  </h3>
                  <span className="text-[11px] font-semibold text-[#856627] bg-[#FAF6EE] px-2.5 py-1 border border-[#C5A059]/40">
                    High Quality Cotton
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-[#181C20]/80">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                    <span><strong>Skirt Uniform:</strong> White tailored shirt with brown pleated skirt bordered with gold trim.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                    <span><strong>Kurta Uniform:</strong> Contemporary mandarin-collar white kurta with gold vertical typography and brown salwar.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                    <span><strong>Pocket Emblem:</strong> Finely stitched golden flame monogram on chest pocket.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                    <span><strong>Material:</strong> 100% breathable natural cotton suited to Bihar&apos;s climate throughout the seasons.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Color Palette Indicators */}
          <div className="p-6 bg-white border border-[#E2DBD0] flex flex-wrap items-center justify-around gap-6 text-center">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white border-2 border-[#E2DBD0] shadow-xs" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#14342B]">Crisp White (Purity & Clarity)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#4A2E1B] border-2 border-[#362113] shadow-xs" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#14342B]">Chocolate Brown (Grounded Discipline)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#C5A059] border-2 border-[#9C7A33] shadow-xs" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#14342B]">Muted Gold (Excellence & Nobility)</span>
            </div>
          </div>
        </Container>
      </section>

      {/* House System */}
      <section className="py-20 bg-[#FAF6EE] border-b border-[#E2DBD0]">
        <Container>
          <SectionHeading
            badge="Healthy Fellowship"
            title="The Four House System"
            description="Students across all grades are inducted into one of four houses, fostering healthy competition, leadership roles, and lifelong friendships."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 border border-[#EAE3D7] border-t-4 border-t-[#14342B]">
              <h3 className="font-serif font-bold text-lg text-[#14342B] mb-2">Prithvi (Earth)</h3>
              <p className="text-xs text-[#856627] font-semibold uppercase tracking-wider mb-2">Discipline & Resilience</p>
              <p className="text-xs text-[#181C20]/75 leading-relaxed font-sans">
                Embodying stability, ethical groundedness, environmental stewardship, and persistence in physical and academic endeavors.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#EAE3D7] border-t-4 border-t-[#C5A059]">
              <h3 className="font-serif font-bold text-lg text-[#14342B] mb-2">Agni (Fire)</h3>
              <p className="text-xs text-[#856627] font-semibold uppercase tracking-wider mb-2">Passion & Courage</p>
              <p className="text-xs text-[#181C20]/75 leading-relaxed font-sans">
                Representing the intellectual spark, boldness in public debate, innovative research, and unstoppable athletic zeal.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#EAE3D7] border-t-4 border-t-[#255D4E]">
              <h3 className="font-serif font-bold text-lg text-[#14342B] mb-2">Jal (Water)</h3>
              <p className="text-xs text-[#856627] font-semibold uppercase tracking-wider mb-2">Adaptability & Empathy</p>
              <p className="text-xs text-[#181C20]/75 leading-relaxed font-sans">
                Fostering fluid problem solving, emotional maturity, fine arts excellence, and community service initiatives.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#EAE3D7] border-t-4 border-t-[#4A2E1B]">
              <h3 className="font-serif font-bold text-lg text-[#14342B] mb-2">Vayu (Air)</h3>
              <p className="text-xs text-[#856627] font-semibold uppercase tracking-wider mb-2">Freedom & Vision</p>
              <p className="text-xs text-[#181C20]/75 leading-relaxed font-sans">
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
