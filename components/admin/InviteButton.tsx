'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { inviteLeadToPortal } from '@/app/actions/admin'
import type { Lead } from '@/lib/types'
import { useRouter } from 'next/navigation'

interface InviteButtonProps {
  lead: Lead
}

export function InviteButton({ lead }: InviteButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleInvite() {
    setIsLoading(true)
    setError(null)

    const result = await inviteLeadToPortal(lead.id)

    setIsLoading(false)

    if (result.success) {
      router.refresh()
    } else {
      setError(result.error || 'Failed to send invitation')
    }
  }

  return (
    <div>
      <Button
        size="sm"
        onClick={handleInvite}
        isLoading={isLoading}
      >
        Invite to Portal
      </Button>
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  )
}
