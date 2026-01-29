export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'admin' | 'client'

export type LeadStatus = 'new' | 'invited' | 'active'

export type AssetStatus =
  | 'submitted'
  | 'under_review'
  | 'additional_info_needed'
  | 'qualified'
  | 'not_qualified'

export type AssetType =
  | 'real_estate'
  | 'equipment'
  | 'inventory'
  | 'accounts_receivable'
  | 'intellectual_property'
  | 'other'

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          email: string
          company: string | null
          phone: string | null
          asset_type: AssetType
          asset_value: string | null
          location: string | null
          message: string | null
          status: LeadStatus
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          email: string
          company?: string | null
          phone?: string | null
          asset_type: AssetType
          asset_value?: string | null
          location?: string | null
          message?: string | null
          status?: LeadStatus
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          email?: string
          company?: string | null
          phone?: string | null
          asset_type?: AssetType
          asset_value?: string | null
          location?: string | null
          message?: string | null
          status?: LeadStatus
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          name: string
          company: string | null
          phone: string | null
          role: UserRole
          lead_id: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          name: string
          company?: string | null
          phone?: string | null
          role?: UserRole
          lead_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          name?: string
          company?: string | null
          phone?: string | null
          role?: UserRole
          lead_id?: string | null
        }
      }
      assets: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          name: string
          type: AssetType
          description: string | null
          estimated_value: number | null
          location: string | null
          status: AssetStatus
          feedback: string | null
          internal_notes: string | null
          score: number | null
          grade: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          name: string
          type: AssetType
          description?: string | null
          estimated_value?: number | null
          location?: string | null
          status?: AssetStatus
          feedback?: string | null
          internal_notes?: string | null
          score?: number | null
          grade?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          name?: string
          type?: AssetType
          description?: string | null
          estimated_value?: number | null
          location?: string | null
          status?: AssetStatus
          feedback?: string | null
          internal_notes?: string | null
          score?: number | null
          grade?: string | null
        }
      }
      documents: {
        Row: {
          id: string
          created_at: string
          asset_id: string
          user_id: string
          name: string
          file_path: string
          file_type: string
          file_size: number
        }
        Insert: {
          id?: string
          created_at?: string
          asset_id: string
          user_id: string
          name: string
          file_path: string
          file_type: string
          file_size: number
        }
        Update: {
          id?: string
          created_at?: string
          asset_id?: string
          user_id?: string
          name?: string
          file_path?: string
          file_type?: string
          file_size?: number
        }
      }
      activity_log: {
        Row: {
          id: string
          created_at: string
          asset_id: string
          user_id: string | null
          action: string
          details: string | null
          old_value: string | null
          new_value: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          asset_id: string
          user_id?: string | null
          action: string
          details?: string | null
          old_value?: string | null
          new_value?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          asset_id?: string
          user_id?: string | null
          action?: string
          details?: string | null
          old_value?: string | null
          new_value?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: UserRole
      lead_status: LeadStatus
      asset_status: AssetStatus
      asset_type: AssetType
    }
  }
}

// Convenience types
export type Lead = Database['public']['Tables']['leads']['Row']
export type LeadInsert = Database['public']['Tables']['leads']['Insert']
export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type Asset = Database['public']['Tables']['assets']['Row']
export type AssetInsert = Database['public']['Tables']['assets']['Insert']
export type Document = Database['public']['Tables']['documents']['Row']
export type DocumentInsert = Database['public']['Tables']['documents']['Insert']
export type ActivityLog = Database['public']['Tables']['activity_log']['Row']
export type ActivityLogInsert = Database['public']['Tables']['activity_log']['Insert']

// Extended types with relations
export type AssetWithUser = Asset & {
  users: Pick<User, 'id' | 'name' | 'email' | 'company'>
}

export type AssetWithDocuments = Asset & {
  documents: Document[]
}

export type AssetWithActivity = Asset & {
  activity_log: ActivityLog[]
}

export type AssetFull = Asset & {
  users: Pick<User, 'id' | 'name' | 'email' | 'company'>
  documents: Document[]
  activity_log: ActivityLog[]
}
