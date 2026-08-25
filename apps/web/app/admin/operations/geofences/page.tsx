'use client';

import React, { useEffect, useState } from 'react';

export default function GeofencesPage() {
  const [geofences, setGeofences] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [centerLat, setCenterLat] = useState('43.7374');
  const [centerLng, setCenterLng] = useState('7.4273');
  const [radiusMeters, setRadiusMeters] = useState('5000');

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/geofences')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setGeofences(json.data);
      })
      .catch(() => {});

    fetch('http://localhost:4000/api/v1/geofences/events')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setEvents(json.data);
      })
      .catch(() => {});
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res: Response;
      const body = JSON.stringify({
        yachtId: 'y1',
        name,
        description,
        shape: 'CIRCLE',
        centerLat: parseFloat(centerLat),
        centerLng: parseFloat(centerLng),
        radiusMeters: parseFloat(radiusMeters),
      });

      try {
        res = await fetch('/api/v1/geofences', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      } catch (err) {
        res = await fetch('http://localhost:4000/api/v1/geofences', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      }

      const json = await res.json();
      if (json.success && json.data) {
        setGeofences((prev) => [json.data, ...prev]);
        setName('');
        setDescription('');
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">GEOFENCING &amp; STATE ENGINE</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Vessel Operating Geofences</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Create Geofence Zone */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Create Circular Geofence Zone
          </h2>

          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Geofence Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Monaco Port Hercules Sanctuary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Description</label>
              <input
                type="text"
                placeholder="e.g. Restricted operating area boundary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Center Latitude</label>
                <input
                  type="number"
                  step="0.0001"
                  required
                  value={centerLat}
                  onChange={(e) => setCenterLat(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Center Longitude</label>
                <input
                  type="number"
                  step="0.0001"
                  required
                  value={centerLng}
                  onChange={(e) => setCenterLng(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Radius (Meters) *</label>
              <input
                type="number"
                required
                value={radiusMeters}
                onChange={(e) => setRadiusMeters(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              + Create Circular Geofence Zone →
            </button>
          </form>
        </div>

        {/* Right Active Geofences List & Events */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Active Organization Geofences ({geofences.length})
            </h3>

            <div className="space-y-3">
              {geofences.map((g) => (
                <div key={g.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900 text-sm">
                    <span>{g.name}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                      {g.shape} ({g.radiusMeters}m Radius)
                    </span>
                  </div>
                  <p className="text-slate-600">{g.description}</p>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Center: Lat {g.centerLat}, Lng {g.centerLng}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Geofence Entry &amp; Exit Event Log
            </h3>

            <div className="space-y-2">
              {events.map((ev) => (
                <div key={ev.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{ev.geofence?.name || 'Monaco Zone'}</span>
                    <div className="text-[10px] text-slate-400 font-mono">{new Date(ev.timestamp).toLocaleString()}</div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full font-mono font-bold text-[10px] uppercase ${
                      ev.eventType === 'ENTRY'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {ev.eventType} EVENT
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
