'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CrmDashboardPage() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/crm/leads')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setLeads(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">STAGE 07 — PHASE 5 AI, CRM &amp; REVENUE INTELLIGENCE</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">CRM &amp; Sales Intelligence Console</h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/crm/leads"
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            + Create New Lead
          </Link>
          <Link
            href="/admin/crm/ai-assistant"
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-colors flex items-center space-x-1.5"
          >
            <span>✨</span> <span>Open AI Assistant</span>
          </Link>
        </div>
      </div>

      {/* AI Daily Business Summary Widget (Requirement 67) */}
      <div className="p-6 rounded-2xl bg-purple-50 border border-purple-200 text-slate-800 shadow-sm space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between z-10 relative">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-white border border-purple-200 text-purple-800 font-mono font-bold text-xs">
              🤖 AI DAILY BUSINESS SUMMARY
            </span>
            <span className="text-xs font-mono text-purple-700">Updated 10 min ago</span>
          </div>
          <span className="text-xs font-mono text-purple-700 font-bold">Human-in-the-Loop Active</span>
        </div>

        <div className="z-10 relative space-y-1.5 text-xs text-purple-900 font-mono leading-relaxed">
          <div>• <span className="font-bold text-slate-900">14 New Inbound Leads</span> generated this week (Top source: Website &amp; Riviera Search).</div>
          <div>• <span className="font-bold text-slate-900">5 Leads Qualified</span> for high-value charter packages (&gt; €25,000 budget).</div>
          <div>• <span className="font-bold text-teal-700">€136,900 Total Revenue</span> recorded across Charter, Marina, and Yacht Club.</div>
          <div>• <span className="font-bold text-amber-700">2 Overdue Follow-Ups</span> require urgent sales rep attention today (Harrison Sterling).</div>
        </div>
      </div>

      {/* Top 4 CRM KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">ACTIVE PIPELINE LEADS</span>
          <div className="text-3xl font-bold font-mono text-slate-900">{leads.length || 14}</div>
          <div className="text-[11px] text-teal-700 font-semibold">5 Qualified &amp; In Negotiation</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">PIPELINE VALUE</span>
          <div className="text-3xl font-bold font-mono text-slate-900">€88,000</div>
          <div className="text-[11px] text-slate-500 font-medium">Est. Charter &amp; Slip Revenue</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">CONVERSION RATE</span>
          <div className="text-3xl font-bold font-mono text-emerald-600">34.2%</div>
          <div className="text-[11px] text-slate-500 font-medium">Lead to Confirmed Booking</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">TODAY&apos;S FOLLOW-UPS</span>
          <div className="text-3xl font-bold font-mono text-amber-600">2</div>
          <div className="text-[11px] text-slate-500 font-medium">1 Overdue • 1 Pending</div>
        </div>

      </div>

      {/* CRM Modules Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Sales Pipeline */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 flex flex-col justify-between hover:border-teal-300 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg">📊</div>
            <h3 className="font-display text-xl font-bold text-slate-900 mt-2">Interactive Sales Pipeline</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Visual Kanban board tracking lead stages from NEW to QUALIFIED, PROPOSAL, NEGOTIATION, and WON/LOST.
            </p>
          </div>
          <Link href="/admin/crm/pipeline" className="text-xs font-bold text-teal-700 hover:underline">
            Open Kanban Sales Pipeline →
          </Link>
        </div>

        {/* Customer 360 Timeline */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 flex flex-col justify-between hover:border-teal-300 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg">👤</div>
            <h3 className="font-display text-xl font-bold text-slate-900 mt-2">Customer 360 Activity Timeline</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Unified chronological timeline combining Calls, Emails, WhatsApp, Quotes, Bookings, Invoices, and Marina Slips.
            </p>
          </div>
          <Link href="/admin/crm/customers" className="text-xs font-bold text-teal-700 hover:underline">
            View Customer 360 Profiles →
          </Link>
        </div>

        {/* Automation Workflows */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 flex flex-col justify-between hover:border-teal-300 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg">⚡</div>
            <h3 className="font-display text-xl font-bold text-slate-900 mt-2">Automation Workflows Engine</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Trigger-Condition-Action engine with event idempotency guards preventing duplicate messages or actions.
            </p>
          </div>
          <Link href="/admin/crm/automations" className="text-xs font-bold text-teal-700 hover:underline">
            Manage Workflows &amp; Idempotency →
          </Link>
        </div>

      </div>

    </div>
  );
}
