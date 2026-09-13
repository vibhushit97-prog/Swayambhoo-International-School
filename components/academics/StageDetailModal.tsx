"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SchoolStageInfo } from "@/types/school";
import { AdmissionForm } from "@/components/admissions/AdmissionForm";
import {
  X,
  BookOpen,
  FileText,
  Sparkles,
  CheckCircle2,
  Users,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Building,
  Phone,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface StageDetailModalProps {
  stage: SchoolStageInfo | null;
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "details" | "apply";
}

export function StageDetailModal({
  stage,
  isOpen,
  onClose,
  defaultTab = "details",
}: StageDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"details" | "apply">(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, stage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !stage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#FBF9F2] border-2 border-[#B88A2A] shadow-2xl overflow-y-auto flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="sticky top-0 z-30 bg-[#083526] text-[#F7F3E8] px-6 py-4 border-b border-[#0F4735] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-none bg-[#0F4735] border border-[#B88A2A] flex items-center justify-center text-[#D4B15A]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D4B15A] font-bold block">
                {stage.classes} • Age: {stage.ageGroup}
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#FFFFFF] leading-tight">
                {stage.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#F7F3E8]/80 hover:text-white hover:bg-white/10 rounded transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Tab Controls */}
        <div className="bg-[#F7F3E8] px-6 py-2 border-b border-[#DEDCCF] flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("details")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "details"
                ? "border-[#B88A2A] text-[#0F4735] bg-white shadow-xs"
                : "border-transparent text-[#26332E] hover:text-[#0F4735]"
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#B88A2A]" />
            <span>Course & Curriculum Details</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("apply")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "apply"
                ? "border-[#B88A2A] text-[#0F4735] bg-white shadow-xs"
                : "border-transparent text-[#26332E] hover:text-[#0F4735]"
            }`}
          >
            <FileText className="w-4 h-4 text-[#B88A2A]" />
            <span>Admission Application Form</span>
            <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-[#B88A2A] text-[#083526] font-black rounded-xs">
              APPLY
            </span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {activeTab === "details" ? (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Course Stage Image */}
              {stage.image && (
                <div className="relative w-full h-64 sm:h-80 overflow-hidden border border-[#DEDCCF] group shadow-sm">
                  <Image
                    src={stage.image}
                    alt={`${stage.title} at Swayambhoo International School`}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                    sizes="(max-width: 1024px) 100vw, 850px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#083526]/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#083526]/90 border border-[#B88A2A] text-[10px] uppercase font-bold text-[#D4B15A] mb-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{stage.nepFocus || "NEP 2020 Pedagogical Benchmark"}</span>
                    </div>
                    <p className="text-xs text-[#F7F3E8]/90 font-light">
                      Experiential learning, personalized mentorship, and smart infrastructure at Swayambhoo International School.
                    </p>
                  </div>
                </div>
              )}

              {/* Curriculum Overview */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B88A2A]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Academic Progression & Philosophy</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0F4735]">
                  About {stage.title}
                </h3>
                <p className="text-sm text-[#26332E]/85 leading-relaxed font-sans">
                  {stage.curriculumOverview || stage.description}
                </p>
              </div>

              {/* Faculty Ratio & Mentorship Badge */}
              {stage.facultyRatio && (
                <div className="p-4 bg-[#E7EDE2] border border-[#C9D8C8] flex items-center gap-3 text-xs text-[#0F4735]">
                  <Users className="w-5 h-5 text-[#B88A2A] shrink-0" />
                  <div>
                    <span className="font-bold block uppercase tracking-wider text-[#0F4735]">
                      Mentorship Structure
                    </span>
                    <span className="text-[#26332E]">{stage.facultyRatio}</span>
                  </div>
                </div>
              )}

              {/* Core Subjects & Curriculum Modules */}
              {stage.coreSubjects && stage.coreSubjects.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-[#0F4735] border-b border-[#DEDCCF] pb-2">
                    Core Subjects & Specialized Disciplines
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {stage.coreSubjects.map((subject, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3 bg-white border border-[#DEDCCF] hover:border-[#B88A2A] transition-colors"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#0F4735] text-[#D4B15A] text-[11px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-medium text-[#26332E]">{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Competencies & Learning Milestones */}
              {stage.keyCompetencies && stage.keyCompetencies.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-[#0F4735] border-b border-[#DEDCCF] pb-2">
                    Key Competencies & Developmental Milestones
                  </h4>
                  <div className="space-y-2">
                    {stage.keyCompetencies.map((comp, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#26332E]/85">
                        <CheckCircle2 className="w-4 h-4 text-[#B88A2A] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{comp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Teaching Methodology */}
              {stage.teachingMethodology && stage.teachingMethodology.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-[#0F4735] border-b border-[#DEDCCF] pb-2">
                    Pedagogical Methodology & Assessment
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {stage.teachingMethodology.map((method, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-[#E7EDE2] border border-[#C9D8C8] text-xs text-[#0F4735]"
                      >
                        <span className="font-bold block mb-1 text-[#0F4735]">Pillar 0{idx + 1}</span>
                        <span className="text-[#26332E]/85">{method}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Apply Action Callout */}
              <div className="p-6 bg-[#083526] text-[#F7F3E8] border border-[#B88A2A] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4B15A] font-bold block">
                    Admissions Open for 2025–26 & 2026–27
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#FFFFFF]">
                    Apply for {stage.classes}
                  </h4>
                  <p className="text-xs text-[#F7F3E8]/80 mt-0.5">
                    Submit your admission enquiry to receive the syllabus brochure and campus visit slot.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab("apply")}
                  className="px-6 py-3 bg-[#B88A2A] hover:bg-[#D4B15A] text-[#083526] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 shadow-md hover:scale-105"
                >
                  <span>Proceed to Application Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Form Intro Banner */}
              <div className="bg-[#083526] text-white p-5 border border-[#B88A2A]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4B15A] block mb-1">
                    Direct Stage Registration
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#FFFFFF]">
                    Admission Enquiry: {stage.title}
                  </h3>
                  <p className="text-xs text-[#F7F3E8]/90">
                    Pre-selected for {stage.classes}. Our admissions office will process your application within 24 hours.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={getWhatsAppUrl({ source: "admissions" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                    title="WhatsApp Admissions"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                    className="p-2 bg-white/10 text-white hover:bg-white/20 transition-colors"
                    title="Call Admissions"
                  >
                    <Phone className="w-4 h-4 text-[#D4B15A]" />
                  </a>
                </div>
              </div>

              {/* Embedded Existing AdmissionForm */}
              <div className="bg-white border border-[#DEDCCF] p-4 sm:p-8">
                <AdmissionForm initialApplyingFor={stage.defaultApplyingFor || "Grade 1"} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
