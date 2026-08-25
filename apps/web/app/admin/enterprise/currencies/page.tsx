'use client';

import React, { useState } from 'react';

export default function CurrenciesPage() {
  const [amount, setAmount] = useState('10000');
  const [base, setBase] = useState('USD');
  const [target, setTarget] = useState('EUR');
  const [conversionResult, setConversionResult] = useState<any>(null);

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res: Response;
      try {
        res = await fetch(`http://localhost:4000/api/v1/enterprise/currencies/convert?amount=${amount}&base=${base}&target=${target}`);
      } catch (err) {
        res = await fetch(`/api/v1/enterprise/currencies/convert?amount=${amount}&base=${base}&target=${target}`);
      }

      const json = await res.json();
      if (json.success && json.data) setConversionResult(json.data);
    } catch (err) {}
  };

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">ExchangeRateProvider ABSTRACTION</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Multi-Currency &amp; Rate Converter</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Rate Tester (Critical Test 1) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">
            🛡️ Multi-Currency Conversion Tester (Critical Test 1)
          </h2>
          <p className="text-slate-400 text-xs font-mono leading-relaxed">
            Original financial records are stored deterministically in transaction currency with rate snapshots. Display conversions are calculated separately.
          </p>

          <form onSubmit={handleConvert} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 mb-1">TRANSACTION AMOUNT</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-amber-400 font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">BASE CURRENCY</label>
                <select value={base} onChange={(e) => setBase(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold">
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="AED">AED (AED)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">TARGET DISPLAY</label>
                <select value={target} onChange={(e) => setTarget(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold">
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="AED">AED (AED)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              💱 Calculate Display Conversion →
            </button>
          </form>

          {conversionResult && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-xs font-mono space-y-2">
              <div className="text-slate-400">ORIGINAL TRANSACTION: <span className="text-white font-bold">${conversionResult.originalAmount.toLocaleString()} {conversionResult.baseCurrency}</span></div>
              <div className="text-slate-400">SNAPSHOT EXCHANGE RATE: <span className="text-amber-400 font-bold">1 {conversionResult.baseCurrency} = {conversionResult.exchangeRate} {conversionResult.displayCurrency}</span></div>
              <div className="text-slate-400">CALCULATED DISPLAY: <span className="text-emerald-400 font-bold text-sm">{conversionResult.formattedDisplay}</span></div>
            </div>
          )}
        </div>

        {/* Right Directory: Supported Currencies */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">Supported Platform Currencies</h2>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between"><span>USD ($) — US Dollar</span> <span className="text-emerald-400 font-bold">BASE SUPPORTED</span></div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between"><span>EUR (€) — Euro</span> <span className="text-emerald-400 font-bold">BASE SUPPORTED</span></div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between"><span>GBP (£) — British Pound</span> <span className="text-emerald-400 font-bold">BASE SUPPORTED</span></div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between"><span>AED (AED) — UAE Dirham</span> <span className="text-emerald-400 font-bold">BASE SUPPORTED</span></div>
          </div>
        </div>

      </div>

    </div>
  );
}
