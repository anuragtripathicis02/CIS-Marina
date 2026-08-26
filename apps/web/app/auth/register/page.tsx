'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let res: Response;
      try {
        res = await fetch('/api/v1/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } catch (e) {
        res = await fetch('http://localhost:4000/api/v1/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Registration failed.');
      }

      // Successful registration -> Navigate to Onboarding Wizard
      router.push('/auth/onboarding');
    } catch (err: any) {
      setError(err.message || 'Registration error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center p-4 font-sans">
      <div className="relative max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 space-y-6 text-left shadow-xl">
        <Link href="/" aria-label="Close and return home" className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
          ×
        </Link>
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block mb-4" aria-label="CIS-Marina home">
            <div className="flex flex-col">
              <span className="font-display text-3xl font-bold text-black tracking-tight leading-none">CIS-<span className="text-amber-400">Marina</span></span><span className="text-[12px] font-mono text-slate-400 font-semibold tracking-wider uppercase mt-0.5">We make IT possible!</span>
            </div>
          </Link>
          <h1 className="text-xl font-bold text-slate-900">Create Owner Account</h1>
          <p className="text-xs text-slate-500">Step 1 of 2: Create user credentials for organization setup</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 mb-1 font-medium">First Name *</label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                placeholder="Alexander"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1 font-medium">Last Name *</label>
              <input
                type="text"
                required
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="Vanderbilt"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-teal-500 outline-none"
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
              placeholder="alex@monacoyachts.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1 font-medium">Password *</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-teal-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-md cursor-pointer transition-colors"
          >
            {loading ? 'Creating Account...' : 'Continue to Organization Setup →'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Already registered?{' '}
          <Link href="/auth/login" className="text-teal-700 font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
