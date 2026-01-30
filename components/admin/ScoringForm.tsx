'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  SCORING_CATEGORIES,
  RED_FLAG_TEMPLATES,
  ASSET_TYPE_SCORING_NOTES,
  getDefaultCategoryInputs,
  calculateScoreBreakdown,
  validateCategoryScores,
  suggestStrengths,
  suggestConsiderations,
  generateRecommendationTemplate,
  getGradeFromScore,
  calculateWeightedScore,
  type CategoryScoreInput,
  type ScoreBreakdownData,
} from '@/lib/scoring'
import type { Asset } from '@/lib/types'
import { updateAssetStatus } from '@/app/actions/admin'

interface ScoringFormProps {
  asset: Asset
  onComplete?: () => void
}

export function ScoringForm({ asset, onComplete }: ScoringFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize from existing score breakdown or defaults
  const existingBreakdown = asset.score_breakdown as ScoreBreakdownData | null

  const [categoryInputs, setCategoryInputs] = useState<CategoryScoreInput[]>(() => {
    if (existingBreakdown?.categories) {
      return existingBreakdown.categories.map(cat => ({
        categoryId: cat.categoryId,
        score: cat.score,
        notes: cat.notes || '',
      }))
    }
    return getDefaultCategoryInputs()
  })

  const [strengths, setStrengths] = useState<string[]>(
    existingBreakdown?.strengths || ['', '', '']
  )
  const [considerations, setConsiderations] = useState<string[]>(
    existingBreakdown?.considerations || ['', '', '']
  )
  const [recommendation, setRecommendation] = useState(
    existingBreakdown?.recommendation || ''
  )
  const [selectedRedFlags, setSelectedRedFlags] = useState<string[]>(
    existingBreakdown?.redFlags || []
  )

  // Calculate live preview
  const [preview, setPreview] = useState<{
    overall: number
    grade: string
    readiness: string
  } | null>(null)

  useEffect(() => {
    const { isValid } = validateCategoryScores(categoryInputs)
    if (isValid) {
      const total = categoryInputs.reduce((sum, input) => {
        const cat = SCORING_CATEGORIES.find(c => c.id === input.categoryId)
        if (cat && input.score !== null) {
          return sum + calculateWeightedScore(input.score, cat.weight)
        }
        return sum
      }, 0)

      const overall = Math.round(total)
      const grade = getGradeFromScore(overall)

      // Determine readiness
      const highFlags = selectedRedFlags.filter(id =>
        RED_FLAG_TEMPLATES.find(f => f.id === id)?.severity === 'high'
      ).length

      let readiness = 'Ready'
      if (highFlags > 0 || overall < 50) readiness = 'Not Ready'
      else if (overall < 75) readiness = 'Conditional'

      setPreview({ overall, grade, readiness })
    } else {
      setPreview(null)
    }
  }, [categoryInputs, selectedRedFlags])

  function handleCategoryScoreChange(categoryId: string, score: string) {
    const numScore = score === '' ? null : Math.min(100, Math.max(0, parseInt(score) || 0))
    setCategoryInputs(prev =>
      prev.map(input =>
        input.categoryId === categoryId ? { ...input, score: numScore } : input
      )
    )
  }

  function handleCategoryNotesChange(categoryId: string, notes: string) {
    setCategoryInputs(prev =>
      prev.map(input =>
        input.categoryId === categoryId ? { ...input, notes } : input
      )
    )
  }

  function handleStrengthChange(index: number, value: string) {
    setStrengths(prev => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  function handleConsiderationChange(index: number, value: string) {
    setConsiderations(prev => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  function toggleRedFlag(flagId: string) {
    setSelectedRedFlags(prev =>
      prev.includes(flagId)
        ? prev.filter(id => id !== flagId)
        : [...prev, flagId]
    )
  }

  function handleAutoSuggest() {
    const { isValid } = validateCategoryScores(categoryInputs)
    if (!isValid) {
      setError('Please score all categories before auto-suggesting')
      return
    }

    // Convert inputs to entries for suggestion functions
    const entries = categoryInputs.map(input => {
      const cat = SCORING_CATEGORIES.find(c => c.id === input.categoryId)!
      return {
        categoryId: input.categoryId,
        score: input.score || 0,
        weight: cat.weight,
        weightedScore: calculateWeightedScore(input.score || 0, cat.weight),
        notes: input.notes || null,
      }
    })

    const suggestedStrengths = suggestStrengths(entries)
    const suggestedConsiderations = suggestConsiderations(entries)

    // Merge with existing, keeping user entries
    setStrengths(prev => {
      const merged = [...prev.filter(s => s.trim() !== '')]
      suggestedStrengths.forEach(s => {
        if (!merged.includes(s)) merged.push(s)
      })
      return merged.length > 0 ? merged : ['', '', '']
    })

    setConsiderations(prev => {
      const merged = [...prev.filter(c => c.trim() !== '')]
      suggestedConsiderations.forEach(c => {
        if (!merged.includes(c)) merged.push(c)
      })
      return merged.length > 0 ? merged : ['', '', '']
    })

    // Generate recommendation if empty
    if (!recommendation.trim() && preview) {
      const readiness = preview.readiness.toLowerCase().replace(' ', '_') as 'ready' | 'conditional' | 'not_ready'
      setRecommendation(generateRecommendationTemplate(readiness, preview.grade as any))
    }
  }

  async function handleSubmit() {
    setError(null)

    // Validate all categories are scored
    const { isValid, missingCategories } = validateCategoryScores(categoryInputs)
    if (!isValid) {
      const missing = missingCategories.map(id =>
        SCORING_CATEGORIES.find(c => c.id === id)?.name
      ).join(', ')
      setError(`Please score all categories. Missing: ${missing}`)
      return
    }

    setIsSubmitting(true)

    try {
      // Calculate the full breakdown
      const breakdown = calculateScoreBreakdown(
        categoryInputs,
        strengths,
        considerations,
        recommendation,
        selectedRedFlags,
        null // TODO: Pass current user ID
      )

      // Update the asset
      const result = await updateAssetStatus(asset.id, {
        score: breakdown.overall,
        grade: breakdown.grade,
        score_breakdown: breakdown as any,
        recommendation: breakdown.recommendation,
        status: asset.status === 'submitted' ? 'in_review' : asset.status,
      })

      if (result.success) {
        router.refresh()
        onComplete?.()
      } else {
        setError(result.error || 'Failed to save scores')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleCompleteQualification() {
    if (!preview || preview.overall === 0) {
      setError('Please complete scoring before finalizing qualification')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const breakdown = calculateScoreBreakdown(
        categoryInputs,
        strengths,
        considerations,
        recommendation,
        selectedRedFlags,
        null
      )

      const newStatus = breakdown.distributionReadiness === 'not_ready' ? 'rejected' : 'qualification_complete'

      const result = await updateAssetStatus(asset.id, {
        score: breakdown.overall,
        grade: breakdown.grade,
        score_breakdown: breakdown as any,
        recommendation: breakdown.recommendation,
        status: newStatus,
      })

      if (result.success) {
        router.refresh()
        onComplete?.()
      } else {
        setError(result.error || 'Failed to complete qualification')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const assetTypeNote = ASSET_TYPE_SCORING_NOTES[asset.asset_type]

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Asset Type Guidance */}
      {assetTypeNote && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Scoring Guidance:</strong> {assetTypeNote}
          </p>
        </div>
      )}

      {/* Live Preview */}
      {preview && (
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">Overall Score</p>
                  <p className="text-3xl font-bold text-gray-900">{preview.overall}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Grade</p>
                  <p className="text-3xl font-bold text-gray-900">{preview.grade}</p>
                </div>
              </div>
              <Badge
                variant={
                  preview.readiness === 'Ready' ? 'success' :
                  preview.readiness === 'Conditional' ? 'warning' : 'error'
                }
              >
                {preview.readiness}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Scoring */}
      <Card>
        <CardHeader>
          <CardTitle>Category Scores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {SCORING_CATEGORIES.map(category => {
            const input = categoryInputs.find(i => i.categoryId === category.id)
            const score = input?.score

            return (
              <div key={category.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {category.name}
                      <span className="ml-2 text-sm font-normal text-gray-500">
                        ({category.weight}% weight)
                      </span>
                    </h4>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={score ?? ''}
                      onChange={(e) => handleCategoryScoreChange(category.id, e.target.value)}
                      className="w-20 text-center"
                      placeholder="0-100"
                    />
                    {score !== null && score !== undefined && (
                      <span className="text-sm text-gray-500">
                        = {calculateWeightedScore(score, category.weight).toFixed(1)} pts
                      </span>
                    )}
                  </div>
                </div>

                {/* Guidelines */}
                <details className="mb-2">
                  <summary className="text-sm text-green-600 cursor-pointer hover:text-green-700">
                    View scoring guidelines
                  </summary>
                  <ul className="mt-2 ml-4 text-sm text-gray-600 list-disc space-y-1">
                    {category.guidelines.map((guide, idx) => (
                      <li key={idx}>{guide}</li>
                    ))}
                  </ul>
                </details>

                {/* Notes */}
                <Textarea
                  placeholder={`Notes for ${category.name.toLowerCase()}...`}
                  value={input?.notes || ''}
                  onChange={(e) => handleCategoryNotesChange(category.id, e.target.value)}
                  rows={2}
                  className="text-sm"
                />

                {/* Category-specific red flags */}
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Red Flags:</p>
                  <div className="flex flex-wrap gap-2">
                    {RED_FLAG_TEMPLATES.filter(f => f.category === category.id).map(flag => (
                      <button
                        key={flag.id}
                        type="button"
                        onClick={() => toggleRedFlag(flag.id)}
                        className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                          selectedRedFlags.includes(flag.id)
                            ? flag.severity === 'high'
                              ? 'bg-red-100 border-red-300 text-red-700'
                              : flag.severity === 'medium'
                              ? 'bg-yellow-100 border-yellow-300 text-yellow-700'
                              : 'bg-blue-100 border-blue-300 text-blue-700'
                            : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        {flag.message}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Strengths & Considerations */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Strengths</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {strengths.map((strength, idx) => (
              <Input
                key={idx}
                value={strength}
                onChange={(e) => handleStrengthChange(idx, e.target.value)}
                placeholder={`Strength ${idx + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={() => setStrengths(prev => [...prev, ''])}
              className="text-sm text-green-600 hover:text-green-700"
            >
              + Add strength
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Considerations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {considerations.map((consideration, idx) => (
              <Input
                key={idx}
                value={consideration}
                onChange={(e) => handleConsiderationChange(idx, e.target.value)}
                placeholder={`Consideration ${idx + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={() => setConsiderations(prev => [...prev, ''])}
              className="text-sm text-green-600 hover:text-green-700"
            >
              + Add consideration
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Recommendation */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Recommendation</CardTitle>
            <button
              type="button"
              onClick={handleAutoSuggest}
              className="text-sm text-green-600 hover:text-green-700"
            >
              Auto-suggest
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
            placeholder="Overall recommendation for this asset..."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button onClick={handleSubmit} isLoading={isSubmitting}>
          Save Scores
        </Button>
        <Button
          variant="secondary"
          onClick={handleCompleteQualification}
          isLoading={isSubmitting}
          disabled={!preview}
        >
          Complete Qualification
        </Button>
      </div>
    </div>
  )
}
