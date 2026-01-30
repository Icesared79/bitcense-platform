'use server'

import { createClient } from '@/lib/supabase/server'
import { sendLeadNotification } from '@/lib/email/notifications'
import type { AssetType } from '@/lib/types'

export async function submitLead(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const asset_type = formData.get('asset_type') as AssetType
  const location = (formData.get('location') as 'us' | 'non_us') || 'us'
  const linkedin_url = formData.get('linkedin') as string | null

  // Validate required fields
  if (!name || !email || !asset_type) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        asset_type,
        location,
        linkedin_url: linkedin_url || null,
        status: 'new',
      })
      .select()
      .single()

    if (error) {
      console.error('Error inserting lead:', error)
      return { success: false, error: 'Failed to submit. Please try again.' }
    }

    // Send notification email to admin
    try {
      await sendLeadNotification({
        name,
        email,
        asset_type,
        location,
        linkedin_url,
      })
    } catch (emailError) {
      // Log but don't fail the submission if email fails
      console.error('Failed to send notification email:', emailError)
    }

    return { success: true, data }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}
