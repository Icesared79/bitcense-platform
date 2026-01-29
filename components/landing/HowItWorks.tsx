export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Submit',
      description: 'Tell us about your asset. Simple form, takes 2 minutes.',
    },
    {
      number: '02',
      title: 'Qualify',
      description: 'We analyze, score, and package your asset for distribution.',
    },
    {
      number: '03',
      title: 'Distribute',
      description: 'Access global retail investors through our licensed partners.',
    },
  ]

  return (
    <section id="how-it-works" className="py-40 lg:py-48 px-4 sm:px-6 lg:px-8 bg-white relative">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0f172a] leading-tight tracking-tight">
            Three Simple Steps
          </h2>
          <p className="mt-6 text-xl text-[#334155] leading-relaxed">
            From submission to global distribution.
          </p>
        </div>

        {/* Steps - Connected Flow */}
        <div className="relative">
          {/* Desktop: Horizontal layout */}
          <div className="hidden lg:flex items-start justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-start flex-1">
                {/* Step content */}
                <div className="flex flex-col items-center text-center flex-1">
                  {/* Number circle */}
                  <div className="w-20 h-20 rounded-full bg-[#15803d] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#15803d]/25 relative z-10">
                    {step.number}
                  </div>

                  {/* Title and description */}
                  <h3 className="text-2xl font-bold text-[#0f172a] mt-6 mb-3">{step.title}</h3>
                  <p className="text-base text-[#64748b] leading-relaxed max-w-[200px]">{step.description}</p>
                </div>

                {/* Connector arrow (not on last item) */}
                {index < steps.length - 1 && (
                  <div className="flex items-center mt-10 -mx-4">
                    <div className="w-16 h-0.5 bg-[#fde047]" />
                    <svg className="w-5 h-5 text-[#fde047] -ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: Vertical layout with connecting line */}
          <div className="lg:hidden relative">
            {/* Vertical connecting line */}
            <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-[#fde047]" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-start gap-6">
                  {/* Number circle */}
                  <div className="w-20 h-20 rounded-full bg-[#15803d] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#15803d]/25 relative z-10 flex-shrink-0">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="pt-4">
                    <h3 className="text-xl font-bold text-[#0f172a] mb-2">{step.title}</h3>
                    <p className="text-base text-[#64748b] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
