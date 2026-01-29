/**
 * BitCense Connect Design System
 * Centralized design tokens for consistent styling across the application
 */

export const colors = {
  // Primary brand colors
  primary: '#15803d',      // Green - main CTA, success states
  primaryLight: '#166534', // Green hover
  primaryDark: '#14532d',  // Green active

  secondary: '#0f172a',    // Navy - headers, secondary elements
  secondaryLight: '#1e293b',

  accent: '#fde047',       // Yellow - highlights, accents
  accentLight: '#fef08a',

  // Background colors
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
  },

  // Text colors
  text: {
    primary: '#0f172a',
    secondary: '#334155',
    muted: '#64748b',
    light: '#94a3b8',
  },

  // Border colors
  border: {
    light: '#e2e8f0',
    medium: '#cbd5e1',
  },

  // Status colors
  status: {
    success: '#15803d',
    successBg: '#dcfce7',
    warning: '#f59e0b',
    warningBg: '#fef3c7',
    error: '#dc2626',
    errorBg: '#fee2e2',
    info: '#0ea5e9',
    infoBg: '#e0f2fe',
  },

  // Asset status colors
  assetStatus: {
    submitted: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
    inReview: { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
    qualified: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
    distributed: { bg: '#f3e8ff', text: '#7c3aed', border: '#c4b5fd' },
    live: { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
  },
}

export const typography = {
  fontFamily: {
    primary: 'Inter, system-ui, -apple-system, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, monospace',
  },
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
}

export const spacing = {
  page: 'p-4 sm:p-6 lg:p-8',
  section: 'py-12 lg:py-16',
  card: 'p-4 sm:p-6',
  gap: {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  },
}

export const components = {
  // Card styles
  card: {
    base: 'bg-white rounded-2xl border border-[#e2e8f0] shadow-lg',
    hover: 'hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
    padding: 'p-6 lg:p-8',
  },

  // Button styles
  button: {
    primary: 'bg-[#15803d] text-white hover:bg-[#166534] shadow-lg shadow-[#15803d]/20 hover:shadow-xl hover:shadow-[#15803d]/25 hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-[#0f172a] text-white hover:bg-[#1e293b]',
    outline: 'border-2 border-[#15803d] text-[#15803d] hover:bg-[#15803d] hover:text-white',
    ghost: 'text-[#334155] hover:bg-[#f1f5f9] hover:text-[#0f172a]',
  },

  // Badge styles
  badge: {
    base: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
    success: 'bg-[#dcfce7] text-[#166534]',
    warning: 'bg-[#fef3c7] text-[#92400e]',
    error: 'bg-[#fee2e2] text-[#dc2626]',
    info: 'bg-[#dbeafe] text-[#1e40af]',
    neutral: 'bg-[#f1f5f9] text-[#334155]',
    accent: 'bg-[#fde047] text-[#0f172a]',
  },

  // Input styles
  input: {
    base: 'w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/20 transition-all hover:border-[#cbd5e1]',
  },

  // Table styles
  table: {
    header: 'bg-[#f8fafc] text-[#334155] font-semibold text-sm uppercase tracking-wider',
    row: 'border-b border-[#e2e8f0] hover:bg-[#f8fafc] transition-colors',
    cell: 'px-4 py-3',
  },
}

// Score grade colors
export const scoreGrades = {
  A: { color: '#15803d', bg: '#dcfce7', label: 'Excellent' },
  B: { color: '#0ea5e9', bg: '#e0f2fe', label: 'Good' },
  C: { color: '#f59e0b', bg: '#fef3c7', label: 'Fair' },
  D: { color: '#f97316', bg: '#ffedd5', label: 'Needs Work' },
  F: { color: '#dc2626', bg: '#fee2e2', label: 'Not Qualified' },
}

// Asset status configuration
export const assetStatusConfig = {
  submitted: {
    label: 'Submitted',
    color: '#1e40af',
    bgColor: '#dbeafe',
    description: 'Asset has been submitted for review',
  },
  in_review: {
    label: 'In Review',
    color: '#92400e',
    bgColor: '#fef3c7',
    description: 'Our team is reviewing your asset',
  },
  qualification_complete: {
    label: 'Qualification Complete',
    color: '#166534',
    bgColor: '#dcfce7',
    description: 'Asset has been scored and qualified',
  },
  sent_to_distribution: {
    label: 'Sent to Distribution Partner',
    color: '#7c3aed',
    bgColor: '#f3e8ff',
    description: 'Package sent to distribution partner',
  },
  live: {
    label: 'Live',
    color: '#065f46',
    bgColor: '#d1fae5',
    description: 'Asset is live on distribution platform',
  },
}
