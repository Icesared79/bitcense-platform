export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Submit',
      description: 'Tell us about your asset. Simple form, takes 2 minutes.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      iconBg: 'bg-[#15803d]',
    },
    {
      number: '02',
      title: 'Qualify',
      description: 'We analyze, score, and package your asset for distribution.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      iconBg: 'bg-[#0f172a]',
    },
    {
      number: '03',
      title: 'Distribute',
      description: 'Access global retail investors through our licensed partners.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: 'bg-[#15803d]',
    },
  ]

  return (
    <section id="how-it-works" className="py-40 lg:py-48 px-4 sm:px-6 lg:px-8 bg-white relative">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0f172a] leading-tight tracking-tight">
            Three Simple Steps to Global Distribution
          </h2>
          <p className="mt-6 text-xl text-[#334155] leading-relaxed">
            From submission to distribution, we handle the complexity so you can focus on your assets.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - yellow accent */}
          <div className="hidden lg:block absolute top-[60px] left-[20%] right-[20%] h-1 bg-gradient-to-r from-[#fde047] via-[#fef08a] to-[#fde047] rounded-full" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative group">
                <div className="bg-white rounded-2xl p-8 lg:p-10 border border-[#e2e8f0] shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-14 h-14 ${step.iconBg} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                      {step.icon}
                    </div>
                    <span className="text-6xl lg:text-7xl font-extrabold text-[#15803d]">{step.number}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-3">{step.title}</h3>
                  <p className="text-lg text-[#334155] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
