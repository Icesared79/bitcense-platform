'use server'

import { createClient, createServiceClient } from '@/lib/supabase/server'
import { sendPortalInvite } from '@/lib/email/notifications'
import { AssetStatus } from '@/types/database'

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
        name: lead.name,
        company: lead.company,
        phone: lead.phone,
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
      .update({ status: 'invited' })
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

  // Get current asset state for activity logging
  const { data: currentAsset } = await supabase
    .from('assets')
    .select('status')
    .eq('id', assetId)
    .single()

  // Update asset
  const { error } = await supabase
    .from('assets')
    .update(updates)
    .eq('id', assetId)

  if (error) {
    console.error('Update error:', error)
    return { success: false, error: 'Failed to update asset' }
  }

  // Log status change if status was updated
  if (updates.status && currentAsset && updates.status !== currentAsset.status) {
    await supabase.from('activity_log').insert({
      asset_id: assetId,
      user_id: user.id,
      action: 'Status Changed',
      details: `Status updated from ${currentAsset.status} to ${updates.status}`,
      old_value: currentAsset.status,
      new_value: updates.status,
    })
  }

  // Log feedback update
  if (updates.feedback !== undefined) {
    await supabase.from('activity_log').insert({
      asset_id: assetId,
      user_id: user.id,
      action: 'Feedback Updated',
      details: 'Reviewer feedback was updated',
    })
  }

  // Log score/grade update
  if (updates.score !== undefined || updates.grade !== undefined) {
    await supabase.from('activity_log').insert({
      asset_id: assetId,
      user_id: user.id,
      action: 'Qualification Results Updated',
      details: updates.score !== undefined && updates.grade !== undefined
        ? `Score: ${updates.score}, Grade: ${updates.grade}`
        : updates.score !== undefined
          ? `Score: ${updates.score}`
          : `Grade: ${updates.grade}`,
    })
  }

  return { success: true }
}
