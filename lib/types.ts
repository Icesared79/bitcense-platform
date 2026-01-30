/**
 * BitCense Connect Type Definitions
 * Core data models for the platform
 */

// ============================================================================
// USER & AUTH TYPES
// ============================================================================

export type UserRole = 'admin' | 'client'

export interface User {
  id: string
  email: string
  role: UserRole
  full_name: string | null
  company_name: string | null
  phone: string | null
  linkedin_url: string | null
  created_at: string
  updated_at: string
  last_login_at: string | null
  lead_id: string | null // Links back to original lead if converted
}

// ============================================================================
// LEAD TYPES (from landing page)
// ============================================================================

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'invited' | 'converted'

export interface Lead {
  id: string
  name: string
  email: string
  asset_type: AssetType
  location: 'us' | 'non_us'
  linkedin_url: string | null
  status: LeadStatus
  notes: string | null
  created_at: string
  updated_at: string
  contacted_at: string | null
  invited_at: string | null
  converted_at: string | null
  converted_user_id: string | null
}

// ============================================================================
// ASSET TYPES
// ============================================================================

export type AssetType =
  | 'private_credit_fund'
  | 'clo_structured_credit'
  | 'asset_backed_securities'
  | 'real_estate_debt'
  | 'tokenized_real_estate'
  | 'trade_finance'
  | 'other'

export const ASSET_TYPE_LABELS: Record<AssetType, string> = {
  private_credit_fund: 'Private Credit Fund',
  clo_structured_credit: 'CLO / Structured Credit',
  asset_backed_securities: 'Asset-Backed Securities',
  real_estate_debt: 'Real Estate Debt',
  tokenized_real_estate: 'Tokenized Real Estate',
  trade_finance: 'Trade Finance',
  other: 'Other',
}

export type AssetStatus =
  | 'submitted'
  | 'in_review'
  | 'qualification_complete'
  | 'sent_to_distribution'
  | 'live'
  | 'rejected'

export const ASSET_STATUS_CONFIG: Record<AssetStatus, {
  label: string
  description: string
  color: string
  bgColor: string
}> = {
  submitted: {
    label: 'Submitted',
    description: 'Asset has been submitted for review',
    color: '#1e40af',
    bgColor: '#dbeafe',
  },
  in_review: {
    label: 'In Review',
    description: 'Our team is reviewing your asset',
    color: '#92400e',
    bgColor: '#fef3c7',
  },
  qualification_complete: {
    label: 'Qualification Complete',
    description: 'Asset has been scored and qualified',
    color: '#166534',
    bgColor: '#dcfce7',
  },
  sent_to_distribution: {
    label: 'Sent to Distribution Partner',
    description: 'Package sent to distribution partner',
    color: '#7c3aed',
    bgColor: '#f3e8ff',
  },
  live: {
    label: 'Live',
    description: 'Asset is live on distribution platform',
    color: '#065f46',
    bgColor: '#d1fae5',
  },
  rejected: {
    label: 'Not Qualified',
    description: 'Asset did not meet qualification criteria',
    color: '#dc2626',
    bgColor: '#fee2e2',
  },
}

export type ScoreGrade = 'A' | 'B' | 'C' | 'D' | 'F'

export interface Asset {
  id: string
  user_id: string

  // Basic info
  name: string
  asset_type: AssetType
  description: string | null

  // Identifiers
  isin: string | null
  cusip: string | null

  // Financial details
  target_raise: number | null
  minimum_investment: number | null
  target_yield: number | null
  term_months: number | null

  // Structure
  issuer_name: string | null
  issuer_jurisdiction: string | null
  fund_structure: string | null

  // Status & scoring
  status: AssetStatus
  score: number | null // 0-100
  grade: ScoreGrade | null

  // Admin feedback
  feedback: string | null // Visible to client
  internal_notes: string | null // Admin only
  recommendation: string | null

  // Timestamps
  created_at: string
  updated_at: string
  submitted_at: string | null
  review_started_at: string | null
  qualification_completed_at: string | null
  sent_to_distribution_at: string | null

  // Scoring breakdown (stored as JSON)
  score_breakdown: ScoreBreakdown | null
}

// ============================================================================
// SCORING TYPES
// ============================================================================

export interface ScoreBreakdown {
  overall: number
  grade: ScoreGrade
  categories: ScoreCategory[]
  strengths: string[]
  considerations: string[]
  recommendation: string
  scored_at: string
  scored_by: string | null
}

