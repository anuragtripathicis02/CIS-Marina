import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { SmartOperationsSection } from '@/components/home/SmartOperationsSection';
import { ProblemSection } from '@/components/home/ProblemSection';
import { EcosystemVisualization } from '@/components/home/EcosystemVisualization';
import { LeadForm } from '@/components/forms/LeadForm';

export const metadata = {
  title: 'CIS-Marina — Smart Yacht & Marina Management Platform',
  description: 'Real-time marina utilities monitoring, dockside pedestals, berth management, charter bookings, and connected IoT solutions.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <SmartOperationsSection />
        <ProblemSection />
        <EcosystemVisualization />

        {/* Lead Demo Form Section */}
        <section className="py-20 bg-slate-100 text-slate-800 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <LeadForm
              sourceTag="homepage_lead_form"
              title="Book a Personalized Platform Demo"
              subtitle="Discover how CIS-Marina connects your charter bookings, fleet operations, crew, and marina management into one ecosystem."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
