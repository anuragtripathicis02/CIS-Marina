'use client';

import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
  category: 'Platform' | 'Multi-Tenancy' | 'IoT Roadmap' | 'Payments';
}

export const FaqSection = () => {
  const faqs: FaqItem[] = [
    {
      question: 'What is NAUTICOS?',
      answer: 'NAUTICOS is a B2B SaaS operating system built for global yacht charter operators, fleet owners, marina managers, yacht clubs, and luxury concierge businesses. It unifies bookings, customer CRM, crew rostering, marina slip allocation, and vessel telemetry into one connected platform.',
      category: 'Platform',
    },
    {
      question: 'How does NAUTICOS prevent double bookings?',
      answer: 'Double booking protection is enforced directly at the PostgreSQL database kernel level using btree_gist Exclusion Constraints and pessimistic transaction locks. Two customers can never successfully confirm overlapping charter reservations on the same yacht.',
      category: 'Platform',
    },
    {
      question: 'Is multi-tenancy isolated and secure?',
      answer: 'Yes. NAUTICOS uses a defense-in-depth isolation architecture combining NestJS JWT guards, Node AsyncLocalStorage request context, and PostgreSQL Row Level Security (RLS) policies. Every database query automatically restricts data access to the authenticated user\'s organization_id.',
      category: 'Multi-Tenancy',
    },
    {
      question: 'Can NAUTICOS handle multiple currencies and timezones?',
      answer: 'Yes. All financial values are stored using PostgreSQL NUMERIC(14,2) with explicit ISO 4217 currency codes (USD, EUR, AED, GBP, INR, AUD, SGD, JPY). All database timestamps are stored in UTC, and rendered in local user timezone on frontends.',
      category: 'Payments',
    },
    {
      question: 'Does the platform support IoT vessel monitoring?',
      answer: 'Vessel IoT telemetry (GPS geofencing, engine RPM, battery voltage, fuel monitoring, high bilge alerts) is part of our Phase 3 Smart Operations roadmap. High-frequency sensor streams will be ingested into a dedicated TimescaleDB hypertable extension.',
      category: 'IoT Roadmap',
    },
    {
      question: 'Which payment gateways are supported?',
      answer: 'Phase 1 includes built-in Stripe payment adapter supporting credit cards, Apple Pay, SEPA, and wire transfers. The PaymentService architecture uses an adapter pattern so regional payment gateways (Razorpay, Adyen) can be added cleanly.',
      category: 'Payments',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-navy-950 text-white border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>❓ Frequently Asked Questions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Clear Answers for Enterprise Operators
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            Understand how our platform architecture, security, multi-currency engine, and roadmap deliver enterprise credibility.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-navy-900 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between space-x-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center space-x-3">
                    <span className="px-2.5 py-0.5 rounded bg-navy-950 border border-slate-700 text-[10px] font-mono text-gold-500">
                      {faq.category}
                    </span>
                    <span className="font-display text-lg font-bold text-white">{faq.question}</span>
                  </div>
                  <span className="text-gold-500 font-bold text-xl">{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
