'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function FleetOperationsPage() {
  const [fleet, setFleet] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/yachts')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setFleet(json.data);
        }
      })
      .catch(() => {
        setFleet([
          {
            id: 'y1',
            name: 'Ocean Pearl 115',
            registrationNumber: 'MC-9941-X',
            make: 'Majesty Yachts',
            lengthFt: 115,
            operationalStatus: 'PREPARING',
            location: 'Monaco Port Hercules',
            hourlyRate: 2500,
            dailyRate: 18000,
            readiness: {
              isReady: false,
              reasons: ['Captain not assigned to upcoming charter', 'Pre-charter inspection pending'],
            },
          },
          {
            id: 'y2',
            name: 'Azure Horizon 88',
            registrationNumber: 'FR-8821-B',
            make: 'Sunseeker',
            lengthFt: 88,
            operationalStatus: 'READY',
            location: 'Monaco Port Hercules',
            hourlyRate: 1800,
            dailyRate: 14000,
            readiness: {
              isReady: true,
              reasons: [],
            },
          },
          {
            id: 'y3',
            name: 'Sea Majesty 130',
            registrationNumber: 'US-1309-M',
            make: 'Benetti',
            lengthFt: 130,
            operationalStatus: 'MAINTENANCE',
            location: 'Dubai Marina, UAE',
            hourlyRate: 3200,
            dailyRate: 24000,
            readiness: {
              isReady: false,
              reasons: ['1 active blocking maintenance issue in progress'],
            },
          },
        ]);
      });
  }, []);

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">FLEET OPERATIONS &amp; READINESS</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Vessel Operational Readiness</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/yachts"
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-sm transition-colors cursor-pointer"
          >
            Manage Fleet Inventory →
          </Link>
        </div>
      </div>

      {/* Fleet Readiness Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fleet.map((y) => (
          <div key={y.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            
            <div className="space-y-3">
              {/* Header Title & Status */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">{y.name}</h3>
                  <p className="text-slate-500 text-xs mt-0.5">{y.make} • {y.lengthFt} ft • Reg: {y.registrationNumber || 'N/A'}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase ${
                    y.readiness?.isReady
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {y.readiness?.isReady ? 'READY FOR CHARTER' : 'NOT READY'}
                </span>
              </div>

              {/* Operational Status Pill */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 font-medium">Operational Status:</span>
                <span className="font-bold text-slate-900">{y.operationalStatus || 'AVAILABLE'}</span>
              </div>

              {/* Readiness Missing Reasons if NOT READY */}
              {!y.readiness?.isReady && y.readiness?.reasons?.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1.5">
                  <div className="font-bold text-amber-900 text-[11px] uppercase tracking-wider">Operational Requirements Missing:</div>
                  <ul className="space-y-1 text-amber-800 font-medium">
                    {y.readiness.reasons.map((r: string, idx: number) => (
                      <li key={idx} className="flex items-center space-x-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
              <Link
                href={`/admin/operations/fleet/${y.id}`}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-center block shadow-sm transition-colors"
              >
                View Operational Timeline &amp; History →
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
