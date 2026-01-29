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

  const valueProps = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Licensed Global Partners',
      desc: 'Regulated platforms worldwide',
      iconBg: 'bg-[#15803d]',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      label: 'Rigorous Qualification',
      desc: 'AI + human oversight',
      iconBg: 'bg-[#0f172a]',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      label: 'Full Transparency',
      desc: 'Track every stage',
      iconBg: 'bg-[#15803d]',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      label: 'You Stay in Control',
      desc: 'Your asset, your terms',
      iconBg: 'bg-[#0f172a]',
    },
  ]

  return (
    <section id="how-it-works" className="py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0f172a] leading-tight tracking-tight">
            Three Simple Steps to Global Distribution
          </h2>
          <p className="mt-6 text-xl text-[#334155] leading-relaxed">
            From submission to distribution, we handle the complexity so you can focus on your assets.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-[#15803d]/40 via-[#0f172a]/20 to-[#15803d]/40" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="bg-white rounded-2xl p-8 lg:p-10 border border-[#e2e8f0] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-14 h-14 ${step.iconBg} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                      {step.icon}
                    </div>
                    <span className="text-6xl lg:text-7xl font-extrabold text-[#15803d]/20">{step.number}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-3">{step.title}</h3>
                  <p className="text-lg text-[#334155] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Value props */}
        <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((item) => (
            <div
              key={item.label}
              className="bg-[#f8fafc] rounded-2xl p-6 border border-[#e2e8f0] shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-14 h-14 ${item.iconBg} rounded-xl flex items-center justify-center text-white mb-5 shadow-md`}>
                {item.icon}
              </div>
              <div className="font-bold text-[#0f172a] text-lg mb-1">{item.label}</div>
              <div className="text-base text-[#64748b]">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
