import { z } from "zod";

const indianPhoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
const indianPincodeRegex = /^[1-9][0-9]{5}$/;

export const educationRecordSchema = z.object({
  qualification: z.string().trim().min(1, "Please select qualification"),
  otherQualification: z.string().trim().optional().or(z.literal("")),
  institution: z.string().trim().min(2, "Institution name is required"),
  boardOrUniversity: z.string().trim().min(2, "Board or University is required"),
  year: z.coerce.number().int().min(1970).max(new Date().getFullYear() + 1),
  percentageOrCgpa: z.string().trim().min(1, "Percentage or CGPA is required"),
  specialization: z.string().trim().optional().or(z.literal("")),
});

export const experienceRecordSchema = z.object({
  institution: z.string().trim().min(2, "School / Institution is required"),
  designation: z.string().trim().min(2, "Designation is required"),
  subject: z.string().trim().optional().or(z.literal("")),
  classesTaught: z.string().trim().optional().or(z.literal("")),
  startDate: z.string().trim().min(1, "Start date is required"),
  endDate: z.string().trim().optional().or(z.literal("")),
  currentlyWorking: z.boolean().default(false),
  responsibilities: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const languageSkillSchema = z.object({
  language: z.string().trim().min(2, "Language name is required"),
  proficiency: z.enum(["Native", "Fluent", "Intermediate", "Basic"], {
    message: "Select valid proficiency",
  }),
});

export const applicationDocumentSchema = z.object({
  documentType: z.string().trim().min(1, "Document type is required"),
  filename: z.string().trim().min(1, "Filename is required"),
  storageKey: z.string().trim().min(1, "Storage key is required"),
  mimeType: z.string().trim().min(1, "MIME type is required"),
  fileSize: z.number().positive(),
});

export const teacherApplicationSchema = z
  .object({
    // 01 Personal Information
    fullName: z
      .string()
      .trim()
      .min(3, "Full name must be at least 3 characters")
      .max(100, "Full name cannot exceed 100 characters"),
    dateOfBirth: z.string().trim().min(1, "Date of birth is required"),
    gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]).optional().or(z.literal("")),
    mobile: z
      .string()
      .trim()
      .regex(indianPhoneRegex, "Enter a valid 10-digit Indian mobile number"),
    whatsapp: z
      .string()
      .trim()
      .regex(indianPhoneRegex, "Enter a valid 10-digit Indian WhatsApp number")
      .optional()
      .or(z.literal("")),
    email: z
      .string()
      .trim()
      .email("Enter a valid email address")
      .max(120, "Email cannot exceed 120 characters"),
    address: z
      .string()
      .trim()
      .min(5, "Current address must be at least 5 characters")
      .max(300, "Address cannot exceed 300 characters"),
    city: z.string().trim().min(2, "City is required").max(60),
    state: z.string().trim().min(2, "State is required").max(60),
    pincode: z
      .string()
      .trim()
      .regex(indianPincodeRegex, "Enter a valid 6-digit Indian PIN code"),
    profilePhoto: z.string().optional().or(z.literal("")),

    // 02 Position Information
    positionId: z.string().optional().or(z.literal("")),
    otherPosition: z.string().trim().optional().or(z.literal("")),
    subject: z.string().trim().optional().or(z.literal("")),
    preferredClasses: z.string().trim().optional().or(z.literal("")),
    employmentType: z.enum(["Full Time", "Part Time", "Contract"]).default("Full Time"),
    expectedSalary: z.string().trim().optional().or(z.literal("")),
    currentSalary: z.string().trim().optional().or(z.literal("")),
    noticePeriod: z.string().trim().optional().or(z.literal("")),
    willingToRelocate: z.boolean().default(false),

    // 03 Educational Qualifications
    educationRecords: z
      .array(educationRecordSchema)
      .min(1, "At least one educational qualification is required"),

    // 04 Experience
    isExperienced: z.boolean().default(false),
    experienceRecords: z.array(experienceRecordSchema).default([]),

    // 05 Skills (Free-form custom dynamic skills)
    skills: z
      .array(z.string().trim().min(1))
      .min(1, "Please add at least one professional skill"),

    // 06 Languages
    languages: z
      .array(languageSkillSchema)
      .min(1, "Please add at least one language"),

    // 07 Additional Information & Achievements
    achievements: z.string().trim().max(1500).optional().or(z.literal("")),
    personalStatement: z
      .string()
      .trim()
      .min(30, "Please explain why you want to join Swayambhoo (minimum 30 characters)")
      .max(2000, "Maximum 2000 characters"),
    teachingPhilosophy: z
      .string()
      .trim()
      .min(30, "Please describe your teaching philosophy (minimum 30 characters)")
      .max(2000, "Maximum 2000 characters"),

    // 08 Documents
    documents: z
      .array(applicationDocumentSchema)
      .min(1, "Resume / CV upload is mandatory"),

    // 09 Declaration
    declarationConfirmed: z.literal(true, {
      message: "You must confirm the truthfulness of the declared information",
    }),
  })
  .refine(
    (data) => {
      // Must have either a selected positionId or a typed otherPosition
      return Boolean(data.positionId) || Boolean(data.otherPosition?.trim());
    },
    {
      message: "Please select an available position or specify a custom position",
      path: ["positionId"],
    }
  )
  .refine(
    (data) => {
      // Resume / CV must be present in documents
      return data.documents.some((doc) => doc.documentType === "Resume / CV");
    },
    {
      message: "Resume / CV is required",
      path: ["documents"],
    }
  );

export type TeacherApplicationInput = z.infer<typeof teacherApplicationSchema>;

// Candidate Status Inquiry Schema
export const statusInquirySchema = z.object({
  applicationNumber: z
    .string()
    .trim()
    .regex(/^SWIS-\d{4}-\d{6}$/i, "Application ID must be in format SWIS-2026-000001"),
  email: z.string().trim().email("Please enter the registered email address"),
});

// Admin Interview Scheduling Schema
export const scheduleInterviewSchema = z.object({
  interviewDate: z.string().trim().min(1, "Interview date is required"),
  interviewTime: z.string().trim().min(1, "Interview time is required"),
  interviewMode: z.enum(["School Campus", "Google Meet", "Zoom", "Phone"]),
  venue: z.string().trim().optional().or(z.literal("")),
  meetingLink: z.string().trim().optional().or(z.literal("")),
  interviewer: z.string().trim().min(2, "Interviewer name / panel is required"),
  additionalInstructions: z.string().trim().max(1000).optional().or(z.literal("")),
});

// Candidate Reschedule Request Schema
export const rescheduleRequestSchema = z.object({
  rescheduleReason: z
    .string()
    .trim()
    .min(10, "Please provide a clear reason for rescheduling (at least 10 characters)")
    .max(600, "Reason cannot exceed 600 characters"),
});

// Admin Job Position Schema
export const jobPositionSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  code: z.string().trim().optional().or(z.literal("")),
  department: z.string().trim().min(2, "Department is required"),
  subjects: z.array(z.string().trim()).default([]),
  minQualification: z.string().trim().min(2, "Minimum qualification is required"),
  minExperience: z.coerce.number().int().min(0).default(0),
  vacancies: z.coerce.number().int().min(1).default(1),
  employmentType: z.string().trim().default("Full Time"),
  description: z.string().trim().optional().or(z.literal("")),
  responsibilities: z.string().trim().optional().or(z.literal("")),
  requirements: z.string().trim().optional().or(z.literal("")),
  deadline: z.string().trim().optional().or(z.literal("")),
  isActive: z.boolean().default(true),
  displayOrder: z.coerce.number().int().default(0),
});
