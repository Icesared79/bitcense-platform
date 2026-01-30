'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { ScoreDisplay } from '@/components/ui/ScoreDisplay'
import {
  SCORING_CATEGORIES,
  DISTRIBUTION_READINESS_CONFIG,
  GRADE_THRESHOLDS,
  getRedFlagById,
  type ScoreBreakdownData,
} from '@/lib/scoring'
import { formatDate } from '@/lib/utils'

interface ScoreBreakdownCardProps {
  breakdown: ScoreBreakdownData
  showInternalDetails?: boolean // For admin view
}

export function ScoreBreakdownCard({ breakdown, showInternalDetails = false }: ScoreBreakdownCardProps) {
  const readinessConfig = DISTRIBUTION_READINESS_CONFIG[breakdown.distributionReadiness]
  const gradeConfig = GRADE_THRESHOLDS[breakdown.grade]

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            {/* Score Display */}
            <div className="flex items-center gap-6">
              <ScoreDisplay
                score={breakdown.overall}
                grade={breakdown.grade}
                size="lg"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {gradeConfig.label} Score
                </h3>
                <p className="text-sm text-gray-500">{gradeConfig.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Scored on {formatDate(breakdown.scoredAt)}
                </p>
              </div>
            </div>

            {/* Distribution Readiness */}
            <div
              className="px-6 py-4 rounded-lg text-center"
              style={{ backgroundColor: readinessConfig.bgColor }}
            >
              <p className="text-sm font-medium" style={{ color: readinessConfig.color }}>
                {readinessConfig.label}
              </p>
              <p className="text-xs mt-1" style={{ color: readinessConfig.color, opacity: 0.8 }}>
                {readinessConfig.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {breakdown.categories.map(cat => {
            const category = SCORING_CATEGORIES.find(c => c.id === cat.categoryId)
            if (!category) return null

            return (
              <div key={cat.categoryId}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <span className="text-xs text-gray-400">({cat.weight}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{cat.score}</span>
                    <span className="text-xs text-gray-400">
                      ({cat.weightedScore.toFixed(1)} weighted)
                    </span>
                  </div>
                </div>
                <ProgressBar
                  value={cat.score}
                  variant={
                    cat.score >= 80 ? 'success' :
                    cat.score >= 60 ? 'warning' : 'error'
                  }
                  size="sm"
                />
                {showInternalDetails && cat.notes && (
                  <p className="text-xs text-gray-500 mt-1 italic">{cat.notes}</p>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Strengths & Considerations */}
      <div className="grid md:grid-cols-2 gap-6">
        {breakdown.strengths.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {breakdown.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 mt-0.5">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {breakdown.considerations.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Considerations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {breakdown.considerations.map((consideration, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    {consideration}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Red Flags (admin only) */}
      {showInternalDetails && breakdown.redFlags.length > 0 && (
        <Card className="border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 text-red-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
              </svg>
              Red Flags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {breakdown.redFlags.map(flagId => {
                const flag = getRedFlagById(flagId)
                if (!flag) return null

                return (
                  <div key={flagId} className="flex items-center gap-2">
                    <Badge
                      variant={
                        flag.severity === 'high' ? 'error' :
                        flag.severity === 'medium' ? 'warning' : 'info'
                      }
                      size="sm"
                    >
                      {flag.severity}
                    </Badge>
                    <span className="text-sm text-gray-700">{flag.message}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendation */}
      {breakdown.recommendation && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{breakdown.recommendation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
