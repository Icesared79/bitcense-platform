export function Hero() {
  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#4A7C59]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4A7C59]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
            Your Yield.{' '}
            <span className="text-[#4A7C59]">Our Global Distribution.</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            BitCense connects alternative asset managers to licensed global distribution partners.
          </p>

          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <a
              href="#get-started"
              className="inline-flex items-center bg-[#4A7C59] text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-[#3A6C49] transition-all hover:shadow-lg hover:shadow-[#4A7C59]/25"
            >
              Get Started
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center text-gray-700 px-6 py-4 rounded-full text-base font-semibold hover:bg-gray-100 transition-colors"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              See How It Works
            </a>
          </div>
        </div>

        {/* Visual element - abstract network/connection graphic */}
        <div className="mt-16 relative">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 sm:p-12 border border-gray-200">
              <div className="grid sm:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-16 h-16 bg-[#4A7C59]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#4A7C59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="font-semibold text-gray-900">Asset Managers</div>
                  <div className="text-sm text-gray-500 mt-1">Submit your assets</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="hidden sm:flex items-center">
                    <div className="w-12 h-0.5 bg-[#4A7C59]/30" />
                    <div className="w-12 h-12 bg-[#4A7C59] rounded-full flex items-center justify-center mx-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="w-12 h-0.5 bg-[#4A7C59]/30" />
                  </div>
                  <div className="sm:hidden">
                    <div className="w-16 h-16 bg-[#4A7C59] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="font-semibold text-gray-900">BitCense</div>
                    <div className="text-sm text-gray-500 mt-1">Qualify & Package</div>
                  </div>
                </div>
                <div>
                  <div className="w-16 h-16 bg-[#4A7C59]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#4A7C59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="font-semibold text-gray-900">Global Investors</div>
                  <div className="text-sm text-gray-500 mt-1">Licensed distribution</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
