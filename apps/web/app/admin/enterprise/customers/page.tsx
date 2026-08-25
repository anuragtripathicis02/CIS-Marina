'use client';

import React, { useEffect, useState } from 'react';

export default function CustomerIntelligencePage() {
  const [segments, setSegments] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/analytics/customer-segments')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setSegments(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">RFM SEGMENTATION &amp; CLV ESTIMATION</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Customer Intelligence &amp; Retention</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {segments.map((s) => (
          <div key={s.segment} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono font-bold text-xs">
                {s.segment} SEGMENT
              </span>
              <span className="font-mono text-xs font-bold text-white">{s.count} Customers</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-400"><span>Segment Revenue:</span> <span className="text-emerald-400 font-bold">€{s.totalRevenue.toLocaleString()}</span></div>
              <div className="flex justify-between text-slate-400"><span>Avg CLV Estimate:</span> <span className="text-amber-400 font-bold">€{s.averageClvEstimate.toLocaleString()}</span></div>
              <div className="flex justify-between text-slate-400"><span>Retention Risks:</span> <span className="text-red-400 font-bold">{s.churnRiskCount} Alerts</span></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
