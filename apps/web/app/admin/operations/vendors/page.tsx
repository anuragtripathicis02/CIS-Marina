'use client';

import React, { useEffect, useState } from 'react';

export default function VendorsPage() {
  const [vendors, setVendors] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/vendors')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setVendors(json.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">VENDOR DIRECTORY &amp; CONTRACTORS</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Operational Vendor Directory</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer">
            + Register New Vendor
          </button>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vendors.map((v) => (
          <div key={v.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-display text-xl font-bold text-slate-900">{v.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-300 text-[10px] font-mono font-bold">
                  {v.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">📍 {v.location}</p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 text-slate-700">
                <div>Contact: <span className="font-bold text-slate-900">{v.contactName}</span></div>
                <div>Email: <span className="font-mono">{v.email}</span></div>
                <div>Phone: <span className="font-mono">{v.phone}</span></div>
              </div>
              <p className="text-xs text-slate-600 font-medium">Services: {v.services}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                STATUS: {v.status}
              </span>
              <button className="text-teal-700 font-bold hover:underline cursor-pointer">
                View Work Orders →
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
