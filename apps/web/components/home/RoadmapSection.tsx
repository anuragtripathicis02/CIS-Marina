'use client';

import React from 'react';

export const RoadmapSection = () => {
  const phases = [
    {
      phase: 'PHASE 01',
      title: 'Digital Booking MVP',
      status: 'AVAILABLE NOW',
      accent: 'text-gold-500 border-gold-500/50 bg-gold-500/10',
      items: ['Yacht Discovery & Specs', 'Availability Engine & Locks', 'Stripe Multi-Currency Payments', 'Customer CRM & Invoices'],
    },
    {
      phase: 'PHASE 02',
      title: 'Fleet & Crew Operations',
      status: 'PLANNED',
      accent: 'text-teal-400 border-teal-400/50 bg-teal-400/10',
      items: ['Crew Scheduling & Rostering', 'STCW Certification Monitoring', 'Pre-Charter Safety Checklists', 'Vendor Maintenance Work Orders'],
    },
    {
      phase: 'PHASE 03',
      title: 'Smart IoT Operations',
      status: 'ROADMAP',
      accent: 'text-purple-400 border-purple-400/50 bg-purple-400/10',
      items: ['GPS Vessel Tracking', 'TimescaleDB Telemetry Stream', 'Engine & Battery Alerts', 'Automated Geofencing'],
    },
    {
      phase: 'PHASE 04',
      title: 'Connected Ecosystem',
      status: 'FUTURE VISION',
      accent: 'text-blue-400 border-blue-400/50 bg-blue-400/10',
      items: ['VIP Guest Mobile Application', 'Marina Slip Management', 'Yacht Club Member Engine', 'AI Operational Dispatcher'],
    },
  ];

  return (
    <section className="py-24 bg-navy-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>🗺️ Progressive Development Roadmap</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Build the Foundation. Expand Gradually.
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            NAUTICOS evolves systematically with your business—from core commercial booking MVP to an intelligent marine operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {phases.map((p, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-navy-900 border border-slate-800 space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-400">{p.phase}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${p.accent}`}>
                    {p.status}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">{p.title}</h3>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  {p.items.map((item, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="text-gold-500">▪</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
