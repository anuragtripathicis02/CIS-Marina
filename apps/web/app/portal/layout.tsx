'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CustomerPortalLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Luxury Navigation Header */}
      <header className="h-20 bg-slate-900/90 backdrop-blur-md border-b border-amber-500/20 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-50">
        
        {/* Brand Mark */}
        <Link href="/portal" className="flex items-center space-x-3 group">
          <div className="bg-white p-1.5 rounded-xl shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/cis-marina-logo.png" alt="CIS-Marina Logo" className="h-8 w-auto object-contain" />
          </div>
          <div>
            <div className="font-serif text-lg font-bold text-white tracking-wider">CIS-<span className="text-amber-400">Marina</span></div>
            <div className="text-[9px] font-mono text-amber-400/80 uppercase tracking-widest">We make IT possible!</div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold text-slate-300">
          <Link href="/portal" onClick={() => setActiveTab('dashboard')} className={`hover:text-amber-400 transition-colors ${activeTab === 'dashboard' ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-1' : ''}`}>
            Dashboard
          </Link>
          <Link href="/portal/bookings" onClick={() => setActiveTab('bookings')} className={`hover:text-amber-400 transition-colors ${activeTab === 'bookings' ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-1' : ''}`}>
            My Bookings
          </Link>
          <Link href="/portal/yachts" onClick={() => setActiveTab('yachts')} className={`hover:text-amber-400 transition-colors ${activeTab === 'yachts' ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-1' : ''}`}>
            Explore Fleet
          </Link>
          <Link href="/portal/services" onClick={() => setActiveTab('services')} className={`hover:text-amber-400 transition-colors ${activeTab === 'services' ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-1' : ''}`}>
            Services
          </Link>
          <Link href="/portal/concierge" onClick={() => setActiveTab('concierge')} className={`hover:text-amber-400 transition-colors ${activeTab === 'concierge' ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-1' : ''}`}>
            Bespoke Concierge
          </Link>
          <Link href="/portal/club" onClick={() => setActiveTab('club')} className={`hover:text-amber-400 transition-colors ${activeTab === 'club' ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-1' : ''}`}>
            Yacht Club
          </Link>
          <Link href="/portal/support" onClick={() => setActiveTab('support')} className={`hover:text-amber-400 transition-colors ${activeTab === 'support' ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-1' : ''}`}>
            Support
          </Link>
          <Link href="/portal/ai" onClick={() => setActiveTab('ai')} className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 font-bold transition-all flex items-center space-x-1">
            <span>✨ AI Concierge</span>
          </Link>
        </nav>

        {/* Member Profile Pill & Switcher */}
        <div className="flex items-center space-x-4">
          <Link href="/admin" className="text-xs font-mono text-slate-400 hover:text-amber-400 transition-colors hidden sm:inline">
            Admin Console →
          </Link>

          <Link href="/portal/profile" className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-medium hover:border-amber-500/50 transition-colors">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 font-bold flex items-center justify-center text-[10px]">
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 flex items-center justify-around z-50 text-[10px] font-mono font-bold text-slate-400">
        <Link href="/portal" className="flex flex-col items-center space-y-0.5 hover:text-amber-400">
          <span>🏠</span><span>Home</span>
        </Link>
        <Link href="/portal/bookings" className="flex flex-col items-center space-y-0.5 hover:text-amber-400">
          <span>🛥️</span><span>Bookings</span>
        </Link>
        <Link href="/portal/concierge" className="flex flex-col items-center space-y-0.5 hover:text-amber-400">
          <span>👑</span><span>Concierge</span>
        </Link>
        <Link href="/portal/ai" className="flex flex-col items-center space-y-0.5 text-amber-400">
          <span>✨</span><span>AI</span>
        </Link>
        <Link href="/portal/profile" className="flex flex-col items-center space-y-0.5 hover:text-amber-400">
          <span>👤</span><span>Profile</span>
        </Link>
      </div>

    </div>
  );
}
