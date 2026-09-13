"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Download,
  Search,
  Phone,
  Mail,
  Clock,
  Trash2,
  Edit,
  Loader2,
  RefreshCw,
  MessageCircle,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { CLASS_OPTIONS } from "@/lib/constants";

interface Enquiry {
  id: string;
  studentName: string;
  parentName: string;
  phone: string;
  whatsapp: string | null;
  email: string;
  currentClass: string;
  applyingFor: string;
  academicSession: string;
  message: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

export default function AdminAdmissionsPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [classFilter, setClassFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Actions
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const fetchEnquiries = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (classFilter !== "ALL") params.set("class", classFilter);
      if (searchQuery.trim()) params.set("search", searchQuery.trim());

      const res = await fetch(`/api/admin/admissions?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
        setCounts(data.counts || {});
      }
    } catch (e) {
      console.error("Failed to load enquiries:", e);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, classFilter, searchQuery]);

  useEffect(() => {
    let isMounted = true;
    const params = new URLSearchParams();
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (classFilter !== "ALL") params.set("class", classFilter);
    if (searchQuery.trim()) params.set("search", searchQuery.trim());

    fetch(`/api/admin/admissions?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success) {
          setEnquiries(data.enquiries);
          setCounts(data.counts || {});
        }
      })
      .catch((e) => console.error(e))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [statusFilter, classFilter, searchQuery]);

  const handleOpenEdit = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setEditStatus(enquiry.status);
    setEditNotes(enquiry.notes || "");
  };

  const handleSaveDetails = async () => {
    if (!selectedEnquiry) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/admissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedEnquiry.id,
          status: editStatus,
          notes: editNotes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((item) =>
            item.id === selectedEnquiry.id
              ? { ...item, status: editStatus, notes: editNotes }
              : item
          )
        );
        setSelectedEnquiry(null);
      }
    } catch (e) {
      console.error("Save error:", e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetch(`/api/admin/admissions?id=${deleteTargetId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((item) => item.id !== deleteTargetId));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDeleteTargetId(null);
    }
  };

  const handleExportCsv = () => {
    const params = new URLSearchParams();
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (classFilter !== "ALL") params.set("class", classFilter);
    window.open(`/api/admin/admissions/export?${params.toString()}`, "_blank");
  };

  const tabs = [
    { key: "ALL", label: "All Enquiries", count: counts.TOTAL || 0 },
    { key: "NEW", label: "New", count: counts.NEW || 0 },
    { key: "CONTACTED", label: "Contacted", count: counts.CONTACTED || 0 },
    { key: "FOLLOW_UP", label: "Follow Up", count: counts.FOLLOW_UP || 0 },
    { key: "CONVERTED", label: "Converted", count: counts.CONVERTED || 0 },
    { key: "CLOSED", label: "Closed", count: counts.CLOSED || 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            Admissions CRM
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Track, qualify, and convert prospective student applications
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchEnquiries()}
            className="p-2 bg-white border border-stone-200 rounded-lg text-stone-600 hover:text-stone-900 shadow-xs"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#14342B] hover:bg-[#0E241B] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#C5A059]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex overflow-x-auto border-b border-stone-200 gap-2 pb-px scrollbar-none">
        {tabs.map((tab) => {
          const isActive = statusFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`pb-3 px-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? "border-[#14342B] text-[#14342B] font-semibold"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive
                    ? "bg-[#14342B] text-white"
                    : "bg-stone-100 text-stone-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student, parent, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#14342B]"
          />
        </div>
        <div>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="w-full py-2 px-3 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#14342B]"
          >
            <option value="ALL">All Classes Applying</option>
            {CLASS_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-500 flex flex-col items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-[#14342B]" />
            <p className="mt-2 text-xs">Loading admissions data...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-stone-500 text-xs">
            No admission enquiries match the selected filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Student & Parent</th>
                  <th className="py-3.5 px-4">Class Applying</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Notes</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {enquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6">
                      <p className="font-semibold text-stone-900 text-sm">{e.studentName}</p>
                      <p className="text-stone-500 text-[11px] mt-0.5">
                        Parent: {e.parentName}
                      </p>
                      {e.currentClass && (
                        <p className="text-stone-400 text-[10px]">
                          Current: {e.currentClass}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 bg-stone-100 text-stone-800 rounded font-medium text-[11px]">
                        {e.applyingFor}
                      </span>
                      <p className="text-[10px] text-stone-400 mt-1">{e.academicSession}</p>
                    </td>
                    <td className="py-3.5 px-4 space-y-1">
                      <div className="flex items-center gap-1.5 font-mono text-stone-700">
                        <Phone className="w-3 h-3 text-stone-400" />
                        <a href={`tel:${e.phone}`} className="hover:underline">
                          {e.phone}
                        </a>
                      </div>
                      {e.whatsapp && (
                        <div className="flex items-center gap-1.5 font-mono text-emerald-700">
                          <MessageCircle className="w-3 h-3 text-emerald-600" />
                          <a
                            href={`https://wa.me/${e.whatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            className="hover:underline"
                          >
                            {e.whatsapp}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                        <Mail className="w-3 h-3 text-stone-400" />
                        <span>{e.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={e.status} type="enquiry" />
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      {e.notes ? (
                        <p className="text-stone-700 line-clamp-2 italic bg-stone-50 p-1.5 rounded border border-stone-100 text-[11px]">
                          {e.notes}
                        </p>
                      ) : (
                        <span className="text-stone-400 text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-stone-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span>{new Date(e.createdAt).toLocaleDateString("en-IN")}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(e)}
                          className="p-1.5 text-stone-600 hover:text-[#14342B] hover:bg-stone-100 rounded transition-colors"
                          title="Review & Update Notes"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(e.id)}
                          className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail & Notes Edit Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-stone-200 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
              Enquiry Details — {selectedEnquiry.studentName}
            </h3>

            <div className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-lg border border-stone-100">
                <div>
                  <span className="text-stone-500 uppercase font-semibold text-[10px]">
                    Student Name
                  </span>
                  <p className="font-medium text-stone-900 mt-0.5">
                    {selectedEnquiry.studentName}
                  </p>
                </div>
                <div>
                  <span className="text-stone-500 uppercase font-semibold text-[10px]">
                    Parent / Guardian
                  </span>
                  <p className="font-medium text-stone-900 mt-0.5">
                    {selectedEnquiry.parentName}
                  </p>
                </div>
                <div>
                  <span className="text-stone-500 uppercase font-semibold text-[10px]">
                    Applying For
                  </span>
                  <p className="font-medium text-stone-900 mt-0.5">
                    {selectedEnquiry.applyingFor}
                  </p>
                </div>
                <div>
                  <span className="text-stone-500 uppercase font-semibold text-[10px]">
                    Academic Session
                  </span>
                  <p className="font-medium text-stone-900 mt-0.5">
                    {selectedEnquiry.academicSession}
                  </p>
                </div>
              </div>

              {selectedEnquiry.message && (
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                  <span className="text-stone-500 uppercase font-semibold text-[10px]">
                    Parent Message
                  </span>
                  <p className="text-stone-800 mt-1 leading-relaxed">
                    {selectedEnquiry.message}
                  </p>
                </div>
              )}

              <div>
                <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                  Enquiry Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full py-2 px-3 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#14342B]"
                >
                  <option value="NEW">NEW — Newly Received</option>
                  <option value="CONTACTED">CONTACTED — Reached out via phone/email</option>
                  <option value="FOLLOW_UP">FOLLOW_UP — Campus visit or counseling scheduled</option>
                  <option value="CONVERTED">CONVERTED — Admission Confirmed / Registered</option>
                  <option value="CLOSED">CLOSED — Inactive or Declined</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                  Internal Administrative Notes
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record counsellor notes, follow-up callbacks, or fee discussion..."
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#14342B]"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={handleSaveDetails}
                className="px-4 py-2 text-xs font-medium text-white bg-[#14342B] hover:bg-[#0E241B] rounded-lg shadow-sm flex items-center gap-1.5 disabled:opacity-60"
              >
                {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Delete Admission Enquiry"
        message="Are you sure you want to delete this enquiry record? This action is permanent and cannot be undone."
        confirmLabel="Delete Enquiry"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
