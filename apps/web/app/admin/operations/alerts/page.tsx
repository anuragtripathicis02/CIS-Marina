'use client';

import React, { useEffect, useState } from 'react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [rules, setRules] = useState<any[]>([]);

  const [metricType, setMetricType] = useState('BATTERY_VOLTAGE');
  const [operator, setOperator] = useState('<');
  const [threshold, setThreshold] = useState('11.5');
  const [severity, setSeverity] = useState('WARNING');
  const [category, setCategory] = useState('LOW_BATTERY');

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/alerts')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setAlerts(json.data);
      })
      .catch(() => {});

    fetch('http://localhost:4000/api/v1/alerts/rules')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setRules(json.data);
      })
      .catch(() => {});
  }, []);

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res: Response;
      const body = JSON.stringify({
        yachtId: 'y1',
        metricType,
        operator,
        threshold: parseFloat(threshold),
        severity,
        category,
      });

      try {
        res = await fetch('/api/v1/alerts/rules', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch('http://localhost:4000/api/v1/alerts/rules', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      }

      const json = await res.json();
      if (json.success && json.data) {
        setRules((prev) => [json.data, ...prev]);
      }
    } catch (err) {}
  };

  const handleTransitionStatus = async (alertId: string, status: string) => {
    try {
      let res: Response;
      const body = JSON.stringify({ status });

      try {
        res = await fetch(`/api/v1/alerts/${alertId}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch(`http://localhost:4000/api/v1/alerts/${alertId}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body });
      }

      const json = await res.json();
      if (json.success) {
        setAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, status } : a)));
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">ALERT ENGINE &amp; DEDUPLICATION</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Vessel Alert Rules &amp; Lifecycle</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Create Threshold Rule */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Configure Metric Alert Rule
          </h2>

          <form onSubmit={handleCreateRule} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Target Metric Type *</label>
              <select
                value={metricType}
                onChange={(e) => setMetricType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
              >
                <option value="BATTERY_VOLTAGE">BATTERY_VOLTAGE (V)</option>
                <option value="SPEED">SPEED (knots)</option>
                <option value="ENGINE_TEMP">ENGINE_TEMP (°C)</option>
                <option value="FUEL_LEVEL">FUEL_LEVEL (%)</option>
                <option value="BILGE_STATUS">BILGE_STATUS</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Operator</label>
                <select
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                >
                  <option value="<">&lt; (Less Than)</option>
                  <option value="<=">&lt;= (Less or Equal)</option>
                  <option value=">">&gt; (Greater Than)</option>
                  <option value=">=">&gt;= (Greater or Equal)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Threshold *</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                >
                  <option value="INFO">INFO</option>
                  <option value="WARNING">WARNING</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                >
                  <option value="LOW_BATTERY">LOW_BATTERY</option>
                  <option value="HIGH_SPEED">HIGH_SPEED</option>
                  <option value="HIGH_ENGINE_TEMPERATURE">HIGH_ENGINE_TEMPERATURE</option>
                  <option value="BILGE_ALERT">BILGE_ALERT</option>
                  <option value="GEOFENCE_EXIT">GEOFENCE_EXIT</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              + Create Alert Threshold Rule →
            </button>
          </form>
        </div>

        {/* Right Active Alerts List */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            System Alerts &amp; Deduplication Counter
          </h2>

          <div className="space-y-3">
            {alerts.map((a) => (
              <div key={a.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{a.title}</span>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold text-[10px]">
                      TRIGGERED {a.triggerCount} TIMES
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                      {a.status}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600">{a.message}</p>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">Last Triggered: {new Date(a.lastTriggeredAt).toLocaleTimeString()}</span>

                  <div className="flex items-center space-x-2">
                    {a.status !== 'ACKNOWLEDGED' && (
                      <button
                        onClick={() => handleTransitionStatus(a.id, 'ACKNOWLEDGED')}
                        className="px-3 py-1 rounded-lg bg-teal-600 text-white font-bold text-[10px] cursor-pointer"
                      >
                        Acknowledge
                      </button>
                    )}
                    {a.status !== 'RESOLVED' && (
                      <button
                        onClick={() => handleTransitionStatus(a.id, 'RESOLVED')}
                        className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] cursor-pointer"
                      >
                        Resolve Alert
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
