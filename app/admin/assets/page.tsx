import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDateTime, formatCompactCurrency } from '@/lib/utils'
import { ASSET_TYPE_LABELS, ASSET_STATUS_CONFIG, type Asset, type AssetStatus, type AssetType, type User } from '@/lib/types'
import { QuickFilters } from '@/components/admin/QuickFilters'
import { SearchInput } from '@/components/admin/SearchInput'
import Link from 'next/link'

const statusBadgeVariant: Record<AssetStatus, 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent'> = {
  submitted: 'info',
  in_review: 'warning',
  qualification_complete: 'accent',
  sent_to_distribution: 'info',
  live: 'success',
  rejected: 'error',
}

type AssetWithUser = Asset & { users: Pick<User, 'id' | 'full_name' | 'email' | 'company_name'> | null }

export default async function AssetsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string; search?: string; client?: string }>
}) {
  const { status: statusFilter, type: typeFilter, search, client: clientFilter } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('assets')
    .select(`
      *,
      users (id, full_name, email, company_name)
    `)
    .order('created_at', { ascending: false })

  if (statusFilter && statusFilter !== 'all') {
    query = query.eq('status', statusFilter)
  }

  if (typeFilter && typeFilter !== 'all') {
    query = query.eq('asset_type', typeFilter)
  }

  if (clientFilter) {
    query = query.eq('user_id', clientFilter)
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,isin.ilike.%${search}%,issuer_name.ilike.%${search}%`)
  }

  const { data: assetsData } = await query
  const assets = (assetsData || []) as AssetWithUser[]

  // Get counts for filters
  const { data: allAssets } = await supabase.from('assets').select('status, asset_type')
  const statusCounts = {
    all: allAssets?.length || 0,
    submitted: allAssets?.filter(a => a.status === 'submitted').length || 0,
    in_review: allAssets?.filter(a => a.status === 'in_review').length || 0,
    qualification_complete: allAssets?.filter(a => a.status === 'qualification_complete').length || 0,
    sent_to_distribution: allAssets?.filter(a => a.status === 'sent_to_distribution').length || 0,
    live: allAssets?.filter(a => a.status === 'live').length || 0,
    rejected: allAssets?.filter(a => a.status === 'rejected').length || 0,
  }

  const needsReviewCount = statusCounts.submitted + statusCounts.in_review

  const statusOptions = [
    { value: 'all', label: 'All', count: statusCounts.all },
    { value: 'submitted', label: 'Submitted', count: statusCounts.submitted },
    { value: 'in_review', label: 'In Review', count: statusCounts.in_review },
    { value: 'qualification_complete', label: 'Qualified', count: statusCounts.qualification_complete },
    { value: 'sent_to_distribution', label: 'Distribution', count: statusCounts.sent_to_distribution },
    { value: 'live', label: 'Live', count: statusCounts.live },
    { value: 'rejected', label: 'Rejected', count: statusCounts.rejected },
  ]

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Asset Management</h1>
          <p className="text-gray-600 mt-1">Review and manage submitted securities</p>
        </div>
        {needsReviewCount > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
            <p className="text-sm font-medium text-yellow-800">
              {needsReviewCount} asset{needsReviewCount !== 1 ? 's' : ''} pending review
            </p>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <QuickFilters paramName="status" options={statusOptions} />
        <div className="flex gap-4">
          <div className="w-full sm:w-80">
            <SearchInput placeholder="Search by name, ISIN, or issuer..." />
          </div>
        </div>
      </div>

      {clientFilter && (
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          <span>Showing assets for selected client</span>
          <Link href="/admin/assets" className="text-green-600 hover:text-green-700">
            Clear filter
          </Link>
        </div>
      )}

      {assets && assets.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Asset
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target Raise
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {assets.map((asset) => {
                    const statusConfig = ASSET_STATUS_CONFIG[asset.status]
                    const badgeVariant = statusBadgeVariant[asset.status]
                    return (
                      <tr key={asset.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{asset.name}</p>
                            <p className="text-sm text-gray-500">
                              {ASSET_TYPE_LABELS[asset.asset_type]}
                            </p>
                            {asset.isin && (
                              <p className="text-xs text-gray-400 font-mono">ISIN: {asset.isin}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-gray-900">{asset.users?.full_name || 'Unknown'}</p>
                            <p className="text-sm text-gray-500">{asset.users?.email}</p>
                            {asset.users?.company_name && (
                              <p className="text-xs text-gray-400">{asset.users.company_name}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {asset.target_raise ? (
                            <p className="text-sm font-medium text-gray-900">
                              {formatCompactCurrency(asset.target_raise / 100)}
                            </p>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={badgeVariant}>{statusConfig.label}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          {asset.score !== null ? (
                            <div>
                              <p className="text-sm font-medium text-gray-900">{asset.score}</p>
                              {asset.grade && (
                                <p className="text-xs text-gray-500">Grade: {asset.grade}</p>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDateTime(asset.created_at)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/admin/assets/${asset.id}`}
                            className="text-green-600 hover:text-green-700 text-sm font-medium"
                          >
                            Review
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            {statusFilter || typeFilter || search || clientFilter ? (
              <>
                <p className="text-gray-500">No assets match your filters</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
                <Link href="/admin/assets" className="text-green-600 hover:text-green-700 text-sm mt-2 inline-block">
                  Clear all filters
                </Link>
              </>
            ) : (
              <p className="text-gray-500">No assets submitted yet</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
