'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function BookingDetailPage() {
  const params = useParams();
  const bookingId = (params?.id as string) || 'bk-1024';

  const [booking, setBooking] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/v1/portal/bookings/${bookingId}?customerId=cust-1`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('403 Forbidden: Access Denied. You do not have permission to view this resource.');
        }
        return res.json();
      })
      .then((json) => {
        if (json.success && json.data) setBooking(json.data);
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  }, [bookingId]);

  if (errorMsg) {
    return (
      <div className="space-y-6 text-left max-w-3xl mx-auto font-sans pt-8">
        <div className="p-8 rounded-3xl bg-red-950/60 border border-red-800 text-red-200 space-y-4">
          <div className="text-2xl">🛡️ CRITICAL CUSTOMER SECURITY TEST</div>
          <h2 className="font-serif text-2xl font-bold text-white">ACCESS DENIED (HTTP 403)</h2>
          <p className="text-xs font-mono">{errorMsg}</p>
          <p className="text-xs text-red-300">
            Server-side resource ownership validation prevented unauthorized access to another customer&apos;s booking record.
          </p>
          <Link href="/portal/bookings" className="inline-block px-4 py-2 rounded-xl bg-red-800 hover:bg-red-700 text-white font-bold text-xs">
            ← Return to My Bookings
          </Link>
        </div>
      </div>
    );
  }

  if (!booking) return <div className="text-slate-400 font-mono text-xs p-8">Loading charter itinerary...</div>;

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">CHARTER ITINERARY &amp; DOCUMENTS</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Ref: #{booking.id} — {booking.yachtName}</h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/portal/bookings/bk-other-customer"
            className="px-3.5 py-2 rounded-xl bg-red-900/60 text-red-300 border border-red-700/50 hover:bg-red-900 font-bold text-xs"
          >
            🛡️ Test Cross-Customer Ownership Guard
          </Link>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Itinerary Details */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="font-serif text-xl font-bold text-white">Charter Details &amp; Amenities</h2>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold text-xs uppercase">
              ✓ {booking.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 block mb-1">CAPTAIN ASSIGNED</span>
              <span className="text-white font-bold text-sm">{booking.captainName}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 block mb-1">GUEST CAPACITY</span>
              <span className="text-white font-bold text-sm">{booking.guestsCount} Guests Confirmed</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-3">INCLUDED PACKAGE SERVICES</h3>
            <div className="space-y-2">
              {booking.includedServices?.map((svc: string) => (
                <div key={svc} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200 flex items-center space-x-2 font-mono">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{svc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Financial Summary & Documents */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">Financial Statement</h2>

          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between text-slate-400"><span>Total Charter Price:</span> <span className="text-white font-bold">€{booking.totalAmount?.toLocaleString()}</span></div>
            <div className="flex justify-between text-slate-400"><span>Deposit Paid:</span> <span className="text-emerald-400 font-bold">€{booking.depositPaid?.toLocaleString()}</span></div>
            <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800"><span>Remaining Balance:</span> <span className="text-amber-400 font-bold">€{booking.remainingBalance?.toLocaleString()}</span></div>
          </div>

          <div className="pt-2 space-y-3">
            <button className="w-full py-3 rounded-2xl bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold text-xs hover:bg-amber-500/20 cursor-pointer">
              📄 Download Booking Confirmation (PDF)
            </button>
            <button className="w-full py-3 rounded-2xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 cursor-pointer">
              💳 Download Tax Invoice #INV-2026-0042
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
