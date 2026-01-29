'use client'

import { useState } from 'react'
import { submitLead } from '@/app/actions/leads'

const assetTypes = [
  { value: 'private_credit_fund', label: 'Private Credit Fund' },
  { value: 'clo_structured_credit', label: 'CLO / Structured Credit' },
  { value: 'asset_backed_securities', label: 'Asset-Backed Securities' },
  { value: 'real_estate_debt', label: 'Real Estate Debt' },
  { value: 'tokenized_real_estate', label: 'Tokenized Real Estate' },
  { value: 'trade_finance', label: 'Trade Finance' },
  { value: 'other', label: 'Other' },
]

const locations = [
  { value: 'us', label: 'US' },
  { value: 'non_us', label: 'Non-US' },
]

export function Hero() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)

    const result = await submitLead(formData)

    setIsSubmitting(false)

    if (result.success) {
      setIsSuccess(true)
    } else {
      setError(result.error || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="get-started" className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-[#f8fafc]">
        {/* Decorative shapes */}
        <div className="absolute top-20 left-0 w-[800px] h-[800px] bg-[#15803d]/[0.02] rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0f172a]/[0.02] rounded-full blur-3xl translate-x-1/3" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
          {/* Left Side - Content & Visual */}
          <div className="order-2 lg:order-1">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#0f172a] leading-[1.05] tracking-tight">
              Your Yield.{' '}
              <br className="hidden sm:block" />
              <span className="text-[#15803d]">Our Global Distribution.</span>
            </h1>

            <p className="mt-8 text-xl text-[#334155] leading-relaxed max-w-lg">
              BitCense connects alternative asset managers to licensed global distribution partners.
            </p>

            {/* Flow Diagram */}
            <div className="mt-12 bg-white rounded-2xl p-8 lg:p-10 border border-[#e2e8f0] shadow-lg">
              <div className="flex items-center justify-between gap-2 lg:gap-4">
                {/* Managers */}
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#0f172a] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="font-semibold text-[#0f172a] text-sm lg:text-base">Managers</div>
                  <div className="text-xs lg:text-sm text-[#64748b] mt-0.5">Submit</div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 flex items-center">
                  <div className="w-8 lg:w-12 h-0.5 bg-[#15803d]/40" />
                  <svg className="w-4 h-4 text-[#15803d] -ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* BitCense */}
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#15803d] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#15803d]/25">
                    <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="font-semibold text-[#0f172a] text-sm lg:text-base">BitCense</div>
                  <div className="text-xs lg:text-sm text-[#64748b] mt-0.5">Qualify</div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 flex items-center">
                  <div className="w-8 lg:w-12 h-0.5 bg-[#15803d]/40" />
                  <svg className="w-4 h-4 text-[#15803d] -ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Global Investors */}
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#0f172a] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="font-semibold text-[#0f172a] text-sm lg:text-base">Distribution</div>
                  <div className="text-xs lg:text-sm text-[#64748b] mt-0.5">Investors</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Lead Capture Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-[#e2e8f0] relative overflow-hidden">
              {/* Green accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#15803d]" />

              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#0f172a]">Start Your Distribution</h2>
                <p className="text-[#64748b] mt-2 text-base lg:text-lg">Takes less than 30 seconds</p>
              </div>

              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#15803d]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#15803d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-3">Thank You!</h3>
                  <p className="text-[#64748b] text-lg">
                    We&apos;ve received your information and will be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form action={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-base">
                      {error}
                    </div>
                  )}

                  <div>
                    <label htmlFor="asset_type" className="block text-sm font-semibold text-[#0f172a] mb-2">Asset Type</label>
                    <select
                      id="asset_type"
                      name="asset_type"
                      required
                      className="w-full px-4 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-[#0f172a] text-base focus:outline-none focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/20 transition-all appearance-none cursor-pointer hover:border-[#cbd5e1]"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
                    >
                      <option value="">Select asset type</option>
                      {assetTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-[#0f172a] mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="John Smith"
                        className="w-full px-4 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-[#0f172a] text-base placeholder-[#94a3b8] focus:outline-none focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/20 transition-all hover:border-[#cbd5e1]"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#0f172a] mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="john@company.com"
                        className="w-full px-4 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-[#0f172a] text-base placeholder-[#94a3b8] focus:outline-none focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/20 transition-all hover:border-[#cbd5e1]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="location" className="block text-sm font-semibold text-[#0f172a] mb-2">Location</label>
                      <select
                        id="location"
                        name="location"
                        required
                        className="w-full px-4 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-[#0f172a] text-base focus:outline-none focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/20 transition-all appearance-none cursor-pointer hover:border-[#cbd5e1]"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
                      >
                        <option value="">Select</option>
                        {locations.map((loc) => (
                          <option key={loc.value} value={loc.value}>{loc.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="linkedin" className="block text-sm font-semibold text-[#0f172a] mb-2">
                        LinkedIn <span className="text-[#94a3b8] font-normal">(optional)</span>
                      </label>
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        placeholder="linkedin.com/in/..."
                        className="w-full px-4 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-[#0f172a] text-base placeholder-[#94a3b8] focus:outline-none focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/20 transition-all hover:border-[#cbd5e1]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#15803d] text-white py-4 rounded-xl text-lg font-semibold hover:bg-[#166534] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-[#15803d]/20 hover:shadow-xl hover:shadow-[#15803d]/25 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Get Started
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-sm text-[#64748b] text-center">
                    No commitment required. Free qualification assessment.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
