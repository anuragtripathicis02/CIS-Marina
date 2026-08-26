import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CtaBanner } from '@/components/home/CtaBanner';
import Link from 'next/link';

export const metadata = {
  title: 'Target Industries — NAUTICOS Yacht & Marina SaaS Solutions',
  description: 'Solutions for Yacht Charter Companies, Fleet Operators, Yacht Brokers, Marinas, Yacht Clubs, and Luxury Events.',
};

export default function IndustriesPage() {
  const verticals = [
    {
      title: 'Yacht Charter Companies',
      desc: 'Scale your luxury charter business with automated quote generation, live availability calendars, deposit collection, and custom guest experience add-ons.',
      keyNeeds: ['PostgreSQL double-booking exclusion protection', 'Instant Stripe deposit & PDF invoice generation', 'Custom catering & DJ package pricing engine'],
    },
    {
      title: 'Yacht Operators & Fleet Owners',
      desc: 'Centralize fleet management, technical vessel specifications, owner blackout dates, pre-charter safety inspection checklists, and repair logs.',
      keyNeeds: ['Multi-yacht visual availability timeline', 'Crew STCW certification expiration alerts', 'Preventive engine & generator maintenance logs'],
    },
    {
      title: 'Yacht Brokers',
      desc: 'Manage high-value customer relationships, charter inquiries, custom vessel recommendations, e-signatures, and commission accounting.',
      keyNeeds: ['Client CRM with lifetime spend tracking', 'Digital contract waiver e-signatures', 'Multi-currency payment processing'],
    },
    {
      title: 'Marinas & Dock Operators',
      desc: 'Digitize slip allocation based on vessel LOA & beam, transient boat reservations, member boatyard accounts, and utility meter billing.',
      keyNeeds: ['Interactive dock & slip map visualization', 'Shore power electricity & water billing', 'Annual berth lease management'],
    },
    {
      title: 'Yacht Clubs & Memberships',
      desc: 'Manage member profiles, berth allocations, club dining reservations, exclusive event invitations, and member communication.',
      keyNeeds: ['Member portal & boatyard account billing', 'Private event dispatch & catering builder', 'Granular member permission access'],
    },
    {
      title: 'Luxury Event & Concierge Companies',
      desc: 'Coordinate high-end yacht charters for corporate events, weddings, and VIP celebrations with full catering, mixology, and entertainment.',
      keyNeeds: ['Bespoke event experience customizer', 'Vendor service task dispatch', 'Guest preference & allergy logging'],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-xs font-semibold uppercase tracking-wider">
              <span>🏢 Industry Vertical Solutions</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-slate-900">
              Built Around Your Business
            </h1>
            <p className="text-slate-600 text-base sm:text-lg">
              Discover how NAUTICOS adapts to the specific operational demands of your sector in the global luxury marine ecosystem.
            </p>
          </div>

          {/* Verticals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {verticals.map((vert, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h2 className="font-display text-2xl font-bold text-slate-900">{vert.title}</h2>
                  <p className="text-slate-600 text-xs leading-relaxed">{vert.desc}</p>
                  <div className="pt-2 text-xs font-bold text-gold-700 uppercase tracking-wider">Key Operational Capabilities:</div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {vert.keyNeeds.map((need, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="text-gold-600">✓</span>
                        <span>{need}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4">
                  <Link
                    href="/demo"
                    className="inline-flex items-center space-x-2 text-xs text-gold-700 font-bold hover:underline"
                  >
                    <span>Request Industry Demo</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <CtaBanner />
      <Footer />
    </div>
  );
}
