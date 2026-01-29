'use client'

import { useState } from 'react'
import Image from 'next/image'

export function Team() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const team = [
    {
      name: 'Paul DiCesare',
      role: 'Founder & CEO',
      image: '/team-paul.avif',
      bio: "Paul founded BitCense after 25+ years in real estate, proptech, and property tokenization. He built BitCense to connect alternative asset managers with licensed global distribution partners. A U.S. Air Force combat veteran.",
      linkedin: '#',
      email: '#',
    },
    {
      name: 'Joseph Joyce',
      role: 'Co-Founder & CPO',
      image: '/team-joe.avif',
      bio: "Joe directs product vision using his expertise in commercial real estate finance and capital markets. He previously co-founded a real estate technology platform. He holds an M.S. in Financial Analysis from St. Mary's College.",
      linkedin: '#',
      email: '#',
    },
    {
      name: 'Michael Orlandi',
      role: 'Co-Founder & CIO',
      image: '/team-michael.avif',
      bio: "Michael brings 15+ years acquiring, developing, and managing institutional-quality real estate. His deep commercial real estate knowledge shapes BitCense's approach to tokenization. He holds degrees from Columbia and Harvard.",
      linkedin: '#',
      email: '#',
    },
    {
      name: 'Shane Fleming',
      role: 'Chief Strategy Officer',
      image: '/team-shane.avif',
      bio: "Shane is a real estate strategist with 20+ years across commercial, residential, and proptech sectors. He founded FlemingRE and PropGen, and leads BitCense's strategy across Ireland and US markets.",
      linkedin: '#',
      email: '#',
    },
    {
      name: 'Delia Sabau',
      role: 'Head of Capital Structuring',
      image: '/team-delia.jpg',
      bio: "Delia is an investment leader with 20+ years in institutional finance. She managed $1B+ in equity strategies at Barclays Global Investors (now BlackRock) and leads BitCense's capital structuring and distribution strategy.",
      linkedin: '#',
      email: '#',
    },
  ]

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section id="team" className="py-40 lg:py-48 px-4 sm:px-6 lg:px-8 bg-white relative">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0f172a] leading-tight tracking-tight">
            Leadership
          </h2>
          <p className="mt-6 text-xl text-[#334155] leading-relaxed">
            Experienced professionals bridging traditional finance and digital distribution.
          </p>
        </div>

        {/* Team avatars row */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {team.map((member, index) => (
            <button
              key={member.name}
              onClick={() => handleToggle(index)}
              className="flex flex-col items-center group focus:outline-none"
            >
              <div
                className={`w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden transition-all duration-300 ${
                  expandedIndex === index
                    ? 'ring-4 ring-[#fde047] scale-105'
                    : 'hover:scale-105 hover:ring-2 hover:ring-[#fde047]/50'
                }`}
                style={{
                  boxShadow: expandedIndex === index
                    ? '0 20px 40px -12px rgba(15, 23, 42, 0.4)'
                    : '0 10px 30px -10px rgba(15, 23, 42, 0.3)',
                }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-[#0f172a] text-base lg:text-lg mt-4">{member.name}</h3>
              <p className="text-sm lg:text-base text-[#64748b] mt-1">{member.role}</p>
              <span className={`mt-2 text-sm font-medium transition-colors duration-200 ${
                expandedIndex === index ? 'text-[#15803d]' : 'text-[#94a3b8] group-hover:text-[#15803d]'
              }`}>
                {expandedIndex === index ? '− Show less' : '+ Read more'}
              </span>
            </button>
          ))}
        </div>

        {/* Expanded bio section */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedIndex !== null ? 'max-h-96 opacity-100 mt-12' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          {expandedIndex !== null && (
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-[#f8fafc] rounded-2xl p-8 border border-[#e2e8f0]">
                <p className="text-lg text-[#334155] leading-relaxed mb-6">
                  {team[expandedIndex].bio}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <a
                    href={team[expandedIndex].linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white hover:bg-[#0077b5] rounded-lg flex items-center justify-center text-[#64748b] hover:text-white transition-all duration-200 border border-[#e2e8f0] hover:border-[#0077b5]"
                    aria-label={`${team[expandedIndex].name} LinkedIn`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:${team[expandedIndex].email}`}
                    className="w-10 h-10 bg-white hover:bg-[#15803d] rounded-lg flex items-center justify-center text-[#64748b] hover:text-white transition-all duration-200 border border-[#e2e8f0] hover:border-[#15803d]"
                    aria-label={`Email ${team[expandedIndex].name}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
