'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

const assetTypes = [
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'inventory', label: 'Inventory' },
  { value: 'accounts_receivable', label: 'Accounts Receivable' },
  { value: 'intellectual_property', label: 'Intellectual Property' },
  { value: 'other', label: 'Other' },
]

export default function NewAssetPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError('You must be logged in to submit an asset')
      setIsSubmitting(false)
      return
    }

    const estimatedValue = formData.get('estimated_value') as string
    const numericValue = estimatedValue ? parseFloat(estimatedValue.replace(/[^0-9.]/g, '')) : null

    const { data, error: insertError } = await supabase
      .from('assets')
      .insert({
        user_id: user.id,
        name: formData.get('name') as string,
        type: formData.get('type') as string,
        description: formData.get('description') as string || null,
        estimated_value: numericValue,
        location: formData.get('location') as string || null,
        status: 'submitted',
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error creating asset:', insertError)
      setError('Failed to submit asset. Please try again.')
      setIsSubmitting(false)
      return
    }

    // Log the activity
    await supabase.from('activity_log').insert({
      asset_id: data.id,
      user_id: user.id,
      action: 'Asset Submitted',
      details: 'Asset was submitted for qualification review.',
    })

    router.push(`/assets/${data.id}`)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Submit New Asset</h1>
        <p className="text-gray-600 mt-1">
          Provide details about your asset for qualification review.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <Input
              id="name"
              name="name"
              label="Asset Name"
              placeholder="e.g., Office Building on Main St."
              required
            />

            <Select
              id="type"
              name="type"
              label="Asset Type"
              options={assetTypes}
              required
            />

            <Textarea
              id="description"
              name="description"
              label="Description"
              placeholder="Provide a detailed description of your asset..."
              rows={4}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                id="estimated_value"
                name="estimated_value"
                label="Estimated Value"
                placeholder="$1,000,000"
              />
              <Input
                id="location"
                name="location"
                label="Location"
                placeholder="New York, NY"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button type="submit" isLoading={isSubmitting}>
                Submit for Review
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>1. Our team will review your submission within 48 hours</li>
          <li>2. You may be asked to provide additional documents</li>
          <li>3. Once reviewed, you&apos;ll receive a qualification score and feedback</li>
        </ul>
      </div>
    </div>
  )
}
