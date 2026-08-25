import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LeadForm } from '@/components/forms/LeadForm';

export const metadata = {
  title: 'Book a Platform Demo — NAUTICOS',
  description: 'Book a personalized live demo of the Smart Yacht & Marina Management Platform.',
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">ENTERPRISE SAAS DEMO</span>
            <h1 className="font-display text-4xl font-bold text-slate-900">Book a Live Personalized Demo</h1>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              See how NAUTICOS connects utility pedestals, berth availability, charter bookings, and payment ledgers in one live demo.
            </p>
          </div>

          <div className="bg-slate-100 border border-slate-200 text-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <LeadForm
              sourceTag="demo_page_form"
              title="Book a Personalized Platform Demo"
              subtitle="Discover how NAUTICOS connects your charter bookings, fleet operations, crew, and marina management into one ecosystem."
            />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
