'use client';

import React, { useEffect, useState } from 'react';

export default function InspectionsPage() {
  const [inspections, setInspections] = useState<any[]>([]);
  const [selectedInspection, setSelectedInspection] = useState<any>(null);
  const [itemNotes, setItemNotes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/inspections')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setInspections(json.data);
          if (json.data.length > 0) setSelectedInspection(json.data[0]);
        }
      })
      .catch(() => {});
  }, []);

  const handleEvaluate = async (itemId: string, result: 'PASS' | 'FAIL' | 'NOT_APPLICABLE') => {
    try {
      let res: Response;
      const body = JSON.stringify({
        result,
        notes: itemNotes[itemId] || (result === 'FAIL' ? 'Defect observed during pre-charter inspection.' : 'Verified OK'),
        createMaintenanceIfFailed: true,
      });

      try {
        res = await fetch(`/api/v1/inspections/items/${itemId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
      } catch (e) {
        res = await fetch(`http://localhost:4000/api/v1/inspections/items/${itemId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
      }

      // Update local state
      if (selectedInspection) {
        setSelectedInspection({
          ...selectedInspection,
          items: selectedInspection.items.map((i: any) =>
            i.id === itemId ? { ...i, result, maintenanceCreated: result === 'FAIL' } : i
          ),
        });
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">INSPECTION &amp; SAFETY AUDITS</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Pre &amp; Post-Charter Inspection Runner</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer">
            + Start New Inspection
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left List of Inspections */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
          <h2 className="font-display text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Active Inspections Roster
          </h2>

          <div className="space-y-2">
            {inspections.map((insp) => (
              <button
                key={insp.id}
                onClick={() => setSelectedInspection(insp)}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  selectedInspection?.id === insp.id
                    ? 'bg-teal-50 border-teal-500 text-slate-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>{insp.type}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">
                    {insp.status}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px] mt-1">
                  Vessel: {insp.yacht?.name || 'Ocean Pearl 115'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Inspection Runner Card (Pass / Fail / N.A controls) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          {selectedInspection ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-slate-900">
                    {selectedInspection.type} Inspection Runner
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Target Vessel: <span className="font-bold text-slate-800">{selectedInspection.yacht?.name || 'Ocean Pearl 115'}</span>
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono font-bold text-xs">
                  STATUS: {selectedInspection.status}
                </span>
              </div>

              {/* Items Evaluation Grid */}
              <div className="space-y-4">
                {selectedInspection.items?.map((item: any) => (
                  <div key={item.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-teal-700 uppercase tracking-wider text-[10px]">{item.categoryName}</span>
                        <h4 className="font-bold text-slate-900 text-sm">{item.itemName}</h4>
                      </div>

                      {/* Touch-Friendly Result Controls */}
                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={() => handleEvaluate(item.id, 'PASS')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            item.result === 'PASS'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          ✓ PASS
                        </button>
                        <button
                          onClick={() => handleEvaluate(item.id, 'FAIL')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            item.result === 'FAIL'
                              ? 'bg-red-600 text-white shadow-sm'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          ✕ FAIL
                        </button>
                        <button
                          onClick={() => handleEvaluate(item.id, 'NOT_APPLICABLE')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            item.result === 'NOT_APPLICABLE'
                              ? 'bg-slate-700 text-white shadow-sm'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          N/A
                        </button>
                      </div>
                    </div>

                    {/* Failure Maintenance Created Badge */}
                    {item.result === 'FAIL' && (
                      <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-900 text-[11px] flex items-center justify-between">
                        <span>⚠️ Item Failed: Auto-created Blocking Maintenance Work Order.</span>
                        <span className="font-mono font-bold text-red-700">WORK ORDER AUTO-GENERATED</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select an inspection from the left roster to run audit controls.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
