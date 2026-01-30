/**
 * BitCense Connect Score Calculator
 *
 * Calculates overall scores, grades, and distribution readiness
 * from category scores entered by admins.
 */

import type { ScoreGrade } from '@/lib/types'
import {
  SCORING_CATEGORIES,
  GRADE_THRESHOLDS,
  DISTRIBUTION_READINESS_CONFIG,
  RED_FLAG_TEMPLATES,
  type ScoringCategoryId,
  type CategoryScoreEntry,
  type ScoreBreakdownData,
  type CategoryScoreInput,
  type DistributionReadiness,
  type RedFlagSeverity,
} from './types'

/**
 * Get letter grade from numeric score
 */
export function getGradeFromScore(score: number): ScoreGrade {
  if (score >= GRADE_THRESHOLDS.A.min) return 'A'
  if (score >= GRADE_THRESHOLDS.B.min) return 'B'
  if (score >= GRADE_THRESHOLDS.C.min) return 'C'
  if (score >= GRADE_THRESHOLDS.D.min) return 'D'
  return 'F'
}

/**
 * Get grade configuration
 */
export function getGradeConfig(grade: ScoreGrade) {
  return GRADE_THRESHOLDS[grade]
}

/**
 * Calculate weighted score for a category
 */
export function calculateWeightedScore(score: number, weight: number): number {
  return Math.round((score * weight) / 100 * 100) / 100
}

/**
 * Calculate overall score from category scores
 */
export function calculateOverallScore(categoryScores: CategoryScoreEntry[]): number {
  const totalWeightedScore = categoryScores.reduce(
    (sum, cat) => sum + cat.weightedScore,
    0
  )
  return Math.round(totalWeightedScore)
}

/**
 * Determine distribution readiness based on score and red flags
 */
export function determineDistributionReadiness(
  overallScore: number,
  redFlagIds: string[]
): DistributionReadiness {
  // Count high severity red flags
  const highSeverityCount = redFlagIds.filter(id => {
    const flag = RED_FLAG_TEMPLATES.find(f => f.id === id)
    return flag?.severity === 'high'
  }).length

  // Not ready if any high severity red flags or score below 50
  if (highSeverityCount > 0 || overallScore < 50) {
    return 'not_ready'
  }

  // Conditional if medium severity flags or score between 50-74
  const mediumSeverityCount = redFlagIds.filter(id => {
    const flag = RED_FLAG_TEMPLATES.find(f => f.id === id)
    return flag?.severity === 'medium'
  }).length

  if (mediumSeverityCount > 2 || overallScore < 75) {
    return 'conditional'
  }

  // Ready if score >= 75 and no significant red flags
  return 'ready'
}

/**
 * Process category score inputs into scored entries
 */
export function processCategoryScores(
  inputs: CategoryScoreInput[]
): CategoryScoreEntry[] {
  return inputs.map(input => {
    const category = SCORING_CATEGORIES.find(c => c.id === input.categoryId)
    if (!category) {
      throw new Error(`Unknown category: ${input.categoryId}`)
    }

    const score = input.score ?? 0
    const weightedScore = calculateWeightedScore(score, category.weight)

    return {
      categoryId: input.categoryId,
      score,
      weight: category.weight,
      weightedScore,
      notes: input.notes || null,
    }
  })
}

/**
 * Generate default category score inputs (all empty)
 */
export function getDefaultCategoryInputs(): CategoryScoreInput[] {
  return SCORING_CATEGORIES.map(cat => ({
    categoryId: cat.id,
    score: null,
    notes: '',
  }))
}

/**
 * Calculate complete score breakdown from form data
 */
export function calculateScoreBreakdown(
  categoryInputs: CategoryScoreInput[],
  strengths: string[],
  considerations: string[],
  recommendation: string,
  selectedRedFlags: string[],
  scoredBy: string | null
): ScoreBreakdownData {
  // Process category scores
  const categories = processCategoryScores(categoryInputs)

  // Calculate overall score
  const overall = calculateOverallScore(categories)

  // Get grade
  const grade = getGradeFromScore(overall)

  // Determine distribution readiness
  const distributionReadiness = determineDistributionReadiness(overall, selectedRedFlags)

  return {
    overall,
    grade,
    categories,
    strengths: strengths.filter(s => s.trim() !== ''),
    considerations: considerations.filter(c => c.trim() !== ''),
    recommendation,
    redFlags: selectedRedFlags,
    distributionReadiness,
    scoredAt: new Date().toISOString(),
    scoredBy,
  }
}

