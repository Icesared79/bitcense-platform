import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@bitcense.com'
const FROM_EMAIL = 'BitCense <notifications@bitcense.com>'

interface LeadNotificationData {
  name: string
  email: string
  company: string | null
  phone: string | null
  asset_type: string
  asset_value: string | null
  location: string | null
  message: string | null
}

export async function sendLeadNotification(data: LeadNotificationData) {
  const assetTypeLabels: Record<string, string> = {
    real_estate: 'Real Estate',
    equipment: 'Equipment',
    inventory: 'Inventory',
    accounts_receivable: 'Accounts Receivable',
    intellectual_property: 'Intellectual Property',
    other: 'Other',
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Lead: ${data.name} - ${assetTypeLabels[data.asset_type] || data.asset_type}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Lead Submission</h2>
        <p>A new lead has been submitted through the BitCense website.</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 150px;">Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
              <a href="mailto:${data.email}">${data.email}</a>
            </td>
          </tr>
          ${data.company ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Company</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.company}</td>
          </tr>
          ` : ''}
          ${data.phone ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.phone}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Asset Type</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${assetTypeLabels[data.asset_type] || data.asset_type}</td>
          </tr>
          ${data.asset_value ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Est. Value</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.asset_value}</td>
          </tr>
          ` : ''}
          ${data.location ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Location</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.location}</td>
          </tr>
          ` : ''}
          ${data.message ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Message</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.message}</td>
          </tr>
          ` : ''}
        </table>

        <p style="margin-top: 20px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/leads"
             style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            View in Admin Panel
          </a>
        </p>
      </div>
    `,
  })

  if (error) {
    throw error
  }
}

interface PortalInviteData {
  name: string
  email: string
  magicLink: string
}

export async function sendPortalInvite(data: PortalInviteData) {
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: 'Welcome to BitCense - Access Your Client Portal',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px;">
          <h1 style="color: #2563eb;">BitCense</h1>
        </div>

        <h2>Welcome, ${data.name}!</h2>

        <p>You've been invited to access the BitCense client portal. Through the portal, you can:</p>

        <ul>
          <li>Submit assets for qualification</li>
          <li>Track the status of your submissions</li>
          <li>Upload supporting documents</li>
          <li>View feedback and qualification results</li>
        </ul>

        <p style="margin-top: 30px; text-align: center;">
          <a href="${data.magicLink}"
             style="background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Access Your Portal
          </a>
        </p>

        <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
          This link will expire in 24 hours. If you need a new link, visit
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/login">our login page</a>.
        </p>

        <hr style="margin-top: 40px; border: none; border-top: 1px solid #e5e7eb;" />

        <p style="color: #6b7280; font-size: 12px;">
          If you didn't request access to BitCense, you can safely ignore this email.
        </p>
      </div>
    `,
  })

  if (error) {
    throw error
  }
}
