'use client';

import React from 'react';
import Link from 'next/link';

export const CtaBanner = () => {
  return (
    <section className="py-20  from-navy-900 via-navy-800 to-navy-900 border-t border-slate-800 text-white text-center relative overflow-hidden">
      {/* Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-slate-800 tracking-tight">
          Ready to Connect Your Entire Yacht & Marina Operation?
        </h2>
        <p className="text-slate-800 text-base sm:text-lg max-w-2xl mx-auto">
          Schedule a custom platform demonstration with our enterprise sales engineering team.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/demo"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 via-gold-600 to-gold-700 hover:from-gold-600 hover:to-gold-800 text-navy-900 font-bold text-base shadow-2xl shadow-gold-500/25 transition-all transform hover:-translate-y-0.5"
          >
            Book a Demo
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-navy-950 hover:bg-navy-900 hover:text-white border border-slate-700 text-slate-800 font-semibold text-base transition-all"
          >
            Talk to an Expert
          </Link>
        </div>
      </div>
    </section>
  );
};
