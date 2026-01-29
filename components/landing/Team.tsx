export function Team() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Stats and testimonial */}
          <div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#4A7C59] to-[#3A6C49] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    HD
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Henry Davis</div>
                  <div className="text-sm text-gray-500">CEO, Meridian Capital</div>
                </div>
              </div>
              <blockquote className="text-gray-700 leading-relaxed">
                &ldquo;BitCense transformed how we approach asset qualification. The turnaround time is incredible, and the insights we receive have helped us close deals faster than ever before.&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="text-3xl font-bold text-[#4A7C59]">180+</div>
                <div className="text-sm text-gray-600 mt-1">Countries served</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600 mt-1">Happy clients</div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="text-[#4A7C59] font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Millions of people who already trust our company
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              At BitCense, we believe that every business deserves access to fast, transparent, and professional asset qualification services. Our team combines decades of financial expertise with cutting-edge technology.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Industry-leading 48-hour turnaround time',
                'Expert team with 50+ years combined experience',
                'Transparent pricing with no hidden fees',
                'Bank-level security for your sensitive data',
              ].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-[#4A7C59] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="#get-started"
                className="inline-flex items-center bg-[#4A7C59] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#3A6C49] transition-all hover:shadow-lg hover:shadow-[#4A7C59]/25"
              >
                Start Your Qualification
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
