'use client';

import React from 'react';

export const GlobalMarketsSection = () => {
  const markets = [
    { country: 'United Arab Emirates', flag: '🇦🇪', hub: 'Dubai Marina & Abu Dhabi' },
    { country: 'European Union', flag: '🇪🇺', hub: 'Monaco, Cannes, Mallorca & Amalfi' },
    { country: 'United States', flag: '🇺🇸', hub: 'Miami, Fort Lauderdale & Newport' },
    { country: 'United Kingdom', flag: '🇬🇧', hub: 'London, Cowes & Solent' },
    { country: 'India', flag: '🇮🇳', hub: 'Mumbai, Goa & Kochi' },
    { country: 'Australia', flag: '🇦🇺', hub: 'Sydney Harbour & Whitsundays' },
    { country: 'Singapore', flag: '🇸🇬', hub: 'ONE°15 Marina & Sentosa' },
    { country: 'Japan', flag: '🇯🇵', hub: 'Yokohama & Tokyo Bay' },
    { country: 'Canada', flag: '🇨🇦', hub: 'Vancouver & Victoria' },
  ];

  return (
    <section className="py-24 bg-navy-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>🌍 International Deployment Scope</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Built for Global Yacht Operations
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            Engineered from day one to support international multi-currency processing, global timezones, localized date/number formatting, and regional tax rules.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4 mb-12">
          {markets.map((m, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-navy-900 border border-slate-800 text-center space-y-1">
              <div className="text-2xl">{m.flag}</div>
              <div className="text-xs font-bold text-white leading-tight">{m.country}</div>
              <div className="text-[10px] text-slate-400">{m.hub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left text-xs">
          <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-1">
            <div className="text-gold-500 font-bold">💱 Multi-Currency Engine</div>
            <div className="text-slate-300">ISO 4217 support: USD, EUR, AED, GBP, INR, AUD, SGD, JPY, CAD.</div>
          </div>
          <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-1">
            <div className="text-teal-400 font-bold">🌐 Multi-Timezone UTC Storage</div>
            <div className="text-slate-300">All database timestamps stored in UTC; localized rendering in browser time.</div>
          </div>
          <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-1">
            <div className="text-white font-bold">🏛️ Configurable Tax Engine</div>
            <div className="text-slate-300">Dynamic VAT, GST, Sales Tax, and luxury charter surcharge rules.</div>
          </div>
        </div>

      </div>
    </section>
  );
};
