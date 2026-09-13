import React from "react";
import Link from "next/link";
import { Bell, ArrowRight } from "lucide-react";
import { getPublishedAnnouncements, getSiteSettings } from "@/lib/data/school";

export async function AnnouncementsTicker() {
  const settings = await getSiteSettings();
  if (settings.announcement_ticker_enabled === "false") {
    return null;
  }

  const announcements = await getPublishedAnnouncements();
  if (!announcements || announcements.length === 0) {
    return null;
  }

  const latest = announcements[0];

  return (
    <div className="bg-[#14342B] border-b border-[#C5A059]/30 text-white text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-[#C5A059] text-[#0E241B] font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Bell className="w-3 h-3" /> Announcement
          </span>
          <span className="font-medium text-stone-200 line-clamp-1">
            {latest.title}: {latest.summary}
          </span>
        </div>
        <Link
          href="/admissions"
          className="text-[#C5A059] hover:text-white font-semibold text-[11px] inline-flex items-center gap-1 transition-colors whitespace-nowrap"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
