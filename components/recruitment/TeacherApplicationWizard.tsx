"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  FileText,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  RotateCcw,
  Languages,
} from "lucide-react";
import { SkillsInput } from "./SkillsInput";
import { LanguagesInput, LanguageEntry } from "./LanguagesInput";
import { EducationStep, EducationEntry } from "./EducationStep";
import { ExperienceStep, ExperienceEntry } from "./ExperienceStep";
import { DocumentsUploadStep, UploadedDoc } from "./DocumentsUploadStep";

const DRAFT_STORAGE_KEY = "swis_teacher_app_draft_2026";

interface JobPosition {
  id: string;
  title: string;
  department: string;
  subjects: string[];
}

interface TeacherApplicationWizardProps {
  initialPositionId?: string;
  positions: JobPosition[];
}

const STEPS = [
  { id: 1, label: "Personal", icon: User },
  { id: 2, label: "Position", icon: Briefcase },
  { id: 3, label: "Education", icon: GraduationCap },
  { id: 4, label: "Experience", icon: Award },
  { id: 5, label: "Skills", icon: Sparkles },
  { id: 6, label: "Documents", icon: FileText },
  { id: 7, label: "Statement", icon: FileCheck2 },
  { id: 8, label: "Declaration", icon: CheckCircle2 },
];

const getEmptyFormData = (posId?: string) => ({
  // 01 Personal
  fullName: "",
  dateOfBirth: "",
  gender: "Female",
  mobile: "",
  whatsapp: "",
  email: "",
  address: "",
  city: "Gaya",
  state: "Bihar",
  pincode: "805131",
  profilePhoto: "",

  // 02 Position
  positionId: posId || "",
  otherPosition: "",
  subject: "",
  preferredClasses: "",
  employmentType: "Full Time" as "Full Time" | "Part Time" | "Contract",
  expectedSalary: "",
  currentSalary: "",
  noticePeriod: "1 Month",
  willingToRelocate: true,

  // 03 Education
  educationRecords: [
    {
      qualification: "B.Ed (Bachelor of Education)",
      otherQualification: "",
      institution: "",
      boardOrUniversity: "",
      year: 2022,
      percentageOrCgpa: "78%",
      specialization: "",
    },
    {
      qualification: "Post Graduation (M.A. / M.Sc / M.Com / MCA / M.Tech / Other)",
      otherQualification: "",
      institution: "",
      boardOrUniversity: "",
      year: 2020,
      percentageOrCgpa: "74%",
      specialization: "",
    },
  ] as EducationEntry[],

  // 04 Experience
  isExperienced: false,
  experienceRecords: [] as ExperienceEntry[],

  // 05 Skills & Languages
  skills: ["Classroom Management", "Smart Board Pedagogies"] as string[],
  languages: [
    { language: "English", proficiency: "Fluent" },
    { language: "Hindi", proficiency: "Native" },
  ] as LanguageEntry[],

  // 06 Documents
  documents: [] as UploadedDoc[],

  // 07 Personal Statement & Achievements
  achievements: "",
  personalStatement: "",
  teachingPhilosophy: "",

  // 08 Declaration
  declarationConfirmed: false,
});

