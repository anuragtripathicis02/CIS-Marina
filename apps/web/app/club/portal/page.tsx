'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function MemberPortalPage() {
  const [member, setMember] = useState<any>({
    name: 'Lord Arthur Sterling',
    membershipNumber: 'YC-2026-0001',
    planName: 'Gold Flagship Membership',
    status: 'ACTIVE',
    joinDate: 'Jan 15, 2024',
    expiryDate: 'Dec 31, 2026',
    benefits: [
      'Priority Berth Booking at Monaco Port Hercules',
      'Full Access to Club House Lounge & Dining Rooms',
      'VIP Regatta Invitations & Commodore GALA Access',
      '15% Discount on All Dockside Utility Services',
    ],
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
      
      {/* Top Header */}
      <header className="h-20 border-b border-slate-800 px-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
            ⚓
          </div>
          <div>
            <span className="font-display font-bold text-white text-lg tracking-wide uppercase">NAUTICOS YACHT CLUB</span>
            <span className="text-[10px] text-teal-400 font-mono block">MONACO &amp; INTERNATIONAL MEMBER PORTAL</span>
          </div>
        </div>

        <Link href="/admin/club" className="text-xs text-teal-400 hover:underline font-mono">
          ← Back to Admin Console
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-8 space-y-8 text-left">
        
        {/* Profile Banner */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-500/50 font-mono font-bold text-xs">
              MEMBERSHIP #{member.membershipNumber}
            </span>
            <h1 className="font-display text-3xl font-bold text-white mt-2">{member.name}</h1>
            <p className="text-teal-400 text-sm mt-0.5 font-semibold">{member.planName}</p>
          </div>

          <div className="flex items-center space-x-4 bg-slate-900/80 p-4 rounded-xl border border-slate-700 font-mono text-xs text-slate-300">
            <div>Status: <span className="font-bold text-emerald-400">ACTIVE</span></div>
            <div>Valid Through: <span className="font-bold text-white">{member.expiryDate}</span></div>
          </div>
        </div>

        {/* Benefits Card */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-8 shadow-xl space-y-4">
          <h2 className="font-display text-xl font-bold text-white border-b border-slate-700 pb-3">
            Your Gold Member Benefits &amp; Privileges
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-slate-200">
            {member.benefits.map((b: string, idx: number) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center space-x-2">
                <span className="text-teal-400 font-bold text-base">✓</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Member Activity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="font-display text-lg font-bold text-white border-b border-slate-700 pb-2">
              Registered Events
            </h3>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700 text-xs space-y-1">
              <div className="font-bold text-white">Monaco Annual Regatta &amp; Gala Dinner</div>
              <div className="text-teal-400 font-mono text-[10px]">Confirmed • Sept 7, 2026</div>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="font-display text-lg font-bold text-white border-b border-slate-700 pb-2">
              Active Berth Reservations
            </h3>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700 text-xs space-y-1">
              <div className="font-bold text-white">Berth Slip A-01 • Monaco Port Hercules</div>
              <div className="text-teal-400 font-mono text-[10px]">Vessel: Ocean Pearl 115 • OCCUPIED</div>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
