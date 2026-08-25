'use client';

import React, { useEffect, useState } from 'react';

export default function ConciergePage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [category, setCategory] = useState('Private Jet & Transport');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('2500');

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/portal/concierge?customerId=cust-1')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setRequests(json.data);
      })
      .catch(() => {});
  }, []);

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res: Response;
      const body = JSON.stringify({ category, description, budget: parseFloat(budget) });

      try {
        res = await fetch('/api/v1/portal/concierge?customerId=cust-1', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch('http://localhost:4000/api/v1/portal/concierge?customerId=cust-1', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      }

      const json = await res.json();
      if (json.success && json.data) {
        setRequests((prev) => [json.data, ...prev]);
        setDescription('');
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">BESPOKE VIP SERVICES</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Nauticos Concierge Desk</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Request Concierge */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">
            Submit Bespoke Request
          </h2>

          <form onSubmit={handleCreateRequest} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 mb-1">SERVICE CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
              >
                <option value="Private Jet & Transport">Private Jet &amp; Helicopter Transfer</option>
                <option value="Michelin Dining Reservation">Michelin Restaurant Reservations</option>
                <option value="VIP Event & Formula 1 Access">VIP Event &amp; Formula 1 Access</option>
                <option value="Villa & Coastal Estate">Villa &amp; Coastal Estate Rental</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">ESTIMATED BUDGET (€)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-amber-400 font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">REQUEST DETAILS</label>
              <textarea
                rows={4}
                required
                placeholder="Describe your special request, dates, and number of guests..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              👑 Submit Request to Concierge Team →
            </button>
          </form>
        </div>

        {/* Right Directory: Active Requests & Proposals */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">
            Active Requests ({requests.length})
          </h2>

          <div className="space-y-4">
            {requests.map((r) => (
              <div key={r.id} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{r.category}</span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${r.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
                    {r.status}
                  </span>
                </div>

                <p className="text-slate-300 font-sans">{r.description}</p>

                {r.proposalDetails && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300">
                    <span className="font-bold block mb-0.5">CONCIERGE PROPOSAL:</span>
                    {r.proposalDetails}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
