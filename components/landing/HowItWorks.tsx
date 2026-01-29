export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Submit Your Asset',
      description: 'Fill out our simple form with details about your asset. Our intuitive interface makes it easy to provide all necessary information.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Expert Review',
      description: 'Our team of qualified professionals analyzes your asset using industry-standard methodologies within 48 hours.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Get Results',
      description: 'Receive a comprehensive qualification report with score, grade, and actionable insights to move forward.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
            Unleash the power of asset qualification
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Built for speed, trust, and transparency—our platform connects you with seamless, secure asset qualification anytime.
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

        {/* Feature highlights */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '💰', label: 'Low Cost', desc: 'Competitive pricing' },
            { icon: '⚡', label: 'Fast Process', desc: '48-hour turnaround' },
            { icon: '🔒', label: 'Secure', desc: 'Bank-level security' },
            { icon: '📊', label: 'Transparent', desc: 'Real-time tracking' },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-4 bg-white rounded-xl p-4 border border-gray-100">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-semibold text-gray-900">{item.label}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
