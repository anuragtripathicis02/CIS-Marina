'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function StaffAlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: 'alt-101',
      title: 'Pedestal PED-102 Overcurrent Warning',
      location: 'Berth B-12 (Pier Bravo)',
      severity: 'WARNING',
      time: '15 mins ago',
      details: 'Voltage drop detected on 240V 50A breaker. Recommend checking dockside shore power cable connection.',
      status: 'OPEN',
    },
    {
      id: 'alt-102',
      title: 'Bilge Water Level Alarm',
      location: 'Berth C-08 (M/Y Azure Horizon)',
      severity: 'CRITICAL',
      time: '32 mins ago',
      details: 'High water level sensor triggered. Automated pump active.',
      status: 'OPEN',
    },
    {
      id: 'alt-103',
      title: 'Geofence Docking Event',
      location: 'Berth A-01 (M/Y Ocean Pearl 115)',
      severity: 'INFO',
      time: '2 hours ago',
      details: 'Vessel AIS confirmed safely moored.',
      status: 'RESOLVED',
    },
  ]);

  React.useEffect(() => {
    fetch('http://localhost:4000/api/v1/operations/alerts')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setAlerts(
            json.data.map((alert: any) => ({
              id: alert.id,
              title: alert.title,
              location: alert.type?.replaceAll('_', ' ') || 'Operations Control',
              severity: alert.severity === 'HIGH' ? 'WARNING' : alert.severity,
              time: alert.createdAt ? new Date(alert.createdAt).toLocaleTimeString() : 'Just now',
              details: alert.message,
              status: 'OPEN',
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const resolveAlert = (id: string) => {
    setAlerts(
      alerts.map((a) => (a.id === id ? { ...a, status: 'RESOLVED' } : a))
    );
  };

  return (
    <div className="space-y-6 text-left">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Active Operational Alerts</h1>
          <p className="text-slate-400 text-xs mt-0.5">Real-time IoT &amp; Dockside Security Telemetry</p>
        </div>

        <Link
          href="/staff"
          className="text-xs font-mono text-teal-400 hover:underline"
        >
          ← Back to Tasks
        </Link>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const isResolved = alert.status === 'RESOLVED';
          const isCritical = alert.severity === 'CRITICAL';

          return (
            <div
              key={alert.id}
              className={`rounded-2xl border p-5 space-y-3 shadow-md ${
                isResolved
                  ? 'bg-slate-900/60 border-slate-800 opacity-70'
                  : isCritical
                  ? 'bg-red-950/30 border-red-500/50'
                  : 'bg-slate-800 border-amber-500/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">
                    {alert.location}
                  </span>
                  <h3 className="font-bold text-sm text-white mt-1">{alert.title}</h3>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    isCritical
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                      : alert.severity === 'WARNING'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {alert.severity}
                </span>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                {alert.details}
              </p>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-mono text-slate-400">{alert.time}</span>

                {!isResolved ? (
                  <button
                    onClick={() => resolveAlert(alert.id)}
                    className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm cursor-pointer transition-colors"
                  >
                    Acknowledge &amp; Resolve
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-400 font-mono">✓ RESOLVED</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
