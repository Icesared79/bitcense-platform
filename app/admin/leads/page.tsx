import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDateTime } from '@/lib/utils'
import { InviteButton } from '@/components/admin/InviteButton'
import { QuickFilters } from '@/components/admin/QuickFilters'
import { SearchInput } from '@/components/admin/SearchInput'
import { ASSET_TYPE_LABELS, type Lead, type LeadStatus } from '@/lib/types'

const statusConfig: Record<LeadStatus, { label: string; variant: 'default' | 'success' | 'warning' | 'info' | 'accent' }> = {
  new: { label: 'New', variant: 'info' },
  contacted: { label: 'Contacted', variant: 'default' },
  qualified: { label: 'Qualified', variant: 'accent' },
  invited: { label: 'Invited', variant: 'warning' },
  converted: { label: 'Converted', variant: 'success' },
}

const locationLabels: Record<string, string> = {
  us: 'United States',
  non_us: 'Non-US',
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>
}) {
  const { status: statusFilter, search } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (statusFilter && statusFilter !== 'all') {
    query = query.eq('status', statusFilter)
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
  }

  const { data: leadsData } = await query
  const leads = (leadsData || []) as Lead[]

  // Get counts for filters
  const { data: allLeads } = await supabase.from('leads').select('status')
  const statusCounts = {
    all: allLeads?.length || 0,
    new: allLeads?.filter(l => l.status === 'new').length || 0,
    contacted: allLeads?.filter(l => l.status === 'contacted').length || 0,
    qualified: allLeads?.filter(l => l.status === 'qualified').length || 0,
    invited: allLeads?.filter(l => l.status === 'invited').length || 0,
    converted: allLeads?.filter(l => l.status === 'converted').length || 0,
  }

  const filterOptions = [
    { value: 'all', label: 'All', count: statusCounts.all },
    { value: 'new', label: 'New', count: statusCounts.new },
    { value: 'contacted', label: 'Contacted', count: statusCounts.contacted },
    { value: 'qualified', label: 'Qualified', count: statusCounts.qualified },
    { value: 'invited', label: 'Invited', count: statusCounts.invited },
    { value: 'converted', label: 'Converted', count: statusCounts.converted },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
        <p className="text-gray-600 mt-1">Manage leads from the landing page</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <QuickFilters paramName="status" options={filterOptions} />
        </div>
        <div className="w-full sm:w-64">
          <SearchInput placeholder="Search by name or email..." />
        </div>
      </div>

      {leads && leads.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Asset Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
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
                  {leads.map((lead) => {
                    const config = statusConfig[lead.status]
                    return (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{lead.name}</p>
                            <p className="text-sm text-gray-500">{lead.email}</p>
                            {lead.linkedin_url && (
                              <a
                                href={lead.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-green-600 hover:text-green-700"
                              >
                                LinkedIn →
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-gray-900">
                              {ASSET_TYPE_LABELS[lead.asset_type]}
                            </p>
                            <p className="text-sm text-gray-500">
                              {locationLabels[lead.location]}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={config.variant}>{config.label}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDateTime(lead.created_at)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {(lead.status === 'new' || lead.status === 'contacted' || lead.status === 'qualified') && (
                            <InviteButton lead={lead} />
                          )}
                          {lead.status === 'invited' && (
                            <span className="text-sm text-gray-500">
                              Invited {lead.invited_at ? formatDateTime(lead.invited_at) : ''}
                            </span>
                          )}
                          {lead.status === 'converted' && (
                            <span className="text-sm text-green-600">Portal active</span>
                          )}
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
            {statusFilter || search ? (
              <>
                <p className="text-gray-500">No leads match your filters</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
              </>
            ) : (
              <p className="text-gray-500">No leads yet</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
