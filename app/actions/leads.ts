'use server'

import { createClient } from '@/lib/supabase/server'
import { sendLeadNotification } from '@/lib/email/notifications'
import { AssetType } from '@/types/database'

export async function submitLead(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const company = formData.get('company') as string | null
  const phone = formData.get('phone') as string | null
  const asset_type = formData.get('asset_type') as AssetType
  const asset_value = formData.get('asset_value') as string | null
  const location = formData.get('location') as string | null
  const message = formData.get('message') as string | null

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
        company: company || null,
        phone: phone || null,
        asset_type,
        asset_value: asset_value || null,
        location: location || null,
        message: message || null,
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
        company,
        phone,
        asset_type,
        asset_value,
        location,
        message,
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
