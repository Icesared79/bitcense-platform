import { Resend } from 'resend'
import { ASSET_TYPE_LABELS, ASSET_STATUS_CONFIG, type AssetType, type AssetStatus, type ScoreGrade } from '@/lib/types'
import {
  emailWrapper,
  emailHeader,
  emailBody,
  emailFooter,
  primaryButton,
  secondaryButton,
  infoBox,
  statusBadge,
  dataTable,
  tableRow,
  scoreDisplay,
  bulletList,
  heading,
  paragraph,
  divider,
  link,
} from './templates'

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@bitcense.com'
const FROM_EMAIL = 'BitCense <notifications@bitcense.com>'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://connect.bitcense.com'

// ============================================================================
// ADMIN NOTIFICATIONS
// ============================================================================

interface LeadNotificationData {
  name: string
  email: string
  asset_type: AssetType
  location: 'us' | 'non_us'
  linkedin_url: string | null
}

export async function sendLeadNotification(data: LeadNotificationData) {
  const locationLabels: Record<string, string> = {
    us: 'United States',
    non_us: 'Non-US',
  }

  const content = emailWrapper(`
    ${emailHeader('New Lead Submission')}
    ${emailBody(`
      ${heading('New Lead Received', 2)}
      ${paragraph('A new lead has been submitted through the BitCense Connect website.')}

      ${dataTable(`
        ${tableRow('Name', data.name)}
        ${tableRow('Email', link(data.email, `mailto:${data.email}`))}
        ${tableRow('Asset Type', ASSET_TYPE_LABELS[data.asset_type])}
        ${tableRow('Location', locationLabels[data.location])}
        ${data.linkedin_url ? tableRow('LinkedIn', link('View Profile', data.linkedin_url), true) : tableRow('LinkedIn', 'Not provided', true)}
      `)}

      ${primaryButton('View in Admin Panel', `${APP_URL}/admin/leads`)}
    `)}
    ${emailFooter('This is an automated notification for BitCense administrators.')}
  `)

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Lead: ${data.name} - ${ASSET_TYPE_LABELS[data.asset_type]}`,
    html: content,
  })

  if (error) {
    console.error('Failed to send lead notification:', error)
    throw error
  }
}

interface AssetSubmittedNotificationData {
  clientName: string
  clientEmail: string
  assetName: string
  assetType: AssetType
  assetId: string
  targetRaise?: number
  isin?: string
}

export async function sendAssetSubmittedNotification(data: AssetSubmittedNotificationData) {
  const content = emailWrapper(`
    ${emailHeader('New Asset Submission')}
    ${emailBody(`
      ${heading('New Security Submitted', 2)}
      ${paragraph(`${data.clientName} has submitted a new security for qualification review.`)}

      ${dataTable(`
        ${tableRow('Security Name', data.assetName)}
        ${tableRow('Asset Type', ASSET_TYPE_LABELS[data.assetType])}
        ${tableRow('Client', `${data.clientName} (${data.clientEmail})`)}
        ${data.isin ? tableRow('ISIN', data.isin) : ''}
        ${data.targetRaise ? tableRow('Target Raise', `$${(data.targetRaise / 100).toLocaleString()}`, true) : tableRow('Target Raise', 'Not specified', true)}
      `)}

      ${primaryButton('Review Asset', `${APP_URL}/admin/assets/${data.assetId}`)}
    `)}
    ${emailFooter('This is an automated notification for BitCense administrators.')}
  `)

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Asset: ${data.assetName} from ${data.clientName}`,
    html: content,
  })

  if (error) {
    console.error('Failed to send asset submitted notification:', error)
    throw error
  }
}

// ============================================================================
// CLIENT NOTIFICATIONS
// ============================================================================

interface PortalInviteData {
  name: string
  email: string
  magicLink: string
}

export async function sendPortalInvite(data: PortalInviteData) {
  const content = emailWrapper(`
    ${emailHeader()}
    ${emailBody(`
      ${heading(`Welcome, ${data.name}!`, 2)}
      ${paragraph("You've been invited to access the BitCense Connect client portal. Through the portal, you can:")}

      ${bulletList([
        'Submit securities for qualification review',
        'Track the status of your submissions',
        'Upload supporting documents',
        'View qualification scores and feedback',
        'Monitor distribution progress',
      ])}

      ${primaryButton('Access Your Portal', data.magicLink)}

      ${infoBox('This link will expire in 24 hours. If you need a new link, visit our login page.', 'info')}
    `)}
    ${emailFooter("If you didn't request access to BitCense Connect, you can safely ignore this email.")}
  `)

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: 'Welcome to BitCense Connect - Access Your Client Portal',
    html: content,
  })

  if (error) {
    console.error('Failed to send portal invite:', error)
    throw error
  }
}

