'use client';

import React, { useState } from 'react';

export const ExperienceBuilderSection = () => {
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['catering', 'djs']);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const addonsList = [
    { id: 'catering', name: 'Gourmet French Catering', price: 2500, label: '👨‍🍳 Premium Dining' },
    { id: 'djs', name: 'Live DJ & Sound System', price: 1800, label: '🎧 Entertainment' },
    { id: 'jetski', name: 'Dual Sea-Doo Jet Skis', price: 1200, label: '🌊 Water Sports' },
    { id: 'floral', name: 'Bespoke Floral & Decor', price: 950, label: '🌸 VIP Decoration' },
    { id: 'bar', name: 'Champagne & Mixology Bar', price: 2100, label: '🍾 Open Bar' },
  ];

  const basePrice = 12000;
  const addonsTotal = addonsList
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((sum, item) => sum + item.price, 0);
  const grandTotal = basePrice + addonsTotal;

  return (
    <section className="py-24 bg-navy-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Explanation */}
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-semibold uppercase tracking-wider">
              <span>🍾 Interactive Event Customizer</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
              Turn Yacht Booking Into a Complete Experience.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              NAUTICOS allows charter guests to build customized experiences during booking—combining gourmet catering, DJ entertainment, water sports, and luxury decor into one automatic price package.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-500 flex items-center justify-center font-bold">1</span>
                <span>Select vessel & charter duration (Hourly / Daily / Multi-day)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-500 flex items-center justify-center font-bold">2</span>
                <span>Customize guest capacity, catering, and entertainment packages</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-500 flex items-center justify-center font-bold">3</span>
                <span>Automatic quote calculation & instant deposit payment via Stripe</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Customizer Preview */}
          <div className="bg-navy-900 border border-gold-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-left space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-semibold text-white text-base">Charters Experience Simulator</h3>
                <p className="text-slate-400 text-xs">Ocean Pearl 115 Yacht • Dubai Marina</p>
              </div>
              <span className="text-xs font-mono text-gold-500 font-bold">BASE: ${basePrice.toLocaleString()}</span>
            </div>

            <div className="space-y-2.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Select Luxury Add-On Services
              </label>
              <div className="space-y-2">
                {addonsList.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-xs ${
                        isSelected
                          ? 'bg-gold-500/10 border-gold-500 text-white'
                          : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-gold-500 border-gold-500 text-navy-900 font-bold text-[10px]' : 'border-slate-600'}`}>
                          {isSelected ? '✓' : ''}
                        </span>
                        <span>{addon.label}</span>
                        <span className="text-slate-300 font-medium">{addon.name}</span>
                      </div>
                      <span className="font-mono font-bold text-gold-400">+${addon.price.toLocaleString()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Calculation Card */}
            <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 font-medium">Calculated Charter Package Total</div>
                <div className="text-xs text-slate-500">Includes Base Yacht + {selectedAddons.length} Add-ons + Tax</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold font-mono text-gold-500">${grandTotal.toLocaleString()}.00</div>
                <span className="text-[10px] text-teal-400 font-medium">30% Deposit: ${(grandTotal * 0.3).toLocaleString()}.00</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
