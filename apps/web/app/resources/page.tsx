import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FaqSection } from '@/components/home/FaqSection';
import { CtaBanner } from '@/components/home/CtaBanner';

export const metadata = {
  title: 'Resources & FAQ — NAUTICOS Yacht & Marina Management',
  description: 'Operational guides, case studies, insights, and comprehensive technical FAQ for NAUTICOS SaaS platform.',
};

export default function ResourcesPage() {
  const insights = [
    {
      title: 'Eliminating Double Bookings in High-Volume Yacht Charters',
      category: 'DATABASE INTEGRITY',
      desc: 'How PostgreSQL exclusion locks eliminate date collisions across multi-yacht fleets during parallel API checkout requests.',
    },
    {
      title: 'Multi-Currency Financial Engineering for Global Marinas',
      category: 'PAYMENTS & TAX',
      desc: 'Managing ISO 4217 currencies, regional VAT/GST surcharges, and automated PDF invoice generation.',
    },
    {
      title: 'STCW Compliance & Automated Crew Duty Rostering',
      category: 'CREW OPERATIONS',
      desc: 'Matching vessel gross tonnage requirements to captain certifications and automated 60-day license expiration alerts.',
    },
  ];

  return (
    <div className="min-h-screen bg-navy-900 text-slate-100 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-semibold uppercase tracking-wider">
              <span>📚 Operational Knowledge Base</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Resources & Technical Insights
            </h1>
            <p className="text-slate-300 text-base sm:text-lg">
              Explore architectural guides, best practices, and answers to technical questions about the NAUTICOS platform.
            </p>
          </div>

          {/* Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-navy-950 border border-slate-800 space-y-3">
                <span className="text-[10px] font-mono font-bold text-gold-500 tracking-wider uppercase">{item.category}</span>
                <h3 className="font-display text-lg font-bold text-white leading-snug">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Complete FAQ Section */}
          <FaqSection />

        </div>
      </main>

      <CtaBanner />
      <Footer />
    </div>
  );
}