interface StatusUpdateData {
  name: string
  email: string
  assetName: string
  assetId: string
  oldStatus: AssetStatus
  newStatus: AssetStatus
  feedback?: string
}

export async function sendStatusUpdate(data: StatusUpdateData) {
  const statusConfig = ASSET_STATUS_CONFIG[data.newStatus]

  const getVariant = (status: AssetStatus): 'success' | 'warning' | 'error' | 'info' => {
    if (status === 'qualification_complete' || status === 'live') return 'success'
    if (status === 'in_review' || status === 'sent_to_distribution') return 'warning'
    if (status === 'rejected') return 'error'
    return 'info'
  }

  const content = emailWrapper(`
    ${emailHeader('Status Update')}
    ${emailBody(`
      ${heading('Your Security Status Has Changed', 2)}
      ${paragraph(`Hi ${data.name},`)}
      ${paragraph(`The status of <strong>${data.assetName}</strong> has been updated.`)}

      <div style="text-align: center; padding: 20px 0;">
        ${statusBadge(statusConfig.label, getVariant(data.newStatus))}
      </div>

      ${infoBox(statusConfig.description, getVariant(data.newStatus))}

      ${data.feedback ? `
        ${divider()}
        ${heading('Reviewer Feedback', 3)}
        ${paragraph(data.feedback)}
      ` : ''}

      ${primaryButton('View Details', `${APP_URL}/assets/${data.assetId}`)}
    `)}
    ${emailFooter()}
  `)

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: `BitCense: ${data.assetName} - ${statusConfig.label}`,
    html: content,
  })

  if (error) {
    console.error('Failed to send status update:', error)
    throw error
  }
}

interface QualificationCompleteData {
  name: string
  email: string
  assetName: string
  assetId: string
  score: number
  grade: ScoreGrade
  strengths: string[]
  considerations: string[]
  recommendation?: string
  isQualified: boolean
}

export async function sendQualificationComplete(data: QualificationCompleteData) {
  const content = emailWrapper(`
    ${emailHeader(data.isQualified ? 'Qualification Complete' : 'Qualification Results')}
    ${emailBody(`
      ${heading(data.isQualified ? 'Your Security Has Been Qualified!' : 'Qualification Results', 2)}
      ${paragraph(`Hi ${data.name},`)}
      ${paragraph(`We have completed the qualification review for <strong>${data.assetName}</strong>.`)}

      ${scoreDisplay(data.score, data.grade)}

      ${data.isQualified ?
        infoBox('Your security has met our qualification criteria and will be prepared for distribution to our partner network.', 'success') :
        infoBox('Your security did not meet the minimum qualification criteria at this time. Please review the feedback below.', 'error')
      }

      ${data.strengths.length > 0 ? `
        ${divider()}
        ${heading('Strengths', 3)}
        ${bulletList(data.strengths)}
      ` : ''}

      ${data.considerations.length > 0 ? `
        ${heading('Areas for Consideration', 3)}
        ${bulletList(data.considerations)}
      ` : ''}

      ${data.recommendation ? `
        ${divider()}
        ${heading('Our Recommendation', 3)}
        ${paragraph(data.recommendation)}
      ` : ''}

      ${primaryButton('View Full Report', `${APP_URL}/assets/${data.assetId}`)}
    `)}
    ${emailFooter()}
  `)

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: `BitCense: ${data.assetName} - Qualification ${data.isQualified ? 'Complete' : 'Results'}`,
    html: content,
  })

  if (error) {
    console.error('Failed to send qualification complete:', error)
    throw error
  }
}

interface DocumentRequestData {
  name: string
  email: string
  assetName: string
  assetId: string
  requestedDocuments: string[]
  message?: string
}

export async function sendDocumentRequest(data: DocumentRequestData) {
  const content = emailWrapper(`
    ${emailHeader('Document Request')}
    ${emailBody(`
      ${heading('Additional Documents Needed', 2)}
      ${paragraph(`Hi ${data.name},`)}
      ${paragraph(`To continue the qualification review for <strong>${data.assetName}</strong>, we need the following documents:`)}

      ${bulletList(data.requestedDocuments)}

      ${data.message ? `
        ${divider()}
        ${heading('Additional Notes', 3)}
        ${paragraph(data.message)}
      ` : ''}

      ${infoBox('Please upload these documents through your portal as soon as possible to avoid delays in the review process.', 'warning')}

      ${primaryButton('Upload Documents', `${APP_URL}/assets/${data.assetId}`)}
    `)}
    ${emailFooter()}
  `)

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: `BitCense: ${data.assetName} - Documents Requested`,
    html: content,
  })

  if (error) {
    console.error('Failed to send document request:', error)
    throw error
  }
}

