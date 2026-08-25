import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Luxury Yacht Discovery & Charters — NAUTICOS',
  description: 'Browse luxury superyachts, flybridges, and motor yachts available for hourly and daily charter.',
};

export default function CharterDiscoveryPage() {
  const yachts = [
    {
      id: 'y1',
      name: 'Ocean Pearl 115',
      make: 'Majesty Yachts',
      length: '115 ft',
      capacity: '12 Guests',
      cabins: '5 Cabins',
      location: 'Dubai Marina, UAE',
      hourlyRate: '$2,500',
      dailyRate: '$18,000',
      tag: 'FEATURED SUPERYACHT',
      img: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'y2',
      name: 'Azure Horizon 88',
      make: 'Sunseeker',
      length: '88 ft',
      capacity: '10 Guests',
      cabins: '4 Cabins',
      location: 'Monaco Port Hercules',
      hourlyRate: '€1,800',
      dailyRate: '€14,000',
      tag: 'POPULAR FLYBRIDGE',
      img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'y3',
      name: 'Sea Majesty 130',
      make: 'Benetti',
      length: '130 ft',
      capacity: '14 Guests',
      cabins: '6 Cabins',
      location: 'Miami South Beach, USA',
      hourlyRate: '$3,200',
      dailyRate: '$24,000',
      tag: 'VIP TRI-DECK',
      img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          
          {/* Header & Filter Bar */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-teal-700 tracking-wider uppercase">EXCLUSIVE CHARTER CATALOG</span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mt-1">Discover Luxury Fleet Vessels</h1>
            </div>

            {/* Light Theme Filter Bar */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-medium">Destination Location</label>
                <select className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-teal-500">
                  <option>All Global Locations</option>
                  <option>Dubai Marina, UAE</option>
                  <option>Monaco Port Hercules</option>
                  <option>Miami South Beach</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 mb-1 font-medium">Charter Date</label>
                <input type="date" className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-slate-600 mb-1 font-medium">Guest Passengers</label>
                <select className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-teal-500">
                  <option>Any Capacity</option>
                  <option>Up to 10 Guests</option>
                  <option>12+ VIP Guests</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full p-2.5 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 shadow-sm cursor-pointer transition-colors">
                  Search Available Fleet
                </button>
              </div>
            </div>
          </div>

          {/* Yacht Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {yachts.map((y) => (
              <div key={y.id} className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-teal-500/40 transition-all space-y-4">
                
                {/* Photo Header */}
                <div 
                  className="h-56 bg-cover bg-center p-4 flex flex-col justify-between relative"
                  style={{ backgroundImage: `url('${y.img}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-black/20" />
                  <span className="self-start relative z-10 px-3 py-1 rounded-full bg-white/90 text-[#030728] text-[10px] font-bold tracking-wider shadow-sm">
                    {y.tag}
                  </span>
                  <div className="relative z-10 text-white">
                    <span className="text-xs font-semibold">📍 {y.location}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-slate-900">{y.name}</h2>
                    <p className="text-slate-500 text-xs mt-0.5">{y.make} • {y.length} • {y.capacity} • {y.cabins}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-mono text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">Hourly Rate</div>
                      <div className="text-slate-800 font-bold">{y.hourlyRate}/hr</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">Daily Charter</div>
                      <div className="text-teal-700 font-bold">{y.dailyRate}/day</div>
                    </div>
                  </div>

                  <Link
                    href={`/charter/${y.id}`}
                    className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs text-center block hover:bg-teal-700 shadow-sm transition-all"
                  >
                    View Details & Reserve →
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
