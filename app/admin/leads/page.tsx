import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDateTime } from '@/lib/utils'
import { InviteButton } from '@/components/admin/InviteButton'
import { Lead, LeadStatus } from '@/types/database'

const statusConfig: Record<LeadStatus, { label: string; variant: 'default' | 'success' | 'warning' | 'info' }> = {
  new: { label: 'New', variant: 'info' },
  invited: { label: 'Invited', variant: 'warning' },
  active: { label: 'Active', variant: 'success' },
}

const assetTypeLabels: Record<string, string> = {
  real_estate: 'Real Estate',
  equipment: 'Equipment',
  inventory: 'Inventory',
  accounts_receivable: 'Accounts Receivable',
  intellectual_property: 'Intellectual Property',
  other: 'Other',
}

export default async function LeadsPage() {
  const supabase = await createClient()

  const { data: leadsData } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  const leads = (leadsData || []) as Lead[]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
        <p className="text-gray-600 mt-1">Manage leads from the landing page</p>
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
                            {lead.company && (
                              <p className="text-sm text-gray-400">{lead.company}</p>
                            )}
                            {lead.phone && (
                              <p className="text-sm text-gray-400">{lead.phone}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-gray-900">
                              {assetTypeLabels[lead.asset_type]}
                            </p>
                            {lead.asset_value && (
                              <p className="text-sm text-gray-500">{lead.asset_value}</p>
                            )}
                            {lead.location && (
                              <p className="text-sm text-gray-400">{lead.location}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={config.variant}>{config.label}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDateTime(lead.created_at)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {lead.status === 'new' && (
                            <InviteButton lead={lead} />
                          )}
                          {lead.status === 'invited' && (
                            <span className="text-sm text-gray-500">Invitation sent</span>
                          )}
                          {lead.status === 'active' && (
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
            <p className="text-gray-500">No leads yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
