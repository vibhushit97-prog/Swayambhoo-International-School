"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Building,
  GraduationCap,
  Sparkles,
  Images,
  Bell,
  Calendar,
  Settings,
  ExternalLink,
  Shield,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Admissions CRM", href: "/admin/admissions", icon: Users },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "School Profile", href: "/admin/school-profile", icon: Building },
  { label: "Academics", href: "/admin/academics", icon: GraduationCap },
  { label: "Facilities", href: "/admin/facilities", icon: Sparkles },
  { label: "Gallery", href: "/admin/gallery", icon: Images },
  { label: "Announcements", href: "/admin/announcements", icon: Bell },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-xs"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0E241B] text-stone-200 border-r border-[#1C4334] flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Branding */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#1C4334]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059] flex items-center justify-center text-[#0E241B] font-serif font-bold text-base shadow-sm">
              S
            </div>
            <div>
              <span className="block font-serif font-bold text-sm tracking-wide text-white leading-tight">
                SWAYAMBHOO
              </span>
              <span className="block text-[10px] text-[#C5A059] tracking-wider uppercase font-sans">
                Admin Platform
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-[#8FA38F]">
            Administration & CMS
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#14342B] text-[#C5A059] border border-[#C5A059]/30 font-semibold shadow-xs"
                    : "text-stone-300 hover:bg-[#14342B]/60 hover:text-white"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-[#C5A059]" : "text-stone-400"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer / Quick View Site */}
        <div className="p-3 border-t border-[#1C4334] bg-[#0A1A13]/50">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-stone-300 hover:text-white hover:bg-[#14342B]/80 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Public Website</span>
            </div>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </Link>
        </div>
      </aside>
    </>
  );
}
