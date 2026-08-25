'use client';

import React from 'react';
import Link from 'next/link';

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Smart Dockside Pedestal Sockets Image */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80"
                alt="Smart Dockside Power and Water Utility Pedestal"
                className="w-full h-[450px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl hidden sm:flex items-center space-x-3 text-xs font-bold text-slate-800">
              <span className="w-4 h-4 rounded-full bg-teal-500 animate-pulse" />
              <span>Smart IoT Pedestal Active (240V / 100A & Water Flow)</span>
            </div>
          </div>

          {/* Right Side: Floating White Card with Challenges (Matching Screenshot 3) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200/80 space-y-6 text-left">
              
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                We understand the challenges of marina and yacht club management.
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                At Smarter Technologies, we understand the complexity and the need for a comprehensive solution that addresses these challenges head-on.
              </p>

              {/* 2-Column Cross (✕) List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 pt-2">
                
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0">✕</span>
                  <span>Manual processes</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0">✕</span>
                  <span>Inaccurate utility tracking and billing</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0">✕</span>
                  <span>Lack of real-time visibility</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0">✕</span>
                  <span>Unrecovered operational costs</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0">✕</span>
                  <span>Multiple systems</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0">✕</span>
                  <span>Constant on-site activity</span>
                </div>

              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-block px-8 py-3 rounded-full bg-[#030728] hover:bg-[#0a1148] text-white font-bold text-xs shadow-xl transition-all transform hover:scale-105"
                >
                  Speak to an Expert
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
