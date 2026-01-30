'use server'

import { createClient, createServiceClient } from '@/lib/supabase/server'
import {
  sendPortalInvite,
  sendStatusUpdate,
  sendQualificationComplete,
  sendDistributionUpdate,
  sendDocumentRequest,
} from '@/lib/email/notifications'
import { ASSET_STATUS_CONFIG, type AssetStatus, type ActivityType, type ScoreGrade, type User, type Asset } from '@/lib/types'
import type { ScoreBreakdownData } from '@/lib/scoring'

export async function inviteLeadToPortal(leadId: string) {
  const supabase = await createClient()
  const serviceSupabase = await createServiceClient()

  // Check if user is admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  const { data: adminUser } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (adminUser?.role !== 'admin') {
    return { success: false, error: 'Not authorized' }
  }

  // Get lead info
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single()

  if (leadError || !lead) {
    return { success: false, error: 'Lead not found' }
  }

  try {
    // Create auth user using service role (bypasses RLS)
    const { data: authData, error: authError } = await serviceSupabase.auth.admin.createUser({
      email: lead.email,
      email_confirm: true,
    })

    if (authError) {
      // If user already exists, that's okay - we'll generate a magic link
      if (!authError.message.includes('already been registered')) {
        console.error('Auth error:', authError)
        return { success: false, error: 'Failed to create user account' }
      }
    }

    const userId = authData?.user?.id

    // Create user record in users table if we have a new user ID
    if (userId) {
      const { error: userError } = await serviceSupabase.from('users').insert({
        id: userId,
        email: lead.email,
        full_name: lead.name,
        linkedin_url: lead.linkedin_url,
        role: 'client',
        lead_id: lead.id,
      })

      if (userError && !userError.message.includes('duplicate')) {
        console.error('User insert error:', userError)
      }
    }

    // Generate magic link
    const { data: linkData, error: linkError } = await serviceSupabase.auth.admin.generateLink({
      type: 'magiclink',
      email: lead.email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
      },
    })

    if (linkError) {
      console.error('Link error:', linkError)
      return { success: false, error: 'Failed to generate invitation link' }
    }

    // Send invitation email
    await sendPortalInvite({
      name: lead.name,
      email: lead.email,
      magicLink: linkData.properties.action_link,
    })

    // Update lead status
    await supabase
      .from('leads')
      .update({
        status: 'invited',
        invited_at: new Date().toISOString(),
      })
      .eq('id', leadId)

    return { success: true }
  } catch (err) {
    console.error('Invitation error:', err)
    return { success: false, error: 'Failed to send invitation' }
  }
}

