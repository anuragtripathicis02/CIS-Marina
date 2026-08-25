'use client';

import React from 'react';
import Link from 'next/link';

export const SmartOperationsSection: React.FC = () => {
  return (
    <div className="space-y-24 py-20 bg-white text-slate-800 border-t border-slate-200">
      
      {/* Part 1: Monitor & Control Utilities (Matching Reference Image 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Monitor and Control Utilities and the Complete Marina Environment
            </h2>

            <p className="text-slate-700 text-sm font-medium leading-relaxed">
              A cutting-edge solution designed to revolutionise the way marinas, shipyards, boatyards, canals and riversides manage their utilities and operations.
            </p>

            <p className="text-slate-500 text-xs leading-relaxed">
              Modern marinas are complex operations with many moving parts. Truly effective marina management has traditionally been labour-intensive and time-consuming, which comes at a cost for operators. Technology is driving modernisation of marinas. Our real-time cloud based marina monitoring system, powered by Orion, The RealTime Data Network™, offers a comprehensive and connected solution.
            </p>
          </div>

          {/* Right Floating Laptop Mockup Display */}
          <div className="lg:col-span-6 relative">
            <div className="p-4 rounded-3xl bg-slate-100 border border-slate-200 shadow-2xl relative">
              <div className="bg-slate-900 rounded-2xl p-4 overflow-hidden border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[10px] text-slate-400 font-mono">
                  <div className="flex space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span>Smart Marina Real-Time Dashboard</span>
                </div>

                {/* Simulated Chart Bars */}
                <div className="grid grid-cols-6 gap-2 h-36 items-end pt-4 px-2">
                  <div className="bg-teal-500/80 rounded-t h-[60%]" />
                  <div className="bg-teal-500/80 rounded-t h-[80%]" />
                  <div className="bg-teal-400 rounded-t h-[40%]" />
                  <div className="bg-teal-500/80 rounded-t h-[95%]" />
                  <div className="bg-teal-400 rounded-t h-[70%]" />
                  <div className="bg-teal-300 rounded-t h-[85%]" />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono">
                  <div className="p-2 rounded bg-slate-800 text-teal-300">kWh: 256.02</div>
                  <div className="p-2 rounded bg-slate-800 text-teal-300">Litre: 143.74</div>
                  <div className="p-2 rounded bg-slate-800 text-emerald-400">Status: ACTIVE</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Part 2: Precision Billing Through Accurate Utilities Monitoring (Matching Reference Image 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Dual Desktop Mockup */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="p-4 rounded-3xl bg-slate-100 border border-slate-200 shadow-2xl space-y-4">
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-left space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="font-bold text-white text-xs">Smart Marina Utilities Ledger</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">
                    LIVE AUDIT ACTIVE
                  </span>
                </div>
                <div className="space-y-2 text-[11px] font-mono text-slate-300">
                  <div className="flex justify-between p-2 rounded bg-slate-800">
                    <span>Berth A-04 Power (240V / 50A)</span>
                    <span className="font-bold text-gold-400">$3,178.82 / mo</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-800">
                    <span>Berth B-02 Fresh Water (12k L)</span>
                    <span className="font-bold text-teal-300">$412.50 / mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Precision Billing Through Accurate Marina Utilities Monitoring
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              Moored craft can be energy-intensive and the ability to recover and charge your users accurately for their consumption is imperative to your profitability.
            </p>

            <div>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 rounded-full bg-[#030728] hover:bg-[#0a1148] text-white font-bold text-xs shadow-xl transition-all transform hover:scale-105"
              >
                Speak to an Expert
              </Link>
            </div>
          </div>

        </div>

        {/* 3 Column Features Below (Matching Reference Image 4) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-16 border-t border-slate-200 mt-16">
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
              <span className="text-xl">📡</span>
              <h3>Real-Time Consumption Data</h3>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Live energy and water data from every pedestal or meter lets you monitor and manage usage, spot anomalies, and make informed decisions.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
              <span className="text-xl">📋</span>
              <h3>Accurate, Automated Billing</h3>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Produce on-demand individual statements and invoices to bill each customer for the exact kW or litre used, eliminating disputes and missed revenue.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
              <span className="text-xl">💳</span>
              <h3>Managed Tariffs & Charges</h3>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Configure day/night rates, connection fees, and other charges with ease - then apply them across individual berths or your entire site.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
