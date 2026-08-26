'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CustomerDashboardPage() {
  const [summary, setSummary] = useState<any>({
    customerName: 'Lord Arthur Sterling',
    membershipTier: 'Gold Flagship Member',
    upcomingBooking: {
      id: 'bk-1024',
      yachtName: 'Ocean Pearl 115',
      startDate: '2026-09-12T10:00:00Z',
      status: 'CONFIRMED',
      totalAmount: 42500,
    },
    activeServicesCount: 2,
    openTicketsCount: 0,
    upcomingEventsCount: 1,
  });

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/portal/summary?customerId=cust-1')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setSummary(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-10 text-left font-sans">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10 relative">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono font-bold text-xs uppercase tracking-widest">
              👑 {summary.membershipTier || 'GOLD FLAGSHIP MEMBER'}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-3">
              Welcome Back, {summary.customerName}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Your luxury maritime portal is ready. View your confirmed charters, request bespoke concierge services, or explore slip availability.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 z-10 relative">
            <Link
              href="/portal/concierge"
              className="px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105"
            >
              + Bespoke Concierge Request
            </Link>
          </div>
        </div>
      </div>

      {/* Next Charter Card */}
      {summary.upcomingBooking && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl relative">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🛥️</span>
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">YOUR NEXT CHARTER EXPERIENCE</span>
                <h2 className="font-serif text-2xl font-bold text-white">{summary.upcomingBooking.yachtName}</h2>
              </div>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold text-xs uppercase">
              ✓ {summary.upcomingBooking.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-500">DEPARTURE DATE &amp; TIME</span>
              <div className="font-bold text-white text-sm">{new Date(summary.upcomingBooking.startDate).toLocaleString()}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-500">LOCATION &amp; BERTH</span>
              <div className="font-bold text-white text-sm">Monaco Port Hercules Slip A-01</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-500">TOTAL PAID</span>
              <div className="font-bold text-amber-400 text-sm">€{summary.upcomingBooking.totalAmount ? summary.upcomingBooking.totalAmount.toLocaleString() : '42,500'}</div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={`/portal/bookings/${summary.upcomingBooking.id}`}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
            >
              View Charter Itinerary &amp; Documents →
            </Link>
            <Link
              href="/portal/services"
              className="px-5 py-2.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 font-bold text-xs transition-colors"
            >
              + Add Private Chef &amp; Water Toys
            </Link>
          </div>
        </div>
      )}

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 hover:border-amber-500/40 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xl">⚓</div>
            <h3 className="font-serif text-xl font-bold text-white mt-3">Explore Charter Fleet</h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              Browse available luxury superyachts, check real-time availability, and view vessel specifications.
            </p>
          </div>
          <Link href="/portal/yachts" className="text-xs font-bold text-amber-400 hover:underline">
            Explore Fleet Marketplace →
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 hover:border-amber-500/40 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xl">🏆</div>
            <h3 className="font-serif text-xl font-bold text-white mt-3">Yacht Club &amp; Regattas</h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              Register for exclusive club regattas, galas, and champagne tastings. Join waitlists for full events.
            </p>
          </div>
          <Link href="/portal/club" className="text-xs font-bold text-amber-400 hover:underline">
            View Club Privileges &amp; Events →
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 hover:border-amber-500/40 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xl">✨</div>
            <h3 className="font-serif text-xl font-bold text-white mt-3">AI Customer Concierge</h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              Ask questions about check-in times, itinerary items, included amenities, or custom service requests.
            </p>
          </div>
          <Link href="/portal/ai" className="text-xs font-bold text-amber-400 hover:underline">
            Launch AI Assistant →
          </Link>
        </div>

      </div>

    </div>
  );
}
