export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Submit',
      description: 'Tell us about your asset. Simple form, takes 2 minutes.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Qualify',
      description: 'We analyze, score, and package your asset for distribution.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Distribute',
      description: 'Access global retail investors through our licensed partners.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="text-[#4A7C59] font-semibold text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Three simple steps to global distribution
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From submission to distribution, we handle the complexity so you can focus on your assets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="group">
              <div className="bg-white rounded-2xl p-8 h-full border border-gray-100 hover:border-[#4A7C59]/20 hover:shadow-xl hover:shadow-[#4A7C59]/5 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-[#4A7C59]/10 rounded-xl flex items-center justify-center text-[#4A7C59] group-hover:bg-[#4A7C59] group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-bold text-gray-100 group-hover:text-[#4A7C59]/20 transition-colors">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Value props */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              label: 'Licensed Global Partners',
              desc: 'Regulated platforms'
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              label: 'Rigorous Qualification',
              desc: 'AI + human oversight'
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ),
              label: 'Full Transparency',
              desc: 'Track every stage'
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
              label: 'You Stay in Control',
              desc: 'Your terms'
            },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-4 bg-white rounded-xl p-4 border border-gray-100">
              <div className="w-10 h-10 bg-[#4A7C59]/10 rounded-lg flex items-center justify-center text-[#4A7C59]">
                {item.icon}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
