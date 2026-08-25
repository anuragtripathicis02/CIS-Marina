'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030728] text-white border-t border-navy-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 text-left">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-white p-1.5 rounded-xl shadow-md group-hover:scale-105 transition-transform hidden items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/cis-marina-logo.png" alt="CIS-Marina Logo" className="h-8 w-auto object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-white tracking-tight leading-none">
                  CIS-<span className="text-amber-400">Marina</span>
                </span>
                <span className="text-[9px] font-mono text-slate-400 font-semibold tracking-wider uppercase mt-0.5">We make IT possible!</span>
              </div>
            </Link>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              The complete CIS-Marina Utility Monitoring &amp; Yacht Management Ecosystem. Connecting dockside pedestals, berth availability, charter bookings, crew, and financial ledgers into one real-time cloud platform.
            </p>

            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} CIS-Marina Platform Ltd. All rights reserved.
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Products &amp; Tech</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/solutions" className="hover:text-amber-400 transition-colors">Smart Dockside Pedestals</Link></li>
              <li><Link href="/platform" className="hover:text-amber-400 transition-colors">Cloud Dashboard</Link></li>
              <li><Link href="/platform" className="hover:text-amber-400 transition-colors">Whole-Site IoT Monitoring</Link></li>
              <li><Link href="/platform" className="hover:text-amber-400 transition-colors">Precision Utility Billing</Link></li>
            </ul>
          </div>

          {/* Sector Solutions */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Sectors</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/industries" className="hover:text-amber-400 transition-colors">Marina Operators</Link></li>
              <li><Link href="/industries" className="hover:text-amber-400 transition-colors">Yacht Charter Fleets</Link></li>
              <li><Link href="/industries" className="hover:text-amber-400 transition-colors">Yacht Clubs &amp; Boatyards</Link></li>
              <li><Link href="/industries" className="hover:text-amber-400 transition-colors">Shipyards &amp; Canals</Link></li>
            </ul>
          </div>

          {/* Portal Access */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Access Portals</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/admin" className="hover:text-amber-400 font-semibold text-teal-300 transition-colors">Operator SaaS Dashboard →</Link></li>
              <li><Link href="/charter" className="hover:text-amber-400 transition-colors">Customer Discovery</Link></li>
              <li><Link href="/auth/login" className="hover:text-amber-400 transition-colors">Staff Login</Link></li>
              <li><Link href="/demo" className="hover:text-amber-400 font-bold text-amber-400 transition-colors">Book a Demo</Link></li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
};
