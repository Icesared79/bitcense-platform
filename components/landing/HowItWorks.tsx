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

      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0f172a] leading-tight tracking-tight">
            Three Simple Steps
          </h2>
          <p className="mt-6 text-xl text-[#334155] leading-relaxed">
            From submission to global distribution.
          </p>
        </div>

        {/* Desktop: Horizontal layout */}
        <div className="hidden lg:block">
          {/* Steps row with circles and arrows */}
          <div className="flex items-center justify-center mb-10">
            {/* Step 1 circle */}
            <div className="w-20 h-20 rounded-full bg-[#15803d] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#15803d]/25 flex-shrink-0">
              01
            </div>

            {/* Arrow 1 */}
            <div className="flex items-center mx-6">
              <div className="w-20 h-0.5 bg-[#fde047]" />
              <svg className="w-4 h-4 text-[#fde047] -ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Step 2 circle */}
            <div className="w-20 h-20 rounded-full bg-[#15803d] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#15803d]/25 flex-shrink-0">
              02
            </div>

            {/* Arrow 2 */}
            <div className="flex items-center mx-6">
              <div className="w-20 h-0.5 bg-[#fde047]" />
              <svg className="w-4 h-4 text-[#fde047] -ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Step 3 circle */}
            <div className="w-20 h-20 rounded-full bg-[#15803d] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#15803d]/25 flex-shrink-0">
              03
            </div>
          </div>

          {/* Labels row */}
          <div className="flex justify-center">
            <div className="w-20 text-center mx-[62px] first:ml-0 last:mr-0">
              <h3 className="text-xl font-bold text-[#0f172a] mb-2">{steps[0].title}</h3>
              <p className="text-sm text-[#64748b] leading-relaxed">{steps[0].description}</p>
            </div>
            <div className="w-20 text-center mx-[62px]">
              <h3 className="text-xl font-bold text-[#0f172a] mb-2">{steps[1].title}</h3>
              <p className="text-sm text-[#64748b] leading-relaxed">{steps[1].description}</p>
            </div>
            <div className="w-20 text-center mx-[62px] first:ml-0 last:mr-0">
              <h3 className="text-xl font-bold text-[#0f172a] mb-2">{steps[2].title}</h3>
              <p className="text-sm text-[#64748b] leading-relaxed">{steps[2].description}</p>
            </div>
          </div>
        </div>

        {/* Mobile: Vertical layout */}
        <div className="lg:hidden relative">
          {/* Vertical connecting line */}
          <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-[#fde047]" />

          <div className="space-y-12">
            {steps.map((step) => (
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
    </section>
  )
}
