'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function IoTSimulatorPage() {
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleStart = async () => {
    try {
      let res = await fetch('/api/v1/simulator/start', { method: 'POST' });
      if (!res.ok) res = await fetch('http://localhost:4000/api/v1/simulator/start', { method: 'POST' });
      const json = await res.json();
      setStatusMsg(json.message);
    } catch (err) {}
  };

  const handleStop = async () => {
    try {
      let res = await fetch('/api/v1/simulator/stop', { method: 'POST' });
      if (!res.ok) res = await fetch('http://localhost:4000/api/v1/simulator/stop', { method: 'POST' });
      const json = await res.json();
      setStatusMsg(json.message);
    } catch (err) {}
  };

  const handleInjectAnomaly = async (anomalyType: string) => {
    try {
      let res = await fetch('/api/v1/simulator/inject-anomaly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ yachtId: 'y1', anomalyType }),
      });
      if (!res.ok) {
        res = await fetch('http://localhost:4000/api/v1/simulator/inject-anomaly', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ yachtId: 'y1', anomalyType }),
        });
      }
      const json = await res.json();
      setStatusMsg(json.message);
    } catch (err) {}
  };

  const handleClearAnomaly = async () => {
    try {
      let res = await fetch('/api/v1/simulator/clear-anomaly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ yachtId: 'y1' }),
      });
      if (!res.ok) {
        res = await fetch('http://localhost:4000/api/v1/simulator/clear-anomaly', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ yachtId: 'y1' }),
        });
      }
      const json = await res.json();
      setStatusMsg(json.message);
    } catch (err) {}
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">DEVELOPER TEST BENCH &amp; SIMULATOR</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">IoT Telemetry Mock Simulator</h1>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-mono font-bold">
          DEMO / SIMULATED DATA
        </span>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-mono font-bold">
          ✓ SIMULATOR NOTICE: {statusMsg}
        </div>
      )}

      {/* Simulator Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Simulation Loop Controls */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Periodic Telemetry Generator Controls
          </h2>
          <p className="text-slate-600 text-xs leading-relaxed">
            The simulator periodically emits normalized telemetry every 5.0 seconds for <span className="font-bold text-slate-900">Ocean Pearl 115</span> along a Monaco coastal route path.
          </p>

          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={handleStart}
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              ▶ Start Telemetry Loop
            </button>
            <button
              onClick={handleStop}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              ⏸ Pause Simulation
            </button>
          </div>
        </div>

        {/* Anomaly Injection Suite */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Sensor Anomaly Injection Suite (Testing Rules &amp; Alerts)
          </h2>
          <p className="text-slate-600 text-xs leading-relaxed">
            Inject sensor breaches to test alert generation, deduplication, and geofencing entry/exit events.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => handleInjectAnomaly('LOW_BATTERY')}
              className="p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 cursor-pointer transition-colors"
            >
              ⚡ Low Battery (11.2V)
            </button>
            <button
              onClick={() => handleInjectAnomaly('HIGH_SPEED')}
              className="p-2.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-300 hover:bg-purple-100 cursor-pointer transition-colors"
            >
              🏎️ High Speed (34 kts)
            </button>
            <button
              onClick={() => handleInjectAnomaly('HIGH_ENGINE_TEMP')}
              className="p-2.5 rounded-xl bg-red-50 text-red-900 border border-red-300 hover:bg-red-100 cursor-pointer transition-colors"
            >
              🔥 Engine Temp (98.4°C)
            </button>
            <button
              onClick={() => handleInjectAnomaly('GEOFENCE_EXIT')}
              className="p-2.5 rounded-xl bg-cyan-50 text-cyan-900 border border-cyan-300 hover:bg-cyan-100 cursor-pointer transition-colors"
            >
              📍 Geofence Exit
            </button>
          </div>

          <button
            onClick={handleClearAnomaly}
            className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs cursor-pointer transition-colors mt-2"
          >
            Clear All Anomalies &amp; Return to Normal Operations
          </button>
        </div>

      </div>

    </div>
  );
}
