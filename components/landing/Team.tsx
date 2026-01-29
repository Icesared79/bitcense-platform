export function Team() {
  const team = [
    {
      name: 'Paul DiCesare',
      role: 'Founder & Chief Executive Officer',
      initials: 'PD',
      bio: "Paul established BitCense following 25+ years in real estate, proptech, and property tokenization. He witnessed firsthand how the real estate industry is slow to adopt new technologies, often missing out on significant benefits from new technologies. Paul built BitCense to solve the obstacle of converting traditionally illiquid real estate assets into digital tokens by offering full-service, compliant tokenization infrastructure and help clients unlock value and future-proof their portfolios without needing to become technology experts. Paul is a U.S. Air Force combat veteran and holds a Bachelor's in Organizational Leadership from Penn State University.",
      linkedin: '#',
      email: '#',
    },
    {
      name: 'Joseph Joyce',
      role: 'Co-Founder & Chief Product Officer',
      initials: 'JJ',
      bio: "Joe directs product vision using his expertise in commercial real estate finance and blockchain technologies. He previously co-founded a real estate tokenization platform, bringing hands-on experience building digital asset systems. His approach combines financial modeling, capital structuring, and asset analysis to create products that serve both originators and investors. He holds an M.S. in Financial Analysis from St. Mary's College and a B.S. in Finance from CSU Chico.",
      linkedin: '#',
      email: '#',
    },
    {
      name: 'Michael Orlandi',
      role: 'Co-Founder & Chief Investment Officer',
      initials: 'MO',
      bio: "Michael brings 15+ years of experience acquiring, developing, financing, and managing institutional-quality real estate across asset classes, delivering consistent returns as an investment director. His deep commercial real estate knowledge shapes BitCense's approach to tokenization and deal structuring. He holds a Master's in Real Estate Development from Columbia University and a J.D. from Harvard University.",
      linkedin: '#',
      email: '#',
    },
    {
      name: 'Shane Fleming',
      role: 'Chief Strategy Officer',
      initials: 'SF',
      bio: "Shane is a real estate strategist and startup founder with 20+ years of experience across commercial, residential, and proptech sectors. He founded FlemingRE, advising companies like McDonald's and Circle K, worked at JLL in corporate advisory, and founded PropGen, an AI-focused proptech startup. At BitCense, he leads strategy, growth, and go-to-market planning across Ireland and US markets.",
      linkedin: '#',
      email: '#',
    },
    {
      name: 'Delia Sabau',
      role: 'Head of Capital Structuring',
      initials: 'DS',
      bio: "Delia is an investment leader with 20+ years in institutional finance and hedge fund management. She managed $1B+ in equity strategies at Barclays Global Investors (now BlackRock), launched global hedge funds at Menta Capital, built crypto strategies at CKC Fund, and co-founded Optima for regulated on-chain strategies. She serves as the architect of BitCense's vaulting strategy.",
      linkedin: '#',
      email: '#',
    },
  ]

  return (
    <section id="team" className="py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-white relative">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0f172a] leading-tight tracking-tight">
            Leadership
          </h2>
          <p className="mt-6 text-xl text-[#334155] leading-relaxed">
            Experienced professionals bridging traditional finance and digital distribution.
          </p>
        </div>

        <div className="space-y-8">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`flex flex-col md:flex-row gap-8 p-8 lg:p-10 rounded-2xl border border-[#e2e8f0] bg-white shadow-lg hover:shadow-xl transition-all duration-200 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Photo/Initials */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div
                  className={`w-32 h-32 lg:w-40 lg:h-40 ${
                    index % 2 === 0 ? 'bg-[#15803d]' : 'bg-[#0f172a]'
                  } rounded-2xl flex items-center justify-center text-white font-bold text-4xl lg:text-5xl shadow-lg`}
                >
                  {member.initials}
                </div>
                {/* Social Links */}
                <div className="flex items-center gap-3 mt-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#f1f5f9] hover:bg-[#0077b5] rounded-lg flex items-center justify-center text-[#64748b] hover:text-white transition-all duration-200"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 bg-[#f1f5f9] hover:bg-[#15803d] rounded-lg flex items-center justify-center text-[#64748b] hover:text-white transition-all duration-200"
                    aria-label={`Email ${member.name}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#0f172a]">{member.name}</h3>
                <p className="text-lg text-[#15803d] font-semibold mt-1">{member.role}</p>
                <p className="text-base text-[#334155] leading-relaxed mt-4">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
