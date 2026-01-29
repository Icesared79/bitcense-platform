import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BitCense</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How It Works
            </a>
            <a href="#why-us" className="text-gray-600 hover:text-gray-900 transition-colors">
              Why Us
            </a>
            <a href="#team" className="text-gray-600 hover:text-gray-900 transition-colors">
              Team
            </a>
          </nav>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Client Portal
          </Link>
        </div>
      </div>
    </header>
  )
}
