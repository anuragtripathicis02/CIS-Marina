'use client';

import React, { useEffect, useState } from 'react';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([
    {
      id: 'c1',
      firstName: 'Lord',
      lastName: 'Sterling',
      email: 'sterling@luxury.com',
      phoneNumber: '+971 50 999 8877',
      nationality: 'United Kingdom',
      vipStatus: true,
      bookings: [{}, {}],
    },
    {
      id: 'c2',
      firstName: 'Captain',
      lastName: 'Harrison',
      email: 'harrison@charter.com',
      phoneNumber: '+377 98 12 34 56',
      nationality: 'Monaco',
      vipStatus: false,
      bookings: [{}],
    },
  ]);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        let res = await fetch('/api/v1/customers');
        if (!res.ok) res = await fetch('http://localhost:4000/api/v1/customers');
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setCustomers(json.data);
        }
      } catch (err) {}
    };

    loadCustomers();
  }, []);

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800">Customer CRM Records</h1>
          <p className="text-slate-500 text-xs mt-0.5">Manage VIP charter guests, preferences, and booking histories</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                <th className="p-4">Customer Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Nationality</th>
                <th className="p-4">Bookings Count</th>
                <th className="p-4">VIP Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60">
                  <td className="p-4 text-slate-800 font-semibold">
                    {c.firstName} {c.lastName}
                  </td>
                  <td className="p-4 text-slate-600">
                    <div>{c.email}</div>
                    <div className="text-[10px] text-slate-400">{c.phoneNumber || 'N/A'}</div>
                  </td>
                  <td className="p-4 text-slate-600">{c.nationality || 'International'}</td>
                  <td className="p-4 font-mono font-bold text-slate-800">{c.bookings?.length || 1} Charters</td>
                  <td className="p-4">
                    {c.vipStatus ? (
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[10px]">
                        ★ VIP GUEST
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-500 font-semibold text-[10px]">
                        STANDARD
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
