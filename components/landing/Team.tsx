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
      bio: "Paul founded BitCense after 25+ years in real estate, proptech, and property tokenization. A U.S. Air Force combat veteran.",
    },
    {
      name: 'Joseph Joyce',
      role: 'Co-Founder & CPO',
      image: '/team-joe.avif',
      bio: "Joe directs product vision with expertise in commercial real estate finance and capital markets. M.S. in Financial Analysis from St. Mary's College.",
    },
    {
      name: 'Michael Orlandi',
      role: 'Co-Founder & CIO',
      image: '/team-michael.avif',
      bio: "Michael brings 15+ years acquiring, developing, and managing institutional-quality real estate. Columbia and Harvard graduate.",
    },
    {
      name: 'Shane Fleming',
      role: 'Chief Strategy Officer',
      image: '/team-shane.avif',
      bio: "Shane is a real estate strategist with 20+ years across commercial, residential, and proptech sectors.",
    },
    {
      name: 'Delia Sabau',
      role: 'Head of Capital Structuring',
      image: '/team-delia.jpg',
      bio: "Delia managed $1B+ in equity strategies at Barclays Global Investors (now BlackRock). 20+ years in institutional finance.",
    },
  ]

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section id="team" className="py-28 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-14">
          Leadership
        </h2>

        <div className="flex flex-wrap justify-start gap-12">
          {team.map((member, index) => (
            <button
              key={member.name}
              onClick={() => handleToggle(index)}
              className="flex flex-col items-center text-center group focus:outline-none"
            >
              <div
                className={`w-24 h-24 rounded-full overflow-hidden transition-all duration-200 ${
                  expandedIndex === index
                    ? 'ring-2 ring-green-600 ring-offset-2'
                    : 'group-hover:ring-2 group-hover:ring-gray-200 group-hover:ring-offset-2'
                }`}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-gray-900 mt-4">{member.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{member.role}</p>
              <span className={`mt-2 text-xs transition-colors ${
                expandedIndex === index
                  ? 'text-green-600'
                  : 'text-gray-400 group-hover:text-green-600'
              }`}>
                {expandedIndex === index ? '− Less' : '+ More'}
              </span>
            </button>
          ))}
        </div>

        {/* Expanded bio */}
        <div
          className={`overflow-hidden transition-all duration-200 ${
            expandedIndex !== null ? 'max-h-40 opacity-100 mt-10' : 'max-h-0 opacity-0'
          }`}
        >
          {expandedIndex !== null && (
            <div className="max-w-xl">
              <p className="text-gray-600 leading-7">
                {team[expandedIndex].bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
