import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BookOpen, Sparkles, Compass, ArrowRight } from "lucide-react";

export function LibrarySection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FDFBF7] border-b border-[#E2DBD0]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative aspect-16/10 w-full border-2 border-[#C5A059] shadow-xl overflow-hidden group">
              <Image
                src={siteConfig.images.library.main}
                alt="Swayambhoo Sensory Library Sanctuary - Proposed Concept"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0E241B]/90 backdrop-blur-xs border border-[#C5A059]/40 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                    Knowledge Sanctuary
                  </p>
                  <p className="font-serif text-sm font-bold text-[#FDFBF7]">
                    Curved Wood Bookshelves, Reading Pods & Courtyard Glazing
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-white/60 bg-white/10 px-2 py-1 border border-white/20">
                  Concept
                </span>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <SectionHeading
              align="left"
              badge="Knowledge & Research"
              title="Sensory-Friendly Library Sanctuary"
              description="A serene haven where the tactile beauty of books meets natural daylight and quiet reading alcoves."
            />

            <div className="space-y-4 text-sm sm:text-base text-[#181C20]/80 leading-relaxed font-sans">
              <p>
                Reading at Swayambhoo is not an obligation—it is a cherished daily practice. Our library features stepped amphitheater seating upholstered with soft earth tones and cozy reading pods integrated directly into curved natural wood bookshelves.
              </p>
              <p>
                Featuring over 10,000 carefully curated titles spanning Indian classical literature, world history, contemporary sciences, biographies, and young-adult fiction, paired with digital research terminals.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span className="text-sm font-medium text-[#14342B]">
                  10,000+ Curated Volumes & Research Journals
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span className="text-sm font-medium text-[#14342B]">
                  Private In-Shelf Reading Nooks for Deep Immersion
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span className="text-sm font-medium text-[#14342B]">
                  Stepped Soft Amphitheater for Storytelling & Seminars
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="secondary"
                href="/facilities#library"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Discover Library Collections
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
