export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-16">
          How It Works
        </h2>

        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-0">
          {/* Step 1 */}
          <div className="flex-1 flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center">
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
              1
            </div>
            <div className="md:mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:max-w-[200px]">
                Tell us about your asset. Basic details, takes a few minutes.
              </p>
            </div>
          </div>

          {/* Connector */}
          <div className="hidden md:flex items-center flex-shrink-0 pt-5">
            <div className="w-12 lg:w-20 border-t border-gray-300" />
          </div>

          {/* Step 2 */}
          <div className="flex-1 flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center">
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
              2
            </div>
            <div className="md:mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Qualify</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:max-w-[200px]">
                We review, score, and package your asset for distribution.
              </p>
            </div>
          </div>

          {/* Connector */}
          <div className="hidden md:flex items-center flex-shrink-0 pt-5">
            <div className="w-12 lg:w-20 border-t border-gray-300" />
          </div>

          {/* Step 3 */}
          <div className="flex-1 flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center">
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
              3
            </div>
            <div className="md:mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Distribute</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:max-w-[200px]">
                Qualified assets reach global investors through our licensed partners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
