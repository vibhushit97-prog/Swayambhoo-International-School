"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Mail,
  Phone,
  Clock,
  Trash2,
  Edit,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

interface Message {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  notes: string | null;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const url =
        statusFilter === "ALL"
          ? "/api/admin/messages"
          : `/api/admin/messages?status=${statusFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
        setCounts(data.counts || {});
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    let isMounted = true;
    const url =
      statusFilter === "ALL"
        ? "/api/admin/messages"
        : `/api/admin/messages?status=${statusFilter}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success) {
          setMessages(data.messages);
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
  }, [statusFilter]);

  const handleOpenEdit = (msg: Message) => {
    setSelectedMessage(msg);
    setEditStatus(msg.status);
    setEditNotes(msg.notes || "");
  };

  const handleSave = async () => {
    if (!selectedMessage) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedMessage.id,
          status: editStatus,
          notes: editNotes,
        }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === selectedMessage.id
              ? { ...m, status: editStatus, notes: editNotes }
              : m
          )
        );
        setSelectedMessage(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetch(`/api/admin/messages?id=${deleteTargetId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== deleteTargetId));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDeleteTargetId(null);
    }
  };

  const tabs = [
    { key: "ALL", label: "All Messages", count: counts.TOTAL || 0 },
    { key: "UNREAD", label: "Unread", count: counts.UNREAD || 0 },
    { key: "READ", label: "Read", count: counts.READ || 0 },
    { key: "REPLIED", label: "Replied", count: counts.REPLIED || 0 },
    { key: "CLOSED", label: "Closed", count: counts.CLOSED || 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            Contact Messages
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            General inquiries and messages from the public contact page
          </p>
        </div>
        <button
          onClick={() => fetchMessages()}
          className="p-2 bg-white border border-stone-200 rounded-lg text-stone-600 hover:text-stone-900 shadow-xs"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-2 pb-px overflow-x-auto">
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

      {/* List */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-500 flex flex-col items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-[#14342B]" />
            <p className="mt-2 text-xs">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center text-stone-500 text-xs">
            No messages found in this category.
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {messages.map((m) => (
              <div key={m.id} className="p-5 hover:bg-stone-50/60 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-stone-900 text-sm">{m.fullName}</h4>
                      <StatusBadge status={m.status} type="message" />
                    </div>
                    <p className="text-xs font-medium text-[#14342B] mt-1">{m.subject}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{new Date(m.createdAt).toLocaleString("en-IN")}</span>
                    </div>
                    <button
                      onClick={() => handleOpenEdit(m)}
                      className="p-1 text-stone-600 hover:text-[#14342B] rounded"
                      title="Update Status"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTargetId(m.id)}
                      className="p-1 text-stone-400 hover:text-red-600 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="mt-3 text-xs text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-100 leading-relaxed">
                  {m.message}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-stone-600">
                  <span className="flex items-center gap-1 font-mono">
                    <Phone className="w-3 h-3 text-stone-400" />
                    <a href={`tel:${m.phone}`} className="hover:underline">
                      {m.phone}
                    </a>
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-stone-400" />
                    <a href={`mailto:${m.email}`} className="hover:underline">
                      {m.email}
                    </a>
                  </span>
                  {m.notes && (
                    <span className="text-stone-500 italic bg-amber-50/80 px-2 py-0.5 rounded border border-amber-200/50">
                      Note: {m.notes}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-stone-200">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
              Update Message Status
            </h3>
            <div className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                  Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full py-2 px-3 bg-white border border-stone-300 rounded-lg text-xs"
                >
                  <option value="UNREAD">UNREAD</option>
                  <option value="READ">READ</option>
                  <option value="REPLIED">REPLIED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                  Internal Notes
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record communication details..."
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={handleSave}
                className="px-4 py-2 text-xs font-medium text-white bg-[#14342B] hover:bg-[#0E241B] rounded-lg shadow-sm flex items-center gap-1.5"
              >
                {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Delete Message"
        message="Are you sure you want to delete this message record?"
        confirmLabel="Delete Message"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
