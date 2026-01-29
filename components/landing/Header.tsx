'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#4A7C59] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">BitCense</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              How It Works
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/#get-started"
              className="bg-[#4A7C59] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#3A6C49] transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium">How It Works</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 text-sm font-medium">About</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Contact</a>
              <div className="pt-4 flex flex-col space-y-3">
                <Link href="/login" className="text-gray-600 text-sm font-medium">Log in</Link>
                <Link href="/#get-started" className="bg-[#4A7C59] text-white px-5 py-2.5 rounded-full text-sm font-medium text-center">
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
