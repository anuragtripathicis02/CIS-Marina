'use client';

import React, { useEffect, useState } from 'react';

export default function SubscriptionsPage() {
  const [sub, setSub] = useState<any>({
    planName: 'BUSINESS',
    status: 'ACTIVE',
    userLimit: 25,
    yachtLimit: 15,
    bookingLimit: 1000,
    aiRequestLimit: 5000,
    storageLimitMb: 100000,
    currentStorageUsedMb: 14200,
  });

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/enterprise/subscription')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setSub(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">SaaS SUBSCRIPTION TIER &amp; LIMITS</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Organization Subscription &amp; Quotas</h1>
        </div>
      </div>

      {/* Plan Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-amber-500/30 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-amber-400 uppercase">CURRENT SUBSCRIPTION</span>
          <h2 className="font-serif text-2xl font-bold text-white">{sub.planName} SaaS Tier</h2>
          <p className="text-slate-400 text-xs font-mono">Renews automatically via Stripe Billing</p>
        </div>

        <span className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold text-xs">
          ✓ {sub.status}
        </span>
      </div>

      {/* Usage Limit Meters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <span className="text-slate-400 block">STAFF USERS LIMIT</span>
          <div className="text-2xl font-bold text-white">8 / {sub.userLimit} Users</div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 w-[32%]" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <span className="text-slate-400 block">FLEET YACHT LIMIT</span>
          <div className="text-2xl font-bold text-white">5 / {sub.yachtLimit} Vessels</div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 w-[33%]" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <span className="text-slate-400 block">STORAGE USED</span>
          <div className="text-2xl font-bold text-white">{(sub.currentStorageUsedMb / 1024).toFixed(1)} GB / {(sub.storageLimitMb / 1024).toFixed(0)} GB</div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-400 w-[14%]" />
          </div>
        </div>
      </div>

    </div>
  );
}
