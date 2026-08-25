import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Booking Confirmed — NAUTICOS Charter Experience',
  description: 'Your luxury yacht charter booking deposit has been processed successfully.',
};

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto text-4xl border border-teal-200 shadow-sm">
            ✓
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold uppercase">
              DEPOSIT PAYMENT CAPTURED
            </span>
            <h1 className="font-display text-4xl font-bold text-slate-900">Charter Booking Confirmed!</h1>
            <p className="text-slate-600 text-sm">
              Your reservation reference <span className="font-mono text-teal-700 font-bold">#{params.id.substring(0, 8).toUpperCase()}</span> has been confirmed.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left space-y-4 text-xs shadow-sm">
            <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-3">Charter Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500">Vessel Assigned:</span>
                <div className="font-bold text-slate-900 mt-0.5">Ocean Pearl 115</div>
              </div>
              <div>
                <span className="text-slate-500">Departure Port:</span>
                <div className="font-bold text-slate-900 mt-0.5">Dubai Marina, UAE</div>
              </div>
              <div>
                <span className="text-slate-500">Scheduled Date:</span>
                <div className="font-bold text-slate-900 mt-0.5">September 1, 2026</div>
              </div>
              <div>
                <span className="text-slate-500">Payment Status:</span>
                <div className="font-bold text-emerald-700 mt-0.5">30% Deposit Paid ($6,552.00)</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs">
            <Link
              href="/admin"
              className="px-6 py-3 rounded-xl bg-teal-600 text-white font-bold shadow-md hover:bg-teal-700 transition-colors"
            >
              View in Operator Dashboard →
            </Link>
            <Link
              href="/charter"
              className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Back to Fleet Catalog
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
