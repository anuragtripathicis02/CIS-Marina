'use client';

import React, { useEffect, useState } from 'react';

export default function YachtClubConsolePage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/yacht-club/plans')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setPlans(json.data);
      })
      .catch(() => {});

    fetch('http://localhost:4000/api/v1/yacht-club/members')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setMembers(json.data);
      })
      .catch(() => {});

    fetch('http://localhost:4000/api/v1/yacht-club/events')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setEvents(json.data);
      })
      .catch(() => {});
  }, []);

  const handleRegisterMember = async (eventId: string) => {
    setStatusMsg(null);
    const memberId = members[0]?.id || 'mem-1';

    try {
      let res: Response;
      const body = JSON.stringify({ memberId });

      try {
        res = await fetch(`/api/v1/yacht-club/events/${eventId}/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch(`http://localhost:4000/api/v1/yacht-club/events/${eventId}/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      }

      const json = await res.json();
      if (!res.ok || !json.success) {
        setStatusMsg(json.message || json.error?.message || 'Registration failed.');
        return;
      }

      setStatusMsg('✓ Member registered for event successfully!');
      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e))
      );
    } catch (err: any) {
      setStatusMsg(err.message);
    }
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">YACHT CLUB FOUNDATION</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Yacht Club Memberships &amp; Events</h1>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-mono font-bold">
          {statusMsg}
        </div>
      )}

      {/* Section 1: Membership Tiers */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold text-slate-900">Configurable Membership Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono font-bold text-[10px]">
                  {p.billingCycle}
                </span>
                <h3 className="font-display text-xl font-bold text-slate-900 mt-2">{p.name}</h3>
                <p className="text-slate-500 text-xs mt-1">{p.description}</p>

                <div className="mt-3 space-y-1">
                  {p.benefits?.map((b: string, idx: number) => (
                    <div key={idx} className="text-xs text-slate-700 font-medium flex items-center space-x-1">
                      <span className="text-teal-600 font-bold">✓</span> <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-2xl font-bold font-mono text-slate-900">€{p.price.toLocaleString()}</span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                  ACTIVE TIER
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Club Events Catalog */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold text-slate-900">Exclusive Yacht Club Events &amp; Regattas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((e) => (
            <div key={e.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 font-mono font-bold text-[10px]">
                  {e.status}
                </span>
                <span className="text-xs font-mono font-bold text-slate-600">
                  Capacity: {e.registeredCount} / {e.capacity} Guests
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-slate-900">{e.name}</h3>
              <p className="text-slate-600 text-xs">{e.description}</p>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-500 pt-2 border-t border-slate-100">
                <div>Date: {new Date(e.eventDate).toLocaleDateString()}</div>
                <div>Location: {e.location}</div>
              </div>

              <button
                onClick={() => handleRegisterMember(e.id)}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer mt-2"
              >
                + Register Member for Event →
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
