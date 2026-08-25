'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CrewManagementPage() {
  const [crew, setCrew] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/crew')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setCrew(json.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">CREW MANAGEMENT &amp; COMPLIANCE</span>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-0.5">Crew Profiles &amp; Certifications</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/operations/crew/schedule"
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
          >
            Crew Schedule Calendar →
          </Link>
        </div>
      </div>

      {/* Crew Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-800">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-6">Crew Member</th>
                <th className="py-3.5 px-6">Role</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Certifications</th>
                <th className="py-3.5 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              {crew.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">{member.firstName} {member.lastName}</div>
                    <div className="text-slate-500 text-[11px]">{member.email} • {member.phone}</div>
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-slate-700">{member.role}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                        member.status === 'AVAILABLE'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : member.status === 'ASSIGNED'
                          ? 'bg-teal-100 text-teal-800 border border-teal-300'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      {member.certifications?.map((c: any) => (
                        <div key={c.id} className="flex items-center space-x-2 text-[11px]">
                          <span className="font-semibold text-slate-800">{c.name}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                              c.status === 'VALID'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : c.status === 'EXPIRING_SOON'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                            }`}
                          >
                            {c.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-teal-700 font-bold hover:underline cursor-pointer">
                      View Profile &amp; Licenses
                    </button>
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
