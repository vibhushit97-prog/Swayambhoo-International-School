"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SchoolStageInfo } from "@/types/school";
import { StageDetailModal } from "./StageDetailModal";
import { Button } from "@/components/ui/Button";
import { Atom, TrendingUp, BookOpenCheck, Check, Sparkles, Eye, ArrowRight } from "lucide-react";

interface StreamItem {
  slug: string;
  title: string;
  tagline: string;
  iconName: string;
  subjects: string[];
  description: string;
  isOffered: boolean;
}

interface SeniorSecondaryInteractiveProps {
  seniorStage: SchoolStageInfo;
  streams: StreamItem[];
}

export function SeniorSecondaryInteractive({
  seniorStage,
  streams,
}: SeniorSecondaryInteractiveProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"details" | "apply">("details");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Atom":
        return Atom;
      case "TrendingUp":
        return TrendingUp;
      case "BookOpenCheck":
      default:
        return BookOpenCheck;
    }
  };

  const handleOpen = (tab: "details" | "apply" = "details") => {
    setModalTab(tab);
    setIsOpen(true);
  };

  return (
    <>
      {/* Visual Showcase Banner for Senior Secondary Stage */}
      <div className="relative w-full h-72 sm:h-96 mb-10 overflow-hidden border-2 border-[#B88A2A] shadow-xl group cursor-pointer"
        onClick={() => handleOpen("details")}
      >
        <Image
          src={seniorStage.image || "/images/academics/senior-secondary-stage.jpg"}
          alt="Senior Secondary Scholars at Swayambhoo International School"
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#083526] via-[#083526]/60 to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 bg-[#083526]/95 text-[#D4B15A] border border-[#B88A2A] shadow-md">
            Stage 05 • Senior Secondary / +2 Specializations
          </span>
        </div>

        <div className="absolute top-4 right-4 hidden sm:block">
          <span className="text-xs font-semibold px-3 py-1.5 bg-[#E7EDE2] text-[#0F4735] shadow-md border border-[#C9D8C8] backdrop-blur-xs">
            Grades 11 & 12 • Age: 16 – 17 Years
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#B88A2A] text-[#083526] text-[10px] uppercase font-black mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Higher Scholarship & University Entrance Mentorship</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              Science, Commerce & Humanities Specializations
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F3E8]/90 mt-1 line-clamp-2">
              Integrated preparation for JEE, NEET, CUET, CA Foundation, and university degree programs in state-of-the-art laboratories and tiered lecture amphitheatres.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen("details");
              }}
              className="text-white border-white/60 hover:bg-white/20"
              leftIcon={<Eye className="w-3.5 h-3.5 text-[#D4B15A]" />}
            >
              Course Details
            </Button>
            <Button
              variant="gold"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen("apply");
              }}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Enquire for +2
            </Button>
          </div>
        </div>
      </div>

      {/* 3 Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {streams.map((stream) => {
          const Icon = getIcon(stream.iconName);
          return (
            <div
              key={stream.title}
              className={`border p-6 sm:p-8 flex flex-col justify-between transition-all group hover:border-[#B88A2A] hover:shadow-lg ${
                stream.isOffered
                  ? "bg-white border-[#0F4735] shadow-md"
                  : "bg-[#F7F3E8] border-[#DEDCCF]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white border border-[#DEDCCF] flex items-center justify-center text-[#B88A2A] group-hover:bg-[#0F4735] group-hover:text-[#D4B15A] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  {stream.isOffered ? (
                    <span className="inline-flex items-center gap-1 bg-[#E7EDE2] text-[#0F4735] border border-[#C9D8C8] text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-[#B88A2A]" /> Officially Offered
                    </span>
                  ) : (
                    <span className="bg-[#E7EDE2]/60 text-[#66716A] text-[10px] font-semibold px-2.5 py-0.5 border border-[#DEDCCF] uppercase tracking-wider">
                      Proposed / Configurable
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-[#0F4735] mb-1 group-hover:text-[#B88A2A] transition-colors">
                  {stream.title}
                </h3>
                <p className="text-xs font-semibold text-[#B88A2A] uppercase tracking-wider mb-4">
                  {stream.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[#26332E]/80 leading-relaxed font-sans mb-6">
                  {stream.description}
                </p>

                <div className="space-y-2 mb-6 pt-4 border-t border-[#DEDCCF]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0F4735]">
                    Subject Combinations:
                  </p>
                  {stream.subjects.map((sub) => (
                    <div key={sub} className="flex items-center gap-2 text-xs text-[#26332E]/85">
                      <Check className="w-3.5 h-3.5 text-[#B88A2A] shrink-0" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#DEDCCF] grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpen("details")}
                  className="w-full justify-center text-xs text-[#0F4735] border-[#0F4735]/40 hover:bg-[#E7EDE2]"
                  leftIcon={<Eye className="w-3 h-3 text-[#B88A2A]" />}
                >
                  Details
                </Button>

                <Button
                  variant={stream.isOffered ? "gold" : "secondary"}
                  size="sm"
                  onClick={() => handleOpen("apply")}
                  className="w-full justify-center text-xs font-bold"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Apply
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-white border border-[#DEDCCF] text-xs text-[#26332E] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>* Senior Secondary streams are configured in accordance with progressive academic rollout.</span>
        <button
          onClick={() => handleOpen("details")}
          className="font-bold text-[#0F4735] hover:text-[#B88A2A] transition-colors inline-flex items-center gap-1"
        >
          <span>View Detailed Senior Secondary Syllabus & Guidelines</span>
          <ArrowRight className="w-3 h-3 text-[#B88A2A]" />
        </button>
      </div>

      {/* Modal Instance */}
      <StageDetailModal
        stage={seniorStage}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultTab={modalTab}
      />
    </>
  );
}
