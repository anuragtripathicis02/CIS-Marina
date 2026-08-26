'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ExecutiveCommandCenterPage() {
  const [summary, setSummary] = useState<any>({
    totalRevenue: 542000,
    revenueGrowthPercent: 14.8,
    totalBookings: 84,
    avgBookingValue: 6450,
    fleetUtilizationPercent: 78.4,
    marinaOccupancyPercent: 86.2,
    customerGrowthPercent: 12.5,
    activeMaintenanceRisksCount: 2,
    aiExecutiveNarrative:
      'Q3 Executive Summary: Net revenue increased by +14.8% YoY driven by high superyacht demand in Riviera ports. Marina slip occupancy reached 86.2%. Two vessels show elevated maintenance risk scores based on telemetry operating hours and recommend inspection before next charter.',
  });

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/analytics/summary')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setSummary(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest">EXECUTIVE DECISION SUPPORT &amp; BI</span>
          <h1 className="font-serif text-3xl font-bold text-slate-900 mt-1">Executive Command Center</h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/crm/ai-assistant"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-transform hover:scale-105"
          >
            ✨ Ask AI Analytics Assistant →
          </Link>
        </div>
      </div>

      {/* AI Executive Narrative Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-amber-50 border border-amber-200 space-y-3">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-white text-amber-800 border border-amber-200 font-mono font-bold text-xs">
            ✨ AI EXECUTIVE SUMMARY &amp; INSIGHTS
          </span>
        </div>
        <p className="text-slate-700 text-sm font-sans leading-relaxed">{summary.aiExecutiveNarrative}</p>
      </div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">Q3 NET REVENUE</span>
          <div className="text-3xl font-serif font-bold text-emerald-400">€{summary.totalRevenue ? summary.totalRevenue.toLocaleString() : '542,000'}</div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">+{summary.revenueGrowthPercent}% YoY Growth</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">FLEET UTILIZATION</span>
          <div className="text-3xl font-serif font-bold text-amber-400">{summary.fleetUtilizationPercent}%</div>
          <span className="text-[10px] font-mono text-slate-400">84 Active Charters</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">MARINA OCCUPANCY</span>
          <div className="text-3xl font-serif font-bold text-slate-900">{summary.marinaOccupancyPercent}%</div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">103/120 Slips Occupied</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">PREDICTIVE RISKS</span>
          <div className="text-3xl font-serif font-bold text-red-400">{summary.activeMaintenanceRisksCount} Alerts</div>
          <span className="text-[10px] font-mono text-red-400 font-bold">Requires Manager Review</span>
        </div>
      </div>

      {/* Analytics Module Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Link href="/admin/executive/revenue" className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-amber-300 transition-all space-y-3 block">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xl">📈</div>
          <h3 className="font-serif text-xl font-bold text-slate-900">Revenue &amp; Forecasting</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Revenue breakdowns by Month, Yacht, Marina, and Country with statistical confidence interval forecasts.
          </p>
        </Link>

        <Link href="/admin/executive/demand" className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-amber-300 transition-all space-y-3 block">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xl">🗺️</div>
          <h3 className="font-serif text-xl font-bold text-slate-900">Demand Analytics &amp; Heatmap</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Visual Date × Demand Heatmap, booking velocity trends, and Riviera high/low season detection.
          </p>
        </Link>

        <Link href="/admin/operations/fleet" className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-amber-300 transition-all space-y-3 block">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xl">🛥️</div>
          <h3 className="font-serif text-xl font-bold text-slate-900">Fleet &amp; Predictive Maintenance</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Yacht Performance Indicators, underutilized vessel identification, and telemetry anomaly risk scores.
          </p>
        </Link>

        <Link href="/admin/marina" className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-amber-300 transition-all space-y-3 block">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xl">⚓</div>
          <h3 className="font-serif text-xl font-bold text-slate-900">Marina &amp; Berth Analytics</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Berth occupancy rates, RevPAR per berth, peak arrival/departure hours, and utility usage metrics.
          </p>
        </Link>

        <Link href="/admin/customers" className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-amber-300 transition-all space-y-3 block">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xl">👑</div>
          <h3 className="font-serif text-xl font-bold text-slate-900">Customer Intelligence &amp; CLV</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            RFM Customer Segmentation (VIP, High Value, Repeat), CLV estimates, and retention risk alerts.
          </p>
        </Link>

        <Link href="/admin/financials" className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-amber-300 transition-all space-y-3 block">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xl">📊</div>
          <h3 className="font-serif text-xl font-bold text-slate-900">Custom Report Builder &amp; CSV</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Configure custom reports, save reusable templates, schedule automated email delivery, and export CSV/PDF.
          </p>
        </Link>

      </div>

    </div>
  );
}