/**
 * Get category by ID
 */
export function getCategoryById(id: ScoringCategoryId) {
  return SCORING_CATEGORIES.find(c => c.id === id)
}

/**
 * Get red flag by ID
 */
export function getRedFlagById(id: string) {
  return RED_FLAG_TEMPLATES.find(f => f.id === id)
}

/**
 * Get red flags by category
 */
export function getRedFlagsByCategory(categoryId: ScoringCategoryId) {
  return RED_FLAG_TEMPLATES.filter(f => f.category === categoryId)
}

/**
 * Get red flags by severity
 */
export function getRedFlagsBySeverity(severity: RedFlagSeverity) {
  return RED_FLAG_TEMPLATES.filter(f => f.severity === severity)
}

/**
 * Validate that all categories have been scored
 */
export function validateCategoryScores(inputs: CategoryScoreInput[]): {
  isValid: boolean
  missingCategories: ScoringCategoryId[]
} {
  const missingCategories: ScoringCategoryId[] = []

  for (const category of SCORING_CATEGORIES) {
    const input = inputs.find(i => i.categoryId === category.id)
    if (!input || input.score === null) {
      missingCategories.push(category.id)
    }
  }

  return {
    isValid: missingCategories.length === 0,
    missingCategories,
  }
}

/**
 * Generate auto-suggested strengths based on high-scoring categories
 */
export function suggestStrengths(categories: CategoryScoreEntry[]): string[] {
  const suggestions: string[] = []

  for (const cat of categories) {
    if (cat.score >= 85) {
      const category = getCategoryById(cat.categoryId)
      if (category) {
        switch (cat.categoryId) {
          case 'performance':
            suggestions.push('Strong historical performance with consistent returns')
            break
          case 'cash_flow':
            suggestions.push('Robust cash flow profile with solid coverage ratios')
            break
          case 'documentation':
            suggestions.push('Comprehensive and well-organized documentation')
            break
          case 'structure':
            suggestions.push('Sound legal structure with appropriate collateral coverage')
            break
          case 'diversification':
            suggestions.push('Well-diversified portfolio with limited concentration risk')
            break
          case 'regulatory':
            suggestions.push('Full regulatory compliance with ISIN registered')
            break
        }
      }
    }
  }

  return suggestions
}

/**
 * Generate auto-suggested considerations based on low-scoring categories
 */
export function suggestConsiderations(categories: CategoryScoreEntry[]): string[] {
  const suggestions: string[] = []

  for (const cat of categories) {
    if (cat.score < 70 && cat.score > 0) {
      switch (cat.categoryId) {
        case 'performance':
          suggestions.push('Performance history may benefit from additional seasoning')
          break
        case 'cash_flow':
          suggestions.push('Cash flow metrics should be monitored closely')
          break
        case 'documentation':
          suggestions.push('Additional documentation may strengthen the package')
          break
        case 'structure':
          suggestions.push('Structure complexity may require additional due diligence')
          break
        case 'diversification':
          suggestions.push('Concentration levels should be considered in context')
          break
        case 'regulatory':
          suggestions.push('Regulatory status may affect distribution timeline')
          break
      }
    }
  }

  return suggestions
}

/**
 * Generate recommendation template based on readiness
 */
export function generateRecommendationTemplate(
  distributionReadiness: DistributionReadiness,
  grade: ScoreGrade
): string {
  switch (distributionReadiness) {
    case 'ready':
      return `This ${grade}-grade asset meets BitCense qualification criteria and is recommended for distribution. The asset demonstrates strong fundamentals across key evaluation categories.`
    case 'conditional':
      return `This ${grade}-grade asset shows promise but has areas requiring attention before distribution. We recommend addressing the identified considerations and resubmitting for final qualification.`
    case 'not_ready':
      return `This asset does not currently meet BitCense qualification standards. Significant improvements in the identified areas would be required before reconsideration.`
  }
}
