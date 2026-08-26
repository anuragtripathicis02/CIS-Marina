'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/layout/BrandLogo';

export default function CustomerPortalLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="portal-light min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-amber-200 selection:text-slate-900">
      
      {/* Top Luxury Navigation Header */}
      <header className="h-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        
        {/* Brand Mark */}
        <Link href="/portal" className="flex items-center space-x-3 group">
          <div className="bg-white p-1.5 rounded-xl shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <BrandLogo alt="CIS-Marina Logo" className="h-8 w-auto object-contain" />
          </div>
          <div>
            <div className="font-serif text-lg font-bold text-slate-900 tracking-wider">CIS-<span className="text-amber-600">Marina</span></div>
            <div className="text-[9px] font-mono text-amber-700 uppercase tracking-widest">We make IT possible!</div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold text-slate-600">
          <Link href="/portal" onClick={() => setActiveTab('dashboard')} className={`hover:text-amber-700 transition-colors ${activeTab === 'dashboard' ? 'text-amber-700 font-bold border-b-2 border-amber-700 pb-1' : ''}`}>
            Dashboard
          </Link>
          <Link href="/portal/bookings" onClick={() => setActiveTab('bookings')} className={`hover:text-amber-700 transition-colors ${activeTab === 'bookings' ? 'text-amber-700 font-bold border-b-2 border-amber-700 pb-1' : ''}`}>
            My Bookings
          </Link>
          <Link href="/portal/yachts" onClick={() => setActiveTab('yachts')} className={`hover:text-amber-700 transition-colors ${activeTab === 'yachts' ? 'text-amber-700 font-bold border-b-2 border-amber-700 pb-1' : ''}`}>
            Explore Fleet
          </Link>
          <Link href="/portal/services" onClick={() => setActiveTab('services')} className={`hover:text-amber-700 transition-colors ${activeTab === 'services' ? 'text-amber-700 font-bold border-b-2 border-amber-700 pb-1' : ''}`}>
            Services
          </Link>
          <Link href="/portal/concierge" onClick={() => setActiveTab('concierge')} className={`hover:text-amber-700 transition-colors ${activeTab === 'concierge' ? 'text-amber-700 font-bold border-b-2 border-amber-700 pb-1' : ''}`}>
            Bespoke Concierge
          </Link>
          <Link href="/portal/club" onClick={() => setActiveTab('club')} className={`hover:text-amber-700 transition-colors ${activeTab === 'club' ? 'text-amber-700 font-bold border-b-2 border-amber-700 pb-1' : ''}`}>
            Yacht Club
          </Link>
          <Link href="/portal/support" onClick={() => setActiveTab('support')} className={`hover:text-amber-700 transition-colors ${activeTab === 'support' ? 'text-amber-700 font-bold border-b-2 border-amber-700 pb-1' : ''}`}>
            Support
          </Link>
          <Link href="/portal/ai" onClick={() => setActiveTab('ai')} className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200 font-bold transition-all flex items-center space-x-1">
            <span>✨ AI Concierge</span>
          </Link>
        </nav>

        {/* Member Profile Pill & Switcher */}
        <div className="flex items-center space-x-4">
          <Link href="/admin" className="text-xs font-mono text-slate-500 hover:text-amber-700 transition-colors hidden sm:inline">
            Admin Console →
          </Link>

          <Link href="/portal/profile" className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium hover:border-amber-500/50 transition-colors">
            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-[10px]">
              AS
            </div>
            <span className="font-semibold hidden sm:inline">Lord Sterling</span>
          </Link>
        </div>
      </header>

      {/* Main Experience Canvas */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar (Smartphones) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-lg border-t border-slate-200 flex items-center justify-around z-50 text-[10px] font-mono font-bold text-slate-500 shadow-lg">
        <Link href="/portal" className="flex flex-col items-center space-y-0.5 hover:text-amber-700">
          <span>🏠</span><span>Home</span>
        </Link>
        <Link href="/portal/bookings" className="flex flex-col items-center space-y-0.5 hover:text-amber-700">
          <span>🛥️</span><span>Bookings</span>
        </Link>
        <Link href="/portal/concierge" className="flex flex-col items-center space-y-0.5 hover:text-amber-700">
          <span>👑</span><span>Concierge</span>
        </Link>
        <Link href="/portal/ai" className="flex flex-col items-center space-y-0.5 text-amber-700">
          <span>✨</span><span>AI</span>
        </Link>
        <Link href="/portal/profile" className="flex flex-col items-center space-y-0.5 hover:text-amber-700">
          <span>👤</span><span>Profile</span>
        </Link>
      </div>

    </div>
  );
}
