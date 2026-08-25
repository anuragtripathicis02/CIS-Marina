'use client';

import React, { useEffect, useState } from 'react';

export default function ChecklistsPage() {
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/checklists/templates')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setTemplates(json.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">CHECKLIST TEMPLATES &amp; EXECUTION</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Pre-Charter Preparation Checklists</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer">
            + New Checklist Template
          </button>
        </div>
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tmpl) => (
          <div key={tmpl.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">{tmpl.name}</h3>
                <p className="text-slate-500 text-xs mt-0.5">{tmpl.description}</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-mono font-bold">
                {tmpl.type}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Template Checklist Items ({tmpl.items?.length}):</h4>
              <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                {tmpl.items?.map((item: any) => (
                  <li key={item.id} className="flex items-center space-x-2 p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-[10px]">✓</span>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
