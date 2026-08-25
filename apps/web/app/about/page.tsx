import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlobalMarketsSection } from '@/components/home/GlobalMarketsSection';
import { CtaBanner } from '@/components/home/CtaBanner';

export const metadata = {
  title: 'Company & Global Presence — NAUTICOS Yacht & Marina SaaS',
  description: 'Learn about NAUTICOS vision to build the definitive operating system for global yacht charters, fleet operations, and marinas.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-slate-100 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-semibold uppercase tracking-wider">
              <span>⚓ Our Mission</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Connecting Disconnected Marine Operations
            </h1>
            <p className="text-slate-300 text-base sm:text-lg">
              We are building the connected digital operating system for the global luxury yachting and marina industry.
            </p>
          </div>

          {/* Vision Content Card */}
          <div className="bg-navy-950 border border-slate-800 rounded-2xl p-8 sm:p-12 space-y-6 max-w-4xl mx-auto text-slate-300 text-sm leading-relaxed">
            <h2 className="font-display text-2xl font-bold text-white">The Problem We Are Solving</h2>
            <p>
              For decades, the luxury yacht charter and marina industries operated across fragmented tools—handling bookings in spreadsheets, communicating via WhatsApp, storing crew certificates in paper binders, and tracking marina berths manually.
            </p>
            <p>
              NAUTICOS unifies these processes into one connected digital ecosystem: combining booking state engine automation, multi-tenant row-level security, Stripe multi-currency financial accounting, crew certification management, and real-time vessel telemetry.
            </p>

            <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-navy-900 border border-slate-800">
                <div className="text-xl font-bold text-gold-500 font-mono">100% Focused</div>
                <div className="text-xs text-slate-400 mt-1">On Yacht & Marina Operations</div>
              </div>
              <div className="p-4 rounded-xl bg-navy-900 border border-slate-800">
                <div className="text-xl font-bold text-teal-400 font-mono">9 Regions</div>
                <div className="text-xs text-slate-400 mt-1">International Market Support</div>
              </div>
              <div className="p-4 rounded-xl bg-navy-900 border border-slate-800">
                <div className="text-xl font-bold text-white font-mono">Enterprise</div>
                <div className="text-xs text-slate-400 mt-1">PostgreSQL RLS Security</div>
              </div>
            </div>
          </div>

          {/* Global Markets Section */}
          <GlobalMarketsSection />

        </div>
      </main>

      <CtaBanner />
      <Footer />
    </div>
  );
}