export function TeacherApplicationWizard({
  initialPositionId,
  positions,
}: TeacherApplicationWizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draftRestored, setDraftRestored] = useState(false);
  const [draftClearedNotice, setDraftClearedNotice] = useState(false);
  const isClearingRef = useRef(false);

  const defaultPosition = initialPositionId || (positions[0]?.id || "");

  // Form State
  const [formData, setFormData] = useState(() => getEmptyFormData(defaultPosition));

  // 1. Auto Restore Draft from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setFormData((prev) => ({
            ...prev,
            ...parsed,
            positionId: initialPositionId || parsed.positionId || prev.positionId,
          }));
          setDraftRestored(true);
        }
      }
    } catch {
      // Ignore parse error
    }
  }, [initialPositionId]);

  // 2. Auto Save Draft on Change
  useEffect(() => {
    if (isClearingRef.current) {
      isClearingRef.current = false;
      return;
    }

    const hasContent =
      Boolean(formData.fullName?.trim()) ||
      Boolean(formData.mobile?.trim()) ||
      Boolean(formData.email?.trim()) ||
      Boolean(formData.address?.trim());

    if (!hasContent) {
      return;
    }

    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // Ignore quota error
    }
  }, [formData]);

  const clearDraft = () => {
    isClearingRef.current = true;
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // ignore
    }
    setFormData(getEmptyFormData(defaultPosition));
    setErrors({});
    setCurrentStep(1);
    setDraftRestored(false);
    setDraftClearedNotice(true);
    setTimeout(() => {
      setDraftClearedNotice(false);
    }, 5000);
  };

  // Step Validation Logic
  const validateCurrentStep = (): boolean => {
    const errs: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim() || formData.fullName.length < 3) {
        errs.fullName = "Full name must be at least 3 characters.";
      }
      if (!formData.dateOfBirth) {
        errs.dateOfBirth = "Date of birth is required.";
      }
      const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
      if (!phoneRegex.test(formData.mobile.trim())) {
        errs.mobile = "Please enter a valid 10-digit Indian mobile number.";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = "Please enter a valid email address.";
      }
      if (!formData.address.trim() || formData.address.length < 5) {
        errs.address = "Current address must be at least 5 characters.";
      }
      if (!formData.city.trim()) errs.city = "City is required.";
      if (!formData.state.trim()) errs.state = "State is required.";
      const pinRegex = /^[1-9][0-9]{5}$/;
      if (!pinRegex.test(formData.pincode.trim())) {
        errs.pincode = "Enter a valid 6-digit Indian PIN code.";
      }
    } else if (currentStep === 2) {
      if (!formData.positionId && !formData.otherPosition.trim()) {
        errs.positionId = "Please choose a vacancy or specify a custom position.";
      }
    } else if (currentStep === 3) {
      if (formData.educationRecords.length === 0) {
        errs.educationRecords = "Please add at least one qualification.";
      } else {
        for (const [idx, edu] of formData.educationRecords.entries()) {
          if (!edu.institution.trim()) {
            errs[`edu_${idx}_inst`] = `Institution is required for qualification #${idx + 1}.`;
          }
          if (!edu.boardOrUniversity.trim()) {
            errs[`edu_${idx}_board`] = `Board/University is required for qualification #${idx + 1}.`;
          }
          if (!edu.percentageOrCgpa.trim()) {
            errs[`edu_${idx}_cgpa`] = `Percentage or CGPA is required for qualification #${idx + 1}.`;
          }
        }
      }
    } else if (currentStep === 4) {
      if (formData.isExperienced) {
        if (formData.experienceRecords.length === 0) {
          errs.experienceRecords = "Please add at least one experience record or select Fresher.";
        } else {
          for (const [idx, exp] of formData.experienceRecords.entries()) {
            if (!exp.institution.trim()) {
              errs[`exp_${idx}_inst`] = `Institution name is required for experience #${idx + 1}.`;
            }
            if (!exp.designation.trim()) {
              errs[`exp_${idx}_desig`] = `Designation is required for experience #${idx + 1}.`;
            }
            if (!exp.startDate) {
              errs[`exp_${idx}_start`] = `Start date is required for experience #${idx + 1}.`;
            }
          }
        }
      }
    } else if (currentStep === 5) {
      if (formData.skills.length === 0) {
        errs.skills = "Please add at least one professional skill.";
      }
      if (formData.languages.length === 0) {
        errs.languages = "Please add at least one language.";
      }
    } else if (currentStep === 6) {
      const hasResume = formData.documents.some((d) => d.documentType === "Resume / CV");
      if (!hasResume) {
        errs.documents = "Resume / CV is mandatory. Please upload your resume.";
      }
    } else if (currentStep === 7) {
      if (!formData.personalStatement.trim() || formData.personalStatement.length < 30) {
        errs.personalStatement = "Please provide at least 30 characters explaining why you want to join Swayambhoo.";
      }
      if (!formData.teachingPhilosophy.trim() || formData.teachingPhilosophy.length < 30) {
        errs.teachingPhilosophy = "Please provide at least 30 characters detailing your teaching philosophy.";
      }
    } else if (currentStep === 8) {
      if (!formData.declarationConfirmed) {
        errs.declarationConfirmed = "You must accept the truthfulness declaration before submitting.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(STEPS.length, prev + 1));
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/recruitment/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit application.");
      }

      // Clear draft on success
      localStorage.removeItem(DRAFT_STORAGE_KEY);

      // Redirect to success page
      router.push(`/careers/application-success/${data.applicationNumber}`);
    } catch (err: any) {
      setErrors({ submit: err.message || "An unexpected error occurred." });
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-[#E2DBD0] rounded-2xl shadow-sm overflow-hidden">
      {/* Draft Notification Bar */}
      {draftRestored && (
        <div className="bg-[#FAF6EE] px-6 py-2.5 border-b border-[#EAE2D5] flex items-center justify-between text-xs text-[#856627] animate-in fade-in duration-200">
          <span>Draft restored from your last visit. Changes are saved automatically.</span>
          <button
            type="button"
            onClick={clearDraft}
            className="flex items-center gap-1.5 font-bold text-red-700 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded transition-colors"
            title="Reset form and remove saved draft"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Draft</span>
          </button>
        </div>
      )}

      {draftClearedNotice && (
        <div className="bg-[#E7EDE2] px-6 py-2.5 border-b border-[#C9D8C8] flex items-center justify-between text-xs text-[#0F4735] animate-in fade-in duration-200">
          <span className="font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#0F4735]" />
            Saved draft cleared successfully. All form fields have been reset.
          </span>
        </div>
      )}

      {/* Wizard Progress Indicator */}
      <div className="bg-[#083526] px-6 py-5 border-b border-[#0F4735]">
        <div className="flex items-center justify-between overflow-x-auto gap-2 pb-2 sm:pb-0 scrollbar-none">
          {STEPS.map((step) => {
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div
                key={step.id}
                onClick={() => {
                  if (isDone) setCurrentStep(step.id);
                }}
                className={`flex items-center gap-2 cursor-pointer transition-opacity shrink-0 ${
                  isCurrent
                    ? "opacity-100"
                    : isDone
                    ? "opacity-80 hover:opacity-100"
                    : "opacity-40 pointer-events-none"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isCurrent
                      ? "bg-[#B88A2A] text-[#083526] ring-2 ring-[#B88A2A]/40"
                      : isDone
                      ? "bg-[#2D654E] text-white"
                      : "bg-[#0F4735] text-[#DEDCCF]/70 border border-[#083526]"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : `0${step.id}`}
                </div>
                <span
                  className={`text-xs font-medium hidden md:inline ${
                    isCurrent ? "text-[#D4B15A] font-bold" : "text-[#F7F3E8]/80"
                  }`}
                >
                  {step.label}
                </span>
                {step.id < STEPS.length && (
                  <div className="w-4 h-[1px] bg-white/20 hidden md:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content Area */}
      <div className="p-6 sm:p-10 space-y-8">
        {/* STEP 1: PERSONAL INFORMATION */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-[#EAE2D5] pb-4">
              <h2 className="font-serif font-bold text-xl text-[#14342B] flex items-center gap-2">
                <User className="w-5 h-5 text-[#C5A059]" />
                <span>01. Personal Information</span>
              </h2>
              <p className="text-xs text-[#64748B] mt-1 font-sans">
                Please provide accurate contact and personal details for identity verification.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  Full Name (as per certificates) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Dr. Ananya Sharma"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                />
                {errors.fullName && <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.fullName}</p>}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                />
                {errors.dateOfBirth && <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.dateOfBirth}</p>}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  Mobile Number (India) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                />
                {errors.mobile && <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.mobile}</p>}
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  WhatsApp Number (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                />
              </div>

              {/* Email Address */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. ananya.sharma@example.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                />
                <p className="text-[10px] text-[#64748B] mt-1 font-sans">
                  Application confirmation and interview invitations will be dispatched to this email address.
                </p>
                {errors.email && <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.email}</p>}
              </div>

              {/* Current Address */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  Current Residential Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House / Street / Locality details"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                />
                {errors.address && <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.address}</p>}
              </div>

              {/* City, State, Pincode */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Gaya"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="e.g. Bihar"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  PIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="e.g. 805131"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                />
                {errors.pincode && <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.pincode}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: POSITION INFORMATION */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-[#EAE2D5] pb-4">
              <h2 className="font-serif font-bold text-xl text-[#14342B] flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#C5A059]" />
                <span>02. Position Applied For</span>
              </h2>
              <p className="text-xs text-[#64748B] mt-1 font-sans">
                Select from our active database vacancies or specify a custom position.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Select Position from Database */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  Select Active Vacancy
                </label>
                <select
                  value={formData.positionId}
                  onChange={(e) => setFormData({ ...formData, positionId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                >
                  <option value="">-- Or specify a custom position below --</option>
                  {positions.map((pos) => (
                    <option key={pos.id} value={pos.id}>
                      {pos.title} ({pos.department})
                    </option>
                  ))}
                </select>
                {errors.positionId && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.positionId}</p>
                )}
              </div>

              {/* Other Position (Manual Typing) */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  Other Position (if not listed above)
                </label>
                <input
                  type="text"
                  value={formData.otherPosition}
                  onChange={(e) => setFormData({ ...formData, otherPosition: e.target.value })}
                  placeholder="e.g. Sanskrit Teacher, German Faculty, Robotics Instructor"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                />
              </div>

              {/* Primary Subject */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  Subject Specialization
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Mathematics, Organic Chemistry, English Literature"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                />
              </div>

              {/* Preferred Classes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  Preferred Classes / Stages
                </label>
                <input
                  type="text"
                  value={formData.preferredClasses}
                  onChange={(e) => setFormData({ ...formData, preferredClasses: e.target.value })}
                  placeholder="e.g. Grades 9 to 12, Middle School (6-8), Pre-Primary"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                />
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  Employment Type
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      employmentType: e.target.value as "Full Time" | "Part Time" | "Contract",
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              {/* Notice Period */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  Notice Period / Availability
                </label>
                <input
                  type="text"
                  value={formData.noticePeriod}
                  onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                  placeholder="e.g. Immediate, 15 Days, 1 Month"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                />
              </div>

              {/* Salary Expectations */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  Current CTC / Salary (Per Month / Annual)
                </label>
                <input
                  type="text"
                  value={formData.currentSalary}
                  onChange={(e) => setFormData({ ...formData, currentSalary: e.target.value })}
                  placeholder="e.g. ₹45,000 / month"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
                  Expected CTC / Salary
                </label>
                <input
                  type="text"
                  value={formData.expectedSalary}
                  onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                  placeholder="e.g. ₹55,000 / month (Negotiable)"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
                />
              </div>

              {/* Willing to relocate */}
              <div className="md:col-span-2 pt-2">
                <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.willingToRelocate}
                    onChange={(e) =>
                      setFormData({ ...formData, willingToRelocate: e.target.checked })
                    }
                    className="rounded text-[#14342B] focus:ring-[#C5A059]"
                  />
                  <span>
                    I am residing in Gaya or willing to commute / relocate to Wazirganj, Gaya, Bihar.
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: EDUCATIONAL QUALIFICATIONS */}
        {currentStep === 3 && (
          <EducationStep
            records={formData.educationRecords}
            onChange={(records) => setFormData({ ...formData, educationRecords: records })}
            error={errors.educationRecords}
          />
        )}

        {/* STEP 4: EXPERIENCE */}
        {currentStep === 4 && (
          <ExperienceStep
            isExperienced={formData.isExperienced}
            onExperienceToggle={(isExp) =>
              setFormData({ ...formData, isExperienced: isExp })
            }
            records={formData.experienceRecords}
            onChange={(records) => setFormData({ ...formData, experienceRecords: records })}
            error={errors.experienceRecords}
          />
        )}

        {/* STEP 5: SKILLS & LANGUAGES */}
        {currentStep === 5 && (
          <div className="space-y-8">
            <div className="border-b border-[#EAE2D5] pb-4">
              <h2 className="font-serif font-bold text-xl text-[#14342B] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C5A059]" />
                <span>05. Professional Skills & Languages</span>
              </h2>
              <p className="text-xs text-[#64748B] mt-1 font-sans">
                Our dynamic tagging system lets you highlight any skill, software, teaching methodology, or language proficiency.
              </p>
            </div>

            {/* Custom Skills System */}
            <SkillsInput
              skills={formData.skills}
              onChange={(skills) => setFormData({ ...formData, skills })}
              error={errors.skills}
            />

            {/* Language System */}
            <div className="pt-6 border-t border-[#EAE2D5]">
              <LanguagesInput
                languages={formData.languages}
                onChange={(languages) => setFormData({ ...formData, languages })}
                error={errors.languages}
              />
            </div>
          </div>
        )}

        {/* STEP 6: DOCUMENTS UPLOAD */}
        {currentStep === 6 && (
          <DocumentsUploadStep
            documents={formData.documents}
            onChange={(docs) => setFormData({ ...formData, documents: docs })}
            error={errors.documents}
          />
        )}

        {/* STEP 7: PERSONAL STATEMENT & PHILOSOPHY */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div className="border-b border-[#EAE2D5] pb-4">
              <h2 className="font-serif font-bold text-xl text-[#14342B] flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#C5A059]" />
                <span>07. Teaching Philosophy & Statement</span>
              </h2>
              <p className="text-xs text-[#64748B] mt-1 font-sans">
                Help our academic leadership understand your educational vision and motivations.
              </p>
            </div>

            {/* Why Swayambhoo */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#14342B]">
                  Why do you want to join Swayambhoo International School? <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-stone-400 font-mono">
                  {formData.personalStatement.length} / 2000
                </span>
              </div>
              <textarea
                rows={4}
                maxLength={2000}
                value={formData.personalStatement}
                onChange={(e) =>
                  setFormData({ ...formData, personalStatement: e.target.value })
                }
                placeholder="Share what attracts you to Swayambhoo International School's vision, culture, campus, and student development..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs font-sans leading-relaxed"
              />
              {errors.personalStatement && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.personalStatement}</p>
              )}
            </div>

            {/* Teaching Philosophy */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#14342B]">
                  Tell us about your teaching philosophy <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-stone-400 font-mono">
                  {formData.teachingPhilosophy.length} / 2000
                </span>
              </div>
              <textarea
                rows={4}
                maxLength={2000}
                value={formData.teachingPhilosophy}
                onChange={(e) =>
                  setFormData({ ...formData, teachingPhilosophy: e.target.value })
                }
                placeholder="Describe your classroom approach, how you engage diverse learners, integrate technology or experiments, and instill discipline with compassion..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs font-sans leading-relaxed"
              />
              {errors.teachingPhilosophy && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.teachingPhilosophy}</p>
              )}
            </div>

            {/* Achievements */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1.5">
                Awards, Publications & Co-Curricular Achievements (Optional)
              </label>
              <textarea
                rows={3}
                maxLength={1500}
                value={formData.achievements}
                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                placeholder="List state/national teacher awards, published papers, conference presentations, workshops attended, sports or cultural distinctions..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs font-sans leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* STEP 8: DECLARATION & REVIEW */}
        {currentStep === 8 && (
          <div className="space-y-6">
            <div className="border-b border-[#EAE2D5] pb-4">
              <h2 className="font-serif font-bold text-xl text-[#14342B] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
                <span>08. Declaration & Final Submission</span>
              </h2>
              <p className="text-xs text-[#64748B] mt-1 font-sans">
                Review your summary and submit your application to the Swayambhoo Recruitment Committee.
              </p>
            </div>

            {/* Summary Preview Box */}
            <div className="bg-[#FAF6EE] p-5 rounded-xl border border-[#EAE2D5] space-y-3 text-xs">
              <div className="font-bold text-[#14342B] text-sm border-b border-[#EAE2D5] pb-2">
                Application Summary Preview
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Applicant</span>
                  <span className="font-semibold text-[#181C20]">{formData.fullName} ({formData.email})</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Contact</span>
                  <span className="font-semibold text-[#181C20]">{formData.mobile} • {formData.city}, {formData.state}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Position</span>
                  <span className="font-semibold text-[#181C20]">
                    {positions.find((p) => p.id === formData.positionId)?.title || formData.otherPosition || "Faculty"}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Experience & Skills</span>
                  <span className="font-semibold text-[#181C20]">
                    {formData.isExperienced ? `${formData.experienceRecords.length} records` : "Fresher"} • {formData.skills.length} skills
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Documents Attached</span>
                  <span className="font-semibold text-[#181C20]">
                    {formData.documents.map((d) => d.documentType).join(", ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Legal Declaration */}
            <div className="p-5 bg-white border border-[#E2DBD0] rounded-xl space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.declarationConfirmed}
                  onChange={(e) =>
                    setFormData({ ...formData, declarationConfirmed: e.target.checked })
                  }
                  className="mt-1 rounded text-[#14342B] focus:ring-[#C5A059]"
                />
                <span className="text-xs text-[#3E4652] leading-relaxed">
                  I hereby declare that all information furnished in this recruitment application form is true, complete and correct to the best of my knowledge and belief. In the event of any information being found false, fraudulent, or deficient at any stage of recruitment or during employment, my candidature / appointment is liable to be cancelled / terminated without notice.
                </span>
              </label>
              {errors.declarationConfirmed && (
                <p className="text-[11px] text-red-600 font-medium pl-7">{errors.declarationConfirmed}</p>
              )}
            </div>

            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.submit}</span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-6 border-t border-[#EAE2D5] flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              disabled={submitting}
              onClick={handleBack}
              className="px-5 py-2.5 rounded-lg border border-[#E2DBD0] hover:bg-stone-50 text-xs font-bold uppercase tracking-wider text-[#14342B] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < STEPS.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-lg bg-[#14342B] hover:bg-[#1E4D40] text-[#C5A059] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="px-8 py-3 rounded-lg bg-[#C5A059] hover:bg-[#A27F35] text-[#0E241B] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Teacher Application</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
