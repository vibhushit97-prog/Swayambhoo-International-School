import { siteConfig } from "@/config/site";

export interface WhatsAppOptions {
  message?: string;
  source?: "hero" | "admissions" | "contact" | "footer" | "navbar" | "floating" | "facility" | "campus";
  studentName?: string;
  grade?: string;
}

/**
 * Generates an official WhatsApp click-to-chat URL with contextual pre-filled messages
 */
export function getWhatsAppUrl(options: WhatsAppOptions = {}): string {
  const number = siteConfig.contact.whatsappRaw;
  
  let defaultMessage = "Hello Swayambhoo International School, I would like to enquire about admissions.";

  if (options.studentName && options.grade) {
    defaultMessage = `Hello Swayambhoo International School, I would like to enquire about admission for ${options.studentName} for Grade/Class ${options.grade}.`;
  } else if (options.source === "campus") {
    defaultMessage = "Hello Swayambhoo International School, I would like to book a guided campus tour at Wazirganj.";
  } else if (options.source === "facility") {
    defaultMessage = "Hello Swayambhoo International School, I would like to know more about your academic and sports facilities.";
  } else if (options.source === "contact") {
    defaultMessage = "Hello Swayambhoo International School, I have an enquiry regarding admissions and school timings.";
  }

  const encodedMessage = encodeURIComponent(options.message || defaultMessage);
  return `https://wa.me/${number}?text=${encodedMessage}`;
}

export const OFFICIAL_WHATSAPP_NUMBER = siteConfig.contact.whatsapp;
export const OFFICIAL_PHONE_NUMBER = siteConfig.contact.phone;
