'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { useRouter } from 'next/navigation'
import { DOCUMENT_CATEGORY_LABELS, type DocumentCategory } from '@/lib/types'

interface DocumentUploadProps {
  assetId: string
}

const categoryOptions = Object.entries(DOCUMENT_CATEGORY_LABELS).map(([value, label]) => ({
  value,
  label,
}))

export function DocumentUpload({ assetId }: DocumentUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('other')
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

      // Create document record with correct field names
      const { error: insertError } = await supabase.from('documents').insert({
        asset_id: assetId,
        user_id: user.id,
        name: file.name,
        file_path: filePath,
        mime_type: file.type,
        file_size: file.size,
        category: selectedCategory,
        status: 'uploaded',
      })

      if (insertError) {
        console.error('Insert error:', insertError)
        setError(`Failed to save ${file.name}`)
      }

      // Log activity with correct field names
      await supabase.from('activity_log').insert({
        asset_id: assetId,
        user_id: user.id,
        activity_type: 'document_uploaded',
        description: `Uploaded ${DOCUMENT_CATEGORY_LABELS[selectedCategory]}: ${file.name}`,
        is_client_visible: true,
      })
    }

    setIsUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <Select
            id="category"
            name="category"
            label="Document Category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as DocumentCategory)}
          />
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
      />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors"
      >
        <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        {isUploading ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm text-gray-600">Uploading...</span>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              <span className="text-green-600 font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PDF, DOC, XLS, JPG, PNG up to 10MB
            </p>
          </>
        )}
      </div>

      <div className="text-xs text-gray-500">
        <p className="font-medium mb-1">Recommended documents:</p>
        <ul className="list-disc list-inside space-y-0.5">
          <li>Offering Memorandum / Prospectus</li>
          <li>Financial Statements</li>
          <li>Performance Data / Track Record</li>
          <li>Legal Structure Documents</li>
        </ul>
      </div>
    </div>
  )
}
