import React from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getUpcomingEvents } from "@/lib/data/school";

export async function UpcomingEventsSection() {
  const events = await getUpcomingEvents();
  if (!events || events.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#DEDCCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B88A2A]">
            Institutional Calendar
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F4735] mt-2">
            Upcoming Campus Events
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#26332E] leading-relaxed font-sans">
            Join our school community for academic vision workshops, orientation symposiums, and student showcases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((evt) => {
            const dateObj = new Date(evt.startDate);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString("en-US", { month: "short" });

            return (
              <div
                key={evt.id}
                className="bg-[#F7F3E8] rounded-none border border-[#DEDCCF] p-6 shadow-xs hover:border-[#B88A2A] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-14 bg-[#0F4735] text-white rounded-none flex flex-col items-center justify-center font-serif shadow-xs flex-shrink-0">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4B15A]">
                        {month}
                      </span>
                      <span className="text-lg font-bold leading-none mt-0.5">
                        {day}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#0F4735] line-clamp-2">
                        {evt.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-[#26332E]/80">
                        <MapPin className="w-3 h-3 text-[#B88A2A]" />
                        <span className="line-clamp-1">{evt.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-[#26332E]/80 leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#DEDCCF] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#26332E]/80">
                    {dateObj.toLocaleDateString("en-IN", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-[#0F4735] hover:text-[#B88A2A] flex items-center gap-1 transition-colors"
                  >
                    <span>RSVP</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
