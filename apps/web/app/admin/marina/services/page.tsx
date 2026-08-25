'use client';

import React, { useEffect, useState } from 'react';

export default function MarinaServicesPage() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/marina-services')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setServices(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">UTILITIES &amp; DOCKSIDE ADD-ONS</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Marina Services Catalog</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono font-bold text-[10px] uppercase">
                {s.category}
              </span>
              <h3 className="font-display text-lg font-bold text-slate-900 mt-2">{s.name}</h3>
              <p className="text-slate-500 text-xs mt-1 font-mono">Pricing Model: {s.pricingModel}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xl font-bold font-mono text-slate-900">€{s.unitPrice}</span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                ACTIVE
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
