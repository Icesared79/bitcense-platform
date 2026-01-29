import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Asset, AssetStatus } from '@/types/database'
import { formatDate } from '@/lib/utils'

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

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: assetsData } = await supabase
    .from('assets')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const assets = (assetsData || []) as Asset[]

  const stats = {
    total: assets?.length || 0,
    underReview: assets?.filter((a) => a.status === 'under_review').length || 0,
    qualified: assets?.filter((a) => a.status === 'qualified').length || 0,
    needsInfo: assets?.filter((a) => a.status === 'additional_info_needed').length || 0,
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your asset qualification progress</p>
        </div>
        <Link href="/assets/new">
          <Button>Submit New Asset</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Assets</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Under Review</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.underReview}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Qualified</p>
            <p className="text-3xl font-bold text-green-600">{stats.qualified}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Needs Info</p>
            <p className="text-3xl font-bold text-red-600">{stats.needsInfo}</p>
          </CardContent>
        </Card>
      </div>

      {/* Assets List */}
      {assets.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Your Assets</h2>
          <div className="grid gap-4">
            {assets.map((asset) => {
              const config = statusConfig[asset.status]
              return (
                <Link key={asset.id} href={`/assets/${asset.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
                            <Badge variant={config.variant}>{config.label}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{assetTypeLabels[asset.type]}</span>
                            {asset.location && <span>{asset.location}</span>}
                            <span>Submitted {formatDate(asset.created_at)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          {asset.estimated_value && (
                            <p className="text-lg font-semibold text-gray-900">
                              ${Number(asset.estimated_value).toLocaleString()}
                            </p>
                          )}
                          {asset.score !== null && (
                            <p className="text-sm text-gray-500">
                              Score: <span className="font-medium">{asset.score}</span>
                              {asset.grade && <span className="ml-1">({asset.grade})</span>}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No assets yet</h3>
            <p className="text-gray-600 mb-6">
              Submit your first asset to begin the qualification process.
            </p>
            <Link href="/assets/new">
              <Button>Submit Your First Asset</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
