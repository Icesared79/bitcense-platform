import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Asset, AssetStatus, Document, ActivityLog } from '@/types/database'
import { formatDate, formatDateTime } from '@/lib/utils'
import { DocumentUpload } from '@/components/portal/DocumentUpload'
import { DocumentList } from '@/components/portal/DocumentList'
import Link from 'next/link'

const statusConfig: Record<AssetStatus, { label: string; variant: 'default' | 'success' | 'warning' | 'error' | 'info'; step: number }> = {
  submitted: { label: 'Submitted', variant: 'info', step: 1 },
  under_review: { label: 'Under Review', variant: 'warning', step: 2 },
  additional_info_needed: { label: 'Additional Info Needed', variant: 'error', step: 2 },
  qualified: { label: 'Qualified', variant: 'success', step: 5 },
  not_qualified: { label: 'Not Qualified', variant: 'default', step: 5 },
}

const assetTypeLabels: Record<string, string> = {
  real_estate: 'Real Estate',
  equipment: 'Equipment',
  inventory: 'Inventory',
  accounts_receivable: 'Accounts Receivable',
  intellectual_property: 'Intellectual Property',
  other: 'Other',
}

const statusSteps = [
  { id: 1, name: 'Submitted' },
  { id: 2, name: 'Under Review' },
  { id: 3, name: 'Additional Info' },
  { id: 4, name: 'Final Review' },
  { id: 5, name: 'Complete' },
]

export default async function AssetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: assetData, error } = await supabase
    .from('assets')
    .select('*')
    .eq('id', id)
    .eq('user_id', user!.id)
    .single()

  if (error || !assetData) {
    notFound()
  }

  const asset = assetData as Asset

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
  const currentStep = config.step

  return (
    <div>
      <div className="mb-6">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          &larr; Back to Dashboard
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

      {/* Status Progress */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Qualification Progress</h3>
          <div className="relative">
            <div className="flex justify-between">
              {statusSteps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.id <= currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.id < currentStep ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className="mt-2 text-xs text-gray-500 text-center">{step.name}</span>
                </div>
              ))}
            </div>
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0 mx-4">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{ width: `${((currentStep - 1) / (statusSteps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          {asset.description && (
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 whitespace-pre-wrap">{asset.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Feedback */}
          {asset.feedback && (
            <Card>
              <CardHeader>
                <CardTitle>Reviewer Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 whitespace-pre-wrap">{asset.feedback}</p>
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentUpload assetId={asset.id} />
              <div className="mt-4">
                <DocumentList documents={documents} assetId={asset.id} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Score */}
          {(asset.score !== null || asset.grade) && (
            <Card>
              <CardHeader>
                <CardTitle>Qualification Results</CardTitle>
              </CardHeader>
              <CardContent>
                {asset.score !== null && (
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 mb-2">
                      <span className="text-3xl font-bold text-blue-600">{asset.score}</span>
                    </div>
                    <p className="text-sm text-gray-500">Score out of 100</p>
                  </div>
                )}
                {asset.grade && (
                  <div className="text-center">
                    <span className="inline-flex items-center px-4 py-2 rounded-lg bg-green-100 text-green-800 font-semibold text-lg">
                      Grade: {asset.grade}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {activityLog && activityLog.length > 0 ? (
                <div className="space-y-4">
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
