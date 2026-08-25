'use client';

import React, { useEffect, useState } from 'react';

export default function ExecutiveAlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/analytics/alerts')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setAlerts(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">BUSINESS ANOMALY DETECTION</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Intelligent Executive Alerts</h1>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">Active Anomaly Stream</h2>

        <div className="space-y-4">
          {alerts.map((a) => (
            <div key={a.id} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{a.title}</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${a.severity === 'HIGH' ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
                  {a.severity}
                </span>
              </div>
              <p className="text-slate-300 font-sans">{a.message}</p>
              <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300">
                <span className="font-bold block mb-0.5">RECOMMENDED REVIEW ACTION:</span>
                {a.recommendedAction}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
