'use client';

import React from 'react';
import Link from 'next/link';

export default function VesselOperationalHistoryPage({ params }: { params: { id: string } }) {
  const timelineSteps = [
    {
      title: 'Charter Booking Confirmed (#BK-1024)',
      time: 'August 20, 2026 • 10:00 AM',
      status: 'COMPLETED',
      detail: 'Customer Lord Sterling reserved Ocean Pearl 115 for half-day charter.',
    },
    {
      title: 'Crew Assigned (Captain Jean-Luc Picard & First Officer Riker)',
      time: 'August 21, 2026 • 02:30 PM',
      status: 'COMPLETED',
      detail: 'Master 3000 GT Captain and Chief Mate validated without scheduling conflicts.',
    },
    {
      title: 'Pre-Charter Departure Checklist Executed',
      time: 'August 22, 2026 • 09:00 AM',
      status: 'COMPLETED',
      detail: '7/7 safety equipment, SOLAS life rafts, and fuel bunker items completed.',
    },
    {
      title: 'Pre-Charter Safety Inspection Passed',
      time: 'August 22, 2026 • 11:15 AM',
      status: 'COMPLETED',
      detail: 'Engine, hull, and VHF electronics passed 100%.',
    },
    {
      title: 'Yacht Operational Status Set to READY',
      time: 'August 22, 2026 • 11:30 AM',
      status: 'ACTIVE',
      detail: 'All readiness rules satisfied. Ready for guest embarkation.',
    },
    {
      title: 'Charter Completed & Guest Disembarked',
      time: 'August 23, 2026 • 06:00 PM',
      status: 'UPCOMING',
      detail: 'Charter completed smoothly. Post-charter inspection scheduled.',
    },
  ];

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto font-sans">
      
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <Link href="/admin/operations/fleet" className="text-xs text-teal-700 font-semibold hover:underline">
            ← Back to Fleet Readiness
          </Link>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-1">Ocean Pearl 115 — Operational History</h1>
          <p className="text-slate-500 text-xs mt-0.5">Majesty Yachts • 115 ft • Reg: MC-9941-X</p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono font-bold text-xs">
          READY FOR CHARTER
        </span>
      </div>

      {/* Operational History Timeline */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Vessel Lifecycle &amp; Operational Timeline
        </h2>

        <div className="relative border-l-2 border-slate-200 pl-6 space-y-8 ml-3">
          {timelineSteps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Bullet */}
              <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-teal-600 border-2 border-white ring-4 ring-slate-100" />
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
                  <span className="text-[11px] font-mono text-slate-400">{step.time}</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
