'use client';

import React, { useEffect, useState } from 'react';

export default function AdminYachtsPage() {
  const [yachts, setYachts] = useState<any[]>([
    {
      id: 'y1',
      name: 'Ocean Pearl 115',
      registrationNumber: 'MON-9821',
      make: 'Majesty Yachts',
      lengthFt: 115,
      capacityPassengers: 12,
      hourlyRate: 2500.00,
      dailyRate: 18000.00,
      currency: 'USD',
      isActive: true,
    },
    {
      id: 'y2',
      name: 'Azure Horizon 88',
      registrationNumber: 'MON-8842',
      make: 'Sunseeker',
      lengthFt: 88,
      capacityPassengers: 10,
      hourlyRate: 1800.00,
      dailyRate: 14000.00,
      currency: 'EUR',
      isActive: true,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    registrationNumber: '',
    make: '',
    lengthFt: 100,
    capacityPassengers: 12,
    hourlyRate: 2000,
    dailyRate: 15000,
    currency: 'USD',
  });

  const loadYachts = async () => {
    try {
      let res = await fetch('/api/v1/yachts');
      if (!res.ok) res = await fetch('http://localhost:4000/api/v1/yachts');
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        setYachts(json.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    loadYachts();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res = await fetch('/api/v1/yachts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        res = await fetch('http://localhost:4000/api/v1/yachts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }
      const json = await res.json();
      if (json.success) {
        setShowModal(false);
        loadYachts();
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800">Fleet Vessel Inventory</h1>
          <p className="text-slate-500 text-xs mt-0.5">Manage yacht specifications, hourly/daily base pricing, and availability</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 shadow-sm cursor-pointer"
        >
          + Add New Yacht
        </button>
      </div>

      {/* Yacht Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {yachts.map((y) => (
          <div key={y.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-teal-700 font-bold">REG: #{y.registrationNumber || 'N/A'}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">ACTIVE</span>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-slate-800">{y.name}</h3>
              <p className="text-slate-500 text-xs">{y.make || 'Custom Build'} • {y.lengthFt || 100} ft • {y.capacityPassengers} Passengers</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
              <div>
                <div className="text-[10px] text-slate-400">Hourly Rate</div>
                <div className="text-slate-800 font-bold">${Number(y.hourlyRate).toLocaleString()}/hr</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400">Daily Rate</div>
                <div className="text-teal-600 font-bold">${Number(y.dailyRate).toLocaleString()}/day</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Yacht Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full space-y-4 text-left shadow-2xl">
            <h3 className="font-display text-xl font-bold text-slate-800">Add New Vessel to Fleet</h3>
            
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-medium">Yacht Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Sea Majesty 130"
                  className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Hourly Rate ($) *</label>
                  <input
                    type="number"
                    required
                    value={form.hourlyRate}
                    onChange={(e) => setForm({ ...form, hourlyRate: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Daily Rate ($) *</label>
                  <input
                    type="number"
                    required
                    value={form.dailyRate}
                    onChange={(e) => setForm({ ...form, dailyRate: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-teal-600 text-white font-bold"
                >
                  Save Vessel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
