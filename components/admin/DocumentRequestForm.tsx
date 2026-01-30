'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { requestDocuments } from '@/app/actions/admin'
import { DOCUMENT_CATEGORY_LABELS, type DocumentCategory } from '@/lib/types'

interface DocumentRequestFormProps {
  assetId: string
  assetName: string
}

const documentOptions: { id: DocumentCategory; label: string }[] = [
  { id: 'prospectus', label: 'Prospectus' },
  { id: 'offering_memorandum', label: 'Offering Memorandum' },
  { id: 'financial_statements', label: 'Financial Statements' },
  { id: 'performance_data', label: 'Performance Data / Track Record' },
  { id: 'legal_structure', label: 'Legal Structure Documents' },
  { id: 'compliance', label: 'Compliance Documents' },
  { id: 'marketing', label: 'Marketing Materials' },
]

export function DocumentRequestForm({ assetId, assetName }: DocumentRequestFormProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDocs, setSelectedDocs] = useState<string[]>([])
  const [customDoc, setCustomDoc] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleDoc = (doc: string) => {
    setSelectedDocs(prev =>
      prev.includes(doc) ? prev.filter(d => d !== doc) : [...prev, doc]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const allDocs = [...selectedDocs]
    if (customDoc.trim()) {
      allDocs.push(customDoc.trim())
    }

    if (allDocs.length === 0) {
      setError('Please select at least one document type')
      return
    }

    setIsSubmitting(true)
    setError(null)

    const result = await requestDocuments(assetId, allDocs, message || undefined)

    setIsSubmitting(false)

    if (result.success) {
      setSuccess(true)
      setSelectedDocs([])
      setCustomDoc('')
      setMessage('')
      router.refresh()
      setTimeout(() => {
        setSuccess(false)
        setIsOpen(false)
      }, 2000)
    } else {
      setError(result.error || 'Failed to send request')
    }
  }

  if (!isOpen) {
    return (
      <Button
        type="button"
        variant="secondary"
        onClick={() => setIsOpen(true)}
        className="w-full"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Request Documents
      </Button>
    )
  }

  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base text-yellow-800">Request Documents</CardTitle>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-yellow-600 hover:text-yellow-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-100 border border-green-200 rounded-lg text-green-700 text-sm">
              Document request sent to client!
            </div>
          )}

          <p className="text-sm text-yellow-700">
            Select the documents you need from the client. They will receive an email notification.
          </p>

          <div className="space-y-2">
            {documentOptions.map((doc) => (
              <label
                key={doc.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedDocs.includes(doc.label)}
                  onChange={() => toggleDoc(doc.label)}
                  className="w-4 h-4 text-yellow-600 border-yellow-300 rounded focus:ring-yellow-500"
                />
                <span className="text-sm text-gray-700">{doc.label}</span>
              </label>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Other (specify)
            </label>
            <input
              type="text"
              value={customDoc}
              onChange={(e) => setCustomDoc(e.target.value)}
              placeholder="e.g., Updated term sheet"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <Textarea
            id="message"
            label="Additional Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            placeholder="Any specific instructions or context..."
          />

          <div className="flex gap-2">
            <Button type="submit" isLoading={isSubmitting} className="flex-1">
              Send Request
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
