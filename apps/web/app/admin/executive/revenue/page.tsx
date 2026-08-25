'use client';

import React, { useEffect, useState } from 'react';

export default function RevenueIntelligencePage() {
  const [forecastData, setForecastData] = useState<any>({ forecasts: [], forecastConfidence: 'HIGH' });

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/analytics/forecast')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setForecastData(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">PREDICTIVE REVENUE INTELLIGENCE</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Revenue Breakdown &amp; Predictive Forecasts</h1>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold text-xs">
            CONFIDENCE: {forecastData.forecastConfidence || 'HIGH'}
          </span>
        </div>
      </div>

      {/* Forecast Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">6-Month Revenue Forecast Matrix</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase">
                <th className="p-3">PERIOD</th>
                <th className="p-3">ACTUAL REVENUE</th>
                <th className="p-3">PREDICTED REVENUE</th>
                <th className="p-3">CONFIDENCE LEVEL</th>
                <th className="p-3">YoY GROWTH COMPARISON</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {forecastData.forecasts?.map((f: any) => (
                <tr key={f.period} className="hover:bg-slate-950/60">
                  <td className="p-3 font-bold text-white">{f.period}</td>
                  <td className="p-3 font-bold text-emerald-400">{f.actualRevenue ? `€${f.actualRevenue.toLocaleString()}` : '—'}</td>
                  <td className="p-3 font-bold text-amber-400">€{f.predictedRevenue.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] uppercase ${f.confidence === 'HIGH' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
                      {f.confidence}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-emerald-400">+{f.historicalComparisonGrowth}% YoY</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
