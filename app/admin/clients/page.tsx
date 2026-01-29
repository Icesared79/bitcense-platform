import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDateTime } from '@/lib/utils'
import Link from 'next/link'

export default async function ClientsPage() {
  const supabase = await createClient()

  const { data: clients } = await supabase
    .from('users')
    .select(`
      *,
      assets (id, status)
    `)
    .eq('role', 'client')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
        <p className="text-gray-600 mt-1">View and manage portal clients</p>
      </div>

      {clients && clients.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assets
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {clients.map((client) => {
                    const assetCount = client.assets?.length || 0
                    const qualifiedCount = client.assets?.filter(
                      (a: { status: string }) => a.status === 'qualified'
                    ).length || 0

                    return (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{client.name}</p>
                            <p className="text-sm text-gray-500">{client.email}</p>
                            {client.phone && (
                              <p className="text-sm text-gray-400">{client.phone}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">
                            {client.company || '-'}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="info">{assetCount} total</Badge>
                            {qualifiedCount > 0 && (
                              <Badge variant="success">{qualifiedCount} qualified</Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDateTime(client.created_at)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <Link
                              href={`/admin/assets?client=${client.id}`}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              View Assets
                            </Link>
                          </div>
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
            <p className="text-gray-500">No clients yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Invite leads to the portal to create client accounts
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
