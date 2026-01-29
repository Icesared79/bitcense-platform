import { LeadForm } from './LeadForm'

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#4A7C59]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4A7C59]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left side - Content */}
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              The smarter way to{' '}
              <span className="text-[#4A7C59]">qualify assets</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Experience a new way to get your assets qualified for financing.
              Fast, transparent, and built for speed trust worldwide.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#get-started"
                className="inline-flex items-center bg-[#4A7C59] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#3A6C49] transition-all hover:shadow-lg hover:shadow-[#4A7C59]/25"
              >
                Get Started Free
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center text-gray-700 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                See How It Works
              </a>
            </div>
          </div>

          {/* Right side - Floating UI Mockup */}
          <div className="relative lg:h-[500px]">
            {/* Main card */}
            <div className="relative bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-6 max-w-sm mx-auto lg:absolute lg:right-0 lg:top-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-500">Asset Value</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Qualified</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$2,450,000</div>
              <div className="text-sm text-gray-500 mb-6">Commercial Real Estate</div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Score</span>
                  <span className="font-semibold text-gray-900">92/100</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#4A7C59] h-2 rounded-full" style={{ width: '92%' }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Grade</span>
                  <span className="font-semibold text-[#4A7C59]">A+</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-[#4A7C59] text-white py-3 rounded-xl font-medium hover:bg-[#3A6C49] transition-colors">
                View Details
              </button>
            </div>

            {/* Floating badge - top left */}
            <div className="hidden lg:flex absolute left-0 top-0 bg-white rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 px-4 py-3 items-center space-x-3">
              <div className="w-10 h-10 bg-[#4A7C59]/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#4A7C59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-500">Assets Qualified</div>
                <div className="font-bold text-gray-900">2,400+</div>
              </div>
            </div>

            {/* Floating badge - bottom left */}
            <div className="hidden lg:flex absolute left-8 bottom-16 bg-white rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 px-4 py-3 items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-500">Avg. Turnaround</div>
                <div className="font-bold text-gray-900">48 Hours</div>
              </div>
            </div>

            {/* Stats badge - overlapping card */}
            <div className="hidden lg:flex absolute right-48 bottom-4 bg-[#1a1a1a] text-white rounded-xl px-4 py-3 items-center space-x-3 shadow-xl">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-[#4A7C59] rounded-full flex items-center justify-center text-xs font-medium">JD</div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-medium">MK</div>
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-xs font-medium">AS</div>
              </div>
              <div>
                <div className="font-bold">500+</div>
                <div className="text-xs text-gray-400">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-20 pt-12 border-t border-gray-100">
          <p className="text-center text-sm text-gray-500 mb-8">Trusted by leading companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
            <svg className="h-6" viewBox="0 0 120 30" fill="currentColor">
              <text x="0" y="22" className="text-gray-400 font-semibold text-lg">Blackstone</text>
            </svg>
            <svg className="h-6" viewBox="0 0 100 30" fill="currentColor">
              <text x="0" y="22" className="text-gray-400 font-semibold text-lg">CBRE</text>
            </svg>
            <svg className="h-6" viewBox="0 0 100 30" fill="currentColor">
              <text x="0" y="22" className="text-gray-400 font-semibold text-lg">JLL</text>
            </svg>
            <svg className="h-6" viewBox="0 0 120 30" fill="currentColor">
              <text x="0" y="22" className="text-gray-400 font-semibold text-lg">Cushman</text>
            </svg>
            <svg className="h-6" viewBox="0 0 100 30" fill="currentColor">
              <text x="0" y="22" className="text-gray-400 font-semibold text-lg">Marcus</text>
            </svg>
            <svg className="h-6" viewBox="0 0 100 30" fill="currentColor">
              <text x="0" y="22" className="text-gray-400 font-semibold text-lg">Colliers</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
