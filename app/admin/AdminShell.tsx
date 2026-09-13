"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

const titleMap: Record<string, string> = {
  "/admin/dashboard": "Dashboard Overview",
  "/admin/admissions": "Admissions Enquiries CRM",
  "/admin/messages": "Contact Messages",
  "/admin/school-profile": "School Profile CMS",
  "/admin/academics": "Academic Stages & Streams",
  "/admin/facilities": "Campus Facilities CMS",
  "/admin/gallery": "Photo & Campus Gallery CMS",
  "/admin/announcements": "Announcements & Notices",
  "/admin/events": "Events Calendar CMS",
  "/admin/settings": "System & Site Settings",
};

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on the login page, render clean standalone view
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const title = titleMap[pathname] || "Administration Portal";

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
