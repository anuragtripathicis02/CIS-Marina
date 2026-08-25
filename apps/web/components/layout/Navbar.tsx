'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#030728] border-b border-navy-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* CIS-Marina Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="bg-white p-1.5 rounded-xl shadow-md group-hover:scale-105 transition-transform  hidden items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <BrandLogo alt="CIS-Marina Logo" className="h-8 w-auto object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold text-white tracking-tight leading-none">
              CIS-<span className="text-amber-400">Marina</span>
            </span>
            <span className="text-[9px] font-mono text-slate-400 font-semibold tracking-wider uppercase mt-0.5">We make IT possible!</span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium text-slate-200">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/solutions" className="hover:text-white transition-colors">
            Products
          </Link>
          <Link href="/platform" className="hover:text-white transition-colors">
            Platform
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center space-x-4">
          <Link
            href="/admin"
            className="hidden sm:inline-block text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Operator Login
          </Link>
          <Link
            href="/demo"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#030728] font-bold text-sm hover:from-amber-300 hover:to-amber-400 shadow-lg transition-all transform hover:scale-105"
          >
            Book a Demo
          </Link>
        </div>

      </div>
    </header>
  );
};
