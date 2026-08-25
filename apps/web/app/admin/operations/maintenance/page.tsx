'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MaintenanceManagementPage() {
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/maintenance')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setRecords(json.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">MAINTENANCE &amp; WORK ORDERS</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Fleet Maintenance Board</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer">
            + Create Work Order
          </button>
        </div>
      </div>

      {/* Maintenance Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-800">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-6">Work Order Title</th>
                <th className="py-3.5 px-6">Vessel</th>
                <th className="py-3.5 px-6">Priority</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Availability Impact</th>
                <th className="py-3.5 px-6">Assigned Vendor</th>
                <th className="py-3.5 px-6">Est. Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">{r.title}</div>
                    <div className="text-slate-500 text-[11px] max-w-sm">{r.description}</div>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-800">{r.yacht?.name || 'Ocean Pearl 115'}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                        r.priority === 'CRITICAL' || r.priority === 'HIGH'
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {r.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-300 text-[10px] font-mono font-bold uppercase">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {r.isBlocking ? (
                      <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 font-mono font-bold text-[10px]">
                        BLOCKS CHARTER AVAILABILITY
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                        NON-BLOCKING
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 font-semibold text-teal-700">{r.assignedVendorName || 'Monaco Marine Yard'}</td>
                  <td className="py-4 px-6 font-mono font-bold text-slate-900">
                    ${r.estimatedCost ? r.estimatedCost.toLocaleString() : '4,500.00'}
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
