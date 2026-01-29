'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, fullWidth = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl'

    const variants = {
      primary: 'bg-[#15803d] text-white hover:bg-[#166534] focus:ring-[#15803d]/30 shadow-lg shadow-[#15803d]/20 hover:shadow-xl hover:shadow-[#15803d]/25 hover:-translate-y-0.5 active:translate-y-0',
      secondary: 'bg-[#0f172a] text-white hover:bg-[#1e293b] focus:ring-[#0f172a]/30',
      outline: 'border-2 border-[#15803d] text-[#15803d] hover:bg-[#15803d] hover:text-white focus:ring-[#15803d]/30',
      ghost: 'text-[#334155] hover:bg-[#f1f5f9] hover:text-[#0f172a]',
      danger: 'bg-[#dc2626] text-white hover:bg-[#b91c1c] focus:ring-[#dc2626]/30',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    const widthClass = fullWidth ? 'w-full' : ''

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], widthClass, className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