export interface ScoreCategory {
  name: string
  weight: number // 0-100, should sum to 100
  score: number // 0-100
  weighted_score: number // score * (weight/100)
  notes: string | null
  metrics: ScoreMetric[]
}

export interface ScoreMetric {
  name: string
  value: string | number | null
  benchmark: string | null
  status: 'good' | 'fair' | 'poor' | 'unknown'
}

// Scoring category configuration
export const SCORING_CATEGORIES = [
  {
    id: 'performance',
    name: 'Performance',
    weight: 25,
    description: 'Track record, historical returns, default rates',
  },
  {
    id: 'cash_flow',
    name: 'Cash Flow Quality',
    weight: 25,
    description: 'Yield profile, payment consistency, coverage ratios',
  },
  {
    id: 'documentation',
    name: 'Documentation',
    weight: 20,
    description: 'Completeness of offering docs, data availability',
  },
  {
    id: 'structure',
    name: 'Collateral / Structure',
    weight: 15,
    description: 'Underlying assets, legal structure, seniority',
  },
  {
    id: 'diversification',
    name: 'Diversification',
    weight: 10,
    description: 'Concentration risk, geographic spread',
  },
  {
    id: 'regulatory',
    name: 'Regulatory Readiness',
    weight: 5,
    description: 'ISIN status, compliance docs, jurisdiction',
  },
] as const

// ============================================================================
// DOCUMENT TYPES
// ============================================================================

export type DocumentCategory =
  | 'prospectus'
  | 'offering_memorandum'
  | 'financial_statements'
  | 'performance_data'
  | 'legal_structure'
  | 'compliance'
  | 'marketing'
  | 'other'

export const DOCUMENT_CATEGORY_LABELS: Record<DocumentCategory, string> = {
  prospectus: 'Prospectus',
  offering_memorandum: 'Offering Memorandum',
  financial_statements: 'Financial Statements',
  performance_data: 'Performance Data',
  legal_structure: 'Legal Structure Documents',
  compliance: 'Compliance Documents',
  marketing: 'Marketing Materials',
  other: 'Other',
}

export type DocumentStatus = 'pending' | 'uploaded' | 'approved' | 'rejected'

export interface Document {
  id: string
  asset_id: string
  user_id: string

  name: string
  category: DocumentCategory
  file_path: string
  file_size: number
  mime_type: string

  status: DocumentStatus
  notes: string | null

  uploaded_at: string
  reviewed_at: string | null
  reviewed_by: string | null
}

// ============================================================================
// ACTIVITY LOG TYPES
// ============================================================================

export type ActivityType =
  | 'asset_created'
  | 'asset_updated'
  | 'status_changed'
  | 'document_uploaded'
  | 'document_reviewed'
  | 'score_updated'
  | 'feedback_added'
  | 'note_added'
  | 'sent_to_partner'

export interface ActivityLog {
  id: string
  asset_id: string
  user_id: string | null // null for system actions

  activity_type: ActivityType
  description: string

  // Store changes as JSON
  previous_value: Record<string, unknown> | null
  new_value: Record<string, unknown> | null

  // Visibility
  is_client_visible: boolean

  created_at: string
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface LeadFormData {
  name: string
  email: string
  asset_type: AssetType
  location: 'us' | 'non_us'
  linkedin_url?: string
}

export interface AssetFormData {
  name: string
  asset_type: AssetType
  description?: string
  isin?: string
  cusip?: string
  target_raise?: number
  minimum_investment?: number
  target_yield?: number
  term_months?: number
  issuer_name?: string
  issuer_jurisdiction?: string
  fund_structure?: string
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

// For creating new records (omit auto-generated fields)
export type CreateLead = Omit<Lead, 'id' | 'created_at' | 'updated_at' | 'contacted_at' | 'invited_at' | 'converted_at' | 'converted_user_id'>
export type CreateAsset = Omit<Asset, 'id' | 'created_at' | 'updated_at' | 'score' | 'grade' | 'score_breakdown' | 'feedback' | 'internal_notes' | 'recommendation'>
export type CreateDocument = Omit<Document, 'id' | 'uploaded_at' | 'reviewed_at' | 'reviewed_by' | 'status'>

// For updating records
export type UpdateAsset = Partial<Omit<Asset, 'id' | 'user_id' | 'created_at'>>
export type UpdateLead = Partial<Omit<Lead, 'id' | 'created_at'>>
