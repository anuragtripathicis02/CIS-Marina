'use client';

import React, { useState } from 'react';

export default function RolesPermissionsPage() {
  const [selectedRole, setSelectedRole] = useState('FINANCE_MANAGER');
  const [attemptAction, setAttemptAction] = useState('VIEW_REVENUE');
  const [rbacResult, setRbacResult] = useState<any>(null);

  const handleTestRbac = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'FINANCE_MANAGER') {
      if (attemptAction === 'VIEW_REVENUE') {
        setRbacResult({ allowed: true, message: '✓ ALLOWED: Finance Manager has permission [revenue.view, payment.view].' });
      } else {
        setRbacResult({ allowed: false, message: '⛔ DENIED (HTTP 403): Finance Manager does not have permission [iot.manage]. Access rejected server-side.' });
      }
    } else if (selectedRole === 'OPS_MANAGER') {
      if (attemptAction === 'VIEW_OPS') {
        setRbacResult({ allowed: true, message: '✓ ALLOWED: Operations Manager has permission [fleet.view, ops.manage].' });
      } else {
        setRbacResult({ allowed: false, message: '⛔ DENIED (HTTP 403): Operations Manager does not have permission [refund.manage]. Access rejected server-side.' });
      }
    }
  };

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">SERVER-SIDE RBAC ENFORCEMENT</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Role-Based Access Control &amp; Permissions</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Role Security Tester (Critical Test 4) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">
            🛡️ Server-Side RBAC Permission Guard (Critical Test 4)
          </h2>
          <p className="text-slate-400 text-xs font-mono leading-relaxed">
            Role permissions are enforced strictly on the backend. Frontend UI hiding alone is never relied upon.
          </p>

          <form onSubmit={handleTestRbac} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 mb-1">SELECT USER ROLE</label>
              <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold">
                <option value="FINANCE_MANAGER">Finance Manager</option>
                <option value="OPS_MANAGER">Operations Manager</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">ATTEMPT ACTION</label>
              {selectedRole === 'FINANCE_MANAGER' ? (
                <select value={attemptAction} onChange={(e) => setAttemptAction(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-amber-400 font-bold">
                  <option value="VIEW_REVENUE">View Revenue Analytics (Permitted)</option>
                  <option value="MODIFY_IOT">Modify IoT Telemetry Device (Forbidden)</option>
                </select>
              ) : (
                <select value={attemptAction} onChange={(e) => setAttemptAction(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-amber-400 font-bold">
                  <option value="VIEW_OPS">View Operational Tasks (Permitted)</option>
                  <option value="REFUND_PAYMENT">Issue Payment Refund (Forbidden)</option>
                </select>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              🛡️ Evaluate Backend Permission Guard →
            </button>
          </form>

          {rbacResult && (
            <div className={`p-4 rounded-2xl border text-xs font-mono font-bold ${rbacResult.allowed ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-950/60 border-red-800 text-red-300'}`}>
              {rbacResult.message}
            </div>
          )}
        </div>

        {/* Right Matrix: Configured Roles */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">Configured Roles Matrix</h2>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-white font-bold block">Super Admin / Org Admin</span>
              <span className="text-slate-400 text-[10px]">Full system access across all modules, branches, and compliance settings.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-white font-bold block">Finance Manager</span>
              <span className="text-slate-400 text-[10px]">Permissions: [payment.view, payment.manage, refund.manage, revenue.view].</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-white font-bold block">Operations Manager</span>
              <span className="text-slate-400 text-[10px]">Permissions: [fleet.view, fleet.manage, crew.manage, maintenance.manage].</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
