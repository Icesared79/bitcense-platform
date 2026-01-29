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

export function LeadForm() {
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

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#4A7C59]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#4A7C59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-gray-400">
          We&apos;ve received your information and will be in touch within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="asset_type" className="block text-sm font-medium text-gray-300 mb-2">Asset Type</label>
        <select
          id="asset_type"
          name="asset_type"
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#4A7C59] focus:ring-1 focus:ring-[#4A7C59] transition-colors appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
        >
          <option value="" className="bg-gray-900">Select asset type</option>
          {assetTypes.map((type) => (
            <option key={type.value} value={type.value} className="bg-gray-900">{type.label}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="John Smith"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#4A7C59] focus:ring-1 focus:ring-[#4A7C59] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="john@company.com"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#4A7C59] focus:ring-1 focus:ring-[#4A7C59] transition-colors"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">Location</label>
          <select
            id="location"
            name="location"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#4A7C59] focus:ring-1 focus:ring-[#4A7C59] transition-colors appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
          >
            <option value="" className="bg-gray-900">Select location</option>
            {locations.map((loc) => (
              <option key={loc.value} value={loc.value} className="bg-gray-900">{loc.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300 mb-2">LinkedIn <span className="text-gray-500">(optional)</span></label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            placeholder="linkedin.com/in/yourprofile"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#4A7C59] focus:ring-1 focus:ring-[#4A7C59] transition-colors"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#4A7C59] text-white py-4 rounded-xl font-semibold hover:bg-[#3A6C49] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
          'Get Started'
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By submitting, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  )
}
