'use client';

import React, { useEffect, useState } from 'react';

export default function AutomationsPage() {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/automations')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setWorkflows(json.data);
      })
      .catch(() => {});
  }, []);

  const handleTestIdempotency = async (eventId: string) => {
    setStatusMsg(null);
    const wfId = workflows[0]?.id || 'wf-1';

    try {
      let res: Response;
      const body = JSON.stringify({ eventId });

      try {
        res = await fetch(`/api/v1/automations/${wfId}/trigger`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch(`http://localhost:4000/api/v1/automations/${wfId}/trigger`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      }

      const json = await res.json();
      if (json.success && json.data) {
        if (json.data.result === 'SKIPPED') {
          setStatusMsg(`🛡️ IDEMPOTENCY GUARD TRIGGERED: ${json.data.message}`);
        } else {
          setStatusMsg(`✓ Workflow executed successfully! (${json.data.actionsExecuted} actions executed)`);
        }
      }
    } catch (err: any) {
      setStatusMsg(err.message);
    }
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">WORKFLOW ENGINE &amp; IDEMPOTENCY</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Automated Workflows &amp; Safety Guards</h1>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-mono font-bold">
          {statusMsg}
        </div>
      )}

      {/* Workflows List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map((wf) => (
          <div key={wf.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 font-mono font-bold text-[10px]">
                TRIGGER: {wf.trigger}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                ENABLED
              </span>
            </div>

            <h3 className="font-display text-lg font-bold text-slate-900">{wf.name}</h3>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
              <div>Condition: {JSON.stringify(wf.conditions)}</div>
              <div>Actions: {JSON.stringify(wf.actions)}</div>
            </div>

            <div className="pt-2 flex items-center space-x-2">
              <button
                onClick={() => handleTestIdempotency(`evt-normal-${Date.now()}`)}
                className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs cursor-pointer"
              >
                ▶ Test Run Workflow
              </button>
              <button
                onClick={() => handleTestIdempotency('already-processed-event')}
                className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer"
              >
                🛡️ Test Idempotency Guard
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
