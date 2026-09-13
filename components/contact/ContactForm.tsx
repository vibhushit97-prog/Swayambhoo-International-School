"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactMessageSchema, ContactMessageFormData } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactMessageFormData>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: ContactMessageFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to deliver message.");
      }
      setSuccessMessage(true);
      reset();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Error submitting message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successMessage) {
    return (
      <div className="bg-white border-2 border-[#C5A059] p-8 text-center space-y-4">
        <div className="w-12 h-12 bg-[#14342B] text-[#C5A059] mx-auto flex items-center justify-center border border-[#C5A059]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-xl font-bold text-[#14342B]">
          Message Dispatched Successfully
        </h3>
        <p className="text-xs sm:text-sm text-[#181C20]/75 max-w-sm mx-auto">
          Thank you for getting in touch. Our administrative office will review your enquiry and respond promptly.
        </p>
        <Button variant="secondary" size="sm" onClick={() => setSuccessMessage(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#EAE3D7] p-8 sm:p-10 shadow-sm">
      <div className="mb-6 pb-4 border-b border-[#F5EFEB]">
        <h3 className="font-serif text-2xl font-bold text-[#14342B]">
          Send Us a Direct Message
        </h3>
        <p className="text-xs text-[#181C20]/75 mt-1">
          Have an administrative query, partnership question, or feedback? Drop us a note below.
        </p>
      </div>

      {submitError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1.5"
          >
            Your Full Name <span className="text-red-600">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
            placeholder="e.g. Dr. Sunita Verma"
            className={`w-full px-4 py-2.5 text-sm bg-[#FAF6EE] border focus:bg-white focus:outline-none focus:border-[#C5A059] ${
              errors.fullName ? "border-red-500" : "border-[#E2DBD0]"
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1.5"
            >
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="e.g. 9876543210"
              className={`w-full px-4 py-2.5 text-sm bg-[#FAF6EE] border focus:bg-white focus:outline-none focus:border-[#C5A059] ${
                errors.phone ? "border-red-500" : "border-[#E2DBD0]"
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1.5"
            >
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="e.g. name@domain.com"
              className={`w-full px-4 py-2.5 text-sm bg-[#FAF6EE] border focus:bg-white focus:outline-none focus:border-[#C5A059] ${
                errors.email ? "border-red-500" : "border-[#E2DBD0]"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1.5"
          >
            Subject <span className="text-red-600">*</span>
          </label>
          <input
            id="subject"
            type="text"
            {...register("subject")}
            placeholder="e.g. Campus Visit Request for Next Week"
            className={`w-full px-4 py-2.5 text-sm bg-[#FAF6EE] border focus:bg-white focus:outline-none focus:border-[#C5A059] ${
              errors.subject ? "border-red-500" : "border-[#E2DBD0]"
            }`}
          />
          {errors.subject && (
            <p className="text-xs text-red-600 mt-1">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1.5"
          >
            Your Message <span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            {...register("message")}
            placeholder="Please write your detailed enquiry here..."
            className={`w-full px-4 py-2.5 text-sm bg-[#FAF6EE] border focus:bg-white focus:outline-none focus:border-[#C5A059] ${
              errors.message ? "border-red-500" : "border-[#E2DBD0]"
            }`}
          />
          {errors.message && (
            <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>
          )}
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full justify-center text-xs"
            leftIcon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
          >
            {isSubmitting ? "Sending Message..." : "Submit Message"}
          </Button>
        </div>
      </form>
    </div>
  );
}
