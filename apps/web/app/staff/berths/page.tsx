'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StaffBerthsPage() {
  const fallbackBerths = [
    {
      berthNumber: 'B-12',
      dock: 'Pier Bravo',
      vesselName: 'SEA BREEZE',
      pedestal: 'PED-102',
      status: 'OCCUPIED',
      electricityMeter: '4,358.5 kWh',
      waterMeter: '19,450 L',
    },
    {
      berthNumber: 'A-01',
      dock: 'Pier Alpha',
      vesselName: 'Ocean Pearl 115',
      pedestal: 'PED-101',
      status: 'OCCUPIED',
      electricityMeter: '8,920.0 kWh',
      waterMeter: '45,100 L',
    },
    {
      berthNumber: 'B-14',
      dock: 'Pier Bravo',
      vesselName: 'None (Available)',
      pedestal: 'PED-103',
      status: 'AVAILABLE',
      electricityMeter: '1,200.0 kWh',
      waterMeter: '5,000 L',
    },
    {
      berthNumber: 'C-08',
      dock: 'Pier Charlie',
      vesselName: 'Azure Horizon 88',
      pedestal: 'PED-201',
      status: 'MAINTENANCE',
      electricityMeter: '3,100.0 kWh',
      waterMeter: '12,800 L',
    },
  ];
  const [berths, setBerths] = useState(fallbackBerths);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/marinas')
      .then((res) => res.json())
      .then((json) => {
        const apiBerths = json.data?.flatMap((marina: any) =>
          (marina.docks || []).flatMap((dock: any) =>
            (dock.berths || []).map((berth: any) => ({
              berthNumber: berth.berthNumber,
              dock: dock.name || 'Marina Dock',
              vesselName: berth.status === 'OCCUPIED' ? 'Assigned Vessel' : 'None (Available)',
              pedestal: `PED-${berth.id?.replace(/\D/g, '') || '000'}`,
              status: berth.status,
              electricityMeter: berth.powerAvailable ? 'Connected' : 'Unavailable',
              waterMeter: berth.waterAvailable ? 'Connected' : 'Unavailable',
            }))
          )
        );
        if (Array.isArray(apiBerths) && apiBerths.length > 0) setBerths(apiBerths);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6 text-left">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Berth &amp; Pedestal Status</h1>
          <p className="text-slate-400 text-xs mt-0.5">Live Dockside Utility &amp; Slip Overview</p>
        </div>

        <Link
          href="/staff"
          className="text-xs font-mono text-teal-400 hover:underline"
        >
          ← Back to Tasks
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {berths.map((b, idx) => (
          <div key={idx} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-3 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
              <div>
                <span className="text-lg font-bold font-mono text-white">{b.berthNumber}</span>
                <span className="text-xs text-slate-400 font-medium block">{b.dock}</span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                  b.status === 'OCCUPIED'
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                    : b.status === 'AVAILABLE'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}
              >
                {b.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Vessel:</span>
                <span className="font-bold text-white">{b.vesselName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pedestal ID:</span>
                <span className="font-mono text-teal-400 font-bold">{b.pedestal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Elec Meter:</span>
                <span className="font-mono text-slate-200">{b.electricityMeter}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Water Meter:</span>
                <span className="font-mono text-slate-200">{b.waterMeter}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700/80">
              <Link
                href="/staff"
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-950 text-slate-300 font-bold text-xs text-center block border border-slate-700 transition-colors"
              >
                Log Inspection / Task →
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
