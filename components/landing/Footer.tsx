import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            Ready to Reach Global Investors?
          </h2>
          <p className="text-xl text-[#94a3b8] mb-10 leading-relaxed">
            Submit your information and our team will reach out within 24 hours to discuss how BitCense can help distribute your assets globally.
          </p>
          <a
            href="#get-started"
            className="inline-flex items-center bg-[#15803d] text-white px-10 py-5 rounded-xl text-lg font-semibold hover:bg-[#166534] transition-all shadow-lg shadow-[#15803d]/25 hover:shadow-xl hover:shadow-[#15803d]/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            Get Started
            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10">
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
                <span className="text-xl font-bold">BitCense</span>
              </Link>
            </div>
            <p className="text-[#64748b] text-base">
              &copy; 2026 BitCense. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
