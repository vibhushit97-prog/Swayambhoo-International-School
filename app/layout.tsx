import type { Metadata, Viewport } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { FloatingRecruitmentCTA } from "@/components/recruitment/FloatingRecruitmentCTA";
import { StructuredData } from "@/components/seo/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#0F4735",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Wazirganj, Gaya, Bihar`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Swayambhoo International School",
    "Best School in Gaya Bihar",
    "Schools in Wazirganj Gaya",
    "International School Bihar",
    "Top K-12 School Gaya",
    "Smart School Bihar",
    "Robotics School Gaya",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.images.campus.main,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Architectural Visualization`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.images.campus.main],
  },
  icons: {
    icon: "/logo/swayambhoo-emblem.svg",
    apple: "/logo/swayambhoo-emblem.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable} scroll-smooth`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F7F3E8] text-[#26332E] antialiased selection:bg-[#B88A2A] selection:text-white">
        <Navbar />
        <main id="main-content" className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <FloatingRecruitmentCTA />
      </body>
    </html>
  );
}
