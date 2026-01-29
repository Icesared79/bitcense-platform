'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

interface DocumentUploadProps {
  assetId: string
}

export function DocumentUpload({ assetId }: DocumentUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError('You must be logged in to upload documents')
      setIsUploading(false)
      return
    }

    for (const file of Array.from(files)) {
      const fileExt = file.name.split('.').pop()
      const filePath = `${user.id}/${assetId}/${Date.now()}.${fileExt}`

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        setError(`Failed to upload ${file.name}`)
        continue
      }

      // Create document record
      const { error: insertError } = await supabase.from('documents').insert({
        asset_id: assetId,
        user_id: user.id,
        name: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
      })

      if (insertError) {
        console.error('Insert error:', insertError)
        setError(`Failed to save ${file.name}`)
      }

      // Log activity
      await supabase.from('activity_log').insert({
        asset_id: assetId,
        user_id: user.id,
        action: 'Document Uploaded',
        details: `Uploaded: ${file.name}`,
      })
    }

    setIsUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    router.refresh()
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
      />

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
      >
        <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        {isUploading ? (
          <p className="text-sm text-gray-600">Uploading...</p>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PDF, DOC, XLS, JPG, PNG up to 10MB
            </p>
          </>
        )}
      </div>
    </div>
  )
}
