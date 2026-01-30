/**
 * Supabase Database Types
 * Generated from BitCense Connect schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Re-export types from lib/types for convenience
export type {
  UserRole,
  LeadStatus,
  AssetType,
  AssetStatus,
  ScoreGrade,
  DocumentCategory,
  DocumentStatus,
  ActivityType,
  User,
  Lead,
  Asset,
  Document,
  ActivityLog,
  ScoreBreakdown,
  ScoreCategory,
  ScoreMetric,
} from '@/lib/types'

import type {
  UserRole,
  LeadStatus,
  AssetType,
  AssetStatus,
  ScoreGrade,
  DocumentCategory,
  DocumentStatus,
  ActivityType,
} from '@/lib/types'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: UserRole
          full_name: string | null
          company_name: string | null
          phone: string | null
          linkedin_url: string | null
          lead_id: string | null
          created_at: string
          updated_at: string
          last_login_at: string | null
        }
        Insert: {
          id: string
          email: string
          role?: UserRole
          full_name?: string | null
          company_name?: string | null
          phone?: string | null
          linkedin_url?: string | null
          lead_id?: string | null
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: UserRole
          full_name?: string | null
          company_name?: string | null
          phone?: string | null
          linkedin_url?: string | null
          lead_id?: string | null
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
        }
      }
      leads: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          email: string
          asset_type: AssetType
          location: 'us' | 'non_us'
          linkedin_url?: string | null
          status?: LeadStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
          contacted_at?: string | null
          invited_at?: string | null
          converted_at?: string | null
          converted_user_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          asset_type?: AssetType
          location?: 'us' | 'non_us'
          linkedin_url?: string | null
          status?: LeadStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
          contacted_at?: string | null
          invited_at?: string | null
          converted_at?: string | null
          converted_user_id?: string | null
        }
      }
      assets: {
        Row: {
          id: string
          user_id: string
          name: string
          asset_type: AssetType
          description: string | null
          isin: string | null
          cusip: string | null
          target_raise: number | null
          minimum_investment: number | null
          target_yield: number | null
          term_months: number | null
          issuer_name: string | null
          issuer_jurisdiction: string | null
          fund_structure: string | null
          status: AssetStatus
          score: number | null
          grade: ScoreGrade | null
          feedback: string | null
          internal_notes: string | null
          recommendation: string | null
          score_breakdown: Json | null
          created_at: string
          updated_at: string
          submitted_at: string | null
          review_started_at: string | null
          qualification_completed_at: string | null
          sent_to_distribution_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          asset_type: AssetType
          description?: string | null
          isin?: string | null
          cusip?: string | null
          target_raise?: number | null
          minimum_investment?: number | null
          target_yield?: number | null
          term_months?: number | null
          issuer_name?: string | null
          issuer_jurisdiction?: string | null
          fund_structure?: string | null
          status?: AssetStatus
          score?: number | null
          grade?: ScoreGrade | null
          feedback?: string | null
          internal_notes?: string | null
          recommendation?: string | null
          score_breakdown?: Json | null
          created_at?: string
          updated_at?: string
          submitted_at?: string | null
          review_started_at?: string | null
          qualification_completed_at?: string | null
          sent_to_distribution_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          asset_type?: AssetType
          description?: string | null
          isin?: string | null
          cusip?: string | null
          target_raise?: number | null
          minimum_investment?: number | null
          target_yield?: number | null
          term_months?: number | null
          issuer_name?: string | null
          issuer_jurisdiction?: string | null
          fund_structure?: string | null
          status?: AssetStatus
          score?: number | null
          grade?: ScoreGrade | null
          feedback?: string | null
          internal_notes?: string | null
          recommendation?: string | null
          score_breakdown?: Json | null
          created_at?: string
          updated_at?: string
          submitted_at?: string | null
          review_started_at?: string | null
          qualification_completed_at?: string | null
          sent_to_distribution_at?: string | null
        }
      }
      documents: {
        Row: {
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
        Insert: {
          id?: string
          asset_id: string
          user_id: string
          name: string
          category: DocumentCategory
          file_path: string
          file_size: number
          mime_type: string
          status?: DocumentStatus
          notes?: string | null
          uploaded_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
        Update: {
          id?: string
          asset_id?: string
          user_id?: string
          name?: string
          category?: DocumentCategory
          file_path?: string
          file_size?: number
          mime_type?: string
          status?: DocumentStatus
          notes?: string | null
          uploaded_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
      }
      activity_log: {
        Row: {
          id: string
          asset_id: string
          user_id: string | null
          activity_type: ActivityType
          description: string
          previous_value: Json | null
          new_value: Json | null
          is_client_visible: boolean
          created_at: string
        }
        Insert: {
          id?: string
          asset_id: string
          user_id?: string | null
          activity_type: ActivityType
          description: string
          previous_value?: Json | null
          new_value?: Json | null
          is_client_visible?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          asset_id?: string
          user_id?: string | null
          activity_type?: ActivityType
          description?: string
          previous_value?: Json | null
          new_value?: Json | null
          is_client_visible?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      user_role: UserRole
      lead_status: LeadStatus
      asset_type: AssetType
      asset_status: AssetStatus
      score_grade: ScoreGrade
      document_category: DocumentCategory
      document_status: DocumentStatus
      activity_type: ActivityType
    }
  }
}

// Convenience types for database operations
export type LeadRow = Database['public']['Tables']['leads']['Row']
export type LeadInsert = Database['public']['Tables']['leads']['Insert']
export type LeadUpdate = Database['public']['Tables']['leads']['Update']

export type UserRow = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export type AssetRow = Database['public']['Tables']['assets']['Row']
export type AssetInsert = Database['public']['Tables']['assets']['Insert']
export type AssetUpdate = Database['public']['Tables']['assets']['Update']

export type DocumentRow = Database['public']['Tables']['documents']['Row']
export type DocumentInsert = Database['public']['Tables']['documents']['Insert']
export type DocumentUpdate = Database['public']['Tables']['documents']['Update']

export type ActivityLogRow = Database['public']['Tables']['activity_log']['Row']
export type ActivityLogInsert = Database['public']['Tables']['activity_log']['Insert']
export type ActivityLogUpdate = Database['public']['Tables']['activity_log']['Update']

// Extended types with relations
export type AssetWithUser = AssetRow & {
  users: Pick<UserRow, 'id' | 'full_name' | 'email' | 'company_name'>
}

export type AssetWithDocuments = AssetRow & {
  documents: DocumentRow[]
}

export type AssetWithActivity = AssetRow & {
  activity_log: ActivityLogRow[]
}

export type AssetFull = AssetRow & {
  users: Pick<UserRow, 'id' | 'full_name' | 'email' | 'company_name'>
  documents: DocumentRow[]
  activity_log: ActivityLogRow[]
}
