'use client'

import { cn } from '@/lib/utils'

interface ScoreDisplayProps {
  score: number // 0-100
  grade?: 'A' | 'B' | 'C' | 'D' | 'F'
  size?: 'sm' | 'md' | 'lg'
  showGrade?: boolean
  className?: string
}

const gradeConfig = {
  A: { color: '#15803d', bg: '#dcfce7', label: 'Excellent' },
  B: { color: '#0ea5e9', bg: '#e0f2fe', label: 'Good' },
  C: { color: '#f59e0b', bg: '#fef3c7', label: 'Fair' },
  D: { color: '#f97316', bg: '#ffedd5', label: 'Needs Work' },
  F: { color: '#dc2626', bg: '#fee2e2', label: 'Not Qualified' },
}

function getGradeFromScore(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 80) return 'A'
  if (score >= 70) return 'B'
  if (score >= 60) return 'C'
  if (score >= 50) return 'D'
  return 'F'
}

export function ScoreDisplay({
  score,
  grade,
  size = 'md',
  showGrade = true,
  className
}: ScoreDisplayProps) {
  const actualGrade = grade || getGradeFromScore(score)
  const config = gradeConfig[actualGrade]

  const sizes = {
    sm: { circle: 'w-16 h-16', score: 'text-xl', grade: 'text-xs' },
    md: { circle: 'w-24 h-24', score: 'text-3xl', grade: 'text-sm' },
    lg: { circle: 'w-32 h-32', score: 'text-4xl', grade: 'text-base' },
  }

  const sizeConfig = sizes[size]

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div
        className={cn(
          'rounded-full flex flex-col items-center justify-center border-4',
          sizeConfig.circle
        )}
        style={{
          borderColor: config.color,
          backgroundColor: config.bg,
        }}
      >
        <span
          className={cn('font-extrabold', sizeConfig.score)}
          style={{ color: config.color }}
        >
          {score}
        </span>
        {showGrade && (
          <span
            className={cn('font-bold', sizeConfig.grade)}
            style={{ color: config.color }}
          >
            {actualGrade}
          </span>
        )}
      </div>
      <span
        className={cn('mt-2 font-medium', sizeConfig.grade)}
        style={{ color: config.color }}
      >
        {config.label}
      </span>
    </div>
  )
}
