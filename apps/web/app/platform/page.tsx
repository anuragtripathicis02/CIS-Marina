import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Platform Architecture & Capabilities — NAUTICOS',
  description: 'Multi-Tenant SaaS architecture, PostgreSQL RLS security, double-booking exclusion protection, and real-time dashboard.',
};

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">ENTERPRISE SAAS ARCHITECTURE</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900">Modern Cloud Platform Blueprint</h1>
            <p className="text-slate-600 text-sm">
              Built on PostgreSQL Row-Level Security, multi-tenant isolation, real-time IoT websockets, and double-booking exclusion locks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-lg">PostgreSQL Row-Level Security (RLS)</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Guarantees complete multi-tenant database isolation. Every query enforces <code className="font-mono text-teal-700 font-bold">SET LOCAL app.current_organization_id</code> at the session layer.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-lg">Double-Booking Exclusion Protection</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Prevents overlapping charter reservations and berth allocations using PostgreSQL <code className="font-mono text-teal-700 font-bold">btree_gist</code> exclusion constraints and pessimistic transaction locks.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/admin"
              className="inline-block px-8 py-3.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              Open SaaS Operator Console →
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
