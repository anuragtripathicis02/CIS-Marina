'use client';

import React, { useState } from 'react';
import { BusinessType, FleetSize } from '@yacht-platform/types';

interface LeadFormProps {
  sourceTag?: string;
  title?: string;
  subtitle?: string;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  sourceTag = 'website_demo_form',
  title = 'Book a Personalized Platform Demo',
  subtitle = 'Discover how NAUTICOS connects your charter bookings, fleet operations, crew, and marina management into one ecosystem.',
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    businessType: BusinessType.YACHT_CHARTER,
    country: 'United Arab Emirates',
    fleetSize: FleetSize.SIZE_6_20,
    locations: '1',
    currentSoftware: '',
    challenge: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      let response: Response;
      const payload = {
        ...formData,
        source: sourceTag,
      };

      try {
        // First try relative endpoint via Next.js proxy rewrite
        response = await fetch('/api/v1/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (firstErr) {
        // Fallback to direct backend API port 4000
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api/v1';
        response = await fetch(`${baseUrl}/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error?.message || 'Failed to submit request. Please verify your details.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xl">
        <div className="w-16 h-16 bg-teal-50 text-teal-600 border border-teal-200 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm">
          ✓
        </div>
        <h3 className="font-display text-2xl font-bold text-slate-900">Demo Request Received</h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          Thank you, <span className="text-teal-700 font-semibold">{formData.firstName}</span>. Our enterprise team is reviewing your operational details for <span className="text-slate-900 font-bold">{formData.company}</span> and will contact you shortly.
        </p>
        <div className="pt-4">
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-slate-500 hover:text-teal-700 underline font-semibold"
          >
            Submit another demo inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl">
      <div className="mb-6 text-left">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
          <span>🎯 Enterprise Sales & Demo</span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600 text-xs sm:text-sm mt-1.5">{subtitle}</p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
          <strong>Error:</strong> {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g. Alexander"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g. Vanderbilt"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Company & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization *</label>
            <input
              type="text"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Monaco Charter Fleet"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Business Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@company.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Business Type & Fleet Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Business Type *</label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
            >
              <option value={BusinessType.YACHT_CHARTER}>Yacht Charter Company</option>
              <option value={BusinessType.YACHT_OPERATOR}>Yacht Operator / Fleet Owner</option>
              <option value={BusinessType.YACHT_BROKER}>Yacht Broker</option>
              <option value={BusinessType.MARINA}>Marina Operator</option>
              <option value={BusinessType.YACHT_CLUB}>Yacht Club</option>
              <option value={BusinessType.LUXURY_EVENT}>Luxury Event Planning</option>
              <option value={BusinessType.OTHER}>Other Marine Business</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Fleet / Operation Size</label>
            <select
              name="fleetSize"
              value={formData.fleetSize}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
            >
              <option value={FleetSize.SIZE_1_5}>1 – 5 Vessels / Slips</option>
              <option value={FleetSize.SIZE_6_20}>6 – 20 Vessels / Slips</option>
              <option value={FleetSize.SIZE_21_50}>21 – 50 Vessels / Slips</option>
              <option value={FleetSize.SIZE_51_100}>51 – 100 Vessels / Slips</option>
              <option value={FleetSize.SIZE_100_PLUS}>100+ Enterprise Fleet</option>
            </select>
          </div>
        </div>

        {/* Country & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Country *</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
            >
              <option value="United Arab Emirates">United Arab Emirates (UAE)</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="India">India</option>
              <option value="European Union">European Union (France, Italy, Spain, Monaco)</option>
              <option value="Australia">Australia</option>
              <option value="Singapore">Singapore</option>
              <option value="Japan">Japan</option>
              <option value="Canada">Canada</option>
              <option value="Other">Other Region</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+971 50 123 4567"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Main Challenge / Message */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Operational Challenge / Request</label>
          <textarea
            name="challenge"
            rows={3}
            value={formData.challenge}
            onChange={handleChange}
            placeholder="e.g. Managing charter bookings, crew certificates, and double-booking conflicts across 12 yachts."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-600 focus:bg-white transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <span>Submitting Request...</span>
          ) : (
            <>
              <span>Request Custom Demo</span>
              <span>→</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-500 text-center pt-2">
          By submitting this form, you agree to receive platform demo scheduling communications from NAUTICOS.
        </p>
      </form>
    </div>
  );
};
