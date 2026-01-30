/**
 * BitCense Connect Scoring System Types
 *
 * This is a manual scoring system where admins review documents
 * and enter scores for each category based on their assessment.
 */

import type { ScoreGrade, AssetType } from '@/lib/types'

// ============================================================================
// SCORING CATEGORIES
// ============================================================================

export type ScoringCategoryId =
  | 'performance'
  | 'cash_flow'
  | 'documentation'
  | 'structure'
  | 'diversification'
  | 'regulatory'

export interface ScoringCategory {
  id: ScoringCategoryId
  name: string
  weight: number // 0-100, all should sum to 100
  description: string
  guidelines: string[] // What to look for when scoring
}

// The 6 scoring categories with weights
export const SCORING_CATEGORIES: ScoringCategory[] = [
  {
    id: 'performance',
    name: 'Performance',
    weight: 25,
    description: 'Track record, historical returns, default rates',
    guidelines: [
      'Review historical performance data (ideally 24+ months)',
      'Check default and delinquency rates',
      'Assess consistency of returns over time',
      'Compare performance to stated benchmarks',
      'Look for any concerning trends',
    ],
  },
  {
    id: 'cash_flow',
    name: 'Cash Flow Quality',
    weight: 25,
    description: 'Yield profile, payment consistency, coverage ratios',
    guidelines: [
      'Verify stated yield/return expectations',
      'Review payment history and consistency',
      'Check debt service coverage ratios (DSCR)',
      'Assess cash flow predictability',
      'Evaluate interest rate competitiveness',
    ],
  },
  {
    id: 'documentation',
    name: 'Documentation',
    weight: 20,
    description: 'Completeness of offering docs, data availability',
    guidelines: [
      'Verify prospectus/offering memorandum completeness',
      'Check for audited financial statements',
      'Review data room quality and organization',
      'Assess transparency of reporting',
      'Verify all required compliance documents present',
    ],
  },
  {
    id: 'structure',
    name: 'Collateral / Structure',
    weight: 15,
    description: 'Underlying assets, legal structure, seniority',
    guidelines: [
      'Review underlying asset quality',
      'Assess legal structure clarity',
      'Check seniority/subordination levels',
      'Verify collateral adequacy (LTV ratios)',
      'Review waterfall and payment priority',
    ],
  },
  {
    id: 'diversification',
    name: 'Diversification',
    weight: 10,
    description: 'Concentration risk, geographic spread',
    guidelines: [
      'Check single-issuer concentration limits',
      'Review geographic distribution',
      'Assess sector/industry diversification',
      'Verify no excessive concentration risk',
      'Review counterparty exposure limits',
    ],
  },
  {
    id: 'regulatory',
    name: 'Regulatory Readiness',
    weight: 5,
    description: 'ISIN status, compliance docs, jurisdiction',
    guidelines: [
      'Verify ISIN/CUSIP registration',
      'Check issuer licensing and registration',
      'Review jurisdiction compliance',
      'Assess regulatory filing status',
      'Verify distribution eligibility',
    ],
  },
]

// ============================================================================
// GRADE THRESHOLDS
// ============================================================================

export const GRADE_THRESHOLDS: Record<ScoreGrade, { min: number; label: string; description: string }> = {
  A: { min: 80, label: 'Excellent', description: 'Highly qualified for distribution' },
  B: { min: 70, label: 'Good', description: 'Qualified with minor considerations' },
  C: { min: 60, label: 'Fair', description: 'Qualified with conditions' },
  D: { min: 50, label: 'Needs Work', description: 'Requires improvements before distribution' },
  F: { min: 0, label: 'Not Qualified', description: 'Does not meet distribution criteria' },
}

// ============================================================================
// DISTRIBUTION READINESS
// ============================================================================

export type DistributionReadiness = 'ready' | 'conditional' | 'not_ready'

export const DISTRIBUTION_READINESS_CONFIG: Record<DistributionReadiness, {
  label: string
  description: string
  color: string
  bgColor: string
  minScore: number
  maxRedFlags: number
}> = {
  ready: {
    label: 'Ready for Distribution',
    description: 'Asset meets all criteria and can be sent to distribution partners',
    color: '#166534',
    bgColor: '#dcfce7',
    minScore: 75,
    maxRedFlags: 0,
  },
  conditional: {
    label: 'Conditional',
    description: 'Asset may qualify pending resolution of identified issues',
    color: '#92400e',
    bgColor: '#fef3c7',
    minScore: 60,
    maxRedFlags: 2,
  },
  not_ready: {
    label: 'Not Ready',
    description: 'Asset does not currently meet distribution criteria',
    color: '#dc2626',
    bgColor: '#fee2e2',
    minScore: 0,
    maxRedFlags: 999,
  },
}

// ============================================================================
// RED FLAGS
// ============================================================================

export type RedFlagSeverity = 'high' | 'medium' | 'low'

export interface RedFlag {
  id: string
  type: string
  severity: RedFlagSeverity
  message: string
  category: ScoringCategoryId
}

