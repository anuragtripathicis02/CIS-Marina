'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/layout/BrandLogo';
import {
  AnchorIcon,
  PlusIcon,
  DashboardIcon,
  CalendarIcon,
  BookingsIcon,
  FleetIcon,
  CustomersIcon,
  FinancialsIcon,
  OperationsIcon,
  SettingsIcon,
  UserIcon,
  ChevronDownIcon,
} from '@/components/ui/Icons';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex font-sans antialiased">
      
      {/* Slim Vertical Icon Sidebar */}
      <aside className="w-16 bg-white border-r border-slate-200 flex flex-col justify-between items-center py-4 z-30 shrink-0 shadow-sm">
        
        <div className="space-y-5 flex flex-col items-center">
          {/* Logo Mark */}
          <Link href="/" className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-md hover:scale-105 transition-transform overflow-hidden" title="CIS-Marina Home">
            <BrandLogo alt="CIS-Marina" className="w-full h-full object-contain" />
          </Link>

          {/* Quick Create (+) Action Button */}
          <button className="w-10 h-10 rounded-xl bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center shadow-sm transition-colors cursor-pointer" title="Create New">
            <PlusIcon className="w-5 h-5" />
          </button>

          {/* Icon Navigation Stack */}
          <nav className="space-y-2 flex flex-col items-center">
            <Link
              href="/admin"
              onClick={() => setActiveNav('dashboard')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                activeNav === 'dashboard'
                  ? 'bg-teal-50 text-teal-600 border border-teal-200 shadow-sm font-bold'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
              }`}
              title="Dashboard Overview"
            >
              <DashboardIcon className="w-5 h-5" />
            </Link>

            <Link
              href="/admin/crm"
              onClick={() => setActiveNav('crm')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                activeNav === 'crm'
                  ? 'bg-purple-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
              }`}
              title="CRM & Sales Intelligence"
            >
              <CustomersIcon className="w-5 h-5" />
            </Link>

            <Link
              href="/admin/marina"
              onClick={() => setActiveNav('marina')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                activeNav === 'marina'
                  ? 'bg-teal-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
              }`}
              title="Marina & Berth Operations"
            >
              <OperationsIcon className="w-5 h-5" />
            </Link>

            <Link
              href="/admin/availability"
              onClick={() => setActiveNav('calendar')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                activeNav === 'calendar'
                  ? 'bg-teal-50 text-teal-600 border border-teal-200 shadow-sm font-bold'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
              }`}
              title="Availability Calendar"
            >
              <CalendarIcon className="w-5 h-5" />
            </Link>

            <Link
              href="/admin/bookings"
              onClick={() => setActiveNav('bookings')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                activeNav === 'bookings'
                  ? 'bg-teal-50 text-teal-600 border border-teal-200 shadow-sm font-bold'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
              }`}
              title="Bookings Engine"
            >
              <BookingsIcon className="w-5 h-5" />
            </Link>

            <Link
              href="/admin/yachts"
              onClick={() => setActiveNav('fleet')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                activeNav === 'fleet'
                  ? 'bg-teal-50 text-teal-600 border border-teal-200 shadow-sm font-bold'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
              }`}
              title="Fleet Vessels"
            >
              <FleetIcon className="w-5 h-5" />
            </Link>

            <Link
              href="/admin/financials"
              onClick={() => setActiveNav('financials')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                activeNav === 'financials'
                  ? 'bg-teal-50 text-teal-600 border border-teal-200 shadow-sm font-bold'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
              }`}
              title="Payments & Invoices"
            >
              <FinancialsIcon className="w-5 h-5" />
            </Link>
          </nav>
        </div>

        {/* Bottom Settings Icon */}
        <div className="flex flex-col items-center">
          <Link
            href="/admin"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            title="Settings"
          >
            <SettingsIcon className="w-5 h-5" />
          </Link>
        </div>

      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-sm">
          
          {/* Organization Selector */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 p-0.5 flex items-center justify-center shadow-xs overflow-hidden">
              <BrandLogo alt="CIS-Marina Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80">
              <span className="font-bold text-slate-900 text-sm tracking-tight">&quot;CIS-Marina Flagship Marina &amp; Yacht Club&quot;</span>
              <ChevronDownIcon className="w-4 h-4 text-slate-500" />
            </div>
          </div>

          {/* Sub-module Navigation Quicklinks for Executive BI, Enterprise, CRM & AI Intelligence */}
          <nav className="hidden xl:flex items-center space-x-4 text-xs font-semibold text-slate-600">
            <Link href="/admin/executive" className="text-indigo-700 font-bold hover:underline transition-colors">📊 Executive BI</Link>
            <Link href="/admin/enterprise" className="text-amber-700 font-bold hover:underline transition-colors">🌐 Enterprise</Link>
            <Link href="/admin/crm" className="text-purple-700 font-bold hover:underline transition-colors">🎯 CRM</Link>
            <Link href="/admin/crm/leads" className="hover:text-teal-700 transition-colors">Leads</Link>
            <Link href="/admin/crm/pipeline" className="hover:text-teal-700 transition-colors">Pipeline</Link>
            <Link href="/admin/crm/revenue" className="text-emerald-700 font-bold hover:underline transition-colors">€ Revenue</Link>
            <Link href="/admin/crm/ai-assistant" className="text-purple-700 font-bold hover:underline transition-colors">✨ AI</Link>
          </nav>

          {/* User Account Pill & Public Portal Link */}
          <div className="flex items-center space-x-5">
            <Link href="/charter" className="text-xs text-teal-700 font-semibold hover:underline hidden sm:inline">
              Public Customer Portal →
            </Link>

            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold shadow-xs">
              <div className="w-5 h-5 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center">
                <UserIcon className="w-3.5 h-3.5" />
              </div>
              <span>Michelle Rivera</span>
            </div>
          </div>
        </header>

        {/* Main Dashboard Canvas */}
        <main className="flex-1 p-6 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>

    </div>
  );
}
