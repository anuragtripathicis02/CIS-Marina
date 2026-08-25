'use client';

import React from 'react';

export const FleetSection = () => {
  return (
    <section className="py-24 bg-navy-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>⚓ Operational Fleet Management</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Know Your Fleet. At a Glance.
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            Track vessel technical specifications, blackout maintenance periods, pre-charter safety checklists, and fuel telemetry from one dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <div className="p-6 rounded-2xl bg-navy-950 border border-slate-800 space-y-4 hover:border-gold-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gold-500/20 text-gold-500 flex items-center justify-center text-2xl font-bold">
              📅
            </div>
            <h3 className="font-display text-xl font-bold text-white">Visual Fleet Calendar</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Multi-yacht availability timeline showing confirmed charters, pending inquiries, owner blackout dates, and scheduled yard maintenance.
            </p>
            <ul className="text-xs text-slate-400 space-y-1 pt-2">
              <li className="flex items-center space-x-2"><span className="text-gold-500">✓</span><span>PostgreSQL Exclusion Lock Protection</span></li>
              <li className="flex items-center space-x-2"><span className="text-gold-500">✓</span><span>Seasonal Hourly & Daily Pricing Rules</span></li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-navy-950 border border-slate-800 space-y-4 hover:border-gold-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center text-2xl font-bold">
              📋
            </div>
            <h3 className="font-display text-xl font-bold text-white">Pre-Charter Safety Checklists</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Digital inspection logs required before vessel departure—verifying life rafts, fire extinguishers, fuel levels, and hull condition.
            </p>
            <ul className="text-xs text-slate-400 space-y-1 pt-2">
              <li className="flex items-center space-x-2"><span className="text-teal-400">✓</span><span>Captain & Crew Digital Signatures</span></li>
              <li className="flex items-center space-x-2"><span className="text-teal-400">✓</span><span>Immutable Audit Trail Logging</span></li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-navy-950 border border-slate-800 space-y-4 hover:border-gold-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl font-bold">
              🛠️
            </div>
            <h3 className="font-display text-xl font-bold text-white">Maintenance & Repair Logs</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Preventive maintenance tracking for engine service intervals, generator hours, haul-out dates, and vendor work orders.
            </p>
            <ul className="text-xs text-slate-400 space-y-1 pt-2">
              <li className="flex items-center space-x-2"><span className="text-purple-400">✓</span><span>Vendor Invoice Assignment</span></li>
              <li className="flex items-center space-x-2"><span className="text-purple-400">✓</span><span>Automated Service Interval Reminders</span></li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
