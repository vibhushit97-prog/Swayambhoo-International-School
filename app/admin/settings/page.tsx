"use client";

import React, { useEffect, useState } from "react";
import { Save, Plus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  description: string | null;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // New Setting Form
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success) {
          setSettings(data.settings);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdate = async (setting: SiteSetting) => {
    setSavingKey(setting.key);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: setting.key,
          value: setting.value,
          description: setting.description,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update setting");
      }
      setSuccessMsg(`Setting '${setting.key}' updated successfully.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Error saving setting");
    } finally {
      setSavingKey(null);
    }
  };

  const handleCreateNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim()) return;
    setSavingKey("new");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: newKey.trim(),
          value: newValue,
          description: newDesc,
        }),
      });
      if (res.ok) {
        await fetchSettings();
        setNewKey("");
        setNewValue("");
        setNewDesc("");
        setSuccessMsg("New system setting added successfully.");
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingKey(null);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-stone-500 flex flex-col items-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#14342B]" />
        <p className="mt-2 text-xs">Loading system settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
          Site & System Settings
        </h2>
        <p className="text-xs text-stone-600 mt-1">
          Manage key-value toggles for admissions season, announcement tickers, and global school flags
        </p>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Settings List */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs divide-y divide-stone-100 overflow-hidden">
        {settings.map((s, idx) => (
          <div key={s.id || s.key} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <span className="font-mono text-xs font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                {s.key}
              </span>
              {s.description && (
                <p className="text-xs text-stone-500 mt-1">{s.description}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {s.key === "admissions_status" ? (
                <select
                  value={s.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSettings((prev) =>
                      prev.map((item, i) =>
                        i === idx ? { ...item, value: val } : item
                      )
                    );
                  }}
                  className="py-1.5 px-3 bg-white border border-stone-300 rounded-lg text-xs font-semibold"
                >
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="WAITLIST">WAITLIST</option>
                </select>
              ) : s.key === "announcement_ticker_enabled" ? (
                <select
                  value={s.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSettings((prev) =>
                      prev.map((item, i) =>
                        i === idx ? { ...item, value: val } : item
                      )
                    );
                  }}
                  className="py-1.5 px-3 bg-white border border-stone-300 rounded-lg text-xs font-semibold"
                >
                  <option value="true">ENABLED (true)</option>
                  <option value="false">DISABLED (false)</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={s.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSettings((prev) =>
                      prev.map((item, i) =>
                        i === idx ? { ...item, value: val } : item
                      )
                    );
                  }}
                  className="py-1.5 px-3 bg-white border border-stone-300 rounded-lg text-xs w-60"
                />
              )}

              <button
                type="button"
                disabled={savingKey === s.key}
                onClick={() => handleUpdate(s)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#14342B] hover:bg-[#0E241B] text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-60 cursor-pointer"
              >
                {savingKey === s.key ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5 text-[#C5A059]" />
                )}
                <span>Update</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Setting Card */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
          Add Custom Parameter / Setting
        </h3>
        <form onSubmit={handleCreateNew} className="mt-4 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                Setting Key
              </label>
              <input
                type="text"
                required
                placeholder="e.g. emergency_notice"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg font-mono text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
                Value
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Campus closed tomorrow for holiday"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold uppercase text-stone-700 text-[10px] mb-1">
              Description (Optional)
            </label>
            <input
              type="text"
              placeholder="Context or developer notes..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={savingKey === "new"}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#14342B] hover:bg-[#0E241B] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Add Setting</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
