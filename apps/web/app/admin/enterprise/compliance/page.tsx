'use client';

import React, { useEffect, useState } from 'react';

export default function CompliancePage() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/enterprise/privacy-requests')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setRequests(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">COMPLIANCE &amp; POLICY VERSIONING</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Consent &amp; GDPR Data Privacy</h1>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">GDPR &amp; Privacy Request Queue</h2>

        <div className="space-y-3 font-mono text-xs">
          {requests.map((r) => (
            <div key={r.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-white font-bold">Request #{r.id} — {r.requestType}</span>
                <span className="text-slate-500 block text-[10px]">Customer ID: {r.customerId}</span>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold text-[10px] uppercase">
                ✓ {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
