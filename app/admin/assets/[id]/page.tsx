import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Asset, AssetStatus, User, Document, ActivityLog } from '@/types/database'
import { formatDate, formatDateTime } from '@/lib/utils'
import { AdminAssetForm } from '@/components/admin/AdminAssetForm'
import Link from 'next/link'

const statusConfig: Record<AssetStatus, { label: string; variant: 'default' | 'success' | 'warning' | 'error' | 'info' }> = {
  submitted: { label: 'Submitted', variant: 'info' },
  under_review: { label: 'Under Review', variant: 'warning' },
  additional_info_needed: { label: 'Additional Info Needed', variant: 'error' },
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

export default async function AdminAssetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: assetData, error } = await supabase
    .from('assets')
    .select(`
      *,
      users (id, name, email, company, phone)
    `)
    .eq('id', id)
    .single()

  if (error || !assetData) {
    notFound()
  }

  const asset = assetData as Asset & { users: Pick<User, 'id' | 'name' | 'email' | 'company' | 'phone'> | null }

  const { data: documentsData } = await supabase
    .from('documents')
    .select('*')
    .eq('asset_id', asset.id)
    .order('created_at', { ascending: false })

  const { data: activityLogData } = await supabase
    .from('activity_log')
    .select('*')
    .eq('asset_id', asset.id)
    .order('created_at', { ascending: false })

  const documents = (documentsData || []) as Document[]
  const activityLog = (activityLogData || []) as ActivityLog[]

  const config = statusConfig[asset.status]

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/assets" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          &larr; Back to Assets
        </Link>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{asset.name}</h1>
            <Badge variant={config.variant}>{config.label}</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{assetTypeLabels[asset.type]}</span>
            {asset.location && <span>{asset.location}</span>}
            <span>Submitted {formatDate(asset.created_at)}</span>
          </div>
        </div>
        {asset.estimated_value && (
          <div className="text-right">
            <p className="text-sm text-gray-500">Estimated Value</p>
            <p className="text-2xl font-bold text-gray-900">
              ${Number(asset.estimated_value).toLocaleString()}
            </p>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Info */}
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{asset.users?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{asset.users?.email}</p>
                </div>
                {asset.users?.company && (
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium text-gray-900">{asset.users.company}</p>
                  </div>
                )}
                {asset.users?.phone && (
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{asset.users.phone}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          {asset.description && (
            <Card>
              <CardHeader>
                <CardTitle>Asset Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 whitespace-pre-wrap">{asset.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Admin Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminAssetForm asset={asset} />
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents ({documents?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {documents && documents.length > 0 ? (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">{formatDateTime(doc.created_at)}</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No documents uploaded
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Results */}
          <Card>
            <CardHeader>
              <CardTitle>Current Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {asset.score !== null ? asset.score : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Grade</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {asset.grade || '-'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              {activityLog && activityLog.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {activityLog.map((activity, index) => (
                    <div key={activity.id} className="relative pl-6">
                      {index !== activityLog.length - 1 && (
                        <div className="absolute left-[9px] top-6 bottom-0 w-0.5 bg-gray-200" />
                      )}
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{activity.action}</p>
                        {activity.details && (
                          <p className="text-sm text-gray-600">{activity.details}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDateTime(activity.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No activity yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
