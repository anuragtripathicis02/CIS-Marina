'use client';

import React, { useEffect, useState } from 'react';

export default function DemandAnalyticsPage() {
  const [heatmap, setHeatmap] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/analytics/demand-heatmap')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setHeatmap(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">REAL-TIME DEMAND &amp; SEASONALITY</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Demand Heatmap &amp; Seasonality Trends</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {heatmap.map((hp) => (
          <div key={hp.date} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-amber-400 font-bold">{hp.date}</span>
              <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] uppercase ${hp.demandLevel === 'HIGH' ? 'bg-red-500/10 text-red-400 border border-red-500/30' : hp.demandLevel === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'}`}>
                {hp.demandLevel} DEMAND
              </span>
            </div>

            <h3 className="font-serif text-xl font-bold text-white">{hp.seasonTag}</h3>
            
            <div className="text-xs font-mono text-slate-400 space-y-1">
              <div>Booking Velocity: <span className="text-white font-bold">{hp.bookingVelocity} / 100 Velocity Index</span></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
