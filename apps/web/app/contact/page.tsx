import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LeadForm } from '@/components/forms/LeadForm';

export const metadata = {
  title: 'Contact Expert Team — NAUTICOS',
  description: 'Speak to a Smart Marina Utility & Yacht Operations Expert.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">SPEAK TO AN EXPERT</span>
            <h1 className="font-display text-4xl font-bold text-slate-900">Get in Touch With Our Team</h1>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Whether you operate a yacht charter fleet, marina, shipyard, or yacht club, our specialists are ready to assist.
            </p>
          </div>

          <div className="bg-slate-100 border border-slate-200 text-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <LeadForm
              sourceTag="contact_page_form"
              title="Speak to a Smart Marina Expert"
              subtitle="Submit your operational inquiry below for a prompt response from our technical team."
            />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
