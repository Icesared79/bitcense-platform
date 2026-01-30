import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  ASSET_TYPE_LABELS,
  ASSET_STATUS_CONFIG,
  type Asset,
  type AssetStatus,
} from '@/lib/types'
import { formatDate, formatCompactCurrency } from '@/lib/utils'

const statusBadgeVariant: Record<AssetStatus, 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent'> = {
  submitted: 'info',
  in_review: 'warning',
  qualification_complete: 'accent',
  sent_to_distribution: 'info',
  live: 'success',
  rejected: 'error',
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: userData } = await supabase
    .from('users')
    .select('full_name')
    .eq('id', user!.id)
    .single()

  const { data: assetsData } = await supabase
    .from('assets')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const assets = (assetsData || []) as Asset[]
  const firstName = userData?.full_name?.split(' ')[0]

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-medium text-gray-900">
            {firstName ? `Welcome, ${firstName}` : 'Welcome'}
          </h1>
        </div>
        {assets.length > 0 && (
          <Link href="/assets/new">
            <Button>New Asset</Button>
          </Link>
        )}
      </div>

      {/* Main content area */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Table header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-900">Your Securities</h2>
        </div>

        {assets.length > 0 ? (
          /* Securities list */
          <div className="divide-y divide-gray-100">
            {assets.map((asset) => {
              const statusConfig = ASSET_STATUS_CONFIG[asset.status]
              const badgeVariant = statusBadgeVariant[asset.status]
              return (
                <Link
                  key={asset.id}
                  href={`/assets/${asset.id}`}
                  className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium text-gray-900 truncate">{asset.name}</h3>
                        <Badge variant={badgeVariant}>{statusConfig.label}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{ASSET_TYPE_LABELS[asset.asset_type]}</span>
                        <span className="text-gray-300">·</span>
                        <span>{formatDate(asset.created_at)}</span>
                        {asset.isin && (
                          <>
                            <span className="text-gray-300">·</span>
                            <span className="font-mono text-xs">{asset.isin}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right pl-4">
                      {asset.target_raise && (
                        <p className="font-medium text-gray-900">
                          {formatCompactCurrency(asset.target_raise / 100)}
                        </p>
                      )}
                      {asset.score !== null && (
                        <p className="text-sm text-gray-500">
                          {asset.score}
                          {asset.grade && <span className="text-gray-400 ml-1">({asset.grade})</span>}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="px-6 py-16 text-center">
            <p className="text-gray-900 font-medium mb-1">No securities yet</p>
            <p className="text-gray-500 text-sm mb-6">
              Submit an asset to begin the qualification process.
            </p>
            <Link href="/assets/new">
              <Button>Submit Your First Asset</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
