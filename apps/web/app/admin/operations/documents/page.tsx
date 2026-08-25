'use client';

import React from 'react';
import Link from 'next/link';

export default function OperationalDocumentsPage() {
  const documents = [
    { id: 'doc-1', name: 'Master 3000 GT License (Captain Picard)', type: 'CREW_LICENSE', expiry: '2027-08-30' },
    { id: 'doc-2', name: 'STCW Basic Safety Training (Riker)', type: 'CREW_CERTIFICATE', expiry: '2026-09-15' },
    { id: 'doc-3', name: 'SOLAS Liferaft Annual Audit Certificate', type: 'SAFETY_AUDIT', expiry: '2027-01-10' },
    { id: 'doc-4', name: 'Ocean Pearl 115 Commercial Hull Insurance', type: 'INSURANCE', expiry: '2027-05-01' },
  ];

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">OPERATIONAL DOCUMENTS &amp; VAULT</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Operational Documents &amp; Certificates</h1>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs text-slate-800">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-6">Document Name</th>
              <th className="py-3.5 px-6">Type</th>
              <th className="py-3.5 px-6">Expiry Date</th>
              <th className="py-3.5 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-medium">
            {documents.map((d) => (
              <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-900 text-sm">{d.name}</td>
                <td className="py-4 px-6 font-mono text-slate-700">{d.type}</td>
                <td className="py-4 px-6 font-mono text-slate-800">{d.expiry}</td>
                <td className="py-4 px-6">
                  <button className="text-teal-700 font-bold hover:underline cursor-pointer">
                    Download Vault File →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
