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
    underReview: assets?.filter((a) => a.status === 'under_review').length || 0,
    qualified: assets?.filter((a) => a.status === 'qualified').length || 0,
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
            <p className="text-sm text-gray-500">Assets Submitted</p>
            <p className="text-3xl font-bold text-yellow-600">{assetStats.submitted}</p>
            <p className="text-xs text-gray-400 mt-1">awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Under Review</p>
            <p className="text-3xl font-bold text-orange-600">{assetStats.underReview}</p>
            <p className="text-xs text-gray-400 mt-1">being processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Clients</p>
            <p className="text-3xl font-bold text-green-600">{clientsCount || 0}</p>
            <p className="text-xs text-gray-400 mt-1">portal users</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Leads</CardTitle>
            <Link href="/admin/leads" className="text-sm text-blue-600 hover:text-blue-700">
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
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.action}</span>
                        {activity.assets && (
                          <span className="text-gray-600"> - {activity.assets.name}</span>
                        )}
                      </p>
                      {activity.details && (
                        <p className="text-xs text-gray-500">{activity.details}</p>
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
