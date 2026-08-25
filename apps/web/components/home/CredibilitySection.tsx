'use client';

import React from 'react';

export const CredibilitySection = () => {
  const verticals = [
    { title: 'Yacht Charter Operators', desc: 'Automated booking pipelines & deposit management' },
    { title: 'Fleet Management Companies', desc: 'Vessel scheduling, crew rosters & maintenance alerts' },
    { title: 'Marina & Slip Managers', desc: 'Dock allocation, utility metering & transient reservations' },
    { title: 'Yacht Clubs & Memberships', desc: 'Member portals, dining reservations & event dispatch' },
    { title: 'Luxury Event & Concierge', desc: 'Bespoke catering, bar packages, DJs & floral services' },
    { title: 'Yacht Brokers', desc: 'Client CRM, digital contracts & commission accounting' },
  ];

  return (
    <section className="py-16 bg-navy-950 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold text-gold-500 uppercase tracking-widest mb-3">
          BUILT FOR THE COMPLEXITY OF MODERN YACHT OPERATIONS
        </p>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-10">
          Serving Every Sector of the Luxury Marine Industry
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {verticals.map((v, i) => (
            <div key={i} className="p-4 rounded-xl bg-navy-900/60 border border-slate-800 text-left hover:border-gold-500/40 transition-colors group">
              <div className="text-gold-500 text-base mb-2 group-hover:scale-110 transition-transform">⚓</div>
              <h4 className="font-semibold text-white text-xs">{v.title}</h4>
              <p className="text-slate-400 text-[11px] mt-1 leading-snug">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
