'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import type { Asset, AssetStatus, ScoreGrade } from '@/lib/types'
import { updateAssetStatus, sendToDistribution } from '@/app/actions/admin'

interface AdminAssetFormProps {
  asset: Asset
}

const statusOptions = [
  { value: 'submitted', label: 'Submitted' },
  { value: 'in_review', label: 'In Review' },
  { value: 'qualification_complete', label: 'Qualification Complete' },
  { value: 'sent_to_distribution', label: 'Sent to Distribution' },
  { value: 'live', label: 'Live' },
  { value: 'rejected', label: 'Rejected' },
]

const gradeOptions = [
  { value: '', label: 'Select grade...' },
  { value: 'A', label: 'A - Excellent' },
  { value: 'B', label: 'B - Good' },
  { value: 'C', label: 'C - Fair' },
  { value: 'D', label: 'D - Needs Work' },
  { value: 'F', label: 'F - Not Qualified' },
]

export function AdminAssetForm({ asset }: AdminAssetFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSendingToDistribution, setIsSendingToDistribution] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [status, setStatus] = useState<AssetStatus>(asset.status)
  const [feedback, setFeedback] = useState(asset.feedback || '')
  const [internalNotes, setInternalNotes] = useState(asset.internal_notes || '')
  const [recommendation, setRecommendation] = useState(asset.recommendation || '')
  const [score, setScore] = useState(asset.score?.toString() || '')
  const [grade, setGrade] = useState<ScoreGrade | ''>(asset.grade || '')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    const result = await updateAssetStatus(asset.id, {
      status,
      feedback: feedback || null,
      internal_notes: internalNotes || null,
      recommendation: recommendation || null,
      score: score ? parseInt(score) : null,
      grade: grade || null,
    })

    setIsSubmitting(false)

    if (result.success) {
      setSuccess(true)
      router.refresh()
      setTimeout(() => setSuccess(false), 3000)
    } else {
      setError(result.error || 'Failed to update asset')
    }
  }

  async function handleSendToDistribution() {
    setIsSendingToDistribution(true)
    setError(null)

    const result = await sendToDistribution(asset.id, 'Optima')

    setIsSendingToDistribution(false)

    if (result.success) {
      setSuccess(true)
      router.refresh()
    } else {
      setError(result.error || 'Failed to send to distribution')
    }
  }

  const canSendToDistribution = asset.status === 'qualification_complete' && asset.score !== null

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Asset updated successfully!
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <Select
          id="status"
          label="Status"
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.target.value as AssetStatus)}
        />

        <Select
          id="grade"
          label="Grade"
          options={gradeOptions}
          value={grade}
          onChange={(e) => setGrade(e.target.value as ScoreGrade | '')}
        />
      </div>

      <Input
        id="score"
        type="number"
        label="Score (0-100)"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        min={0}
        max={100}
      />

      <Textarea
        id="recommendation"
        label="Recommendation"
        value={recommendation}
        onChange={(e) => setRecommendation(e.target.value)}
        rows={2}
        placeholder="Summary recommendation for this asset..."
      />

      <Textarea
        id="feedback"
        label="Client-Visible Feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={4}
        placeholder="This feedback will be visible to the client..."
      />

      <Textarea
        id="internal_notes"
        label="Internal Notes (Admin Only)"
        value={internalNotes}
        onChange={(e) => setInternalNotes(e.target.value)}
        rows={4}
        placeholder="These notes are only visible to admins..."
      />

      <div className="flex items-center gap-4">
        <Button type="submit" isLoading={isSubmitting}>
          Save Changes
        </Button>

        {canSendToDistribution && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleSendToDistribution}
            isLoading={isSendingToDistribution}
          >
            Send to Optima
          </Button>
        )}
      </div>
    </form>
  )
}
