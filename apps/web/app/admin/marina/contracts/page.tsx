'use client';

import React, { useEffect, useState } from 'react';

export default function MarinaContractsPage() {
  const [contracts, setContracts] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/marina-contracts')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setContracts(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">TENANCY &amp; LEASE MANAGEMENT</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Marina Tenant Berth Contracts</h1>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 text-sm">Active &amp; Seasonal Tenant Contracts</h3>
          <span className="text-xs text-slate-500">{contracts.length} Contracts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                <th className="p-4">Contract #</th>
                <th className="p-4">Tenant / Customer</th>
                <th className="p-4">Vessel</th>
                <th className="p-4">Berth Slip</th>
                <th className="p-4">Tenancy Type</th>
                <th className="p-4">Contract Term</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {contracts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60">
                  <td className="p-4 font-bold font-mono text-teal-700 text-sm">{c.contractNumber}</td>
                  <td className="p-4 font-bold text-slate-900">{c.customer?.firstName} {c.customer?.lastName}</td>
                  <td className="p-4 text-slate-700 font-semibold">{c.vessel?.vesselName}</td>
                  <td className="p-4 font-bold font-mono text-slate-900">{c.berth?.berthNumber}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono font-bold text-[10px]">
                      {c.type}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-600">
                    {new Date(c.startDate).toLocaleDateString()} → {new Date(c.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-bold text-slate-900">€{c.price.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono font-bold text-[10px]">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
