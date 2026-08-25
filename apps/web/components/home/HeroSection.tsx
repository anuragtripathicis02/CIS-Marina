'use client';

import React from 'react';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-sky-600 text-white overflow-hidden">
      
      {/* Background Harbour Scene Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-90"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0088cc]/60 via-[#006699]/40 to-[#004466]/80" />

      {/* Main Hero Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center space-y-8 z-10">
        
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight drop-shadow-md">
          Smart Marina Utility Monitoring and Management
        </h1>

        <p className="text-base sm:text-lg text-slate-100 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow">
          Real-time marina utilities monitoring and total marina management for streamlined operations and total peace of mind.
        </p>

        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-full bg-[#030728] hover:bg-[#0a1148] text-white font-bold text-sm shadow-2xl transition-all transform hover:scale-105"
          >
            Speak to an Expert
          </Link>
        </div>

      </div>

      {/* Bottom Overlapping Section: "The Complete Smart Marina System" */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-16 z-20">
        
        {/* Banner Pill Label */}
        <div className="text-center mb-6">
          <div className="inline-block bg-white text-[#030728] font-bold text-lg sm:text-xl px-10 py-3 rounded-2xl shadow-xl border border-slate-100">
            The Complete Smart Marina System
          </div>
        </div>

        {/* 4 Feature Cards Grid (Matching Reference Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 space-y-3 hover:shadow-2xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center text-2xl font-bold">
              ⚡
            </div>
            <h3 className="font-bold text-slate-900 text-base">Smart Dockside Pedestals</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Smarter Technologies&apos; wireless, real-time marina utilities solutions offer retrofit and new installation smart pedestals for your sites.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 space-y-3 hover:shadow-2xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center text-2xl font-bold">
              📊
            </div>
            <h3 className="font-bold text-slate-900 text-base">Cloud-Based Dashboard</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Access real-time data and alerts via our dashboard — a remotely accessible, centralised hub for smart marina monitoring and management.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 space-y-3 hover:shadow-2xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center text-2xl font-bold">
              🌐
            </div>
            <h3 className="font-bold text-slate-900 text-base">Whole-Site Monitoring</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Monitor electricity, water, gas, berths, and buildings with one connected IoT system for full-site visibility and control of your marina.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 space-y-3 hover:shadow-2xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center text-2xl font-bold">
              ✨
            </div>
            <h3 className="font-bold text-slate-900 text-base">Endless Marina Benefits</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Improve customer experience, eliminate billing inaccuracies, streamline operations and harness valuable site data through a modernised marina.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
