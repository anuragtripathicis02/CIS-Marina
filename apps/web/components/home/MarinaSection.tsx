'use client';

import React from 'react';

export const MarinaSection = () => {
  return (
    <section className="py-24 bg-navy-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>🚤 Marina & Slip Management</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Bring Your Marina Operations Into One Place.
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            Digitize dock slip allocations, transient boat reservations, member boatyard accounts, and shore power utility billing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          
          <div className="p-6 rounded-2xl bg-navy-950 border border-slate-800 space-y-3">
            <div className="text-gold-500 font-bold text-lg">Smart Slip Allocation</div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Match arriving vessel beam, draft, and length overall (LOA) to appropriate marina docks with automated availability tracking.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-950 border border-slate-800 space-y-3">
            <div className="text-teal-400 font-bold text-lg">Shore Power & Utility Billing</div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Track electricity kWh and fresh water gallon meter readings per slip, automatically appending utility charges to member invoices.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-950 border border-slate-800 space-y-3">
            <div className="text-white font-bold text-lg">Member & Yacht Club Engine</div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Manage boatyard memberships, annual berth leases, dining reservations, and exclusive marina member event invitations.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
