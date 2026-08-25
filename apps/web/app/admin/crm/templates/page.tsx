'use client';

import React, { useEffect, useState } from 'react';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/automations/templates')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setTemplates(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">MULTI-CHANNEL COMMUNICATION</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Email &amp; WhatsApp Templates</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tpl) => (
          <div key={tpl.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono font-bold text-[10px]">
                {tpl.channel}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                {tpl.status}
              </span>
            </div>

            <h3 className="font-display text-lg font-bold text-slate-900">{tpl.name}</h3>
            {tpl.subject && <div className="text-xs font-bold text-slate-700">Subject: {tpl.subject}</div>}

            <pre className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 whitespace-pre-wrap">
              {tpl.body}
            </pre>

            <div className="pt-2 flex flex-wrap gap-1 font-mono text-[10px]">
              {tpl.variables?.map((v: string) => (
                <span key={v} className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-bold">
                  {`{{${v}}}`}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
