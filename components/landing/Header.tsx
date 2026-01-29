'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/50 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/logo-icon.png"
              alt="BitCense"
              width={36}
              height={36}
              className="group-hover:scale-105 transition-transform"
            />
            <span className="text-xl font-bold text-[#0f172a]">BitCense</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <a href="#how-it-works" className="text-gray-600 hover:text-[#0f172a] hover:bg-gray-100 transition-all px-4 py-2 rounded-lg text-sm font-medium">
              How It Works
            </a>
            <a href="#features" className="text-gray-600 hover:text-[#0f172a] hover:bg-gray-100 transition-all px-4 py-2 rounded-lg text-sm font-medium">
              Why BitCense
            </a>
            <a href="#team" className="text-gray-600 hover:text-[#0f172a] hover:bg-gray-100 transition-all px-4 py-2 rounded-lg text-sm font-medium">
              Team
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/login"
              className="text-gray-600 hover:text-[#0f172a] hover:bg-gray-100 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
            >
              Log in
            </Link>
            <a
              href="#get-started"
              className="bg-[#4A7C59] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#3A6C49] transition-all shadow-md shadow-[#4A7C59]/25 hover:shadow-lg hover:shadow-[#4A7C59]/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="md:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-md rounded-b-2xl shadow-lg">
            <nav className="flex flex-col space-y-1 px-2">
              <a href="#how-it-works" className="text-gray-600 hover:text-[#0f172a] hover:bg-gray-100 text-sm font-medium px-4 py-3 rounded-lg transition-colors">How It Works</a>
              <a href="#features" className="text-gray-600 hover:text-[#0f172a] hover:bg-gray-100 text-sm font-medium px-4 py-3 rounded-lg transition-colors">Why BitCense</a>
              <a href="#team" className="text-gray-600 hover:text-[#0f172a] hover:bg-gray-100 text-sm font-medium px-4 py-3 rounded-lg transition-colors">Team</a>
              <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col space-y-3 px-2">
                <Link href="/login" className="text-gray-600 text-sm font-medium px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">Log in</Link>
                <a href="#get-started" className="bg-[#4A7C59] text-white px-5 py-3 rounded-full text-sm font-semibold text-center shadow-md shadow-[#4A7C59]/25">
                  Get Started
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
