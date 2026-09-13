import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { AdmissionsCTA } from "@/components/home/AdmissionsCTA";
import { GalleryItem } from "@/types/gallery";
import { ShieldCheck } from "lucide-react";

export const metadata = constructMetadata({
  title: "Campus Gallery & Architectural Visualizations",
  description:
    "Explore the architectural gallery of Swayambhoo International School including neoclassical colonnades, smart classrooms, robotics labs, and sports arenas.",
  path: "/gallery",
});

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "campus-facade",
    title: "Neoclassical Main Campus Facade & Entrance Gate",
    category: "architecture",
    categoryLabel: "Campus & Architecture",
    description:
      "Neoclassical institutional facade featuring central pediment portico, Knowledge Block and Innovation Block, circular arrival plaza, and Estd. 2024 gates in Wazirganj, Gaya, Bihar.",
    src: siteConfig.images.campus.main,
    alt: "Swayambhoo International School Main Neoclassical Facade",
    isConceptual: true,
  },
  {
    id: "biophilic-courtyard",
    title: "Biophilic Courtyards & Shaded Learning Quads",
    category: "architecture",
    categoryLabel: "Campus & Architecture",
    description:
      "Native tree canopies, shaded pedestrian colonnades, stepped outdoor learning circles, and water conservation features integrated into campus grounds.",
    src: siteConfig.images.campus.courtyard,
    alt: "Swayambhoo Biophilic Campus Courtyard",
    isConceptual: true,
  },
  {
    id: "smart-classroom-interior",
    title: "Interactive Smart Classroom & Study Pods",
    category: "classrooms",
    categoryLabel: "Smart Classrooms",
    description:
      "Ergonomic swiveling seating, acoustic natural wood paneling, 4K interactive digital touchscreen whiteboards, and cozy reading nooks.",
    src: siteConfig.images.classrooms.smartClassroom,
    alt: "Modern Smart Classroom at Swayambhoo",
    isConceptual: true,
  },
  {
    id: "stem-robotics-lab",
    title: "Advanced STEM Robotics Laboratory",
    category: "labs",
    categoryLabel: "STEM & Robotics",
    description:
      "Robotics assembly benches, micro-controllers, coding terminals, and rapid 3D prototyping stations in the Innovation Block.",
    src: siteConfig.images.labs.stemRobotics,
    alt: "STEM and Robotics Lab with Students Working",
    isConceptual: true,
  },
  {
    id: "sensory-library-main",
    title: "Sensory Library Sanctuary & Reading Pods",
    category: "library",
    categoryLabel: "Library & Sanctuary",
    description:
      "Curved natural timber bookshelves, stepped soft amphitheater seating, reading alcoves, and expansive courtyard views.",
    src: siteConfig.images.library.main,
    alt: "Sensory School Library with Stepped Seating",
    isConceptual: true,
  },
  {
    id: "sports-complex-interior",
    title: "Championship Maple Hardwood Sports Arena",
    category: "sports",
    categoryLabel: "Sports Complex",
    description:
      "Impact-cushioned Canadian maple flooring for championship basketball, multi-court badminton, and spectator galleries.",
    src: siteConfig.images.sports.complex,
    alt: "Indoor Maple Sports Complex",
    isConceptual: true,
  },
  {
    id: "dining-hall-interior",
    title: "Hygienic Dining & Nutrition Pavilion",
    category: "dining",
    categoryLabel: "Dining & Nutrition",
    description:
      "Naturally lit dining hall with stainless steel food service counters, automated handwash stations, and wholesome nutrition planning.",
    src: siteConfig.images.dining.hall,
    alt: "Hygienic Dining Hall Pavilion",
    isConceptual: true,
  },
  {
    id: "uniform-boys-spec",
    title: "Official Boys Uniform Identity",
    category: "uniforms",
    categoryLabel: "Uniform Identity",
    description:
      "Crisp white cotton shirt with brown and gold trimmed collar and cuffs, embroidered golden flame pocket crest, and tailored chocolate brown trousers.",
    src: siteConfig.images.uniforms.boys,
    alt: "Official Boys Uniform Design Specification",
    isConceptual: false,
  },
  {
    id: "uniform-girls-spec",
    title: "Official Girls Uniform Identity (Skirt & Kurta)",
    category: "uniforms",
    categoryLabel: "Uniform Identity",
    description:
      "Dual configurations: tailored white shirt with brown pleated skirt and gold trim, or mandarin-collar white kurta with embroidered pocket crest and brown salwar.",
    src: siteConfig.images.uniforms.girls,
    alt: "Official Girls Uniform Specifications",
    isConceptual: false,
  },
];

export default function GalleryPage() {
  return (
    <div className="bg-[#FDFBF7]">
      {/* Hero Header */}
      <section className="bg-[#081611] text-[#FDFBF7] py-20 lg:py-24 relative overflow-hidden border-b-2 border-[#C5A059]">
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059]">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Gallery</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white">
              Visual Journey & Campus Gallery
            </h1>

            <p className="text-base sm:text-lg text-[#E8DFC8]/90 font-sans leading-relaxed">
              Explore our architectural renderings, smart learning studios, STEM laboratories, athletic arenas, and official uniform specifications.
            </p>
          </div>
        </Container>
      </section>

      {/* Gallery Showcase Section */}
      <section className="py-20">
        <Container>
          <SectionHeading
            badge="Curated Visuals"
            title="Campus & Architectural Gallery"
            description="Click on any image to inspect in high-definition lightbox view with detailed captions and spatial notes."
          />

          <GalleryGrid initialItems={GALLERY_ITEMS} />

          {/* Conceptual Transparency Banner */}
          <div className="mt-16 p-5 bg-white border border-[#E2DBD0] flex items-center gap-3 max-w-2xl mx-auto">
            <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
            <p className="text-xs text-[#181C20]/75 leading-relaxed font-sans">
              <strong className="text-[#14342B]">Visual Transparency Note:</strong> Architectural renderings display the planned concept design for Swayambhoo International School. Uniform specifications represent officially ratified attire.
            </p>
          </div>
        </Container>
      </section>

      <AdmissionsCTA />
    </div>
  );
}
