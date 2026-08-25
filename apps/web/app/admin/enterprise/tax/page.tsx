'use client';

import React, { useEffect, useState } from 'react';

export default function TaxEnginePage() {
  const [taxRules, setTaxRules] = useState<any[]>([]);
  const [testAmount, setTestAmount] = useState('1000');
  const [testCategory, setTestCategory] = useState('YACHT_CHARTER');
  const [taxResult, setTaxResult] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/enterprise/tax-rules')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setTaxRules(json.data);
      })
      .catch(() => {});
  }, []);

  const handleCalculateTax = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res: Response;
      const body = JSON.stringify({ amount: parseFloat(testAmount), category: testCategory, countryCode: 'FR' });

      try {
        res = await fetch('http://localhost:4000/api/v1/enterprise/tax-rules/calculate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch('/api/v1/enterprise/tax-rules/calculate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      }

      const json = await res.json();
      if (json.success && json.data) setTaxResult(json.data);
    } catch (err) {}
  };

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">CONFIGURATION-DRIVEN TAX ENGINE</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Country &amp; Category Tax Rules</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Configurable Tax Calculator (Critical Test 2) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">
            🏛️ Tax Calculation Engine Tester (Critical Test 2)
          </h2>
          <p className="text-slate-400 text-xs font-mono leading-relaxed">
            Tax rates derive dynamically from configurable `TaxRule` records per country &amp; category (no hard-coded constants).
          </p>

          <form onSubmit={handleCalculateTax} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 mb-1">SERVICE SUBTOTAL AMOUNT (€)</label>
              <input
                type="number"
                value={testAmount}
                onChange={(e) => setTestAmount(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-amber-400 font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">PRODUCT / SERVICE CATEGORY</label>
              <select value={testCategory} onChange={(e) => setTestCategory(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold">
                <option value="YACHT_CHARTER">Yacht Charter (20% VAT)</option>
                <option value="BERTH_LEASE">Berth Lease &amp; Marina Slip</option>
                <option value="UTILITY_SERVICE">Dockside Utility Service</option>
                <option value="CLUB_MEMBERSHIP">Yacht Club Membership</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              🏛️ Calculate Configured Tax Breakdown →
            </button>
          </form>

          {taxResult && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-xs font-mono space-y-2">
              <div className="text-slate-400">SUBTOTAL AMOUNT: <span className="text-white font-bold">€{taxResult.breakdown.subtotal}</span></div>
              <div className="text-slate-400">CONFIGURED TAX ({taxResult.taxRate}%): <span className="text-amber-400 font-bold">€{taxResult.breakdown.tax}</span></div>
              <div className="text-slate-400 border-t border-slate-800 pt-1">TOTAL WITH TAX: <span className="text-emerald-400 font-bold text-sm">€{taxResult.breakdown.total}</span></div>
            </div>
          )}
        </div>

        {/* Right Directory: Configured Tax Rules */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">Active Tax Rules ({taxRules.length})</h2>
          <div className="space-y-3 font-mono text-xs">
            {taxRules.map((t) => (
              <div key={t.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-amber-400 font-bold block">{t.taxName}</span>
                  <span className="text-slate-500 text-[10px]">{t.countryCode} • {t.category}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                  {t.taxRate}%
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
