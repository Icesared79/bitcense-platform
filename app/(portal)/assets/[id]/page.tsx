import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  ASSET_TYPE_LABELS,
  ASSET_STATUS_CONFIG,
  type Asset,
  type AssetStatus,
  type Document,
  type ActivityLog,
} from '@/lib/types'
import { formatDate, formatDateTime, formatCompactCurrency } from '@/lib/utils'
import { DocumentUpload } from '@/components/portal/DocumentUpload'
import { DocumentList } from '@/components/portal/DocumentList'
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

const statusSteps = [
  { id: 1, name: 'Submitted', status: 'submitted' as AssetStatus },
  { id: 2, name: 'In Review', status: 'in_review' as AssetStatus },
  { id: 3, name: 'Qualified', status: 'qualification_complete' as AssetStatus },
  { id: 4, name: 'Distribution', status: 'sent_to_distribution' as AssetStatus },
  { id: 5, name: 'Live', status: 'live' as AssetStatus },
]

function getStepNumber(status: AssetStatus): number {
  if (status === 'rejected') return 0 // Special case
  const step = statusSteps.find(s => s.status === status)
  return step?.id || 1
}

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
    .order('uploaded_at', { ascending: false })

  const { data: activityLogData } = await supabase
    .from('activity_log')
    .select('*')
    .eq('asset_id', asset.id)
    .eq('is_client_visible', true)
    .order('created_at', { ascending: false })

  const documents = (documentsData || []) as Document[]
  const activityLog = (activityLogData || []) as ActivityLog[]

  const statusConfig = ASSET_STATUS_CONFIG[asset.status]
  const badgeVariant = statusBadgeVariant[asset.status]
  const currentStep = getStepNumber(asset.status)
  const isRejected = asset.status === 'rejected'

  // Check if we have a score breakdown to show
  const scoreBreakdown = asset.score_breakdown as ScoreBreakdownData | null
  const hasScoreBreakdown = scoreBreakdown && scoreBreakdown.categories && scoreBreakdown.categories.length > 0
  const showScoreBreakdown = hasScoreBreakdown && (
    asset.status === 'qualification_complete' ||
    asset.status === 'sent_to_distribution' ||
    asset.status === 'live' ||
    asset.status === 'rejected'
  )

  return (
    <div>
      <div className="mb-6">
        <Link href="/dashboard" className="text-green-600 hover:text-green-700 text-sm font-medium">
          &larr; Back to Dashboard
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
            {asset.isin && <span className="font-mono text-xs">ISIN: {asset.isin}</span>}
            {asset.cusip && <span className="font-mono text-xs">CUSIP: {asset.cusip}</span>}
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

      {/* Status Message Banner */}
      {!isRejected && asset.status === 'submitted' && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium text-blue-800">Submission Received</p>
            <p className="text-sm text-blue-700">Your security has been submitted and is queued for review. Our team typically begins review within 24-48 hours.</p>
          </div>
        </div>
      )}

      {asset.status === 'in_review' && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium text-yellow-800">Under Review</p>
            <p className="text-sm text-yellow-700">Our team is actively reviewing your security. You may receive requests for additional documents. Check back soon for results.</p>
          </div>
        </div>
      )}

      {asset.status === 'qualification_complete' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium text-green-800">Qualification Complete</p>
            <p className="text-sm text-green-700">Your security has been qualified. We are preparing the distribution package to send to our partners.</p>
          </div>
        </div>
      )}

      {asset.status === 'sent_to_distribution' && (
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg flex items-start gap-3">
          <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
          <div>
            <p className="font-medium text-purple-800">Sent to Distribution Partners</p>
            <p className="text-sm text-purple-700">Your qualified security package has been sent to our distribution network. You will be notified when it goes live.</p>
          </div>
        </div>
      )}

      {asset.status === 'live' && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
          <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium text-emerald-800">Live on Distribution Platform</p>
            <p className="text-sm text-emerald-700">Your security is now live and available to investors through our distribution partners.</p>
          </div>
        </div>
      )}

      {/* Status Progress */}
      {!isRejected && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Qualification Progress</h3>
            <div className="relative">
              <div className="flex justify-between">
                {statusSteps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.id <= currentStep
                          ? 'bg-green-600 text-white'
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
                  className="h-full bg-green-600 transition-all"
                  style={{ width: `${((currentStep - 1) / (statusSteps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rejected Notice */}
      {isRejected && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-red-800">Not Qualified</h3>
                <p className="text-sm text-red-600">This asset did not meet our qualification criteria. See the qualification results below for details.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Score Breakdown - Show when qualification is complete */}
      {showScoreBreakdown && scoreBreakdown && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Qualification Results</h2>
          <ScoreBreakdownCard breakdown={scoreBreakdown} showInternalDetails={false} />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
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
          {/* Recommendation */}
          {asset.recommendation && (
            <Card>
              <CardHeader>
                <CardTitle>Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{asset.recommendation}</p>
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
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-green-100 border-2 border-green-600" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm capitalize">
                          {activity.activity_type.replace(/_/g, ' ')}
                        </p>
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
