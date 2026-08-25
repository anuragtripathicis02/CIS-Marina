'use client';

import React, { useState } from 'react';

export const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'fleet' | 'crew' | 'customers' | 'marina' | 'analytics'>('bookings');

  return (
    <section id="interactive-demo" className="py-24 bg-navy-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>💻 Interactive Product Simulator</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            See Your Business, Connected.
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            Switch between core operational domain tabs to preview simulated live dashboard views.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(['bookings', 'fleet', 'crew', 'customers', 'marina', 'analytics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 shadow-lg scale-105'
                  : 'bg-navy-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Preview Container */}
        <div className="bg-navy-950 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto shadow-2xl text-left">
          
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Booking Pipeline & State Machine</h3>
                  <p className="text-xs text-slate-400">PostgreSQL exclusion locks active • Zero date overlap risk</p>
                </div>
                <span className="px-3 py-1 rounded bg-gold-500/20 text-gold-500 text-xs font-semibold">14 ACTIVE CHARTERS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-navy-900 border border-slate-800">
                  <div className="text-xs font-semibold text-slate-400 uppercase">Inquiries & Quotes</div>
                  <div className="text-2xl font-bold font-mono text-white mt-1">8 Pending</div>
                  <div className="text-[11px] text-slate-500 mt-2">Auto quote calculation active</div>
                </div>
                <div className="p-4 rounded-xl bg-navy-900 border border-slate-800">
                  <div className="text-xs font-semibold text-slate-400 uppercase">Deposit Confirmed</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">$124,000.00</div>
                  <div className="text-[11px] text-slate-500 mt-2">Stripe Payment Intent Captured</div>
                </div>
                <div className="p-4 rounded-xl bg-navy-900 border border-slate-800">
                  <div className="text-xs font-semibold text-slate-400 uppercase">Completed Charters</div>
                  <div className="text-2xl font-bold font-mono text-teal-400 mt-1">42 This Month</div>
                  <div className="text-[11px] text-slate-500 mt-2">PDF Invoices Archived</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fleet' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Fleet Inventory & Availability</h3>
                  <p className="text-xs text-slate-400">Blackout maintenance schedules & vessel readiness</p>
                </div>
                <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-semibold">18/20 VESSELS READY</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white text-sm">Ocean Pearl 115 (Superyacht)</div>
                    <div className="text-slate-400 mt-0.5">Capacity: 12 Guests • Hourly: $2,500/hr</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-semibold">AVAILABLE</span>
                </div>
                <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white text-sm">Azure Horizon 88 (Flybridge)</div>
                    <div className="text-slate-400 mt-0.5">Capacity: 10 Guests • Daily: $14,000/day</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-gold-500/20 text-gold-500 font-semibold">ON CHARTER</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'crew' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Crew Roster & STCW Licenses</h3>
                  <p className="text-xs text-slate-400">Automated certification expiration monitoring</p>
                </div>
                <span className="px-3 py-1 rounded bg-teal-500/20 text-teal-400 text-xs font-semibold">100% COMPLIANT</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-navy-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white">Capt. Marcus Sterling</span>
                    <span className="text-slate-400 ml-2">• Master 3000 GT License</span>
                  </div>
                  <span className="text-emerald-400 font-mono">Assigned to Ocean Pearl</span>
                </div>
                <div className="p-3 rounded-lg bg-navy-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white">Chief Engineer Elena Vance</span>
                    <span className="text-slate-400 ml-2">• Y1 Marine Engineer</span>
                  </div>
                  <span className="text-emerald-400 font-mono">STCW Valid thru 2028</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Customer CRM & VIP Profiles</h3>
                  <p className="text-xs text-slate-400">Lifetime charter spend & guest preferences</p>
                </div>
                <span className="px-3 py-1 rounded bg-gold-500/20 text-gold-500 text-xs font-semibold">1,240 CRM RECORDS</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-navy-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white">Lord Sterling</span>
                    <span className="text-gold-500 ml-2">★ VIP GUEST</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-white">$142,000 Lifetime Spend</div>
                    <div className="text-[10px] text-slate-400">Prefers Champagne & Water Sports</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'marina' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Marina Dock & Slip Allocation</h3>
                  <p className="text-xs text-slate-400">Real-time slip map & shore power utility readings</p>
                </div>
                <span className="px-3 py-1 rounded bg-teal-500/20 text-teal-400 text-xs font-semibold">DOCK A & B ONLINE</span>
              </div>

              <div className="grid grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                  <div className="font-mono font-bold">SLIP A-01</div>
                  <div className="text-[10px] mt-1">Occupied (M/Y Pearl)</div>
                </div>
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                  <div className="font-mono font-bold">SLIP A-02</div>
                  <div className="text-[10px] mt-1">Occupied (Sunseeker)</div>
                </div>
                <div className="p-3 rounded-lg bg-navy-900 border border-gold-500/40 text-gold-400">
                  <div className="font-mono font-bold">SLIP A-03</div>
                  <div className="text-[10px] mt-1">Reserved (14:00 UTC)</div>
                </div>
                <div className="p-3 rounded-lg bg-navy-900 border border-slate-800 text-slate-400">
                  <div className="font-mono font-bold">SLIP A-04</div>
                  <div className="text-[10px] mt-1">Vacant / Available</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Executive Operational Analytics</h3>
                  <p className="text-xs text-slate-400">Charter revenue growth & fleet utilization metrics</p>
                </div>
                <span className="px-3 py-1 rounded bg-gold-500/20 text-gold-500 text-xs font-semibold">Q3 FINANCIALS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-2">
                  <div className="text-slate-400 font-semibold">Quarterly Revenue Growth</div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono">+24.8% YoY</div>
                  <div className="text-[11px] text-slate-500">Driven by luxury event add-ons</div>
                </div>
                <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-2">
                  <div className="text-slate-400 font-semibold">Average Charter Booking Value</div>
                  <div className="text-2xl font-bold text-gold-500 font-mono">$18,450.00</div>
                  <div className="text-[11px] text-slate-500">Multi-currency conversion verified</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
