'use client';

import React from 'react';
import Link from 'next/link';

export const IndustriesSection = () => {
  const industries = [
    { title: 'Yacht Charter Companies', desc: 'Streamline yacht discovery, quote generation, deposit collection, and guest experience customization.' },
    { title: 'Yacht Operators & Fleet Owners', desc: 'Manage vessel schedules, blackout maintenance periods, crew rostering, and operational health.' },
    { title: 'Yacht Brokers', desc: 'Manage customer CRM, charter contracts, commission logs, and multi-currency billing.' },
    { title: 'Marinas & Dock Operators', desc: 'Automate slip allocation, transient reservations, member boatyard accounts, and utility metering.' },
    { title: 'Yacht Clubs & Memberships', desc: 'Manage member portals, berth leases, dining reservations, and exclusive club events.' },
    { title: 'Luxury Event & Concierge', desc: 'Coordinate bespoke catering, bar packages, DJs, entertainment, and luxury event setups.' },
  ];

  return (
    <section className="py-24 bg-navy-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>🏢 Target Industry Sectors</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Built Around Your Marine Business
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            Tailored operational workflows designed for the specific demands of luxury charter companies, fleet owners, and marina managers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {industries.map((ind, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-navy-950 border border-slate-800 hover:border-gold-500/40 transition-all space-y-3">
              <h3 className="font-display text-xl font-bold text-white">{ind.title}</h3>
              <p className="text-slate-300 text-xs leading-relaxed">{ind.desc}</p>
              <div className="pt-2">
                <Link href="/industries" className="text-xs text-gold-500 font-semibold hover:underline flex items-center space-x-1">
                  <span>Explore Industry Solutions</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
