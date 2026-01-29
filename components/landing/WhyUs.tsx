'use client'

import { useFadeIn } from '@/hooks/useFadeIn'

export function WhyUs() {
  const { ref, isVisible } = useFadeIn(0.1)
  const features = [
    {
      title: 'Licensed Global Partners',
      description: 'We work with regulated distribution platforms, not crypto exchanges. Your assets reach qualified investors through compliant channels.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: 'bg-[#15803d]',
      iconRing: 'ring-2 ring-[#fde047]/40',
    },
    {
      title: 'Rigorous Qualification',
      description: 'AI-powered scoring with human oversight ensures quality. Every asset goes through our comprehensive qualification process.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      iconBg: 'bg-[#0f172a]',
      iconRing: '',
    },
    {
      title: 'Full Transparency',
      description: 'Track your asset through every stage of the process. Real-time updates and clear communication at every step.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      iconBg: 'bg-[#0f172a]',
      iconRing: '',
    },
    {
      title: 'You Stay in Control',
      description: 'Your asset, your terms, our distribution network. We facilitate connections while you maintain ownership and control.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      iconBg: 'bg-[#15803d]',
      iconRing: 'ring-2 ring-[#fde047]/40',
    },
  ]

  return (
    <section id="features" className="py-40 lg:py-48 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] relative">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent" />

      <div ref={ref} className={`max-w-7xl mx-auto relative fade-in-section ${isVisible ? 'visible' : ''}`}>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0f172a] leading-tight tracking-tight">
            Why BitCense
          </h2>
          <p className="mt-6 text-xl text-[#334155] leading-relaxed">
            We bridge the gap between alternative assets and global retail investors through licensed, regulated channels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-8 lg:p-10 border border-[#e2e8f0] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 ${feature.iconBg} ${feature.iconRing} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#0f172a] mb-4">{feature.title}</h3>
              <p className="text-lg text-[#334155] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
