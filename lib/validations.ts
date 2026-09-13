import { z } from "zod";

const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;

export const admissionEnquirySchema = z.object({
  studentName: z
    .string()
    .trim()
    .min(2, "Student name must be at least 2 characters")
    .max(80, "Student name cannot exceed 80 characters"),
  parentName: z
    .string()
    .trim()
    .min(2, "Parent / Guardian name must be at least 2 characters")
    .max(80, "Parent name cannot exceed 80 characters"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid 10-digit Indian phone number"),
  whatsapp: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid 10-digit WhatsApp number")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(100, "Email cannot exceed 100 characters"),
  currentClass: z
    .string()
    .trim()
    .min(1, "Please specify current class or select 'Not Applicable'"),
  applyingFor: z
    .string()
    .trim()
    .min(1, "Please select the class applying for"),
  academicSession: z
    .string()
    .trim()
    .min(1, "Please select the academic session"),
  message: z
    .string()
    .trim()
    .max(600, "Message cannot exceed 600 characters")
    .optional()
    .or(z.literal("")),
});

export type AdmissionEnquiryFormData = z.infer<typeof admissionEnquirySchema>;

export const contactMessageSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name cannot exceed 80 characters"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid 10-digit phone number"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(100, "Email cannot exceed 100 characters"),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(120, "Subject cannot exceed 120 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

export type ContactMessageFormData = z.infer<typeof contactMessageSchema>;
