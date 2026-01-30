'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface WelcomeBannerProps {
  userName: string | null
  hasAssets: boolean
}

export function WelcomeBanner({ userName, hasAssets }: WelcomeBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed || hasAssets) return null

  return (
    <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 mb-8 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute right-0 top-0 h-full" viewBox="0 0 400 400" fill="none">
          <circle cx="400" cy="0" r="200" fill="currentColor" />
          <circle cx="400" cy="200" r="150" fill="currentColor" />
        </svg>
      </div>

      <button
        onClick={() => setIsDismissed(true)}
        className="absolute top-4 right-4 text-white/70 hover:text-white"
        aria-label="Dismiss"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative">
        <h2 className="text-2xl font-bold mb-2">
          Welcome{userName ? `, ${userName.split(' ')[0]}` : ''}!
        </h2>
        <p className="text-green-100 mb-6 max-w-2xl">
          BitCense Connect helps alternative asset managers like you reach global distribution partners.
          Submit your securities for qualification and our team will score and package them for distribution.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href="/assets/new">
            <Button variant="secondary" className="bg-white text-green-700 hover:bg-green-50">
              Submit Your First Security
            </Button>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-sm text-green-100 font-medium mb-3">How it works:</p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium">Submit</p>
                <p className="text-sm text-green-100">Provide security details and upload documents</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium">Qualify</p>
                <p className="text-sm text-green-100">Our team scores and qualifies your security</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium">Distribute</p>
                <p className="text-sm text-green-100">Qualified securities go to our distribution partners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
