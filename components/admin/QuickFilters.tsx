'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface QuickFiltersProps {
  paramName: string
  options: FilterOption[]
  className?: string
}

export function QuickFilters({ paramName, options, className }: QuickFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentValue = searchParams.get(paramName) || 'all'

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      params.delete(paramName)
    } else {
      params.set(paramName, value)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleFilter(option.value)}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-full transition-colors',
            currentValue === option.value
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          {option.label}
          {option.count !== undefined && (
            <span className={cn(
              'ml-1.5 text-xs',
              currentValue === option.value ? 'text-green-100' : 'text-gray-400'
            )}>
              {option.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
