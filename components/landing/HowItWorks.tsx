export function HowItWorks() {
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

        {/* Steps - Desktop with arrows */}
        <div className="hidden md:flex items-start justify-center gap-6 lg:gap-8">
          {/* Step 1 */}
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#e2e8f0] flex-1 max-w-[280px]">
            <div className="w-20 h-20 rounded-full bg-[#15803d] flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-[#15803d]/25 mx-auto mb-6">
              01
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] mb-3">Submit</h3>
            <p className="text-base text-[#64748b] leading-relaxed">
              Tell us about your asset. Simple form, takes 2 minutes.
            </p>
          </div>

          {/* Arrow 1 */}
          <div className="flex items-center pt-14 flex-shrink-0">
            <div className="w-8 lg:w-12 h-0.5 bg-[#fde047]" />
            <svg className="w-4 h-4 text-[#fde047] -ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Step 2 */}
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#e2e8f0] flex-1 max-w-[280px]">
            <div className="w-20 h-20 rounded-full bg-[#15803d] flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-[#15803d]/25 mx-auto mb-6">
              02
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] mb-3">Qualify</h3>
            <p className="text-base text-[#64748b] leading-relaxed">
              We analyze, score, and package your asset for distribution.
            </p>
          </div>

          {/* Arrow 2 */}
          <div className="flex items-center pt-14 flex-shrink-0">
            <div className="w-8 lg:w-12 h-0.5 bg-[#fde047]" />
            <svg className="w-4 h-4 text-[#fde047] -ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Step 3 */}
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#e2e8f0] flex-1 max-w-[280px]">
            <div className="w-20 h-20 rounded-full bg-[#15803d] flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-[#15803d]/25 mx-auto mb-6">
              03
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] mb-3">Distribute</h3>
            <p className="text-base text-[#64748b] leading-relaxed">
              Access global retail investors through our licensed partners.
            </p>
          </div>
        </div>

        {/* Steps - Mobile (stacked) */}
        <div className="md:hidden space-y-6">
          {/* Step 1 */}
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-[#e2e8f0]">
            <div className="w-20 h-20 rounded-full bg-[#15803d] flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-[#15803d]/25 mx-auto mb-6">
              01
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] mb-3">Submit</h3>
            <p className="text-base text-[#64748b] leading-relaxed">
              Tell us about your asset. Simple form, takes 2 minutes.
            </p>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center">
            <svg className="w-6 h-6 text-[#fde047]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Step 2 */}
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-[#e2e8f0]">
            <div className="w-20 h-20 rounded-full bg-[#15803d] flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-[#15803d]/25 mx-auto mb-6">
              02
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] mb-3">Qualify</h3>
            <p className="text-base text-[#64748b] leading-relaxed">
              We analyze, score, and package your asset for distribution.
            </p>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center">
            <svg className="w-6 h-6 text-[#fde047]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Step 3 */}
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-[#e2e8f0]">
            <div className="w-20 h-20 rounded-full bg-[#15803d] flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-[#15803d]/25 mx-auto mb-6">
              03
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] mb-3">Distribute</h3>
            <p className="text-base text-[#64748b] leading-relaxed">
              Access global retail investors through our licensed partners.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
