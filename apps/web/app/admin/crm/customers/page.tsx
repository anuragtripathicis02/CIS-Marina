'use client';

import React, { useState } from 'react';

export default function CustomerTimelinePage() {
  const [selectedCustomer, setSelectedCustomer] = useState<any>({
    id: 'cust-1',
    name: 'Lord Arthur Sterling',
    email: 'sterling@luxuryyachts.com',
    phone: '+44 7700 900077',
    nationality: 'United Kingdom',
    vipStatus: true,
    totalSpent: 145000,
    activeBookingsCount: 1,
    marinaBerth: 'Slip A-01 (Monaco Port Hercules)',
    membership: 'Gold Flagship Membership',
    timeline: [
      { id: 't-1', date: 'Today 14:30', type: 'BOOKING', title: 'Charter Booking Confirmed #BK-1024', desc: '7-Day Riviera Cruise aboard Ocean Pearl 115. Total €42,500.' },
      { id: 't-2', date: 'Yesterday 09:15', type: 'CALL', title: 'Inbound Call with Sales Manager', desc: 'Discussed pre-charter catering preferences & VIP airport transport.' },
      { id: 't-3', date: '3 Days Ago', type: 'PAYMENT', title: 'Payment Received €42,500 via Stripe', desc: 'Invoice #INV-2026-0042 paid in full.' },
      { id: 't-4', date: 'Jan 15, 2026', type: 'MEMBERSHIP', title: 'Yacht Club Membership Renewed', desc: 'Gold Flagship Annual Tier activated.' },
      { id: 't-5', date: 'Dec 10, 2025', type: 'MARINA', title: 'Berth Slip Contract Signed #MC-2026-0042', desc: 'Long-term 12-month lease for Berth Slip A-01.' },
    ],
  });

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">CUSTOMER 360 INTEGRATED TIMELINE</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Unified Customer Activity Profile</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Profile Overview */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-mono font-bold text-[10px] uppercase">
              👑 VIP CUSTOMER
            </span>
            <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">{selectedCustomer.name}</h2>
            <p className="text-slate-500 text-xs mt-0.5">{selectedCustomer.email} • {selectedCustomer.nationality}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 font-mono">
            <div className="flex justify-between"><span className="text-slate-500">Total Lifetime Value:</span> <span className="font-bold text-slate-900">€{selectedCustomer.totalSpent.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Club Membership:</span> <span className="font-bold text-teal-700">{selectedCustomer.membership}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Marina Berth:</span> <span className="font-bold text-slate-900">{selectedCustomer.marinaBerth}</span></div>
          </div>
        </div>

        {/* Right 360 Timeline */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Chronological Activity &amp; Communication History
          </h2>

          <div className="space-y-4 relative border-l-2 border-slate-100 ml-3 pl-6">
            {selectedCustomer.timeline.map((item: any) => (
              <div key={item.id} className="relative space-y-1 text-xs">
                <div className="absolute -left-[31px] top-0.5 w-3 h-3 rounded-full bg-teal-600 ring-4 ring-white" />
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{item.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                </div>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
