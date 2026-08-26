'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { AlertTriangleIcon, AnchorIcon, ClipboardCheckIcon, SettingsIcon } from '@/components/ui/Icons';

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="staff-light min-h-screen bg-slate-100 text-slate-900 font-sans antialiased flex flex-col lg:pb-[80px] pb-[80px]">
      
      {/* Mobile Top Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex w-full max-w-[800px] mx-auto items-center justify-between gap-3">
        <div className="flex min-w-0 items-center space-x-3">
          <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <BrandLogo alt="CIS-Marina" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0">
            <div className="truncate font-bold text-slate-900 text-sm tracking-wide">CIS MARINA STAFF</div>
            <div className="truncate text-[10px] text-teal-700 font-mono">FIELD OPERATOR MOBILE WORKSPACE</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
            DUTY ON
          </span>
        </div>
        </div>
      </header>

      {/* Main Experience Canvas */}
      <main className="flex-1 w-full max-w-[800px] mx-auto bg-slate-50 p-4 sm:p-6 pb-8 shadow-[0_0_24px_rgba(15,23,42,0.06)]">
        {children}
      </main>

      {/* Staff Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/95 border-t border-slate-200 flex items-center justify-center z-50 text-[10px] font-semibold text-slate-500 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <div className="flex w-full max-w-[800px] items-center justify-around px-2">
        <Link href="/staff" className="flex min-w-[64px] flex-col items-center gap-1 rounded-xl py-1.5 hover:bg-teal-50 hover:text-teal-700 focus:bg-teal-50 focus:text-teal-700">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
            <ClipboardCheckIcon className="h-5 w-5" />
          </span>
          <span>Tasks</span>
        </Link>
        <Link href="/staff/alerts" className="flex min-w-[64px] flex-col items-center gap-1 rounded-xl py-1.5 hover:bg-amber-50 hover:text-amber-700 focus:bg-amber-50 focus:text-amber-700">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
            <AlertTriangleIcon className="h-5 w-5" />
          </span>
          <span>Alerts</span>
        </Link>
        <Link href="/staff/berths" className="flex min-w-[64px] flex-col items-center gap-1 rounded-xl py-1.5 hover:bg-teal-50 hover:text-teal-700 focus:bg-teal-50 focus:text-teal-700">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
            <AnchorIcon className="h-5 w-5" />
          </span>
          <span>Berths</span>
        </Link>
        <Link href="/admin" className="flex min-w-[64px] flex-col items-center gap-1 rounded-xl py-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 ring-1 ring-slate-200">
            <SettingsIcon className="h-5 w-5" />
          </span>
          <span>Admin</span>
        </Link>
        </div>
      </nav>

    </div>
  );
}
