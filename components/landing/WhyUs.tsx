export function WhyUs() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <span className="text-[#4A7C59] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Our primary goal is to enhance the customer experience
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              We combine cutting-edge technology with industry expertise to deliver fast, accurate asset qualifications that help you secure financing.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  title: 'Personal Finance Management',
                  description: 'Track and manage all your asset qualifications in one intuitive dashboard.',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ),
                },
                {
                  title: 'Investment Management',
                  description: 'Get expert analysis and scoring to maximize your financing potential.',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                },
                {
                  title: 'Security and Privacy',
                  description: 'Your sensitive financial data is protected with enterprise-grade encryption.',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
              ].map((feature) => (
                <div key={feature.title} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#4A7C59]/10 rounded-lg flex items-center justify-center text-[#4A7C59]">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="mt-1 text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Visual Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-[#4A7C59] rounded-2xl p-6 text-white">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold mb-1">48hrs</div>
                  <div className="text-white/80 text-sm">Average turnaround time</div>
                </div>
                <div className="bg-gray-100 rounded-2xl p-6">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <svg className="w-5 h-5 text-[#4A7C59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">98%</div>
                  <div className="text-gray-600 text-sm">Client satisfaction rate</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gray-900 rounded-2xl p-6 text-white">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold mb-1">2,400+</div>
                  <div className="text-gray-400 text-sm">Assets qualified</div>
                </div>
                <div className="bg-[#FFF8E7] rounded-2xl p-6">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">$4.2B+</div>
                  <div className="text-gray-600 text-sm">Total value processed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration logos */}
        <div className="mt-24">
          <p className="text-center text-sm text-gray-500 mb-8">Effortless integration with various tools</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['Salesforce', 'Dropbox', 'Slack', 'Zoom', 'HubSpot', 'Notion'].map((name) => (
              <div key={name} className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 transition-colors">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold">{name[0]}</span>
                </div>
                <span className="font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
