import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDateTime } from '@/lib/utils'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get leads count
  const { count: leadsCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })

  const { count: newLeadsCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new')

  // Get assets counts
  const { data: assets } = await supabase.from('assets').select('status')

  const assetStats = {
    total: assets?.length || 0,
    submitted: assets?.filter((a) => a.status === 'submitted').length || 0,
    inReview: assets?.filter((a) => a.status === 'in_review').length || 0,
    qualified: assets?.filter((a) => a.status === 'qualification_complete').length || 0,
    sentToDistribution: assets?.filter((a) => a.status === 'sent_to_distribution').length || 0,
    live: assets?.filter((a) => a.status === 'live').length || 0,
    rejected: assets?.filter((a) => a.status === 'rejected').length || 0,
  }

  // Get clients count
  const { count: clientsCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'client')

  // Get recent activity
  const { data: recentActivity } = await supabase
    .from('activity_log')
    .select(`
      *,
      assets (name)
    `)
    .order('created_at', { ascending: false })
    .limit(10)

  // Get recent leads
  const { data: recentLeads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of BitCense operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">New Leads</p>
            <p className="text-3xl font-bold text-blue-600">{newLeadsCount || 0}</p>
            <p className="text-xs text-gray-400 mt-1">of {leadsCount || 0} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Pending Review</p>
            <p className="text-3xl font-bold text-yellow-600">{assetStats.submitted + assetStats.inReview}</p>
            <p className="text-xs text-gray-400 mt-1">{assetStats.submitted} new, {assetStats.inReview} in review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Qualified</p>
            <p className="text-3xl font-bold text-green-600">{assetStats.qualified}</p>
            <p className="text-xs text-gray-400 mt-1">ready for distribution</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">In Distribution</p>
            <p className="text-3xl font-bold text-emerald-600">{assetStats.sentToDistribution + assetStats.live}</p>
            <p className="text-xs text-gray-400 mt-1">{assetStats.live} live</p>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Pipeline Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-2">
            {[
              { label: 'Submitted', count: assetStats.submitted, color: 'bg-blue-500' },
              { label: 'In Review', count: assetStats.inReview, color: 'bg-yellow-500' },
              { label: 'Qualified', count: assetStats.qualified, color: 'bg-green-500' },
              { label: 'Distribution', count: assetStats.sentToDistribution, color: 'bg-emerald-500' },
              { label: 'Live', count: assetStats.live, color: 'bg-green-700' },
            ].map((stage, idx) => (
              <div key={stage.label} className="flex-1 text-center">
                <div className="flex items-center gap-1">
                  <div className={`h-2 flex-1 ${stage.color} ${idx === 0 ? 'rounded-l-full' : ''} ${idx === 4 ? 'rounded-r-full' : ''}`} />
                  {idx < 4 && (
                    <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stage.count}</p>
                <p className="text-xs text-gray-500">{stage.label}</p>
              </div>
            ))}
          </div>
          {assetStats.rejected > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-500">Rejected assets</span>
              <Badge variant="error">{assetStats.rejected}</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Leads</CardTitle>
            <Link href="/admin/leads" className="text-sm text-green-600 hover:text-green-700">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {recentLeads && recentLeads.length > 0 ? (
              <div className="space-y-3">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-sm text-gray-500">{lead.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={lead.status === 'new' ? 'info' : lead.status === 'invited' ? 'warning' : 'success'}>
                        {lead.status}
                      </Badge>
                      <p className="text-xs text-gray-400 mt-1">{formatDateTime(lead.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No leads yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity && recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium capitalize">{activity.activity_type.replace(/_/g, ' ')}</span>
                        {activity.assets && (
                          <span className="text-gray-600"> - {activity.assets.name}</span>
                        )}
                      </p>
                      {activity.description && (
                        <p className="text-xs text-gray-500">{activity.description}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">{formatDateTime(activity.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
