'use client';

import React, { useEffect, useState } from 'react';

export default function SupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/portal/support?customerId=cust-1')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setTickets(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">CUSTOMER CARE &amp; HELP DESK</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Support Center</h1>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">Your Support Tickets</h2>

        <div className="space-y-3">
          {tickets.map((t) => (
            <div key={t.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{t.subject}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold text-[10px] uppercase">
                  {t.status}
                </span>
              </div>
              <p className="text-slate-400 font-sans">{t.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
