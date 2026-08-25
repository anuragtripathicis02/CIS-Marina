'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    passengerCount: 8,
    startTime: '2026-09-01T10:00:00.000Z',
    endTime: '2026-09-01T18:00:00.000Z',
    specialRequests: '',
  });

  const [selectedAddons, setSelectedAddons] = useState<string[]>(['catering']);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const addonsList = [
    { id: 'catering', name: 'Gourmet French Catering', price: 2500, category: 'CATERING' },
    { id: 'djs', name: 'Live DJ & Sound System', price: 1800, category: 'ENTERTAINMENT' },
    { id: 'jetski', name: 'Dual Sea-Doo Jet Skis', price: 1200, category: 'WATERSPORTS' },
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const basePrice = 18000;
  const addonsTotal = addonsList
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const subtotal = basePrice + addonsTotal;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;
  const deposit = total * 0.3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      // 1. Create Booking
      let bookingRes: Response;
      const bookingBody = JSON.stringify({
        yachtId: params.id || 'y1',
        startTime: form.startTime,
        endTime: form.endTime,
        passengerCount: form.passengerCount,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        specialRequests: form.specialRequests,
        addons: addonsList
          .filter((a) => selectedAddons.includes(a.id))
          .map((a) => ({
            name: a.name,
            category: a.category,
            unitPrice: a.price,
            quantity: 1,
          })),
      });

      try {
        bookingRes = await fetch('/api/v1/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: bookingBody,
        });
      } catch (e) {
        bookingRes = await fetch('http://localhost:4000/api/v1/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: bookingBody,
        });
      }

      const bookingJson = await bookingRes.json();

      if (!bookingRes.ok || !bookingJson.success) {
        throw new Error(bookingJson.error?.message || 'Selected dates are unavailable.');
      }

      const bookingId = bookingJson.data.id;

      // 2. Capture Deposit Payment
      let payRes: Response;
      const payBody = JSON.stringify({
        bookingId,
        amount: deposit,
      });

      try {
        payRes = await fetch('/api/v1/payments/intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payBody,
        });
      } catch (e) {
        payRes = await fetch('http://localhost:4000/api/v1/payments/intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payBody,
        });
      }

      const payJson = await payRes.json();

      if (!payRes.ok || !payJson.success) {
        throw new Error('Payment processing failed. Please verify card details.');
      }

      // Navigate to Confirmation
      router.push(`/charter/confirmation/${bookingId}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
          
          <div>
            <h1 className="font-display text-3xl font-bold text-slate-900">Charter Checkout & Experience Customizer</h1>
            <p className="text-slate-500 text-xs mt-1">Ocean Pearl 115 • Protected by Double-Booking Exclusion Lock</p>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
              <strong>Checkout Error:</strong> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Form & Addons */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Guest Information */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
                <h3 className="font-semibold text-slate-900 text-sm">Guest Contact Details</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 mb-1 font-medium">First Name *</label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      placeholder="Lord"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1 font-medium">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      placeholder="Sterling"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="sterling@luxury.com"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
                  />
                </div>
              </div>

              {/* Addons Selection */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
                <h3 className="font-semibold text-slate-900 text-sm">Select Experience Add-On Services</h3>
                <div className="space-y-2">
                  {addonsList.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <button
                        type="button"
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isSelected ? 'bg-teal-50 border-teal-500 text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-teal-600 text-white font-bold' : ''}`}>
                            {isSelected ? '✓' : ''}
                          </span>
                          <span>{addon.name}</span>
                        </div>
                        <span className="font-mono font-bold text-teal-700">+${addon.price.toLocaleString()}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Card Simulation */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 text-sm">Stripe Payment Element</h3>
                  <span className="text-[10px] text-teal-700 font-mono font-bold">TLS 1.3 SECURE</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-mono">
                  •••• •••• •••• 4242 (Stripe Test Card Pre-configured)
                </div>
              </div>

            </div>

            {/* Right Column: Price Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-teal-200 shadow-xl space-y-4 text-xs">
                <h3 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Charter Price Breakdown
                </h3>

                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between">
                    <span>Ocean Pearl 115 Base Charter</span>
                    <span className="font-mono">${basePrice.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Experience Add-ons ({selectedAddons.length})</span>
                    <span className="font-mono">+${addonsTotal.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT / Marine Tax (5%)</span>
                    <span className="font-mono">${tax.toLocaleString()}.00</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-slate-900 text-base font-bold">
                  <span>Grand Total</span>
                  <span className="font-mono text-teal-700">${total.toLocaleString()}.00</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-[11px] text-slate-500">30% Deposit Due Now to Confirm</div>
                  <div className="text-xl font-mono font-bold text-emerald-600">${deposit.toLocaleString()}.00</div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md cursor-pointer transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing Deposit...' : `Pay $${deposit.toLocaleString()} Deposit via Stripe →`}
                </button>
              </div>
            </div>

          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}