interface DistributionUpdateData {
  name: string
  email: string
  assetName: string
  assetId: string
  partnerName?: string
  message?: string
  isLive: boolean
}

export async function sendDistributionUpdate(data: DistributionUpdateData) {
  const content = emailWrapper(`
    ${emailHeader(data.isLive ? 'Now Live!' : 'Distribution Update')}
    ${emailBody(`
      ${heading(data.isLive ? 'Your Security is Now Live!' : 'Distribution Update', 2)}
      ${paragraph(`Hi ${data.name},`)}

      ${data.isLive ?
        paragraph(`Great news! <strong>${data.assetName}</strong> is now live and available to investors through our distribution network.`) :
        paragraph(`We have an update on the distribution status of <strong>${data.assetName}</strong>.`)
      }

      ${data.partnerName ?
        infoBox(`Your security has been sent to <strong>${data.partnerName}</strong> for distribution.`, 'success') : ''
      }

      ${data.message ? `
        ${divider()}
        ${heading('Details', 3)}
        ${paragraph(data.message)}
      ` : ''}

      ${data.isLive ?
        infoBox('You can track investor interest and activity through your portal.', 'info') : ''
      }

      ${primaryButton('View in Portal', `${APP_URL}/assets/${data.assetId}`)}
    `)}
    ${emailFooter()}
  `)

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: `BitCense: ${data.assetName} - ${data.isLive ? 'Now Live!' : 'Distribution Update'}`,
    html: content,
  })

  if (error) {
    console.error('Failed to send distribution update:', error)
    throw error
  }
}

interface WelcomeEmailData {
  name: string
  email: string
}

export async function sendWelcomeEmail(data: WelcomeEmailData) {
  const content = emailWrapper(`
    ${emailHeader()}
    ${emailBody(`
      ${heading(`Welcome to BitCense Connect!`, 2)}
      ${paragraph(`Hi ${data.name},`)}
      ${paragraph("Thank you for joining BitCense Connect. We're excited to help you reach global distribution partners for your alternative assets.")}

      ${heading('Getting Started', 3)}
      ${bulletList([
        '<strong>Submit a Security</strong> - Add your first asset for qualification review',
        '<strong>Upload Documents</strong> - Provide offering memorandums, performance data, and other supporting materials',
        '<strong>Track Progress</strong> - Monitor your submissions through our qualification process',
        '<strong>Go to Market</strong> - Qualified securities are packaged and sent to our distribution partners',
      ])}

      ${infoBox("Have questions? Our team is here to help. Reply to this email or reach out through your portal.", 'info')}

      ${primaryButton('Go to Dashboard', `${APP_URL}/dashboard`)}
    `)}
    ${emailFooter()}
  `)

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: 'Welcome to BitCense Connect!',
    html: content,
  })

  if (error) {
    console.error('Failed to send welcome email:', error)
    throw error
  }
}

// ============================================================================
// DIGEST EMAILS (for future use)
// ============================================================================

interface WeeklyDigestData {
  name: string
  email: string
  newLeadsCount: number
  assetsInReview: number
  assetsQualified: number
  assetsSentToDistribution: number
}

export async function sendAdminWeeklyDigest(data: WeeklyDigestData) {
  const content = emailWrapper(`
    ${emailHeader('Weekly Summary')}
    ${emailBody(`
      ${heading('This Week at BitCense Connect', 2)}
      ${paragraph(`Hi ${data.name}, here's your weekly summary.`)}

      ${dataTable(`
        ${tableRow('New Leads', String(data.newLeadsCount))}
        ${tableRow('Assets In Review', String(data.assetsInReview))}
        ${tableRow('Assets Qualified', String(data.assetsQualified))}
        ${tableRow('Sent to Distribution', String(data.assetsSentToDistribution), true)}
      `)}

      ${primaryButton('View Dashboard', `${APP_URL}/admin`)}
    `)}
    ${emailFooter('This is your weekly admin digest from BitCense Connect.')}
  `)

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: 'BitCense Connect - Weekly Summary',
    html: content,
  })

  if (error) {
    console.error('Failed to send weekly digest:', error)
    throw error
  }
}
