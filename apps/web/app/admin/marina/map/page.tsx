'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function VisualMarinaMapPage() {
  const [marina, setMarina] = useState<any>(null);
  const [selectedBerth, setSelectedBerth] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/marinas')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data && json.data.length > 0) {
          setMarina(json.data[0]);
          if (json.data[0].docks && json.data[0].docks[0]?.berths) {
            setSelectedBerth(json.data[0].docks[0].berths[0]);
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <Link href="/admin/marina" className="text-xs text-teal-700 font-semibold hover:underline">
            ← Back to Marina Command Center
          </Link>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-1">
            {marina?.name || 'Monaco Port Hercules Marina'} — Visual Layout Map
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">{marina?.address || 'Route de la Piscine, 98000 Monaco'}</p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-3 text-xs font-mono font-bold">
          <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded-full bg-emerald-500" /> <span>AVAILABLE</span></span>
          <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded-full bg-teal-600" /> <span>OCCUPIED</span></span>
          <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded-full bg-amber-500" /> <span>RESERVED</span></span>
          <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded-full bg-red-500" /> <span>MAINTENANCE</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Map & Dock Grid Canvas */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 relative overflow-hidden min-h-[500px]">
          
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 z-10 relative border-b border-slate-200 pb-3">
            <span>⚓ Dock Layout Plan • Basin Water Depth: 16.0 meters</span>
            <span className="text-emerald-700">Total Capacity: 22 Berths</span>
          </div>

          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#99f6e4_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* Docks Sections */}
          <div className="space-y-6 z-10 relative">
            
            {/* Dock 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Dock Alpha (Quai Antoine 1er)</span>
                <span className="text-xs font-mono text-teal-700">South Basin • 12 Slips</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'b-101', berthNumber: 'A-01', status: 'OCCUPIED', vessel: 'Ocean Pearl 115', maxL: 120, maxB: 30, price: 850 },
                  { id: 'b-102', berthNumber: 'A-02', status: 'AVAILABLE', vessel: 'None', maxL: 100, maxB: 25, price: 650 },
                  { id: 'b-103', berthNumber: 'A-03', status: 'RESERVED', vessel: 'Azure Horizon 88', maxL: 80, maxB: 20, price: 450 },
                  { id: 'b-104', berthNumber: 'A-04', status: 'MAINTENANCE', vessel: 'None', maxL: 60, maxB: 18, price: 350 },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBerth(b)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedBerth?.id === b.id
                        ? 'bg-teal-50 border-teal-500 text-slate-900 shadow-md ring-2 ring-teal-500/30'
                        : 'bg-white border-slate-200 hover:bg-teal-50/60 text-slate-600 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold font-mono text-sm text-slate-900">{b.berthNumber}</span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          b.status === 'AVAILABLE'
                            ? 'bg-emerald-400'
                            : b.status === 'OCCUPIED'
                            ? 'bg-teal-400 animate-pulse'
                            : b.status === 'RESERVED'
                            ? 'bg-amber-400'
                            : 'bg-red-500'
                        }`}
                      />
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-2 space-y-0.5">
                      <div>Status: <span className="text-slate-900 font-bold">{b.status}</span></div>
                      <div>Max: <span className="text-slate-600">{b.maxL} ft</span></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dock 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Dock Bravo (Quai des États-Unis)</span>
                <span className="text-xs font-mono text-teal-700">North Basin • Superyacht Deep Water</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'b-201', berthNumber: 'B-01', status: 'OCCUPIED', vessel: 'Sea Majesty 130', maxL: 150, maxB: 35, price: 1200 },
                  { id: 'b-202', berthNumber: 'B-02', status: 'AVAILABLE', vessel: 'None', maxL: 110, maxB: 28, price: 750 },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBerth(b)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedBerth?.id === b.id
                        ? 'bg-teal-50 border-teal-500 text-slate-900 shadow-md ring-2 ring-teal-500/30'
                        : 'bg-white border-slate-200 hover:bg-teal-50/60 text-slate-600 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold font-mono text-sm text-slate-900">{b.berthNumber}</span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          b.status === 'AVAILABLE' ? 'bg-emerald-400' : 'bg-teal-400 animate-pulse'
                        }`}
                      />
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-2 space-y-0.5">
                      <div>Status: <span className="text-slate-900 font-bold">{b.status}</span></div>
                      <div>Max: <span className="text-slate-600">{b.maxL} ft</span></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Berth Detail Drawer Card */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          {selectedBerth ? (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-mono font-bold uppercase">
                  BERTH {selectedBerth.berthNumber} • {selectedBerth.status}
                </span>
                <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">Berth Slip #{selectedBerth.berthNumber}</h2>
                <p className="text-slate-500 text-xs mt-0.5">Daily Rate: €{selectedBerth.price} / Night</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-900">Physical Capacity Specs:</div>
                <div className="grid grid-cols-3 gap-2 font-mono text-slate-700">
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">MAX LENGTH</span>
                    <span className="font-bold text-slate-900">{selectedBerth.maxL} ft</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">MAX BEAM</span>
                    <span className="font-bold text-slate-900">{selectedBerth.maxB || 25} ft</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">MAX DRAFT</span>
                    <span className="font-bold text-slate-900">12 ft</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <span className="text-slate-500 font-medium">Currently Docked / Assigned Vessel:</span>
                <div className="font-bold text-slate-900 text-sm">{selectedBerth.vessel}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <span className="text-slate-500 font-medium">Connected Utilities &amp; Services:</span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">✓ Shore Power (3-Phase)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">✓ Water Connection</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">✓ Sewage Pump-out</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">✓ Fuel Hookup</span>
                </div>
              </div>

              <Link
                href={`/admin/marina/reservations?berthId=${selectedBerth.id}`}
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs text-center block shadow-md transition-colors"
              >
                Reserve This Berth Slip →
              </Link>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select a berth slip on the layout map to inspect capacity &amp; reservations.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
