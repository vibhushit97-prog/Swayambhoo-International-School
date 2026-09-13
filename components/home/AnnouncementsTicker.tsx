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
    <div className="bg-[#083526] border-b border-[#B88A2A]/40 text-[#F7F3E8] text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-[#B88A2A] text-[#083526] font-bold text-[10px] px-2.5 py-0.5 uppercase tracking-wider flex items-center gap-1">
            <Bell className="w-3 h-3" /> Announcement
          </span>
          <span className="font-medium text-[#F7F3E8]/90 line-clamp-1">
            {latest.title}: {latest.summary}
          </span>
        </div>
        <Link
          href="/admissions"
          className="text-[#D4B15A] hover:text-white font-semibold text-[11px] inline-flex items-center gap-1 transition-colors whitespace-nowrap"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
