'use client';

import React, { useEffect, useState } from 'react';

export default function BranchesPage() {
  const [branches, setBranches] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/enterprise/branches')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setBranches(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">ENTERPRISE HIERARCHY</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Multi-Branch Management</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {branches.map((b) => (
          <div key={b.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between hover:border-amber-500/40 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono font-bold text-[10px]">
                  CODE: {b.code}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">✓ ACTIVE</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-white">{b.name}</h3>
              <p className="text-slate-400 text-xs font-mono">📍 {b.address}</p>

              <div className="pt-2 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-500 block">TIMEZONE</span>
                  <span className="text-white font-bold">{b.timezone}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-500 block">CURRENCY</span>
                  <span className="text-amber-400 font-bold">{b.currency}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
