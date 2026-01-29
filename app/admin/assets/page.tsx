import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDateTime } from '@/lib/utils'
import { Asset, AssetStatus, User } from '@/types/database'
import Link from 'next/link'

const statusConfig: Record<AssetStatus, { label: string; variant: 'default' | 'success' | 'warning' | 'error' | 'info' }> = {
  submitted: { label: 'Submitted', variant: 'info' },
  under_review: { label: 'Under Review', variant: 'warning' },
  additional_info_needed: { label: 'Info Needed', variant: 'error' },
  qualified: { label: 'Qualified', variant: 'success' },
  not_qualified: { label: 'Not Qualified', variant: 'default' },
}

const assetTypeLabels: Record<string, string> = {
  real_estate: 'Real Estate',
  equipment: 'Equipment',
  inventory: 'Inventory',
  accounts_receivable: 'Accounts Receivable',
  intellectual_property: 'Intellectual Property',
  other: 'Other',
}

type AssetWithUser = Asset & { users: Pick<User, 'id' | 'name' | 'email' | 'company'> | null }

export default async function AssetsPage() {
  const supabase = await createClient()

  const { data: assetsData } = await supabase
    .from('assets')
    .select(`
      *,
      users (id, name, email, company)
    `)
    .order('created_at', { ascending: false })

  const assets = (assetsData || []) as AssetWithUser[]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Asset Management</h1>
        <p className="text-gray-600 mt-1">Review and manage submitted assets</p>
      </div>

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
                      Value
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
                    const config = statusConfig[asset.status]
                    return (
                      <tr key={asset.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{asset.name}</p>
                            <p className="text-sm text-gray-500">
                              {assetTypeLabels[asset.type]}
                            </p>
                            {asset.location && (
                              <p className="text-sm text-gray-400">{asset.location}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-gray-900">{asset.users?.name}</p>
                            <p className="text-sm text-gray-500">{asset.users?.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {asset.estimated_value ? (
                            <p className="text-sm font-medium text-gray-900">
                              ${Number(asset.estimated_value).toLocaleString()}
                            </p>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={config.variant}>{config.label}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          {asset.score !== null ? (
                            <div>
                              <p className="text-sm font-medium text-gray-900">{asset.score}</p>
                              {asset.grade && (
                                <p className="text-xs text-gray-500">{asset.grade}</p>
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
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
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
            <p className="text-gray-500">No assets submitted yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
