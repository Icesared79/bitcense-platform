'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { submitLead } from '@/app/actions/leads'

const assetTypes = [
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'inventory', label: 'Inventory' },
  { value: 'accounts_receivable', label: 'Accounts Receivable' },
  { value: 'intellectual_property', label: 'Intellectual Property' },
  { value: 'other', label: 'Other' },
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
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">
          We&apos;ve received your information and will be in touch shortly to discuss your asset qualification needs.
        </p>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Start Your Qualification</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            id="name"
            name="name"
            label="Full Name"
            placeholder="John Smith"
            required
          />
          <Input
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="john@company.com"
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            id="company"
            name="company"
            label="Company Name"
            placeholder="Acme Inc."
          />
          <Input
            id="phone"
            name="phone"
            type="tel"
            label="Phone Number"
            placeholder="(555) 123-4567"
          />
        </div>

        <Select
          id="asset_type"
          name="asset_type"
          label="Asset Type"
          options={assetTypes}
          required
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            id="asset_value"
            name="asset_value"
            label="Estimated Value"
            placeholder="$1,000,000"
          />
          <Input
            id="location"
            name="location"
            label="Asset Location"
            placeholder="New York, NY"
          />
        </div>

        <Textarea
          id="message"
          name="message"
          label="Additional Information"
          placeholder="Tell us more about your asset..."
          rows={3}
        />

        <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
          Submit for Qualification
        </Button>
      </div>

      <p className="mt-4 text-xs text-gray-500 text-center">
        By submitting, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  )
}
