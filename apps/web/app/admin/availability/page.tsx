'use client';

import React from 'react';

export default function AdminAvailabilityPage() {
  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800">Visual Multi-Yacht Availability Calendar</h1>
          <p className="text-slate-500 text-xs mt-0.5">Manage vessel readiness, blackout maintenance dates, and charter allocations</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-800">September 2026 Fleet Schedule</div>
          <div className="flex space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">● AVAILABLE</span>
            <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 font-semibold border border-amber-200">● RESERVED</span>
            <span className="px-2.5 py-1 rounded bg-red-50 text-red-700 font-semibold border border-red-200">● BLOCKED / MAINTENANCE</span>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* Yacht 1 Timeline */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800">Ocean Pearl 115 (Superyacht)</div>
            <div className="grid grid-cols-7 gap-2 text-center text-[10px]">
              <div className="p-2 rounded bg-emerald-100/80 border border-emerald-300 text-emerald-900">Sep 01 - FREE</div>
              <div className="p-2 rounded bg-amber-100/80 border border-amber-300 text-amber-900 font-bold">Sep 02 - CHARTER</div>
              <div className="p-2 rounded bg-amber-100/80 border border-amber-300 text-amber-900 font-bold">Sep 03 - CHARTER</div>
              <div className="p-2 rounded bg-emerald-100/80 border border-emerald-300 text-emerald-900">Sep 04 - FREE</div>
              <div className="p-2 rounded bg-red-100/80 border border-red-300 text-red-900 font-bold">Sep 05 - YARD MAINT</div>
              <div className="p-2 rounded bg-emerald-100/80 border border-emerald-300 text-emerald-900">Sep 06 - FREE</div>
              <div className="p-2 rounded bg-emerald-100/80 border border-emerald-300 text-emerald-900">Sep 07 - FREE</div>
            </div>
          </div>

          {/* Yacht 2 Timeline */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800">Azure Horizon 88 (Flybridge)</div>
            <div className="grid grid-cols-7 gap-2 text-center text-[10px]">
              <div className="p-2 rounded bg-emerald-100/80 border border-emerald-300 text-emerald-900">Sep 01 - FREE</div>
              <div className="p-2 rounded bg-emerald-100/80 border border-emerald-300 text-emerald-900">Sep 02 - FREE</div>
              <div className="p-2 rounded bg-amber-100/80 border border-amber-300 text-amber-900 font-bold">Sep 03 - CHARTER</div>
              <div className="p-2 rounded bg-amber-100/80 border border-amber-300 text-amber-900 font-bold">Sep 04 - CHARTER</div>
              <div className="p-2 rounded bg-emerald-100/80 border border-emerald-300 text-emerald-900">Sep 05 - FREE</div>
              <div className="p-2 rounded bg-emerald-100/80 border border-emerald-300 text-emerald-900">Sep 06 - FREE</div>
              <div className="p-2 rounded bg-emerald-100/80 border border-emerald-300 text-emerald-900">Sep 07 - FREE</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
