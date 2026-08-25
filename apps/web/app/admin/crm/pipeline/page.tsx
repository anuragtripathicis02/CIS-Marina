'use client';

import React, { useEffect, useState } from 'react';

export default function PipelinePage() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/crm/leads')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setLeads(json.data);
      })
      .catch(() => {});
  }, []);

  const stages = [
    { key: 'NEW', label: 'New Inquiries', color: 'bg-slate-100 border-slate-300' },
    { key: 'CONTACTED', label: 'Contacted', color: 'bg-blue-50 border-blue-200' },
    { key: 'QUALIFIED', label: 'Qualified (High Value)', color: 'bg-teal-50 border-teal-200' },
    { key: 'PROPOSAL', label: 'Proposal Sent', color: 'bg-purple-50 border-purple-200' },
    { key: 'NEGOTIATION', label: 'In Negotiation', color: 'bg-amber-50 border-amber-200' },
    { key: 'WON', label: 'Won / Confirmed', color: 'bg-emerald-50 border-emerald-200' },
  ];

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">SALES KANBAN PIPELINE</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Charter &amp; Slip Sales Pipeline</h1>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 overflow-x-auto pb-4 min-w-[1000px]">
        {stages.map((stg) => {
          const stageLeads = leads.filter((l) => l.status === stg.key || (stg.key === 'QUALIFIED' && l.status === 'QUALIFIED'));
          const stageValue = stageLeads.reduce((acc, curr) => acc + (curr.budget || 0), 0);

          return (
            <div key={stg.key} className={`rounded-2xl p-4 border flex flex-col justify-between ${stg.color} min-h-[450px]`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <span className="font-bold text-slate-900 text-xs uppercase font-mono">{stg.label}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white text-slate-800 font-mono font-bold text-[10px]">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="text-[11px] font-mono font-bold text-slate-600">
                  Total: €{stageValue.toLocaleString()}
                </div>

                <div className="space-y-3">
                  {stageLeads.map((l) => (
                    <div key={l.id} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2 text-xs">
                      <div className="font-bold text-slate-900">{l.name}</div>
                      <div className="text-slate-500 font-mono text-[10px]">{l.company || l.email}</div>
                      <div className="font-bold font-mono text-teal-800 text-sm">€{l.budget ? l.budget.toLocaleString() : 'N/A'}</div>
                      
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>Score: {l.score}</span>
                        <span className="text-teal-600 font-bold">Ocean Pearl 115</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
