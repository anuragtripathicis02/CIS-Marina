import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Ocean Pearl 115 — Luxury Superyacht Charter',
  description: 'Charter Ocean Pearl 115 in Dubai Marina. Features 5 cabins, 12 guest capacity, gourmet dining, and water sports.',
};

export function generateStaticParams() {
  return [{ id: 'y1' }, { id: 'y2' }];
}

export const dynamicParams = false;

export default function YachtDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          
          {/* Top Breadcrumb & Title */}
          <div className="space-y-2">
            <Link href="/charter" className="text-xs text-teal-700 font-semibold hover:underline">
              ← Back to Fleet Discovery
            </Link>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl font-bold text-slate-900">Ocean Pearl 115</h1>
                <p className="text-slate-500 text-xs mt-1">Majesty Yachts • 115 ft Superyacht • Dubai Marina, UAE</p>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs text-slate-400">Charter Base Rate</div>
                <div className="text-2xl font-bold text-teal-700">$2,500.00 / hour</div>
              </div>
            </div>
          </div>

          {/* Main Gallery Hero */}
          <div 
            className="h-96 rounded-3xl bg-cover bg-center p-8 flex flex-col justify-end border border-slate-200 relative shadow-xl overflow-hidden"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1600&q=80')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            <span className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md">
              AVAILABLE FOR CHARTER
            </span>
            <div className="relative z-10 space-y-1 text-white">
              <h2 className="text-2xl font-bold">Bespoke Luxury Charter Experience</h2>
              <p className="text-xs text-slate-200">5 Guest Staterooms • Jacuzzi Deck • Full Crew Service</p>
            </div>
          </div>

          {/* Specs & Reservation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Specifications */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-4">
                <h3 className="font-display text-lg font-bold text-slate-900">Vessel Specifications</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-slate-500 text-[10px] font-medium">Length Overall</div>
                    <div className="font-bold text-slate-900 mt-1">115 ft (35.1m)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-slate-500 text-[10px] font-medium">Guest Capacity</div>
                    <div className="font-bold text-slate-900 mt-1">12 Passengers</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-slate-500 text-[10px] font-medium">Cabins & Baths</div>
                    <div className="font-bold text-slate-900 mt-1">5 Cabins / 6 Baths</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-slate-500 text-[10px] font-medium">Home Port</div>
                    <div className="font-bold text-slate-900 mt-1">Dubai Marina</div>
                  </div>
                </div>
              </div>

              {/* Description & Included Amenities */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-4">
                <h3 className="font-display text-lg font-bold text-slate-900">Included Amenities & Services</h3>
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="flex items-center space-x-2">
                    <span className="text-teal-600 font-bold">✓</span>
                    <span>Licensed Master 3000 GT Captain</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-teal-600 font-bold">✓</span>
                    <span>Full Interior & Deck Crew Service</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-teal-600 font-bold">✓</span>
                    <span>Flybridge Jacuzzi & Sun Lounge</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-teal-600 font-bold">✓</span>
                    <span>High-Speed Marine Wi-Fi & Audio</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Booking Widget */}
            <div className="bg-white border border-teal-200 rounded-2xl p-6 shadow-xl space-y-6 self-start">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-display text-xl font-bold text-slate-900">Configure Your Charter</h3>
                <p className="text-slate-500 text-xs mt-0.5">Select dates & add-ons for instant price calculation</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Charter Date *</label>
                  <input
                    type="date"
                    defaultValue="2026-09-01"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Charter Duration</label>
                  <select className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-teal-500">
                    <option>4 Hours Half-Day ($10,000)</option>
                    <option>8 Hours Full-Day ($18,000)</option>
                  </select>
                </div>

                <Link
                  href={`/charter/checkout/${params.id}`}
                  className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs text-center block shadow-md cursor-pointer transition-colors"
                >
                  Proceed to Experience & Checkout →
                </Link>

                <p className="text-[10px] text-slate-400 text-center">
                  Protected by PostgreSQL Exclusion Lock double-booking engine.
                </p>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
