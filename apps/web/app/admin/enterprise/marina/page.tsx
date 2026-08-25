'use client';

import React, { useEffect, useState } from 'react';

export default function MarinaAnalyticsPage() {
  const [marinaMetrics, setMarinaMetrics] = useState<any>({
    marinaName: 'Monaco Port Hercules',
    totalBerths: 120,
    occupiedBerths: 103,
    berthOccupancyPercent: 85.8,
    revParBerth: 480,
    peakArrivalHours: '14:00 - 17:00',
    peakDepartureHours: '09:00 - 11:00',
    topServices: [],
  });

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/analytics/marina-metrics')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setMarinaMetrics(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">MARINA SLIP UTILIZATION &amp; RevPAR</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Marina &amp; Berth Analytics</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-slate-400 block">MARINA OCCUPANCY</span>
          <div className="text-3xl font-bold text-emerald-400">{marinaMetrics.berthOccupancyPercent}%</div>
          <span className="text-slate-500">{marinaMetrics.occupiedBerths} / {marinaMetrics.totalBerths} Slips Occupied</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-slate-400 block">RevPAR PER BERTH</span>
          <div className="text-3xl font-bold text-amber-400">€{marinaMetrics.revParBerth} / night</div>
          <span className="text-slate-500">Average Slip Yield</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-slate-400 block">PEAK ARRIVAL WINDOW</span>
          <div className="text-xl font-bold text-white">{marinaMetrics.peakArrivalHours}</div>
          <span className="text-slate-500">Daily Dockside Rush</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-slate-400 block">PEAK DEPARTURE WINDOW</span>
          <div className="text-xl font-bold text-white">{marinaMetrics.peakDepartureHours}</div>
          <span className="text-slate-500">Checkout Clearance</span>
        </div>
      </div>

    </div>
  );
}
