'use client';

import React, { useState } from 'react';

export default function ProfilePage() {
  const [emailOptIn, setEmailOptIn] = useState(true);
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  const handleSavePreferences = () => {
    setSavedStatus('✓ Customer communication preferences saved successfully!');
    setTimeout(() => setSavedStatus(null), 3000);
  };

  return (
    <div className="space-y-8 text-left font-sans max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">ACCOUNT &amp; PRIVACY SETTINGS</span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">Customer Profile &amp; Preferences</h1>
      </div>

      {savedStatus && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
          {savedStatus}
        </div>
      )}

      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <h2 className="font-serif text-xl font-bold text-white border-b border-slate-800 pb-3">Personal Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-500">FULL NAME</span>
            <div className="text-white font-bold text-sm">Lord Arthur Sterling</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-500">EMAIL ADDRESS</span>
            <div className="text-white font-bold text-sm">sterling@luxuryyachts.com</div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-4">
          <h3 className="font-serif text-lg font-bold text-white">Communication Preferences (Consent &amp; Privacy)</h3>

          <div className="space-y-3 text-xs font-mono">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailOptIn}
                onChange={(e) => setEmailOptIn(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
              />
              <span className="text-slate-200">Email Notifications (Booking confirmations, itinerary updates, invoices)</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappOptIn}
                onChange={(e) => setWhatsappOptIn(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
              />
              <span className="text-slate-200">WhatsApp Concierge Updates (Dockside arrival alerts, VIP dining confirmation)</span>
            </label>
          </div>

          <button
            onClick={handleSavePreferences}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs shadow-md transition-transform hover:scale-105 cursor-pointer"
          >
            Save Security &amp; Preference Settings →
          </button>
        </div>
      </div>

    </div>
  );
}
