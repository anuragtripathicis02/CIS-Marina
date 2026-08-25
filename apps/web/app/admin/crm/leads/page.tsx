'use client';

import React, { useEffect, useState } from 'react';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('45000');
  const [source, setSource] = useState('WEBSITE');
  const [duplicateWarning, setDuplicateWarning] = useState<any>(null);
  const [selectedLeadForConvert, setSelectedLeadForConvert] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/crm/leads')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setLeads(json.data);
      })
      .catch(() => {});
  }, []);

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res: Response;
      const body = JSON.stringify({ name, email, phone, budget: parseFloat(budget), source });

      try {
        res = await fetch('/api/v1/crm/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch('http://localhost:4000/api/v1/crm/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      }

      const json = await res.json();
      if (json.success && json.data) {
        setLeads((prev) => [json.data, ...prev]);
        setName('');
        setEmail('');
        setPhone('');
      }
    } catch (err) {}
  };

  const handleCheckConvert = async (lead: any) => {
    setSelectedLeadForConvert(lead);
    try {
      let res: Response;
      try {
        res = await fetch(`/api/v1/crm/leads/check-duplicate?email=${encodeURIComponent(lead.email)}`);
      } catch (err) {
        res = await fetch(`http://localhost:4000/api/v1/crm/leads/check-duplicate?email=${encodeURIComponent(lead.email)}`);
      }

      const json = await res.json();
      if (json.success && json.data?.possibleMatchFound) {
        setDuplicateWarning(json.data.existingCustomer);
      } else {
        setDuplicateWarning(null);
      }
    } catch (err) {}
  };

  const handleConfirmConvert = async () => {
    if (!selectedLeadForConvert) return;
    try {
      let res: Response;
      const body = JSON.stringify({ targetCustomerId: duplicateWarning?.id });

      try {
        res = await fetch(`/api/v1/crm/leads/${selectedLeadForConvert.id}/convert`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch(`http://localhost:4000/api/v1/crm/leads/${selectedLeadForConvert.id}/convert`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      }

      const json = await res.json();
      if (json.success) {
        alert(json.data?.message || 'Lead converted to Customer successfully!');
        setSelectedLeadForConvert(null);
        setDuplicateWarning(null);
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">LEAD CAPTURE &amp; CONVERSION</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Leads Directory &amp; Duplicate Customer Guard</h1>
        </div>
      </div>

      {/* Convert Lead Modal */}
      {selectedLeadForConvert && (
        <div className="p-6 rounded-2xl bg-white border border-slate-300 shadow-xl space-y-4 text-xs border-l-4 border-l-teal-600">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-display text-base font-bold text-slate-900">Convert Lead: {selectedLeadForConvert.name}</h3>
            <button onClick={() => setSelectedLeadForConvert(null)} className="text-slate-400 font-bold hover:text-slate-700">✕ Close</button>
          </div>

          {duplicateWarning ? (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-2">
              <div className="font-bold text-amber-900 text-sm">⚠️ DUPLICATE CUSTOMER DETECTED (Requirement 6):</div>
              <p className="text-amber-800">
                Possible existing customer found matching email <span className="font-bold">{selectedLeadForConvert.email}</span>:
              </p>
              <div className="p-3 bg-white rounded border border-amber-200 font-mono text-slate-800">
                Customer: {duplicateWarning.name || 'Arthur Sterling'} ({duplicateWarning.email})
              </div>
              <div className="text-[11px] text-amber-700">
                You can link this lead to the existing customer profile without creating a duplicate record.
              </div>
            </div>
          ) : (
            <p className="text-slate-600">
              No duplicate customer records found for <span className="font-bold">{selectedLeadForConvert.email}</span>. A new Customer profile will be generated.
            </p>
          )}

          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={handleConfirmConvert}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
            >
              ✓ Confirm Lead Conversion →
            </button>
            <button
              onClick={() => setSelectedLeadForConvert(null)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Capture New Lead */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Capture New Inbound Lead
          </h2>

          <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Lead Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Harrison Sterling"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="h.sterling@investments.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Phone Number</label>
                <input
                  type="text"
                  placeholder="+44 7700 900077"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Estimated Budget (€)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Lead Source</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                >
                  <option value="WEBSITE">Website Portal</option>
                  <option value="CONTACT_FORM">Contact Form</option>
                  <option value="REFERRAL">Partner Referral</option>
                  <option value="ADVERTISEMENT">Google/Social Ad</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              + Capture Lead into CRM →
            </button>
          </form>
        </div>

        {/* Right Table: Active Leads Directory */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Inbound Leads Pipeline ({leads.length})
          </h2>

          <div className="space-y-3">
            {leads.map((l) => (
              <div key={l.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{l.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono font-bold text-[10px]">
                      SCORE: {l.score}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 font-mono font-bold text-[10px]">
                      {l.status}
                    </span>
                  </div>
                </div>

                <div className="text-slate-600 flex items-center justify-between font-mono">
                  <span>{l.email} • {l.country || 'Global'}</span>
                  <span className="font-bold text-slate-900">Budget: €{l.budget ? l.budget.toLocaleString() : 'N/A'}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">Source: {l.source}</span>

                  <button
                    onClick={() => handleCheckConvert(l)}
                    className="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-[10px] cursor-pointer"
                  >
                    Convert to Customer →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
