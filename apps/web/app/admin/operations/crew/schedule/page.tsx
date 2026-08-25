'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CrewSchedulePage() {
  const [crew, setCrew] = useState<any[]>([]);
  const [bookingId, setBookingId] = useState('b1');
  const [selectedCrewId, setSelectedCrewId] = useState('crew-1');
  const [roleAssigned, setRoleAssigned] = useState('CAPTAIN');
  const [startTime, setStartTime] = useState('2026-09-01T10:00');
  const [endTime, setEndTime] = useState('2026-09-01T18:00');
  
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/crew')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setCrew(json.data);
        }
      })
      .catch(() => {});

    fetch('http://localhost:4000/api/v1/crew/assignments/booking/b1')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setAssignments(json.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      let res: Response;
      const body = JSON.stringify({
        bookingId,
        crewMemberId: selectedCrewId,
        roleAssigned,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
      });

      try {
        res = await fetch('/api/v1/crew/assignments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
      } catch (e) {
        res = await fetch('http://localhost:4000/api/v1/crew/assignments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
      }

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || json.error?.message || 'Crew member has an overlapping charter assignment conflict.');
      }

      setSuccessMsg(`Successfully assigned crew member to charter!`);
      setAssignments((prev) => [...prev, json.data]);
    } catch (err: any) {
      setErrorMsg(err.message || 'Conflict protection rejected assignment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <Link href="/admin/operations/crew" className="text-xs text-teal-700 font-semibold hover:underline">
            ← Back to Crew Management
          </Link>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Crew Conflict-Aware Scheduling Engine</h1>
        </div>
      </div>

      {/* Assignment Wizard & Alert Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Assign Crew to Booking */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Assign Crew Member to Charter Booking
          </h2>

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-medium space-y-1">
              <strong className="block text-red-700">⚠️ CONFLICT REJECTION:</strong>
              <div>{errorMsg}</div>
            </div>
          )}

          {successMsg && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium">
              ✓ {successMsg}
            </div>
          )}

          <form onSubmit={handleAssign} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Target Booking Reference</label>
              <input
                type="text"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Select Crew Member *</label>
              <select
                value={selectedCrewId}
                onChange={(e) => setSelectedCrewId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900"
              >
                {crew.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName} ({c.role}) — Status: {c.status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Assigned Charter Role *</label>
              <select
                value={roleAssigned}
                onChange={(e) => setRoleAssigned(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900"
              >
                <option value="CAPTAIN">CAPTAIN (Master 3000 GT)</option>
                <option value="FIRST_OFFICER">FIRST OFFICER</option>
                <option value="ENGINEER">CHIEF ENGINEER</option>
                <option value="CHEF">CHEF DE CUISINE</option>
                <option value="STEWARD">STEWARD / STEWARDESS</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Start Time *</label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">End Time *</label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Validating Conflicts...' : 'Validate & Save Crew Assignment →'}
            </button>
          </form>
        </div>

        {/* Right Column: Confirmed Active Assignments */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Active Charter Crew Roster
          </h2>

          <div className="space-y-3">
            {assignments.map((asg) => (
              <div key={asg.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    {asg.crewMember?.firstName} {asg.crewMember?.lastName}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                    {asg.status}
                  </span>
                </div>
                <div className="text-slate-600">
                  Role: <span className="font-bold text-teal-700">{asg.roleAssigned}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {new Date(asg.startTime).toLocaleString()} — {new Date(asg.endTime).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
