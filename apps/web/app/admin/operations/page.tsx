'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  WrenchIcon,
  ShieldCheckIcon,
  ClipboardCheckIcon,
  UserIcon,
  FleetIcon,
  AlertTriangleIcon,
  VendorIcon,
  ChevronRightIcon,
} from '@/components/ui/Icons';

export default function OperationsDashboardPage() {
  const [metrics, setMetrics] = useState<any>({
    todaysCharters: 8,
    upcomingCharters: 14,
    yachtsReady: 12,
    yachtsNotReady: 3,
    crewAssignedCount: 16,
    crewMissingCertCount: 2,
    openMaintenanceCount: 5,
    overdueMaintenanceCount: 1,
    pendingInspectionsCount: 3,
    openOperationalTasksCount: 4,
  });

  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/operations/dashboard')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setMetrics(json.data);
        }
      })
      .catch(() => {});

    fetch('http://localhost:4000/api/v1/operations/alerts')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setAlerts(json.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">STAGE 04 — PHASE 2 OPERATIONS</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Operations Control Center</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/operations/crew/schedule"
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
          >
            + Assign Crew to Charter
          </Link>
          <Link
            href="/admin/operations/inspections"
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-sm transition-colors cursor-pointer"
          >
            Run Pre-Charter Inspection
          </Link>
        </div>
      </div>

      {/* 6 Top Operational Metric Cards (Matching Requirement 4) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Today's Charters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span>TODAY&apos;S CHARTERS</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 font-mono">{metrics.todaysCharters}</div>
          <div className="text-[10px] text-slate-500 font-medium">8 Active Vessels</div>
        </div>

        {/* Yachts Ready */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span>YACHTS READY</span>
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 font-mono">{metrics.yachtsReady}</div>
          <div className="text-[10px] text-slate-500 font-medium">12 / 15 Fleet Ready</div>
        </div>

        {/* Crew Assigned */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span>CREW ASSIGNED</span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 font-mono">{metrics.crewAssignedCount}</div>
          <div className="text-[10px] text-slate-500 font-medium">No Scheduling Conflicts</div>
        </div>

        {/* Maintenance Open */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span>MAINTENANCE OPEN</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 font-mono">{metrics.openMaintenanceCount}</div>
          <div className="text-[10px] text-slate-500 font-medium">{metrics.overdueMaintenanceCount} Overdue Work Order</div>
        </div>

        {/* Inspections Pending */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span>INSPECTIONS PENDING</span>
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 font-mono">{metrics.pendingInspectionsCount}</div>
          <div className="text-[10px] text-slate-500 font-medium">Pre &amp; Post Charter</div>
        </div>

        {/* Certification Alerts */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span>CERT ALERTS</span>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 font-mono">{metrics.crewMissingCertCount}</div>
          <div className="text-[10px] text-slate-500 font-medium">Expiring &lt; 30 Days</div>
        </div>

      </div>

      {/* Real-Time Operational Alerts Center (Requirement 50) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <AlertTriangleIcon className="w-5 h-5 text-amber-500" />
            <h2 className="font-display text-lg font-bold text-slate-900">Real-Time Operational Alerts Center</h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
            3 ACTIONABLE ALERTS
          </span>
        </div>

        <div className="space-y-3">
          {alerts.map((alt) => (
            <div
              key={alt.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
                alt.severity === 'CRITICAL'
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : alt.severity === 'HIGH'
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="space-y-0.5">
                <div className="font-bold text-sm">{alt.title}</div>
                <div className="text-slate-600">{alt.message}</div>
              </div>

              <Link
                href={alt.link}
                className="px-4 py-2 rounded-lg bg-white border border-slate-300 font-bold text-slate-800 hover:bg-slate-100 shrink-0 transition-colors shadow-xs flex items-center space-x-1"
              >
                <span>Resolve Issue</span>
                <ChevronRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Operations Quick-Access Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Fleet & Vessel Readiness */}
        <Link href="/admin/operations/fleet" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-teal-400 transition-all space-y-3 group">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <FleetIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">Fleet Readiness &amp; Status</h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Monitor vessel status transitions (`READY`, `PREPARING`, `MAINTENANCE`, `IN_CHARTER`) and readiness condition rules.
          </p>
        </Link>

        {/* Crew & Certifications */}
        <Link href="/admin/operations/crew" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-teal-400 transition-all space-y-3 group">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <UserIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">Crew &amp; STCW Certifications</h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Manage crew profiles, STCW commercial licenses, automated 90/30-day expiry calculations, and availability blocks.
          </p>
        </Link>

        {/* Conflict-Aware Crew Scheduling */}
        <Link href="/admin/operations/crew/schedule" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-teal-400 transition-all space-y-3 group">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <ShieldCheckIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">Crew Scheduling Calendar</h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Assign Captains, Engineers, and Stewards to charter bookings with backend double-booking conflict rejection.
          </p>
        </Link>

        {/* Maintenance Management */}
        <Link href="/admin/operations/maintenance" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-teal-400 transition-all space-y-3 group">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <WrenchIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">Maintenance Work Orders</h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Track reported, planned, and scheduled work orders. Blocking maintenance automatically updates yacht availability.
          </p>
        </Link>

        {/* Inspections Runner */}
        <Link href="/admin/operations/inspections" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-teal-400 transition-all space-y-3 group">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <ClipboardCheckIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">Pre &amp; Post-Charter Inspections</h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Conduct touch-friendly hull, engine, and safety inspections. Failed items auto-generate prefilled maintenance issues.
          </p>
        </Link>

        {/* Vendors Directory */}
        <Link href="/admin/operations/vendors" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-teal-400 transition-all space-y-3 group">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <VendorIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">Vendor Directory</h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Manage marine yards, shipyards, life raft inspectors, and catering vendors assigned to maintenance tasks.
          </p>
        </Link>

      </div>

    </div>
  );
}
