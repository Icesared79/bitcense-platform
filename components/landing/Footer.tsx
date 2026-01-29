import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4A7C59]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4A7C59]/5 rounded-full blur-3xl" />

      {/* CTA Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[#4A7C59] font-semibold text-sm mb-6">
            Ready to Start?
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Ready to Reach Global Investors?
          </h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            Submit your information and our team will reach out within 24 hours to discuss how BitCense can help distribute your assets globally.
          </p>
          <a
            href="#get-started"
            className="inline-flex items-center bg-[#4A7C59] text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-[#3A6C49] transition-all shadow-lg shadow-[#4A7C59]/25 hover:shadow-xl hover:shadow-[#4A7C59]/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            Get Started
            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Link href="/" className="flex items-center space-x-3 group">
                <Image
                  src="/logo-icon.png"
                  alt="BitCense"
                  width={32}
                  height={32}
                  className="invert brightness-200 group-hover:scale-105 transition-transform"
                />
                <span className="text-xl font-bold tracking-wide">BitCense</span>
              </Link>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; 2026 BitCense. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
