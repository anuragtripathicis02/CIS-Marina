'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LiveFleetMapPage() {
  const [connectionStatus, setConnectionStatus] = useState<'LIVE' | 'RECONNECTING' | 'DISCONNECTED'>('LIVE');
  const [selectedVessel, setSelectedVessel] = useState<any>(null);

  const [vessels, setVessels] = useState<any[]>([
    {
      id: 'y1',
      name: 'Ocean Pearl 115',
      lat: 43.7374,
      lng: 7.4273,
      speed: 18.2,
      heading: 142,
      status: 'MOVING',
      opStatus: 'READY',
      lastUpdate: '4 sec ago',
      bookingRef: 'BK-1024 (Lord Sterling)',
      locationName: 'Monaco Port Hercules',
    },
    {
      id: 'y2',
      name: 'Azure Horizon 88',
      lat: 43.6891,
      lng: 7.3325,
      speed: 0.0,
      heading: 90,
      status: 'STOPPED',
      opStatus: 'READY',
      lastUpdate: '12 sec ago',
      bookingRef: 'BK-1025 (Captain Harrison)',
      locationName: 'Saint-Jean-Cap-Ferrat',
    },
    {
      id: 'y3',
      name: 'Sea Majesty 130',
      lat: 25.0772,
      lng: 55.1332,
      speed: 0.0,
      heading: 0,
      status: 'ALERT',
      opStatus: 'MAINTENANCE',
      lastUpdate: '1 min ago',
      bookingRef: 'No Active Booking',
      locationName: 'Dubai Marina, UAE',
    },
  ]);

  useEffect(() => {
    setSelectedVessel(vessels[0]);
  }, []);

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">STAGE 05 — PHASE 3 IoT TELEMETRY</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Live Connected Fleet Map</h1>
        </div>

        {/* Real-Time SSE Transport Connection Status (Requirement 35) */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-mono font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-800">STREAM: {connectionStatus}</span>
          </div>

          <span className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-mono font-bold">
            SIMULATED DATA
          </span>
        </div>
      </div>

      {/* Live Map Vector Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Interactive Map Canvas */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative min-h-[500px] flex flex-col justify-between overflow-hidden">
          
          {/* Top Overlay Stats */}
          <div className="flex items-center justify-between z-10">
            <div className="bg-slate-800/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700 text-slate-200 text-xs font-mono font-semibold">
              📍 Active Fleet Lat/Lng Projection • 3 Vessels Connected
            </div>
            <div className="bg-slate-800/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700 text-emerald-400 text-xs font-mono font-bold">
              ✓ Telemetry Quality: GOOD
            </div>
          </div>

          {/* Map Vector Graphic (Simulated Coastal Map grid) */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* Vessel Markers on Map */}
          <div className="relative z-10 my-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            {vessels.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVessel(v)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedVessel?.id === v.id
                    ? 'bg-teal-950/80 border-teal-400 text-white shadow-lg ring-2 ring-teal-500/50'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{v.name}</span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      v.status === 'MOVING'
                        ? 'bg-emerald-400 animate-ping'
                        : v.status === 'STOPPED'
                        ? 'bg-cyan-400'
                        : 'bg-red-500 animate-pulse'
                    }`}
                  />
                </div>

                <div className="text-[11px] font-mono text-slate-400 mt-2 space-y-0.5">
                  <div>Status: <span className="text-teal-300 font-bold">{v.status}</span></div>
                  <div>Speed: <span className="text-white font-bold">{v.speed} knots</span></div>
                  <div>Heading: <span className="text-slate-200">{v.heading}°</span></div>
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Map Controls Bar */}
          <div className="flex items-center justify-between z-10 text-[11px] font-mono text-slate-400 pt-4 border-t border-slate-800">
            <span>Coordinate System: WGS 84</span>
            <span>Update Frequency: 5.0 Seconds</span>
          </div>
        </div>

        {/* Right Vessel Detail Card */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          {selectedVessel ? (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-mono font-bold uppercase">
                  {selectedVessel.status}
                </span>
                <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">{selectedVessel.name}</h2>
                <p className="text-slate-500 text-xs mt-0.5">{selectedVessel.locationName}</p>
              </div>

              {/* Data Freshness Indicator (Requirement 36) */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Telemetry Freshness:</span>
                  <span className="font-bold text-emerald-700">✓ {selectedVessel.lastUpdate}</span>
                </div>
                <div className="text-[10px] text-slate-400">Lat: {selectedVessel.lat} • Lng: {selectedVessel.lng}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-medium">Speed:</span>
                  <div className="font-bold font-mono text-lg text-slate-900">{selectedVessel.speed} kts</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-medium">Heading:</span>
                  <div className="font-bold font-mono text-lg text-slate-900">{selectedVessel.heading}°</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="text-slate-500 font-medium">Active Booking:</span>
                <div className="font-bold text-slate-800">{selectedVessel.bookingRef}</div>
              </div>

              <Link
                href={`/admin/operations/vessels/${selectedVessel.id}`}
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs text-center block shadow-md transition-colors"
              >
                Open Smart Vessel Dashboard →
              </Link>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select a vessel on the map to inspect live metrics.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
