'use client';

import React, { useState } from 'react';

export default function ExploreYachtsPage() {
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [guestCapacity, setGuestCapacity] = useState('ALL');

  const yachts = [
    {
      id: 'y1',
      name: 'Ocean Pearl 115',
      type: 'Superyacht',
      lengthFt: 120,
      capacity: 12,
      cabins: 5,
      location: 'Monaco Port Hercules',
      dailyRate: 6500,
      image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'y2',
      name: 'Azure Horizon 88',
      type: 'Motor Yacht',
      lengthFt: 88,
      capacity: 8,
      cabins: 4,
      location: 'Saint-Tropez Port',
      dailyRate: 4200,
      image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'y3',
      name: 'Serenity Sunreef 70',
      type: 'Luxury Catamaran',
      lengthFt: 70,
      capacity: 10,
      cabins: 4,
      location: 'Cannes Old Port',
      dailyRate: 3500,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">LUXURY FLEET CATALOG</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Explore Available Charter Yachts</h1>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap gap-4 text-xs font-mono">
        <div>
          <label className="text-slate-500 block mb-1">PORT LOCATION</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
          >
            <option value="ALL">All Riviera Ports</option>
            <option value="Monaco Port Hercules">Monaco Port Hercules</option>
            <option value="Saint-Tropez Port">Saint-Tropez Port</option>
            <option value="Cannes Old Port">Cannes Old Port</option>
          </select>
        </div>

        <div>
          <label className="text-slate-500 block mb-1">GUEST CAPACITY</label>
          <select
            value={guestCapacity}
            onChange={(e) => setGuestCapacity(e.target.value)}
            className="p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
          >
            <option value="ALL">Any Guests</option>
            <option value="8">8+ Guests</option>
            <option value="12">12+ Guests</option>
          </select>
        </div>
      </div>

      {/* Yacht Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {yachts.map((y) => (
          <div key={y.id} className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between hover:border-amber-500/40 transition-all">
            <div>
              <div className="h-48 bg-slate-800 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={y.image} alt={y.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 font-mono font-bold text-xs">
                  €{y.dailyRate.toLocaleString()} / day
                </span>
              </div>

              <div className="p-6 space-y-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">{y.type} • {y.lengthFt}FT</span>
                <h3 className="font-serif text-xl font-bold text-white">{y.name}</h3>
                
                <div className="text-xs text-slate-400 font-mono space-y-1">
                  <div>📍 Location: <span className="text-white font-bold">{y.location}</span></div>
                  <div>👥 Guests: <span className="text-white font-bold">{y.capacity} Passengers</span> ({y.cabins} Cabins)</div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer">
                Check Dates &amp; Reserve Yacht →
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
