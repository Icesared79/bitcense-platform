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

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById('get-started')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg shadow-[#0f172a]/5' : 'bg-white/80 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/logo-icon.png"
              alt="BitCense"
              width={36}
              height={36}
              className="group-hover:scale-105 transition-transform duration-200"
            />
            <span className="text-xl font-bold text-[#0f172a]">BitCense</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-[#334155] hover:text-[#0f172a] transition-colors duration-200 text-base font-medium">
              How It Works
            </a>
            <a href="#features" className="text-[#334155] hover:text-[#0f172a] transition-colors duration-200 text-base font-medium">
              Why BitCense
            </a>
            <a href="#team" className="text-[#334155] hover:text-[#0f172a] transition-colors duration-200 text-base font-medium">
              Team
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-[#334155] hover:text-[#0f172a] px-4 py-2 text-base font-medium transition-colors duration-200"
            >
              Log in
            </Link>
            <a
              href="#get-started"
              onClick={scrollToForm}
              className="bg-[#15803d] text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-[#166534] transition-all duration-200 shadow-md shadow-[#15803d]/20 hover:shadow-lg hover:shadow-[#15803d]/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-[#f1f5f9] rounded-xl transition-colors duration-200"
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
          <div className="md:hidden py-6 border-t border-[#e2e8f0]">
            <nav className="flex flex-col space-y-4">
              <a href="#how-it-works" className="text-[#334155] hover:text-[#0f172a] text-base font-medium py-2 transition-colors duration-200">How It Works</a>
              <a href="#features" className="text-[#334155] hover:text-[#0f172a] text-base font-medium py-2 transition-colors duration-200">Why BitCense</a>
              <a href="#team" className="text-[#334155] hover:text-[#0f172a] text-base font-medium py-2 transition-colors duration-200">Team</a>
              <div className="pt-4 border-t border-[#e2e8f0] flex flex-col space-y-3">
                <Link href="/login" className="text-[#334155] text-base font-medium py-2">Log in</Link>
                <a
                  href="#get-started"
                  onClick={scrollToForm}
                  className="bg-[#15803d] text-white px-6 py-3 rounded-xl text-base font-semibold text-center hover:bg-[#166534] transition-colors duration-200"
                >
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
