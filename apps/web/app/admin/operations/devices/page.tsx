'use client';

import React, { useEffect, useState } from 'react';

export default function DevicesPage() {
  const [devices, setDevices] = useState<any[]>([]);
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('GPS');
  const [manufacturer, setManufacturer] = useState('Teltonika Marine');
  const [model, setModel] = useState('FMB204-GPS');
  const [newCredentials, setNewCredentials] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/devices')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setDevices(json.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res: Response;
      const body = JSON.stringify({
        yachtId: 'y1',
        deviceName,
        deviceType,
        manufacturer,
        model,
      });

      try {
        res = await fetch('/api/v1/devices/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
      } catch (err) {
        res = await fetch('http://localhost:4000/api/v1/devices/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
      }

      const json = await res.json();
      if (json.success && json.data) {
        setNewCredentials(json.data.credentials);
        setDevices((prev) => [json.data.device, ...prev]);
        setDeviceName('');
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">DEVICE MANAGEMENT &amp; SECURITY</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Vessel IoT Devices &amp; Credentials</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Register Device */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Register New Vessel Device / Gateway
          </h2>

          {newCredentials && (
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-slate-900 text-xs space-y-2 font-mono">
              <div className="font-bold text-teal-800">🔑 DEVICE CREDENTIALS GENERATED:</div>
              <div>Device ID: <span className="font-bold">{newCredentials.deviceId}</span></div>
              <div className="break-all bg-white p-2 rounded border border-teal-300 font-bold text-teal-900">
                Secret Token: {newCredentials.secretKey}
              </div>
              <div className="text-[10px] text-teal-700">Save this secret key now. It will never be displayed again.</div>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Device Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ocean Pearl GPS Gateway"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Device Type *</label>
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
              >
                <option value="GPS">GPS Telematics Gateway</option>
                <option value="ENGINE">CANBus Engine Monitor</option>
                <option value="FUEL">Fuel Tank Sensor</option>
                <option value="BATTERY">Battery Bank Monitor</option>
                <option value="BILGE">Bilge Water Level Switch</option>
                <option value="TEMPERATURE">Temperature Sensor</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Manufacturer</label>
                <input
                  type="text"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Model</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              + Register Device &amp; Generate Credentials →
            </button>
          </form>
        </div>

        {/* Right Table: Registered Devices List */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 text-sm">Active Fleet Devices Inventory</h3>
            <span className="text-xs text-slate-500">{devices.length} Devices</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                  <th className="p-4">Device</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Assigned Yacht</th>
                  <th className="p-4">Last Seen</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {devices.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/60">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm">{d.deviceName}</div>
                      <div className="text-slate-400 font-mono text-[10px]">{d.manufacturer} • {d.model}</div>
                    </td>
                    <td className="p-4 font-mono font-bold text-teal-700">{d.deviceType}</td>
                    <td className="p-4 text-slate-800 font-semibold">{d.yacht?.name || 'Ocean Pearl 115'}</td>
                    <td className="p-4 font-mono text-slate-600 text-[11px]">
                      {d.lastSeenAt ? new Date(d.lastSeenAt).toLocaleTimeString() : '12 sec ago'}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono font-bold text-[10px]">
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
