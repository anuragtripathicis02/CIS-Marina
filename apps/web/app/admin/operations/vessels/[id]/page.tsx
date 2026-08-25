'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SmartVesselDashboardPage({ params }: { params: { id: string } }) {
  const [vessel, setVessel] = useState<any>({
    id: params.id || 'y1',
    name: 'Ocean Pearl 115',
    registrationNumber: 'MC-9941-X',
    make: 'Majesty Yachts',
    lengthFt: 115,
    location: 'Monaco Port Hercules',
    lat: 43.7374,
    lng: 7.4273,
    speed: 18.2,
    heading: 142,
    fuelLevel: 78,
    batteryVoltage: 12.8,
    engineTemp: 84.0,
    bilgeStatus: 'NORMAL',
    healthScore: 94,
    lastUpdate: '6 sec ago',
  });

  const [alerts, setAlerts] = useState<any[]>([]);
  const [trackHistory, setTrackHistory] = useState<any[]>([]);
  const [selectedRange, setSelectedRange] = useState('24h');

  useEffect(() => {
    fetch(`http://localhost:4000/api/v1/telemetry/history?yachtId=${params.id}&range=${selectedRange}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data && json.data.trackPoints) {
          setTrackHistory(json.data.trackPoints);
        }
      })
      .catch(() => {});

    fetch(`http://localhost:4000/api/v1/alerts?yachtId=${params.id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setAlerts(json.data);
        }
      })
      .catch(() => {});
  }, [params.id, selectedRange]);

  const handleRecommendMaintenance = async (alertId: string) => {
    try {
      let res = await fetch(`/api/v1/alerts/${alertId}/recommend-maintenance`, { method: 'POST' });
      if (!res.ok) res = await fetch(`http://localhost:4000/api/v1/alerts/${alertId}/recommend-maintenance`, { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        alert('Converted alert into a Phase 2 Maintenance Recommendation!');
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <Link href="/admin/operations/map" className="text-xs text-teal-700 font-semibold hover:underline">
            ← Back to Live Fleet Map
          </Link>
          <div className="flex items-center space-x-3 mt-1">
            <h1 className="font-display text-3xl font-bold text-slate-900">{vessel.name} Command Console</h1>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono font-bold text-xs">
              LIVE TELEMETRY
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 font-mono font-bold text-xs">
              SIMULATED DATA
            </span>
          </div>
          <p className="text-slate-500 text-xs mt-0.5">{vessel.make} • {vessel.lengthFt} ft • Reg: {vessel.registrationNumber} • {vessel.location}</p>
        </div>

        {/* Operational Health Score Card (Requirement 41) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center space-x-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 font-mono font-bold text-2xl flex items-center justify-center border border-teal-200">
            {vessel.healthScore}%
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">HEALTH SCORE</span>
            <h4 className="font-bold text-slate-900 text-sm">Operational Health</h4>
            <span className="text-[10px] text-slate-500">Calculated via Alerts &amp; Device Status</span>
          </div>
        </div>
      </div>

      {/* 5 Top Telemetry Metric Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        
        {/* Speed */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">CURRENT SPEED</span>
          <div className="text-2xl font-bold font-mono text-slate-900">{vessel.speed} kts</div>
          <div className="text-[10px] text-slate-500">Heading: {vessel.heading}° SE</div>
        </div>

        {/* Fuel Level */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">FUEL LEVEL</span>
          <div className="text-2xl font-bold font-mono text-slate-900">{vessel.fuelLevel}%</div>
          <div className="text-[10px] text-slate-500">Est. Range: 180 NM</div>
        </div>

        {/* Battery Voltage */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">BATTERY VOLTAGE</span>
          <div className="text-2xl font-bold font-mono text-slate-900">{vessel.batteryVoltage} V</div>
          <div className="text-[10px] text-emerald-600 font-semibold">✓ Normal Charge</div>
        </div>

        {/* Engine Temperature */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">ENGINE TEMP</span>
          <div className="text-2xl font-bold font-mono text-slate-900">{vessel.engineTemp} °C</div>
          <div className="text-[10px] text-slate-500">Normal Range (&lt; 90°C)</div>
        </div>

        {/* Bilge Status */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">BILGE SENSOR</span>
          <div className="text-2xl font-bold font-mono text-emerald-600">{vessel.bilgeStatus}</div>
          <div className="text-[10px] text-slate-500">0.0 mm Water Depth</div>
        </div>

      </div>

      {/* Track History & Route Polyline Map */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="font-display text-lg font-bold text-slate-900">Vessel Location &amp; Track History Polyline</h2>
          
          {/* Time Range Filter (Requirement 12) */}
          <div className="bg-slate-100 p-1 rounded-xl flex text-xs font-bold font-mono">
            {['1h', '6h', '24h', '7d', '30d'].map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRange(r)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedRange === r ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Map Polyline Graphic */}
        <div className="bg-slate-900 rounded-xl p-6 min-h-[300px] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 z-10">
            <span>📍 Active Route Coordinates ({trackHistory.length} Waypoints Recorded)</span>
            <span className="text-emerald-400">Total Distance: 18.4 NM</span>
          </div>

          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          {/* Polyline Route Summary */}
          <div className="z-10 bg-slate-800/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 text-xs font-mono text-slate-200 space-y-1">
            <div className="font-bold text-teal-400">Monaco Port Hercules Coastal Path:</div>
            <div>Start: 43.7374 N, 7.4273 E → Current: {vessel.lat} N, {vessel.lng} E</div>
            <div className="text-slate-400 text-[10px]">Average Speed: 15.2 knots • Max Speed: 22.0 knots</div>
          </div>
        </div>
      </div>

      {/* Active Telemetry Alerts & Maintenance Recommendation Section (Requirement 42) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Active Vessel Telemetry Alerts &amp; Maintenance Recommendations
        </h2>

        <div className="space-y-3">
          {alerts.map((alt) => (
            <div key={alt.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900 text-sm">{alt.title}</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold text-[10px]">
                    TRIGGERED {alt.triggerCount} TIMES
                  </span>
                </div>
                <div className="text-slate-600">{alt.message}</div>
              </div>

              <button
                onClick={() => handleRecommendMaintenance(alt.id)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shrink-0 transition-colors shadow-sm cursor-pointer"
              >
                + Create Maintenance Recommendation
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
