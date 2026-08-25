'use client';

import React, { useEffect, useState } from 'react';

export default function BerthsInventoryPage() {
  const [marinas, setMarinas] = useState<any[]>([]);
  const [berthNumber, setBerthNumber] = useState('');
  const [maxLengthFt, setMaxLengthFt] = useState('100');
  const [maxBeamFt, setMaxBeamFt] = useState('25');
  const [maxDraftFt, setMaxDraftFt] = useState('12');
  const [pricePerNight, setPricePerNight] = useState('650');
  const [powerAvailable, setPowerAvailable] = useState(true);
  const [waterAvailable, setWaterAvailable] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/marinas')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setMarinas(json.data);
      })
      .catch(() => {});
  }, []);

  const handleCreateBerth = async (e: React.FormEvent) => {
    e.preventDefault();
    const dockId = marinas[0]?.docks[0]?.id || 'dock-1';

    try {
      let res: Response;
      const body = JSON.stringify({
        berthNumber,
        maxLengthFt: parseFloat(maxLengthFt),
        maxBeamFt: parseFloat(maxBeamFt),
        maxDraftFt: parseFloat(maxDraftFt),
        pricePerNight: parseFloat(pricePerNight),
        powerAvailable,
        waterAvailable,
      });

      try {
        res = await fetch(`/api/v1/marinas/docks/${dockId}/berths`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch(`http://localhost:4000/api/v1/marinas/docks/${dockId}/berths`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      }

      const json = await res.json();
      if (json.success) {
        alert(`Berth #${berthNumber} added successfully to inventory!`);
        setBerthNumber('');
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">BERTH CAPACITY &amp; UTILITIES</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Docks &amp; Berths Slip Inventory</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Create Berth Slip */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Add Berth Slip &amp; Capacity Specs
          </h2>

          <form onSubmit={handleCreateBerth} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Berth / Slip Identifier *</label>
              <input
                type="text"
                required
                placeholder="e.g. A-05"
                value={berthNumber}
                onChange={(e) => setBerthNumber(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold font-mono"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Max Length (ft)</label>
                <input
                  type="number"
                  required
                  value={maxLengthFt}
                  onChange={(e) => setMaxLengthFt(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Max Beam (ft)</label>
                <input
                  type="number"
                  required
                  value={maxBeamFt}
                  onChange={(e) => setMaxBeamFt(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Max Draft (ft)</label>
                <input
                  type="number"
                  required
                  value={maxDraftFt}
                  onChange={(e) => setMaxDraftFt(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Daily Rate (€ / Night) *</label>
              <input
                type="number"
                required
                value={pricePerNight}
                onChange={(e) => setPricePerNight(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-slate-700 font-semibold">Connected Utilities</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={powerAvailable} onChange={(e) => setPowerAvailable(e.target.checked)} />
                  <span>Shore Power</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={waterAvailable} onChange={(e) => setWaterAvailable(e.target.checked)} />
                  <span>Fresh Water</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              + Save Berth Slip to Inventory →
            </button>
          </form>
        </div>

        {/* Right Table: Active Docks & Berths */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 text-sm">Monaco Port Hercules — Berths Inventory</h3>
            <span className="text-xs text-slate-500">22 Berths Configured</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                  <th className="p-4">Slip #</th>
                  <th className="p-4">Dock</th>
                  <th className="p-4">Physical Limits (L × B × D)</th>
                  <th className="p-4">Rate / Night</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {[
                  { slip: 'A-01', dock: 'Dock Alpha', maxL: 120, maxB: 30, maxD: 14, rate: 850, status: 'OCCUPIED' },
                  { slip: 'A-02', dock: 'Dock Alpha', maxL: 100, maxB: 25, maxD: 12, rate: 650, status: 'AVAILABLE' },
                  { slip: 'A-03', dock: 'Dock Alpha', maxL: 80, maxB: 20, maxD: 10, rate: 450, status: 'RESERVED' },
                  { slip: 'A-04', dock: 'Dock Alpha', maxL: 60, maxB: 18, maxD: 8, rate: 350, status: 'MAINTENANCE' },
                  { slip: 'B-01', dock: 'Dock Bravo', maxL: 150, maxB: 35, maxD: 16, rate: 1200, status: 'OCCUPIED' },
                  { slip: 'B-02', dock: 'Dock Bravo', maxL: 110, maxB: 28, maxD: 13, rate: 750, status: 'AVAILABLE' },
                ].map((row) => (
                  <tr key={row.slip} className="hover:bg-slate-50/60">
                    <td className="p-4 font-bold font-mono text-slate-900 text-sm">{row.slip}</td>
                    <td className="p-4 text-slate-600">{row.dock}</td>
                    <td className="p-4 font-mono text-teal-800 font-bold">{row.maxL}&apos; × {row.maxB}&apos; × {row.maxD}&apos;</td>
                    <td className="p-4 font-bold text-slate-900">€{row.rate}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 font-mono font-bold text-[10px]">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
