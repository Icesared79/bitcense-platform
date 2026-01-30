/**
 * BitCense Email Template System
 * Reusable components for consistent email styling
 */

// Brand colors
const COLORS = {
  primary: '#15803d',
  primaryDark: '#166534',
  success: '#16a34a',
  warning: '#f59e0b',
  error: '#dc2626',
  textPrimary: '#111827',
  textSecondary: '#4b5563',
  textMuted: '#6b7280',
  textLight: '#9ca3af',
  background: '#f9fafb',
  border: '#e5e7eb',
  white: '#ffffff',
}

// Base email wrapper
export function emailWrapper(content: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BitCense Connect</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto;">
              ${content}
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

// Email header with logo
export function emailHeader(title?: string): string {
  return `
    <div style="text-align: center; padding: 30px; background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%); border-radius: 12px 12px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">BitCense Connect</h1>
      ${title ? `<p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 16px;">${title}</p>` : ''}
    </div>
  `
}

// Email body wrapper
export function emailBody(content: string): string {
  return `
    <div style="padding: 40px 30px; background: ${COLORS.white}; border: 1px solid ${COLORS.border}; border-top: none; border-radius: 0 0 12px 12px;">
      ${content}
    </div>
  `
}

// Email footer
export function emailFooter(message?: string): string {
  return `
    <div style="text-align: center; padding: 20px;">
      <p style="color: ${COLORS.textLight}; font-size: 12px; margin: 0;">
        ${message || "You're receiving this email because you have an account with BitCense Connect."}
      </p>
      <p style="color: ${COLORS.textLight}; font-size: 12px; margin: 8px 0 0;">
        © ${new Date().getFullYear()} BitCense. All rights reserved.
      </p>
    </div>
  `
}

// Primary button
export function primaryButton(text: string, url: string): string {
  return `
    <table role="presentation" style="margin: 30px auto;">
      <tr>
        <td style="background-color: ${COLORS.primary}; border-radius: 8px;">
          <a href="${url}" style="display: inline-block; padding: 16px 32px; color: white; text-decoration: none; font-size: 16px; font-weight: 600;">
            ${text}
          </a>
        </td>
      </tr>
    </table>
  `
}

// Secondary button
export function secondaryButton(text: string, url: string): string {
  return `
    <table role="presentation" style="margin: 20px auto;">
      <tr>
        <td style="border: 2px solid ${COLORS.primary}; border-radius: 8px;">
          <a href="${url}" style="display: inline-block; padding: 12px 24px; color: ${COLORS.primary}; text-decoration: none; font-size: 14px; font-weight: 600;">
            ${text}
          </a>
        </td>
      </tr>
    </table>
  `
}

// Info box
export function infoBox(content: string, variant: 'info' | 'success' | 'warning' | 'error' = 'info'): string {
  const bgColors = {
    info: '#dbeafe',
    success: '#dcfce7',
    warning: '#fef3c7',
    error: '#fee2e2',
  }
  const textColors = {
    info: '#1e40af',
    success: '#166534',
    warning: '#92400e',
    error: '#991b1b',
  }

  return `
    <div style="background: ${bgColors[variant]}; border-radius: 8px; padding: 16px 20px; margin: 20px 0;">
      <p style="color: ${textColors[variant]}; margin: 0; font-size: 14px; line-height: 1.5;">
        ${content}
      </p>
    </div>
  `
}

// Status badge
export function statusBadge(label: string, variant: 'success' | 'warning' | 'error' | 'info' = 'info'): string {
  const bgColors = {
    info: '#dbeafe',
    success: '#dcfce7',
    warning: '#fef3c7',
    error: '#fee2e2',
  }
  const textColors = {
    info: '#1e40af',
    success: '#166534',
    warning: '#92400e',
    error: '#991b1b',
  }

  return `
    <span style="display: inline-block; background: ${bgColors[variant]}; color: ${textColors[variant]}; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px;">
      ${label}
    </span>
  `
}

// Data table row
export function tableRow(label: string, value: string, isLast = false): string {
  return `
    <tr>
      <td style="padding: 12px 16px; ${!isLast ? 'border-bottom: 1px solid ' + COLORS.border + ';' : ''} font-weight: 600; color: ${COLORS.textSecondary}; width: 140px; vertical-align: top;">
        ${label}
      </td>
      <td style="padding: 12px 16px; ${!isLast ? 'border-bottom: 1px solid ' + COLORS.border + ';' : ''} color: ${COLORS.textPrimary};">
        ${value}
      </td>
    </tr>
  `
}

// Data table wrapper
export function dataTable(rows: string): string {
  return `
    <table style="width: 100%; border-collapse: collapse; background: ${COLORS.background}; border-radius: 8px; overflow: hidden; margin: 20px 0;">
      ${rows}
    </table>
  `
}

// Score display for qualification emails
export function scoreDisplay(score: number, grade: string): string {
  const getGradeColor = (g: string) => {
    if (g === 'A') return COLORS.success
    if (g === 'B') return '#22c55e'
    if (g === 'C') return COLORS.warning
    return COLORS.error
  }

  return `
    <div style="text-align: center; padding: 30px; background: ${COLORS.background}; border-radius: 12px; margin: 20px 0;">
      <div style="display: inline-block; margin-right: 40px;">
        <p style="font-size: 48px; font-weight: 700; color: ${COLORS.textPrimary}; margin: 0;">${score}</p>
        <p style="font-size: 14px; color: ${COLORS.textMuted}; margin: 4px 0 0;">Overall Score</p>
      </div>
      <div style="display: inline-block;">
        <p style="font-size: 48px; font-weight: 700; color: ${getGradeColor(grade)}; margin: 0;">${grade}</p>
        <p style="font-size: 14px; color: ${COLORS.textMuted}; margin: 4px 0 0;">Grade</p>
      </div>
    </div>
  `
}

// List of items
export function bulletList(items: string[]): string {
  return `
    <ul style="color: ${COLORS.textSecondary}; line-height: 1.8; padding-left: 20px; margin: 16px 0;">
      ${items.map(item => `<li style="margin-bottom: 8px;">${item}</li>`).join('')}
    </ul>
  `
}

// Heading styles
export function heading(text: string, level: 1 | 2 | 3 = 2): string {
  const sizes = { 1: '24px', 2: '20px', 3: '16px' }
  return `<h${level} style="color: ${COLORS.textPrimary}; font-size: ${sizes[level]}; font-weight: 600; margin: 0 0 16px;">${text}</h${level}>`
}

// Paragraph
export function paragraph(text: string): string {
  return `<p style="color: ${COLORS.textSecondary}; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">${text}</p>`
}

// Divider
export function divider(): string {
  return `<hr style="border: none; border-top: 1px solid ${COLORS.border}; margin: 30px 0;">`
}

// Link
export function link(text: string, url: string): string {
  return `<a href="${url}" style="color: ${COLORS.primary}; text-decoration: none; font-weight: 500;">${text}</a>`
}
