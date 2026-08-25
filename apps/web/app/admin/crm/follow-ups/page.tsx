'use client';

import React, { useEffect, useState } from 'react';

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/crm/follow-ups')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setFollowUps(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">SALES TASKS &amp; REMINDERS</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Sales Follow-Up Tasks</h1>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Scheduled Lead &amp; Customer Follow-Ups ({followUps.length})
        </h2>

        <div className="space-y-3">
          {followUps.map((fu) => (
            <div key={fu.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">
                  {fu.lead?.name || 'Harrison Sterling'} — {fu.notes}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-mono font-bold text-[10px] uppercase ${
                    fu.status === 'OVERDUE'
                      ? 'bg-red-100 text-red-800 border border-red-300 animate-pulse'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {fu.status}
                </span>
              </div>

              <div className="text-slate-600 flex items-center justify-between font-mono text-[11px]">
                <span>Contact: {fu.lead?.email}</span>
                <span>Priority: <span className="font-bold text-slate-900">{fu.priority}</span></span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Due Date: {new Date(fu.dueDate).toLocaleString()}</span>
                <button className="px-3 py-1 rounded-lg bg-teal-600 text-white font-bold text-[10px] cursor-pointer">
                  Mark Completed ✓
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
