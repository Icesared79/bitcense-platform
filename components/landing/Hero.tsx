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
    <section id="get-started" className="pt-36 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left - Content */}
          <div className="lg:pt-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Your Yield.
              <br />
              <span className="text-green-600">Our Global Distribution.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-md">
              BitCense connects alternative asset managers to licensed global distribution partners.
            </p>

            <div className="mt-8 w-16 h-px bg-gray-200" />
          </div>

          {/* Right - Form */}
          <div id="form" className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank you</h3>
                <p className="text-gray-600">
                  We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="asset_type" className="block text-sm font-medium text-gray-700 mb-1.5">
                    What type of asset?
                  </label>
                  <select
                    id="asset_type"
                    name="asset_type"
                    required
                    className="w-full px-3 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                  >
                    <option value="">Select asset type</option>
                    {assetTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="John Smith"
                    className="w-full px-3 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Work email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@company.com"
                    className="w-full px-3 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3.5 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Started'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Free qualification assessment. We'll reach out within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
