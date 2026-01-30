'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById('get-started')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Submit your information and we'll reach out within 24 hours.
          </p>
          <a
            href="#get-started"
            onClick={scrollToForm}
            className="inline-block bg-green-600 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo-icon.png"
                alt="BitCense"
                width={24}
                height={24}
                className="invert brightness-200"
              />
              <span className="font-semibold">BitCense</span>
            </Link>
            <p className="text-gray-500 text-sm">
              &copy; 2026 BitCense. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
