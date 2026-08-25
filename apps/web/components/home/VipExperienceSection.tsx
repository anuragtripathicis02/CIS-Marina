'use client';

import React from 'react';

export const VipExperienceSection = () => {
  return (
    <section className="py-24 bg-navy-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-semibold uppercase tracking-wider">
              <span>📱 VIP Concierge Mobile Portal</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
              Give Every Guest a Concierge-Level Experience.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              White-label client experience allowing charter guests to browse available yachts, request bespoke catering, chat with the concierge, sign digital contracts, and track vessel location.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <span className="text-gold-500">✓</span>
                <span>Self-service charter customization & catering requests</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gold-500">✓</span>
                <span>Instant e-signature for waivers & charter agreements</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gold-500">✓</span>
                <span>Real-time charter countdown & weather forecast</span>
              </div>
            </div>
          </div>

          {/* Right Mobile App Mockup Frame */}
          <div className="flex justify-center">
            <div className="w-72 bg-navy-900 border-4 border-slate-700 rounded-[36px] p-4 shadow-2xl space-y-4 text-left">
              {/* Phone Notch */}
              <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto" />
              
              {/* App Screen Header */}
              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-gold-500 font-semibold uppercase">Welcome Back, Lord Sterling</div>
                <div className="text-xs font-bold text-white">Charter: Majesty 120 Yacht</div>
                <div className="text-[10px] text-slate-400">Departure: Tomorrow • 10:00 AM UTC</div>
              </div>

              {/* Concierge Chat Widget */}
              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-2 text-[11px]">
                <div className="font-semibold text-slate-300">Direct Concierge Message</div>
                <div className="p-2 rounded bg-navy-900 text-slate-300 text-[10px]">
                  "Your French Champagne & DJ package have been verified on board."
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                <div className="p-2 rounded.xl bg-gold-500/10 border border-gold-500/30 text-gold-400 font-bold">
                  View PDF Contract
                </div>
                <div className="p-2 rounded.xl bg-teal-500/10 border border-teal-500/30 text-teal-300 font-bold">
                  Track Yacht GPS
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
