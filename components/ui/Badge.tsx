import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent'
  size?: 'sm' | 'md'
}

export function Badge({ className, variant = 'default', size = 'md', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[#f1f5f9] text-[#334155]',
    success: 'bg-[#dcfce7] text-[#166534]',
    warning: 'bg-[#fef3c7] text-[#92400e]',
    error: 'bg-[#fee2e2] text-[#dc2626]',
    info: 'bg-[#dbeafe] text-[#1e40af]',
    accent: 'bg-[#fde047] text-[#0f172a]',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
