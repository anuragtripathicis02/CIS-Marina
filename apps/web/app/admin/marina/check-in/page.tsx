'use client';

import React, { useState } from 'react';

export default function MarinaCheckInPage() {
  const [selectedResId, setSelectedResId] = useState('res-101');
  const [actionType, setActionType] = useState<'CHECK_IN' | 'CHECK_OUT'>('CHECK_IN');
  const [conditionRating, setConditionRating] = useState('5');
  const [conditionNotes, setConditionNotes] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleProcessAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    const endpoint = actionType === 'CHECK_IN' ? 'check-in' : 'check-out';

    try {
      let res: Response;
      const body = JSON.stringify({
        staffUserId: 'user-1',
        conditionRating: parseInt(conditionRating, 10),
        conditionNotes,
      });

      try {
        res = await fetch(`/api/v1/berth-reservations/${selectedResId}/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch(`http://localhost:4000/api/v1/berth-reservations/${selectedResId}/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      }

      const json = await res.json();
      if (json.success) {
        setStatusMsg(`✓ Vessel ${actionType === 'CHECK_IN' ? 'Checked In to Berth' : 'Checked Out from Berth'} successfully!`);
        setConditionNotes('');
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">MARINA DOCKMASTER OPERATIONS</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Vessel Check-In &amp; Check-Out Console</h1>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-mono font-bold">
          {statusMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Execute Check-In / Out */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Dockmaster Movement Runner
          </h2>

          <form onSubmit={handleProcessAction} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Select Berth Reservation *</label>
              <select
                value={selectedResId}
                onChange={(e) => setSelectedResId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
              >
                <option value="res-101">Ocean Pearl 115 — Berth Slip A-01 (Guest: Lord Sterling)</option>
                <option value="res-102">Azure Horizon 88 — Berth Slip A-03 (Guest: Elena Rostova)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Movement Action *</label>
              <div className="grid grid-cols-2 gap-3 font-bold font-mono">
                <button
                  type="button"
                  onClick={() => setActionType('CHECK_IN')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    actionType === 'CHECK_IN'
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ↓ Vessel Check-In
                </button>
                <button
                  type="button"
                  onClick={() => setActionType('CHECK_OUT')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    actionType === 'CHECK_OUT'
                      ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ↑ Vessel Check-Out
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Berth &amp; Vessel Condition Rating (1 - 5 Stars)</label>
              <select
                value={conditionRating}
                onChange={(e) => setConditionRating(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
              >
                <option value="5">5 Stars — Excellent / Pristine Condition</option>
                <option value="4">4 Stars — Good / Standard Wear</option>
                <option value="3">3 Stars — Moderate / Minor Utility Wear</option>
                <option value="2">2 Stars — Poor / Utility Damage Reported (Flag Issue)</option>
                <option value="1">1 Star — Critical Damage Reported (Flag Issue)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Condition Notes &amp; Staff Remarks</label>
              <textarea
                rows={3}
                placeholder="Record arrival/departure condition, shore power hookup, fuel meter reading..."
                value={conditionNotes}
                onChange={(e) => setConditionNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Confirm &amp; Record {actionType === 'CHECK_IN' ? 'Check-In' : 'Check-Out'} →
            </button>
          </form>
        </div>

        {/* Right Audit Log */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Recent Dockmaster Movement Log
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Ocean Pearl 115 • Slip A-01</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">CHECK_IN</span>
              </div>
              <p className="text-slate-600">Condition Rating: 5/5 ⭐ • Shore power 100A connected cleanly.</p>
              <div className="text-[10px] text-slate-400 font-mono">Timestamp: 2 hours ago • Staff: Michelle Rivera</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Sea Majesty 130 • Slip B-01</span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-mono font-bold text-[10px]">CHECK_OUT</span>
              </div>
              <p className="text-slate-600">Condition Rating: 5/5 ⭐ • Check-out complete. Zero outstanding charges.</p>
              <div className="text-[10px] text-slate-400 font-mono">Timestamp: Yesterday 16:30 • Staff: Capt. Harrison</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
