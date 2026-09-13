"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { admissionEnquirySchema, AdmissionEnquiryFormData } from "@/lib/validations";
import { CLASS_OPTIONS, ACADEMIC_SESSIONS } from "@/lib/constants";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, Loader2, MessageCircle, Phone } from "lucide-react";

export function AdmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{
    success: boolean;
    id?: string;
    message?: string;
    isDevelopmentFallback?: boolean;
  } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionEnquiryFormData>({
    resolver: zodResolver(admissionEnquirySchema),
    defaultValues: {
      studentName: "",
      parentName: "",
      phone: "",
      whatsapp: "",
      email: "",
      currentClass: "",
      applyingFor: "Grade 1",
      academicSession: "Academic Session 2025–2026",
      message: "",
    },
  });

  const onSubmit = async (data: AdmissionEnquiryFormData) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess({
          success: true,
          id: result.id,
          message: result.message,
          isDevelopmentFallback: result.isDevelopmentFallback,
        });
        reset();
      } else {
        setApiError(
          result.message || "Could not submit enquiry. Please check the inputs and try again."
        );
      }
    } catch (err) {
      console.error("Submission error:", err);
      setApiError("Network error. Please try again or reach out to us directly via WhatsApp or phone.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white border-2 border-[#C5A059] p-8 sm:p-12 shadow-lg text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-[#14342B] text-[#C5A059] mx-auto flex items-center justify-center border border-[#C5A059]">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-[#856627] font-bold block mb-1">
            Enquiry Registered
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14342B]">
            Thank You for Reaching Out
          </h3>
          <p className="text-xs text-[#64748B] mt-1 font-mono">
            Reference ID: <strong className="text-[#14342B]">{submitSuccess.id}</strong>
          </p>
        </div>

        <p className="text-sm text-[#181C20]/80 leading-relaxed font-sans max-w-lg mx-auto">
          {submitSuccess.message ||
            "Your enquiry has been successfully logged. Our Admissions Counselor will review the details and contact you within 24 to 48 hours."}
        </p>

        {submitSuccess.isDevelopmentFallback && (
          <div className="bg-[#FAF6EE] border border-[#E2DBD0] p-3 text-xs text-[#856627] max-w-md mx-auto text-left">
            <p className="font-semibold">Developer Notice:</p>
            <p className="text-[11px] text-[#181C20]/70">
              Your submission was accepted and formatted through the safe development fallback mode (PostgreSQL DATABASE_URL not yet configured).
            </p>
          </div>
        )}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="whatsapp"
            href={getWhatsAppUrl({
              source: "admissions",
              message: `Hello, I submitted an admission enquiry (Ref: ${submitSuccess.id}). Please provide further guidance.`,
            })}
            isExternal
            leftIcon={<MessageCircle className="w-4 h-4" />}
          >
            Confirm on WhatsApp
          </Button>

          <Button
            variant="secondary"
            onClick={() => setSubmitSuccess(null)}
          >
            Submit Another Enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#EAE3D7] p-6 sm:p-10 lg:p-12 shadow-sm">
      <div className="mb-8 pb-6 border-b border-[#F5EFEB]">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
          Online Admission Desk
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14342B]">
          Admission Enquiry Form
        </h3>
        <p className="text-xs sm:text-sm text-[#181C20]/75 font-sans mt-1">
          Please complete all required fields. Our admissions counselor will connect with you with the prospectus and fee structure.
        </p>
      </div>

      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <p>{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Row 1: Student & Parent Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="studentName"
              className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-2"
            >
              Student Full Name <span className="text-red-600">*</span>
            </label>
            <input
              id="studentName"
              type="text"
              {...register("studentName")}
              placeholder="e.g. Aarav Sharma"
              className={`w-full px-4 py-3 text-sm bg-[#FAF6EE] border transition-colors focus:bg-white focus:outline-none focus:border-[#C5A059] ${
                errors.studentName ? "border-red-500" : "border-[#E2DBD0]"
              }`}
            />
            {errors.studentName && (
              <p className="text-xs text-red-600 mt-1">{errors.studentName.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="parentName"
              className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-2"
            >
              Parent / Guardian Name <span className="text-red-600">*</span>
            </label>
            <input
              id="parentName"
              type="text"
              {...register("parentName")}
              placeholder="e.g. Rajesh Sharma"
              className={`w-full px-4 py-3 text-sm bg-[#FAF6EE] border transition-colors focus:bg-white focus:outline-none focus:border-[#C5A059] ${
                errors.parentName ? "border-red-500" : "border-[#E2DBD0]"
              }`}
            />
            {errors.parentName && (
              <p className="text-xs text-red-600 mt-1">{errors.parentName.message}</p>
            )}
          </div>
        </div>

        {/* Row 2: Phone & WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-2"
            >
              Mobile Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="e.g. 9876543210"
              className={`w-full px-4 py-3 text-sm bg-[#FAF6EE] border transition-colors focus:bg-white focus:outline-none focus:border-[#C5A059] ${
                errors.phone ? "border-red-500" : "border-[#E2DBD0]"
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="whatsapp"
              className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-2"
            >
              WhatsApp Number (Optional)
            </label>
            <input
              id="whatsapp"
              type="tel"
              {...register("whatsapp")}
              placeholder="e.g. 9876543210"
              className={`w-full px-4 py-3 text-sm bg-[#FAF6EE] border transition-colors focus:bg-white focus:outline-none focus:border-[#C5A059] ${
                errors.whatsapp ? "border-red-500" : "border-[#E2DBD0]"
              }`}
            />
            {errors.whatsapp && (
              <p className="text-xs text-red-600 mt-1">{errors.whatsapp.message}</p>
            )}
          </div>
        </div>

        {/* Row 3: Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-2"
          >
            Email Address <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="e.g. parent@example.com"
            className={`w-full px-4 py-3 text-sm bg-[#FAF6EE] border transition-colors focus:bg-white focus:outline-none focus:border-[#C5A059] ${
              errors.email ? "border-red-500" : "border-[#E2DBD0]"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Row 4: Current Class & Applying For */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="currentClass"
              className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-2"
            >
              Current Class / School <span className="text-red-600">*</span>
            </label>
            <input
              id="currentClass"
              type="text"
              {...register("currentClass")}
              placeholder="e.g. UKG or Grade 4"
              className={`w-full px-4 py-3 text-sm bg-[#FAF6EE] border transition-colors focus:bg-white focus:outline-none focus:border-[#C5A059] ${
                errors.currentClass ? "border-red-500" : "border-[#E2DBD0]"
              }`}
            />
            {errors.currentClass && (
              <p className="text-xs text-red-600 mt-1">{errors.currentClass.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="applyingFor"
              className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-2"
            >
              Class Applying For <span className="text-red-600">*</span>
            </label>
            <select
              id="applyingFor"
              {...register("applyingFor")}
              className={`w-full px-4 py-3 text-sm bg-[#FAF6EE] border transition-colors focus:bg-white focus:outline-none focus:border-[#C5A059] ${
                errors.applyingFor ? "border-red-500" : "border-[#E2DBD0]"
              }`}
            >
              {CLASS_OPTIONS.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
            {errors.applyingFor && (
              <p className="text-xs text-red-600 mt-1">{errors.applyingFor.message}</p>
            )}
          </div>
        </div>

        {/* Row 5: Academic Session */}
        <div>
          <label
            htmlFor="academicSession"
            className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-2"
          >
            Academic Session <span className="text-red-600">*</span>
          </label>
          <select
            id="academicSession"
            {...register("academicSession")}
            className={`w-full px-4 py-3 text-sm bg-[#FAF6EE] border transition-colors focus:bg-white focus:outline-none focus:border-[#C5A059] ${
              errors.academicSession ? "border-red-500" : "border-[#E2DBD0]"
            }`}
          >
            {ACADEMIC_SESSIONS.map((session) => (
              <option key={session} value={session}>
                {session}
              </option>
            ))}
          </select>
          {errors.academicSession && (
            <p className="text-xs text-red-600 mt-1">{errors.academicSession.message}</p>
          )}
        </div>

        {/* Row 6: Message / Specific Inquiry */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-2"
          >
            Additional Questions / Notes (Optional)
          </label>
          <textarea
            id="message"
            rows={4}
            {...register("message")}
            placeholder="Tell us about your child's interests, transport requirements, or any specific questions..."
            className={`w-full px-4 py-3 text-sm bg-[#FAF6EE] border transition-colors focus:bg-white focus:outline-none focus:border-[#C5A059] ${
              errors.message ? "border-red-500" : "border-[#E2DBD0]"
            }`}
          />
          {errors.message && (
            <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button & Direct Assistance */}
        <div className="pt-4 border-t border-[#F5EFEB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            type="submit"
            variant="gold"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
            leftIcon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
          >
            {isSubmitting ? "Processing Enquiry..." : "Submit Admission Enquiry"}
          </Button>

          <a
            href={getWhatsAppUrl({ source: "admissions" })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#14342B] hover:text-[#25D366] transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Need immediate guidance? WhatsApp Us</span>
          </a>
        </div>
      </form>
    </div>
  );
}
