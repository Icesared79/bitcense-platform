import Link from 'next/link'
import { LeadForm } from './LeadForm'

export function Footer() {
  return (
    <footer id="get-started" className="bg-[#0F0F0F] text-white">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-[#4A7C59] font-semibold text-sm uppercase tracking-wider">Get Started</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight">
              Ready to reach global investors?
            </h2>
            <p className="mt-6 text-gray-400 leading-relaxed">
              Submit your information and our team will reach out within 24 hours to discuss how BitCense can help distribute your assets globally.
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <LeadForm />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#4A7C59] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">BitCense</span>
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
