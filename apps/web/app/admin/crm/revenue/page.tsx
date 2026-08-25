'use client';

import React, { useEffect, useState } from 'react';

export default function RevenueAnalyticsPage() {
  const [revenue, setRevenue] = useState<any>({
    totalRevenue: 136900,
    bookingRevenue: 64500,
    marinaRevenue: 48500,
    membershipRevenue: 19000,
    serviceRevenue: 8400,
    outstandingPayments: 4250,
    averageBookingValue: 14500,
    aiPricingRecommendations: [
      {
        targetId: 'b-101',
        targetName: 'Ocean Pearl 115 — Monaco Berth Slip A-01',
        currentPrice: 850,
        recommendedPrice: 975,
        reason: 'High demand during Monaco Grand Prix week. Historical berth occupancy is 92%.',
        demandLevel: 'HIGH',
      },
    ],
  });

  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/revenue/summary')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setRevenue(json.data);
      })
      .catch(() => {});
  }, []);

  const handleApproveRecommendation = async (rec: any) => {
    setStatusMsg(null);
    try {
      let res: Response;
      const body = JSON.stringify({ targetId: rec.targetId, newPrice: rec.recommendedPrice });

      try {
        res = await fetch('/api/v1/revenue/approve-recommendation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch('http://localhost:4000/api/v1/revenue/approve-recommendation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      }

      const json = await res.json();
      if (json.success) {
        setStatusMsg(`✓ MANAGER APPROVAL EXECUTED: ${json.data?.message}`);
      }
    } catch (err: any) {
      setStatusMsg(err.message);
    }
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">REVENUE INTELLIGENCE &amp; AI PRICING</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Unified Revenue &amp; Dynamic Pricing</h1>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-mono font-bold">
          {statusMsg}
        </div>
      )}

      {/* Top 4 Revenue Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">TOTAL NET REVENUE</span>
          <div className="text-3xl font-bold font-mono text-teal-700">€{revenue.totalRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 font-medium">After Refunds &amp; Deductions</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">CHARTER REVENUE</span>
          <div className="text-3xl font-bold font-mono text-slate-900">€{revenue.bookingRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 font-medium">Yacht Charter Bookings</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">MARINA SLIP REVENUE</span>
          <div className="text-3xl font-bold font-mono text-slate-900">€{revenue.marinaRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 font-medium">Berth Tenancy &amp; Slips</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">YACHT CLUB REVENUE</span>
          <div className="text-3xl font-bold font-mono text-slate-900">€{revenue.membershipRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 font-medium">Annual Club Memberships</div>
        </div>

      </div>

      {/* AI Pricing Recommendation Widget (Human-in-the-loop Safety) */}
      <div className="bg-gradient-to-r from-slate-900 to-teal-950 text-white rounded-2xl p-6 shadow-xl space-y-4 border border-teal-800/80">
        <div className="flex items-center justify-between border-b border-teal-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-teal-800/80 text-teal-200 border border-teal-500/50 font-mono font-bold text-xs">
              🤖 AI PRICING RECOMMENDATIONS
            </span>
            <span className="text-xs text-teal-300 font-mono">Manager Review &amp; Approval Required</span>
          </div>
        </div>

        <div className="space-y-3">
          {revenue.aiPricingRecommendations?.map((rec: any) => (
            <div key={rec.targetId} className="p-4 rounded-xl bg-slate-800/90 border border-teal-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-white text-sm">{rec.targetName}</div>
                <p className="text-teal-200">{rec.reason}</p>
                <div className="font-mono text-slate-300">
                  Current Rate: <span className="line-through text-slate-400">€{rec.currentPrice}</span> → Recommended Rate: <span className="font-bold text-emerald-400">€{rec.recommendedPrice}</span> / Night (+15%)
                </div>
              </div>

              <button
                onClick={() => handleApproveRecommendation(rec)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 shadow-md cursor-pointer transition-colors"
              >
                ✓ Review &amp; Approve Price Change
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
