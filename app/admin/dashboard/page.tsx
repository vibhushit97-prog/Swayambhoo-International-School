"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  UserCheck,
  Sparkles,
  Images,
  Bell,
  Calendar,
  ArrowRight,
  Phone,
  Clock,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface DashboardData {
  counts: {
    totalEnquiries: number;
    newEnquiries: number;
    facilities: number;
    galleryImages: number;
    announcements: number;
    upcomingEvents: number;
  };
  recentEnquiries: Array<{
    id: string;
    studentName: string;
    parentName: string;
    applyingFor: string;
    phone: string;
    status: string;
    createdAt: string;
  }>;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      // Fetch enquiries
      const enqRes = await fetch("/api/admin/admissions");
      const enqData = await enqRes.json();

      // Fetch facilities
      const facRes = await fetch("/api/admin/facilities");
      const facData = await facRes.json();

      // Fetch gallery
      const galRes = await fetch("/api/admin/gallery");
      const galData = await galRes.json();

      // Fetch announcements
      const annRes = await fetch("/api/admin/announcements");
      const annData = await annRes.json();

      // Fetch events
      const evtRes = await fetch("/api/admin/events");
      const evtData = await evtRes.json();

      const totalEnquiries = enqData.counts?.TOTAL || 0;
      const newEnquiries = enqData.counts?.NEW || 0;
      const facilities = facData.facilities?.length || 0;
      const galleryImages = galData.images?.length || 0;
      const announcements = annData.announcements?.length || 0;
      const upcomingEvents = evtData.events?.length || 0;

      setData({
        counts: {
          totalEnquiries,
          newEnquiries,
          facilities,
          galleryImages,
          announcements,
          upcomingEvents,
        },
        recentEnquiries: (enqData.enquiries || []).slice(0, 6),
      });
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      fetch("/api/admin/admissions").then((r) => r.json()),
      fetch("/api/admin/facilities").then((r) => r.json()),
      fetch("/api/admin/gallery").then((r) => r.json()),
      fetch("/api/admin/announcements").then((r) => r.json()),
      fetch("/api/admin/events").then((r) => r.json()),
    ])
      .then(([enqData, facData, galData, annData, evtData]) => {
        if (!isMounted) return;
        setData({
          counts: {
            totalEnquiries: enqData.counts?.TOTAL || 0,
            newEnquiries: enqData.counts?.NEW || 0,
            facilities: facData.facilities?.length || 0,
            galleryImages: galData.images?.length || 0,
            announcements: annData.announcements?.length || 0,
            upcomingEvents: evtData.events?.length || 0,
          },
          recentEnquiries: (enqData.enquiries || []).slice(0, 6),
        });
      })
      .catch((e) => console.error(e))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/admissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            recentEnquiries: prev.recentEnquiries.map((e) =>
              e.id === id ? { ...e, status: newStatus } : e
            ),
          };
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-stone-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#14342B]" />
        <p className="mt-3 text-xs uppercase tracking-wider font-semibold">
          Loading Administrative Dashboard...
        </p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Admission Enquiries",
      value: data?.counts.totalEnquiries || 0,
      icon: Users,
      color: "bg-blue-50 text-blue-800 border-blue-100",
      iconColor: "text-blue-600",
      href: "/admin/admissions",
    },
    {
      title: "New Enquiries",
      value: data?.counts.newEnquiries || 0,
      icon: UserCheck,
      color: "bg-amber-50 text-amber-900 border-amber-200",
      iconColor: "text-amber-600",
      badge: "Needs Action",
      href: "/admin/admissions?status=NEW",
    },
    {
      title: "Campus Facilities",
      value: data?.counts.facilities || 0,
      icon: Sparkles,
      color: "bg-emerald-50 text-emerald-900 border-emerald-100",
      iconColor: "text-emerald-700",
      href: "/admin/facilities",
    },
    {
      title: "Gallery Images",
      value: data?.counts.galleryImages || 0,
      icon: Images,
      color: "bg-purple-50 text-purple-900 border-purple-100",
      iconColor: "text-purple-600",
      href: "/admin/gallery",
    },
    {
      title: "Announcements & News",
      value: data?.counts.announcements || 0,
      icon: Bell,
      color: "bg-orange-50 text-orange-900 border-orange-100",
      iconColor: "text-orange-600",
      href: "/admin/announcements",
    },
    {
      title: "Upcoming Events",
      value: data?.counts.upcomingEvents || 0,
      icon: Calendar,
      color: "bg-teal-50 text-teal-900 border-teal-100",
      iconColor: "text-teal-600",
      href: "/admin/events",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#14342B] to-[#0E241B] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#C5A059]/20 border border-[#C5A059]/40 rounded-full text-[11px] font-semibold text-[#C5A059] uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3 h-3" /> Swayambhoo Administration v2.0
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Welcome, Administrator
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
            Oversee admissions pipeline, publish news, manage facilities, and curate campus imagery with full database synchronization.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className={`p-5 rounded-xl border bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between group`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-stone-600 tracking-wide uppercase">
                    {card.title}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-2">
                    {card.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 group-hover:text-[#14342B]">
                <span className="font-medium">Manage Records</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries CRM Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:px-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Recent Admissions Enquiries
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Live prospective student intake pipeline from online applications
            </p>
          </div>
          <Link
            href="/admin/admissions"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14342B] hover:text-[#C5A059] transition-colors"
          >
            <span>View All Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {data?.recentEnquiries && data.recentEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Student</th>
                  <th className="py-3.5 px-4">Parent</th>
                  <th className="py-3.5 px-4">Class</th>
                  <th className="py-3.5 px-4">Contact Phone</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 sm:px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {data.recentEnquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-4 sm:px-6 font-semibold text-stone-900">
                      {e.studentName}
                    </td>
                    <td className="py-3 px-4 text-stone-700">{e.parentName}</td>
                    <td className="py-3 px-4 text-stone-600">
                      <span className="px-2 py-0.5 bg-stone-100 rounded text-[11px]">
                        {e.applyingFor}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-mono">
                      <a
                        href={`tel:${e.phone}`}
                        className="inline-flex items-center gap-1 hover:text-[#14342B]"
                      >
                        <Phone className="w-3 h-3 text-stone-400" />
                        <span>{e.phone}</span>
                      </a>
                    </td>
                    <td className="py-3 px-4 text-stone-500 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span>{new Date(e.createdAt).toLocaleDateString("en-IN")}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={e.status} type="enquiry" />
                        <select
                          value={e.status}
                          disabled={updatingId === e.id}
                          onChange={(ev) => handleStatusChange(e.id, ev.target.value)}
                          className="text-[11px] py-0.5 px-1.5 bg-white border border-stone-300 rounded text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#14342B]"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="FOLLOW_UP">FOLLOW_UP</option>
                          <option value="CONVERTED">CONVERTED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-stone-500 text-xs">
            No admission enquiries recorded yet.
          </div>
        )}
      </div>
    </div>
  );
}
