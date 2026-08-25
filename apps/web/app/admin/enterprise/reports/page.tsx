'use client';

import React, { useEffect, useState } from 'react';

export default function ReportsBuilderPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/analytics/saved-reports')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setReports(json.data);
      })
      .catch(() => {});
  }, []);

  const handleDownloadCsv = (reportName: string) => {
    window.location.href = `http://localhost:4000/api/v1/analytics/export/csv?reportName=${encodeURIComponent(reportName)}`;
  };

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">CUSTOM REPORTING ENGINE</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Saved Reports &amp; Exports</h1>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">Saved Report Templates</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((r) => (
            <div key={r.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between hover:border-amber-500/40 transition-all">
              <div className="space-y-2 font-mono text-xs">
                <span className="text-amber-400 font-bold block text-sm">{r.name}</span>
                <div className="text-slate-400">Metrics: <span className="text-white font-bold">{r.metricKeys?.join(', ')}</span></div>
                <div className="text-slate-400">Dimensions: <span className="text-white font-bold">{r.dimensions?.join(', ')}</span></div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <button
                  onClick={() => handleDownloadCsv(r.name)}
                  className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono font-bold text-xs hover:bg-amber-500/20 cursor-pointer"
                >
                  📥 Export CSV Data
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
