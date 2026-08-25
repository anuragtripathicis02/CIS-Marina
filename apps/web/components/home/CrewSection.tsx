'use client';

import React from 'react';

export const CrewSection = () => {
  return (
    <section className="py-24 bg-navy-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider">
              <span>👨‍✈️ Crew & Rostering Engine</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
              Put the Right Crew on the Right Charter.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Match licensed vessel captains, chief engineers, deckhands, and interior stewards to charters based on vessel gross tonnage, flag state compliance, and STCW certification expiration dates.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-1">
                <div className="font-bold text-white">STCW License Alerts</div>
                <div className="text-slate-400">Automated alerts 60 days before certification expiration.</div>
              </div>
              <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-1">
                <div className="font-bold text-white">Vessel Capability Matching</div>
                <div className="text-slate-400">Verify captain GT qualifications before booking confirmation.</div>
              </div>
            </div>
          </div>

          {/* Right Simulated Crew Roster UI */}
          <div className="bg-navy-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-semibold text-white text-sm">Active Crew Duty Roster</h3>
              <span className="text-xs font-mono text-emerald-400">6 / 6 CREW ACTIVE</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-navy-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-500 font-bold flex items-center justify-center">C</div>
                  <div>
                    <div className="font-bold text-white">Capt. Marcus Sterling</div>
                    <div className="text-slate-400 text-[11px]">Master 3000 GT • Ocean Pearl 115</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">ON DUTY</span>
              </div>

              <div className="p-3 rounded-lg bg-navy-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center">E</div>
                  <div>
                    <div className="font-bold text-white">Chief Eng. Elena Vance</div>
                    <div className="text-slate-400 text-[11px]">Y1 Marine Engineer • Sunseeker 88</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">ON DUTY</span>
              </div>

              <div className="p-3 rounded-lg bg-navy-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center">S</div>
                  <div>
                    <div className="font-bold text-white">Chief Stewardess Sarah Jenkins</div>
                    <div className="text-slate-400 text-[11px]">VIP Guest Relations • Majesty 120</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-semibold">STANDBY</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