export const RED_FLAG_TEMPLATES: RedFlag[] = [
  // Performance red flags
  { id: 'perf_default_high', type: 'HIGH_DEFAULT_RATE', severity: 'high', message: 'Default rate exceeds acceptable threshold', category: 'performance' },
  { id: 'perf_history_short', type: 'LIMITED_HISTORY', severity: 'medium', message: 'Less than 12 months of performance history', category: 'performance' },
  { id: 'perf_trend_negative', type: 'NEGATIVE_TREND', severity: 'medium', message: 'Declining performance trend observed', category: 'performance' },

  // Cash flow red flags
  { id: 'cf_dscr_low', type: 'LOW_DSCR', severity: 'high', message: 'Debt service coverage ratio below 1.0x', category: 'cash_flow' },
  { id: 'cf_yield_unrealistic', type: 'UNREALISTIC_YIELD', severity: 'medium', message: 'Stated yield appears unrealistic for asset class', category: 'cash_flow' },
  { id: 'cf_payment_irregular', type: 'IRREGULAR_PAYMENTS', severity: 'medium', message: 'Inconsistent payment history', category: 'cash_flow' },

  // Documentation red flags
  { id: 'doc_missing_prospectus', type: 'MISSING_PROSPECTUS', severity: 'high', message: 'Prospectus or offering memorandum not provided', category: 'documentation' },
  { id: 'doc_missing_financials', type: 'MISSING_FINANCIALS', severity: 'high', message: 'Audited financial statements not available', category: 'documentation' },
  { id: 'doc_incomplete', type: 'INCOMPLETE_DOCS', severity: 'medium', message: 'Key documentation missing or incomplete', category: 'documentation' },

  // Structure red flags
  { id: 'struct_ltv_high', type: 'HIGH_LTV', severity: 'high', message: 'Loan-to-value ratio exceeds 80%', category: 'structure' },
  { id: 'struct_subordinate', type: 'SUBORDINATE_POSITION', severity: 'medium', message: 'Subordinate position in capital structure', category: 'structure' },
  { id: 'struct_unclear', type: 'UNCLEAR_STRUCTURE', severity: 'medium', message: 'Legal or fund structure not clearly defined', category: 'structure' },

  // Diversification red flags
  { id: 'div_concentration', type: 'HIGH_CONCENTRATION', severity: 'high', message: 'Single exposure exceeds 20% of portfolio', category: 'diversification' },
  { id: 'div_geographic', type: 'GEOGRAPHIC_CONCENTRATION', severity: 'medium', message: 'Limited geographic diversification', category: 'diversification' },
  { id: 'div_sector', type: 'SECTOR_CONCENTRATION', severity: 'low', message: 'Limited sector diversification', category: 'diversification' },

  // Regulatory red flags
  { id: 'reg_no_isin', type: 'NO_ISIN', severity: 'high', message: 'ISIN not registered', category: 'regulatory' },
  { id: 'reg_jurisdiction', type: 'JURISDICTION_CONCERN', severity: 'medium', message: 'Jurisdiction may limit distribution options', category: 'regulatory' },
  { id: 'reg_licensing', type: 'LICENSING_INCOMPLETE', severity: 'medium', message: 'Issuer licensing not verified', category: 'regulatory' },
]

// ============================================================================
// SCORE BREAKDOWN (stored in asset.score_breakdown)
// ============================================================================

export interface CategoryScoreEntry {
  categoryId: ScoringCategoryId
  score: number // 0-100
  weight: number // 0-100
  weightedScore: number // score * (weight / 100)
  notes: string | null
}

export interface ScoreBreakdownData {
  overall: number
  grade: ScoreGrade
  categories: CategoryScoreEntry[]
  strengths: string[]
  considerations: string[] // renamed from "concerns" - softer language
  recommendation: string
  redFlags: string[] // IDs of red flags
  distributionReadiness: DistributionReadiness
  scoredAt: string // ISO date
  scoredBy: string | null // admin user ID
}

// ============================================================================
// FORM DATA FOR ADMIN SCORING
// ============================================================================

export interface CategoryScoreInput {
  categoryId: ScoringCategoryId
  score: number | null // 0-100, null if not scored yet
  notes: string
}

export interface ScoringFormData {
  categories: CategoryScoreInput[]
  strengths: string[]
  considerations: string[]
  recommendation: string
  selectedRedFlags: string[] // IDs
}

// ============================================================================
// ASSET TYPE SPECIFIC GUIDANCE
// ============================================================================

export const ASSET_TYPE_SCORING_NOTES: Partial<Record<AssetType, string>> = {
  private_credit_fund: 'Focus on underlying loan quality, diversification across borrowers, and manager track record.',
  clo_structured_credit: 'Evaluate tranche structure, collateral quality, and waterfall mechanics carefully.',
  asset_backed_securities: 'Assess underlying asset pool quality, servicer performance, and credit enhancement levels.',
  real_estate_debt: 'Review property types, LTV ratios, geographic concentration, and borrower creditworthiness.',
  tokenized_real_estate: 'Verify tokenization structure, underlying property valuation, and regulatory compliance.',
  trade_finance: 'Evaluate counterparty risk, tenor, and trade flow documentation.',
}
