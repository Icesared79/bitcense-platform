'use client'

import { createClient } from '@/lib/supabase/client'
import { Document } from '@/types/database'
import { formatDateTime } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface DocumentListProps {
  documents: Document[]
  assetId: string
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getFileIcon(fileType: string) {
  if (fileType.includes('pdf')) {
    return (
      <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
      </svg>
    )
  }
  if (fileType.includes('image')) {
    return (
      <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
      </svg>
    )
  }
  return (
    <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
    </svg>
  )
}

export function DocumentList({ documents, assetId }: DocumentListProps) {
  const router = useRouter()

  async function handleDownload(doc: Document) {
    const supabase = createClient()
    const { data } = await supabase.storage
      .from('documents')
      .createSignedUrl(doc.file_path, 60)

    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank')
    }
  }

  async function handleDelete(doc: Document) {
    if (!confirm('Are you sure you want to delete this document?')) return

    const supabase = createClient()

    // Delete from storage
    await supabase.storage.from('documents').remove([doc.file_path])

    // Delete record
    await supabase.from('documents').delete().eq('id', doc.id)

    // Log activity
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('activity_log').insert({
        asset_id: assetId,
        user_id: user.id,
        action: 'Document Deleted',
        details: `Deleted: ${doc.name}`,
      })
    }

    router.refresh()
  }

  if (documents.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-4">
        No documents uploaded yet
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            {getFileIcon(doc.file_type)}
            <div>
              <p className="text-sm font-medium text-gray-900">{doc.name}</p>
              <p className="text-xs text-gray-500">
                {formatFileSize(doc.file_size)} - {formatDateTime(doc.created_at)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDownload(doc)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="Download"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button
              onClick={() => handleDelete(doc)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
