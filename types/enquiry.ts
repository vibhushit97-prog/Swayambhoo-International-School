export type EnquiryStatus = "NEW" | "CONTACTED" | "FOLLOW_UP" | "CONVERTED" | "CLOSED";

export interface AdmissionEnquiryRecord {
  id: string;
  studentName: string;
  parentName: string;
  phone: string;
  whatsapp?: string;
  email: string;
  currentClass: string;
  applyingFor: string;
  academicSession: string;
  message?: string;
  status: EnquiryStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}
