'use client';

import React, { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'map'>('map');
  const [metrics, setMetrics] = useState<any>({
    occupied: '44 / 75',
    pastDue: 3,
    expiring: 6,
    pending: 2,
    available: 10,
    arrivals: 3,
    departures: 2,
    canceled: 2,
    onService: 1,
  });

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/dashboard/metrics')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setMetrics((prev: any) => ({
            ...prev,
            pending: json.data.pendingBookings || 2,
            available: json.data.availableYachts || 10,
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      
      {/* 1. Marine Weather & Environmental Bar (Crisp High-Contrast Typography) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm relative overflow-hidden">
        {/* Subtle Accent Gradient */}
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-teal-50/80 to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center relative z-10 text-slate-800 text-xs">
          
          {/* Today Date & Clock */}
          <div className="md:col-span-2 space-y-1 border-r border-slate-200/90 pr-4">
            <div className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Today is</div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">Monday, June 16</div>
            <div className="text-xs text-slate-700 font-mono font-bold">02:52 PM</div>
          </div>

          {/* Temperature */}
          <div className="space-y-1 border-r border-slate-200/90 pr-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-slate-900">73°F</span>
              <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="text-xs text-slate-700 font-semibold">Partially cloudy</div>
            <div className="text-[11px] text-slate-600 font-mono font-bold">H: 86°F &nbsp; L: 55°F</div>
          </div>

          {/* Wind Speed */}
          <div className="space-y-1 border-r border-slate-200/90 pr-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-slate-900">8 knots</span>
              <span className="text-xs text-teal-800 font-bold bg-teal-100 border border-teal-300 px-2 py-0.5 rounded">315° NW</span>
            </div>
            <div className="text-xs text-slate-700 font-semibold">Wind Speed</div>
            <div className="text-[11px] text-slate-600 font-mono font-bold">Max: 12 kts &nbsp; Min: 5 kts</div>
          </div>

          {/* Tide & Moon Phase */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="font-bold text-slate-900 text-base">0.83 ft</div>
              <div className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">62.3%</div>
            </div>
            <div className="flex justify-between text-xs text-slate-700 font-semibold">
              <span>Low tide</span>
              <span>Third quarter</span>
            </div>
            <div className="text-[11px] text-slate-600 font-mono font-bold">H: 1.73 ft &nbsp; L: -0.56 ft</div>
          </div>

        </div>
      </div>

      {/* 2. Sub-Header Navigation Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Tabs & Search */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="bg-slate-200 p-1 rounded-xl flex text-xs font-bold shadow-inner">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'overview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'map' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Map
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 md:w-80">
            <input
              type="text"
              placeholder="Search slips, yachts, or members..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-500 font-medium focus:outline-none focus:border-teal-600 shadow-sm"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Date Selector Navigation */}
        <div className="flex items-center space-x-2 text-xs">
          <button className="w-8 h-8 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 font-bold hover:bg-slate-50 shadow-sm cursor-pointer">
            ‹
          </button>
          <div className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold shadow-sm flex items-center space-x-2">
            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Select date</span>
          </div>
          <button className="w-8 h-8 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 font-bold hover:bg-slate-50 shadow-sm cursor-pointer">
            ›
          </button>
        </div>

      </div>

      {/* 3. Status Metric Counter Cards (High Contrast Legibility) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
        
        {/* Occupied */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Occupied</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">{metrics.occupied}</div>
        </div>

        {/* Past due */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Past due</span>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">{metrics.pastDue}</div>
        </div>

        {/* Exp. < 30d */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Exp. &lt; 30d</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">{metrics.expiring}</div>
        </div>

        {/* Pending */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Pending</span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">{metrics.pending}</div>
        </div>

        {/* Available */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Available</span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">{metrics.available}</div>
        </div>

        {/* Arrivals */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Arrivals</span>
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">{metrics.arrivals}</div>
        </div>

        {/* Departures */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Departures</span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">{metrics.departures}</div>
        </div>

        {/* Canceled */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Canceled</span>
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">{metrics.canceled}</div>
        </div>

        {/* On service */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>On service</span>
            <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">{metrics.onService}</div>
        </div>

      </div>

      {/* 4. Interactive Dock & Slip Layout Visualizer (Clean Vessel Silhouettes) */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm relative min-h-[480px]">
        
        {/* Top Dock Linear Footage Counter Badge */}
        <div className="absolute top-4 left-4 z-10 bg-white border border-slate-300 px-4 py-2 rounded-xl text-xs font-bold text-slate-800 shadow-md flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
          <span>537 / 970 ft of open linear docks</span>
        </div>

        {/* Fullscreen Expand Button */}
        <div className="absolute top-4 right-4 z-10">
          <button className="w-9 h-9 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 shadow-md hover:bg-slate-50 cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>

        {/* Simulated Marina Del Rey Map Canvas */}
        <div className="w-full h-full bg-slate-200/70 p-8 flex flex-col justify-center items-center relative overflow-hidden min-h-[480px]">
          
          {/* Map Location Labels */}
          <div className="absolute top-12 left-16 text-slate-600 font-bold text-xs tracking-wider uppercase">
            Panay Way • Marina Del Rey Harbor
          </div>

          <div className="absolute bottom-8 right-12 text-slate-600 font-bold text-sm tracking-widest uppercase">
            MARINA DEL REY DOCKS
          </div>

          {/* Slip Parking / Berth Layout Grid */}
          <div className="relative bg-slate-300/90 border-2 border-slate-400 rounded-2xl p-6 shadow-inner max-w-4xl w-full">
            <div className="text-center text-xs font-mono font-bold text-slate-700 mb-5 uppercase tracking-wider">
              Dock Block A & B — Color Coded Slip Allocations
            </div>

            {/* Top Row Slips (Block A) */}
            <div className="flex justify-between items-center space-x-2 mb-6 overflow-x-auto pb-2">
              {[
                { code: 'A-01', color: 'border-emerald-500 bg-emerald-50 text-emerald-800' },
                { code: 'A-02', color: 'border-emerald-500 bg-emerald-50 text-emerald-800' },
                { code: 'A-03', color: 'border-emerald-500 bg-emerald-50 text-emerald-800' },
                { code: 'A-04', color: 'border-amber-500 bg-amber-50 text-amber-800' },
                { code: 'A-05', color: 'border-amber-500 bg-amber-50 text-amber-800' },
                { code: 'A-06', color: 'border-cyan-500 bg-cyan-50 text-cyan-800' },
                { code: 'A-07', color: 'border-teal-500 bg-teal-50 text-teal-800' },
                { code: 'A-08', color: 'border-red-500 bg-red-50 text-red-800' },
                { code: 'A-09', color: 'border-purple-500 bg-purple-50 text-purple-800' },
                { code: 'A-10', color: 'border-emerald-500 bg-emerald-50 text-emerald-800' },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`w-14 h-22 rounded-full border-2 ${s.color} flex flex-col justify-between items-center py-2.5 text-[11px] font-mono font-bold shadow-sm transition-transform hover:scale-110 cursor-pointer`}
                >
                  <svg className="w-4 h-4 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.86 0 3.65-.67 5-1.84 2.7 2.31 6.3 2.31 9 0 1.35 1.17 3.14 1.84 5 1.84h2v-2h-2zM5.43 16L3 11h18l-2.43 5H5.43zM11 2H9v7h2V2zm4 4h-2v3h2V6z"/>
                  </svg>
                  <span>{s.code}</span>
                </div>
              ))}
            </div>

            {/* Bottom Row Slips (Block B) */}
            <div className="flex justify-between items-center space-x-2 overflow-x-auto pt-2">
              {[
                { code: 'B-01', color: 'border-pink-500 bg-pink-50 text-pink-800' },
                { code: 'B-02', color: 'border-cyan-500 bg-cyan-50 text-cyan-800' },
                { code: 'B-03', color: 'border-cyan-500 bg-cyan-50 text-cyan-800' },
                { code: 'B-04', color: 'border-teal-500 bg-teal-50 text-teal-800' },
                { code: 'B-05', color: 'border-teal-500 bg-teal-50 text-teal-800' },
                { code: 'B-06', color: 'border-emerald-500 bg-emerald-50 text-emerald-800' },
                { code: 'B-07', color: 'border-amber-500 bg-amber-50 text-amber-800' },
                { code: 'B-08', color: 'border-amber-500 bg-amber-50 text-amber-800' },
                { code: 'B-09', color: 'border-orange-500 bg-orange-50 text-orange-800' },
                { code: 'B-10', color: 'border-orange-500 bg-orange-50 text-orange-800' },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`w-14 h-22 rounded-full border-2 ${s.color} flex flex-col justify-between items-center py-2.5 text-[11px] font-mono font-bold shadow-sm transition-transform hover:scale-110 cursor-pointer`}
                >
                  <svg className="w-4 h-4 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.86 0 3.65-.67 5-1.84 2.7 2.31 6.3 2.31 9 0 1.35 1.17 3.14 1.84 5 1.84h2v-2h-2zM5.43 16L3 11h18l-2.43 5H5.43zM11 2H9v7h2V2zm4 4h-2v3h2V6z"/>
                  </svg>
                  <span>{s.code}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
