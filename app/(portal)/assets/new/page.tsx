'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { ASSET_TYPE_LABELS, type AssetType } from '@/lib/types'
import Link from 'next/link'

const assetTypeOptions = Object.entries(ASSET_TYPE_LABELS).map(([value, label]) => ({
  value,
  label,
}))

const jurisdictionOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'eu', label: 'European Union' },
  { value: 'cayman', label: 'Cayman Islands' },
  { value: 'luxembourg', label: 'Luxembourg' },
  { value: 'ireland', label: 'Ireland' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'other', label: 'Other' },
]

const fundStructureOptions = [
  { value: 'open_ended', label: 'Open-Ended' },
  { value: 'closed_ended', label: 'Closed-End' },
  { value: 'interval_fund', label: 'Interval Fund' },
  { value: 'tender_offer', label: 'Tender Offer' },
  { value: 'spv', label: 'SPV' },
  { value: 'note', label: 'Note' },
  { value: 'other', label: 'Other' },
]

export default function NewAssetPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [name, setName] = useState('')
  const [assetType, setAssetType] = useState('')
  const [showMore, setShowMore] = useState(false)

  // Reveal additional fields once basics are filled
  useEffect(() => {
    if (name.length > 2 && assetType) {
      const timer = setTimeout(() => setShowMore(true), 300)
      return () => clearTimeout(timer)
    }
  }, [name, assetType])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError('Please log in to continue')
      setIsSubmitting(false)
      return
    }

    // Ensure user exists in public.users table (defensive check)
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!existingUser) {
      const { error: userError } = await supabase.from('users').insert({
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        role: 'client',
      })
      if (userError) {
        console.error('Error creating user record:', userError)
        setError('Account setup failed. Please contact support.')
        setIsSubmitting(false)
        return
      }
    }

    const parseNumber = (val: string): number | null => {
      if (!val) return null
      const cleaned = val.replace(/[^0-9.]/g, '')
      if (!cleaned) return null
      const num = parseFloat(cleaned)
      return isNaN(num) ? null : num
    }

    const parseInteger = (val: string): number | null => {
      if (!val) return null
      const cleaned = val.replace(/[^0-9]/g, '')
      if (!cleaned) return null
      const num = parseInt(cleaned, 10)
      return isNaN(num) ? null : num
    }

    const targetRaise = (formData.get('target_raise') as string) || ''
    const minInvestment = (formData.get('minimum_investment') as string) || ''
    const targetYield = (formData.get('target_yield') as string) || ''
    const termMonths = (formData.get('term_months') as string) || ''

    const parsedTargetRaise = parseNumber(targetRaise)
    const parsedMinInvestment = parseNumber(minInvestment)
    const parsedTargetYield = parseNumber(targetYield)
    const parsedTermMonths = parseInteger(termMonths)

    const { data, error: insertError } = await supabase
      .from('assets')
      .insert({
        user_id: user.id,
        name: formData.get('name') as string,
        type: formData.get('asset_type') as AssetType,
        description: (formData.get('description') as string) || null,
        isin: (formData.get('isin') as string) || null,
        cusip: (formData.get('cusip') as string) || null,
        target_raise: parsedTargetRaise !== null ? Math.round(parsedTargetRaise * 100) : null,
        minimum_investment: parsedMinInvestment !== null ? Math.round(parsedMinInvestment * 100) : null,
        target_yield: parsedTargetYield,
        term_months: parsedTermMonths,
        issuer_name: (formData.get('issuer_name') as string) || null,
        issuer_jurisdiction: (formData.get('issuer_jurisdiction') as string) || null,
        fund_structure: (formData.get('fund_structure') as string) || null,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error creating asset:', insertError)
      setError(`Error: ${insertError.message}`)
      setIsSubmitting(false)
      return
    }

    await supabase.from('activity_log').insert({
      asset_id: data.id,
      user_id: user.id,
      activity_type: 'asset_created',
      description: 'Asset submitted for review.',
      is_client_visible: true,
    })

    router.push(`/assets/${data.id}`)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-gray-400 hover:text-gray-600 text-sm mb-8 transition-colors"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Dashboard
      </Link>

      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-900">Submit Asset</h1>
        <p className="text-gray-500 mt-1">Tell us about your asset. We'll take it from here.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Basics */}
        <div>
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
            Basics
          </h2>
          <div className="space-y-5">
            <Input
              id="name"
              name="name"
              label="Name"
              placeholder="e.g., Evergreen Private Credit Fund I"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />

            <Select
              id="asset_type"
              name="asset_type"
              label="Type"
              options={assetTypeOptions}
              placeholder="Select"
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              required
            />

            <Textarea
              id="description"
              name="description"
              label="Description"
              placeholder="Brief overview of the asset strategy..."
              rows={2}
            />
          </div>
        </div>

        {/* Additional fields - revealed after basics */}
        <div className={`space-y-8 transition-all duration-500 ease-out ${
          showMore ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
        }`}>

          {/* Identifiers */}
          <div className="pt-8 border-t border-gray-100">
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Identifiers
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                id="isin"
                name="isin"
                label="ISIN"
                placeholder="US0378331005"
                required
              />
              <Input
                id="cusip"
                name="cusip"
                label="CUSIP"
                placeholder="037833100"
              />
            </div>
          </div>

          {/* Issuer */}
          <div className="pt-8 border-t border-gray-100">
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Issuer
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                id="issuer_name"
                name="issuer_name"
                label="Name"
                placeholder="ABC Capital Management"
                required
              />
              <Select
                id="issuer_jurisdiction"
                name="issuer_jurisdiction"
                label="Jurisdiction"
                options={jurisdictionOptions}
                placeholder="Select"
              />
              <Select
                id="fund_structure"
                name="fund_structure"
                label="Structure"
                options={fundStructureOptions}
                placeholder="Select"
              />
            </div>
          </div>

          {/* Financials */}
          <div className="pt-8 border-t border-gray-100">
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Financials
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="target_raise" className="block text-sm font-medium text-gray-700 mb-1">
                  Target raise <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input
                    id="target_raise"
                    name="target_raise"
                    type="text"
                    required
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 hover:border-gray-300 transition-all"
                    placeholder="10,000,000"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="minimum_investment" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input
                    id="minimum_investment"
                    name="minimum_investment"
                    type="text"
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 hover:border-gray-300 transition-all"
                    placeholder="100,000"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="target_yield" className="block text-sm font-medium text-gray-700 mb-1">
                  Target yield
                </label>
                <div className="relative">
                  <input
                    id="target_yield"
                    name="target_yield"
                    type="text"
                    className="w-full pl-4 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 hover:border-gray-300 transition-all"
                    placeholder="8.5"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                </div>
              </div>
              <div>
                <label htmlFor="term_months" className="block text-sm font-medium text-gray-700 mb-1">
                  Term
                </label>
                <div className="relative">
                  <input
                    id="term_months"
                    name="term_months"
                    type="text"
                    className="w-full pl-4 pr-16 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 hover:border-gray-300 transition-all"
                    placeholder="36"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">months</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-8 border-t border-gray-100">
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={!name || !assetType}
            className="w-full py-3 rounded-xl"
          >
            Submit
          </Button>
          <p className="text-center text-sm text-gray-500 mt-3">
            We typically review within 48 hours. You can add documents after submission.
          </p>
        </div>
      </form>
    </div>
  )
}
