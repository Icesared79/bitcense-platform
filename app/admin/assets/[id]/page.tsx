import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  ASSET_TYPE_LABELS,
  ASSET_STATUS_CONFIG,
  type Asset,
  type AssetStatus,
  type User,
  type Document,
  type ActivityLog,
} from '@/lib/types'
import { formatDate, formatDateTime, formatCompactCurrency } from '@/lib/utils'
import { AdminAssetForm } from '@/components/admin/AdminAssetForm'
import { ScoringForm } from '@/components/admin/ScoringForm'
import { DocumentRequestForm } from '@/components/admin/DocumentRequestForm'
import { ScoreBreakdownCard } from '@/components/scoring/ScoreBreakdownCard'
import type { ScoreBreakdownData } from '@/lib/scoring'
import Link from 'next/link'

const statusBadgeVariant: Record<AssetStatus, 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent'> = {
  submitted: 'info',
  in_review: 'warning',
  qualification_complete: 'accent',
  sent_to_distribution: 'info',
  live: 'success',
  rejected: 'error',
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
      users (id, full_name, email, company_name, phone, linkedin_url)
    `)
    .eq('id', id)
    .single()

  if (error || !assetData) {
    notFound()
  }

  const asset = assetData as Asset & {
    users: Pick<User, 'id' | 'full_name' | 'email' | 'company_name' | 'phone' | 'linkedin_url'> | null
  }

  const { data: documentsData } = await supabase
    .from('documents')
    .select('*')
    .eq('asset_id', asset.id)
    .order('uploaded_at', { ascending: false })

  const { data: activityLogData } = await supabase
    .from('activity_log')
    .select('*')
    .eq('asset_id', asset.id)
    .order('created_at', { ascending: false })

  const documents = (documentsData || []) as Document[]
  const activityLog = (activityLogData || []) as ActivityLog[]

  const statusConfig = ASSET_STATUS_CONFIG[asset.status]
  const badgeVariant = statusBadgeVariant[asset.status]

  // Check if we have a score breakdown
  const scoreBreakdown = asset.score_breakdown as ScoreBreakdownData | null
  const hasScoreBreakdown = scoreBreakdown && scoreBreakdown.categories && scoreBreakdown.categories.length > 0

  // Determine which view to show
  const showScoringForm = asset.status === 'submitted' || asset.status === 'in_review'
  const showScoreBreakdown = hasScoreBreakdown && (asset.status === 'qualification_complete' || asset.status === 'sent_to_distribution' || asset.status === 'live' || asset.status === 'rejected')

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/assets" className="text-green-600 hover:text-green-700 text-sm font-medium">
          &larr; Back to Assets
        </Link>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{asset.name}</h1>
            <Badge variant={badgeVariant}>{statusConfig.label}</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{ASSET_TYPE_LABELS[asset.asset_type]}</span>
            {asset.isin && <span className="font-mono">ISIN: {asset.isin}</span>}
            {asset.cusip && <span className="font-mono">CUSIP: {asset.cusip}</span>}
            <span>Submitted {formatDate(asset.created_at)}</span>
          </div>
        </div>
        {asset.target_raise && (
          <div className="text-right">
            <p className="text-sm text-gray-500">Target Raise</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCompactCurrency(asset.target_raise / 100)}
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
                  <p className="font-medium text-gray-900">{asset.users?.full_name || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{asset.users?.email}</p>
                </div>
                {asset.users?.company_name && (
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium text-gray-900">{asset.users.company_name}</p>
                  </div>
                )}
                {asset.users?.phone && (
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{asset.users.phone}</p>
                  </div>
                )}
                {asset.users?.linkedin_url && (
                  <div>
                    <p className="text-sm text-gray-500">LinkedIn</p>
                    <a
                      href={asset.users.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700"
                    >
                      View Profile →
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Asset Details */}
          <Card>
            <CardHeader>
              <CardTitle>Asset Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {asset.issuer_name && (
                  <div>
                    <p className="text-sm text-gray-500">Issuer</p>
                    <p className="font-medium text-gray-900">{asset.issuer_name}</p>
                  </div>
                )}
                {asset.issuer_jurisdiction && (
                  <div>
                    <p className="text-sm text-gray-500">Jurisdiction</p>
                    <p className="font-medium text-gray-900">{asset.issuer_jurisdiction}</p>
                  </div>
                )}
                {asset.fund_structure && (
                  <div>
                    <p className="text-sm text-gray-500">Fund Structure</p>
                    <p className="font-medium text-gray-900">{asset.fund_structure}</p>
                  </div>
                )}
                {asset.minimum_investment && (
                  <div>
                    <p className="text-sm text-gray-500">Minimum Investment</p>
                    <p className="font-medium text-gray-900">
                      {formatCompactCurrency(asset.minimum_investment / 100)}
                    </p>
                  </div>
                )}
                {asset.target_yield && (
                  <div>
                    <p className="text-sm text-gray-500">Target Yield</p>
                    <p className="font-medium text-gray-900">{asset.target_yield}%</p>
                  </div>
                )}
                {asset.term_months && (
                  <div>
                    <p className="text-sm text-gray-500">Term</p>
                    <p className="font-medium text-gray-900">{asset.term_months} months</p>
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

          {/* Scoring Form - for assets being reviewed */}
          {showScoringForm && (
            <Card>
              <CardHeader>
                <CardTitle>Qualification Scoring</CardTitle>
              </CardHeader>
              <CardContent>
                <ScoringForm asset={asset} />
              </CardContent>
            </Card>
          )}

          {/* Score Breakdown - for completed assets */}
          {showScoreBreakdown && scoreBreakdown && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Qualification Results</h2>
              <ScoreBreakdownCard breakdown={scoreBreakdown} showInternalDetails />
            </div>
          )}

          {/* Admin Controls - always visible for status changes */}
          <Card>
            <CardHeader>
              <CardTitle>Status & Feedback</CardTitle>
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
                          <p className="text-xs text-gray-500">
                            {doc.category} • {formatDateTime(doc.uploaded_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={doc.status === 'approved' ? 'success' : doc.status === 'rejected' ? 'error' : 'default'}
                          size="sm"
                        >
                          {doc.status}
                        </Badge>
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                          Download
                        </button>
                      </div>
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
          {/* Quick Score Summary */}
          {asset.score !== null && (
            <Card>
              <CardHeader>
                <CardTitle>Score Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-gray-900">{asset.score}</p>
                    <p className="text-sm text-gray-500">Overall Score</p>
                  </div>
                  {asset.grade && (
                    <div className="text-center">
                      <p className="text-4xl font-bold text-gray-900">{asset.grade}</p>
                      <p className="text-sm text-gray-500">Grade</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Document Request */}
          {(asset.status === 'submitted' || asset.status === 'in_review') && (
            <DocumentRequestForm assetId={asset.id} assetName={asset.name} />
          )}

          {/* Timeline Dates */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Submitted</span>
                  <span className="text-gray-900">{asset.submitted_at ? formatDate(asset.submitted_at) : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Review Started</span>
                  <span className="text-gray-900">{asset.review_started_at ? formatDate(asset.review_started_at) : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Qualified</span>
                  <span className="text-gray-900">{asset.qualification_completed_at ? formatDate(asset.qualification_completed_at) : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sent to Distribution</span>
                  <span className="text-gray-900">{asset.sent_to_distribution_at ? formatDate(asset.sent_to_distribution_at) : '-'}</span>
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
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-green-100 border-2 border-green-600" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{activity.activity_type.replace(/_/g, ' ')}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
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
