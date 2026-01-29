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

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Step 1 */}
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#e2e8f0]">
            <div className="w-20 h-20 rounded-full bg-[#15803d] flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-[#15803d]/25 mx-auto mb-6">
              01
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] mb-3">Submit</h3>
            <p className="text-base text-[#64748b] leading-relaxed">
              Tell us about your asset. Simple form, takes 2 minutes.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#e2e8f0] relative">
            {/* Connectors - only visible on desktop */}
            <div className="hidden md:block absolute top-1/2 -left-4 lg:-left-6 w-4 lg:w-6 h-0.5 bg-[#fde047] -translate-y-8" />
            <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-6 w-4 lg:w-6 h-0.5 bg-[#fde047] -translate-y-8" />

            <div className="w-20 h-20 rounded-full bg-[#15803d] flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-[#15803d]/25 mx-auto mb-6">
              02
            </div>
            <h3 className="text-xl font-bold text-[#0f172a] mb-3">Qualify</h3>
            <p className="text-base text-[#64748b] leading-relaxed">
              We analyze, score, and package your asset for distribution.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#e2e8f0]">
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