export async function updateAssetStatus(
  assetId: string,
  updates: {
    status?: AssetStatus
    feedback?: string | null
    internal_notes?: string | null
    score?: number | null
    grade?: string | null
    recommendation?: string | null
    score_breakdown?: Record<string, unknown> | null
  },
  options?: {
    sendEmail?: boolean
  }
) {
  const supabase = await createClient()

  // Check if user is admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  const { data: adminUser } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (adminUser?.role !== 'admin') {
    return { success: false, error: 'Not authorized' }
  }

  // Get current asset state with user info for activity logging and email
  const { data: currentAsset } = await supabase
    .from('assets')
    .select(`
      *,
      users (id, full_name, email)
    `)
    .eq('id', assetId)
    .single()

  if (!currentAsset) {
    return { success: false, error: 'Asset not found' }
  }

  const assetWithUser = currentAsset as Asset & { users: Pick<User, 'id' | 'full_name' | 'email'> | null }
  const oldStatus = assetWithUser.status

  // Build update object with timestamps
  const updateData: Record<string, unknown> = { ...updates }

  if (updates.status === 'in_review' && oldStatus === 'submitted') {
    updateData.review_started_at = new Date().toISOString()
  }
  if (updates.status === 'qualification_complete') {
    updateData.qualification_completed_at = new Date().toISOString()
  }
  if (updates.status === 'sent_to_distribution') {
    updateData.sent_to_distribution_at = new Date().toISOString()
  }

  // Update asset
  const { error } = await supabase
    .from('assets')
    .update(updateData)
    .eq('id', assetId)

  if (error) {
    console.error('Update error:', error)
    return { success: false, error: 'Failed to update asset' }
  }

  // Log status change
  if (updates.status && updates.status !== oldStatus) {
    const statusConfig = ASSET_STATUS_CONFIG[updates.status]
    await logActivity(supabase, {
      asset_id: assetId,
      user_id: user.id,
      activity_type: 'status_changed',
      description: `Status changed to ${statusConfig.label}`,
      previous_value: { status: oldStatus },
      new_value: { status: updates.status },
      is_client_visible: true,
    })

    // Send email notification for status changes if enabled
    const shouldSendEmail = options?.sendEmail !== false
    if (shouldSendEmail && assetWithUser.users?.email) {
      try {
        // Check if this is a qualification complete with score breakdown
        if (
          (updates.status === 'qualification_complete' || updates.status === 'rejected') &&
          updates.score_breakdown
        ) {
          const breakdown = updates.score_breakdown as unknown as ScoreBreakdownData
          await sendQualificationComplete({
            name: assetWithUser.users.full_name || 'Client',
            email: assetWithUser.users.email,
            assetName: assetWithUser.name,
            assetId: assetId,
            score: breakdown.overall,
            grade: breakdown.grade as ScoreGrade,
            strengths: breakdown.strengths || [],
            considerations: breakdown.considerations || [],
            recommendation: breakdown.recommendation,
            isQualified: updates.status === 'qualification_complete',
          })
        } else {
          // Send regular status update email
          await sendStatusUpdate({
            name: assetWithUser.users.full_name || 'Client',
            email: assetWithUser.users.email,
            assetName: assetWithUser.name,
            assetId: assetId,
            oldStatus: oldStatus,
            newStatus: updates.status,
            feedback: updates.feedback || undefined,
          })
        }
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError)
        // Don't fail the whole operation if email fails
      }
    }
  }

  // Log feedback update
  if (updates.feedback !== undefined) {
    await logActivity(supabase, {
      asset_id: assetId,
      user_id: user.id,
      activity_type: 'feedback_added',
      description: 'Reviewer feedback was updated',
      is_client_visible: true,
    })
  }

  // Log score/grade update
  if (updates.score !== undefined || updates.grade !== undefined) {
    await logActivity(supabase, {
      asset_id: assetId,
      user_id: user.id,
      activity_type: 'score_updated',
      description: updates.score !== undefined && updates.grade !== undefined
        ? `Score: ${updates.score}, Grade: ${updates.grade}`
        : updates.score !== undefined
          ? `Score: ${updates.score}`
          : `Grade: ${updates.grade}`,
      new_value: { score: updates.score, grade: updates.grade },
      is_client_visible: true,
    })
  }

  // Log internal notes update (not visible to client)
  if (updates.internal_notes !== undefined) {
    await logActivity(supabase, {
      asset_id: assetId,
      user_id: user.id,
      activity_type: 'note_added',
      description: 'Internal notes were updated',
      is_client_visible: false,
    })
  }

  return { success: true }
}

// Helper function to log activities
async function logActivity(
  supabase: Awaited<ReturnType<typeof createClient>>,
  data: {
    asset_id: string
    user_id: string
    activity_type: ActivityType
    description: string
    previous_value?: Record<string, unknown> | null
    new_value?: Record<string, unknown> | null
    is_client_visible: boolean
  }
) {
  try {
    await supabase.from('activity_log').insert(data)
  } catch (err) {
    console.error('Failed to log activity:', err)
  }
}

