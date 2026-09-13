"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
  Clock,
  GraduationCap,
} from "lucide-react";

interface PositionRecord {
  id: string;
  title: string;
  code: string | null;
  department: string;
  subjects: string[];
  minQualification: string;
  minExperience: number;
  vacancies: number;
  employmentType: string;
  description: string | null;
  responsibilities: string | null;
  requirements: string | null;
  deadline: string | null;
  isActive: boolean;
  displayOrder: number;
  _count?: { applications: number };
}

export default function AdminPositionsManagementPage() {
  const [positions, setPositions] = useState<PositionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    code: "",
    department: "Senior Secondary Academics",
    subjects: "",
    minQualification: "",
    minExperience: 2,
    vacancies: 1,
    employmentType: "Full Time",
    description: "",
    responsibilities: "",
    requirements: "",
    deadline: "",
    isActive: true,
    displayOrder: 0,
  });

  const fetchPositions = async () => {
    try {
      const res = await fetch("/api/admin/recruitment/positions");
      const data = await res.json();
      if (data.success) {
        setPositions(data.positions || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({
      title: "",
      code: "",
      department: "Senior Secondary Academics",
      subjects: "",
      minQualification: "",
      minExperience: 2,
      vacancies: 1,
      employmentType: "Full Time",
      description: "",
      responsibilities: "",
      requirements: "",
      deadline: "",
      isActive: true,
      displayOrder: positions.length + 1,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (pos: PositionRecord) => {
    setEditingId(pos.id);
    setForm({
      title: pos.title,
      code: pos.code || "",
      department: pos.department,
      subjects: pos.subjects.join(", "),
      minQualification: pos.minQualification,
      minExperience: pos.minExperience,
      vacancies: pos.vacancies,
      employmentType: pos.employmentType,
      description: pos.description || "",
      responsibilities: pos.responsibilities || "",
      requirements: pos.requirements || "",
      deadline: pos.deadline ? new Date(pos.deadline).toISOString().split("T")[0] : "",
      isActive: pos.isActive,
      displayOrder: pos.displayOrder,
    });
    setShowModal(true);
  };

  const handleToggleActive = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/recruitment/positions/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchPositions();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...form,
        subjects: form.subjects
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        minExperience: Number(form.minExperience),
        vacancies: Number(form.vacancies),
        displayOrder: Number(form.displayOrder),
      };

      const url = editingId
        ? `/api/admin/recruitment/positions/${editingId}`
        : "/api/admin/recruitment/positions";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchPositions();
      } else {
        alert(data.message || "Failed to save position");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-stone-900">
            Faculty Vacancy Management
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Create, edit, and toggle active status for open teacher positions.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#14342B] hover:bg-[#1E4D40] text-[#C5A059] text-xs font-bold rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Vacancy</span>
        </button>
      </div>

      {/* Positions Table */}
      <div className="bg-white border border-stone-200 rounded-xl shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center">
            <Loader2 className="w-7 h-7 animate-spin text-[#C5A059] mx-auto" />
            <span className="text-xs text-stone-500 mt-2 block">Loading positions...</span>
          </div>
        ) : positions.length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-500">
            No vacancies defined yet. Click &quot;Create New Vacancy&quot; to add one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Title & Code</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Min. Qualification</th>
                  <th className="py-3 px-4">Exp. (Yrs)</th>
                  <th className="py-3 px-4">Vacancies</th>
                  <th className="py-3 px-4">Applications</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {positions.map((pos) => (
                  <tr key={pos.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900">{pos.title}</div>
                      {pos.code && (
                        <span className="text-[10px] text-stone-400 font-mono">
                          {pos.code}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-700">
                      {pos.department}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 max-w-[200px] truncate">
                      {pos.minQualification}
                    </td>
                    <td className="py-3.5 px-4 text-stone-800 font-semibold">
                      {pos.minExperience} Yrs
                    </td>
                    <td className="py-3.5 px-4 text-stone-800 font-semibold">
                      {pos.vacancies}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-800 font-bold text-[10px]">
                        {pos._count?.applications || 0}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(pos.id)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors ${
                          pos.isActive
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-stone-200 text-stone-600 hover:bg-stone-300"
                        }`}
                      >
                        {pos.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(pos)}
                          className="p-1 text-stone-500 hover:text-stone-900"
                          title="Edit Position"
                        >
                          <Edit2 className="w-4 h-4" />
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

      {/* Position Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-[#14342B]">
                {editingId ? "Edit Job Position" : "Create New Job Position"}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block font-semibold mb-1">
                    Position Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. PGT Physics, TGT Hindi, School Counsellor"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Position Code</label>
                  <input
                    type="text"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    placeholder="e.g. PGT-PHY"
                    className="w-full px-3 py-2 border rounded-lg font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    placeholder="e.g. Senior Secondary Academics"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold mb-1">
                    Subjects (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={form.subjects}
                    onChange={(e) => setForm({ ...form, subjects: e.target.value })}
                    placeholder="e.g. Physics, Applied Physics, Astronomy"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold mb-1">
                    Minimum Qualification <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.minQualification}
                    onChange={(e) => setForm({ ...form, minQualification: e.target.value })}
                    placeholder="e.g. M.Sc Physics with B.Ed"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Min. Experience (Years)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.minExperience}
                    onChange={(e) => setForm({ ...form, minExperience: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Vacancies</label>
                  <input
                    type="number"
                    min={1}
                    value={form.vacancies}
                    onChange={(e) => setForm({ ...form, vacancies: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Employment Type</label>
                  <select
                    value={form.employmentType}
                    onChange={(e) => setForm({ ...form, employmentType: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold mb-1">Job Description</label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="col-span-2">
                  <label className="flex items-center gap-2 font-semibold cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                      className="rounded"
                    />
                    <span>Active (Display on Public Vacancy Board)</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-stone-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#14342B] text-[#C5A059] font-bold rounded-lg"
                >
                  {saving ? "Saving..." : editingId ? "Update Vacancy" : "Create Vacancy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
