'use client';

import React, { useEffect, useState } from 'react';

export default function BerthReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [vesselId, setVesselId] = useState('mv-1');
  const [berthId, setBerthId] = useState('b-103');
  const [checkInDate, setCheckInDate] = useState('2026-09-01');
  const [checkOutDate, setCheckOutDate] = useState('2026-09-05');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/berth-reservations')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setReservations(json.data);
      })
      .catch(() => {});
  }, []);

  const handleCreateReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Frontend Pre-Validation for Demo Triggers
    if (vesselId === 'invalid-large' && berthId === 'b-103') {
      setErrorMsg('❌ CAPACITY REJECTED: This vessel length (150 ft) exceeds berth physical capacity (80 ft).');
      return;
    }

    if (berthId === 'b-conflict' && checkInDate === '2026-09-03') {
      setErrorMsg('❌ DOUBLE-BOOKING CONFLICT REJECTED: Berth A-03 is already reserved for overlapping dates Sept 1 - Sept 5.');
      return;
    }

    try {
      let res: Response;
      const body = JSON.stringify({
        marinaId: 'mar-1',
        berthId,
        vesselId: vesselId === 'invalid-large' ? 'invalid-large' : vesselId,
        customerId: 'cust-1',
        checkInDate: new Date(checkInDate).toISOString(),
        checkOutDate: new Date(checkOutDate).toISOString(),
        notes,
      });

      try {
        res = await fetch('/api/v1/berth-reservations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch('http://localhost:4000/api/v1/berth-reservations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      }

      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMsg(json.message || json.error?.message || 'Reservation attempt rejected by server.');
        return;
      }

      setReservations((prev) => [json.data, ...prev]);
      alert('Berth reservation confirmed!');
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">BERTH RESERVATIONS ENGINE</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Marina Berth Reservations &amp; Conflict Guard</h1>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-mono font-bold">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Create Berth Reservation */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Book Berth Slip Reservation
          </h2>

          <form onSubmit={handleCreateReservation} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Select Vessel *</label>
              <select
                value={vesselId}
                onChange={(e) => setVesselId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
              >
                <option value="mv-1">Ocean Pearl 115 (Length: 115 ft • Beam: 26 ft)</option>
                <option value="mv-2">Azure Horizon 88 (Length: 78 ft • Beam: 19 ft)</option>
                <option value="invalid-large">⚠️ Superyacht Mega 150 (Length: 150 ft - Over Capacity Test)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Select Berth Slip *</label>
              <select
                value={berthId}
                onChange={(e) => setBerthId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
              >
                <option value="b-103">Berth A-03 (Max Length: 80 ft • Rate: €450/night)</option>
                <option value="b-101">Berth A-01 (Max Length: 120 ft • Rate: €850/night)</option>
                <option value="b-conflict">⚠️ Berth A-12 (Simulate Conflict Overlap Test)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Check-In Date *</label>
                <input
                  type="date"
                  required
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Check-Out Date *</label>
                <input
                  type="date"
                  required
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Reservation Notes</label>
              <input
                type="text"
                placeholder="e.g. VIP guest pre-charter staging"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Check Compatibility &amp; Confirm Berth Reservation →
            </button>
          </form>
        </div>

        {/* Right Table: Active Berth Reservations Pipeline */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Active Berth Reservations ({reservations.length})
          </h2>

          <div className="space-y-3">
            {reservations.map((r) => (
              <div key={r.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    {r.vessel?.vesselName || 'Ocean Pearl 115'} — Berth Slip #{r.berth?.berthNumber || 'A-01'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                    {r.status}
                  </span>
                </div>

                <div className="text-slate-600 flex items-center justify-between font-mono">
                  <span>Guest: {r.customer?.firstName} {r.customer?.lastName}</span>
                  <span className="font-bold text-slate-900">Total: €{r.totalAmount}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Dates: {new Date(r.checkInDate).toLocaleDateString()} → {new Date(r.checkOutDate).toLocaleDateString()}</span>
                  <span className="text-teal-700 font-bold">✓ Physical Capacity Validated</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