export async function sendToDistribution(assetId: string, partnerName: string) {
  const supabase = await createClient()

  // Check if user is admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  const { data: adminUser } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (adminUser?.role !== 'admin') {
    return { success: false, error: 'Not authorized' }
  }

  // Get asset with user info
  const { data: assetData } = await supabase
    .from('assets')
    .select(`
      *,
      users (id, full_name, email)
    `)
    .eq('id', assetId)
    .single()

  if (!assetData) {
    return { success: false, error: 'Asset not found' }
  }

  const assetWithUser = assetData as Asset & { users: Pick<User, 'id' | 'full_name' | 'email'> | null }

  // Update asset status
  const { error } = await supabase
    .from('assets')
    .update({
      status: 'sent_to_distribution',
      sent_to_distribution_at: new Date().toISOString(),
    })
    .eq('id', assetId)

  if (error) {
    console.error('Update error:', error)
    return { success: false, error: 'Failed to update asset status' }
  }

  // Log the activity
  await logActivity(supabase, {
    asset_id: assetId,
    user_id: user.id,
    activity_type: 'sent_to_partner',
    description: `Asset package sent to ${partnerName}`,
    new_value: { partner: partnerName },
    is_client_visible: true,
  })

  // Send distribution update email
  if (assetWithUser.users?.email) {
    try {
      await sendDistributionUpdate({
        name: assetWithUser.users.full_name || 'Client',
        email: assetWithUser.users.email,
        assetName: assetWithUser.name,
        assetId: assetId,
        partnerName: partnerName,
        isLive: false,
      })
    } catch (emailError) {
      console.error('Failed to send distribution update email:', emailError)
    }
  }

  return { success: true }
}

export async function markAssetLive(assetId: string) {
  const supabase = await createClient()

  // Check if user is admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  const { data: adminUser } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (adminUser?.role !== 'admin') {
    return { success: false, error: 'Not authorized' }
  }

  // Get asset with user info
  const { data: assetData } = await supabase
    .from('assets')
    .select(`
      *,
      users (id, full_name, email)
    `)
    .eq('id', assetId)
    .single()

  if (!assetData) {
    return { success: false, error: 'Asset not found' }
  }

  const assetWithUser = assetData as Asset & { users: Pick<User, 'id' | 'full_name' | 'email'> | null }

  // Update asset status
  const { error } = await supabase
    .from('assets')
    .update({
      status: 'live',
    })
    .eq('id', assetId)

  if (error) {
    console.error('Update error:', error)
    return { success: false, error: 'Failed to update asset status' }
  }

  // Log the activity
  await logActivity(supabase, {
    asset_id: assetId,
    user_id: user.id,
    activity_type: 'status_changed',
    description: 'Asset is now live on distribution platform',
    previous_value: { status: assetWithUser.status },
    new_value: { status: 'live' },
    is_client_visible: true,
  })

  // Send live notification email
  if (assetWithUser.users?.email) {
    try {
      await sendDistributionUpdate({
        name: assetWithUser.users.full_name || 'Client',
        email: assetWithUser.users.email,
        assetName: assetWithUser.name,
        assetId: assetId,
        isLive: true,
        message: 'Your security is now available to investors through our distribution network.',
      })
    } catch (emailError) {
      console.error('Failed to send live notification email:', emailError)
    }
  }

  return { success: true }
}

export async function requestDocuments(
  assetId: string,
  requestedDocuments: string[],
  message?: string
) {
  const supabase = await createClient()

  // Check if user is admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  const { data: adminUser } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (adminUser?.role !== 'admin') {
    return { success: false, error: 'Not authorized' }
  }

  // Get asset with user info
  const { data: assetData } = await supabase
    .from('assets')
    .select(`
      *,
      users (id, full_name, email)
    `)
    .eq('id', assetId)
    .single()

  if (!assetData) {
    return { success: false, error: 'Asset not found' }
  }

  const assetWithUser = assetData as Asset & { users: Pick<User, 'id' | 'full_name' | 'email'> | null }

  // Log the activity
  await logActivity(supabase, {
    asset_id: assetId,
    user_id: user.id,
    activity_type: 'feedback_added',
    description: `Documents requested: ${requestedDocuments.join(', ')}`,
    new_value: { requested_documents: requestedDocuments, message },
    is_client_visible: true,
  })

  // Send email notification
  if (assetWithUser.users?.email) {
    try {
      await sendDocumentRequest({
        name: assetWithUser.users.full_name || 'Client',
        email: assetWithUser.users.email,
        assetName: assetWithUser.name,
        assetId: assetId,
        requestedDocuments: requestedDocuments,
        message: message,
      })
    } catch (emailError) {
      console.error('Failed to send document request email:', emailError)
    }
  }

  return { success: true }
}
