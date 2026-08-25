'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MarinaDashboardPage() {
  const [metrics, setMetrics] = useState<any>({
    totalBerths: 22,
    occupiedBerths: 14,
    availableBerths: 5,
    reservedBerths: 2,
    maintenanceBerths: 1,
    occupancyRate: 63.6,
    todaysArrivals: 3,
    todaysDepartures: 2,
    overdueCheckouts: 0,
    monthlyRevenue: 48500,
  });

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/marinas/occupancy')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setMetrics(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">STAGE 06 — PHASE 4 MARINA MANAGEMENT</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Marina Operations Command Center</h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/marina/reservations"
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            + New Berth Reservation
          </Link>
          <Link
            href="/admin/marina/check-in"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-md transition-colors"
          >
            ⚓ Vessel Check-In / Out
          </Link>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        
        {/* Occupancy Rate */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">OCCUPANCY RATE</span>
          <div className="text-3xl font-bold font-mono text-teal-700">{metrics.occupancyRate}%</div>
          <div className="text-[11px] text-slate-500 font-medium">
            {metrics.occupiedBerths} Occupied / {metrics.totalBerths} Total Berths
          </div>
        </div>

        {/* Today's Arrivals & Departures */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">TODAY&apos;S MOVEMENT</span>
          <div className="text-3xl font-bold font-mono text-slate-900 flex items-center space-x-2">
            <span className="text-emerald-600">↓ {metrics.todaysArrivals}</span>
            <span className="text-slate-300">/</span>
            <span className="text-amber-600">↑ {metrics.todaysDepartures}</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Arrivals / Departures Scheduled</div>
        </div>

        {/* Available Inventory */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">AVAILABLE BERTHS</span>
          <div className="text-3xl font-bold font-mono text-slate-900">{metrics.availableBerths}</div>
          <div className="text-[11px] text-emerald-600 font-semibold">✓ Ready for Immediate Docking</div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">MONTHLY REVENUE</span>
          <div className="text-3xl font-bold font-mono text-slate-900">€{metrics.monthlyRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 font-medium">Berth Tenancy &amp; Utility Add-Ons</div>
        </div>

      </div>

      {/* Navigation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Visual Layout Map */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 flex flex-col justify-between hover:border-teal-300 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg">🗺️</div>
            <h3 className="font-display text-xl font-bold text-slate-900 mt-2">Visual Marina Layout Map</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Interactive berth grid by Dock Alpha &amp; Bravo. View berth status badges (AVAILABLE, OCCUPIED, RESERVED, MAINTENANCE).
            </p>
          </div>
          <Link href="/admin/marina/map" className="text-xs font-bold text-teal-700 hover:underline">
            Open Visual Layout Map →
          </Link>
        </div>

        {/* Card 2: Docks & Berths Capacity Inventory */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 flex flex-col justify-between hover:border-teal-300 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg">⚓</div>
            <h3 className="font-display text-xl font-bold text-slate-900 mt-2">Docks &amp; Berths Capacity</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Manage physical berth capacity limits (Max Length, Beam, Draft) and utility services (Power, Water, Sewage, Fuel).
            </p>
          </div>
          <Link href="/admin/marina/berths" className="text-xs font-bold text-teal-700 hover:underline">
            Manage Berths Inventory →
          </Link>
        </div>

        {/* Card 3: Berth Reservations Pipeline */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 flex flex-col justify-between hover:border-teal-300 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg">📋</div>
            <h3 className="font-display text-xl font-bold text-slate-900 mt-2">Berth Reservations Pipeline</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Book berth reservations with physical vessel compatibility checks and double-booking conflict protection.
            </p>
          </div>
          <Link href="/admin/marina/reservations" className="text-xs font-bold text-teal-700 hover:underline">
            View Reservations Pipeline →
          </Link>
        </div>

      </div>

    </div>
  );
}
