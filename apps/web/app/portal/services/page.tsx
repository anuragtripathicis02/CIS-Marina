'use client';

import React, { useState } from 'react';

export default function ServicesMarketplacePage() {
  const [requestedService, setRequestedService] = useState<string | null>(null);

  const services = [
    { id: 's1', name: '5-Star Michelin Private Chef Experience', category: 'Catering', price: 1400, desc: 'Bespoke multi-course dining prepared on board by a 3-Michelin starred chef.' },
    { id: 's2', name: 'Seabob F5S & E-Foil Water Toys Package', category: 'Water Sports', price: 850, desc: 'Includes 2 Seabob F5S underwater scooters & Fliteboard e-foil with instructor.' },
    { id: 's3', name: 'Monaco Heliport VIP Helicopter Transfer', category: 'Transportation', price: 1200, desc: 'Private 7-minute Airbus H130 transfer from Nice Airport directly to Monaco Heliport.' },
    { id: 's4', name: 'Dom Pérignon Sunset Champagne & Caviar Setup', category: 'Hospitality', price: 650, desc: '3 bottles of Dom Pérignon Vintage paired with Oscietra Grand Reserve Caviar.' },
  ];

  const handleRequestService = async (svc: any) => {
    try {
      let res: Response;
      const body = JSON.stringify({ serviceId: svc.id, serviceName: svc.name, totalPrice: svc.price });

      try {
        res = await fetch('/api/v1/portal/services/request?customerId=cust-1', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch('http://localhost:4000/api/v1/portal/services/request?customerId=cust-1', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      }

      const json = await res.json();
      if (json.success) {
        setRequestedService(`✓ SERVICE REQUEST SUBMITTED: ${svc.name} is now UNDER REVIEW by Charter Ops.`);
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">DOCKSIDE &amp; ONBOARD ADD-ONS</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Services Marketplace</h1>
        </div>
      </div>

      {requestedService && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
          {requestedService}
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div key={s.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between hover:border-amber-500/40 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono font-bold text-[10px]">
                  {s.category}
                </span>
                <span className="font-serif text-lg font-bold text-white">€{s.price.toLocaleString()}</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-white">{s.name}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
            </div>

            <button
              onClick={() => handleRequestService(s)}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              + Request Service Add-On →
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
