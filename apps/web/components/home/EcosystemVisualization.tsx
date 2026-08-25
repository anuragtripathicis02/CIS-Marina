'use client';

import React from 'react';

export const EcosystemVisualization: React.FC = () => {
  const capabilities = [
    {
      title: 'Smart Marina Security',
      icon: '🛡️',
      description:
        'Busy marinas face constant security risks. Our IoT solution offers motion detection, live tracking, geofencing, theft, incursion, and tamper alerts to help safeguard people, vessels, and valuable assets.',
    },
    {
      title: 'Vessel Monitoring',
      icon: '🚤',
      description:
        'Deliver peace of mind to your berth holders with real-time alerts for fire, theft, incursion, electrical interruptions, water/bilge levels, humidity, and more.',
    },
    {
      title: 'Marina Berth Monitoring',
      icon: '⚓',
      description:
        'Monitor berth occupancy remotely with accurate, real-time updates to support planning, optimise usage, and enhance the customer experience.',
    },
    {
      title: 'Compliance Monitoring',
      icon: '📋',
      description:
        'Streamline compliance from one platform with automated legionella flushing, fire and safety station monitoring, air quality monitoring, and regulatory reporting.',
    },
    {
      title: 'Water Management',
      icon: '💧',
      description:
        'Monitor real-time water levels in locks or other critical areas to support efficient waterway operations and improve overall site safety and compliance.',
    },
  ];

  return (
    <section className="py-20 bg-slate-100 border-t border-slate-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Smart Marina Monitoring: Powering Modern Marinas Into The Future
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Our complete IoT solution enables monitoring and control across your site on one platform.
            Monitor your whole site with Orion, The Real-Time Data Network™ and become a Digitally Transformed™ marina.
          </p>
        </div>

        {/* 5-Column Grid (Matching Reference Image 5) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-left">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 flex flex-col justify-between hover:shadow-xl hover:border-teal-500/40 transition-all space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-teal-600 flex items-center justify-center text-2xl font-bold">
                {item.icon}
              </div>

              <div className="space-y-2 flex-1">
                <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
