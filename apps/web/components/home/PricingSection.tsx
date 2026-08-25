'use client';

import React from 'react';
import Link from 'next/link';

export const PricingSection = () => {
  const tiers = [
    {
      name: 'Starter Operator',
      desc: 'Ideal for independent charter operators & boutique fleet owners with up to 5 vessels.',
      features: ['Up to 5 Vessels / Slips', 'Digital Booking Engine & Locks', 'Stripe Multi-Currency Payments', 'Basic Customer CRM & PDF Invoices', '2 Admin & Staff User Roles'],
      cta: 'Request Starter Demo',
      highlight: false,
    },
    {
      name: 'Professional Fleet',
      desc: 'Built for growing charter fleets, mid-size marinas, and luxury event planning companies.',
      features: ['Up to 20 Vessels / Slips', 'Complete Booking State Machine', 'Crew Rostering & STCW Alerts', 'Pre-Charter Inspection Checklists', 'Luxury Event Package Builder', 'Multi-location Support'],
      cta: 'Request Professional Demo',
      highlight: true,
    },
    {
      name: 'Enterprise Ecosystem',
      desc: 'Designed for major charter fleets, international marina operators, and yacht clubs.',
      features: ['Unlimited Fleet & Slips', 'Dedicated PostgreSQL DB (Phase 4)', 'Marina Dock & Utility Metering', 'Smart IoT Telemetry Readiness', 'Granular 13-Role RBAC', 'White-label VIP Guest Portal', 'Custom Regional Integrations'],
      cta: 'Talk to Enterprise Sales',
      highlight: false,
    },
  ];

  return (
    <section className="py-24 bg-navy-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>💎 Flexible SaaS Subscriptions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Plans Built Around Your Operation
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            Custom operational pricing scaled according to your fleet size, number of marina slips, locations, and active platform modules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl border flex flex-col justify-between space-y-6 relative ${
                tier.highlight
                  ? 'bg-navy-800 border-gold-500 shadow-2xl shadow-gold-500/10 scale-105'
                  : 'bg-navy-950 border-slate-800'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-500 text-navy-900 text-[10px] font-bold uppercase tracking-wider shadow-md">
                  MOST POPULAR FLEET CHOICE
                </span>
              )}

              <div className="space-y-4">
                <h3 className="font-display text-2xl font-bold text-white">{tier.name}</h3>
                <p className="text-slate-300 text-xs leading-relaxed">{tier.desc}</p>
                <div className="pt-2 text-xs font-bold text-gold-500 uppercase tracking-wider">
                  Included Capabilities:
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="text-gold-500">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <Link
                  href="/demo"
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs text-center block transition-all ${
                    tier.highlight
                      ? 'bg-gold-500 text-navy-900 hover:bg-gold-600 shadow-lg'
                      : 'bg-navy-900 text-white border border-slate-700 hover:bg-navy-800'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
