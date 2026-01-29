'use client'

import { useState } from 'react'
import Image from 'next/image'
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
    <section id="get-started" className="relative min-h-[90vh] flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[#4A7C59]/5">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#4A7C59]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4A7C59]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

        {/* Abstract shapes */}
        <div className="absolute top-32 right-1/4 w-4 h-4 bg-[#4A7C59]/20 rounded-full" />
        <div className="absolute top-48 left-1/4 w-2 h-2 bg-[#4A7C59]/30 rounded-full" />
        <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-[#4A7C59]/20 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content & Visual */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center px-4 py-2 bg-[#4A7C59]/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#4A7C59] rounded-full mr-2 animate-pulse" />
              <span className="text-[#4A7C59] font-medium text-sm">Global Asset Distribution Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Your Yield.{' '}
              <span className="text-[#4A7C59] relative">
                Our Global Distribution.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 150 2 298 8" stroke="#4A7C59" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.3"/>
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-xl">
              BitCense connects alternative asset managers to licensed global distribution partners.
            </p>

            {/* Flow Diagram */}
            <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50">
              <div className="flex items-center justify-between">
                {/* Asset Managers */}
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-gray-200 shadow-sm">
                    <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">Asset Managers</div>
                  <div className="text-xs text-gray-500">Submit assets</div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 px-3">
                  <div className="flex items-center">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-gray-300 to-[#4A7C59]/50" />
                    <svg className="w-4 h-4 text-[#4A7C59]/50 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* BitCense */}
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4A7C59] to-[#3A6C49] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#4A7C59]/25 p-3">
                    <Image
                      src="/logo-icon.png"
                      alt="BitCense"
                      width={40}
                      height={40}
                      className="invert brightness-200"
                    />
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">BitCense</div>
                  <div className="text-xs text-gray-500">Qualify & Package</div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 px-3">
                  <div className="flex items-center">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-[#4A7C59]/50 to-gray-300" />
                    <svg className="w-4 h-4 text-gray-400 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Global Investors */}
                <div className="flex-1 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-gray-200 shadow-sm">
                    <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">Global Investors</div>
                  <div className="text-xs text-gray-500">Licensed distribution</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Lead Capture Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-gray-200/50 border border-gray-100 relative">
              {/* Form decoration */}
              <div className="absolute -top-3 -right-3 w-24 h-24 bg-[#4A7C59]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-3 -left-3 w-32 h-32 bg-[#4A7C59]/5 rounded-full blur-2xl" />

              <div className="relative">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
                  <p className="text-gray-500 mt-1">Tell us about your asset</p>
                </div>

                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#4A7C59]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-[#4A7C59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-500">
                      We&apos;ve received your information and will be in touch within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form action={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                        {error}
                      </div>
                    )}

                    <div>
                      <label htmlFor="asset_type" className="block text-sm font-medium text-gray-700 mb-2">Asset Type</label>
                      <select
                        id="asset_type"
                        name="asset_type"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 transition-all appearance-none cursor-pointer hover:border-gray-300"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
                      >
                        <option value="">Select asset type</option>
                        {assetTypes.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="John Smith"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 transition-all hover:border-gray-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 transition-all hover:border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <select
                          id="location"
                          name="location"
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 transition-all appearance-none cursor-pointer hover:border-gray-300"
                          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
                        >
                          <option value="">Select location</option>
                          {locations.map((loc) => (
                            <option key={loc.value} value={loc.value}>{loc.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                          LinkedIn <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <input
                          type="url"
                          id="linkedin"
                          name="linkedin"
                          placeholder="linkedin.com/in/..."
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 transition-all hover:border-gray-300"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#4A7C59] text-white py-4 rounded-xl font-semibold hover:bg-[#3A6C49] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-[#4A7C59]/25 hover:shadow-xl hover:shadow-[#4A7C59]/30 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
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

                    <p className="text-xs text-gray-400 text-center">
                      By submitting, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
