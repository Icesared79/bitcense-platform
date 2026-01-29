/**
 * Utility functions for formatting values consistently across the application
 */

/**
 * Format a number as compact currency (shorthand: $10M, $500K, etc.)
 * This is the standard format for displaying dollar amounts
 */
function formatAsCompactCurrency(num: number): string {
  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`
  }
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  }
  if (num >= 1_000) {
    return `$${Math.round(num / 1_000)}K`
  }
  return `$${num.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
}

/**
 * Format a capital/funding amount for display
 *
 * Handles:
 * - Numbers (10000000 -> "$10M")
 * - String numbers ("10000000" -> "$10M")
 * - Already formatted strings ("$15M" -> pass through)
 * - null/undefined -> returns fallback
 */
export function formatCapitalAmount(
  amount: string | number | null | undefined,
  fallback: string = 'Amount TBD'
): string {
  if (amount === null || amount === undefined || amount === '') {
    return fallback
  }

  // If it's a number, format it directly with compact notation
  if (typeof amount === 'number') {
    return formatAsCompactCurrency(amount)
  }

  // It's a string - check various cases
  const str = String(amount).trim()

  // Check if it's already formatted (starts with $)
  if (str.startsWith('$')) {
    return str
  }

  // Check if it's a plain number string (possibly with commas)
  const cleanedNumber = str.replace(/,/g, '')
  if (/^\d+(\.\d+)?$/.test(cleanedNumber)) {
    const num = parseFloat(cleanedNumber)
    if (!isNaN(num)) {
      return formatAsCompactCurrency(num)
    }
  }

  // Return as-is if we can't parse it
  return str
}

/**
 * Format a number as compact currency (always use shorthand: $10M, $500K, etc.)
 */
export function formatCompactCurrency(num: number | string | null | undefined): string {
  if (num === null || num === undefined || num === '') {
    return '-'
  }

  let value: number
  if (typeof num === 'string') {
    const cleaned = num.replace(/[$,]/g, '')
    value = parseFloat(cleaned)
    if (isNaN(value)) {
      return num
    }
  } else {
    value = num
  }

  return formatAsCompactCurrency(value)
}

/**
 * Format a number as full currency with $ prefix and thousand separators
 * Use this only when you need the exact dollar amount
 */
export function formatFullCurrency(num: number): string {
  return `$${num.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
}

/**
 * Format a percentage for display
 */
export function formatPercent(num: number | null | undefined, decimals: number = 1): string {
  if (num === null || num === undefined) {
    return '-'
  }
  return `${num.toFixed(decimals)}%`
}

/**
 * Format a date for display
 */
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return '-'
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

/**
 * Format a date with time
 */
export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return '-'
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

/**
 * Format relative time (e.g., "2 hours ago", "3 days ago")
 */
export function formatRelativeTime(date: string | Date | null | undefined): string {
  if (!date) return '-'
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(d)
}
