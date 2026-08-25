'use client';

import React, { useState } from 'react';

export default function ClubPage() {
  const [waitlistStatus, setWaitlistStatus] = useState<string | null>(null);

  const events = [
    {
      id: 'event-regatta-1',
      name: 'Monaco Annual Riviera Regatta & Gala',
      date: 'September 18, 2026',
      time: '14:00 - 23:00',
      location: 'Monaco Port Hercules Club Lounge',
      capacity: 100,
      registeredCount: 85,
      price: 250,
      isFull: false,
    },
    {
      id: 'event-full-100',
      name: 'Dom Pérignon Sunset Champagne Tasting',
      date: 'September 25, 2026',
      time: '18:30 - 21:00',
      location: 'Saint-Tropez VIP Pier',
      capacity: 100,
      registeredCount: 100,
      price: 450,
      isFull: true,
    },
  ];

  const handleRegisterOrWaitlist = async (eventId: string) => {
    try {
      let res: Response;
      try {
        res = await fetch(`http://localhost:4000/api/v1/portal/events/${eventId}/register?customerId=cust-1`, { method: 'POST' });
      } catch (err) {
        res = await fetch(`/api/v1/portal/events/${eventId}/register?customerId=cust-1`, { method: 'POST' });
      }

      const json = await res.json();
      if (json.success && json.data) {
        if (json.data.isWaitlisted) {
          setWaitlistStatus(`🛡️ EVENT CAPACITY FULL (100/100): ${json.data.message}`);
        } else {
          setWaitlistStatus(`✓ Event registration confirmed!`);
        }
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">MEMBERSHIP &amp; CLUB EVENTS</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Yacht Club Portal &amp; Regattas</h1>
        </div>
      </div>

      {waitlistStatus && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
          {waitlistStatus}
        </div>
      )}

      {/* Member Privileges Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-amber-500/30 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-amber-400 uppercase">ACTIVE MEMBERSHIP</span>
          <h2 className="font-serif text-2xl font-bold text-white">Gold Flagship Member Tier</h2>
          <p className="text-slate-400 text-xs font-mono">Privileges: Priority Berth Booking, VIP Lounge Access, Annual Regatta Passes</p>
        </div>

        <span className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold text-xs">
          ACTIVE TILL DEC 2026
        </span>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">Upcoming Club Events</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((evt) => (
            <div key={evt.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between hover:border-amber-500/40 transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-amber-400 font-bold">{evt.date}</span>
                  <span className="text-slate-400">{evt.registeredCount}/{evt.capacity} Capacity</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white">{evt.name}</h3>
                <p className="text-slate-400 text-xs font-mono">📍 {evt.location} • {evt.time}</p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <span className="font-serif text-lg font-bold text-white">€{evt.price}</span>

                {evt.isFull ? (
                  <button
                    onClick={() => handleRegisterOrWaitlist(evt.id)}
                    className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-md"
                  >
                    🛡️ Event Full — Join Waitlist
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegisterOrWaitlist(evt.id)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
                  >
                    + Register for Event
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
