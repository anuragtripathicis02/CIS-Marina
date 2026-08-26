'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function StaffTasksPage() {
  const [tasks, setTasks] = useState([
    {
      id: 'tsk-101',
      title: 'Inspect Pedestal PED-102 & Read Meters',
      berthNumber: 'Berth B-12',
      vesselName: 'SEA BREEZE',
      category: 'PEDESTAL_SERVICE',
      priority: 'HIGH',
      status: 'PENDING',
      dueTime: '10:30 AM',
      instructions: 'Check 240V breaker switch and record baseline kWh for new berth arrival.',
    },
    {
      id: 'tsk-102',
      title: 'Pre-Arrival Berth Cleaning & Safety Check',
      berthNumber: 'Berth A-04',
      vesselName: 'Ocean Pearl 115',
      category: 'BERTH_CHECKIN',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      dueTime: '11:45 AM',
      instructions: 'Verify cleat tightness, hose availability, and clear pontoon walkways.',
    },
    {
      id: 'tsk-103',
      title: 'Corrective Bilge Alarm Inspection',
      berthNumber: 'Berth C-08',
      vesselName: 'Azure Horizon',
      category: 'MAINTENANCE',
      priority: 'CRITICAL',
      status: 'PENDING',
      dueTime: 'IMMEDIATE',
      instructions: 'Bilge sensor warning received. Inspect hull waterline and confirm pump status.',
    },
    {
      id: 'tsk-104',
      title: 'Water Hose Pressure Verification',
      berthNumber: 'Berth B-02',
      vesselName: 'M/Y Horizon',
      category: 'SAFETY',
      priority: 'LOW',
      status: 'COMPLETED',
      dueTime: '09:00 AM',
      instructions: 'Completed standard morning dock pressure test.',
    },
  ]);

  const toggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'PENDING' ? 'IN_PROGRESS' : t.status === 'IN_PROGRESS' ? 'COMPLETED' : 'PENDING';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const pendingCount = tasks.filter((t) => t.status !== 'COMPLETED').length;

  return (
    <div className="space-y-6 text-left">
      
      {/* Staff Greeting Header */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wider">FIELD TECHNICIAN</span>
          <h1 className="text-xl font-bold text-white mt-0.5">Welcome, Marco Rivera</h1>
          <p className="text-slate-400 text-xs mt-0.5">Shift: Morning Duty (08:00 - 16:00)</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold font-mono text-amber-400">{pendingCount}</div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Open Tasks</div>
        </div>
      </div>

      {/* Quick Filter Tabs */}
      <div className="flex items-center space-x-2 text-xs font-semibold overflow-x-auto pb-1">
        <button className="px-4 py-2 rounded-xl bg-teal-600 text-white shadow-sm font-bold shrink-0">
          All Tasks ({tasks.length})
        </button>
        <button className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white shrink-0">
          Pending ({pendingCount})
        </button>
        <Link href="/staff/alerts" className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 hover:text-amber-300 shrink-0">
          Active Alerts (2)
        </Link>
      </div>

      {/* Task List Cards */}
      <div className="space-y-4">
        {tasks.map((task) => {
          const isCompleted = task.status === 'COMPLETED';
          const isInProgress = task.status === 'IN_PROGRESS';

          return (
            <div
              key={task.id}
              className={`rounded-2xl border p-5 transition-all shadow-md space-y-3 ${
                isCompleted
                  ? 'bg-slate-900/60 border-slate-800/80 opacity-75'
                  : isInProgress
                  ? 'bg-slate-800 border-teal-500/50 shadow-teal-950/20'
                  : 'bg-slate-800/90 border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 font-mono text-[10px] font-bold text-teal-400 border border-slate-700">
                      {task.berthNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-300">{task.vesselName}</span>
                  </div>
                  <h3 className={`font-bold text-sm mt-1.5 ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                    {task.title}
                  </h3>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    task.priority === 'CRITICAL'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/30 animate-pulse'
                      : task.priority === 'HIGH'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {task.priority}
                </span>
              </div>

              <p className="text-slate-700 text-xs leading-relaxed bg-sky-50 p-3 rounded-xl border border-sky-100">
                {task.instructions}
              </p>

              <div className="flex items-center justify-between pt-2 text-xs">
                <div className="text-[11px] text-slate-400 font-mono">
                  Due: <span className="text-slate-200 font-bold">{task.dueTime}</span>
                </div>

                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : isInProgress
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                >
                  {isCompleted ? '✓ Completed' : isInProgress ? 'Mark Complete' : 'Start Task'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
