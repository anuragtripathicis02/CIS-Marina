import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LeadForm } from '@/components/forms/LeadForm';
import Link from 'next/link';

export const metadata = {
  title: 'Products & Solutions — NAUTICOS Smart Marina Utility Monitoring',
  description: 'Explore Smart Dockside Pedestals, Whole-Site IoT Monitoring, and Precision Utility Billing for marinas.',
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">SMART MARINA PRODUCT SUITE</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900">Connected Marina Infrastructure Solutions</h1>
            <p className="text-slate-600 text-sm">
              Discover how our retrofittable smart pedestals, Orion IoT network, and precision billing software digitise utility monitoring for modern marinas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-2xl font-bold">⚡</div>
              <h3 className="font-bold text-slate-900 text-xl">Smart Dockside Pedestals</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Wireless, real-time power and water pedestals. Retrofit existing berths or deploy on new pontoon builds with 240V/480V electric meters and automated shutoff valves.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-2xl font-bold">🌐</div>
              <h3 className="font-bold text-slate-900 text-xl">Orion™ IoT Real-Time Network</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Long-range wireless sensors monitoring electricity, water, gas, berth occupancy, geofencing, motion security, and environmental compliance across your entire site.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-2xl font-bold">💳</div>
              <h3 className="font-bold text-slate-900 text-xl">Precision Automated Billing</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Eliminate manual meter reading and billing disputes. Produce on-demand automated statements for exact kilowatt-hours and litres consumed by berth holders.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-100 border border-slate-200 text-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <LeadForm
              sourceTag="solutions_page_demo"
              title="Schedule a Products & Pedestals Demo"
              subtitle="Speak with a Smart Marina Utility Expert to evaluate hardware and cloud software specs for your marina."
            />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
