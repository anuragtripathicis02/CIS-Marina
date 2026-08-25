'use client';

import React, { useEffect, useState } from 'react';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/enterprise/audit-logs')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setLogs(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">IMMUTABLE SECURITY AUDIT TRAIL</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Enterprise Audit Logs</h1>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">Audit Activity Stream</h2>

        <div className="space-y-3 font-mono text-xs">
          {logs.map((l) => (
            <div key={l.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-amber-400 font-bold">{l.action}</span>
                  <span className="text-slate-500">[{l.resource}: {l.resourceId}]</span>
                </div>
                <div className="text-slate-400 text-[10px]">User: {l.user} • IP: {l.ipAddress}</div>
              </div>

              <div className="text-right">
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${l.result === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-950/60 text-red-300 border border-red-800'}`}>
                  {l.result}
                </span>
                <span className="text-slate-500 text-[10px] block mt-1">{new Date(l.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
