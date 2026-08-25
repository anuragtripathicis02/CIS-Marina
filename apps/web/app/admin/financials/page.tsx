'use client';

import React, { useEffect, useState } from 'react';

export default function AdminFinancialsPage() {
  const [payments, setPayments] = useState<any[]>([
    {
      id: 'p1',
      paymentReference: 'PAY-98214',
      provider: 'STRIPE',
      amount: 24500.00,
      currency: 'USD',
      status: 'CAPTURED',
      paymentMethod: 'credit_card',
      createdAt: new Date().toISOString(),
      booking: { bookingReference: 'BK-8821', customer: { firstName: 'Lord', lastName: 'Sterling' } },
    },
  ]);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        let res = await fetch('/api/v1/payments');
        if (!res.ok) res = await fetch('http://localhost:4000/api/v1/payments');
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setPayments(json.data);
        }
      } catch (err) {}
    };

    loadPayments();
  }, []);

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800">Financial Transactions & Invoice Ledger</h1>
          <p className="text-slate-500 text-xs mt-0.5">Multi-currency Stripe payment captures, deposits, and invoice records</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                <th className="p-4">Payment Ref</th>
                <th className="p-4">Booking Ref</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Gateway</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60">
                  <td className="p-4 font-mono font-bold text-teal-700">#{p.paymentReference}</td>
                  <td className="p-4 font-mono text-slate-800">#{p.booking?.bookingReference || 'BK-8821'}</td>
                  <td className="p-4 text-slate-600">
                    {p.booking?.customer?.firstName} {p.booking?.customer?.lastName}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-teal-700 font-bold">
                      {p.provider} ({p.paymentMethod || 'Card'})
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-800">${Number(p.amount).toLocaleString()}.00</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[10px]">
                      {p.status}
                    </span>
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
