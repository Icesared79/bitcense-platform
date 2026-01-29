import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number // 0-100
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'accent'
  showLabel?: boolean
  className?: string
}

export function ProgressBar({
  value,
  size = 'md',
  variant = 'default',
  showLabel = false,
  className
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  const variants = {
    default: 'bg-[#15803d]',
    success: 'bg-[#15803d]',
    warning: 'bg-[#f59e0b]',
    accent: 'bg-[#fde047]',
  }

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-[#334155]">Progress</span>
          <span className="text-sm font-medium text-[#334155]">{clampedValue}%</span>
        </div>
      )}
      <div className={cn('w-full bg-[#e2e8f0] rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variants[variant]
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}
