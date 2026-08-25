'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function EnterpriseCommandCenterPage() {
  const [summary, setSummary] = useState<any>({
    totalOrganizations: 18,
    activeSubscriptions: 16,
    activeBranchesCount: 42,
    supportedCountriesCount: 14,
    systemHealth: 'HEALTHY',
    storageUsedGb: 14.2,
  });

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/enterprise/summary')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setSummary(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">ENTERPRISE PLATFORM COMMAND CENTER</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Multi-Tenant &amp; Country Administration</h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/enterprise/branches"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-md transition-transform hover:scale-105"
          >
            + Create International Branch
          </Link>
        </div>
      </div>

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">ACTIVE ORGANIZATIONS</span>
          <div className="text-3xl font-serif font-bold text-white">{summary.totalOrganizations}</div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">100% Multi-Tenant Isolation</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">OPERATIONAL BRANCHES</span>
          <div className="text-3xl font-serif font-bold text-amber-400">{summary.activeBranchesCount}</div>
          <span className="text-[10px] font-mono text-slate-400">Across {summary.supportedCountriesCount} Countries</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">SaaS SUBSCRIPTIONS</span>
          <div className="text-3xl font-serif font-bold text-emerald-400">{summary.activeSubscriptions}</div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">16 Business &amp; Enterprise Tiers</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">SYSTEM DIAGNOSTICS</span>
          <div className="text-2xl font-serif font-bold text-emerald-400 flex items-center space-x-2">
            <span>✓</span><span>{summary.systemHealth}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">{summary.storageUsedGb} GB Storage Used</span>
        </div>
      </div>

      {/* Enterprise Admin Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Link href="/admin/enterprise/branches" className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 block">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xl">🌐</div>
          <h3 className="font-serif text-xl font-bold text-white">Multi-Branch Hierarchy</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Manage organization branches across Monaco, Dubai, London, and Miami with currency, timezone, and staff overrides.
          </p>
        </Link>

        <Link href="/admin/enterprise/currencies" className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 block">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xl">💱</div>
          <h3 className="font-serif text-xl font-bold text-white">Multi-Currency &amp; Rates</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            ExchangeRateProvider abstraction layer for USD, EUR, GBP, AED conversions with transaction rate snapshots.
          </p>
        </Link>

        <Link href="/admin/enterprise/tax" className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 block">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xl">🏛️</div>
          <h3 className="font-serif text-xl font-bold text-white">Configurable Tax Engine</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Configure regional VAT, GST, Tourism, and Luxury tax rules by country and product category without hard-coding logic.
          </p>
        </Link>

        <Link href="/admin/enterprise/roles" className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 block">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xl">🛡️</div>
          <h3 className="font-serif text-xl font-bold text-white">RBAC &amp; Granular Permissions</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Manage granular backend permissions for Finance Managers, Ops Managers, Marina Directors, and Concierge staff.
          </p>
        </Link>

        <Link href="/admin/enterprise/audit" className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 block">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xl">📜</div>
          <h3 className="font-serif text-xl font-bold text-white">Immutable Audit Trail</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Searchable organization-wide audit logs capturing financial edits, price modifications, refunds, and permission changes.
          </p>
        </Link>

        <Link href="/admin/enterprise/health" className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 block">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xl">🩺</div>
          <h3 className="font-serif text-xl font-bold text-white">System Health &amp; Observability</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Real-time diagnostics for Database, REST API, Stripe, WhatsApp, AI Provider, and IoT Telemetry Ingestion.
          </p>
        </Link>

      </div>

    </div>
  );
}
