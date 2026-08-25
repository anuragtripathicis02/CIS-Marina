'use client';

import React, { useEffect, useState } from 'react';

export default function FleetPredictivePage() {
  const [fleetScores, setFleetScores] = useState<any[]>([]);
  const [maintenanceRisks, setMaintenanceRisks] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/analytics/fleet-scores')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setFleetScores(json.data);
      })
      .catch(() => {});

    fetch('http://localhost:4000/api/v1/analytics/maintenance-risks')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setMaintenanceRisks(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">EXPLAINABLE RISK INDICATORS</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Fleet Performance &amp; Predictive Maintenance</h1>
        </div>
      </div>

      {/* Predictive Maintenance Risk Section (Critical Test 5) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="font-serif text-xl font-bold text-white">
            🛡️ Predictive Maintenance Risk Indicators (Critical Test 5)
          </h2>
          <span className="px-3 py-1 rounded-full bg-red-950/60 text-red-300 border border-red-800 font-mono font-bold text-xs">
            REQUIRES HUMAN AUTHORIZATION
          </span>
        </div>
        <p className="text-slate-400 text-xs font-mono">
          System generates risk indicators and explainable drivers. It does NOT automatically trigger physical controls or work orders.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {maintenanceRisks.map((m) => (
            <div key={m.yachtId} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{m.yachtName}</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${m.riskLevel === 'HIGH' ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
                  RISK: {m.riskLevel}
                </span>
              </div>

              <div className="space-y-1 text-slate-300">
                <span className="text-amber-400 font-bold block">EXPLAINABLE ANOMALY DRIVERS:</span>
                {m.riskDrivers?.map((d: string, idx: number) => (
                  <div key={idx} className="flex items-start space-x-1.5 text-[11px]">
                    <span className="text-amber-400">▸</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                Recommended Inspection Date: <span className="text-white font-bold">{new Date(m.recommendedInspectionDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fleet Performance Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">Yacht Performance Scores</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase">
                <th className="p-3">YACHT NAME</th>
                <th className="p-3">PERFORMANCE SCORE</th>
                <th className="p-3">UTILIZATION RATE</th>
                <th className="p-3">REVENUE GENERATED</th>
                <th className="p-3">DOWNTIME DAYS</th>
                <th className="p-3">STATUS INDICATOR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {fleetScores.map((s) => (
                <tr key={s.yachtId} className="hover:bg-slate-950/60">
                  <td className="p-3 font-bold text-white">{s.yachtName}</td>
                  <td className="p-3 font-bold text-amber-400">{s.performanceScore} / 100</td>
                  <td className="p-3 font-bold text-emerald-400">{s.utilizationRate}%</td>
                  <td className="p-3 font-bold text-white">€{s.revenueGenerated.toLocaleString()}</td>
                  <td className="p-3 text-slate-400">{s.downtimeDays} Days</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px]">
                      {s.statusTag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
