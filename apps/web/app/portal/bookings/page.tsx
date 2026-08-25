'use client';

import React from 'react';
import Link from 'next/link';

export default function MyBookingsPage() {
  const bookings = [
    {
      id: 'bk-1024',
      yachtName: 'Ocean Pearl 115',
      lengthFt: 120,
      startDate: '2026-09-12T10:00:00Z',
      endDate: '2026-09-19T18:00:00Z',
      location: 'Monaco Port Hercules, Slip A-01',
      status: 'CONFIRMED',
      totalAmount: 42500,
    },
    {
      id: 'bk-992',
      yachtName: 'Azure Horizon 88',
      lengthFt: 78,
      startDate: '2026-06-01T10:00:00Z',
      endDate: '2026-06-05T18:00:00Z',
      location: 'Saint-Tropez Port',
      status: 'COMPLETED',
      totalAmount: 18500,
    },
  ];

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">MY CHARTERS &amp; RESERVATIONS</span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">My Booking History</h1>
      </div>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-500">REF: #{b.id}</span>
                <h3 className="font-serif text-xl font-bold text-white">{b.yachtName} ({b.lengthFt}ft)</h3>
              </div>
              <span className={`px-3 py-1 rounded-full font-mono font-bold text-xs uppercase ${b.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
                {b.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-500 block">DATES</span>
                <span className="text-white font-bold">{new Date(b.startDate).toLocaleDateString()} - {new Date(b.endDate).toLocaleDateString()}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-500 block">LOCATION</span>
                <span className="text-white font-bold">{b.location}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-500 block">TOTAL PRICE</span>
                <span className="text-amber-400 font-bold">€{b.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
              <Link href={`/portal/bookings/${b.id}`} className="text-xs font-bold text-amber-400 hover:underline">
                View Full Itinerary &amp; Documents →
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
